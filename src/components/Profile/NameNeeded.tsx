import { supabase } from "lib/supabaseClient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";

type Props = {};

const NameNeeded = (props: Props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ username: name })
      .eq("id", user.id);
    if (error) {
      setError(error.message);
      alert("tu dois avoir au moins 3 lettres");
      return;
    }
    dispatch(changeUser({ ...user, username: name }));
  };

  return (
    <div className="w-4/5 mx-auto">
      <label
        htmlFor="exampleFormControlInput1"
        className="form-label inline-block mb-2 text-white"
      >
        Set your first userName
      </label>
      <input
        type="text"
        className="
      input-username
      "
        id="exampleFormControlInput1"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex">
        <button className="btn mt-6 mx-auto" onClick={handleSubmit}>
          Submit Changes
        </button>
      </div>
      <p className="text-center mt-8">Notice that we cannot go further without a unique username from you &#x1F641; </p>
    </div>
  );
};

export default NameNeeded;
