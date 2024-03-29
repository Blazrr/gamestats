import Head from "next/head";
import { Inter } from "@next/font/google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Authentication from "@/components/Index/Authentication";
import Main from "@/components/Index/Main";
import { AnimatePresence, motion } from "framer-motion";
import GlitchedTitle from "@/components/Commons/GlitchedTitle";
import Blob from "@/components/Commons/Blob";
import Footer from "@/components/Index/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Blob/>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-4/5 mx-auto "
        >
          
          <GlitchedTitle textValue="GeeKard"/>
          <Main />
          <h4 className="text-white text-center text-5xl font-semibold">App still in Devlopment</h4>
          <p className="pt-44"></p>
          <Footer/>


        </motion.div>
      </AnimatePresence>
    </div>
  );
}
