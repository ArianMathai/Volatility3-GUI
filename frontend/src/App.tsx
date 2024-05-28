import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";

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
