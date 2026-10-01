import '../style/components/games.css';

interface GameProps {
    img: string;
    name: string;
    selected: boolean;
    icon: string;
}

export default function Game({ img, name, selected, icon }: GameProps) {
    return (
        <div className={`game-container ${selected ? 'game-selected' : ''}`}>
            <img className="game-image" src={img} />
            <p>{name}</p>
            <img className="game-icon" src={`icons/${icon}.png`} />
        </div>
    );
}
