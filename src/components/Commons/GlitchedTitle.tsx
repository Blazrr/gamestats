import React, { useRef,useEffect } from "react";

type Props = {
    textValue: string 

};

const GlitchedTitle = ({textValue}: Props) => {
  
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const toRandom = (event:any) => {
    let iteration = 0;
  
    
    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter:any, index:any) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }
  

  return (
    <div className="flex justify-center mb-4">
      <span
        className="bg-purple-300 p-4 text-7xl font-bold rounded-lg"
        onMouseEnter={(event:any) => toRandom(event)}
        data-value={textValue}
      >
        {textValue}
      </span>
    </div>
  );
};

export default GlitchedTitle;
