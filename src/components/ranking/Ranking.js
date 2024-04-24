import Header from "../header/Header";
import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import "./Ranking.css";

function Ranking() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
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

    fetchRankings();
  }, []);

  return (
    <div>
      <Header />
      <div className="ranking-container">
        {rankings.map((player, index) => (
          <div className="player-item" key={index}>
            <div className="player-info">
              <span className="player-name">{player.imie} {player.nazwisko}</span>
              <span className="points">Punkty: {player.punkty}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Ranking;
