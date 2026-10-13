import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from '../components/sounds';
import Menu from '../components/Menu';
import Notification from '../components/Notification';
import Tile from '../components/Tile';
import GameList from '../components/GameList';
import Controls from '../components/Controls';
import DvdScreensaver from '../components/DvdScreensaver';
import AboutMe from '../components/AboutMe';
import ThemeSelector from '../components/ThemeSelector';
import { buildGrid, gridRows, move, tileAtCell } from '../components/grid';
import { flash } from '../components/dom';
import { useDiscTray } from '../components/useDiscTray';
import { useTimeouts } from '../components/useTimeouts';
import { directionOf } from '../keys';
import type { TileProps } from '../interfaces';
import type { ScreenStatus } from '../types';

const A_RELEASE_DELAY = 500;
const REDIRECT_DELAY = 3000;

const TILES: TileProps[] = [
    { size: 'small', text: 'Open Tray', icon: '/disc-tray.png' },
    { size: 'small', text: 'Change Theme', icon: '/theme-selector.png', open: 'theme-selector' },
    { size: 'small', image: '/youtube.png', redirect: 'https://www.youtube.com/@faell4328' },
    { size: 'big', image: '/blog.png', redirect: 'https://rhafaell.com.br' },
    { size: 'small', text: 'Favorites Games', icon: '/mygames.png', open: 'games' },
    { size: 'small', text: 'About Me', icon: '/about.png', open: 'about-me' },
    { size: 'small', image: '/github.png', redirect: 'https://github.com/Faell4328' },
];

const TRAY_TILE = 0;

const GRID = buildGrid(TILES);
const LAYOUT = gridRows(GRID);

function redirectMobileUser() {
    window.location.href = 'https://www.google.com/search?q=cat';
}

function sceneClassName(screen: ScreenStatus, closing: boolean): string {
    if (screen === 'menu') return 'scene-hidden';
    if (screen !== 'dashboard') return closing ? 'zoom-out' : 'zoom-in';
    return closing ? 'scene-hidden' : 'scene-visible';
}

export default function Dashboard() {
    const [theme, setTheme] = useState('xbox');
    const { status: discStatus, statusRef, toggleTray } = useDiscTray();
    const schedule = useTimeouts();

    const [screen, setScreen] = useState<ScreenStatus>('menu');
    const [closing, setClosing] = useState(false);
    const [selectedCell, setSelectedCell] = useState(0);
    const [aPressed, setAPressed] = useState(false);
    const [notification, setNotification] = useState({ text: '', nonce: 0 });

    const arrowsIconRef = useRef<HTMLImageElement>(null);
    const aIconRef = useRef<HTMLImageElement>(null);
    const bIconRef = useRef<HTMLImageElement>(null);
    const invalidKeyCount = useRef(0);
    const aPressTimeoutRef = useRef<number | undefined>(undefined);

    const notify = useCallback((text: string) => {
        setNotification((previous) => ({ text, nonce: previous.nonce + 1 }));
    }, []);

    const startClose = useCallback((source: string) => {
        playSound(source === 'menu' ? 'hud-open.wav' : 'back.mp3');
        setClosing(true);
    }, []);

    const finishClose = useCallback((withSound = true) => {
        if (withSound) playSound('startup-after-loading.wav');
        setClosing(false);
        setScreen('dashboard');
    }, []);

    useEffect(() => () => clearTimeout(aPressTimeoutRef.current), []);

    const handleSelect = useCallback(() => {
        setAPressed(true);
        clearTimeout(aPressTimeoutRef.current);
        aPressTimeoutRef.current = setTimeout(() => setAPressed(false), A_RELEASE_DELAY);
        flash(aIconRef.current);

        const tileIndex = tileAtCell(GRID, selectedCell);

        if (tileIndex === TRAY_TILE) {
            if (statusRef.current === 'Play') {
                playSound('hud-open.wav');
                setScreen('dvd-screensaver');
            } else {
                toggleTray();
            }
            return;
        }

        const tile = tileIndex === null ? undefined : TILES[tileIndex];
        playSound('hud-open.wav');

        if (tile?.redirect) {
            notify('You will be redirected in 3 seconds');
            schedule(() => {
                window.location.href = tile.redirect as string;
            }, REDIRECT_DELAY);
        } else if (tile?.open) {
            setScreen(tile.open);
        }
    }, [selectedCell, notify, statusRef, toggleTray, schedule]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (screen !== 'dashboard' || closing) return;

            const direction = directionOf(event.key);
            if (direction) {
                flash(arrowsIconRef.current);
                const next = move(GRID, selectedCell, direction);
                if (next !== null) {
                    setSelectedCell(next);
                    playSound('tile-hover.wav');
                }
                invalidKeyCount.current = 0;
                return;
            }

            if (event.key === 'a') {
                handleSelect();
                return;
            }

            invalidKeyCount.current += 1;
            if (invalidKeyCount.current > 5) {
                notify(
                    "You are pressing invalid keys, only the arrow keys and the keys 'a', 'b', 'x' and 'y' are allowed"
                );
                invalidKeyCount.current = 0;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [screen, closing, selectedCell, notify, handleSelect]);

    const selectedTile = tileAtCell(GRID, selectedCell);
    const isSelected = (tileIndex: number) =>
        screen === 'dashboard' && !closing && !aPressed && selectedTile === tileIndex;

    return (
        <main
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 50%, rgba(0, 0, 0, 0.5)),url('bg-${theme}.jpg')`,
            }}
            className="dashboard has-wallpaper"
        >
            <Notification message={notification.text} nonce={notification.nonce} />
            {screen === 'menu' && (
                <Menu
                    closing={closing}
                    onConfirm={startClose}
                    onReject={redirectMobileUser}
                    onClosed={finishClose}
                />
            )}
            {screen === 'theme-selector' && (
                <ThemeSelector
                    closing={closing}
                    onClosing={startClose}
                    onClosed={finishClose}
                    bIconRef={bIconRef}
                    theme={theme}
                    setTheme={setTheme}
                />
            )}
            {screen === 'dvd-screensaver' && (
                <DvdScreensaver
                    closing={closing}
                    onClosing={startClose}
                    onClosed={finishClose}
                    bIconRef={bIconRef}
                />
            )}
            {screen === 'about-me' && (
                <AboutMe
                    closing={closing}
                    onClosing={startClose}
                    onClosed={finishClose}
                    bIconRef={bIconRef}
                />
            )}
            <div>
                {screen === 'games' && (
                    <GameList
                        closing={closing}
                        onClosing={startClose}
                        onClosed={finishClose}
                        bIconRef={bIconRef}
                    />
                )}
                <div
                    id="scene"
                    className={sceneClassName(screen, closing)}
                    style={screen === 'menu' && !closing ? { display: 'none' } : undefined}
                >
                    <nav></nav>
                    <table className="tiles-grid">
                        <tbody>
                            {LAYOUT.map((rowTiles, row) => (
                                <tr key={row}>
                                    {rowTiles.map((tileIndex) => (
                                        <Tile
                                            key={tileIndex}
                                            {...TILES[tileIndex]}
                                            status={
                                                tileIndex === TRAY_TILE ? discStatus : undefined
                                            }
                                            selected={isSelected(tileIndex)}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Controls
                    closing={closing}
                    screen={screen}
                    arrowsIconRef={arrowsIconRef}
                    aIconRef={aIconRef}
                    bIconRef={bIconRef}
                />
            </div>
        </main>
    );
}
