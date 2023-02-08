import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaTwitter, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { itemVariants, navbarVariants } from "MotionVariants";
import { useSession } from "@supabase/auth-helpers-react";

type Props = {
  setIsShown: (arg0: boolean) => void;
};

const MobilNavbar = ({ setIsShown }: Props) => {
  const session = useSession();

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed flex w-full h-screen top-0 bg-black bg-opacity-60 z-10 md:hidden"
    >
      <motion.ul className="flex flex-col mx-auto items-center justify-center w-full space-y-6 h-screen ">
        <motion.div
          className="group flex group/item items-center space-x-4"
          variants={itemVariants}
        >
          <Link href="/" className="hoverLi" onClick={() => setIsShown(false)}>
            Home
          </Link>
        </motion.div>
       
        <motion.div
          className="group flex group/item items-center space-x-4"
          variants={itemVariants}
        >
          <Link
            href="/About"
            className="hoverLi"
            onClick={() => setIsShown(false)}
          >
            About the Devs
          </Link>
        </motion.div>
        
        <motion.div
          className="group flex group/item items-center space-x-4"
          variants={itemVariants}
        >
          <Link
            href="/Contact"
            className="hoverLi"
            onClick={() => setIsShown(false)}
          >
            Contact
          </Link>
        </motion.div>
      </motion.ul>
      <motion.footer
        className="justify-center flex  bottom-0 w-full fixed space-x-4 mb-10"
        variants={itemVariants}
      >
        <FaTwitter className="socials " />
        <FaLinkedin className="socials " />
        <FaTelegram className="socials " />
        <FaYoutube className="socials " />
      </motion.footer>
    </motion.div>
  );
};

export default MobilNavbar;
