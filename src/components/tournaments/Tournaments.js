import Header from "../header/Header";
import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "./Tournaments.css";

function Tournaments() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchTournaments = () => {
            const tournamentRef = ref(db, "tournaments");
            onValue(tournamentRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const tournamentArray = Object.values(data);
                    setTournaments(tournamentArray);
                } else {
                    setTournaments([]);
                }
            });
        };

        fetchTournaments();
    }, []);

    return (
        <div>
            <Header />
            <div className="tournaments-container">
                {tournaments.map((tournament, index) => (
                    <div className="tournament-box" key={index}>
                        <div className="tournament-name">{tournament.dyscyplina}</div>
                        <div className="tournament-info">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {tournament.miejsce}
                        </div>
                        <div className="tournament-info">
                            <FontAwesomeIcon icon={faCalendarAlt} /> {tournament.termin}
                        </div>
                        <div className="tournament-info">{tournament.additionalInfo}</div>
                        <button className="tournament-sign">Jestem chętny!</button>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Tournaments;
