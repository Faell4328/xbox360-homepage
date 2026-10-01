import '../style/components/games.css';

interface GameProps {
    img: string;
    name: string;
    selected: boolean;
}

export default function Game({ img, name, selected }: GameProps) {
    return (
        <div className={`game-container ${selected ? 'game-selected' : ''}`}>
            <img src={img} />
            <p>{name}</p>
        </div>
    );
}
