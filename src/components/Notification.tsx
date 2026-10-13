import { useEffect, useState } from 'react';
import { playSound } from './sounds';

interface NotificationProps {
    message: string;
    nonce: number;
}

export default function Notification({ message, nonce }: NotificationProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (nonce === 0) return;

        const show = window.setTimeout(() => {
            setVisible(true);
            playSound('notify-popup.wav');
        }, 600);
        const hide = window.setTimeout(() => setVisible(false), 5000);

        return () => {
            clearTimeout(show);
            clearTimeout(hide);
        };
    }, [nonce]);

    return (
        <div id="notification-container" className={visible ? 'is-visible' : undefined}>
            <img
                key={`image-${nonce}`}
                id="notification-image"
                src="/xbox-orb.png"
                loading="eager"
            />
            <div key={`text-${nonce}`} id="notification-container-text">
                <p id="notification-text">{message}</p>
            </div>
        </div>
    );
}
