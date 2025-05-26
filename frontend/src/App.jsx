import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import EmailVerificationForm from "./EmailVerificationForm";

export default function App() {
  const [page, setPage] = useState("login");
  const [registerEmail, setRegisterEmail] = useState("");

  return (
    <div className="container">
      {page === "login" && (
        <LoginForm goRegister={() => setPage("register")} />
      )}
      {page === "register" && (
        <RegisterForm
          onRegistered={email => {
            setRegisterEmail(email);
            setPage("verify");
          }}
          goLogin={() => setPage("login")}
        />
      )}
      {page === "verify" && (
        <EmailVerificationForm
          email={registerEmail}
          goLogin={() => setPage("login")}
        />
      )}
    </div>
  );
}
