import React, { useState,useEffect } from "react";
import { db } from "../../firebase";
import { set, ref, push, onValue } from "firebase/database";
import "./AdminPage.css";

function AdminPage() {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [punkty, setPunkty] = useState("");
    const [dyscyplina, setDyscyplina] = useState("");
    const [termin, setTermin] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [miejsce, setMiejsce] = useState("");

    const [tournaments, setTournaments] = useState([]);
    const [sections, setSections] = useState([]);
    const [rankings, setRankings] = useState([]);

    const [sekcja, setSekcja] = useState("");

    useEffect(() => {
        const fetchTournaments = () => {
            const tournamentsRef = ref(db, "tournaments");
            onValue(tournamentsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const tournamentArray = Object.values(data);
                    setTournaments(tournamentArray);
                } else {
                    setTournaments([]);
                }
            });
        };

        const fetchSections = () => {
            const sectionsRef = ref(db, "sections");
            onValue(sectionsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const sectionArray = Object.values(data);
                    setSections(sectionArray);
                } else {
                    setSections([]);
                }
            });
        };

        const fetchRankings = () => {
            const rankingsRef = ref(db, "ranking");
            onValue(rankingsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const rankingArray = Object.values(data);
                    setRankings(rankingArray);
                } else {
                    setRankings([]);
                }
            });
        };

        fetchTournaments();
        fetchSections();
        fetchRankings();
    }, []);

    const handleSubmitTournament = async () => {
        try {
            const tournamentsRef = ref(db, "tournaments");
            const newTournamentRef = push(tournamentsRef);
            const tournamentId = newTournamentRef.key;

            await set(ref(db, `tournaments/${tournamentId}`), {
                dyscyplina: dyscyplina,
                termin: termin,
                additionalInfo: additionalInfo,
                miejsce: miejsce,
            });

            setDyscyplina("");
            setTermin("");
            setAdditionalInfo("");
            setMiejsce("");
        } catch (error) {
            console.error("Error submitting tournament:", error.message);
        }
    };

    const handleSubmitSection = async () => {
        try {
            const sectionRef = ref(db, "sections");
            const newSectionRef = push(sectionRef);
            const sectionId = newSectionRef.key;

            await set(ref(db, `sections/${sectionId}`), {
                sekcja: sekcja,
                chętnych: 0,
            });

            setSekcja("");
        } catch (error) {
            console.error("Error submitting tournament:", error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rankingRef = ref(db, "ranking");
            const newRankingRef = push(rankingRef);
            const playerId = newRankingRef.key;

            await set(ref(db, `ranking/${playerId}`), {
                imie: imie,
                nazwisko: nazwisko,
                punkty: punkty,
            });

            setImie("");
            setNazwisko("");
            setPunkty("");
        } catch (error) {
            console.error("Error adding ranking:", error.message);
        }
    };

    return (
        <div className="AdminPage">
            <div className="tournaments">
                <div>
                    <h2>Dodaj nowy turniej</h2>
                    <div>
                        <label>Dyscyplina</label>
                        <input
                            value={dyscyplina}
                            onChange={(e) => setDyscyplina(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Termin</label>
                        <input
                            type="date"
                            value={termin}
                            onChange={(e) => setTermin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Miejsce</label>
                        <input
                            type="text"
                            value={miejsce}
                            onChange={(e) => setMiejsce(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Dodatkowe informacje</label>
                        <input
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmitTournament}>
                        Dodaj
                    </button>
                </div>
                <ul>
                    {tournaments.map((tournament, index) => (
                        <li key={index}>{tournament.dyscyplina}</li>
                    ))}
                </ul>
            </div>

            <div className="sections">
                <h2>Dodaj sekcję</h2>
                <label>Dyscyplina</label>
                <input
                    value={sekcja}
                    onChange={(e) => setSekcja(e.target.value)}
                />
                <button type="submit" onClick={handleSubmitSection}>Dodaj</button>
                <ul>
                    {sections.map((section, index) => (
                        <li key={index}>{section.sekcja}, {section.chętnych} osób chętnych</li>
                    ))}
                </ul>
            </div>

            <div className="ranking">
                <h2>Dodaj do rankingu</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Imię:</label>
                        <input
                            type="text"
                            value={imie}
                            onChange={(e) => setImie(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Nazwisko:</label>
                        <input
                            type="text"
                            value={nazwisko}
                            onChange={(e) => setNazwisko(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Punkty:</label>
                        <input
                            type="number"
                            value={punkty}
                            onChange={(e) => setPunkty(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Dodaj</button>
                    <ul>
                    {rankings.map((player, index) => (
                        <li key={index}>
                            {player.imie} {player.nazwisko} - Punkty: {player.punkty}
                        </li>
                    ))}
                </ul>
                </form>
            </div>
        </div>
    );
}

export default AdminPage;
