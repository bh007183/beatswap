
import './App.css';
import Home from './pages/Home';
import Deezer from'./pages/Deezer'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar"

function App() {
  return (
    <div>
      
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/deezer" element={<Deezer />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
