export const fadeIn = (delay = 0, y = 0, scale = 1) => ({
    initial: { opacity: 0, y, scale },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, delay },
  });