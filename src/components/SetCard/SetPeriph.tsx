import React, { useEffect, useState } from "react";
import { changeUser } from "slices/userSlice";
import { supabase } from "lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { AnimatePresence, motion } from "framer-motion";
import { periph } from "utils/setup";
import { peripheral } from "utils/user";

type Props = {};

const SetPeriph = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [name, setName] = useState<string>();
  const dispatch = useDispatch();
  const [periph, setPeriph] = useState<string>("Choose");
  const [link, setLink] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [curr, setCurr] = useState<peripheral>();

  const handleSubmit = async (p: string ) => {
    const tmp = user.setup.filter((item: periph) => {
      return item.periph != periph;
    });
    if (p != "DEL") {
      tmp.push({ periph: periph, link: link, name: name });
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriph(e.target.value);
    const tmp = user.setup.filter((item: peripheral) => {
      return item.periph == e.target.value;
    });
    setCurr(tmp[0]);
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
                  {curr != undefined && (
                    <button className="btn" onClick={() => handleSubmit("DEL")}>
                      delete
                    </button>
                  )}
                  <div className="flex flex-col">
                    <label htmlFor="name">your {periph} name</label>
                    <input
                      type="text"
                      className="input max-w-[300px] mt-2"
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      id="name"
                      placeholder={curr?.name}
                    />
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="link">your {periph} buy link</label>
                    <input
                      type="text"
                      className="input max-w-[300px] mt-2"
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                      id="link"
                      placeholder={curr?.link}
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col mt-4">
                <label htmlFor="Platform">Select your Peripheral</label>
                <select
                  value={periph}
                  className="btn text-center mt-4"
                  onChange={(e :React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                >
                  <option value="Choose">Chose a Peripheral</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="screen">Screen</option>
                </select>
              </div>

              <button className="btn mt-4" onClick={() =>handleSubmit("ADD")}>
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
