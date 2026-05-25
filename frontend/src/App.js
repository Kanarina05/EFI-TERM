import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register   from './components/Register';
import Login      from './components/Login';
import Home       from './components/Profile';
import Ballina    from './components/Ballina';
import ShtoProdukt from './components/ShtoProdukt';
import Contact    from './components/Contact';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Ballina />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/shto"     element={<ShtoProdukt />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home"     element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
