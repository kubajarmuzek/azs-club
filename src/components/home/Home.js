import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="logo-container">
        <img src={logo} alt="Club Logo" className="logo" />
      </div>
      <div className="content">
        <h1>Witaj na stronie klubu uczelnianego!</h1>
        <p>Tutaj możesz zapisać się na sekcje klubowe i wyrazić chęć uczestnictwa w zawodach sportowych.</p>
        <p>Na naszej stronie znajdziesz również ranking uczelniany pod względem zdobytych punktów w zawodach.</p>
        <div className="links">
          <Link to="/login" className="link">Logowanie</Link>
          <Link to="/registration" className="link">Rejestracja</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
