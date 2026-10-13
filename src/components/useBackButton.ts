import { useEffect, type RefObject } from 'react';
import { flash } from './dom';

interface UseBackButtonOptions {
    closing: boolean;
    onClosing: (component: string) => void;
    bIconRef: RefObject<HTMLImageElement | null>;
}

export function useBackButton(component: string, options: UseBackButtonOptions): void {
    const { closing, onClosing, bIconRef } = options;

    useEffect(() => {
        if (closing) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'b') return;
            flash(bIconRef.current);
            onClosing(component);
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closing, onClosing, bIconRef, component]);
}
