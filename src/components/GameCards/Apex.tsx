import { AnimatePresence,motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { platform } from "os";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Apex } from "utils/apex";
import {  user } from "utils/user";
import SetApex from "../SetGame/SetApex";

type Props = {
    showDiv:boolean
    user:user
    
};

const Apex = ({showDiv,user}: Props) => {
  const [data, setData] = useState<Apex | null>();
  const router = useRouter().route;


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `
        https://api.mozambiquehe.re/bridge?auth=${process.env.NEXT_PUBLIC_APEX_KEY}&uid=${user.apex.uid}&platform=${user.apex.platform}`
      );
      const tmp = await response.json();
      setData(tmp);
    };
    if (user != undefined) {
        fetchData();
      }

  }, [user]);


  return (
    <>
    {
        data?.legends != undefined && 
        <AnimatePresence>
      <motion.div
        className="p-4 rounded-lg flex items-center w-[300px] "
        style={{ backgroundColor: user.apex.bgColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative h-12 w-12">
          <Image
            src={`${data?.legends.selected.ImgAssets.icon}`}
            alt="Apex main character"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="">Lvl.{data?.global.level}</h2>
        <a target="_blank" href={`https://apex.tracker.gg/apex/profile/${user.apex.platform == "PC" ? "origin" : "PSN "}/${user.apex.username}/overview`} rel="noopener noreferrer" className="underline ml-2">{data?.global.name}</a>

          <div className="relative h-12 w-12 ">
            <Image
              src={
                `${data?.global.rank.rankImg}` }
              alt="Apex main character"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        {router == "/Profile" && <SetApex showDiv={showDiv} />}
      </motion.div>
      </AnimatePresence>   
    }
    </>
  );
};

export default Apex;
