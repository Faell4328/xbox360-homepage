import { forwardRef, useImperativeHandle, useRef } from "react";
import { animations } from "./animations";
import { playSound } from "./sounds";

export interface NotificationHandle {
  notify: (text: string) => void;
}

const Notification = forwardRef<NotificationHandle>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const timeouts = useRef<number[]>([]);

  useImperativeHandle(ref, () => ({
    notify(text: string) {
      timeouts.current.forEach((id) => clearTimeout(id));
      timeouts.current = [];

      const show = window.setTimeout(() => {
        imageRef.current?.animate(
          animations.pulse.keyframes,
          animations.pulse.options,
        );
        textContainerRef.current?.animate(
          animations.expand_x.keyframes,
          animations.expand_x.options,
        );
        textRef.current?.animate(
          animations.show.keyframes,
          animations.show.options,
        );

        if (containerRef.current) containerRef.current.style.opacity = "1";
        if (textRef.current) textRef.current.textContent = text;

        playSound("notify-popup.wav");
      }, 600);

      const hide = window.setTimeout(() => {
        textContainerRef.current?.animate(
          animations.reducer_x.keyframes,
          animations.reducer_x.options,
        );
        textRef.current?.animate(
          animations.hidden.keyframes,
          animations.hidden.options,
        );

        if (containerRef.current) containerRef.current.style.opacity = "0";
      }, 5000);

      timeouts.current.push(show, hide);
    },
  }));

  return (
    <div id="notification-container" ref={containerRef}>
      <img
        id="notification-image"
        ref={imageRef}
        style={{ position: "absolute", marginLeft: -10, width: "auto", height: 85 }}
        src="/xbox-orb.png"
        loading="eager"
      />
      <div id="notification-container-text" ref={textContainerRef}>
        <p id="notification-text" ref={textRef}>
          Oi
        </p>
      </div>
    </div>
  );
});

Notification.displayName = "Notification";

export default Notification;
