import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animations } from "./animations";
import { playSound } from "./sounds";
import Tile, { type TileDef } from "./Tile";
import Menu from "./Menu";
import Notification, { type NotificationHandle } from "./Notification";

const TILE_DEFS: TileDef[] = [
  { size: "small", text: "Open Tray", icon: "/disc-tray.png" },
  { size: "small", image: "/works.png" },
  {
    size: "small",
    image: "/youtube.png",
    redirect: "https://www.youtube.com/@faell4328",
  },
  { size: "big", image: "/blog.png", redirect: "https://rhafaell.com.br" },
  { size: "small", text: "Favorites Games", icon: "/mygames.png" },
  { size: "small", text: "About me", icon: "/about.png" },
  {
    size: "small",
    image: "/github.png",
    redirect: "https://github.com/Faell4328",
  },
];

function buildSlots(defs: TileDef[]): (number | null)[] {
  const slots: (number | null)[] = Array(15).fill(null);
  let cont = 0;

  defs.forEach((def, index) => {
    for (let step = 0; step < 15; step++) {
      if (slots[cont] === null) break;
      cont++;
    }

    if (def.size === "big") {
      slots[cont] = index;
      slots[cont + 1] = index;
      slots[cont + 5] = index;
      slots[cont + 6] = index;
    } else {
      slots[cont] = index;
    }
    cont++;
  });

  return slots;
}

