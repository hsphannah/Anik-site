// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script start.');

    // --- Lógica da Galeria e Filtros ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    console.log('Filter Buttons found:', filterButtons.length);
    console.log('Gallery Items found:', galleryItems.length);
    console.log(galleryItems);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked!');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            console.log('Filter value:', filterValue);

            galleryItems.forEach(item => {
                console.log('Processing item:', item.classList);
                item.classList.add('hidden');

                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
        console.log('"Todos" button clicked on load.');
    }

    // --- Lógica do Lightbox (Modo Teatro para Imagens da Galeria) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    console.log('Lightbox DIV encontrado:', lightbox);
    console.log('Lightbox Imagem encontrada:', lightboxImg);
    console.log('Lightbox Legenda encontrada:', lightboxCaption);
    console.log('Botão de fechar encontrado:', closeBtn);

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Item da galeria clicado!', this);
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            console.log('SRC da imagem clicada:', imgSrc);
            console.log('ALT da imagem clicada:', imgAlt);

            if (lightbox) {
                lightbox.style.display = 'block';
                if (lightboxImg) lightboxImg.src = imgSrc;
                if (lightboxImg) lightboxImg.alt = imgAlt;
                if (lightboxCaption) lightboxCaption.textContent = imgAlt;
            } else {
                console.error('Erro: Elemento Lightbox não encontrado no DOM!');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
        }
    });
    
    // --- Lógica para o Header Fixo/Minimizado ao Rolar ---
    const header = document.querySelector('header');
    
    // Verifica se o elemento header existe para evitar erros
    if (header) {
        window.addEventListener('scroll', function() {
            // Se a página for rolada mais de 100px (ou outro valor que você preferir)
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        console.log('Scroll listener added for header.');
    } else {
        console.warn('Header element not found. Scroll functionality for header will not work.');
    }


    // --- Lógica para Busca de Unidades por CEP ---
    const cepInput = document.getElementById('cep');
    const findUnitBtn = document.getElementById('find-unit-btn');
    const unitResultsDiv = document.getElementById('unit-results');

    const unitsData = [{
            name: "Unidade Centro",
            address: "Rua Hermann Blumenau, 134 -Loja 1- Centro, Florianópolis - SC",
            cep: "88015-300",
            phone: "0800 323 3000",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+Hermann+Blumenau,+134,+Florianopolis,+SC" // Link do Google Maps mais genérico
        },
        {
            name: "Unidade Norte da Ilha",
            address: "Rua Intendente João Nunes Vieira,1006 - Sala 5 - Ingleses Norte, Florianópolis - SC",
            cep: "88058-100",
            phone: "0800 323 3000",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+Intendente+Joao+Nunes+Vieira,+1006,+Florianopolis,+SC" // Link do Google Maps mais genérico
        },
        {
            name: "Unidade Campeche",
            address: "Av. Pequeno Príncipe,1455-sala 7- Campeche,Florianópolis - SC",
            cep: "88063-000",
            phone: "(48) 99613-2762",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Av.+Pequeno+Principe,+1455,+Florianopolis,+SC" // Link do Google Maps mais genérico
        },
    ];

    function cleanAndFormatCep(cepString) {
        if (!cepString) {
            return '';
        }
        return cepString.replace(/\D/g, '');
    }

    if (findUnitBtn) {
        findUnitBtn.addEventListener('click', function() {
            const cepDigitado = cleanAndFormatCep(cepInput.value);
            let foundUnit = null;

            for (const unit of unitsData) {
                const unitCepClean = cleanAndFormatCep(unit.cep);
                if (unitCepClean === cepDigitado) {
                    foundUnit = unit;
                    break;
                }
            }

            if (unitResultsDiv) {
                if (foundUnit) {
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
                    unitResultsDiv.innerHTML = `
                        <p>Nenhuma unidade encontrada para o CEP informado.</p>
                    `;
                }
            }
        });
    }

    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }

    // --- Lógica de Envio de Formulário com EmailJS ---
    const contactForm = document.querySelector('.contact-form-column form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            console.log('Formulário de contato submetido!');

            // Captura os valores dos campos do formulário
            const userName = document.getElementById('nome').value;
            const userEmail = document.getElementById('email').value;
            const userMessage = document.getElementById('mensagem').value; // Use 'userMessage' para clareza

            // ATENÇÃO: As chaves neste objeto DEVEM CORRESPONDER EXATAMENTE aos placeholders {{...}} nos SEUS templates do EmailJS!
            const templateParamsForNotification = {
                user_name: userName,
                user_email: userEmail,
                message_content: userMessage // Nome da variável para o conteúdo da mensagem no template de NOTIFICAÇÃO
            };

            // Os parâmetros para o template de resposta automática podem ser mais simples se o template for fixo
            const templateParamsForAutoReply = {
                user_name: userName,
                user_email: userEmail
            };

            const SERVICE_ID = 'mensagem'; 
            const NOTIFICATION_TEMPLATE_ID = 'template_jk5qxpr'; // ID do template de NOTIFICAÇÃO.
            const AUTO_REPLY_TEMPLATE_ID = 'template_gnzn6uw'; // ID do template de RESPOSTA AUTOMÁTICA.


            // 1. ENVIAR E-MAIL DE NOTIFICAÇÃO PARA VOCÊ (o primeiro que pode falhar)
            emailjs.send(SERVICE_ID, NOTIFICATION_TEMPLATE_ID, templateParamsForNotification)
                .then(function(response) {
                    console.log('E-mail de NOTIFICAÇÃO enviado com sucesso!', response.status, response.text);

                    // Se a notificação foi enviada com sucesso, tenta enviar a resposta automática
                    return emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParamsForAutoReply);
                })
                .then(function(responseAuto) {
                    // Este bloco é executado se AMBOS os envios (notificação E resposta automática) foram um sucesso
                    console.log('E-mail de RESPOSTA AUTOMÁTICA enviado com sucesso!', responseAuto.status, responseAuto.text);
                    alert('Sua mensagem foi enviada com sucesso! Você receberá uma confirmação por e-mail.');
                    contactForm.reset(); // Limpa o formulário após ambos os envios
                })
                .catch(function(error) {
                    // Este bloco é executado se QUALQUER UM DOS ENVIOS falhou
                    console.error('Ocorreu um erro no envio de e-mail:', error);

                    let errorMessage = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';

                    // Tente dar mais detalhes sobre o erro específico do EmailJS
                    if (error && error.text) {
                        errorMessage += '\nDetalhes do erro: ' + error.text;
                    }

                    // Verifica se o erro foi no primeiro envio ou no segundo
                    if (error.status === 400) { // Erro 400: Bad Request
                        errorMessage += '\nPor favor, verifique se os IDs de serviço/template e os nomes das variáveis nos seus templates do EmailJS estão corretos.';
                    } else if (error.status === 401) { // Erro 401: Unauthorized (problema na Public Key ou serviço)
                        errorMessage += '\nErro de autenticação. Verifique sua Public Key ou a conexão do seu serviço de e-mail no EmailJS.';
                    } else if (error.status === 429) { // Erro 429: Too Many Requests (limite excedido)
                         errorMessage += '\nLimite de envios do EmailJS excedido. Tente novamente mais tarde.';
                    }

                    alert(errorMessage);
                    contactForm.reset(); // Ainda limpa o formulário, mesmo com erro
                });
        });
    }
}); 