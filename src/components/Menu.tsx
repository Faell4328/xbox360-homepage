import { useEffect, useState } from 'react';
import { playSound } from './sounds';
import { verticalStep } from '../keys';

const OPTIONS = ['I am on a computer', 'I am on a mobile device'] as const;

interface MenuProps {
    closing: boolean;
    onConfirm: (source: string) => void;
    onReject: () => void;
    onClosed: (withSound: boolean) => void;
}

export default function Menu({ closing, onConfirm, onReject, onClosed }: MenuProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            const step = verticalStep(event.key);
            if (step !== 0) {
                const next = selectedIndex + step;
                if (next >= 0 && next < OPTIONS.length) {
                    setSelectedIndex(next);
                    playSound('guide-hover.wav');
                }
                return;
            }

            if (event.key === 'a') {
                playSound('select-a.mp3');
                if (selectedIndex === 0) onConfirm('menu');
                else onReject();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, selectedIndex, onConfirm, onReject]);

    return (
        <div id="menu" className={closing ? '' : 'menu-open'}>
            <div
                id="menu-container"
                onTransitionEnd={(event) => {
                    if (
                        closing &&
                        event.target === event.currentTarget &&
                        event.propertyName === 'width'
                    ) {
                        onClosed(true);
                    }
                }}
            >
                <div id="menu-content">
                    <header>
                        <h3>Website exclusively for computers</h3>
                    </header>
                    <p>
                        The website was developed only for computers; it does not work on mobile
                        devices (phones and tablets). The layout will be broken and navigation is
                        done using the keyboard.
                    </p>
                    <p>Are you on a computer?</p>
                    <div id="menu-buttons">
                        {OPTIONS.map((label, index) => (
                            <button
                                key={label}
                                className={`menu-button${selectedIndex === index ? ' menu-button-selected' : ''}`}
                                onClick={() => (index === 0 ? onConfirm('menu') : onReject())}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
