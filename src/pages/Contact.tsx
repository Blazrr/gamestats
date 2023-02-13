import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const Contact = (props: Props) => {
  const form = useRef<any>();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e:any) => {
    e.preventDefault();
    if (input.length != 0) {
      setLoading(true);
      emailjs
        .sendForm(
          `${process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY}`,
          `${process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY}`,
          form.current,
          `${process.env.NEXT_PUBLIC_EMAIL_KEY}`
        )
        .then(
          (result) => {
            toast("Thank you for your message", {
              icon: "✅",
              autoClose: 2000,
              hideProgressBar: true,
              pauseOnHover: false,
              theme: "dark",
              role: "alert",
            });
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            toast("There was a problem sending your message", {
              icon: "❌",
              autoClose: 2000,
              hideProgressBar: true,
              pauseOnHover: false,
              theme: "dark",
              role: "alert",
            });

          }
        );
    } else {
      toast("Your message cannot be empty", {
        icon: "❌",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "dark",
        role: "alert",
      });
    }
  };
  return (
    <AnimatePresence>
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=""
        >
          <h3 className="text-center text-5xl mt-32">
         Loading...
          </h3>
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-4/5 mx-auto flex justify-center "
        >
          <form className="mt-8 space-y-8 w-4/5 max-w-[800px]" ref={form}>
            <h2 className="text-center text-4xl font-semibold underline">contact form</h2>
            <div className="space-y-2">
              <label htmlFor="name">Name </label>
              <input type="text" className="input" name="user_name" id="name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="name">E-Mail </label>
              <input
                type="text"
                className="input"
                name="user_email"
                id="name"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                cols={50}
                className="input"
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>

            <button className="btn" onClick={sendEmail}>
              Send
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Contact;
