import React, { useRef,useEffect } from "react";
import { text } from "stream/consumers";

type Props = {
    textValue: string 

};

const GlitchedTitle = ({textValue}: Props) => {
  const textRef = useRef<any>()
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const toRandom = () => {
    let iteration = 0;
    console.log(textRef);
    
    const interval = setInterval(() => {
      textRef.current.innerText = textRef.current.innerText
        .split("")
        .map((letter:any, index:any) => {
          if(index < iteration) {
            return textRef.current.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= textRef.current.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      toRandom()
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex justify-center ">
      <span
        className="bg-purple-300 p-4 text-7xl font-bold rounded-lg"
        data-value={textValue}
        ref={textRef}
      >
        {textValue}
      </span>
    </div>
  );
};

export default GlitchedTitle;
