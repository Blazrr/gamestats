import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from 'react'
import { supabase } from "lib/supabaseClient";
import { AnimatePresence,motion } from "framer-motion";
type Props = {}

const Login = (props: Props) => {

  return (
    <AnimatePresence>
    <motion.div className="mx-auto max-w-[768px] p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      <Auth
        supabaseClient={supabase}
        appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
        theme="dark"
        magicLink={true}
        providers={["google"]}
      />
    </motion.div>
    </AnimatePresence>
  )
}

export default Login