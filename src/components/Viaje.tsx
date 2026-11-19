import {geoGraticule10, geoOrthographic, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {Topology} from 'topojson-specification';
import {useEffect, useRef} from 'react';
import tierra from 'world-atlas/land-110m.json';
import {L, img} from '../content';
import {clamp, easeInOutSine, lerp, progresoFijado, tramo} from '../lib/math';
import {COMPLETA, ESCALAS, MS, N, POS, desfase, diaDe, recorrido, textoFecha} from '../lib/ruta';
import {enCadaFotograma} from '../lib/scroll';

/**
 * El viaje: un globo en papel de carta náutica gira con el scroll y sigue a Fogg escala a escala. La línea carmín
 * es lo recorrido; la punteada, lo que falta. A la derecha, el grabado de cada escala.
 *
 * Guion de scroll (p), sección de N × 85 + 60 svh:
 *   0.00 – 0.03  entra el globo centrado en Londres
 *   0.03 – 0.97  pos = tramo × (N − 1). Dentro de cada paso k → k + 1 (f = parte decimal de pos):
 *                  0.00 – 0.40  parado en la escala k, con su ficha
 *                  0.40 – 1.00  viaja por el tramo k + 1 (suavizado); la ficha k se va en 0.40 – 0.50
 *                               y la k + 1 entra en 0.90 – 1.00
 *   El centro del globo sigue al punto actual; la fecha y el día se interpolan durante el viaje.
 */

const TIERRA = feature(tierra as unknown as Topology, (tierra as unknown as Topology).objects.land);
const RETICULA = geoGraticule10();
const MERIDIANO = {type: 'LineString' as const, coordinates: Array.from({length: 37}, (_, i) => [180, -90 + i * 5])};

function css(nombre: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
}

export function Viaje() {
  const raizRef = useRef<HTMLElement>(null);
  const lienzoRef = useRef<HTMLCanvasElement>(null);
  const fichasRef = useRef<(HTMLElement | null)[]>([]);
  const fechaRef = useRef<HTMLSpanElement>(null);
  const diaRef = useRef<HTMLSpanElement>(null);
  const medioRef = useRef<HTMLSpanElement>(null);
  const desfaseRef = useRef<HTMLSpanElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lienzo = lienzoRef.current!;
    const ctx = lienzo.getContext('2d')!;
    const color = {agua: '', agua2: '', tierra: '', tinta: '', carmin: '', oro: ''};
    const leerColores = () => {
      color.agua = css('--color-agua');
      color.agua2 = css('--color-agua-2');
      color.tierra = css('--color-papel');
      color.tinta = css('--color-tinta');
      color.carmin = css('--color-carmin');
      color.oro = css('--color-oro-2');
    };
    leerColores();
    let lado = 0;
    let dpr = 1;
    const medir = () => {
      const r = lienzo.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      lado = Math.min(r.width, r.height);
      lienzo.width = Math.round(r.width * dpr);
      lienzo.height = Math.round(r.height * dpr);
      pAnterior = -1;
    };
    const proy = geoOrthographic().clipAngle(90).precision(0.3);
    const camino = geoPath(proy, ctx);
    let pAnterior = -1;
    let rot: [number, number] = [-POS[0][0], -POS[0][1] * 0.7];

    const dibujar = (k: number, t: number, actual: [number, number], vista: [number, number]) => {
      const w = lienzo.width / dpr;
      const h = lienzo.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = lado * 0.46;
      proy.translate([w / 2, h / 2]).scale(r).rotate([-vista[0], -vista[1], 0]);

      const g = ctx.createRadialGradient(w / 2 - r * 0.35, h / 2 - r * 0.4, r * 0.1, w / 2, h / 2, r);
      g.addColorStop(0, color.agua);
      g.addColorStop(1, color.agua2);
      ctx.beginPath();
      camino({type: 'Sphere'});
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      camino(RETICULA);
      ctx.strokeStyle = color.tinta;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      camino(TIERRA);
      ctx.fillStyle = color.tierra;
      ctx.fill();
      ctx.strokeStyle = color.tinta;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;

      const cerca180 = clamp(1 - Math.abs((((actual[0] % 360) + 360) % 360) - 180) / 25);
      if (cerca180 > 0) {
        ctx.beginPath();
        camino(MERIDIANO);
        ctx.strokeStyle = color.oro;
        ctx.globalAlpha = cerca180;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      camino({type: 'LineString', coordinates: COMPLETA});
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = color.carmin;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      ctx.beginPath();
      camino({type: 'LineString', coordinates: recorrido(k, t)});
      ctx.strokeStyle = color.carmin;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      const hechas = POS.slice(0, t > 0.999 ? k + 1 : k);
      camino.pointRadius(3.2);
      for (const p of hechas) {
        ctx.beginPath();
        camino({type: 'Point', coordinates: p});
        ctx.fillStyle = color.oro;
        ctx.fill();
        ctx.strokeStyle = color.tinta;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      camino.pointRadius(6.5);
      ctx.beginPath();
      camino({type: 'Point', coordinates: actual});
      ctx.fillStyle = color.carmin;
      ctx.fill();
      ctx.strokeStyle = color.tierra;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      camino({type: 'Sphere'});
      ctx.strokeStyle = color.tinta;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const ro = new ResizeObserver(medir);
    ro.observe(lienzo);
    medir();
    const tema = window.matchMedia('(prefers-color-scheme: dark)');
    const alCambiarTema = () => {
      leerColores();
      pAnterior = -1;
    };
    tema.addEventListener('change', alCambiarTema);

    const quitar = enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00002) return;
      pAnterior = p;

      const pos = tramo(p, 0.03, 0.97) * (N - 1);
      const i = Math.min(N - 2, Math.floor(pos));
      const f = pos - i;
      const viaje = easeInOutSine(tramo(f, 0.4, 1));
      const enDestino = pos >= N - 1;
      const k = enDestino ? N - 1 : viaje > 0 ? i + 1 : i;
      const t = enDestino ? 1 : viaje > 0 ? viaje : 1;
      const hecho = recorrido(Math.max(0, k), k === 0 ? 0 : t);
      const actual = hecho[hecho.length - 1];
      const objetivo: [number, number] = [actual[0], clamp(actual[1] * 0.7, -30, 40)];
      // El giro va siempre por el lado corto y con un poco de retraso, para que la cámara no dé tirones.
      let dl = ((objetivo[0] + rot[0] + 540) % 360) - 180;
      rot = [rot[0] - dl * 0.35, lerp(rot[1], -objetivo[1], 0.35)];
      dl = ((objetivo[0] + rot[0] + 540) % 360) - 180;
      if (Math.abs(dl) < 0.05) rot[0] = -objetivo[0];
      dibujar(k, t, actual, [-rot[0], -rot[1]]);
      if (Math.abs(dl) > 0.05) pAnterior = -1;

      const ms = enDestino ? MS[N - 1] : lerp(MS[i], MS[i + 1], viaje);
      const actualIdx = enDestino ? N - 1 : f < 0.78 ? i : i + 1;
      fechaRef.current!.textContent = textoFecha(ms) + (ESCALAS[actualIdx].hora && (f < 0.4 || f > 0.95 || enDestino) ? ` · ${ESCALAS[actualIdx].hora}` : '');
      diaRef.current!.textContent = String(clamp(diaDe(ms) - 1, 0, 80));
      medioRef.current!.textContent = viaje > 0 && !enDestino ? ESCALAS[i + 1].medio : ESCALAS[actualIdx].donde;
      desfaseRef.current!.textContent = desfase(actual[0]);
      barraRef.current!.style.transform = `scaleX(${clamp((diaDe(ms) - 1) / 80)})`;

      fichasRef.current.forEach((el, j) => {
        if (!el) return;
        let o = 0;
        if (enDestino) o = j === N - 1 ? 1 : 0;
        else if (j === i) o = 1 - tramo(f, 0.4, 0.5);
        else if (j === i + 1) o = tramo(f, 0.78, 0.92);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${lerp(14, 0, o)}px, 0)`;
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      });
    });
    return () => {
      quitar();
      ro.disconnect();
      tema.removeEventListener('change', alCambiarTema);
    };
  }, []);

  return (
    <section ref={raizRef} id="viaje" aria-labelledby="viaje-titulo" className="relative bg-papel" style={{height: `${N * 85 + 60}svh`}}>
      <h2 id="viaje-titulo" className="sr-only">
        El viaje, escala a escala
      </h2>
      <div className="sticky top-0 grid h-pantalla grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-4 pt-[2.5svh] sm:px-6 md:col-span-2 md:px-[4vw] md:pt-[4svh]">
          <p className="font-mono text-[0.95rem] text-tinta tabular-nums md:text-[1.2rem]">
            <span ref={fechaRef}>miércoles 2 de octubre · 20:45</span>
          </p>
          <p className="font-mono text-[0.8rem] text-tinta-2 tabular-nums md:text-[0.95rem]">
            Días gastados: <span ref={diaRef} className="text-carmin">0</span> de 80
          </p>
          <div className="h-[3px] w-full origin-left bg-papel-2">
            <div ref={barraRef} className="h-full w-full origin-left bg-carmin" style={{transform: 'scaleX(0)'}} />
          </div>
          <p className="rotulo w-full text-tinta-2 md:w-auto">
            <span ref={medioRef}>Londres</span>
          </p>
          <p className="rotulo text-tinta-2">
            Hora local respecto a Londres: <span ref={desfaseRef} className="text-carmin">+0 h 00 min</span>
          </p>
        </div>

        <div className="relative min-h-0">
          <canvas ref={lienzoRef} className="absolute inset-0 h-full w-full" aria-label="Globo terráqueo con la ruta de Phileas Fogg" role="img" />
        </div>

        <div className="relative min-h-[38svh] md:min-h-0">
          {ESCALAS.map((e, j) => {
            const l = L[e.img];
            return (
              <article
                key={j}
                ref={(el) => {
                  fichasRef.current[j] = el;
                }}
                className="absolute inset-0 flex items-start gap-4 px-4 pb-4 sm:px-6 md:flex-col md:justify-center md:gap-5 md:pr-[5vw] md:pb-0 md:pl-0"
                style={{opacity: j === 0 ? 1 : 0, visibility: j === 0 ? 'visible' : 'hidden'}}
              >
                <figure className="filete w-[34%] shrink-0 bg-papel-2 p-[6px] md:w-auto md:max-w-[min(100%,24rem)]">
                  <img
                    src={img(e.img)}
                    alt=""
                    width={l.w}
                    height={l.h}
                    loading={j < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="grabado block h-auto max-h-[30svh] w-full object-contain md:max-h-[44svh]"
                  />
                </figure>
                <div className="min-w-0">
                  <p className="rotulo text-carmin">
                    {String(j + 1).padStart(2, '0')} · {e.donde}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.35rem,2.6vw,2.4rem)] leading-[1.05]">{e.titulo}</h3>
                  <p className="mt-2 max-w-[32rem] text-[0.875rem] leading-relaxed text-tinta-2 md:mt-3 md:text-body">{e.texto}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
