import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Props = {};

const Authentication = (props: Props) => {
  const supabase = useSupabaseClient();
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
  );
};

export default Authentication;
