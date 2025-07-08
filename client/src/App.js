import './App.css';
import Navbar from './components/pages/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import About from './components/pages/about';
import Subscription from './components/pages/subscription';



function App() {
    
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}
  export default App;