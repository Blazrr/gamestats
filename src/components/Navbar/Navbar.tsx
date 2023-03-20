import React, { useEffect, useState } from "react";
import { Squash as Squash } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const router = useRouter().route;
  const session = useSession();

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
  console.log(router)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <>
      {router != "/[userprofile]" && (
        <>
          <AnimatePresence>
            {visible && (
              <motion.div
                className={`text-black flex justify-between items-center p-12 fixed top-0 w-full z-20  left-1/2 transform  -translate-x-1/2 transition-all duration-300   ${
                  prevScrollPos > 10 &&
                  " md:mt-8 md:bg-[#1A202C] md:rounded-2xl md:w-3/5 md:p-6 "
                }  `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <Link
                    href={session ? "/Profile" : "/Login"}
                    className={`btn ${
                      (router == "/Profile" || router == "/Login") &&
                      "btn-active"
                    }  `}
                    onClick={() => setOpen(false)}
                  >
                    {session ? "Profile" : "Login"}
                  </Link>
                </div>

                <div className="hidden md:block space-x-10 text-xl">
                  <Link href={"/"} className={` ${router == "/" && "underline text-blue-500"}NavLinks`}>
                    Home
                  </Link>
                  <Link href={"/About"} className={` ${router == "/About" && "underline text-blue-500"}NavLinks`}>
                    About
                  </Link>
                  <Link href={"/Contact"} className={` ${router == "/Contact" && "underline text-blue-500"}NavLinks`}>
                    Contact
                  </Link>
                </div>

                <div className="hidden md:block">
                  <h2>LOGO</h2>
                </div>

                <div className="md:hidden">
                  <Squash toggled={isOpen} toggle={setOpen} color="white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-[150px]"></div>
          <AnimatePresence>
            {isOpen && <MobilNavbar setIsShown={setOpen} />}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navbar;
