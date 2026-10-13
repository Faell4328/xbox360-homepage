import { useCallback, useEffect, useRef } from 'react';

export function useTimeouts(): (callback: () => void, delay: number) => void {
    const timeouts = useRef<number[]>([]);

    useEffect(
        () => () => {
            timeouts.current.forEach((id) => clearTimeout(id));
        },
        []
    );

    return useCallback((callback: () => void, delay: number) => {
        const id = setTimeout(() => {
            timeouts.current = timeouts.current.filter((timeout) => timeout !== id);
            callback();
        }, delay);
        timeouts.current.push(id);
    }, []);
}
