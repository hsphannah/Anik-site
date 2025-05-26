// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script start.');

    // --- Lógica da Galeria e Filtros ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item'); // galleryItems definida AQUI!

    console.log('Filter Buttons found:', filterButtons.length);
    console.log('Gallery Items found:', galleryItems.length);
    console.log(galleryItems);

    // Adiciona 'click' listener a cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked!');

            // Remove a classe 'active' de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            // Obtém o valor do filtro (ex: 'lapis', 'digital', 'all')
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter value:', filterValue);

            // Itera sobre cada item da galeria para aplicar o filtro
            galleryItems.forEach(item => {
                console.log('Processing item:', item.classList);
                item.classList.add('hidden'); // Esta é a linha que supostamente não funciona

                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }, 300); // 300ms deve corresponder à duração da transição no CSS
            });
        });
    });

    // Opcional: Simula um clique no botão "Todos" ao carregar a página
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click(); // Garante que "Todos" esteja ativo na carga inicial
        console.log('"Todos" button clicked on load.');
    }

    // --- Lógica do Lightbox (Modo Teatro para Imagens da Galeria) ---
    // Seleciona os elementos do lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Verifique se os elementos do lightbox são encontrados (Adicionei estes logs para depuração)
    console.log('Lightbox DIV encontrado:', lightbox);
    console.log('Lightbox Imagem encontrada:', lightboxImg);
    console.log('Lightbox Legenda encontrada:', lightboxCaption);
    console.log('Botão de fechar encontrado:', closeBtn);

    // Adiciona um 'click' listener a cada item da galeria
    galleryItems.forEach(item => { // 'galleryItems' AGORA está definida e acessível aqui!
        item.addEventListener('click', function() {
            console.log('Item da galeria clicado!', this);
            // Obtém o caminho da imagem (src) e o texto alternativo (alt) do item clicado
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            console.log('SRC da imagem clicada:', imgSrc);
            console.log('ALT da imagem clicada:', imgAlt);

            if (lightbox) {
                lightbox.style.display = 'block'; // Torna o lightbox visível
                if (lightboxImg) lightboxImg.src = imgSrc; // Define a imagem a ser exibida no lightbox
                if (lightboxImg) lightboxImg.alt = imgAlt; // Define o texto alt para acessibilidade
                if (lightboxCaption) lightboxCaption.textContent = imgAlt; // Define a legenda do lightbox
            } else {
                console.error('Erro: Elemento Lightbox não encontrado no DOM!');
            }
        });
    });

    // Adiciona 'click' listener ao botão de fechar o lightbox
    if (closeBtn) { // Adicionei verificação para garantir que o botão existe
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none'; // Oculta o lightbox
        });
    }


    // Adiciona 'click' listener ao fundo do lightbox para fechá-lo
    if (lightbox) { // Adicionei verificação para garantir que o lightbox existe
        lightbox.addEventListener('click', function(e) {
            // Verifica se o clique foi no fundo (e não na imagem)
            if (e.target === lightbox) {
                lightbox.style.display = 'none'; // Oculta o lightbox
            }
        });
    }


    // Adiciona 'keydown' listener para fechar o lightbox com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') { // Adicionei verificação de lightbox
            lightbox.style.display = 'none'; // Oculta o lightbox
        }
    });


    // --- Lógica para Busca de Unidades por CEP ---
    // Seleciona os elementos relacionados à busca de unidades
    const cepInput = document.getElementById('cep');
    const findUnitBtn = document.getElementById('find-unit-btn');
    const unitResultsDiv = document.getElementById('unit-results');

    // Lista de unidades (seu "banco de dados" local)
    const unitsData = [{
            name: "Unidade Centro",
            address: "Rua Hermann Blumenau, 134 -Loja 1- Centro, Florianópolis - SC",
            cep: "88015-300",
            phone: "0800 323 3000",
            mapLink: "https://maps.app.goo.gl/354vYc5tW1Xw2P3y7"
        }, 
        {
            name: "Unidade Norte da Ilha",
            address: "Rua Intendente João Nunes Vieira,1006 - Sala 5 - Ingleses Norte, Florianópolis - SC",
            cep: "88058-100",
            phone: "0800 323 3000",
            mapLink: "https://maps.app.goo.gl/nN6tQf8J7c5w4P3y7"
        }, 
        {
            name: "Unidade Campeche",
            address: "Av. Pequeno Príncipe,1455-sala 7- Campeche,Florianópolis - SC",
            cep: "88063-000",
            phone: "(48) 99613-2762",
            mapLink: "https://maps.app.goo.gl/kM3hP7jL2a1b9T2u5"
        }, 
    ];

    // Função auxiliar para limpar e formatar o CEP (remover hífens e outros não-dígitos)
    function cleanAndFormatCep(cepString) {
        if (!cepString) {
            return '';
        }
        return cepString.replace(/\D/g, '');
    }

    // Adiciona 'click' listener ao botão de buscar unidade
    if (findUnitBtn) { // Adicionei verificação de elemento
        findUnitBtn.addEventListener('click', function() {
            // 1. Obtém o CEP digitado pelo usuário e o limpa/formata
            const cepDigitado = cleanAndFormatCep(cepInput.value);

            let foundUnit = null; // Variável para armazenar a unidade encontrada

            // 2. Itera sobre a lista de unidades para encontrar uma correspondência
            for (const unit of unitsData) {
                // Limpa e formata o CEP da unidade para comparação
                const unitCepClean = cleanAndFormatCep(unit.cep);

                // Compara o CEP digitado com o CEP da unidade (ambos limpos)
                if (unitCepClean === cepDigitado) {
                    foundUnit = unit; // Encontrou a unidade
                    break; // Sai do loop, pois já encontramos
                }
            }

            // 3. Exibe o resultado na div 'unitResultsDiv'
            if (unitResultsDiv) { // Adicionei verificação de elemento
                if (foundUnit) {
                    // Se uma unidade foi encontrada, constrói o HTML para exibí-la
                    unitResultsDiv.innerHTML = `
                        <div class="unit-item">
                            <h3>${foundUnit.name}</h3>
                            <p><strong>Endereço:</strong> ${foundUnit.address}</p>
                            <p><strong>CEP:</strong> ${foundUnit.cep}</p>
                            <p><strong>Telefone:</strong> ${foundUnit.phone}</p>
                            <p><a href="${foundUnit.mapLink}" target="_blank" class="btn-saiba-mais">Ver no Mapa</a></p>
                        </div>
                    `;
                } else {
                    // Se nenhuma unidade foi encontrada, exibe uma mensagem padrão
                    unitResultsDiv.innerHTML = `
                        <p>Nenhuma unidade encontrada para o CEP informado.</p>
                    `;
                }
            }
        });
    }


    // Opcional: Adicionar formatação automática do CEP no input (adiciona hífen)
    // Isso é útil para o usuário, mas a lógica de busca ainda limpa o CEP para comparação.
    if (cepInput) { // Adicionei verificação de elemento
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }
    // --- Lógica de Envio de Formulário com EmailJS ---
