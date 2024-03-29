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

type Props = { showDiv: boolean };

const SetValorant = ({ showDiv }: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [username, setUsername] = useState(user.valorant?.username);
  const dispatch = useDispatch();
  const [color, setColor] = useState(user?.lol?.bgColor || "#000000");
  const [server, setServer] = useState("eu");
  const [tagline, setTagline] = useState(user.valorant?.tagline)

  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    
      const response = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/mmr/${server}/${username}/${tagline}
        `
      );
      const data = await response.json();
      if(data.status === 200) {
        const { error } = await supabase
        .from("profiles")
        .update({
          valorant: { username: username, bgColor: color, server: server, tagline: tagline},
        })
        .eq("id", user.id);
      dispatch(
        changeUser({
          ...user,
          valorant: { username: username, bgColor: color, server: server, tagline: tagline}
        })
      );
      toast("You have succesfully changed your card", {
        icon: "✅",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "dark",
        role: "alert",
      });
      setOpen(false);
      }
      else{
        toast("Please enter a Valid valorant user ", {
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
            src="/valorant.png"
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
                <label htmlFor="">Valorant username</label>
                <input
                  type="text"
                  className="input max-w-[300px] mt-2"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username || ""}
                />
              </div>
              <div>
                <label htmlFor="">Tagline</label>
                <input
                  type="text"
                  className="input max-w-[300px] mt-2"
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTagline(e.target.value)}
                  value={tagline || ""}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="Platform">Select your region</label>
                <select
                  value={server}
                  className="btn text-center"
                  onChange={(e :React.ChangeEvent<HTMLSelectElement>) => setServer(e.target.value)}
                >
                  <option value="eu">EUW</option>
                  <option value="na">NA</option>
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

export default SetValorant;
