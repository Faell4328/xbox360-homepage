export type Direction = 'up' | 'down' | 'left' | 'right';

export type DiscStatus = 'Open Tray' | 'Closed Tray' | 'Reading' | 'Play';

export type Grid = (number | null)[][];

export type ScreenStatus =
    | 'menu'
    | 'dashboard'
    | 'games'
    | 'dvd-screensaver'
    | 'about-me'
    | 'theme-selector';
