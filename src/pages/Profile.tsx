import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AnimatePresence, calcLength, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import NameNeeded from "@/components/Profile/NameNeeded";
import SetLeague from "@/components/SetCard/SetLeague";
import { GetServerSideProps } from "next";

import CurrCard from "@/components/Profile/CurrCard";
import EditProfile from "@/components/Profile/EditProfile";
import SetApex from "@/components/SetCard/SetApex";
import SetPeriph from "@/components/SetCard/SetPeriph";
import SetValorant from "@/components/SetCard/SetValorant";
import SetColor from "@/components/SetCard/SetColor";
import EditCard from "@/components/Profile/EditCard";

type Props = {};

const Profile = ({}: Props) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.value);
  const [currTab, setCurrTab] = useState("EditCard");
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://gamestats-snowy.vercel.app/${user.username}`
    );
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-4/5 mx-auto"
        >
          {!user?.username ? (
            <NameNeeded />
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h1 className="text-center text-2xl">
                  Welcome back {user.username}
                </h1>
                <div className="mt-4 bg-slate-300 p-2 rounded space-x-2 flex items-center ">
                  <span className="text-black ">
                    https://gamestats-snowy.vercel.app/{user.username}
                  </span>
                  <button className="btn" onClick={handleCopy}>
                    Copy
                  </button>
                </div>
                <div className="space-x-8 mt-8">
                  <button
                    className={`btn ${currTab === "EditCard" && "border-white"}`}
                    onClick={() => setCurrTab("EditCard")}
                  >
                    Edit Card
                  </button>
                  <button
                    className={`btn ${currTab === "EditProfile" && "border-white"}`}
                    onClick={() => setCurrTab("EditProfile")}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              {currTab === "EditCard" && <EditCard />}
              {currTab === "EditProfile" && <EditProfile />}

            </>
          )}

          <div>
            <button onClick={signOut} className="signOut">
              Sign Out
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default Profile;
