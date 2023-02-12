import { supabase } from "lib/supabaseClient";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  setAvatar: (avatar: any) => void;
};

const Avatar = ({ setAvatar }: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar_url);
  const [loading, setLoading] = useState(false);

  const uploadAvatar = async (event: any) => {
    setLoading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/${filePath}`, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      return;
    } else {
      setCurrentAvatar(
        `https://tvpfnciysnzhauetfufp.supabase.co/storage/v1/object/public/avatars/${user.id}/${filePath}`
      );
      setAvatar(
        `https://tvpfnciysnzhauetfufp.supabase.co/storage/v1/object/public/avatars/${user.id}/${filePath}`
      );
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        {currentAvatar && (
          <div className="relative h-[200px] w-[200px] ">
            <Image
              src={
                !loading
                  ? currentAvatar
                  : "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
              }
              alt="No avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        )}
        <div>
          <label className="btn" htmlFor="single">
            Upload Avatar
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
