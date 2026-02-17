import React, { useState, useMemo } from "react";
import "../css/atendimento.css";

interface Conversa {
  id: number;
  nome: string;
  status: string;
  ultimaMsg: string;
  naoLidas: number;
  tags: string[];
  data: Date;
}

export default function Atendimento() {
  const [busca, setBusca] = useState("");
  const [filtroNaoLidas, setFiltroNaoLidas] = useState(false);
  const [ordemCrescente, setOrdemCrescente] = useState(true);
  const [novoTexto, setNovoTexto] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<
    "novos" | "meus" | "concluidos"
  >("novos");

  // Base simulada
  const [conversas] = useState<Conversa[]>([
    {
      id: 1,
      nome: "João Silva",
      status: "Online",
      ultimaMsg: "Preciso de ajuda...",
      naoLidas: 2,
      tags: ["Financeiro"],
      data: new Date("2024-01-20T10:00:00"),
    },
    {
      id: 2,
      nome: "Maria Souza",
      status: "Offline",
      ultimaMsg: "Obrigada!",
      naoLidas: 0,
      tags: ["Suporte"],
      data: new Date("2024-01-19T09:00:00"),
    },
    {
      id: 3,
      nome: "Carlos Lima",
      status: "Online",
      ultimaMsg: "Qual o prazo?",
      naoLidas: 5,
      tags: ["Vendas"],
      data: new Date("2024-01-21T15:30:00"),
    },
    {
      id: 4,
      nome: "Ana Paula",
      status: "Offline",
      ultimaMsg: "Bom dia!",
      naoLidas: 0,
      tags: ["Prioridade"],
      data: new Date("2024-01-18T08:00:00"),
    },
  ]);

  // Filtro completo
  const conversasFiltradas = useMemo(() => {
    return conversas
      .filter((conv) => {
        const matchBusca = conv.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

        const matchNaoLidas = filtroNaoLidas
          ? conv.naoLidas > 0
          : true;

        let matchStatus = true;

        if (filtroStatus === "novos") {
          matchStatus = conv.naoLidas > 0;
        }

        if (filtroStatus === "meus") {
          matchStatus = conv.tags.includes("Prioridade");
        }

        if (filtroStatus === "concluidos") {
          matchStatus = conv.status === "Offline";
        }

        return matchBusca && matchNaoLidas && matchStatus;
      })
      .sort((a, b) =>
        ordemCrescente
          ? a.data.getTime() - b.data.getTime()
          : b.data.getTime() - a.data.getTime()
      );
  }, [busca, filtroNaoLidas, ordemCrescente, conversas, filtroStatus]);

  const handleAction = (acao: string) => {
    alert(`Ação executada: ${acao}`);
  };

  return (
    <div className="atendimento-page">
      <div className="atendimento-layout">
        {/* SIDEBAR */}
        <aside className="sidebar-conversas">
          <header className="conversas-header">
            <h2>Conversas</h2>
            <button
              className="btn-add"
              onClick={() => handleAction("Novo Atendimento")}
            >
              +
            </button>
          </header>

          {/* ABAS */}
          <div className="tabs-status">
            <button
              className={
                filtroStatus === "novos" ? "active-tab" : ""
              }
              onClick={() => setFiltroStatus("novos")}
            >
              Novos
            </button>

            <button
              className={
                filtroStatus === "meus" ? "active-tab" : ""
              }
              onClick={() => setFiltroStatus("meus")}
            >
              Meus
            </button>

            <button
              className={
                filtroStatus === "concluidos"
                  ? "active-tab"
                  : ""
              }
              onClick={() => setFiltroStatus("concluidos")}
            >
              Concluídos
            </button>
          </div>

          {/* BUSCA + FILTROS */}
          <div className="filtros-container">
            <input
              type="text"
              placeholder="Buscar por nome..."
              className="input-busca"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <div className="acoes-filtros">
              <button
                className={ordemCrescente ? "active" : ""}
                onClick={() =>
                  setOrdemCrescente(!ordemCrescente)
                }
              >
                Ordenar{ordemCrescente ? "Antigos" : "Recentes"}
              </button>

              <button
                onClick={() =>
                  handleAction("Abrir Filtro de Etiquetas")
                }
              >
                Etiquetas
              </button>

              <button
                className={
                  filtroNaoLidas ? "active-filter" : ""
                }
                onClick={() =>
                  setFiltroNaoLidas(!filtroNaoLidas)
                }
              >
                {" "}
                {filtroNaoLidas
                  ? "Ver Todas"
                  : "Não Lidas"}
              </button>
            </div>
          </div>

          {/* LISTA */}
          <div className="lista-conversas">
            {conversasFiltradas.length > 0 ? (
              conversasFiltradas.map((conv) => (
                <div
                  key={conv.id}
                  className="conversa-item"
                >
                  <div className="avatar-placeholder">
                    {conv.nome.charAt(0)}
                  </div>

                  <div className="conversa-info">
                    <div className="conversa-nome-linha">
                      <strong>{conv.nome}</strong>

                      {conv.naoLidas > 0 && (
                        <span className="badge-nao-lida">
                          {conv.naoLidas}
                        </span>
                      )}
                    </div>

                    <p>{conv.ultimaMsg}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">
                Nenhum atendimento encontrado.
              </p>
            )}
          </div>
        </aside>

        {/* CHAT */}
        <section className="chat-window">
          <header className="chat-header">
            <div className="contato-info">
              <strong>João Silva</strong>
              <span className="status-tag">
                Online
              </span>
            </div>

            <div className="chat-header-actions">
              <button className="btn-acoes">
                Ações ▾
              </button>
              <button className="btn-finalizar">
                Finalizar
              </button>
            </div>
          </header>

          <main className="chat-body"></main>

          <footer className="chat-input-container">
            <button className="btn-anexo">
              📎
            </button>

            <input
              placeholder="Digite sua mensagem..."
              value={novoTexto}
              onChange={(e) =>
                setNovoTexto(e.target.value)
              }
            />

            <button className="btn-enviar">
              ➤
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
