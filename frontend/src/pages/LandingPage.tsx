import React from "react";
import Logo from "../components/shared/Logo";
import NewProjectBtn from "../components/home/NewProjectBtn";
import InfoVolatility3 from "../components/home/InfoVolatility3";
import InfoBox from "../components/home/InfoBox";

const LandingPage = () => {
  return (
    <main className="flex justify-center">
      <div className="">
        <div className="m-5">
          <Logo />
        </div>
        <div className="flex justify-center gap-20">
          <div className="w-1/3">
            <InfoBox/>
          </div>
          <div className="w-1/3">
            <InfoVolatility3/>
          </div>
        </div>
        <div className="mt-10 mb-10">
          <NewProjectBtn/>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
