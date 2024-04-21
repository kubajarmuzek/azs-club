import React, { useState } from "react";
import "./Registration.css";
import logo from "../../logo.png";
import { auth, db, firebaseApp } from "../../firebase";
import { set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studyMode, setStudyMode] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Niepoprawny adres email";
    }

    if (!name.trim()) {
      errors.name = "Imię jest wymagane";
    }

    if (!surname.trim()) {
      errors.surname = "Nazwisko jest wymagane";
    }

    if (!course.trim()) {
      errors.course = "Kierunek studiów jest wymagany";
    }

    if (!semester.trim()) {
      errors.semester = "Semestr jest wymagany";
    }

    if (!studyMode) {
      errors.studyMode = "Forma studiów jest wymagana";
    }

    if (!password.trim()) {
      errors.password = "Hasło jest wymagane";
    } else if (password.length < 6) {
      errors.password = "Hasło musi mieć conajmniej 6 znaków";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password
      )
    ) {
      errors.password =
        "Hasło musi zawierać: małą literę, dużą literę, znak specjalny i cyfrę";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Hasła są różne";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        console.log("User registered successfully:", user);

        // Save user registration data to the database
        await set(ref(db, "users/" + user.uid), {
          email: email,
          name: name,
          surname: surname,
          course: course,
          semester: semester,
          studyMode: studyMode,
        });

        console.log("User data saved to database");

        // Clear form fields and errors
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setSurname("");
        setCourse("");
        setSemester("");
        setStudyMode("");
        setErrors({});
      } catch (error) {
        console.error("Error registering user:", error.message);
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <div className="Registration">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Zarejestruj się</h2>
      <div>
        <label>Adres Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Imię</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Nazwisko</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        {errors.surname && <div className="error">{errors.surname}</div>}
      </div>
      <div>
        <label>Semestr</label>
        <input
          type="text"
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        {errors.semester && <div className="error">{errors.semester}</div>}
      </div>
      <div>
        <label>Kierunek Studiów</label>
        <input
          type="text"
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        {errors.course && <div className="error">{errors.course}</div>}
      </div>
      <div>
        <label>Forma studiów</label>

        <select
          value={studyMode}
          onChange={(e) => setStudyMode(e.target.value)}
        >
          <option value=""></option>
          <option value="stacjonarne">Stacjonarne</option>
          <option value="niestacjonarne">Niestacjonarne</option>
          <option value="online">Online</option>
        </select>
        {errors.studyMode && <div className="error">{errors.studyMode}</div>}
      </div>
      <div>
        <label>Hasło</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Powtórz Hasło</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Zarejestruj
      </button>
    </div>
  );
}

export default Registration;
