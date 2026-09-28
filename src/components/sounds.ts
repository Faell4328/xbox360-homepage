export const soundNames = [
    'tile-hover.wav',
    'select-a.mp3',
    'hud-open.wav',
    'startup-after-loading.wav',
    'notify-popup.wav',
    'guide-hover.wav',
] as const;

export type SoundName = (typeof soundNames)[number];

let cache: Record<SoundName, HTMLAudioElement> | null = null;

function allSound(): Record<SoundName, HTMLAudioElement> {
    if (!cache) {
        cache = Object.fromEntries(
            soundNames.map((name) => {
                const audio = new Audio(`/${name}`);
                audio.preload = 'auto';
                return [name, audio];
            })
        ) as Record<SoundName, HTMLAudioElement>;
    }
    return cache;
}

export function playSound(name: SoundName): void {
    const audio = allSound()[name];
    audio.currentTime = 0;
    audio.play();
}
