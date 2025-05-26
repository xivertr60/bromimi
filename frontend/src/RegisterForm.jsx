import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterForm({ onRegistered, goLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha) return setMsg("Debes resolver el captcha.");
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass, captchaToken: captcha })
    });
    const data = await res.json();
    if (data.ok) onRegistered(email);
    else setMsg(data.message || "Error");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registro</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" required />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Contraseña" required />
      <ReCAPTCHA sitekey="TU_SITE_KEY_RECAPTCHA" onChange={setCaptcha} />
      <button>Registrarse</button>
      <p>{msg}</p>
      <a onClick={goLogin} style={{cursor:'pointer'}}>¿Ya tienes cuenta? Iniciar sesión</a>
    </form>
  );
}
