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

type Props = {};

const CurrCard = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const router = useRouter().route;
  console.log(user);

  return (
    <div
      className={`purpink p-16 ${router == "/Profile" ? "rounded-lg mt-16" : "h-screen w-screen"} `}
    
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
      <div className="flex items-center justify-center mt-16 gap-4 flex-col">
        {user.lol != null && <League user={user} showDiv={false} />}
        {user.apex != null && <Apex showDiv={false} user={user} />}
      </div>
    </div>
  );
};

export default CurrCard;
