import ColorPicker from "../Edit/ColorPicker";
import League from "../GameCards/League";
import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { toast } from "react-toastify";
import { RootState } from "store";
import Apex from "../GameCards/Apex";

type Props = {};

const CurrCard = (props: Props) => {
  const [color, setColor] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);

  const saveChanges = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ background: color })
      .eq("id", user.id);
    dispatch(
      changeUser({
        ...user,
        background: color,
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
  };

  return (
    <div className="mt-32 p-8">
      <h2 className="text-5xl text-center pb-8">Your current card</h2>
      <div
        className=" rounded-lg p-16 relative"
        style={{ backgroundColor: color || user.background || "black" }}
      >
        <div className="absolute top-6 left-1/2 -translate-x-1/2 transform">
          <ColorPicker setColor={setColor} />
        </div>
        <button className="btn absolute bottom-8 right-8" onClick={saveChanges}>
          save changes
        </button>

        <h1 className="text-6xl font-bold text-center pt-16">
          {user.username}
        </h1>
        <div className="flex items-center justify-center mt-8 gap-4 flex-wrap">
          {user.lol != null && <League user={user} showDiv={false} />}
          {user.apex != null && <Apex showDiv={false} user={user}/>}
        </div>
      </div>
    </div>
  );
};

export default CurrCard;
