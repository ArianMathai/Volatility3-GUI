import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import {ContextProvider} from "./context/Context";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
          <ContextProvider>
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/upload" element={<UploadPage />} />
              </Routes>
          </ContextProvider>
      </HashRouter>
    </div>
  );
};

export default App;
