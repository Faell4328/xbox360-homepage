import '../style/components/about-me.css';
import { useEffect, type RefObject } from 'react';

interface AboutMeProps {
    closing: boolean;
    onClosing: (component: string) => void;
    onClosed: (sound: boolean) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export default function AboutMe({ closing, onClosing, onClosed, bIconRef }: AboutMeProps) {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'b') {
                if (bIconRef.current) {
                    bIconRef.current.classList.remove('btn-flash');
                    void bIconRef.current.offsetWidth;
                    bIconRef.current.classList.add('btn-flash');
                }
                onClosing('about-me');
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, onClosed, bIconRef]);

    return (
        <div
            className={`about-page ${closing ? 'about-hidden' : 'about-show'}`}
            onAnimationEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <div className="about-container">
                <img src="/about-me/avatar.png" />
                <div className="about-container-content">
                    <h1>Faell4328</h1>
                    <hr />
                    <h2>Programmer</h2>
                    <p>
                        <b>Favorite anime and manga: </b>
                        Hajime no Ippo, without a doubt.
                    </p>
                    <p>
                        <b>Text Editor: </b>
                        Zed with vim mode enabled, before used VSCode and NeoVim.
                    </p>
                    <p>
                        <b>Operating System: </b>
                        Cachy OS with Niri (my main) and Windows 11
                    </p>
                    <div className="about-content">
                        <h2>Projects (minimally relevant)</h2>
                        <div className="about-projects">
                            <div className="about-project">
                                <b>Ottavada</b>
                                <p>
                                    Application for organizing musical repertoire (built entirely
                                    with AI)
                                </p>
                            </div>
                            <div className="about-project">
                                <b>Chess Engine</b>
                                <p>A chess engine made 100% by hand, using bitboards</p>
                            </div>
                        </div>
                        <p>! I have other projects, but they're mostly studies/drafts.</p>
                    </div>
                </div>
            </div>
            <audio loop autoPlay src="/about-me/background-sound.mp3" />
        </div>
    );
}
