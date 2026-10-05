import '../style/components/games.css';

interface GameProps {
    img: string;
    name: string;
    selected: boolean;
    rating: number;
    icon?: string | string[];
}

export default function Game({ img, name, selected, rating, icon }: GameProps) {
    return (
        <div className={`game-container ${selected ? 'game-selected' : ''}`}>
            <img className="game-image" src={img} />
            <p>{name}</p>
            <div style={{ display: 'flex' }}>
                {Array.from({ length: 5 }, (_, i) => {
                    const star: string =
                        rating >= i + 1
                            ? 'star-full'
                            : rating >= i + 0.5
                              ? 'star-half'
                              : 'star-empty';

                    return <img key={i} className="game-rating" src={`icons/${star}.png`} />;
                })}
            </div>
            {icon && icon.length > 0 && !Array.isArray(icon) && (
                <img className="game-icon" src={`icons/${icon}.png`} />
            )}
            {icon && icon.length > 0 && Array.isArray(icon) && (
                <div className="game-icon-container">
                    {icon.map((value, index) => (
                        <img
                            key={index}
                            style={{ position: 'relative' }}
                            className="game-icons"
                            src={`icons/${value}.png`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
