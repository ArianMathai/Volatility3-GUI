import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {Upload} from "./components/Upload";
import SelectPluginsPage from "./pages/SelectPluginsPage";
import React, {useState} from "react";
import {AppProvider} from "./context/Context";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
    const [osName, setOsName] = useState("");
    const [systemInfo, setSystemInfo] = useState([]);

    return (
        <div className="App">
            <AppProvider>
              <HashRouter>
                <Routes>
                    <Route path='/' element={<Upload/>}></Route>
                    <Route path='/Selectplugins' element={<SelectPluginsPage/>}></Route>
                    <Route path='/analysis' element={<AnalysisPage/>}></Route>
                </Routes>
              </HashRouter>
            </AppProvider>
        </div>
    );
}

export default App;
