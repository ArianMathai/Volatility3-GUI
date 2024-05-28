import React from "react";
import Logo from "../components/shared/Logo";
import NewProjectBtn from "../components/home/NewProjectBtn";

const LandingPage = () => {
  return (
    <main className="flex justify-center">
      <article>
        <div className="p-5">
          <Logo />
        </div>
        <div className="flex space-x-28"></div>
        <div className="pt-5 pb-5">
          <NewProjectBtn />
        </div>
      </article>
    </main>
  );
};

export default LandingPage;
