import useFetch from "hooks/useFetch";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { supabase } from "lib/supabaseClient";
import { LeagueProfile } from "utils/league";
import { lol } from "utils/user";
import { useRouter } from "next/router";
import SetLeague from "../SetGame/SetLeague";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  data?: LeagueProfile | null;
  summoner: lol;
  showDiv: boolean;
};

const League = ({ summoner, showDiv }: Props) => {
  const router = useRouter().route;
  const user = useSelector((state: RootState) => state.user.value);
  const [seed, setSeed] = useState(0);
  const [data, setData] = useState<LeagueProfile | null>();

  useEffect(() => {
    const fetchData = async () => {
      const tmp = await fetch(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner?.summonerName}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
      );
      const res = await tmp.json();
      console.log(res);
      setData(res);
    };
    if (summoner != undefined) {
      fetchData();
    }
  }, [summoner]);

  console.log(summoner);

  return (
    <div
      className={`p-4 rounded-lg flex flex-col items-center  `}
      style={{ backgroundColor: summoner?.bgColor }}
    >
      <div className="relative h-36 w-36  md:h-52 md:w-52 ">
        <Image
          src={
            `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${data?.profileIconId}.png` ||
            "https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg"
          }
          alt="League of Legends icon"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text font-semibold mt-2">Lvl. {data?.summonerLevel}</h3>
      <h1 className="mt-2 font-semibold">{data?.name}</h1>
      {router == "/Profile" && <SetLeague showDiv={showDiv} />}
    </div>
  );
};

export default League;
