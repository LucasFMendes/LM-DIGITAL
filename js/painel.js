document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const emailInput = document.getElementById('emailInput');
    const senhaInput = document.getElementById('senha');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if(dados.sucesso) {
            alert('Login correto! Redirecionando...');
            window.location.href = 'painel.html'; // Crie um painel.html de teste
        } else {
            alert('Email ou senha incorretos');
        }
    });
});
