import useFetch from "hooks/useFetch";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  summonerName: string;
};

const League = ({ summonerName, }: Props) => {
  const { loading, error, data } = useFetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`)
  ;


  return (

    <div className="flex">

 
    <div className=" p-4 bg-orange-300 rounded-lg">
      <div className="relative  h-[200px] w-[200px]">
        <Image
          src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${data?.profileIconId}.png`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text font-semibold mt-2">Lvl. {data?.summonerLevel}</h3>
      <h1 className="mt-2 font-semibold">{data?.name}</h1>
    </div>


    </div>

  
  );
};



export default League;
