import React, { useState } from "react";
import "../css/campanhas.css";

export default function Campanhas() {
  const [form, setForm] = useState({
    nome: "",
    modelo: "",
    atraso: "",
    dias: [] as string[],
    arquivo: null as File | null,
    usarChatbot: false,
    chatbotSelecionado: "",
    numerosManuais: "",
    horaInicio: "08:00",
    horaFim: "18:00",
    departamento: "",
    responsavel: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "dias") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        dias: checked
          ? [...prev.dias, value]
          : prev.dias.filter((dia) => dia !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome.trim()) newErrors.nome = "Informe o nome da campanha";
    if (!form.modelo) newErrors.modelo = "Selecione um modelo";
    if (!form.atraso) newErrors.atraso = "Selecione o tempo de atraso";
    if (form.dias.length === 0) newErrors.dias = "Selecione pelo menos um dia";
    if (!form.arquivo && !form.numerosManuais.trim()) newErrors.contatos = "Informe os contatos (CSV ou Manual)";
    if (form.horaInicio >= form.horaFim) newErrors.horario = "Horário inicial deve ser menor que o final";
    if (form.usarChatbot && !form.chatbotSelecionado) newErrors.chatbotSelecionado = "Selecione um chatbot";
    if (!form.departamento) newErrors.departamento = "Selecione um departamento";
    if (!form.responsavel) newErrors.responsavel = "Selecione um responsável";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Dados da Campanha:", form);
      alert("Campanha criada com sucesso! 🚀");
    }
  };

  return (
    <div className="app-container">
      <main className="campanhas-page">
        <div className="campanha-card">
          <header className="page-header">
            <h1>Campanha de Automação</h1>
            <p className="subtitle">Configure os detalhes do disparo em massa</p>
          </header>

          <div className="field">
            <label>Nome da Campanha</label>
            <input 
              type="text" 
              name="nome" 
              value={form.nome} 
              onChange={handleChange} 
              placeholder="Ex: Recuperação de Carrinho - Natal" 
            />
            {errors.nome && <span className="error">{errors.nome}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label>Modelo de Mensagem</label>
              <select name="modelo" value={form.modelo} onChange={handleChange}>
                <option value="">Selecione um modelo</option>
                <option value="boas_vindas">Boas-vindas</option>
                <option value="promocao">Promoção</option>
                <option value="recuperacao">Recuperação</option>
              </select>
              {errors.modelo && <span className="error">{errors.modelo}</span>}
            </div>

            <div className="field">
              <label>Atraso entre envios</label>
              <select name="atraso" value={form.atraso} onChange={handleChange}>
                <option value="">Selecione</option>
                {[1, 2, 3, 5, 10, 15].map((min) => (
                  <option key={min} value={min}>{min} {min === 1 ? "minuto" : "minutos"}</option>
                ))}
              </select>
              {errors.atraso && <span className="error">{errors.atraso}</span>}
            </div>
          </div>

          <div className="field">
            <label>Horário de Ativação</label>
            <div className="time-group">
              <input type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} />
              <input type="time" name="horaFim" value={form.horaFim} onChange={handleChange} />
            </div>
            {errors.horario && <span className="error">{errors.horario}</span>}
          </div>

          <div className="field">
            <label>Dias de Disparo</label>
            <div className="checkbox-group">
              {["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"].map((dia) => (
                <label key={dia} className={form.dias.includes(dia) ? "selected" : ""}>
                  <input 
                    type="checkbox" 
                    name="dias" 
                    value={dia} 
                    checked={form.dias.includes(dia)} 
                    onChange={handleChange} 
                  />
                  {dia.slice(0, 3).toUpperCase()}
                </label>
              ))}
            </div>
            {errors.dias && <span className="error">{errors.dias}</span>}
          </div>

          <div className="field">
            <label>Importar Contatos (CSV)</label>
            <input 
              className="file-input"
              type="file" 
              accept=".csv" 
              onChange={(e) => setForm(p => ({ ...p, arquivo: e.target.files ? e.target.files[0] : null }))} 
            />
          </div>

          <div className="field">
            <label>Números Manuais</label>
            <textarea 
              name="numerosManuais" 
              value={form.numerosManuais} 
              onChange={handleChange} 
              placeholder="Digite um número por linha (ex: 5511999999999)"
            />
            {errors.contatos && <span className="error">{errors.contatos}</span>}
          </div>

          <div className="field checkbox-inline">
            <div className="toggle-wrapper">
                <input 
                type="checkbox" 
                id="usarChatbot"
                name="usarChatbot" 
                checked={form.usarChatbot} 
                onChange={handleChange} 
                />
                <label htmlFor="usarChatbot">Vincular Chatbot após resposta</label>
            </div>
          </div>

          {form.usarChatbot && (
            <div className="field chatbot-subfield">
              <label>Escolher Fluxo de Conversa</label>
              <select name="chatbotSelecionado" value={form.chatbotSelecionado} onChange={handleChange}>
                <option value="">Selecione um bot</option>
                <option value="bot_vendas">Fluxo de Vendas</option>
                <option value="bot_suporte">Fluxo de Suporte</option>
              </select>
              {errors.chatbotSelecionado && <span className="error">{errors.chatbotSelecionado}</span>}
            </div>
          )}

          <div className="field-row">
            <div className="field">
              <label>Equipe</label>
              <select name="departamento" value={form.departamento} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="vendas">Vendas</option>
                <option value="suporte">Suporte</option>
              </select>
              {errors.departamento && <span className="error">{errors.departamento}</span>}
            </div>
            <div className="field">
              <label>Responsável</label>
              <select name="responsavel" value={form.responsavel} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="equipe1">Equipe Alpha</option>
                <option value="equipe2">Equipe Beta</option>
              </select>
              {errors.responsavel && <span className="error">{errors.responsavel}</span>}
            </div>
          </div>

          <footer className="actions">
            <button className="btn-primary" onClick={handleSubmit}>
              Criar Campanha Agora
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}