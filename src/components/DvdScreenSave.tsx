import { useEffect, useRef, useState, type RefObject } from 'react';
import '../style/components/dvd-screensave.css';

interface DvdProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function DvdScreenSave({ closing, onClosing, onClosed, bIconRef }: DvdProps) {
    const [initDvd, setInitDvd] = useState<boolean>(false);
    const cont = useRef<number>(0);
    const controlTimeout = useRef<number | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLImageElement | null>(null);
    const nopeAudio1Ref = useRef<HTMLAudioElement | null>(null);
    const nopeAudio2Ref = useRef<HTMLAudioElement | null>(null);
    const wowAudioRef = useRef<HTMLAudioElement | null>(null);

    function changedHead() {
        if (
            nopeAudio1Ref.current == null ||
            nopeAudio2Ref.current == null ||
            headerRef.current == null ||
            cont.current == null ||
            initDvd == false
        )
            return;

        if (
            headerRef.current.src.endsWith('head3.png') ||
            headerRef.current.src.endsWith('head4.png')
        ) {
            return;
        }

        if (controlTimeout.current != null) {
            clearTimeout(controlTimeout.current);
        }

        headerRef.current.src = '/dvd-screensave/head2.png';
        cont.current++;

        if (cont.current % 2 == 0) {
            nopeAudio1Ref?.current.play();
        } else {
            nopeAudio2Ref?.current.play();
        }

        controlTimeout.current = setTimeout(() => {
            if (headerRef.current == null) return;
            headerRef.current.src = '/dvd-screensave/head1.png';
            controlTimeout.current = null;
        }, 300);
    }

    function epic() {
        if (wowAudioRef.current == null || headerRef.current == null || cont.current == null)
            return;

        cont.current = 0;
        headerRef.current.src = '/dvd-screensave/head3.png';
        wowAudioRef?.current.play();

        setTimeout(() => {
            if (headerRef.current == null) return;

            headerRef.current.src = '/dvd-screensave/head1.png';
        }, 4000);
    }

    useEffect(() => {
        if (
            !wowAudioRef.current ||
            !headerRef.current ||
            !nopeAudio1Ref.current ||
            !nopeAudio2Ref.current ||
            !initDvd
        )
            return;

        const image = headerRef.current;
        const nope1 = nopeAudio1Ref.current;
        const nope2 = nopeAudio2Ref.current;

        const VELOCIDADE = 350;

        let maxX = (backgroundRef.current?.clientWidth || 0) - image.clientWidth;
        let maxY = (backgroundRef.current?.clientHeight || 0) - image.clientHeight;

        let x = Math.random() * maxX;
        let y = Math.random() * maxY;
        let vX = Math.random() > 0.5 ? -VELOCIDADE : VELOCIDADE;
        let vY = Math.random() > 0.5 ? -VELOCIDADE : VELOCIDADE;

        let last = performance.now();
        const tick = (now: number) => {
            let dt = (now - last) / 1000;
            last = now;

            x += vX * dt;
            y += vY * dt;

            if ((x >= maxX - 3 || x <= 3) && (y >= maxY - 3 || y <= 3)) {
                epic();
            } else if (cont.current >= 20) {
                image.src = '/dvd-screensave/head4.png';
            } else if (cont.current < 19) {
                nope1.volume = Math.min((20 - cont.current) / 10, 1);
                nope2.volume = Math.min((20 - cont.current) / 10, 1);
            }

            if (x >= maxX) {
                x = maxX;
                vX = vX * -1;
                changedHead();
            } else if (x <= 0) {
                x = 0;
                vX = vX * -1;
                changedHead();
            }

            if (y >= maxY) {
                y = maxY;
                vY = vY * -1;
                changedHead();
            } else if (y <= 0) {
                y = 0;
                vY = vY * -1;
                changedHead();
            }

            image.style.setProperty('--x', `${x}px`);
            image.style.setProperty('--y', `${y}px`);

            raf = requestAnimationFrame(tick);
        };

        let raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [initDvd]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'b') {
                if (bIconRef.current) {
                    bIconRef.current.classList.remove('btn-flash');
                    void bIconRef.current.offsetWidth;
                    bIconRef.current.classList.add('btn-flash');
                }
                onClosing('dvd-screensave');
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, onClosed, bIconRef]);

    return (
        <div className="dvd-page">
            <div
                onAnimationEnd={(event) => {
                    if (event.animationName == 'dvd-expand') {
                        setInitDvd(true);
                    }
                    if (closing && event.target === event.currentTarget) onClosed(false);
                }}
                className={'dvd-container' + (closing ? ' dvd-hidden' : ' dvd-show')}
            >
                <div className="dvd-background-screen"></div>
                <div
                    ref={backgroundRef}
                    className={'dvd-screen' + (closing ? ' dvd-reducer' : ' dvd-expand')}
                >
                    <img
                        className={'dvd-header' + (closing ? ' dvd-hidden' : ' dvd-show-header')}
                        ref={headerRef}
                        src="/dvd-screensave/head1.png"
                    />
                </div>
                <img className="dvd-crt" src="/dvd-screensave/crt.png" />
            </div>
            <audio ref={nopeAudio1Ref} src="/dvd-screensave/nope.mp3" />
            <audio ref={nopeAudio2Ref} src="/dvd-screensave/nope.mp3" />
            <audio ref={wowAudioRef} src="/dvd-screensave/wow.mp3" />
        </div>
    );
}
