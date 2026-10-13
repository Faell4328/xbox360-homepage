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

        const show = setTimeout(() => {
            setVisible(true);
            playSound('notify-popup.wav');
        }, 600);
        const hide = setTimeout(() => setVisible(false), 5000);

        return () => {
            clearTimeout(show);
            clearTimeout(hide);
        };
    }, [nonce]);

    return (
        <div id="notification" className={visible ? 'notification-visible' : undefined}>
            <img
                key={`orb-${nonce}`}
                id="notification-orb"
                src="/xbox-orb.png"
                alt=""
                loading="eager"
            />
            <div key={`body-${nonce}`} id="notification-body">
                <p id="notification-text">{message}</p>
            </div>
        </div>
    );
}
