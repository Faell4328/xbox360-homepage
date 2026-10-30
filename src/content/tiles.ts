import type { TileProps } from '../interfaces';

export const TILES: TileProps[] = [
    { size: 'small', text: 'Open Tray', icon: '/disc-tray.png' },
    { size: 'small', text: 'Change Theme', icon: '/theme-selector.png', open: 'theme-selector' },
    { size: 'small', image: '/youtube.png', redirect: 'https://www.youtube.com/@faell4328' },
    { size: 'big', image: '/blog.png', redirect: 'https://blog.rhafaell.com.br' },
    { size: 'small', text: 'Favorites Games', icon: '/mygames.png', open: 'games' },
    { size: 'small', text: 'About Me', icon: '/about.png', open: 'about-me' },
    { size: 'small', image: '/github.png', redirect: 'https://github.com/Faell4328' },
];

export const TRAY_TILE = 0;
