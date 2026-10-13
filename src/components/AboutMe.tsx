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
            className={`about-page ${closing ? 'about-hidden' : ''}`}
            onTransitionEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <div className="about-container">
                <img src="/about-me/avatar.png" />
                <div className="about-container-content">
                    <h1>Faell4328</h1>
                    <hr />
                    <h2>Programmer</h2>
                    <section>
                        <p>
                            <b>Text Editor: </b>
                            Zed with vim mode enabled, before used VSCode and NeoVim.
                        </p>
                        <p>
                            <b>Operating System: </b>
                            Cachy OS with Niri (my main) and Windows 11
                        </p>
                    </section>
                    <section>
                        <h3>Projects (minimally relevant)</h3>
                        <div>
                            <div className="about-project">
                                <div className="about-icon-project">
                                    <img src="about-me/ottavada.png" />
                                </div>
                                <div className="about-description-project">
                                    <b>Ottavada</b>
                                    <p>
                                        App to organize and conduct musical repertoire: finds,
                                        filters and syncs sheet music across computers without
                                        touching your files (built entirely with AI)
                                    </p>
                                </div>
                            </div>
                            <div className="about-project">
                                <div className="about-icon-project">
                                    <img src="about-me/chess.png" />
                                </div>
                                <div className="about-description-project">
                                    <b>Chess Engine</b>
                                    <p>A chess engine made 100% by hand, using bitboards</p>
                                </div>
                            </div>
                            <p>! I have other projects, but they're mostly studies/drafts.</p>
                        </div>
                    </section>
                    <p></p>
                </div>
            </div>
            <audio loop autoPlay src="/about-me/background-sound.mp3" />
        </div>
    );
}
