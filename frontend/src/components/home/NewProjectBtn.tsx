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
      className="bg-themeYellow-default hover:bg-themeYellow-light rounded cursor-pointer p-3 pt-5 pb-5 m-auto block"
    >
      Create new project
    </button>
  );
};

export default NewProjectBtn;
