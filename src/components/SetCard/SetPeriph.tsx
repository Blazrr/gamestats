import React, { useState } from "react";
import ColorPicker from "../Edit/ColorPicker";
import { toast } from "react-toastify";
import { changeUser } from "slices/userSlice";
import { supabase } from "lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Props = {};

const SetPeriph = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const [periph, setPeriph] = useState("Choose");
  const [link, setLink] = useState();
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const tmp = user.setup.filter((item: any) => {
      return item.periph != periph;
    });
    tmp.push({ periph: periph, link: link, name: name });
    console.log(tmp);
    const { error } = await supabase
      .from("profiles")
      .update({ setup: tmp })
      .eq("id", user.id);
    dispatch(
      changeUser({
        ...user,
        setup: tmp,
      })
    );
    setOpen(false);
  };
  return (
    <>
      <button className="btn mx-auto flex mt-8" onClick={() => setOpen(true)}>
        Set up a peripheral
      </button>
      {open && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mt-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-8 rounded-lg z-30 min-w-[300px]">
              {periph != "Choose" && (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="name">your {periph} name</label>
                    <input
                      type="text"
                      className="input max-w-[300px] mt-2"
                      onChange={(e: any) => setName(e.target.value)}
                      id="name"
                    />
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="link">your {periph} buy link</label>
                    <input
                      type="text"
                      className="input max-w-[300px] mt-2"
                      onChange={(e: any) => setLink(e.target.value)}
                      id="link"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col mt-4">
                <label htmlFor="Platform">Select your Peripheral</label>
                <select
                  value={periph}
                  className="btn text-center mt-4"
                  onChange={(e: any) => setPeriph(e.target.value)}
                >
                  <option value="Choose">Chose a Peripheral</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="screen">Screen</option>
                </select>
              </div>

              <button className="btn mt-4" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
            <div
              className="fixed w-screen bg-slate-300 bg-opacity-25 h-full top-0 left-0 overflow-auto  z-20 justify-center"
              onClick={() => setOpen(false)}
            ></div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default SetPeriph;
