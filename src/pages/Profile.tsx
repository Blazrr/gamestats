import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "./../../lib/supabaseClient";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "store";
import NameNeeded from "@/components/Profile/NameNeeded";
import SetLeague from "@/components/SetGame/SetLeague";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-4/5 mx-auto"
      >
        {!user.username ? (
          <NameNeeded />
        ) : (
          <div className="flex flex-col">
            <h1 className="text-center text-xl">
              Welcome back {user.username}
            </h1>
            <div className="mt-8">
              <SetLeague />
            </div>
          </div>
        )}

        <div>
          <button onClick={signOut} className="signOut">
            Sign Out
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const getServerSideProps = async (ctx: any) => {
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
