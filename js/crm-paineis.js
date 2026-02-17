document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos do Modal e Formulário
    const modal = document.getElementById('modal-novo-painel');
    const btnNovoCard = document.getElementById('btn-novo-card'); 
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnCloseX = document.getElementById('btn-close-modal');
    const form = document.getElementById('form-novo-painel');

    // 2. Elementos das Fases
    const containerFases = document.getElementById('container-fases');
    const btnAddFase = document.getElementById('add-fase');

    /* --- LÓGICA DAS FASES --- */
    const renderizarFasesIniciais = () => {
    containerFases.innerHTML = '';

    // Fase padrão já criada no layout
    containerFases.appendChild(
        criarLinhaFase(
            'Novo Lead',           // nome
            'Fase inicial',        // tipo
            '#123A6F'              // cor
        )
    );
};
    const criarLinhaFase = (nome = '', tipo = 'Fase intermediária', cor = '#123A6F') => {
    const div = document.createElement('div');
    div.className = 'fase-row'; 
    
    div.innerHTML = `
        <span class="drag-handle" style="cursor: grab; color: #cbd5e1;">☰</span>
        <input type="text" name="fase_nome[]" placeholder="Nome da fase" value="${nome}" required>
        
        <select name="fase_tipo[]">
            <option ${tipo === 'Fase inicial' ? 'selected' : ''}>Fase inicial</option>
            <option ${tipo === 'Fase intermediária' ? 'selected' : ''}>Fase intermediária</option>
            <option ${tipo === 'Fase final' ? 'selected' : ''}>Fase final</option>
        </select>

        <div class="color-picker-wrapper">
            <div class="color-preview" style="background-color: ${cor};"></div>
            <input type="color" name="fase_cor[]" value="${cor}">
        </div>

        <button type="button" class="btn-delete-fase" title="Remover fase">🗑️</button>
    `;

    // Evento para atualizar a cor do círculo (preview) em tempo real
    const inputCor = div.querySelector('input[type="color"]');
    const preview = div.querySelector('.color-preview');
    
    inputCor.addEventListener('input', (e) => {
        preview.style.backgroundColor = e.target.value;
    });

    // Evento para remover esta linha específica
    div.querySelector('.btn-delete-fase').addEventListener('click', () => {
        div.remove();
    });

    return div;
};
    /* --- CONTROLE DO MODAL --- */
    const abrirModal = () => {
        modal.classList.add('is-open');
        // Renderizamos as fases ao abrir para garantir que o modal não venha vazio
        if (containerFases && containerFases.children.length === 0) {
            renderizarFasesIniciais();
        }
    };

    const fecharModal = () => {
        modal.classList.remove('is-open');
        form.reset();
    };

    // Listeners de abertura e fechamento
    if (btnNovoCard) btnNovoCard.addEventListener('click', abrirModal);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);
    if (btnCloseX) btnCloseX.addEventListener('click', fecharModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });

    /* --- BOTÃO ADICIONAR NOVA FASE --- */
    if (btnAddFase) {
        btnAddFase.addEventListener('click', () => {
            containerFases.appendChild(criarLinhaFase('', 'Fase intermediária', '#123A6F'));
        });
    }

    /* --- ENVIO DO FORMULÁRIO --- */
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            console.log("Dados salvos:", Object.fromEntries(formData.entries()));
            alert('Painel salvo com sucesso!');
            fecharModal();
        });
    }

    // Inicializa as fases padrão ao carregar a página
    renderizarFasesIniciais();
});