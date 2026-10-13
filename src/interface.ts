import type { RefObject } from 'react';

export interface TileProps {
    size: 'big' | 'small';
    text?: string;
    icon?: string;
    image?: string;
    redirect?: string;
    status?: string;
    open?: 'games' | 'dvd-screensaver' | 'about-me' | 'theme-selector';
}

export interface ScreenProps {
    closing: boolean;
    onClosing: (source: string) => void;
    onClosed: (withSound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}
