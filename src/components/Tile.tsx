export interface TileProps {
    size: 'big' | 'small';
    text?: string;
    icon?: string;
    image?: string;
    redirect?: string;
    status?: string;
    open?: 'games' | 'dvd-screensave';
}

interface TileViewProps extends TileProps {
    selected: boolean;
}

export default function Tile({ size, text, icon, image, selected, status }: TileViewProps) {
    return (
        <td rowSpan={size === 'big' ? 2 : 1} colSpan={size === 'big' ? 2 : 1}>
            <div
                className={`tile tile-${size}${selected ? ' tile-selected' : ''}`}
                style={image ? { backgroundImage: `url('${image}')` } : undefined}
            >
                <div className="tile-shine" />
                <div className="tile-content">
                    {icon ? <img className="tile-icon" src={icon} /> : null}
                </div>
                {text && !status ? <p className="tile-text">{text}</p> : null}
                {status ? <p className="tile-text">{status}</p> : null}
            </div>
        </td>
    );
}
