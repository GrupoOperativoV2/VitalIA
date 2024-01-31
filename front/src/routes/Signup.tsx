import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Signup() {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun', 
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(password,name,birthDay,birthMonth,birthYear,gender,contact);

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, name, birthDay, birthMonth, birthYear, gender, contact }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="form">
        <h1>Crear cuenta</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div style={{ display: "flex" }}>
          <select
            name="birthDay"
            onChange={(e) => setBirthDay(e.target.value)}
            value={birthDay}
            style={{ marginRight: "8px" }}
          >
            <option value="">Día</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            name="birthMonth"
            onChange={(e) => setBirthMonth(e.target.value)}
            value={birthMonth}
            style={{ marginRight: "8px" }}
          >
            <option value="">Mes</option>
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="birthYear"
            onChange={(e) => setBirthYear(e.target.value)}
            value={birthYear}
          >
            <option value="">Año</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <select
          name="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">Seleccione...</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="no-binario">No binario</option>
          <option value="otro">Otro</option>
          <option value="prefiero-no-decir">Prefiero no decirlo</option>
        </select>

        <input
          type="text"
          name="contact"
          placeholder="Contacto"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <input
          type="password"
          name="confirm"
          placeholder="Confirme su contraseña"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        />

        <label>Acepto terminos y condiciones</label>

        <button>Crear cuenta</button>
      </form>
    </DefaultLayout>
  );
}
