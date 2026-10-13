import type { TileProps } from '../interfaces';
import type { Direction, Grid } from '../types';

export const COLUMN_COUNT = 5;
export const ROW_COUNT = 3;

const DELTA: Record<Direction, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};

export function buildGrid(tiles: TileProps[]): Grid {
    const grid: Grid = Array.from({ length: ROW_COUNT }, () =>
        Array<number | null>(COLUMN_COUNT).fill(null)
    );

    let row = 0;
    let col = 0;

    tiles.forEach((tile, index) => {
        while (row < ROW_COUNT && grid[row][col] !== null) {
            col++;
            if (col === COLUMN_COUNT) {
                col = 0;
                row++;
            }
        }
        if (row >= ROW_COUNT) return;

        grid[row][col] = index;
        if (tile.size === 'big') {
            grid[row][col + 1] = index;
            grid[row + 1][col] = index;
            grid[row + 1][col + 1] = index;
        }

        col++;
        if (col === COLUMN_COUNT) {
            col = 0;
            row++;
        }
    });

    return grid;
}

export function tileAtCell(grid: Grid, cell: number): number | null {
    const row = Math.floor(cell / COLUMN_COUNT);
    const col = cell % COLUMN_COUNT;
    return grid[row]?.[col] ?? null;
}

export function move(grid: Grid, cell: number, direction: Direction): number | null {
    const row = Math.floor(cell / COLUMN_COUNT);
    const col = cell % COLUMN_COUNT;
    const current = grid[row]?.[col] ?? null;
    const [dr, dc] = DELTA[direction];

    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < ROW_COUNT && c >= 0 && c < COLUMN_COUNT) {
        const tile = grid[r][c];
        if (tile !== null && tile !== current) return r * COLUMN_COUNT + c;
        r += dr;
        c += dc;
    }

    return null;
}

export function gridRows(grid: Grid): number[][] {
    return grid
        .map((rowTiles, row) =>
            rowTiles.filter((tile, col): tile is number => {
                if (tile === null) return false;
                const continuesFromLeft = col > 0 && rowTiles[col - 1] === tile;
                const continuesFromTop = row > 0 && grid[row - 1][col] === tile;
                return !continuesFromLeft && !continuesFromTop;
            })
        )
        .filter((rowTiles) => rowTiles.length > 0);
}
