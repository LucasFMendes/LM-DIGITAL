export interface CampanhaForm {
  nome: string;
  modelo: string;
  atraso: number;
  dias: string[];
  arquivo: File | null;
  numerosManuais: string;
  horaInicio: string;
  horaFim: string;
  usarChatbot: boolean;
  chatbotSelecionado: string;
  departamento: string;
  responsavel: string;
}

export const validateCampanha = (form: CampanhaForm) => {
  const errors: Record<string, string> = {};

  if (!form.nome.trim()) {
    errors.nome = "Informe o nome da campanha";
  }

  if (!form.modelo) {
    errors.modelo = "Selecione um modelo";
  }

  if (!form.atraso || Number(form.atraso) < 1) {
    errors.atraso = "O atraso deve ser maior que 0";
  }

  if (form.dias.length === 0) {
    errors.dias = "Selecione pelo menos um dia";
  }

  if (!form.arquivo && !form.numerosManuais.trim()) {
    errors.contatos = "Informe um CSV ou números manuais";
  }

  if (form.horaInicio >= form.horaFim) {
    errors.horario = "Hora inicial deve ser menor que a final";
  }

  if (form.usarChatbot && !form.chatbotSelecionado) {
    errors.chatbotSelecionado = "Selecione um chatbot";
  }

  if (!form.departamento) {
    errors.departamento = "Selecione um departamento";
  }

  if (!form.responsavel) {
    errors.responsavel = "Selecione um responsável";
  }

  return errors;
};
