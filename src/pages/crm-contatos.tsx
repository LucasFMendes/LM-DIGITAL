import { useState } from "react";
// import { Header } from "../components/header"; // Descomente se for usar
import "../css/crm-contatos.css";

export default function CrmContatos() {
  const [busca, setBusca] = useState("");

  return (
    <main className="crm-page">
      {/* Header da Página */}
      <header className="page-header-contacts">
        <div className="contacts-header-row">
          <h1 className="contacts-title">Contatos</h1>

          {/* Barra de Pesquisa */}
          <div className="search-box">
            <input
              type="search"
              placeholder="Pesquisar por nome, email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>

        {/* Filtros e Ações (Separados para melhor controle no Flexbox) */}
        <div className="header-controls">
          <div className="filters-group">
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
              <span className="label-text">Arquivados</span>
            </label>

            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
              <span className="label-text">Bloqueados</span>
            </label>
          </div>

          <div className="actions">
            <button className="btn secondary" type="button">Exportar</button>
            <button className="btn secondary" type="button">Importar</button>
            <button
              className="btn primary"
              type="button"
              onClick={() => alert("Adicionar novo contato...")}
            >
              + Novo Contato
            </button>
          </div>
        </div>
      </header>

      {/* Tabela com Scroll Responsivo */}
      <section className="crm-content">
        <div className="table-responsive">
          <table className="contatos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Instagram</th>
                <th>E-mail</th>
                <th>Etiquetas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar-placeholder">L</div>
                    <span>Lucas</span>
                  </div>
                </td>
                <td>(31) 98461-6848</td>
                <td>-</td>
                <td>-</td>
                <td><span className="tag">Cliente</span></td>
              </tr>
              {/* Exemplo de mais uma linha para visualização */}
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar-placeholder alt">M</div>
                    <span>Mariana</span>
                  </div>
                </td>
                <td>(11) 99999-9999</td>
                <td>@mariana</td>
                <td>mari@email.com</td>
                <td><span className="tag alt">Pendente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}