import type { Direction } from '../types';

const DIRECTION_KEYS: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

export function directionOf(key: string): Direction | undefined {
    return DIRECTION_KEYS[key];
}

export function verticalStep(key: string): -1 | 0 | 1 {
    const direction = directionOf(key);
    if (direction === 'up') return -1;
    if (direction === 'down') return 1;
    return 0;
}

export function horizontalStep(key: string): -1 | 0 | 1 {
    const direction = directionOf(key);
    if (direction === 'left') return -1;
    if (direction === 'right') return 1;
    return 0;
}
