import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { user } from "utils/user";

type Props = {
  user:user
};

const Setup = ({user}: Props) => {
  return (
    <AnimatePresence>

    <motion.div className="flex  mt-16 space-y-8 flex-col justify-center items-center "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} 
    >
    {user.setup?.map((item,id) => {
      return(
        <div key={id} className="flex space-x-4 items-center  ">
          <span>{item.periph}</span>
          <p>{item.name}</p>
          <button className="btn"> <a href={item.link} target="_blank" rel="noreferrer">Buy</a> </button>
        </div>
      )
    })}
  </motion.div>
    </AnimatePresence>
  );
};

export default Setup;
