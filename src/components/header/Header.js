import React from "react";
import logo from "../../logo.png";
import './Header.css';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><img src={logo} alt="Logo" /></li>
                    <li><a href="/">Sekcja</a></li>
                    <li><a href="/">Turnieje</a></li>
                    <li><a href="/">Ranking</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
