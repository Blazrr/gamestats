import useFetch from "hooks/useFetch";
import { supabase } from "lib/supabaseClient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "slices/userSlice";
import { RootState } from "store";

type Props = {};

const SetLeague = (props: Props) => {
  const [username, setUsername] = useState("");
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  console.log(user);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        const { error } = await supabase
          .from("profiles")
          .update({ lol: { summonerName: username } })
          .eq("id", user.id);
        dispatch(changeUser({ ...user, lol: { summonerName: username } }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {user?.lol?.summonerName ? (
        <p>
          Your current Summoner Name is{" "}
          <span className="underline font-bold">{user.lol.summonerName}</span>.{" "}
          <br /> You can still change your infos right down
        </p>
      ) : (
        <p>
          You didnt set up your profile. <br /> You can still change your infos
          right down
        </p>
      )}
      <div className="mt-6">
        <label htmlFor="">League Summoner name</label>
        <div>
          <input
            type="text"
            className="input max-w-[300px] mt-2"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn mt-4" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLeague;
