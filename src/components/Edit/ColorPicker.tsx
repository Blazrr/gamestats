import { AnimatePresence,motion } from "framer-motion";
import React, { useState } from "react";
//@ts-ignore
import { CirclePicker } from "react-color";

type Props = {setColor:any};
interface circlePicker {
  hex:string
}



const ColorPicker = ({setColor}:Props) => {
  const [open, setOpen] = useState(false);

  const setPickedColor = (e: circlePicker) => {
    setColor(e.hex);
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="btn mt-4">
        {open ? "Close the color picker" : "Open the color picker"}

      </button>
      <AnimatePresence>
      {open && (
        <motion.div className="mt-4 "
        initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          >
          <CirclePicker onChange={(e: circlePicker) => setPickedColor(e)} />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
