import { user } from 'utils/user'
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { platform } from "os";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Apex } from "utils/apex";
import SetApex from "../SetCard/SetApex";
import { mmrValorant, valorant } from 'utils/valorant';


type Props = {
    user:user
}

const Valorant = ({user}: Props) => {
    const [data, setData] = useState<valorant | null>();
    const [mmrData, setMmrData] = useState<mmrValorant | null>()
    const router = useRouter().route;
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(
            `
            https://api.henrikdev.xyz/valorant/v1/account/${user.valorant.username}/${user.valorant.tagline}`
          );
          const tmp = await response.json();
          setData(tmp.data);
          const mmrResponse = await fetch (`https://api.henrikdev.xyz/valorant/v1/mmr/${user.valorant.server}/${user.valorant.username}/${user.valorant.tagline}
          `)
          const mmrTmp = await mmrResponse.json();
          setMmrData(mmrTmp.data)

        };
        if (user != undefined) {
          fetchData();
        }
      }, [user]);
    
      return (
        <>
          {(mmrData != undefined) && (data != null) && (
            <AnimatePresence>
              <motion.div
                className="p-4 rounded-lg flex items-center w-[240px] md:w-[300px] justify-between "
                style={{ backgroundColor: user.valorant.bgColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={`${data?.card?.small}`}
                    alt="Val bg image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="relative h-12 w-12  ">
                  <Image
                    src={`${mmrData?.images?.small}`}
                    alt="Apex main character"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="">Lvl.{data.account_level}</h2>
                <a
                  target="_blank"
                  href={`https://tracker.gg/valorant/profile/riot/${user.valorant.username}%23${user.valorant.tagline}/overview`}
                  rel="noopener noreferrer"
                  className="underline "
                >
                  {data.name}#{data.tag}
                </a>
    
              </motion.div>
            </AnimatePresence>
          )}
        </>
      );
  
}

export default Valorant