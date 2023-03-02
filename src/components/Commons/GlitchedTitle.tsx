import React, { useRef,useEffect } from "react";
import { text } from "stream/consumers";

type Props = {
    textValue?: string 

};

const GlitchedTitle = ({textValue}: Props) => {
  const textRef = useRef< HTMLParagraphElement >(null)
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const toRandom = () => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      if (textRef.current?.innerText ){
 
      textRef.current.innerText = textRef.current?.innerText
        .split("")
        .map((letter:string, index:number) => {
          if(index < iteration) {
            if (textRef?.current?.dataset.value != undefined){
            return textRef.current.dataset.value[index];
            }
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
        if (textRef?.current?.dataset.value != undefined){

      if(iteration >= textRef.current.dataset.value.length){ 
        clearInterval(interval);
      }
    }
      
      iteration += 1 / 3;
    }
    }, 30);
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      toRandom()
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex justify-center cursor-default	 ">
      <p
        className="bg-purple-300 p-4 md:text-7xl text-5xl font-bold rounded-lg"
        data-value={textValue}
        ref={textRef}
      >
        {textValue}
      </p>
    </div>
  );
};

export default GlitchedTitle;
