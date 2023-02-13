import { supabase } from "lib/supabaseClient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";
import Avatar from "./Avatar";

type Props = {};

const EditProfile = (props: Props) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.value);
  const [avatar, setAvatar] = useState(user.avatar_url);
  const [username, setUsername] = useState(user.username);

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
      let tmp: any = [];

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
  return (
    <div className="mx-auto flex flex-col">
      <Avatar setAvatar={setAvatar} />
      <input
        type="text"
        placeholder={user.username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mt-8 max-w-[200px] "
      />
      <button className="btn mt-4" onClick={saveChanges}>
        Save changes
      </button>
    </div>
  );
};

export default EditProfile;