import React from "react";
import UploadFile from "../components/upload/UploadFile";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";


const UploadPage = () => {

  return (
      <>
          <div className="ms-5 mt-5">
            <Logo/>
          </div>
        <div className="m-auto mt-10">
            <UploadFile />
        </div>
      </>
  );
};

export default UploadPage;
