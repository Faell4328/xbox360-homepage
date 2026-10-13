import '../style/components/about-me.css';
import { useBackButton } from './useBackButton';
import type { ScreenProps } from '../interfaces';

export default function AboutMe({ closing, onClosing, onClosed, bIconRef }: ScreenProps) {
    useBackButton('about-me', { closing, onClosing, bIconRef });

    return (
        <div
            className={`about-page ${closing ? 'about-hidden' : ''}`}
            onTransitionEnd={(event) => {
                if (closing && event.target === event.currentTarget) onClosed(false);
            }}
        >
            <div className="about-container">
                <img src="/about-me/avatar.png" alt="Faell4328 avatar" />
                <div className="about-content">
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
                                <div className="about-project-icon">
                                    <img src="/about-me/ottavada.png" alt="Ottavada" />
                                </div>
                                <div className="about-project-description">
                                    <b>Ottavada</b>
                                    <p>
                                        App to organize and conduct musical repertoire: finds,
                                        filters and syncs sheet music across computers without
                                        touching your files (built entirely with AI)
                                    </p>
                                </div>
                            </div>
                            <div className="about-project">
                                <div className="about-project-icon">
                                    <img src="/about-me/chess.png" alt="Chess Engine" />
                                </div>
                                <div className="about-project-description">
                                    <b>Chess Engine</b>
                                    <p>A chess engine made 100% by hand, using bitboards</p>
                                </div>
                            </div>
                            <p>! I have other projects, but they're mostly studies/drafts.</p>
                        </div>
                    </section>
                </div>
            </div>
            <audio loop autoPlay src="/about-me/background-sound.mp3" />
        </div>
    );
}
