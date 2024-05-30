import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {Upload} from "./components/Upload";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
            <Route path='/' element={<Upload/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
