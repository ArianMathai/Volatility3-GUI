import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import SelectPluginsPage from "./pages/SelectPluginsPage";
import React from "react";
import { AppProvider } from "./context/Context";
import AnalysisLayoutPage from "./pages/AnalysisLayoutPage";
import {AnalysisReportComponent} from "./components/analysis/AnalysisReportComponent"; // Ensure you import this correctly
import UploadPage from "./pages/UploadPage";
import PluginLibraryPage from "./pages/PluginLibraryPage";

function App() {

    return (
        <div className="App">
            <AppProvider>
                <HashRouter>
                    <Routes>
                        <Route path='/' element={<UploadPage />} />
                        <Route path='/pluginlibrary' element={<PluginLibraryPage />} />
                        <Route path='/selectplugins' element={<SelectPluginsPage />} />
                        <Route path='/analysis' element={<AnalysisLayoutPage />}>
                            <Route path=':plugin' element={<AnalysisReportComponent />} />
                            <Route path=':plugin/:process' element={<AnalysisReportComponent />} />
                            <Route path=':plugin/:process/:plugin' element={<AnalysisReportComponent />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </AppProvider>
        </div>
    );
}

export default App;
