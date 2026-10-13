import { useCallback, useRef, useState } from 'react';
import { playSound } from '../lib/sounds';
import { useTimeouts } from './useTimeouts';
import type { DiscStatus } from '../types';

const CLOSE_DELAY = 1400;
const READ_DELAY = 1200;
const READ_TO_PLAY_DELAY = 2800;

export function useDiscTray() {
    const [status, setStatus] = useState<DiscStatus>('Open Tray');
    const statusRef = useRef<DiscStatus>('Open Tray');
    const busy = useRef(false);
    const schedule = useTimeouts();

    const update = (next: DiscStatus) => {
        statusRef.current = next;
        setStatus(next);
    };

    const toggleTray = useCallback(() => {
        if (busy.current) return;

        if (statusRef.current === 'Open Tray') {
            playSound('open-tray.mp3');
            busy.current = true;
            schedule(() => {
                update('Closed Tray');
                busy.current = false;
            }, CLOSE_DELAY);
        } else if (statusRef.current === 'Closed Tray') {
            playSound('closed-tray.mp3');
            busy.current = true;
            schedule(() => {
                update('Reading');
                playSound('read-disc.mp3');
                schedule(() => {
                    update('Play');
                    busy.current = false;
                }, READ_TO_PLAY_DELAY);
            }, READ_DELAY);
        }
    }, [schedule]);

    return { status, statusRef, toggleTray };
}
