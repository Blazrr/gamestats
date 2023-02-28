
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { LeagueProfile } from "utils/league";
import {  user } from "utils/user";
import { useRouter } from "next/router";
import SetLeague from "../SetCard/SetLeague";

import { AnimatePresence,motion } from "framer-motion";

type Props = {
  data?: LeagueProfile | null;
  user: user;
  showDiv: boolean;
};

const League = ({ user, showDiv }: Props) => {
  const router = useRouter().route;
  const [data, setData] = useState<LeagueProfile | null>();

  useEffect(() => {
    const fetchData = async () => {
      try{
      const tmp = await fetch(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user?.lol?.summonerName}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
      );
      const res = await tmp.json();
      setData(res);
      }
      catch(err) {
      }
    };
    if (user != undefined) {
      fetchData();
    }
  }, [user]);


  return (
    <>
    {
      data != undefined && 
      <AnimatePresence>
    <motion.div
      className="p-4 rounded-lg flex  items-center w-[240px] md:w-[300px] justify-between "
      style={{ backgroundColor: user?.lol?.bgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative  h-12 w-12 ">
        <Image
          src={
            `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${data?.profileIconId}.png` ||
            "https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg"
          }
          alt="League of Legends icon"
          className="rounded-lg"
        />
      </div>
      <h3 className="text font-semibold ">Lvl.{data?.summonerLevel}</h3>
      <a target="_blank" href={`https://www.op.gg/summoners/${user.lol?.server}/${user.lol?.summonerName}`}  className=" font-semibold  underline" rel="noopener noreferrer">{data?.name}</a>
      {router == "/Profile" && <SetLeague showDiv={showDiv} />}
    </motion.div>
    </AnimatePresence>
        }
        </>
  );
};

export default League;
