import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Profile';
import Ballina from './components/Ballina';
import ShtoProdukt from './components/ShtoProdukt';
import About from './components/About';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shto" element={<ShtoProdukt />} />
        <Route path="/" element={<Ballina />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
