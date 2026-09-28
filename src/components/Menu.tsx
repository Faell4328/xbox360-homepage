import { useEffect, useState } from 'react';
import { playSound } from './sounds';

interface MenuProps {
    closing: boolean;
    onConfirm: (component: string) => void;
    onReject: () => void;
    onClosed: (sound: boolean) => void;
}

export default function Menu({ closing, onConfirm, onReject, onClosed }: MenuProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            if (event.key === 'ArrowUp') {
                if (selectedIndex !== 0) {
                    setSelectedIndex(0);
                    playSound('guide-hover.wav');
                }
            } else if (event.key === 'ArrowDown') {
                if (selectedIndex !== 1) {
                    setSelectedIndex(1);
                    playSound('guide-hover.wav');
                }
            } else if (event.key === 'a') {
                playSound('select-a.mp3');
                if (selectedIndex === 0) onConfirm('teste');
                else onReject();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, selectedIndex, onConfirm, onReject]);

    return (
        <div id="menu" className={closing ? 'background-hidden' : ''}>
            <div
                id="container-menu"
                className={closing ? 'closing' : ''}
                onAnimationEnd={(event) => {
                    if (closing && event.target === event.currentTarget) onClosed(true);
                }}
            >
                <div id="container-menu-elements" className={closing ? 'closing' : ''}>
                    <header>
                        <h1>Site exclusivo para computadores</h1>
                    </header>
                    <p>
                        O site foi desenvolvido apenas para computadores, não funciona para
                        dispositivos moveis (celulares e tablets). O layout irá ficar quebrado e
                        bugado.
                    </p>
                    <p>Você está em um computador?</p>
                    <div id="container-menu-button">
                        <button
                            className={
                                'menu-button' + (selectedIndex === 0 ? ' select-menu-button' : '')
                            }
                            onClick={() => onConfirm('menu')}
                        >
                            Estou em um computador
                        </button>
                        <button
                            className={
                                'menu-button' + (selectedIndex === 1 ? ' select-menu-button' : '')
                            }
                            onClick={onReject}
                        >
                            Estou em um dispositivo móvel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
