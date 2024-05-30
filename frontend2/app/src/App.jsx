import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {Upload} from "./components/Upload";
import AnalysisPage from "./pages/AnalysisPage";
import React, {useState} from "react";
import {Context} from "./context/Context"



function App() {
    const [osName, setOsName] = useState("");
    const [systemInfo, setSystemInfo] = useState([]);

    return (
        <div className="App">
            <Context.Provider value={{
                osName,
                systemInfo,
                setOsName,
                setSystemInfo
            }}>
              <HashRouter>
                <Routes>
                    <Route path='/' element={<Upload/>}></Route>
                    <Route path='/analysis' element={<AnalysisPage/>}></Route>
                </Routes>
              </HashRouter>
            </Context.Provider>
        </div>
    );
}

export default App;
