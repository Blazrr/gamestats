import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="mt-12">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        All your stats{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          in 1 Link !
        </span>
      </h1>
      <p className="text-center text-xl">Featuring many of your favourite games</p>
    </div>
  );
};

export default Header;
