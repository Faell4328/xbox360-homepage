import { useEffect, useRef, useState } from 'react';
import '../style/components/dvd-screensaver.css';
import { playAudio } from '../lib/sounds';
import { useBackButton } from '../hooks/useBackButton';
import { useTimeouts } from '../hooks/useTimeouts';
import type { ScreenProps } from '../interfaces';

const LOGO_IDLE = '/dvd-screensaver/head1.png';
const LOGO_BOUNCE = '/dvd-screensaver/head2.png';
const LOGO_WIN = '/dvd-screensaver/head3.png';
const LOGO_GIVEUP = '/dvd-screensaver/head4.png';

const SPEED = 350;
const BOUNCE_ANIMATION = 300;
const CELEBRATION_ANIMATION = 4000;
const GIVEUP_BOUNCES = 30;

export default function DvdScreensaver({ closing, onClosing, onClosed, bIconRef }: ScreenProps) {
    const [started, setStarted] = useState(false);
    const bounces = useRef(0);
    const bounceTimeoutRef = useRef<number | undefined>(undefined);
    const schedule = useTimeouts();
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const nopeAudio1Ref = useRef<HTMLAudioElement | null>(null);
    const nopeAudio2Ref = useRef<HTMLAudioElement | null>(null);
    const wowAudioRef = useRef<HTMLAudioElement | null>(null);

    useBackButton('dvd-screensaver', { closing, onClosing, bIconRef });

    useEffect(() => () => clearTimeout(bounceTimeoutRef.current), []);

    function bounceLogo() {
        const logo = logoRef.current;
        if (!logo) return;
        if (logo.src.endsWith('head3.png') || logo.src.endsWith('head4.png')) return;

        clearTimeout(bounceTimeoutRef.current);

        logo.src = LOGO_BOUNCE;
        bounces.current += 1;

        if (bounces.current % 2 === 0) {
            playAudio(nopeAudio1Ref.current);
        } else {
            playAudio(nopeAudio2Ref.current);
        }

        bounceTimeoutRef.current = setTimeout(() => {
            if (logoRef.current) logoRef.current.src = LOGO_IDLE;
            bounceTimeoutRef.current = undefined;
        }, BOUNCE_ANIMATION);
    }

    function celebrate() {
        const logo = logoRef.current;
        if (!logo) return;

        bounces.current = 0;
        logo.src = LOGO_WIN;
        playAudio(wowAudioRef.current);

        schedule(() => {
            if (logoRef.current) logoRef.current.src = LOGO_IDLE;
        }, CELEBRATION_ANIMATION);
    }

    useEffect(() => {
        const logo = logoRef.current;
        const nope1 = nopeAudio1Ref.current;
        const nope2 = nopeAudio2Ref.current;
        const background = backgroundRef.current;
        if (!logo || !nope1 || !nope2 || !background || !started) return;

        const maxX = background.clientWidth - logo.clientWidth;
        const maxY = background.clientHeight - logo.clientHeight;

        let x = Math.random() * maxX;
        let y = Math.random() * maxY;
        let vX = Math.random() > 0.5 ? -SPEED : SPEED;
        let vY = Math.random() > 0.5 ? -SPEED : SPEED;

        let raf = 0;
        let last = performance.now();

        const hittingCorner = () => (x >= maxX - 3 || x <= 3) && (y >= maxY - 3 || y <= 3);

        const tick = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;

            x += vX * dt;
            y += vY * dt;

            if (hittingCorner()) {
                celebrate();
            } else if (bounces.current >= GIVEUP_BOUNCES) {
                logo.src = LOGO_GIVEUP;
            } else if (bounces.current < GIVEUP_BOUNCES - 1) {
                const volume = Math.min((GIVEUP_BOUNCES - bounces.current) / 10, 1);
                nope1.volume = volume;
                nope2.volume = volume;
            }

            if (x >= maxX) {
                x = maxX;
                vX *= -1;
                bounceLogo();
            } else if (x <= 0) {
                x = 0;
                vX *= -1;
                bounceLogo();
            }

            if (y >= maxY) {
                y = maxY;
                vY *= -1;
                bounceLogo();
            } else if (y <= 0) {
                y = 0;
                vY *= -1;
                bounceLogo();
            }

            logo.style.setProperty('--x', `${x}px`);
            logo.style.setProperty('--y', `${y}px`);

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [started]);

    return (
        <div className="dvd-page">
            <div
                onAnimationEnd={(event) => {
                    if (event.animationName === 'dvd-start-crt') setStarted(true);
                }}
                onTransitionEnd={(event) => {
                    if (
                        closing &&
                        event.target === event.currentTarget &&
                        event.propertyName === 'opacity'
                    ) {
                        onClosed(false);
                    }
                }}
                className={`dvd-container ${!closing ? ' dvd-show' : ''}`}
            >
                <div className="dvd-background-screen"></div>
                <div
                    ref={backgroundRef}
                    className={`dvd-screen ${!closing ? ' dvd-start-crt' : ''}`}
                >
                    <img className="dvd-logo" ref={logoRef} src={LOGO_IDLE} />
                </div>
                <img className="dvd-crt" src="/dvd-screensaver/crt.png" />
            </div>
            <audio ref={nopeAudio1Ref} src="/dvd-screensaver/nope.mp3" />
            <audio ref={nopeAudio2Ref} src="/dvd-screensaver/nope.mp3" />
            <audio ref={wowAudioRef} src="/dvd-screensaver/wow.mp3" />
        </div>
    );
}
