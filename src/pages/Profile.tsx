import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "./../../lib/supabaseClient";

type Props = {

};

const Profile = ({}: Props) => {
    const supabase = useSupabaseClient()
    const router = useRouter()
    const session = useSession()
  const signOut = async () => {
    await supabase.auth.signOut();
    console.log("test")
    console.log(session);
    router.push("/")
  
  };

  return (
    <div>
      Prodfile
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export const getServerSideProps = async (ctx:any) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    if (!session)
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      }
  
    return {
      props: {
        initialSession: session,
        user: session.user,
      },
    }
  }


export default Profile;

