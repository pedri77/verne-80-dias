import {L, commons, creditos, vuelta} from '../content';
import {useAparecer} from '../hooks/useAparecer';
import {irA} from '../lib/scroll';

/** Fuentes, cada grabado con su enlace a Commons, y método. */
export function Creditos() {
  const ref = useAparecer<HTMLElement>();
  const lic = (s: string) => (s === 'Public domain' ? 'Dominio público' : s);
  const imagenes: [string, string][] = [
    ['02', 'Frontispicio'],
    ...vuelta.escalas.map((e, i): [string, string] => [e.img, `${String(i + 1).padStart(2, '0')} · ${e.titulo}`]),
    ['01', 'Mapa de la ruta'],
    ['luna-fuego', '«¡Fuego!», De la Terre à la Lune (1866)'],
    ['luna-apolo8', 'La Tierra desde la Luna, Apolo 8 (NASA)'],
  ];
  return (
    <footer ref={ref} aria-labelledby="creditos-titulo" className="bg-papel-2 px-4 pt-[12svh] pb-10 sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <h2 id="creditos-titulo" data-aparece className="font-display text-display">
          {creditos.titulo}
        </h2>
        <ul className="mt-6 grid gap-2.5 text-body md:grid-cols-2">
          {creditos.fuentes.map((f) => (
            <li key={f.url}>
              <a href={f.url} target="_blank" rel="noreferrer" className="underline decoration-tinta/30 underline-offset-4 hover:decoration-carmin">
                {f.nombre} ↗
              </a>
            </li>
          ))}
        </ul>
        <h3 className="rotulo mt-12 text-tinta-2">Imágenes</h3>
        <p className="mt-3 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.laminas}</p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[0.9375rem] text-tinta-2 md:grid-cols-2">
          {imagenes.map(([k, t]) => (
            <li key={k + t} className="border-b border-tinta/12 pb-1.5">
              <a href={commons(L[k].fichero)} target="_blank" rel="noreferrer" className="text-tinta underline decoration-tinta/25 underline-offset-4 hover:decoration-carmin">
                {t}
              </a>
              . {lic(L[k].licencia)}.
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.metodo}</p>
        <button type="button" onClick={() => irA('#inicio')} className="rotulo mt-8 rounded-full border border-tinta/50 px-5 py-2.5 transition-colors hover:border-carmin hover:bg-carmin hover:text-papel">
          ↑ Volver a Londres
        </button>
        <p className="mt-10 font-display text-[1.75rem] text-carmin">{creditos.firma}</p>
      </div>
    </footer>
  );
}
