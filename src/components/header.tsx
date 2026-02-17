import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import "../css/global.css";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleDropdown(name: string) {
    setOpenDropdown(prev => (prev === name ? null : name));
  }

  function toggleSidebar() {
    setIsCollapsed(prev => !prev);
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-container">

        <nav>
          <ul className="nav-list">

            {/* HAMBURGER */}
            <li className="nav-item">
              <button className="nav-link hamburger-btn" onClick={toggleSidebar}>
                <span className="hamburger-icon">☰</span>
                <span>Menu</span>
              </button>
            </li>

            {/* Atendimento */}
            <li className="nav-item">
              <Link to="/atendimento" className="nav-link active">
                <img src="/assets/chat-round-dots-svgrepo-com.svg" className="nav-icon" />
                <span>Atendimento</span>
              </Link>
            </li>

            {/* CRM */}
            <li className="nav-item nav-dropdown">
              <button className="nav-link" onClick={() => toggleDropdown("crm")}>
                <img src="/assets/crm-crm-svgrepo-com.svg" className="nav-icon" />
                <span>CRM</span>
              </button>

              {openDropdown === "crm" && (
                <div className="dropdown">
                  <ul>
                    <li><Link to="/crm/contatos">Contatos</Link></li>
                    <li><Link to="/crm/paineis">Painéis</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* APPS */}
            <li className="nav-item nav-dropdown">
              <button className="nav-link" onClick={() => toggleDropdown("apps")}>
                <img src="/assets/apps-svgrepo-com.svg" className="nav-icon" />
                <span>Apps</span>
              </button>

              {openDropdown === "apps" && (
                <div className="dropdown">
                  <ul>
                    <li><Link to="/campanhas">Campanhas</Link></li>
                    <li><Link to="/pagamentos">Pagamentos</Link></li>
                    <li><Link to="/chatbot">Chatbot</Link></li>
                    <li><Link to="/sequencias">Sequências</Link></li>
                    <li><Link to="/agendadas">Mensagens Agendadas</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* Relatórios */}
            <li className="nav-item">
              <Link to="/relatorios" className="nav-link">
                <img src="/assets/keywords-seo-marketing-optimization-svgrepo-com.svg" className="nav-icon" />
                <span>Relatórios</span>
              </Link>
            </li>

            {/* Ajustes */}
            <li className="nav-item nav-dropdown">
              <button className="nav-link" onClick={() => toggleDropdown("settings")}>
                <img src="/assets/settings-svgrepo-com.svg" className="nav-icon" />
                <span>Ajustes</span>
              </button>

              {openDropdown === "settings" && (
                <div className="dropdown">
                  <ul>
                    <li><Link to="#">Usuários</Link></li>
                    <li><Link to="#">Equipes</Link></li>
                    <li><Link to="#">Modelo de mensagens</Link></li>
                    <li><Link to="#">Integrações</Link></li>
                    <li><Link to="#">Notificações</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* PERFIL */}
            <li className="nav-item nav-dropdown">
              <button className="nav-link" onClick={() => toggleDropdown("perfil")}>
                <img src="/assets/user-svgrepo-com.svg" className="nav-icon" />
                <span>Perfil</span>
              </button>

              {openDropdown === "perfil" && (
                <div className="dropdown">
                  <ul>
                    <li><Link to="#">Preciso de ajuda</Link></li>
                    <li><Link to="#">Preferências</Link></li>
                    <li><Link to="#">Notificações</Link></li>

                    <li className="dropdown-subtitle">Sons de notificação</li>
                    <li><Link to="#">Novo atendimento</Link></li>
                    <li><Link to="#">Nova mensagem</Link></li>
                    <li><Link to="#">Chat interno</Link></li>

                    <li><Link to="#">Termos de uso</Link></li>
                    <li><Link to="#">Política de privacidade</Link></li>
                    <li><Link to="#">Limpar cache</Link></li>
                    <li><Link to="#">Dispositivos conectados</Link></li>
                    <li><Link to="#">Sair da conta</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* AJUDA */}
            <li className="nav-item">
              <a
                href="https://wa.me/5533984616848"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <img src="/assets/help-svgrepo-com.svg" className="nav-icon" />
                <span>Ajuda / WhatsApp</span>
              </a>
            </li>

          </ul>
        </nav>

      </div>
    </aside>
  );
}
