// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica da Galeria e Filtros ---
    // Seleciona todos os botões de filtro e os itens da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Adiciona um 'click' listener a cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            // Obtém o valor do filtro (ex: 'lapis', 'digital', 'all')
            const filterValue = this.getAttribute('data-filter');

            // Itera sobre cada item da galeria para aplicar o filtro
            galleryItems.forEach(item => {
                // Adiciona a classe 'hidden' para iniciar a transição de ocultação
                item.classList.add('hidden');

                // Usa um timeout para permitir que a transição CSS ocorra
                // antes de alterar o 'display' do elemento
                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hidden'); // Remove 'hidden' para mostrar
                        item.style.display = 'block'; // Garante que o item esteja visível
                    } else {
                        item.style.display = 'none'; // Esconde completamente o item
                    }
                }, 300); // O tempo (300ms) deve corresponder à duração da transição no CSS
            });
        });
    });

    // Simula um clique no botão 'Todos' ao carregar a página
    // Isso garante que todos os itens da galeria sejam exibidos inicialmente
    document.querySelector('.filter-btn[data-filter="all"]').click();

    // Adiciona um 'click' listener a cada item da galeria
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obtém o caminho da imagem (src) e o texto alternativo (alt) do item clicado
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            lightbox.style.display = 'block'; // Torna o lightbox visível
            lightboxImg.src = imgSrc // Define a imagem a ser exibida no lightbox
            lightboxImg.alt = imgAlt; // Define o texto alt para acessibilidade
            lightboxCaption.textContent = imgAlt; // Define a legenda do lightbox
        });
    });
    
    // --- Lógica para Busca de Unidades por CEP ---
    const cepInput = document.getElementById('cep');
    const findUnitBtn = document.getElementById('find-unit-btn');
    const unitResultsDiv = document.getElementById('unit-results');

    const unitsData = [
        {
            name: "Unidade Centro",
            address: "Rua Hermann Blumenau, 134 -Loja 1- Centro, Florianópolis - SC",
            cep: "88015-300",
            phone: "0800 323 3000",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+Hermann+Blumenau,+134,+Florianopolis,+SC"
        },
        {
            name: "Unidade Norte da Ilha",
            address: "Rua Intendente João Nunes Vieira,1006 - Sala 5 - Ingleses Norte, Florianópolis - SC",
            cep: "88058-100",
            phone: "0800 323 3000",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+Intendente+Joao+Nunes+Vieira,+1006,+Florianopolis,+SC"
        },
        {
            name: "Unidade Estreito",
            address: "Rua do Saber, 789 - Estreito, São José - SC",
            cep: "88070-700",
            phone: "(48) 3112-6096",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+do+Saber,+789,+Sao+Jose,+SC"
        },
        // Adicione mais unidades aqui seguindo o mesmo formato
    ];

    // Função para formatar CEP (remove hífen)
    function formatCep(cep) {
        return cep.replace(/\D/g, ''); // Remove todos os não-dígitos
    }

    findUnitBtn.addEventListener('click', function() {
        const cepDigitado = formatCep(cepInput.value); // Pega o valor e formata

        let foundUnit = null; // Variável para armazenar a unidade encontrada

        // Percorre a lista de unidades para encontrar uma correspondência
        for (let i = 0; i < unitsData.length; i++) {
            if (formatCep(unitsData[i].cep) === cepDigitado) {
                foundUnit = unitsData[i];
                break; // Sai do loop assim que encontrar
            }
        }

        // Exibe o resultado
        if (foundUnit) {
            unitResultsDiv.innerHTML = `
                <h3>${foundUnit.name}</h3>
                <p><strong>Endereço:</strong> ${foundUnit.address}</p>
                <p><strong>Telefone:</strong> ${foundUnit.phone}</p>
                <p><a href="${foundUnit.mapLink}" target="_blank">Ver no Mapa</a></p>
            `;
        } else {
            unitResultsDiv.innerHTML = `
                <p>Nenhuma unidade encontrada para o CEP informado.</p>
            `;
        }
    });

    // Opcional: Adicionar formatação automática do CEP (adicionar hífen)
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });

}); // Fechamento do DOMContentLoaded