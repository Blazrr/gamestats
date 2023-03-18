import { supabase } from "lib/supabaseClient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";
import Avatar from "./Avatar";
import { toast } from "react-toastify";

type Props = {};

const EditProfile = (props: Props) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.value);
  const [avatar, setAvatar] = useState(user.avatar_url);
  const [username, setUsername] = useState(user.username);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const saveChanges = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatar,username: username })
       
      .eq("id", user.id);
    if (error) {
      alert("Your username is already taken");
      return;
    } else {
      dispatch(changeUser({ ...user, avatar_url: avatar,username: username }));
      //Delete old avatars
      const { data, error } = await supabase.storage
        .from("avatars")
        .list(user.id);
      let tmp: string[] = [];

      data?.map((item) => {
        if (!`${avatar}`.includes(item.name)) {
          tmp.push(user.id + "/" + item.name);
        }
      });
      {
        const { data, error } = await supabase.storage
          .from("avatars")
          .remove(tmp);
      }
      //Delete old avatars
    }
  };

  const ChangePassword = async() => {
    

      if (password1 === password2) {
        const { data, error } = await supabase.auth.updateUser({password: password1})
        toast("You have successfully changed your password", {
          icon: "✅",
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          theme: "dark",
          role: "alert",
        });
  }
  else{
    toast("Please enter the same password", {
      icon: "❌",
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "dark",
      role: "alert",
    });
  }
}
  return (
    <div className="mx-auto flex flex-col rounded-lg p-4 ">
      <div className="flex items-center justify-center gap-6 flex-wrap ">
      <Avatar setAvatar={setAvatar} />
      <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username || ""}
        className="input mt-4 max-w-[200px] "
      />
      </div>
      </div>
      <div>
      <button className="btn mt-8 mx-auto flex" onClick={saveChanges}>
        Save changes
      </button>
      </div>
      <hr className="mt-16" />
      <p className="text-center text-2xl mt-8">Edit Password</p>
      <div className="space-y-4 flex flex-col items-center justify-center ">
      <div>
        <label htmlFor="password1">Password</label>
        <input type="password" className="input " id="password1" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)} />
      </div>

      <div>
        <label htmlFor="password2">Confirm Password</label>
        <input type="password" className="input " id="password2" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)} />
      </div>

      <button className="btn" onClick={ChangePassword}> Submit Password Changes</button>
      </div>
    </div>
  );
};

export default EditProfile;
