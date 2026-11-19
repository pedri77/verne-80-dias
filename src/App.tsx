import {useEffect} from 'react';
import {Creditos} from './components/Creditos';
import {Giro} from './components/Giro';
import {Luna} from './components/Luna';
import {Portada} from './components/Portada';
import {Records} from './components/Records';
import {Viaje} from './components/Viaje';
import {useMovimientoReducido} from './hooks/useMovimientoReducido';
import {iniciarScroll} from './lib/scroll';

/** Orden del guion: la tapa · el viaje en el globo · el día de más · la Luna · los récords · fuentes. */
export default function App() {
  const reducido = useMovimientoReducido();
  useEffect(() => iniciarScroll(reducido), [reducido]);
  return (
    <main>
      <Portada />
      <Viaje />
      <Giro />
      <Luna />
      <Records />
      <Creditos />
    </main>
  );
}
