# Film Development Timer

A browser-based timer for black & white film development. No backend required — runs entirely as a static site served via GitHub Pages.

## Features

- **Step-by-step workflow** — Developer, Stop Bath, Fixer, Wash, Final Rinse
- **Agitation timing** — Visual and audio cues with configurable tones (Pulse, Metronome, Chime, Tokyo Crosswalk, etc.)
- **Voice announcements** — Hands-free operation with male/female voice options
- **Preparation countdown** — 5–60 second countdown to prepare chemicals
- **Dark theme UI** — Darkroom-friendly
- **iOS 12+ compatible** — Works on older Safari versions

## Supported Films & Developers

Includes development times for Ilford HP5/FP4/Delta, Kentmere Pan, Kodak Tri-X/T-Max, Lomography, Yashica Mono, and Oriental Seagull — with Super Purodoll (D-76 eq), Kodak XTOL, and Fujifilm Microfine.

## Customizing

Edit `data.json` to add films, developers, or recipes. The file uses a normalized schema (v1) with separate `films`, `developers`, and `recipes` arrays, plus `workflowDefaults` for configuring workflow steps.

If `data.json` is missing or fails to load, the app falls back to an embedded recipe list.

## Running Locally

Open `index.html` directly, or serve with any static server:

```bash
python3 -m http.server 8080
```

## License

MIT
