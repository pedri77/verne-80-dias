import {records} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/**
 * De 80 días a 108 minutos: cada vuelta al mundo como una barra en escala logarítmica, de una hora (0) a las
 * 1.920 horas de Fogg (100 %). Las barras se dibujan al entrar en pantalla.
 */
const MAX = Math.log10(80 * 24);
const ancho = (h: number) => Math.max(0.02, Math.log10(Math.max(1, h)) / MAX);

export function Records() {
  const ref = useAparecer<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="records-titulo" className="bg-carmin px-4 py-[14svh] text-papel sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <p data-aparece className="rotulo text-oro">
          {records.antetitulo}
        </p>
        <h2 id="records-titulo" data-aparece className="mt-3 font-display text-display text-oro" style={{'--i': 1} as React.CSSProperties}>
          {records.titulo}
        </h2>
        <p data-aparece className="mt-5 max-w-[46rem] text-lead text-papel/85" style={{'--i': 2} as React.CSSProperties}>
          {records.intro}
        </p>
        <ol className="mt-12 grid gap-5">
          {records.filas.map((r, i) => (
            <li key={r.quien} data-aparece className="grid gap-1.5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6" style={{'--i': i} as React.CSSProperties}>
              <div>
                <p className="font-mono text-[0.8rem] text-oro tabular-nums">{r.año}</p>
                <p className="font-display text-[1.25rem] leading-tight">{r.quien}</p>
              </div>
              <div>
                <div className="h-3 w-full bg-carmin-2">
                  <div className="barra h-full origin-left bg-oro" style={{'--ancho': ancho(r.horas)} as React.CSSProperties} />
                </div>
                <p className="mt-1.5 flex flex-wrap justify-between gap-x-4 text-[0.875rem]">
                  <span className="font-mono text-oro tabular-nums">{r.tiempo}</span>
                  <span className="text-papel/75">{r.como}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p data-aparece className="rotulo mt-8 text-papel/60">
          {records.cierre}
        </p>
      </div>
    </section>
  );
}
