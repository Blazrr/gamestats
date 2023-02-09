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
      {userData.length != 0 ? (
        <div>
          {
                userData[0].lol.summonerName &&
              <League summonerName={userData[0].lol.summonerName} />
          }
        </div>
      ) : (
        <>
        <h1 className="text-center text-4xl mt-16 "> 404 <br/>This user doesnt exist</h1>
        </>
      )}
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
