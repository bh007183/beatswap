
import './App.css';
import Home from './pages/Home';
import Deezer from'./pages/Deezer'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux'
import NavBar from "./components/NavBar"
import configureStore from "./store/configureStore"
import Spotify from './pages/Spotify';

function App() {
  const store = configureStore()
  return (
    
      <Provider store={store}>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deezer" element={<Deezer />} />
        <Route path="/spotify" element={<Spotify />} />
      </Routes>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
