import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import SelectPluginsPage from "./pages/SelectPluginsPage";
import React, {useState} from "react";
import {AppProvider} from "./context/Context";
import AnalysisLayoutPage from "./pages/AnalysisLayoutPage";
import AnalysisPslistPage from "./pages/AnalysisPslistPage";
import UploadPage from "./pages/UploadPage";
import AnalysisPstreePage from "./pages/AnalysisPstreePage";
import AnalysisPsscanPage from "./pages/AnalysisPsscanPage";

function App() {
    const [osName, setOsName] = useState("");
    const [systemInfo, setSystemInfo] = useState([]);

    return (
        <div className="App">
            <AppProvider>
              <HashRouter>
                <Routes>
                    <Route path='/' element={<UploadPage/>}></Route>
                    <Route path='/Selectplugins' element={<SelectPluginsPage/>}></Route>
                    <Route path='/analysis' element={<AnalysisLayoutPage/>}>
                        <Route path='pslist' element={<AnalysisPslistPage/>}></Route>
                        <Route path='pstree' element={<AnalysisPstreePage/>}></Route>
                        <Route path='psscan' element={<AnalysisPsscanPage/>}></Route>
                    </Route>
                </Routes>
              </HashRouter>
            </AppProvider>
        </div>
    );
}

export default App;
