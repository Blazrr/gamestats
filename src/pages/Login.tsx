import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from 'react'
import { supabase } from "lib/supabaseClient";
type Props = {}

const Login = (props: Props) => {

  return (
    <div className="mx-auto max-w-[768px] p-8  ">
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
    </div>
  )
}

export default Login