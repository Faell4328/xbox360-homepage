import '../style/components/games.css';

interface GameProps {
    image: string;
    name: string;
    selected: boolean;
    rating: number;
    icon?: string | string[];
}

const MAX_RATING = 5;

function starFor(rating: number, position: number): string {
    if (rating >= position + 1) return 'star-full';
    if (rating >= position + 0.5) return 'star-half';
    return 'star-empty';
}

function toPlatformList(icon?: string | string[]): string[] {
    if (!icon) return [];
    return Array.isArray(icon) ? icon : [icon];
}

export default function Game({ image, name, selected, rating, icon }: GameProps) {
    const platforms = toPlatformList(icon);

    return (
        <div className={`game-container ${selected ? 'game-selected' : ''}`}>
            <img className="game-image" src={image} alt={name} />
            <p>{name}</p>
            <div className="game-rating-row">
                {Array.from({ length: MAX_RATING }, (_, position) => (
                    <img
                        key={position}
                        className="game-rating"
                        src={`icons/${starFor(rating, position)}.png`}
                        alt=""
                    />
                ))}
            </div>
            {platforms.length === 1 && (
                <img className="game-icon" src={`icons/${platforms[0]}.png`} alt={platforms[0]} />
            )}
            {platforms.length > 1 && (
                <div className="game-icon-list">
                    {platforms.map((platform) => (
                        <img
                            key={platform}
                            className="game-icon-list-item"
                            src={`icons/${platform}.png`}
                            alt={platform}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
