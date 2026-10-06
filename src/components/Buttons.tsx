import type { RefObject } from 'react';

type Screen = 'menu' | 'dashboard' | 'games' | 'dvd-screensave' | 'about-me';

interface ButtonsProps {
    closing: boolean;
    screen: Screen;
    arrowsIconRef: RefObject<HTMLImageElement | null>;
    aIconRef: RefObject<HTMLImageElement | null>;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function Buttons({
    closing,
    screen,
    arrowsIconRef,
    aIconRef,
    bIconRef,
}: ButtonsProps) {
    return (
        <footer
            className={`controls-wrap ${closing == true && screen == 'menu' ? 'show-animation' : undefined}`}
        >
            <div className="controls">
                <div
                    style={{ display: screen == 'dvd-screensave' ? 'none' : undefined }}
                    className="control"
                >
                    <img ref={arrowsIconRef} src="/xbox-arrows.png" alt="" />
                    <p>Arrows</p>
                </div>
                <div
                    style={{
                        display: screen === 'dashboard' ? undefined : 'none',
                    }}
                    className="control"
                >
                    <img ref={aIconRef} src="/xbox-a.png" alt="" />
                    <p>Select</p>
                </div>
                <div
                    style={{
                        display:
                            screen == 'games' || screen == 'dvd-screensave' || screen == 'about-me'
                                ? undefined
                                : 'none',
                    }}
                    className="control"
                >
                    <img ref={bIconRef} src="/xbox-b.png" alt="" />
                    <p>Back</p>
                </div>
            </div>
        </footer>
    );
}
