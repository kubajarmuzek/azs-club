import Header from "../header/Header";
import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import "./Sections.css";

function Sections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
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

    fetchSections();
  }, []);

  return (
    <div>
      <Header />
      <div className="sections-container">
        {sections.map((section, index) => (
          <div className="section-box" key={index}>
            <div className="section-name">{section.sekcja}</div>
            <div className="section-count">{section.chętnych} osób chętnych</div>
            <button className="section-sign">Jestem chętny!</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Sections;
