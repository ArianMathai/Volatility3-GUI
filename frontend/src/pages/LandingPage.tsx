import React from "react";
import Logo from "../components/shared/Logo";
import NewProjectBtn from "../components/home/NewProjectBtn";
import InfoVolatility3 from "../components/home/InfoVolatility3";
import InfoBox from "../components/home/InfoBox";

const LandingPage = () => {
  return (
    <main className="flex justify-center">
      <article>
        <div className="p-5">
          <Logo />
        </div>
        <div className="flex space-x-28">
          <InfoBox />
          <InfoVolatility3 />
        </div>
        <div className="p-10">
          <NewProjectBtn />
        </div>
      </article>
    </main>
  );
};

export default LandingPage;
