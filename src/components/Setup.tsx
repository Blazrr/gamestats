import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {};

const Setup = (props: Props) => {
  return (
    <AnimatePresence>

    <motion.div className="flex items-center justify-center mt-16 gap-4 flex-col"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} 
    >
    <h1>test</h1>
  </motion.div>
    </AnimatePresence>
  );
};

export default Setup;
