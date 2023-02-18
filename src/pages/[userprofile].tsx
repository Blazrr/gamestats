import Navbar from "@/components/Navbar/Navbar";
import League from "@/components/GameCards/League";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "lib/supabaseClient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { user } from "utils/user";
import Apex from "@/components/GameCards/Apex";
import GlitchedTitle from "@/components/Commons/GlitchedTitle";
import CurrCard from "@/components/Profile/CurrCard";

type Props = {
  userData: user[];
};

const userprofile = ({ userData }: Props) => {

  return (
    <>
      <div className="h-screen  w-screen purpink" >
       

          {userData.length != 0 ? (
            <CurrCard user={userData[0]} />
          ) : (
            <>
              <h1 className="text-center text-4xl pt-16 ">
                {" "}
                <GlitchedTitle textValue="404 NOT FOUNED"/>
                404 <br />
                This Page doesnt exist
              </h1>
            </>
          )}
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
