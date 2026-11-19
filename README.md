# La vuelta al mundo en 80 días

Scroll-driven site that follows Phileas Fogg around a globe, stop by stop, with the original 1873 Hetzel engravings by Alphonse de Neuville and Léon Benett.

- **The journey**: an orthographic globe (d3-geo, Natural Earth coastlines) turns with the scroll along Fogg's route. The carmine line is the distance travelled, the dashed one what is left. A HUD shows Fogg's calendar date, days spent and local solar time relative to London, which reaches 12 hours at the 180th meridian (the day Passepartout's watch is right again).
- **The extra day**: he arrives five minutes late, but it is Saturday, not Sunday. Travelling east he saw the Sun cross the meridian 80 times while London saw it 79.
- **The other bet**: *From the Earth to the Moon* (1865) and *Around the Moon* (1869) compared with Apollo 8 (1968).
- **The real bet**: the circumnavigation records that followed, from Nellie Bly to Gagarin, on a log scale.

All dates and figures for the journey come from Verne's French text (Wikisource). Engravings and the Apollo 8 photo are public domain (Wikimedia Commons, NASA).

## Run

```bash
npm install
npm run dev     # http://localhost:3026
npm run build
```

## Data scripts

```bash
uv run scripts/laminas.py   # engravings in datos-crudos/raw → public/img, src/datos/laminas.json
uv run scripts/luna.py      # Moon engraving crop + Apollo 8 photo (run after laminas.py)
```

`datos-crudos/` is not committed: it holds the Commons downloads used by the scripts.

## Credits

Scroll engine (Lenis + a single rAF loop writing styles to the DOM) from the `web-cinematica` skill. Text written with AI assistance and checked against the sources listed on the page.
