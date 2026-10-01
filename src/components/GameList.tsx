import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import '../style/components/games.css';
import Game from './Game';
import { playSound } from './sounds';

const GAMES = [
    {
        name: 'Minecraft',
        image: 'minecraft.jpeg',
    },
    {
        name: 'Happy Wars',
        image: 'happy-wars.jpg',
    },
];

interface GamesProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function GameList({ closing, onClosing, onClosed, bIconRef }: GamesProps) {
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
        if (selectedGameRef.current % 3 == 0) {
            setTranslate((selectedGameRef.current / 3) * 50 * -1);
        }
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
                style={{ transform: `translateX(${translate}dvw)` }}
                className="game-list-container"
            >
                {GAMES.map((value, index) => (
                    <Game
                        key={index}
                        img={`/games/${value.image}`}
                        name={value.name}
                        selected={selectedGame == index}
                    />
                ))}
            </div>
        </div>
    );
}
