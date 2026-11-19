import {useEffect, useRef} from 'react';
import {L, img, portada} from '../content';
import {lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Portada: la tapa roja y oro de la colección Hetzel con el frontispicio del libro.
 *
 * Guion de scroll (p), sección de 160 svh:
 *   0.00 – 0.60  el título y la lámina quietos; aviso de scroll visible
 *   0.30 – 0.95  la lámina se acerca y la tapa se abre hacia arriba (sube y se desvanece)
 */
export function Portada() {
  const raizRef = useRef<HTMLElement>(null);
  const tapaRef = useRef<HTMLDivElement>(null);
  const laminaRef = useRef<HTMLDivElement>(null);
  const avisoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;
      const a = tramo(p, 0.3, 0.95);
      tapaRef.current!.style.transform = `translate3d(0, ${lerp(0, -18, a)}svh, 0)`;
      tapaRef.current!.style.opacity = String(1 - tramo(p, 0.55, 0.95));
      laminaRef.current!.style.transform = `scale(${lerp(1, 1.08, a)}) rotate(${lerp(-1.5, 0, a)}deg)`;
      avisoRef.current!.style.opacity = String(1 - tramo(p, 0.02, 0.12));
    });
  }, []);

  const l = L['02'];
  return (
    <section ref={raizRef} id="inicio" aria-labelledby="titulo" className="relative bg-carmin" style={{height: '160svh'}}>
      <div className="sticky top-0 h-pantalla overflow-hidden">
        <div ref={tapaRef} className="filete absolute inset-3 grid items-center gap-6 px-5 py-8 text-oro sm:inset-5 sm:px-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-[5vw] md:px-[5vw]">
          <div>
            <p className="rotulo text-oro/80">{portada.antetitulo}</p>
            <h1 id="titulo" className="mt-4 font-display text-hero">
              {portada.titulo.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[36rem] text-[0.95rem] leading-relaxed text-papel/90 md:text-lead">{portada.entradilla}</p>
            <p ref={avisoRef} className="rotulo mt-8 text-oro/80">
              ↓ {portada.aviso}
            </p>
          </div>
          <div ref={laminaRef} className="mx-auto hidden w-full max-w-[22rem] md:block">
            <figure className="bg-papel p-3 shadow-[0_30px_60px_-30px_oklch(10%_0.05_20/0.7)]">
              <img src={img('02')} alt="Frontispicio de la edición Hetzel: un globo terráqueo con el título del libro, sobre una costa con un barco de vapor." width={l.w} height={l.h} className="grabado block h-auto w-full" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
