import {geoDistance, geoInterpolate} from 'd3-geo';
import {LUGAR, vuelta} from '../content';

/**
 * La ruta de Fogg como una lista de tramos. El tramo k va de la escala k − 1 a la escala k pasando por sus
 * puntos intermedios; cada tramo se densifica por círculo máximo y guarda su longitud acumulada, para poder
 * pedir «el punto a la fracción t del tramo k» con velocidad constante.
 */

type P = [number, number];
const punto = (x: P | string): P => (typeof x === 'string' ? LUGAR[x] : x);

type Tramo = {puntos: P[]; acum: number[]; largo: number};

function densificar(a: P, b: P): P[] {
  const d = geoDistance(a, b);
  const n = Math.max(2, Math.ceil(d / 0.02));
  const f = geoInterpolate(a, b);
  return Array.from({length: n + 1}, (_, i) => f(i / n) as P);
}

export const ESCALAS = vuelta.escalas;
export const N = ESCALAS.length;
export const POS: P[] = ESCALAS.map((e) => punto(e.lugar));

export const TRAMOS: Tramo[] = ESCALAS.map((e, k) => {
  if (k === 0) return {puntos: [POS[0]], acum: [0], largo: 0};
  const nodos = [POS[k - 1], ...e.ruta.map(punto)];
  const puntos: P[] = [];
  for (let i = 1; i < nodos.length; i++) {
    const seg = densificar(nodos[i - 1], nodos[i]);
    puntos.push(...(i === 1 ? seg : seg.slice(1)));
  }
  const acum = [0];
  for (let i = 1; i < puntos.length; i++) acum.push(acum[i - 1] + geoDistance(puntos[i - 1], puntos[i]));
  return {puntos, acum, largo: acum[acum.length - 1]};
});

/** Puntos recorridos hasta la fracción t del tramo k (incluido el punto exacto en t). */
export function recorrido(k: number, t: number): P[] {
  const salida: P[] = [];
  for (let j = 1; j < k; j++) salida.push(...TRAMOS[j].puntos);
  if (k < 1) return [POS[0]];
  const tr = TRAMOS[k];
  const objetivo = t * tr.largo;
  let i = 1;
  while (i < tr.acum.length && tr.acum[i] < objetivo) {
    salida.push(tr.puntos[i - 1]);
    i++;
  }
  salida.push(tr.puntos[i - 1]);
  if (i < tr.puntos.length) {
    const a = tr.acum[i - 1];
    const u = (objetivo - a) / Math.max(1e-9, tr.acum[i] - a);
    salida.push(geoInterpolate(tr.puntos[i - 1], tr.puntos[i])(u) as P);
  }
  return salida;
}

/** Todo el trazado, para dibujarlo en punteado. */
export const COMPLETA: P[] = TRAMOS.flatMap((t, k) => (k === 0 ? t.puntos : t.puntos.slice(1)));

const DIA = 86400000;
const fecha = (s: string) => Date.parse(s + 'T00:00:00Z');
export const SALIDA = fecha(ESCALAS[0].fecha);
export const MS = ESCALAS.map((e) => fecha(e.fecha));
/** Día del viaje (1 = 2 de octubre) para una fecha en ms. */
export const diaDe = (ms: number) => Math.floor((ms - SALIDA) / DIA) + 1;

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export function textoFecha(ms: number) {
  const d = new Date(ms);
  return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
}

/** Diferencia de la hora solar local con Londres para una longitud, como texto. */
export function desfase(lon: number) {
  const min = Math.round((lon / 15) * 60);
  if (Math.abs(Math.abs(min) - 720) <= 6) return '12 h: la esfera marca lo mismo';
  const s = min > 0 ? '+' : min < 0 ? '−' : '±';
  const a = Math.abs(min);
  return `${s}${Math.floor(a / 60)} h ${String(a % 60).padStart(2, '0')} min`;
}
