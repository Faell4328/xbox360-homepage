interface GameProps {
    img: string;
    name: string;
}

export default function Game({ img, name }: GameProps) {
    return (
        <div className="game-container">
            <img src={img} />
            <p>{name}</p>
        </div>
    );
}
