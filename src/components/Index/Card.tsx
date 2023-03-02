import { calcLength } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

type Props = {};

const Card = (props: Props) => {
  const card = useRef< HTMLDivElement | any>(null);
  const moveCard: React.MouseEventHandler<HTMLDivElement> = (e) => {
  

    let cardRect = card.current?.getBoundingClientRect();
  
    if(cardRect?.x && card.current){

    let x = e.clientX - cardRect.x;
    let y = e.clientY - cardRect.y;

    let midCardWidth = cardRect.width / 2;
    let midCardHeight = cardRect.height / 2;

    let angleY = -(x - midCardWidth) / 8;
    let angleX = -(y - midCardHeight) / 8;

    let glowX = x / cardRect.width * 100
    let glowY = y / cardRect.height * 100

        card.current.children[0].style.transform  = `rotateY(${angleY}deg) rotateX(${angleX}deg) scale(1.1)`;


    card.current.children[1].style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) scale(1.1)`;
    card.current.children[1].style.background = `radial-gradient(circle at ${glowX} ${glowY}, rgb(184,196,211), transparent)`
    }
    

  }
  
  

  const resetCard = () => {
    card.current.style.transform = `rotateY(0) rotateX(0) scale(1)`;
    card.current.children[1].style.transform = `rotateY(0) rotateX(0) scale(1)`;
    card.current.children[0].style.transform = `rotateY(0) rotateX(0) scale(1)`;

    console.log("reset");

  }

  return (
    <div
      className="md:h-[500px] md:w-[350px] h-[400px] w-[300px]  rounded-xl card"
      ref={card}
      onMouseMove={(e:React.MouseEvent<HTMLDivElement>) => moveCard(e)}
      onMouseLeave={resetCard}
    >
      <div className="w-full h-full overflow-hidden content-card">
        <div className="relative h-full w-full">
          <Image
            objectFit="cover"
            layout="fill"
            src="/card.png"
            alt="de"
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="glow absolute top-0 left-0 w-full h-full rounded-xl opacity-50 "></div>
    </div>
  );
};

export default Card;
