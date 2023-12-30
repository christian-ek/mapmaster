/**
 * Fades in to visible, scales slightly from hidden, and fades out for exit.
 */
export const fadeInAndOutVariant = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

/**
 * Flies in from top and fades in to visible.
 */
export const flyInFromTopVariant = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.4,
    },
  },
};

/**
 * Slides in from right, becomes fully visible, and slides out to left.
 */
export const slideInAndOutVariant = {
  hidden: {
    x: '100vh',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/**
 * Fades in and scales up on entry, then slides out to the left on exit.
 */
export const fadeInSlideLeftVariant = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/**
 * Fades in on entry and slides out downwards for exit.
 */
export const fadeInSlideDownVariant = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/**
 * Fade in upwards and scale up, then exits by sliding down and fading out.
 */
export const fadeInUpAndExitDownVariant = {
  hidden: {
    opacity: 0,
    y: '-100vh',
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    y: -90,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 14,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/**
 * Slide in from the right and fade in with a tween transition.
 */
export const slideInFromRightVariant = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.4,
    },
  },
};

/**
 * Slides in from left or right and becomes visible with a tween transition, includes a pulsing scale effect.
 */
export const slideAndPulseVariant = {
  hiddenLeft: {
    x: '-100vw',
    opacity: 0,
    scale: 1,
  },
  hiddenRight: {
    x: '100vw',
    opacity: 0,
    scale: 1,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.4,
    },
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};
