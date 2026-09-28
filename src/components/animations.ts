export interface AnimationSpec {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
}

export const animations: Record<string, AnimationSpec> = {
  home_select_big: {
    keyframes: [
      { transform: "scale(1, 1)" },
      { transform: "scale(1.018, 1.031)" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  home_deselect_big: {
    keyframes: [
      { transform: "scale(1.018, 1.031)" },
      { transform: "scale(1, 1)" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  home_select_small: {
    keyframes: [
      { transform: "scale(1, 1)" },
      { transform: "scale(1.057, 1.083)" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  home_deselect_small: {
    keyframes: [
      { transform: "scale(1.057, 1.083)" },
      { transform: "scale(1, 1)" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  home_shine_in: {
    keyframes: [
      { clipPath: "polygon(0 0, 0 0, 0 0)", opacity: 0 },
      { clipPath: "polygon(0 0, 300% 0, 0 300%)", opacity: 1 },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  home_shine_out: {
    keyframes: [
      { clipPath: "polygon(0 0, 300% 0, 0 300%)", opacity: 1 },
      { clipPath: "polygon(0 0, 0 0, 0 0)", opacity: 0 },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  pulse: {
    keyframes: [
      { transform: "scale(0.5, 0.5)" },
      { transform: "scale(1, 1)" },
    ],
    options: { duration: 500, easing: "ease" },
  },
  expand: {
    keyframes: [
      { width: "0px", height: "0px" },
      { width: "min(500px, calc(100dvw - 80px))", height: "auto" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  reducer: {
    keyframes: [
      { width: "min(500px, calc(100dvw - 80px))", height: "auto" },
      { width: "0px", height: "0px" },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  expand_x: {
    keyframes: [{ width: "0px" }, { width: "500px" }],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  reducer_x: {
    keyframes: [{ width: "500px" }, { width: "0px" }],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  show: {
    keyframes: [
      { opacity: "0", offset: 0 },
      { opacity: "0", offset: 0.99 },
      { opacity: "1", offset: 1 },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  hidden: {
    keyframes: [
      { opacity: "1", offset: 0 },
      { opacity: "0", offset: 0.01 },
      { opacity: "0", offset: 1 },
    ],
    options: { duration: 500, easing: "ease", fill: "forwards" },
  },
  flash: {
    keyframes: [
      { outline: "1px solid #fff", offset: 0 },
      { outline: "4px solid #fff", offset: 0.99 },
      { outline: "none", offset: 1 },
    ],
    options: { duration: 300, easing: "ease" },
  },
};