const contactForm = document.querySelector('.contact-form-column form'); // Seleciona o formulário

if (contactForm) { // Verifica se o formulário existe
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

        console.log('Formulário de contato submetido!');

        // Captura os valores dos campos do formulário
        const userName = document.getElementById('nome').value;
        const userEmail = document.getElementById('email').value;
        const message = document.getElementById('mensagem').value;

        // Crie o objeto de parâmetros para o template do EmailJS
        const templateParams = {
            user_name: userName, // Este nome deve corresponder a {{user_name}} no seu template
            user_email: userEmail, // Este nome deve corresponder a {{user_email}} no seu template
            message: message // Este nome deve corresponder a {{message}} no seu template
        };
// 1. ENVIAR E-MAIL DE NOTIFICAÇÃO PARA VOCÊ
        emailjs.send(
            'SEU_SERVICE_ID_AQUI',       // Substitua pelo seu Service ID real (ex: 'service_xxxxxxxx')
            'SEU_TEMPLATE_ID_NOTIFICACAO', // Substitua pelo ID do seu NOVO template (ex: 'template_yyyyyyyy')
            commonTemplateParams
        )
        .then(function(response) {
            console.log('E-mail de NOTIFICAÇÃO enviado com sucesso!', response.status, response.text);

            // 2. ENVIAR E-MAIL DE RESPOSTA AUTOMÁTICA PARA O CLIENTE
            // Este template só precisa do nome e e-mail do cliente, a mensagem é fixa no template
            emailjs.send(
                'SEU_SERVICE_ID_AQUI',       // O mesmo Service ID
                'template_vuutzw2',          // O ID do seu template de resposta automática
                {
                    user_name: userName,    // O nome do cliente para o Olá {{user_name}}
                    user_email: userEmail   // O e-mail do cliente para o "To Email" do template
                }
            )
            .then(function(responseAuto) {
                console.log('E-mail de RESPOSTA AUTOMÁTICA enviado com sucesso!', responseAuto.status, responseAuto.text);
                alert('Sua mensagem foi enviada com sucesso! Você receberá uma confirmação por e-mail.');
                contactForm.reset(); // Limpa o formulário após ambos os envios
            }, function(errorAuto) {
                console.error('Falha ao enviar e-mail de RESPOSTA AUTOMÁTICA:', errorAuto);
                alert('Sua mensagem foi enviada, mas houve um erro ao enviar a confirmação. Por favor, entre em contato diretamente se não receber.');
                contactForm.reset(); // Ainda limpa o formulário
            });

        }, function(errorNotification) {
            console.error('Falha ao enviar e-mail de NOTIFICAÇÃO:', errorNotification);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        });
    });
}
}); // <--- ESTA CHAVE AGORA FECHA TODO O CÓDIGO