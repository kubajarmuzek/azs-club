import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Landing from './components/landing/Landing';
import AdminPage from './components/admin/AdminPage';
import Sections from './components/sections/Sections';
import Tournaments from './components/tournaments/Tournaments';
import Ranking from './components/ranking/Ranking';

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
        <Route path="/adminPage" element={<AdminPage/>}/>
        <Route path="/sections" element={<Sections/>}/>
        <Route path="/tournaments" element={<Tournaments/>}/>
        <Route path="/ranking" element={<Ranking/>}/>
      </Routes>
      </section>
      </div>  
    </Router>
  );
}

export default App;
