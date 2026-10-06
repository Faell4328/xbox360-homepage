import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from '../components/sounds';
import Tile, { type TileProps } from '../components/Tile';
import Menu from '../components/Menu';
import Notification from '../components/Notification';
import { buildGrid, gridRows, move, tileAtCell, type Direction } from '../components/grid';
import GameList from '../components/GameList';
import Buttons from '../components/Buttons';
import DvdScreenSave from '../components/DvdScreenSave';
import AboutMe from '../components/AboutMe';
import ChangeTheme from '../components/ChangeTheme';

type DiscStatus = 'Open Tray' | 'Closed Tray' | 'Reading' | 'Play';

const DIRECTIONS: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

function rejectMenu() {
    window.location.href = 'https://www.google.com/search?q=cat';
}

export default function Dashboard() {
    const [theme, setTheme] = useState('xbox');
    const [discStatus, setDiscStatus] = useState<DiscStatus>('Open Tray');
    const discStatusRef = useRef<DiscStatus | null>(discStatus);

    const [screen, setScreen] = useState<
        'menu' | 'dashboard' | 'games' | 'dvd-screensave' | 'about-me' | 'change-theme'
    >('menu');
    const [closing, setClosing] = useState(false);
    const [selectedCell, setSelectedCell] = useState(0);
    const [aPressed, setAPressed] = useState(false);
    const [notification, setNotification] = useState({ text: '', nonce: 0 });

    const arrowsIconRef = useRef<HTMLImageElement>(null);
    const aIconRef = useRef<HTMLImageElement>(null);
    const bIconRef = useRef<HTMLImageElement>(null);
    const invalidKeyCount = useRef(0);
    const aPressTimeout = useRef<number | undefined>(undefined);

    const TILES: TileProps[] = [
        {
            size: 'small',
            text: 'Open Tray',
            icon: '/disc-tray.png',
            status: discStatus,
            open: 'dvd-screensave',
        },
        { size: 'small', text: 'Change Theme', icon: '/change-theme.png', open: 'change-theme' },
        {
            size: 'small',
            image: '/youtube.png',
            redirect: 'https://www.youtube.com/@faell4328',
        },
        { size: 'big', image: '/blog.png', redirect: 'https://rhafaell.com.br' },
        { size: 'small', text: 'Favorites Games', icon: '/mygames.png', open: 'games' },
        { size: 'small', text: 'About Me', icon: '/about.png', open: 'about-me' },
        {
            size: 'small',
            image: '/github.png',
            redirect: 'https://github.com/Faell4328',
        },
    ];

    const GRID = buildGrid(TILES);
    const LAYOUT = gridRows(GRID);

    const notify = useCallback((text: string) => {
        setNotification((previous) => ({ text, nonce: previous.nonce + 1 }));
    }, []);

    const flash = useCallback((element: HTMLElement | null) => {
        if (!element) return;
        element.classList.remove('btn-flash');
        void element.offsetWidth;
        element.classList.add('btn-flash');
    }, []);

    const startClose = useCallback((component: string) => {
        if (component == 'menu') {
            playSound('hud-open.wav');
        } else {
            playSound('back.mp3');
        }
        setClosing(true);
    }, []);

    const finishClose = useCallback((sound: boolean = true) => {
        if (sound) {
            playSound('startup-after-loading.wav');
        }
        setClosing(false);
        setScreen('dashboard');
    }, []);

    useEffect(() => () => clearTimeout(aPressTimeout.current), []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (screen !== 'dashboard' || closing) return;

            const direction = DIRECTIONS[event.key];
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
                setAPressed(true);
                clearTimeout(aPressTimeout.current);
                aPressTimeout.current = window.setTimeout(() => setAPressed(false), 500);
                flash(aIconRef.current);

                const tile = tileAtCell(GRID, selectedCell);
                const element = tile !== null ? TILES[tile] : undefined;
                if (element?.redirect) {
                    notify('You will be redirected in 3 seconds');
                    window.setTimeout(() => {
                        window.location.href = element.redirect as string;
                    }, 3000);
                } else if (
                    element?.open &&
                    (discStatusRef.current == 'Play' || element.status == undefined)
                ) {
                    setScreen(element.open);
                } else if (element?.text == 'Open Tray') {
                    if (discStatusRef.current == 'Open Tray') {
                        playSound('open-tray.mp3');
                        discStatusRef.current = null;
                        setTimeout(() => {
                            discStatusRef.current = 'Closed Tray';
                            setDiscStatus('Closed Tray');
                        }, 1400);
                    } else if (discStatusRef.current == 'Closed Tray') {
                        playSound('closed-tray.mp3');
                        discStatusRef.current = null;
                        setTimeout(() => {
                            discStatusRef.current = 'Reading';
                            setDiscStatus('Reading');
                            playSound('read-disc.mp3');
                            setTimeout(() => {
                                discStatusRef.current = 'Play';
                                setDiscStatus('Play');
                            }, 2800);
                        }, 1200);
                    }
                    return;
                }

                playSound('hud-open.wav');
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
    }, [screen, closing, selectedCell, notify, flash]);

    const containerClass =
        screen === 'menu'
            ? 'scene-hidden'
            : screen != 'dashboard'
              ? closing
                  ? 'zoom-out'
                  : 'zoom-in'
              : closing
                ? 'scene-hidden'
                : 'scene-visible';

    const selectedTile = tileAtCell(GRID, selectedCell);
    const isSelected = (tile: number) =>
        screen === 'dashboard' && !closing && !aPressed && selectedTile === tile;

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
                    onReject={rejectMenu}
                    onClosed={finishClose}
                />
            )}
            {screen === 'change-theme' && (
                <ChangeTheme
                    closing={closing}
                    onClosing={startClose}
                    onClosed={finishClose}
                    bIconRef={bIconRef}
                    theme={theme}
                    setTheme={setTheme}
                />
            )}
            {screen === 'dvd-screensave' && (
                <DvdScreenSave
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
                    id="container"
                    className={containerClass}
                    style={screen === 'menu' && !closing ? { display: 'none' } : undefined}
                >
                    <nav></nav>
                    <table className="tiles-grid">
                        <tbody>
                            {LAYOUT.map((rowTiles, row) => (
                                <tr key={row}>
                                    {rowTiles.map((tile) => (
                                        <Tile
                                            key={tile}
                                            {...TILES[tile]}
                                            selected={isSelected(tile)}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Buttons
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
