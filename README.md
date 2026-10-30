# Xbox 360 Homepage

A personal homepage that recreates the Xbox 360 dashboard: tile grid, boot menu, navigation sounds, themes and the classic DVD screensaver. Built with React 19, Vite, TypeScript and plain CSS.

> **Desktop only.** Navigation is keyboard-based, so the layout is not meant for phones or tablets.

## Features

- **Boot menu** — asks whether you are on a computer before entering the dashboard.
- **Tile grid** — arrow keys move the selection, `A` opens a tile, `B` goes back.
- **Disc tray** — a working tray tile with open/close and disc-reading states.
- **DVD screensaver** — play the disc and watch the logo bounce (with a small surprise).
- **Themes** — Xbox, Spectrum, Day, Night and Hajime no Ippo wallpapers.
- **Extras** — favorites game list, about me page, notifications, sound effects and a CRT effect.

## Controls

| Key | Action |
| --- | --- |
| `←` `↑` `→` `↓` | Move between tiles |
| `A` | Select / confirm |
| `B` | Back |

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev      # development server
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Notes

This is a fan project, not affiliated with Microsoft. Xbox 360 is a trademark of Microsoft Corporation; some images and sounds belong to their respective owners.
