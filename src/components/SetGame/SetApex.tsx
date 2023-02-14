import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "lib/supabaseClient";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";
import ColorPicker from "../Edit/ColorPicker";

type Props = { showDiv: boolean };

const SetApex = ({showDiv}: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [username, setUsername] = useState(user?.apex?.username);
  const dispatch = useDispatch();
  const [color, setColor] = useState(user?.apex?.bgColor || "#000000");
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState(user?.apex?.platform);


  const handleSubmit = async () => {

    const response = await fetch(
      `https://api.mozambiquehe.re/bridge?auth=${process.env.NEXT_PUBLIC_APEX_KEY}&player=${username}&platform=${platform}`
    );
    const data = await response.json();
    if (!data.Error) {
      const { error } = await supabase
        .from("profiles")
        .update({
          apex: { username: username, bgColor: color, platform: platform },
        })
        .eq("id", user.id);
      dispatch(
        changeUser({
          ...user,
          apex: { username: username, bgColor: color, platform: platform },
        })
      );
      setOpen(false);
      toast("You have succesfully changed your card", {
        icon: "✅",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "dark",
        role: "alert",
      });
    } else {
      toast("Please set a valid profile", {
        icon: "❌",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "dark",
        role: "alert",
      });
    }
  };

  return (
    <div className="flex flex-col">
      {user?.apex.username && showDiv ? (
        <p>
          Your current Apex Name is{" "}
          <span className="underline font-bold">{user.apex.username}</span>.{" "}
          <br /> You can still change your infos right down
        </p>
      ) : (
        !user?.apex.username && showDiv && (
          <p>
            You didnt set up an Apex profile. <br /> You can still change your
            infos right down
          </p>
        )
      )}
      <div className="">
        <button className="btn mt-6" onClick={() => setOpen(true)}>
          Edit Apex Profile
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="mt-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-8 rounded-lg z-30 min-w-[300px]"
              style={{ backgroundColor: color }}
            >
              <div className="flex flex-col">
                <label htmlFor="username">Apex Summoner name</label>
                <input
                  type="text"
                  className="input max-w-[300px] mt-2"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={user?.apex?.username}
                  id="username"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="Platform">Select your Platform</label>
                <select
                  value={platform}
                  className="btn text-center"
                  onChange={(e: any) => setPlatform(e.target.value)}
                >
                  <option value="PC">PC</option>
                  <option value="PS4">PS4</option>
                </select>
              </div>

              <p>Your card color will be {color} </p>
              <ColorPicker setColor={setColor} />
              <button className="btn mt-4" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
            <div
              className="fixed w-screen bg-slate-300 bg-opacity-25 h-full top-0 left-0 overflow-auto  z-20 justify-center"
              onClick={() => setOpen(false)}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SetApex;
