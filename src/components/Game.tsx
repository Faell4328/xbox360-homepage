import '../style/components/games.css';

interface GameProps {
    img: string;
    name: string;
    selected: boolean;
    icon?: string | string[];
}

export default function Game({ img, name, selected, icon }: GameProps) {
    return (
        <div className={`game-container ${selected ? 'game-selected' : ''}`}>
            <img className="game-image" src={img} />
            <p>{name}</p>
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
