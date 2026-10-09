import '../style/components/change-theme.css';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { playSound } from './sounds';

interface ThemeProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
    theme: string;
    setTheme: (theme: string) => void;
}

export default function ChangeTheme({
    closing,
    onClosing,
    onClosed,
    bIconRef,
    theme,
    setTheme,
}: ThemeProps) {
    const optionSelectRef = useRef(0);
    const [optionSelect, setOptionSelect] = useState(0);

    const themes = ['xbox', 'spectrum', 'day', 'night', 'hajime'];

    useEffect(() => {
        let key = 0;

        if (theme == 'spectrum') {
            key = 1;
        } else if (theme == 'day') {
            key = 2;
        } else if (theme == 'night') {
            key = 3;
        } else if (theme == 'hajime') {
            key = 4;
        }

        setOptionSelect(key);
        optionSelectRef.current = key;
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (closing) return;

            if (event.key === 'ArrowUp') {
                if (optionSelectRef.current > 0) {
                    optionSelectRef.current--;
                    setOptionSelect(optionSelectRef.current);
                    setTheme(themes[optionSelectRef.current]);
                    playSound('guide-hover.wav');
                }
            } else if (event.key === 'ArrowDown') {
                if (optionSelectRef.current < 4) {
                    optionSelectRef.current++;
                    setOptionSelect(optionSelectRef.current);
                    setTheme(themes[optionSelectRef.current]);
                    playSound('guide-hover.wav');
                }
            } else if (event.key === 'b') {
                if (bIconRef.current) {
                    bIconRef.current.classList.remove('btn-flash');
                    void bIconRef.current.offsetWidth;
                    bIconRef.current.classList.add('btn-flash');
                }
                onClosing('change-theme');
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, onClosed, bIconRef]);

    return (
        <div className="theme-page">
            <div
                onAnimationEnd={(event) => {
                    if (closing && event.target === event.currentTarget) onClosed(false);
                }}
                className={`theme-container ${closing ? 'theme-hidden' : 'theme-show'}`}
            >
                <header>
                    <h3>Select Theme</h3>
                </header>
                <div className={`theme-options ${optionSelect == 0 && 'theme-option-selected'}`}>
                    Xbox
                </div>
                <div className={`theme-options ${optionSelect == 1 && 'theme-option-selected'}`}>
                    Spectrum
                </div>
                <div className={`theme-options ${optionSelect == 2 && 'theme-option-selected'}`}>
                    Day
                </div>
                <div className={`theme-options ${optionSelect == 3 && 'theme-option-selected'}`}>
                    Night
                </div>
                <div className={`theme-options ${optionSelect == 4 && 'theme-option-selected'}`}>
                    Hajime no Ippo
                </div>
            </div>
        </div>
    );
}
