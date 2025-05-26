import React, { useState } from "react";

export default function LoginForm({ goRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });
    const data = await res.json();
    if (data.ok) setMsg("¡Bienvenido!");
    else setMsg(data.message || "Error");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Iniciar sesión</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" required />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Contraseña" required />
      <button>Entrar</button>
      <p>{msg}</p>
      <a onClick={goRegister} style={{cursor:'pointer'}}>¿No tienes cuenta? Regístrate</a>
    </form>
  );
}
