import { useCallback, useEffect, type RefObject } from 'react';
import '../style/components/games.css';
import Game from './Game';

interface GamesProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function GameList({ closing, onClosing, onClosed, bIconRef }: GamesProps) {
    const flash = useCallback((element: HTMLElement | null) => {
        if (!element) return;
        element.classList.remove('btn-flash');
        void element.offsetWidth;
        element.classList.add('btn-flash');
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            if (event.key === 'ArrowLeft') {
            } else if (event.key === 'ArrowRight') {
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
            <div className="game-list-container">
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
                <Game img="/games/minecraft.jpeg" name="Minecraft" />
            </div>
        </div>
    );
}
