import { forwardRef } from "react";

export interface TileDef {
  size: "big" | "small";
  text?: string;
  icon?: string;
  image?: string;
  redirect?: string;
}

interface TileProps {
  def: TileDef;
}

const Tile = forwardRef<HTMLDivElement, TileProps>(({ def }, ref) => {
  return (
    <td
      rowSpan={def.size === "big" ? 2 : 1}
      colSpan={def.size === "big" ? 2 : 1}
    >
      <div
        ref={ref}
        data-redirect={def.redirect ?? ""}
        className={`tile tile-${def.size}`}
        style={{
          position: "relative",
          backgroundImage: def.image ? `url(' ${def.image} ')` : undefined,
          backgroundSize: def.image ? "cover" : undefined,
          backgroundColor: def.image ? undefined : "#018801",
          border: "2px solid #4ea94f",
          margin: 3,
        }}
      >
        <div className="tile-shine" />
        <div
          className="tile-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {def.icon ? (
            <img style={{ width: 90, height: 90 }} src={def.icon} />
          ) : null}
        </div>
        {def.text ? (
          <p
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              fontSize: 20,
            }}
            className="text-white"
          >
            {def.text}
          </p>
        ) : null}
      </div>
    </td>
  );
});

Tile.displayName = "Tile";

export default Tile;
