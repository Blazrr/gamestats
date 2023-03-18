import { AnimatePresence, motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { supabase } from "lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";
import ColorPicker from "../Edit/ColorPicker";

type Props = {

}

const SetGithub = ({}: Props) => {

    const user = useSelector((state: RootState) => state.user.value);
    const [username, setUsername] = useState(user.github?.username);
    const dispatch = useDispatch();
    const [color, setColor] = useState(user?.github?.bgColor || "#000000");

  
    const [open, setOpen] = useState(false);
  
    const handleSubmit = async () => {
      
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        if (data.message != "Not Found") {
          const { error } = await supabase
            .from("profiles")
            .update({ github: { username: username , bgColor:color} })
            .eq("id", user.id);
          dispatch(
            changeUser({
              ...user,
              github: { username: username , bgColor:color} 
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
        }
       else {
        toast("Please enter a Guthub username", {
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

      <div className="relative h-16 w-16" onClick={() => setOpen(true)}>
        <Image
          src="/github.png"
          alt="League of Legends icon"
          layout="fill"
          objectFit="cover"
          className="rounded cursor-pointer hover:scale-105 transition-all"
        />
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
            <div>
              <label htmlFor="">Github username</label>
              <input
                type="text"
                className="input max-w-[300px] mt-2"
                onChange={(e) => setUsername(e.target.value)}
                value={username || ""}
              />
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
  )
}

export default SetGithub