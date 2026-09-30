import type { RefObject } from 'react';

type Screen = 'menu' | 'dashboard' | 'games';

interface ButtonsProps {
    closing: boolean;
    screen: Screen;
    arrowsIconRef: RefObject<HTMLImageElement | null>;
    aIconRef: RefObject<HTMLImageElement | null>;
}

export default function Buttons({ closing, screen, arrowsIconRef, aIconRef }: ButtonsProps) {
    return (
        <footer
            className={`controls-wrap ${closing == true && screen == 'menu' ? 'show-animation' : undefined}`}
        >
            <div className="controls">
                <div className="control">
                    <img ref={arrowsIconRef} src="/xbox-arrows.png" alt="" />
                    <p>Setas</p>
                </div>
                <div
                    style={{ display: screen !== 'dashboard' ? 'none' : undefined }}
                    className="control"
                >
                    <img ref={aIconRef} src="/xbox-a.png" alt="" />
                    <p>Selecionar</p>
                </div>
                <div
                    style={{ display: screen !== 'games' ? 'none' : undefined }}
                    className="control"
                >
                    <img src="/xbox-b.png" alt="" />
                    <p>Voltar</p>
                </div>
            </div>
        </footer>
    );
}
