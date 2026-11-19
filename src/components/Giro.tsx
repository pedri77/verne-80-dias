import {L, giro, img} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** El día de más: era sábado, no domingo. Cuentas finales del viaje. */
export function Giro() {
  const ref = useAparecer<HTMLElement>();
  const l = L['01'];
  return (
    <section ref={ref} aria-labelledby="giro-titulo" className="bg-noche px-4 py-[14svh] text-papel sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <p data-aparece className="rotulo text-oro">
          {giro.antetitulo}
        </p>
        <h2 id="giro-titulo" data-aparece className="mt-3 font-display text-hero text-oro" style={{'--i': 1} as React.CSSProperties}>
          {giro.titulo}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-[5vw]">
          <div>
            {giro.texto.map((t, i) => (
              <p key={i} data-aparece className="mt-4 max-w-[38rem] text-lead text-papel/85 first:mt-0" style={{'--i': 2 + i} as React.CSSProperties}>
                {t}
              </p>
            ))}
            <blockquote data-aparece className="mt-8 max-w-[38rem] border-l-2 border-oro pl-5 text-[1.1rem] leading-relaxed text-papel italic md:text-[1.3rem]" style={{'--i': 4} as React.CSSProperties}>
              {giro.cita}
            </blockquote>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-start">
            {giro.cuentas.map((c, i) => (
              <div key={c.texto} data-aparece style={{'--i': 3 + i} as React.CSSProperties}>
                <dt className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-none text-oro tabular-nums">{c.cifra}</dt>
                <dd className="mt-2 text-[0.9rem] leading-snug text-papel/75">{c.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure data-aparece className="mt-16 bg-papel p-3 md:p-4">
          <img src={img('01')} alt="Mapa de la edición Hetzel con la ruta de Phileas Fogg alrededor del mundo." width={l.w} height={l.h} loading="lazy" decoding="async" className="grabado block h-auto w-full" />
          <figcaption className="rotulo mt-3 text-tinta-2">El mapa del libro (1873): la misma vuelta, en plano. En el globo, Londres y Londres son el mismo punto.</figcaption>
        </figure>
      </div>
    </section>
  );
}
