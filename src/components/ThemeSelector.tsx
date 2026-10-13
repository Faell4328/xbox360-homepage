import '../style/components/theme-selector.css';
import { useEffect, useState } from 'react';
import { playSound } from '../lib/sounds';
import { useBackButton } from '../hooks/useBackButton';
import { verticalStep } from '../lib/keys';
import type { ScreenProps } from '../interfaces';

const THEMES = [
    { value: 'xbox', label: 'Xbox' },
    { value: 'spectrum', label: 'Spectrum' },
    { value: 'day', label: 'Day' },
    { value: 'night', label: 'Night' },
    { value: 'hajime', label: 'Hajime no Ippo' },
] as const;

interface ThemeSelectorProps extends ScreenProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export default function ThemeSelector({
    closing,
    onClosing,
    onClosed,
    bIconRef,
    theme,
    setTheme,
}: ThemeSelectorProps) {
    const [selectedTheme, setSelectedTheme] = useState(() =>
        Math.max(
            0,
            THEMES.findIndex((option) => option.value === theme)
        )
    );

    useBackButton('theme-selector', { closing, onClosing, bIconRef });

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            const step = verticalStep(event.key);
            if (step === 0) return;

            const next = selectedTheme + step;
            if (next < 0 || next >= THEMES.length) return;

            setSelectedTheme(next);
            setTheme(THEMES[next].value);
            playSound('guide-hover.wav');
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, selectedTheme, setTheme]);

    return (
        <div className="theme-page">
            <div
                onTransitionEnd={(event) => {
                    if (closing && event.target === event.currentTarget) onClosed(false);
                }}
                className={`theme-container ${closing ? ' theme-hidden' : ''}`}
            >
                <header>
                    <h3>Select Theme</h3>
                </header>
                {THEMES.map((option, index) => (
                    <div
                        key={option.value}
                        className={`theme-option ${selectedTheme === index ? ' theme-option-selected' : ''}`}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
