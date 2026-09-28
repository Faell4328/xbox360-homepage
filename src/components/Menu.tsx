import { useEffect, useRef } from "react";
import { animations } from "./animations";

interface MenuProps {
  selected: number;
  onConfirm: () => void;
  onReject: () => void;
  closing: boolean;
  onClosed: () => void;
}

export default function Menu({
  selected,
  onConfirm,
  onReject,
  closing,
  onClosed,
}: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef(false);

  useEffect(() => {
    containerRef.current?.animate(
      animations.expand.keyframes,
      animations.expand.options,
    );
    elementsRef.current?.animate(
      animations.show.keyframes,
      animations.show.options,
    );
  }, []);

  useEffect(() => {
    if (!closing || closedRef.current) return;
    closedRef.current = true;

    containerRef.current?.animate(
      animations.reducer.keyframes,
      animations.reducer.options,
    );
    elementsRef.current?.animate(
      animations.hidden.keyframes,
      animations.hidden.options,
    );

    const timeout = window.setTimeout(onClosed, 600);
    return () => clearTimeout(timeout);
  }, [closing, onClosed]);

  return (
    <div id="menu">
      <div id="container-menu" ref={containerRef}>
        <div id="container-menu-elements" ref={elementsRef}>
          <header>
            <h1>Site exclusivo para computadores</h1>
          </header>
          <p>
            O site foi desenvolvido apenas para computadores, não funciona
            para dispositivos moveis (celulares e tablets). O layout irá ficar
            quebrado e bugado.
          </p>
          <p>Você está em um computador?</p>
          <div id="container-menu-button">
            <button
              className={
                "menu-button" + (selected === 0 ? " select-menu-button" : "")
              }
              onClick={onConfirm}
            >
              Estou em um computador
            </button>
            <button
              className={
                "menu-button" + (selected === 1 ? " select-menu-button" : "")
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
