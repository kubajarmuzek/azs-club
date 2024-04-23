import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../registration/Registration.css';
import logo from '../../logo.png'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(email == "admin@admin" && password == "admin") {
                navigate("/adminPage");
            }
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);

            navigate("/landing");
            
            console.log("User logged in successfully");
        } catch (error) {
            console.error("Error logging in:", error.message);
            setError("Podany login lub hasło są nieprawidłowe");
        }
    };

    return (
        <>
            <div className="Registration" onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" className="logo" />
                <h2>Logowanie</h2>
                {error && <div className="error">{error}</div>}
                <div className="form-group">
                    <label>Adres Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </>
    );
}

export default Login;
