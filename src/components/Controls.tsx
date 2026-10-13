import type { RefObject } from 'react';
import type { ScreenStatus } from '../types';

interface ControlsProps {
    closing: boolean;
    screen: ScreenStatus;
    arrowsIconRef: RefObject<HTMLImageElement | null>;
    aIconRef: RefObject<HTMLImageElement | null>;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function Controls({
    closing,
    screen,
    arrowsIconRef,
    aIconRef,
    bIconRef,
}: ControlsProps) {
    const showArrows = screen !== 'dvd-screensaver';
    const showA = screen === 'dashboard';
    const showB = screen !== 'menu' && screen !== 'dashboard';

    return (
        <footer className={`controls-wrap ${closing && screen === 'menu' ? 'show-animation' : ''}`}>
            <div className="controls">
                {showArrows && (
                    <div className="control control-arrows">
                        <img ref={arrowsIconRef} src="/xbox-arrows.png" alt="" />
                        <p>Arrows</p>
                    </div>
                )}
                {showA && (
                    <div className="control">
                        <img ref={aIconRef} src="/xbox-a.png" alt="" />
                        <p>Select</p>
                    </div>
                )}
                {showB && (
                    <div className="control">
                        <img ref={bIconRef} src="/xbox-b.png" alt="" />
                        <p>Back</p>
                    </div>
                )}
            </div>
        </footer>
    );
}
