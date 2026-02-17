import { useState } from "react";
import { Header } from "../components/header";

import "../css/crm-paineis.css";
import "../css/global.css";

export default function CrmPaineis() {
  const [paineis] = useState<string[]>(["Painel Principal"]);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Header />

      <main className="crm-page">
        <header
          className="page-header"
          style={{ padding: "20px 40px" }}
        >
          <h1>Painéis</h1>
          <p>
            Controle suas vendas, crie funis, tarefas e atividades utilizando os
            novos painéis
          </p>
        </header>

        <section className="crm-paineis">
          <div className="painel-grid">
            {paineis.map((painel, index) => (
              <div className="painel-card" key={index}>
                <div className="card-header">
                  <span className="painel-title">{painel}</span>
                  <p className="painel-desc">
                    Painel para gerenciar o processo de vendas e atividades.
                  </p>
                </div>

                <div className="card-meta">
                  <span className="meta-info">👥 Para toda a empresa</span>
                </div>

                <div className="card-footer">
                  <button type="button" className="btn-action">
                     Editar
                  </button>
                  <button type="button" className="btn-abrir">
                    <span>Abrir</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}

            <div
              className="painel-card novo-painel"
              onClick={() => setModalAberto(true)}
            >
              <div className="icon-plus">+</div>
              <span>Novo painel</span>
            </div>
          </div>
        </section>

        {modalAberto && (
         <div className={`modal-overlay ${modalAberto ? "is-open" : ""}`}>
            <div className="modal modal-xl modal-novo-painel">
              <header className="modal-header">
                <h2>Criação de painel</h2>
                <button
                  type="button"
                  className="btn-close-x"
                  onClick={() => setModalAberto(false)}
                >
                  ×
                </button>
              </header>

              <form>
                <div className="modal-section top-fields">
                  <div className="form-row">
                    <div className="form-group flex-grow">
                      <label>Título *</label>
                      <input
                        type="text"
                        placeholder="Novo painel"
                        required
                      />
                      <span className="char-count">0/100</span>
                    </div>

                    <div className="form-group width-key">
                      <label>Chave *</label>
                      <input placeholder="NP" required />
                      <span className="char-count">0/4</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea placeholder="Esse é um exemplo de descrição" />
                    <span className="char-count">0/500</span>
                  </div>
                </div>

                <footer className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary-light"
                    onClick={() => setModalAberto(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary-connect">
                    Salvar
                  </button>
                </footer>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
