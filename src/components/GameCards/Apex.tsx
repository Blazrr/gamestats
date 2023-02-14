import { AnimatePresence,motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
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

  console.log(data)

  return (
    <>
    {
        data?.legends != undefined && 
        <AnimatePresence>
      <motion.div
        className={`p-4 rounded-lg flex flex-col items-center  `}
        style={{ backgroundColor: user.apex.bgColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative h-36 w-36  md:h-52 md:w-52 ">
          <Image
            src={`${data?.legends.selected.ImgAssets.icon}`}
            alt="Apex main character"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="mt-4">Lvl {data?.global.level}</h2>
        <h1>{data?.global.name}</h1>
        <div className="flex items-center">
          <div className="relative h-12 w-12  md:h-16 md:w-16 ">
            <Image
              src={
                `${data?.global.rank.rankImg}` }
              alt="Apex main character"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        {router == "/Profile" && <SetApex showDiv={showDiv} />}
      </motion.div>
      </AnimatePresence>   
    }
    </>
  );
};

export default Apex;
