import { calcLength } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {};

const Blob = (props: Props) => {
  const blob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouseMove: React.PointerEventHandler<Window> = (e) => {
      if (blob.current?.animate != null) {
        blob.current.animate(
          {
            left: `${e?.pageX}px`,
            top: `${e?.pageY}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
      }
    };
    //@ts-ignore
    window.addEventListener("pointermove", mouseMove);
    return () => {
      //@ts-ignore
      window.removeEventListener("pointermove", mouseMove);
    };
  }, []);
  return (
    <>
      <div id="blob" ref={blob}></div>
      <div id="blur"></div>
    </>
  );
};

export default Blob;
