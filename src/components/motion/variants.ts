import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const staggerContainer = (stagger = 0.1, delay = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const wipeUp: Variants = {
  hidden: { opacity: 0, y: 56, clipPath: "inset(20% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const lift: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const cornerIn: Variants = {
  hidden: { opacity: 0, x: 24, y: 24 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const headerReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const swingIn: Variants = {
  hidden: { opacity: 0, rotate: -4, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    rotate: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -60px 0px",
} as const;
