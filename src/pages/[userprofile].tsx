import Navbar from "@/components/Navbar/Navbar";
import League from "@/components/Profile/League";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "lib/supabaseClient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, {useEffect} from "react";

type Props = {
  userData: any;
};

const userprofile = ({ userData }: Props) => {
  console.log(userData);

 

  return (
    <>
    <div className="bblue h-screen  w-screen">

    <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute">

    

      {userData.length != 0 ? (
        <div className=" ">
          {
                userData[0].lol.summonerName &&
              <League summoner={userData[0].lol} />
          }
        </div>
      ) : (
        <>
        <h1 className="text-center text-4xl mt-16 "> 404 <br/>This user doesnt exist</h1>
        </>
      )}
      </div>
          </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {


  const userName = params?.userprofile;

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("username", userName);

  return {
    props: {
      userData: data,
    },
  };
};

export default userprofile;
