import type { TileProps } from './Tile';

export const COLS = 5;
export const ROWS = 3;

export type Direction = 'up' | 'down' | 'left' | 'right';

const DELTA: Record<Direction, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};

export type Grid = (number | null)[][];

export function buildGrid(tiles: TileProps[]): Grid {
    const grid: Grid = Array.from({ length: ROWS }, () => Array<number | null>(COLS).fill(null));

    let row = 0;
    let col = 0;

    tiles.forEach((tile, index) => {
        while (row < ROWS && grid[row][col] !== null) {
            col++;
            if (col === COLS) {
                col = 0;
                row++;
            }
        }
        if (row >= ROWS) return;

        grid[row][col] = index;
        if (tile.size === 'big') {
            grid[row][col + 1] = index;
            grid[row + 1][col] = index;
            grid[row + 1][col + 1] = index;
        }

        col++;
        if (col === COLS) {
            col = 0;
            row++;
        }
    });

    return grid;
}

export function tileAtCell(grid: Grid, cell: number): number | null {
    const row = Math.floor(cell / COLS);
    const col = cell % COLS;
    return grid[row]?.[col] ?? null;
}

export function move(grid: Grid, cell: number, direction: Direction): number | null {
    const row = Math.floor(cell / COLS);
    const col = cell % COLS;
    const current = grid[row]?.[col] ?? null;
    const [dr, dc] = DELTA[direction];

    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        const tile = grid[r][c];
        if (tile !== null && tile !== current) return r * COLS + c;
        r += dr;
        c += dc;
    }

    return null;
}

export function gridRows(grid: Grid): number[][] {
    return grid
        .map((rowTiles, row) =>
            rowTiles.filter(
                (tile, col): tile is number =>
                    tile !== null &&
                    (col === 0 || rowTiles[col - 1] !== tile) &&
                    (row === 0 || grid[row - 1][col] !== tile)
            )
        )
        .filter((rowTiles) => rowTiles.length > 0);
}
