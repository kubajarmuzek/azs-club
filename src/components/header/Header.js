import React from "react";
import logo from "../../logo.png";
import './Header.css';
import { NavLink,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";


function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
          navigate("/");
          console.log("Signed out successfully")
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
      }
    return (
        <header>
            <nav>
                <ul>
                    <li><img src={logo} alt="Logo" /></li>
                    <li><NavLink to="/sections">Sekcja</NavLink></li>
                    <li><NavLink to="/tournaments">Turnieje</NavLink></li>
                    <li><NavLink to="/ranking">Ranking</NavLink></li>
                    <li><FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}/></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
