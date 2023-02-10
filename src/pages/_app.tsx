import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { store } from "../../store";
import { Provider, useDispatch } from "react-redux";
import Navbar from "@/components/Navbar/Navbar";
import InitUser from "@/components/config/InitUser";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Navbar/>
        <InitUser/>
        <Component {...pageProps} />
      </SessionContextProvider>
    </Provider>
  );
}
export default MyApp;
