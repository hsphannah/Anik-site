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


    // --- Lógica do Lightbox (Modo Teatro para Imagens da Galeria) ---
    // Seleciona os elementos do lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

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

    // Adiciona 'click' listener ao botão de fechar o lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none'; // Oculta o lightbox
    });

    // Adiciona 'click' listener ao fundo do lightbox para fechá-lo
    lightbox.addEventListener('click', function(e) {
        // Verifica se o clique foi no fundo (e não na imagem)
        if (e.target === lightbox) {
            lightbox.style.display = 'none'; // Oculta o lightbox
        }
    });

    // Adiciona 'keydown' listener para fechar o lightbox com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none'; // Oculta o lightbox
        }
    });


    // --- Lógica para Busca de Unidades por CEP ---
    // Seleciona os elementos relacionados à busca de unidades
    const cepInput = document.getElementById('cep');
    const findUnitBtn = document.getElementById('find-unit-btn');
    const unitResultsDiv = document.getElementById('unit-results');

    // Lista de unidades (seu "banco de dados" local)
    const unitsData = [
        {
            name: "Unidade Centro",
            address: "Rua Hermann Blumenau, 134 -Loja 1- Centro, Florianópolis - SC",
            cep: "88015-300",
            phone: "0800 323 3000",
            mapLink: "https://maps.google.com/?q=Rua+das+Artes,+123,+Florianópolis0"
        },
        {
            name: "Unidade Norte da Ilha",
            address: "Rua Intendente João Nunes Vieira,1006 - Sala 5 - Ingleses Norte, Florianópolis - SC",
            cep: "88058-100",
            phone: "0800 323 3000",
            mapLink: "https://maps.google.com/?q=Rua+das+Artes,+123,+Florianópolis1"
        },
        {
            name: "Unidade Estreito",
            address: "Rua do Saber, 789 - Estreito, São José - SC",
            cep: "88070-700",
            phone: "(48) 3112-6096",
            mapLink: "https://maps.google.com/?q=Rua+das+Artes,+123,+Florianópolis2"
        },
        // Adicione mais unidades aqui seguindo o mesmo formato
    ];

    // Adiciona 'click' listener ao botão de buscar unidade
    findUnitBtn.addEventListener('click', function() {
        const cepDigitado = cep