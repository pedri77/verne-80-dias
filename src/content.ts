import laminas from './datos/laminas.json';
import lugares from './datos/lugares.json';

type Lamina = {w: number; h: number; fichero: string; licencia: string};
export const L = laminas as Record<string, Lamina>;
export const LUGAR = lugares as unknown as Record<string, [number, number]>;

const base = import.meta.env.BASE_URL;
export const img = (k: string) => `${base}img/${k}.webp`;
export const commons = (f: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.replace(/ /g, '_'))}`;

export const portada = {
  antetitulo: 'Jules Verne · 1873 · grabados de Neuville y Benett',
  titulo: ['La vuelta', 'al mundo', 'en 80 días'],
  entradilla:
    'El 2 de octubre de 1872, a las 20:45, Phileas Fogg sale del Reform Club de Londres con una apuesta de 20.000 libras: estar de vuelta en ese mismo salón ochenta días después. Gira el globo con él, escala a escala, con los grabados de la primera edición ilustrada.',
  aviso: 'Desplázate para zarpar',
};

/**
 * Las escalas del viaje. `fecha` es la del calendario de Fogg (el que él llevaba, que al final resulta ir un día
 * adelantado). `ruta` son los puntos por los que pasa la línea desde la escala anterior; el último es la escala.
 * `hora` solo aparece cuando Verne la da.
 */
export type Escala = {
  lugar: string;
  donde: string;
  fecha: string;
  hora?: string;
  medio: string;
  ruta: ([number, number] | string)[];
  titulo: string;
  texto: string;
  img: string;
};

export const vuelta: {titulo: string; escalas: Escala[]} = {
  titulo: 'El viaje',
  escalas: [
    {
      lugar: 'londres', donde: 'Londres', fecha: '1872-10-02', hora: '20:45', medio: 'Reform Club', ruta: ['londres'], img: '06',
      titulo: 'La apuesta',
      texto: 'Apuesta 20.000 libras, la mitad de su fortuna, a que da la vuelta al mundo en ochenta días. La otra mitad se la lleva en billetes para el camino. Sale esa misma noche con Passepartout, su criado desde hace unas horas.',
    },
    {
      lugar: 'suez', donde: 'Suez', fecha: '1872-10-09', hora: '11:00', medio: 'Tren por el Mont-Cenis y vapor Mongolia', ruta: ['paris', 'turin', 'brindisi', [21.5, 35.6], [32.3, 31.3], 'suez'], img: '09',
      titulo: 'Un detective en el muelle',
      texto: 'Lo espera el inspector Fix, convencido de que Fogg es el ladrón que se llevó 55.000 libras del Banco de Inglaterra tres días antes de la apuesta. Lo seguirá durante todo el viaje esperando una orden de arresto.',
    },
    {
      lugar: 'bombay', donde: 'Bombay', fecha: '1872-10-20', medio: 'Vapor Mongolia, por Adén', ruta: [[34.5, 26], [42.5, 14.5], 'aden', [58, 15], 'bombay'], img: '10',
      titulo: 'Dos días de ventaja',
      texto: 'El Mongolia llega antes de lo previsto: Fogg va dos días por delante. Passepartout, mientras tanto, entra con zapatos en la pagoda de Malabar Hill y sale a golpes de tres sacerdotes.',
    },
    {
      lugar: 'kholby', donde: 'Kholby', fecha: '1872-10-22', medio: 'Tren de la Great Indian Peninsula', ruta: [[75.8, 21.2], 'kholby'], img: '18',
      titulo: 'La vía no está terminada',
      texto: 'El tren se para en mitad de la selva: faltan unas cincuenta millas de vía hasta Allahabad. Fogg compra un elefante, Kiouni, por 2.000 libras y sigue a lomos de él.',
    },
    {
      lugar: 'pillaji', donde: 'Pagoda de Pillaji', fecha: '1872-10-24', medio: 'A lomos de Kiouni', ruta: ['pillaji'], img: '22',
      titulo: 'Un rescate por el camino',
      texto: 'Por la noche se cruzan con una procesión: van a quemar viva a una joven viuda, Aouda, al amanecer. Fogg decide gastar las horas de ventaja en salvarla. Passepartout se cuela disfrazado de su marido muerto.',
    },
    {
      lugar: 'calcuta', donde: 'Calcuta', fecha: '1872-10-25', medio: 'Tren desde Allahabad', ruta: ['allahabad', 'calcuta'], img: '16',
      titulo: 'Ni adelanto ni retraso',
      texto: 'Llega el día que marcaba su itinerario, veintitrés días después de salir de Londres. Los dos días ganados en el mar se han quedado en la India, y según Verne a Fogg no le pesan.',
    },
    {
      lugar: 'hongkong', donde: 'Hong Kong', fecha: '1872-11-06', medio: 'Vapor Rangoon, por Singapur', ruta: [[90.5, 15.5], [96.5, 8], [99, 5], 'singapur', [109, 9], 'hongkong'], img: '29',
      titulo: 'El fumadero',
      texto: 'Una tormenta en el mar de China lo retrasa veinticuatro horas. Fix emborracha a Passepartout en un fumadero de opio para que no avise a su amo, y el Carnatic zarpa hacia Yokohama sin Fogg.',
    },
    {
      lugar: 'shanghai', donde: 'Frente a Shanghái', fecha: '1872-11-11', hora: '19:00', medio: 'Goleta Tankadère', ruta: [[118.5, 24], 'shanghai'], img: '34',
      titulo: 'Una goleta en la tormenta',
      texto: 'Alquila una goleta de práctico, la Tankadère, para alcanzar en Shanghái el vapor a San Francisco. Llega a la boca del puerto justo cuando sale y lo para a cañonazos de señal.',
    },
    {
      lugar: 'yokohama', donde: 'Yokohama', fecha: '1872-11-14', medio: 'Vapor General Grant', ruta: [[127, 31], [131, 30.2], [136, 33.3], 'yokohama'], img: '37-bw',
      titulo: 'Los Narices Largas',
      texto: 'Passepartout, sin un penique, se ha enrolado como acróbata en el circo del honorable Batulcar. Fogg lo encuentra en la base de una pirámide humana, que se viene abajo cuando lo ve.',
    },
    {
      lugar: 'meridiano', donde: 'Meridiano 180°', fecha: '1872-11-23', medio: 'Vapor General Grant', ruta: ['meridiano'], img: '28',
      titulo: 'El reloj vuelve a tener razón',
      texto: 'Passepartout nunca ha cambiado su reloj de familia: lleva la hora de Londres. Ese día, a doce horas de distancia, su esfera marca lo mismo que los cronómetros del barco y se convence de que el resto del mundo estaba equivocado.',
    },
    {
      lugar: 'sanfrancisco', donde: 'San Francisco', fecha: '1872-12-03', medio: 'Vapor General Grant', ruta: ['sanfrancisco'], img: '40',
      titulo: 'Un mitin a puñetazos',
      texto: 'Entre dos trenes, Fogg y Fix acaban en medio de un mitin electoral que termina a golpes. Un coronel, Stamp W. Proctor, lanza un puñetazo a Fogg y lo recibe Fix, que se pone en medio. Fogg y Proctor quedan en verse otro día.',
    },
    {
      lugar: 'ogden', donde: 'Pradera de Wyoming', fecha: '1872-12-06', medio: 'Ferrocarril del Pacífico', ruta: [[-120, 39.3], [-114, 41.4], 'ogden', [-107, 41.6]], img: '42',
      titulo: 'Bisontes en la vía',
      texto: 'Una manada de miles de bisontes cruza la vía y el tren espera tres horas parado. Después, en Medicine Bow, el maquinista cruza un puente roto a toda velocidad y el puente se hunde detrás.',
    },
    {
      lugar: 'kearney', donde: 'Fuerte Kearney', fecha: '1872-12-07', medio: 'Ferrocarril del Pacífico', ruta: [[-104, 41.1], 'kearney'], img: '48',
      titulo: 'El ataque al tren',
      texto: 'Una partida de sioux asalta el tren. Passepartout desengancha la locomotora colgado bajo los vagones y se lo llevan prisionero. Fogg, que podía seguir, se queda y va a buscarlo con los soldados del fuerte.',
    },
    {
      lugar: 'omaha', donde: 'Omaha', fecha: '1872-12-09', medio: 'Trineo con vela', ruta: ['omaha'], img: '52',
      titulo: 'Un trineo con vela',
      texto: 'El tren se ha ido sin ellos. Cruzan las doscientas millas de pradera helada hasta Omaha en un trineo aparejado como un balandro, con la nieve dura y viento del oeste.',
    },
    {
      lugar: 'nuevayork', donde: 'Nueva York', fecha: '1872-12-11', hora: '23:15', medio: 'Tren por Chicago', ruta: ['chicago', 'nuevayork'], img: '54',
      titulo: 'Cuarenta y cinco minutos',
      texto: 'Llega al muelle cuando el China, el vapor de Liverpool, ha salido hace cuarenta y cinco minutos. Al día siguiente embarca en la Henrietta, un carguero con rumbo a Burdeos, y por la noche se hace con el mando.',
    },
    {
      lugar: 'queenstown', donde: 'Atlántico Norte', fecha: '1872-12-21', medio: 'Vapor Henrietta', ruta: [[-50, 45], [-25, 50], 'queenstown'], img: '55',
      titulo: 'Quemar el barco',
      texto: 'Se acaba el carbón. Fogg le compra el barco al capitán Speedy y manda echar a las calderas todo lo que sea de madera: camarotes, literas, mástiles. Llega a Irlanda con el casco de hierro casi desnudo.',
    },
    {
      lugar: 'liverpool', donde: 'Liverpool', fecha: '1872-12-21', hora: '11:40', medio: 'Correo por Dublín', ruta: ['dublin', 'liverpool'], img: '58',
      titulo: 'Detenido',
      texto: 'Fix por fin tiene su orden y lo arresta en el muelle. A las 14:33 llega la noticia: el verdadero ladrón, James Strand, está preso en Edimburgo desde el 17. Fogg tumba a Fix de un puñetazo y pide un tren especial.',
    },
    {
      lugar: 'londres', donde: 'Londres', fecha: '1872-12-21', hora: '20:50', medio: 'Tren especial', ruta: [[-2.2, 52.5], 'londres'], img: '59',
      titulo: 'Cinco minutos tarde',
      texto: 'Las horas perdidas en Liverpool no se recuperan. Llega a la estación cuando todos los relojes de Londres dan las nueve menos diez: cinco minutos después del plazo. Lo ha perdido todo.',
    },
  ],
};

export const giro = {
  antetitulo: 'Domingo 22 de diciembre, según su diario',
  titulo: 'Pero era sábado',
  texto: [
    'Al día siguiente Passepartout sale a buscar a un reverendo para la boda de Fogg con Aouda y descubre que el domingo es mañana. Fogg corre al Reform Club y entra en el salón cuando el reloj marca las 20:45. Ha ganado.',
    'Viajando hacia el este, cada grado de longitud le quitaba cuatro minutos al día. 360 grados por 4 minutos dan 24 horas justas: un día entero que nadie le avisó de que había ganado. Verne lo explica así:',
  ],
  cita: '«Mientras Phileas Fogg, yendo hacia el este, veía pasar el sol ochenta veces por el meridiano, sus colegas que se habían quedado en Londres solo lo veían pasar setenta y nueve.»',
  cuentas: [
    {cifra: '80', texto: 'mediodías vistos por Fogg'},
    {cifra: '79', texto: 'mediodías en Londres'},
    {cifra: '≈ 19.000 £', texto: 'gastadas por el camino: de las 20.000 ganadas le quedan unas 1.000'},
    {cifra: '1.920 h', texto: 'de gas que Passepartout dejó encendido en casa (80 × 24). Fogg se las descuenta del sueldo'},
  ],
};

export type Fila = {dato: string; verne: string; apolo: string};

export const luna: {antetitulo: string; titulo: string; intro: string; filas: Fila[]; cita: string; fuente: string; fallo: string} = {
  antetitulo: 'La otra apuesta · 1865 / 1968',
  titulo: 'De la Tierra a la Luna',
  intro:
    'Ocho años antes de la vuelta al mundo, Verne mandó a tres hombres a la Luna dentro de una bala de aluminio disparada por un cañón de 274 metros, la Columbiad. En la segunda parte, Alrededor de la Luna (por entregas en 1869), la rodean sin posarse y caen al Pacífico. Cien años después, el Apolo 8 hizo casi lo mismo.',
  filas: [
    {dato: 'Desde', verne: 'Stone’s Hill, Florida, 27° 7′ N', apolo: 'Cabo Kennedy, Florida, 28° 27′ N'},
    {dato: 'Salida', verne: '1 de diciembre, 22:46:40', apolo: '21 de diciembre de 1968, 7:51'},
    {dato: 'A bordo', verne: 'Barbicane, Nicholl y Ardan', apolo: 'Borman, Lovell y Anders'},
    {dato: 'En la Luna', verne: 'La rodean sin posarse', apolo: 'Diez órbitas sin posarse'},
    {dato: 'Vuelta', verne: 'Cae al Pacífico el 12 de diciembre', apolo: 'Amerizaje en el Pacífico el 27 de diciembre'},
    {dato: 'Los recoge', verne: 'La corbeta Susquehanna, de la Marina de EE. UU.', apolo: 'El portaaviones Yorktown, de la Marina de EE. UU.'},
  ],
  cita: '«Hace cien años, Julio Verne escribió un libro sobre un viaje a la Luna. Su nave, Columbia, despegó de Florida y aterrizó en el océano Pacífico después de completar un viaje a la Luna.»',
  fuente: 'Neil Armstrong, desde el Apolo 11 de vuelta a casa, 23 de julio de 1969. La nave de Verne se llamaba en realidad Columbiad, como el cañón; la del Apolo 11, Columbia.',
  fallo: 'En lo que no acertó: un disparo de cañón acelera de golpe, no durante minutos como un cohete. Los tres pasajeros habrían quedado aplastados contra el suelo de la bala.',
};

export type Record_ = {año: string; quien: string; como: string; tiempo: string; horas: number};

export const records: {antetitulo: string; titulo: string; intro: string; filas: Record_[]; cierre: string} = {
  antetitulo: 'La apuesta, de verdad',
  titulo: 'De 80 días a 108 minutos',
  intro:
    'Dieciséis años después del libro, dos periodistas de Nueva York salieron a batir a Fogg con horas de diferencia, una hacia el este y otra hacia el oeste. Desde entonces, la vuelta al mundo no ha dejado de encogerse.',
  filas: [
    {año: '1872', quien: 'Phileas Fogg', como: 'Ficción. Tren, vapor, elefante y trineo', tiempo: '80 días', horas: 80 * 24},
    {año: '1890', quien: 'Elizabeth Bisland', como: 'Hacia el oeste, solo con transporte regular', tiempo: '76 días y medio', horas: 76.5 * 24},
    {año: '1890', quien: 'Nellie Bly', como: 'Hacia el este. Por el camino visitó a Verne en Amiens', tiempo: '72 días, 6 h, 11 min', horas: 72 * 24 + 6.18},
    {año: '1890', quien: 'George Francis Train', como: 'Barco y tren, desde Tacoma', tiempo: '67 días, 12 h, 3 min', horas: 67 * 24 + 12.05},
    {año: '1929', quien: 'Graf Zeppelin', como: 'Dirigible, de Lakehurst a Lakehurst', tiempo: '21 días, 5 h, 31 min', horas: 21 * 24 + 5.52},
    {año: '1933', quien: 'Wiley Post', como: 'Avión, solo, con piloto automático', tiempo: '7 días, 19 h, 49 min', horas: 7 * 24 + 19.82},
    {año: '1938', quien: 'Howard Hughes', como: 'Avión, con tres tripulantes', tiempo: '3 días, 19 h, 17 min', horas: 3 * 24 + 19.28},
    {año: '1961', quien: 'Yuri Gagarin', como: 'Una órbita a bordo del Vostok 1', tiempo: '108 minutos', horas: 1.8},
  ],
  cierre: 'Las barras están en escala logarítmica: si fueran lineales, la de Gagarin no llegaría a un píxel.',
};

export const creditos = {
  titulo: 'Fuentes',
  fuentes: [
    {nombre: 'Le Tour du monde en quatre-vingts jours, texto completo (Wikisource)', url: 'https://fr.wikisource.org/wiki/Le_Tour_du_monde_en_quatre-vingts_jours'},
    {nombre: 'De la Terre à la Lune y Autour de la Lune (Wikisource)', url: 'https://fr.wikisource.org/wiki/De_la_Terre_%C3%A0_la_Lune'},
    {nombre: 'Grabados de Neuville y Benett (Wikimedia Commons)', url: 'https://commons.wikimedia.org/wiki/Category:Illustrations_from_Around_the_World_in_Eighty_Days_by_Neuville_and_Benett'},
    {nombre: 'Apollo 8: Mission Details (NASA)', url: 'https://www.nasa.gov/missions/apollo/apollo-8-mission-details/'},
    {nombre: 'Circumnavigation world record progression (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Circumnavigation_world_record_progression'},
    {nombre: 'Elizabeth Bisland (Science Museum Group)', url: 'https://collection.sciencemuseumgroup.org.uk/people/cp172999/elizabeth-bisland'},
    {nombre: 'Aerial circumnavigation records (OACI)', url: 'https://www.icao.int/sites/default/files/postalhistory/aviation_history_aerial_circumnavigation.htm'},
    {nombre: 'Costas: Natural Earth vía world-atlas', url: 'https://github.com/topojson/world-atlas'},
  ],
  laminas:
    'Grabados de Alphonse de Neuville y Léon Benett para la edición de Pierre-Jules Hetzel (1873), de dominio público, escaneados en Wikimedia Commons. Se muestran en gris y reducidos.',
  metodo:
    'Las fechas, horas y cifras del viaje salen del texto francés de Verne. Las del calendario de Fogg van un día por delante de las de Londres desde que cruza el meridiano 180°, como en el libro. Las rutas entre escalas son aproximadas: Verne da las ciudades, no el rumbo. Las citas de Verne y de Armstrong están traducidas al castellano para esta página. Textos propios, escritos con ayuda de IA y revisados contra las fuentes.',
  firma: 'Hecho con datos abiertos y material de dominio público.',
};
