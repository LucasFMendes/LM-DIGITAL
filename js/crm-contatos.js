document.addEventListener('DOMContentLoaded', () => {

    /* ======================================================
       UTILIDADES
    ====================================================== */

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => scope.querySelectorAll(selector);

    /* ======================================================
       MODAL — NOVO CONTATO (DIV / OVERLAY)
    ====================================================== */

    const btnNovo = qs('#btn-novo');
    const modalNovoContato = qs('#modal-novo-contato');

    if (modalNovoContato) {
        // 🔒 Garante que inicia fechado
        modalNovoContato.classList.remove('active');

        // Abrir
        if (btnNovo) {
            btnNovo.addEventListener('click', () => {
                modalNovoContato.classList.add('active');
            });
        }

        // Cancelar
        const btnCancelNovo = qs('.btn-cancel', modalNovoContato);
        if (btnCancelNovo) {
            btnCancelNovo.addEventListener('click', () => {
                modalNovoContato.classList.remove('active');
            });
        }

        // Clique fora
        modalNovoContato.addEventListener('click', (e) => {
            if (e.target === modalNovoContato) {
                modalNovoContato.classList.remove('active');
            }
        });
    }

    /* ======================================================
       MODAL — EXPORTAÇÃO (<dialog>)
    ====================================================== */

    const btnExportar = qs('#btn-exportar');
    const modalExportacao = qs('#modal-exportacao');

    if (btnExportar && modalExportacao) {
        btnExportar.addEventListener('click', () => {
            modalExportacao.showModal();
        });

        const btnFecharExportacao = qs('#btn-fechar-exportacao', modalExportacao);
        if (btnFecharExportacao) {
            btnFecharExportacao.addEventListener('click', () => {
                modalExportacao.close();
            });
        }
    }

    /* ======================================================
       MODAL — IMPORTAÇÃO (<dialog> + STEPPER)
    ====================================================== */

    const btnImportar = qs('#btn-importar');
    const modalImportacao = qs('#modal-importacao');

    if (btnImportar && modalImportacao) {

        btnImportar.addEventListener('click', () => {
            modalImportacao.showModal();
            resetarStepperImportacao();
        });

        const btnCancelImportar = qs('.btn-cancel', modalImportacao);
        if (btnCancelImportar) {
            btnCancelImportar.addEventListener('click', () => {
                modalImportacao.close();
                resetarStepperImportacao();
            });
        }

        const btnProximo = qs('.btn-primary', modalImportacao);
        const steps = qsa('.step', modalImportacao);
        const contents = qsa('.step-content', modalImportacao);

        let currentStep = 1;

        function atualizarInterface(step) {

            // Stepper
            steps.forEach((s, index) => {
                s.classList.remove('active', 'completed');

                if (index + 1 === step) {
                    s.classList.add('active');
                } else if (index + 1 < step) {
                    s.classList.add('completed');
                }
            });

            // Conteúdo
            contents.forEach(content => {
                const stepNumber = Number(content.dataset.step);
                content.style.display = stepNumber === step ? 'block' : 'none';
            });

            // Texto botão
            btnProximo.textContent =
                step === steps.length ? 'Confirmar Importação' : 'Próximo';
        }

        function resetarStepperImportacao() {
            currentStep = 1;
            atualizarInterface(currentStep);
        }

        if (btnProximo) {
            btnProximo.addEventListener('click', () => {
                if (currentStep < steps.length) {
                    currentStep++;
                    atualizarInterface(currentStep);
                } else {
                    alert('Importação iniciada!');
                    modalImportacao.close();
                    resetarStepperImportacao();
                }
            });
        }

        resetarStepperImportacao();
    }

    /* ======================================================
       IMPORTAÇÃO DE ARQUIVOS (CARDS)
    ====================================================== */

    const fileInput = qs('#file-importacao');
    const importCards = qsa('.card-importacao');

    if (fileInput && importCards.length >= 4) {

        const tipos = [
            null,
            '.xls,.xlsx',
            '.csv',
            '.vcf'
        ];

        importCards.forEach((card, index) => {
            if (tipos[index]) {
                card.addEventListener('click', () => {
                    fileInput.accept = tipos[index];
                    fileInput.click();
                });
            }
        });

        fileInput.addEventListener('change', (e) => {
            const arquivo = e.target.files[0];
            if (!arquivo) return;

            console.log('Arquivo selecionado:', arquivo.name);
            // Aqui você pode avançar step, validar, ler arquivo etc
        });
    }

    /* ======================================================
       EXPORTAÇÃO (BASE PRONTA)
    ====================================================== */

    const exportCsv = qs('#export-csv');
    const exportJsonCards = qsa('.export-json');

    if (exportCsv) {
        exportCsv.addEventListener('click', () => {
            console.log('Exportar CSV');
        });
    }

    if (exportJsonCards.length) {
        exportJsonCards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('Exportar JSON');
            });
        });
    }

});
