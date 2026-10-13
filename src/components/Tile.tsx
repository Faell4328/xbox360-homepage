import type { TileProps } from '../interfaces';

interface TileViewProps extends TileProps {
    selected: boolean;
}

export default function Tile({ size, text, icon, image, selected, status }: TileViewProps) {
    const label = status || text;

    return (
        <td rowSpan={size === 'big' ? 2 : 1} colSpan={size === 'big' ? 2 : 1}>
            <div
                className={`tile tile-${size}${selected ? ' tile-selected' : ''}`}
                style={image ? { backgroundImage: `url('${image}')` } : undefined}
            >
                <div className="tile-shine" />
                <div className="tile-content">
                    {icon ? <img className="tile-icon" src={icon} alt="" /> : null}
                </div>
                {label ? <p className="tile-text">{label}</p> : null}
            </div>
        </td>
    );
}