export default function Dashboard() {
  const [stage, setStage] = useState<"menu" | "dashboard">("menu");
  const [menuSelected, setMenuSelected] = useState(0);
  const [closing, setClosing] = useState(false);
  const [tileIndex, setTileIndex] = useState(0);

  const mainRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const notifyRef = useRef<NotificationHandle>(null);
  const tileIndexRef = useRef(tileIndex);
  const invalidKeyCount = useRef(0);

  tileIndexRef.current = tileIndex;

  const slots = useMemo(() => buildSlots(TILE_DEFS), []);

  const notify = useCallback((text: string) => {
    notifyRef.current?.notify(text);
  }, []);

  const shineOf = (element: HTMLElement) =>
    element.querySelector<HTMLElement>(".tile-shine");

  const elementOf = useCallback(
    (slot: number) => {
      const defIndex = slots[slot];
      if (defIndex === null) return null;
      return tileRefs.current[defIndex] ?? null;
    },
    [slots],
  );

  const deselectTile = useCallback(
    (slot: number) => {
      const element = elementOf(slot);
      const defIndex = slots[slot];
      if (!element || defIndex === null) return;

      const animation =
        TILE_DEFS[defIndex].size === "big"
          ? animations.home_deselect_big
          : animations.home_deselect_small;

      element.animate(animation.keyframes, animation.options);
      shineOf(element)?.animate(
        animations.home_shine_out.keyframes,
        animations.home_shine_out.options,
      );
    },
    [elementOf, slots],
  );

  const selectTile = useCallback(
    (slot: number, song = true) => {
      const element = elementOf(slot);
      const defIndex = slots[slot];
      if (!element || defIndex === null) return;

      const animation =
        TILE_DEFS[defIndex].size === "big"
          ? animations.home_select_big
          : animations.home_select_small;

      element.animate(animation.keyframes, animation.options);
      shineOf(element)?.animate(
        animations.home_shine_in.keyframes,
        animations.home_shine_in.options,
      );

      if (song) playSound("tile-hover.wav");
    },
    [elementOf, slots],
  );

  const flash = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.animate(animations.flash.keyframes, animations.flash.options);
  }, []);

  const confirmMenu = useCallback(() => {
    playSound("hud-open.wav");
    setClosing(true);
  }, []);

  const rejectMenu = useCallback(() => {
    window.location.href = "https://www.google.com/search?q=gatinhos";
  }, []);

  const handleMenuClosed = useCallback(() => {
    setStage("dashboard");
    if (mainRef.current) {
      mainRef.current.style.opacity = "1";
      mainRef.current.style.backgroundImage =
        "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 50%, rgba(0,0,0,0.5)), url('/happy wars.jpg')";
      mainRef.current.style.backgroundSize = "cover";
    }
    playSound("startup-after-loading.wav");
  }, []);

  useEffect(() => {
    if (mainRef.current) mainRef.current.style.backgroundColor = "#222";
  }, []);

  useEffect(() => {
    if (stage !== "dashboard") return;
    const timeout = window.setTimeout(() => {
      setTileIndex(0);
      selectTile(0, false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [stage, selectTile]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (stage === "menu") {
        if (closing) return;

        if (event.key === "ArrowUp") {
          if (menuSelected !== 0) {
            setMenuSelected(0);
            playSound("guide-hover.wav");
          }
        } else if (event.key === "ArrowDown") {
          if (menuSelected !== 1) {
            setMenuSelected(1);
            playSound("guide-hover.wav");
          }
        } else if (event.key === "a") {
          playSound("select-a.mp3");
          if (menuSelected === 0) confirmMenu();
          else rejectMenu();
        }
        return;
      }

      const index = tileIndexRef.current;

      if (event.key === "ArrowUp") {
        flash("btn-xbox-arrows");
        if (index < 5) return;

        if (slots[index] !== slots[index - 5]) {
          deselectTile(index);
          setTileIndex(index - 5);
          selectTile(index - 5);
        } else if (slots[index] !== slots[index - 10] && index - 10 > 5) {
          deselectTile(index);
          setTileIndex(index - 10);
          selectTile(index - 10);
        }
        invalidKeyCount.current = 0;
      } else if (event.key === "ArrowDown") {
        flash("btn-xbox-arrows");
        if (index >= 10) return;

        if (slots[index] !== slots[index + 5]) {
          deselectTile(index);
          setTileIndex(index + 5);
          selectTile(index + 5);
        } else if (slots[index] !== slots[index + 10] && index + 10 > 9) {
          deselectTile(index);
          setTileIndex(index + 10);
          selectTile(index + 10);
        }
        invalidKeyCount.current = 0;
      } else if (event.key === "ArrowLeft") {
        flash("btn-xbox-arrows");
        if (index === 0 || index === 5 || index === 10) return;

        if (slots[index] !== slots[index - 1]) {
          deselectTile(index);
          setTileIndex(index - 1);
          selectTile(index - 1);
        } else if (
          slots[index] !== slots[index - 2] &&
          index - 2 !== -1 &&
          index - 2 !== 4 &&
          index - 2 !== 9
        ) {
          deselectTile(index);
          setTileIndex(index - 2);
          selectTile(index - 2);
        }
        invalidKeyCount.current = 0;
      } else if (event.key === "ArrowRight") {
        flash("btn-xbox-arrows");
        if (index === 4 || index === 9 || index === 14) return;

        if (slots[index] !== slots[index + 1]) {
          deselectTile(index);
          setTileIndex(index + 1);
          selectTile(index + 1);
        } else if (
          slots[index] !== slots[index + 2] &&
          index + 2 !== 5 &&
          index + 2 !== 10 &&
          index + 2 !== 15
        ) {
          deselectTile(index);
          setTileIndex(index + 2);
          selectTile(index + 2);
        }
        invalidKeyCount.current = 0;
      } else if (event.key === "a") {
        deselectTile(index);
        flash("btn-xbox-a");
        window.setTimeout(() => selectTile(index, false), 500);

        const defIndex = slots[index];
        const redirect =
          defIndex !== null ? TILE_DEFS[defIndex].redirect : undefined;

        if (redirect) {
          notify("Você será redirecionado em 6 segundos");
          window.setTimeout(() => {
            window.location.href = redirect;
          }, 6000);
        }
        playSound("hud-open.wav");
      } else {
        invalidKeyCount.current += 1;
        if (invalidKeyCount.current > 5) {
          notify(
            "Você está presionando teclas inválidas, só é permitido as setas e teclas: 'a', 'b', 'x' e 'y'",
          );
          invalidKeyCount.current = 0;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    stage,
    closing,
    menuSelected,
    confirmMenu,
    rejectMenu,
    deselectTile,
    selectTile,
    slots,
    flash,
    notify,
  ]);

  const showContainer = stage === "dashboard" || closing;

  return (
    <main
      ref={mainRef}
      className="dashboard w-full min-h-full flex justify-center items-center"
    >
      <Notification ref={notifyRef} />
      {stage === "menu" && (
        <Menu
          selected={menuSelected}
          onConfirm={confirmMenu}
          onReject={rejectMenu}
          closing={closing}
          onClosed={handleMenuClosed}
        />
      )}
      <div
        id="container"
        className={stage === "dashboard" ? "scene-visible" : "scene-hidden"}
        style={showContainer ? undefined : { display: "none" }}
      >
        <nav></nav>
        <table className="flex justify-center items-center">
          <tbody>
            <tr>
              {TILE_DEFS.slice(0, 4).map((def, i) => (
                <Tile
                  key={i}
                  def={def}
                  ref={(element) => {
                    tileRefs.current[i] = element;
                  }}
                />
              ))}
            </tr>
            <tr>
              {TILE_DEFS.slice(4).map((def, i) => (
                <Tile
                  key={i + 4}
                  def={def}
                  ref={(element) => {
                    tileRefs.current[i + 4] = element;
                  }}
                />
              ))}
            </tr>
          </tbody>
        </table>
        <footer style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 160,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                id="btn-xbox-arrows"
                style={{ width: 50, height: 50, borderRadius: 100 }}
                src="/xbox-arrows.png"
              />
              <p style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Setas
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                gap: 8,
              }}
            >
              <img
                id="btn-xbox-a"
                style={{ width: 40, height: 40, borderRadius: 100 }}
                src="/xbox-a.png"
              />
              <p style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Selecionar
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                gap: 8,
              }}
            >
              <img
                style={{ width: 40, height: 40, borderRadius: 100 }}
                src="/xbox-b.png"
              />
              <p style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Voltar
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
