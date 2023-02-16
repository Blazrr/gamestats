import React, { useRef,useEffect } from "react";

type Props = {
    textValue: string

};

const GlitchedTitle = ({textValue}: Props) => {
  const text = useRef<any>(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const toRandom = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      text.current.innerText = text.current.innerText
        .split("")
        .map((letter:any,index:any) =>{
            if (index < iterations) {
               return text.current.dataset.value[index]
            }
            return letters[Math.floor(Math.random() * letters.length)]
        } )
        .join("");
        if (iterations >= text.current.dataset.value.length) clearInterval(interval)

        iterations+=1/4
    }, 30);

  };
  useEffect(() => {
    toRandom();
  })

  return (
    <div className="flex justify-center mb-4">
      <span
        className="bg-purple-300 p-4 text-5xl font-bold rounded-lg"
        onMouseEnter={toRandom}
        ref={text}
        data-value={textValue}
      >
        {textValue}
      </span>
    </div>
  );
};

export default GlitchedTitle;
