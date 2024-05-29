import React, {useContext, useEffect, useState} from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import {Context} from "./context/Context";
import PluginPage from "./pages/PluginPage";
import AnalysisPage from "./pages/AnalysisPage";


const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
