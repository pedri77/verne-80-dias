import {L, img, luna} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** La otra apuesta: De la Tierra a la Luna (1865) frente al Apolo 8 (1968), fila a fila. */
export function Luna() {
  const ref = useAparecer<HTMLElement>();
  const f = L['luna-fuego'];
  const a = L['luna-apolo8'];
  return (
    <section ref={ref} aria-labelledby="luna-titulo" className="bg-papel px-4 py-[14svh] sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <p data-aparece className="rotulo text-carmin">
          {luna.antetitulo}
        </p>
        <h2 id="luna-titulo" data-aparece className="mt-3 font-display text-display" style={{'--i': 1} as React.CSSProperties}>
          {luna.titulo}
        </h2>
        <p data-aparece className="mt-5 max-w-[46rem] text-lead text-tinta-2" style={{'--i': 2} as React.CSSProperties}>
          {luna.intro}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:gap-10">
          <figure data-aparece>
            <div className="filete bg-papel-2 p-[6px]">
              <img src={img('luna-fuego')} alt="Grabado de 1866: la Columbiad dispara el proyectil hacia el cielo entre nubes de humo." width={f.w} height={f.h} loading="lazy" decoding="async" className="grabado block aspect-square h-auto w-full object-cover object-top" />
            </div>
            <figcaption className="rotulo mt-2 text-tinta-2">«¡Fuego!» · De la Terre à la Lune, 1866</figcaption>
          </figure>
          <figure data-aparece style={{'--i': 1} as React.CSSProperties}>
            <div className="bg-noche p-[6px]">
              <img src={img('luna-apolo8')} alt="La Tierra asomando sobre el horizonte de la Luna, fotografiada desde el Apolo 8." width={a.w} height={a.h} loading="lazy" decoding="async" className="block aspect-square h-auto w-full object-cover" />
            </div>
            <figcaption className="rotulo mt-2 text-tinta-2">La Tierra desde la Luna · Apolo 8, 24 de diciembre de 1968</figcaption>
          </figure>
        </div>

        <table className="mt-10 w-full border-collapse text-left">
          <caption className="sr-only">Comparación entre el viaje a la Luna de Verne y el Apolo 8</caption>
          <thead>
            <tr className="rotulo text-tinta-2">
              <th scope="col" className="w-[22%] pb-3 font-normal" />
              <th scope="col" className="pb-3 font-normal text-carmin">Verne, 1865–1869</th>
              <th scope="col" className="pb-3 font-normal">Apolo 8, 1968</th>
            </tr>
          </thead>
          <tbody>
            {luna.filas.map((r, i) => (
              <tr key={r.dato} data-aparece className="border-t border-tinta/15 align-top" style={{'--i': i} as React.CSSProperties}>
                <th scope="row" className="rotulo py-3 pr-3 font-normal text-tinta-2">
                  {r.dato}
                </th>
                <td className="py-3 pr-4 text-[0.9rem] md:text-body">{r.verne}</td>
                <td className="py-3 text-[0.9rem] md:text-body">{r.apolo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-[5vw]">
          <blockquote data-aparece className="border-l-2 border-carmin pl-5">
            <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug">{luna.cita}</p>
            <footer className="mt-3 text-[0.9rem] text-tinta-2">{luna.fuente}</footer>
          </blockquote>
          <p data-aparece className="self-end text-[0.95rem] text-tinta-2" style={{'--i': 1} as React.CSSProperties}>
            {luna.fallo}
          </p>
        </div>
      </div>
    </section>
  );
}
