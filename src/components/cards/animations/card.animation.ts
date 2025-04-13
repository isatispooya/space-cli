export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };
  
  export const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };
  
  export const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  };