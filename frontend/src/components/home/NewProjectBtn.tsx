import React from "react";
import { useNavigate } from "react-router-dom";

const NewProjectBtn = () => {
  const navigate = useNavigate();

  const goNext = () => {
    navigate("/upload");
  };

  return (
    <button
      onClick={goNext}
      className="bg-themeYellow-default hover:bg-themeYellow-light rounded cursor-pointer mt-20 p-3 pt-10 pb-10 m-auto block"
    >
      Create new project
    </button>
  );
};

export default NewProjectBtn;
