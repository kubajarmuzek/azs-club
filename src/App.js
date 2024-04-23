import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Landing from './components/landing/Landing';

const App = () => {
  return (
    <Router>
      <div>
        <section>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/landing" element={<Landing/>}/>
      </Routes>
      </section>
      </div>  
    </Router>
  );
}

export default App;
