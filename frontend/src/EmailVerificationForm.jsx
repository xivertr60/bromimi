import React, { useState } from "react";

export default function EmailVerificationForm({ email, goLogin }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (data.ok) goLogin();
    else setMsg(data.message || "Error");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Verifica tu correo</h2>
      <p>Hemos enviado un código a <b>{email}</b></p>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Código recibido" maxLength={6} />
      <button>Verificar</button>
      <p>{msg}</p>
    </form>
  );
}
