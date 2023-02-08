import { Variants } from 'framer-motion';

export const navbarVariants: Variants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
        ease: "easeOut",
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
        ease: "easeIn",
      },
    },
  };

  export const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 400,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 400,
      transition: {
        ease: "easeOut",
      },
    },
  };