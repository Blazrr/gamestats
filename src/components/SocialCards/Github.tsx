import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { user } from "utils/user";

type Props = {
  user: user;
};

const Github = ({ user }: Props) => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `
          https://api.github.com/users/${user?.github?.username}`
      );
      const tmp = await response.json();

      setData(tmp);
    };
    if (user != undefined) {
      fetchData();
    }
  }, [user]);

  console.log(data);

  return (
    <>
    {
        data != null && (
      <AnimatePresence>
        <motion.div
          className="p-4 rounded-lg flex  items-center w-[240px] md:w-[300px] justify-between "
          style={{ backgroundColor: user?.github?.bgColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
             <div className="relative  h-12 w-12 ">
        <Image
          src="/github.png"
          alt="Github Icon"
          className="rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
          <div className="relative  h-12 w-12 ">
        <Image
          src={`${data?.avatar_url}`}
          alt="Github Icon"
          className="rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
          <h3 className="text font-semibold ">{data?.public_repos} Repos</h3>
      <a target="_blank" href={`https://github.com/${data?.login}`}  className=" font-semibold  underline" rel="noopener noreferrer">{data?.login}</a>
          
        </motion.div>
      </AnimatePresence>
        )
}
    </>
  );
};

export default Github;
