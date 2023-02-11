import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import NameNeeded from "@/components/Profile/NameNeeded";
import SetLeague from "@/components/SetGame/SetLeague";
import League from "@/components/Profile/League";
import { GetServerSideProps } from "next";
import ColorPicker from "@/components/Edit/ColorPicker";
import { changeUser } from "slices/userSlice";
import { toast } from "react-toastify";
import CurrCard from "@/components/Profile/CurrCard";
import Subscription from "@/components/Profile/Subscription";

type Props = {};

const Profile = ({}: Props) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.value);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
          <Subscription/>
          {!user?.username ? (
            <NameNeeded />
          ) : (
            <div className="flex flex-col">
              <h1 className="text-center text-xl">
                Welcome back {user.username}
              </h1>
              <div className="mt-8">
                <SetLeague showDiv={true} />
              </div>
            </div>
          )}

          <div>
            <button onClick={signOut} className="signOut">
              Sign Out
            </button>
          </div>

          {user.username != null && <CurrCard />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
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
