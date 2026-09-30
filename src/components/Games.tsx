import { useEffect } from 'react';
import '../style/components/games.css';

interface GamesProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
}

export default function Games({ closing, onClosing, onClosed }: GamesProps) {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            if (event.key === 'ArrowUp') {
            } else if (event.key === 'ArrowDown') {
            } else if (event.key === 'b') {
                onClosing('games');
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, onClosed]);

    return (
        <main
            className={'games-page' + (closing ? ' hidden' : ' show')}
            onAnimationEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <p>teste</p>
            <button onClick={() => onClosing('games')}>Voltar</button>
        </main>
    );
}
