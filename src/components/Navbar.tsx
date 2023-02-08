import React, { useEffect, useState } from "react";
import { Squash as Squash } from "hamburger-react";
import { AnimatePresence } from "framer-motion";
import MobilNavbar from "./MobilNavbar";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { initUser } from "slices/userSlice";
import { supabase } from "lib/supabaseClient";
import { RootState } from "store";

type Props = {};

const Navbar = ({}: Props) => {
  const user = useSelector((state: RootState) => state.user.value)

  const router = useRouter().route;
  const dispatch = useDispatch();
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user.id);
      if (data) {
        dispatch(initUser(data[0]));
      } 
    };

    fetchData();
  }, [session]);

  console.log(user)
  

  const [isOpen, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos && !isOpen) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <>
      <div
        className={`text-black flex justify-between items-center px-8 py-4 fixed top-0 w-full z-20  ${
          visible ? "block" : "hidden"
        }  `}
      >
        <h2 className="text-white">LOGO</h2>
        <div className="md:hidden">
          <Squash toggled={isOpen} toggle={setOpen} color="white" />
        </div>
        <div className="hidden md:block">fd</div>
        <Link
          href={session ? "/Profile" : "/Login"}
          className={`btn ${router == "/Profile" && "btn-active"}  `}
        >
          {session ? "Profile" : "Login"}
        </Link>
      </div>
      <div className="mt-20"></div>
      <AnimatePresence>
        {isOpen && <MobilNavbar setIsShown={setOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
