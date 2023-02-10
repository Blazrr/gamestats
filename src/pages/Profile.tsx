import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "./../../lib/supabaseClient";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import NameNeeded from "@/components/Profile/NameNeeded";
import SetLeague from "@/components/SetGame/SetLeague";
import League from "@/components/Profile/League";
import { GetServerSideProps } from "next";
import ColorPicker from "@/components/Edit/ColorPicker";
import { changeUser } from "slices/userSlice";

type Props = {};

const Profile = ({}: Props) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.value);
  const [color, setColor] = useState();
  const dispatch = useDispatch();

  console.log(color);
  console.log(user);
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ background: color })
      .eq("id", user.id);
    dispatch(
      changeUser({
        ...user,
        background: color,
      })
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

          {user.username != null && (
            <>
              <div className="mt-32 p-8">
                <h2 className="text-5xl text-center pb-8">Your current card</h2>
                <div
                  className=" rounded-lg p-16 relative"
                  style={{ backgroundColor: color || user.background || "black" }}
                >
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 transform">
                  <ColorPicker setColor={setColor} />
                  </div>
                  <button className="btn absolute bottom-8 right-8" onClick={saveChanges}>
                    save changes
                  </button>

                  <h1 className="text-6xl font-bold text-center pt-16">
                    {user.username}
                  </h1>
                  <div className="flex items-center justify-center mt-8">
                    {user.lol != null && (
                      <League summoner={user.lol} showDiv={false} />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
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
