import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/atendimento");
  }

  return (
    <main className="login-container">
      <section className="login-left">
        <div className="login-box">

          <header className="logo-area">
            <img src="./assets/Logo.png" alt="LM DIGITAL" />
          </header>

          <h1>Bem-vindo!</h1>
          <p>Faça login para acessar sua conta.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" required />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" required />
            </div>

            <button type="submit" className="btn-login">Entrar</button>
          </form>

        </div>
      </section>

      <section className="login-right">
        <div className="banner-content">
          <h2>🚀 Transforme seu WhatsApp em uma Máquina de Vendas!</h2>
          <p>
           Um número, múltiplos atendentes: Toda a sua equipe conectada simultaneamente. 
           Organização total: Setores, filas de atendimento e etiquetas para cada cliente. 
           Automação inteligente: Chatbots que respondem 24h e qualificam leads. 
           Controle absoluto: Monitore conversas e tenha acesso a relatórios de desempenho em tempo real.
          </p>
        </div>
      </section>
    </main>
  );
}
