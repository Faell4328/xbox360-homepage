import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import '../style/components/games.css';
import Game from './Game';
import { playSound } from './sounds';

const GAMES = [
    {
        name: 'Happy Wars',
        image: 'happy-wars.jpg',
        icon: 'xbox',
    },
    {
        name: 'Supreme Commander 2',
        image: 'supreme-commander-2.jpg',
        icon: ['xbox', 'steam'],
    },
    {
        name: 'Turing Complete',
        image: 'turing-complete.jpg',
        icon: 'steam',
    },
    {
        name: 'Dyson Sphere Program',
        image: 'dyson-sphere-program.jpg',
        icon: 'steam',
    },
    {
        name: 'Skyrim',
        image: 'skyrim.jpg',
        icon: ['xbox', 'pc'],
    },
    {
        name: 'Minecraft',
        image: 'minecraft.jpeg',
        icon: ['xbox', 'pc'],
    },
    {
        name: 'Midnight Club: Los Angeles',
        image: 'midnight-club-lo.jpg',
        icon: 'xbox',
    },
    {
        name: 'Gears of War 2',
        image: 'gears-of-war-2.jpg',
        icon: 'xbox',
    },
    {
        name: 'Forza Horizon',
        image: 'forza-horizon.jpg',
        icon: 'xbox',
    },
    {
        name: 'Astroneer',
        image: 'astroneer.jpg',
        icon: 'steam',
    },
    {
        name: 'Bordelands',
        image: 'bordelands.jpg',
        icon: 'xbox',
    },
];

interface GamesProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function GameList({ closing, onClosing, onClosed, bIconRef }: GamesProps) {
    const listGameRef = useRef<HTMLDivElement | null>(null);
    const selectedGameRef = useRef(0);
    const [selectedGame, setSelectedGame] = useState<number>(0);
    const [translate, setTranslate] = useState<number>(0);

    const flash = useCallback((element: HTMLElement | null) => {
        if (!element) return;
        element.classList.remove('btn-flash');
        void element.offsetWidth;
        element.classList.add('btn-flash');
    }, []);

    useEffect(() => {
        const STEP = 400; // 380 (card) + 20 (gap)
        const PADDING = 120; // padding: 60px em .games-page

        const visibleArea = window.innerWidth - PADDING;
        const visible = Math.max(1, Math.floor((visibleArea + 20) / STEP));

        const page = Math.floor(selectedGameRef.current / visible);
        const totalWidth = GAMES.length * STEP - 20;
        const maxScroll = Math.max(0, totalWidth - visibleArea);

        const target = Math.min(page * visible * STEP, maxScroll);
        setTranslate(-target);
    }, [selectedGame]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                if (selectedGameRef.current <= 0) return;
                playSound('tile-hover.wav');
                selectedGameRef.current -= 1;
                setSelectedGame(selectedGameRef.current);
            } else if (event.key === 'ArrowRight') {
                if (selectedGameRef.current >= GAMES.length - 1) return;
                playSound('tile-hover.wav');
                selectedGameRef.current += 1;
                setSelectedGame(selectedGameRef.current);
            } else if (event.key === 'b') {
                flash(bIconRef.current);
                onClosing('games');
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, onClosed]);

    return (
        <div
            className={'games-page' + (closing ? ' games-hidden' : ' games-show')}
            onAnimationEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <div
                ref={listGameRef}
                style={{ transform: `translateX(${translate}px)` }}
                className="game-list-container"
            >
                {GAMES.map((value, index) => (
                    <Game
                        key={index}
                        img={`/games/${value.image}`}
                        name={value.name}
                        icon={value.icon}
                        selected={selectedGame == index}
                    />
                ))}
            </div>
        </div>
    );
}
