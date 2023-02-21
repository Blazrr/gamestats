import ColorPicker from "../Edit/ColorPicker";
import League from "../GameCards/League";
import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { toast } from "react-toastify";
import { RootState } from "store";
import Apex from "../GameCards/Apex";
import GlitchedTitle from "../Commons/GlitchedTitle";
import { useRouter } from "next/router";
import Image from "next/image";
import Games from "../Games";
import Socials from "../Socials";
import Setup from "../Setup";

type Props = {
  user:any
};

const CurrCard = ({user}: Props) => {
  const router = useRouter().route;
  const [tab, setTab] = useState("Games");

  return (
    <div
      className={`purpink p-16 ${
        router == "/Profile" ? "rounded-lg mt-16" : "h-screen w-screen"
      } `}
    >
      <div className=" flex items-center space-x-4 justify-center ">
        <GlitchedTitle textValue={user?.username} />
        {user?.avatar_url && (
          <div className="relative h-[80px] md:h-[104px] aspect-square ">
            <Image
              src={user?.avatar_url}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
        <ul className="flex items-center justify-center mt-16 space-x-8">
          <li className={`cursor-pointer ${tab == "Games" && " bg-slate-700 rounded p-1"}`}  onClick={() => setTab("Games")}>
            Games
          </li>
          <li className={`cursor-pointer ${tab == "Socials" && "  bg-slate-700 rounded p-1"}`}   onClick={() => setTab("Socials")}>
            Socials
          </li>
          <li className={`cursor-pointer ${tab == "Setup" && " bg-slate-700 rounded p-1"}`}  onClick={() => setTab("Setup")}>
            Setup
          </li>
        </ul>
 
      {tab == "Games" && <Games user={user} />}
      {tab == "Socials" && <Socials user={user} />}
      {tab == "Setup" && <Setup user={user} />}

    </div>
  );
};

export default CurrCard;
