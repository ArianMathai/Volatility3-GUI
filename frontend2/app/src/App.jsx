import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {Upload} from "./components/Upload";
import AnalysisPage from "./pages/AnalysisPage";
import React, {useState} from "react";

function App() {
    const [osName, setOsName] = useState("");
    const [systemInfo, setSystemInfo] = useState([]);

    return (
        <div className="App">

              <HashRouter>
                <Routes>
                    <Route path='/' element={<Upload/>}></Route>
                    <Route path='/analysis' element={<AnalysisPage/>}></Route>
                </Routes>
              </HashRouter>
        </div>
    );
}

export default App;
