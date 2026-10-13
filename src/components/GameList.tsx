import { useEffect, useState } from 'react';
import '../style/components/games.css';
import Game from './Game';
import { playSound } from '../lib/sounds';
import { useBackButton } from '../hooks/useBackButton';
import { horizontalStep } from '../lib/keys';
import { GAMES } from '../content/games';
import type { ScreenProps } from '../interfaces';

const CARD_WIDTH = 380;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;
const PAGE_PADDING = 120; // 60px on each side of .games-page

export default function GameList({ closing, onClosing, onClosed, bIconRef }: ScreenProps) {
    const [selectedGame, setSelectedGame] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    useBackButton('games', { closing, onClosing, bIconRef });

    useEffect(() => {
        const visibleArea = window.innerWidth - PAGE_PADDING;
        const visibleCount = Math.max(1, Math.floor((visibleArea + GAP) / STEP));

        const page = Math.floor(selectedGame / visibleCount);
        const totalWidth = GAMES.length * STEP - GAP;
        const maxScroll = Math.max(0, totalWidth - visibleArea);
        const target = Math.min(page * visibleCount * STEP, maxScroll);

        setOffsetX(-target);
    }, [selectedGame]);

    useEffect(() => {
        if (closing) return;

        const onKeyDown = (event: KeyboardEvent) => {
            const step = horizontalStep(event.key);
            if (step === 0) return;

            const next = selectedGame + step;
            if (next < 0 || next >= GAMES.length) return;

            setSelectedGame(next);
            playSound('tile-hover.wav');
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, selectedGame]);

    return (
        <div
            className={`games-page ${closing ? ' games-hidden' : ''}`}
            onTransitionEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <div style={{ transform: `translateX(${offsetX}px)` }} className="game-list-container">
                {GAMES.map((game, index) => (
                    <Game
                        key={game.name}
                        image={`games/${game.image}`}
                        name={game.name}
                        rating={game.rating}
                        icon={game.icon}
                        selected={selectedGame === index}
                    />
                ))}
            </div>
        </div>
    );
}
