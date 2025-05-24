// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script start.'); // Adicione esta linha

    // --- Lógica da Galeria e Filtros ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    console.log('Filter Buttons found:', filterButtons.length); // Adicione esta linha
    console.log('Gallery Items found:', galleryItems.length);   // Adicione esta linha
    console.log(galleryItems); // Adicione esta linha para ver o conteúdo da lista

    // Adiciona 'click' listener a cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked!'); // Adicione esta linha

            // Remove a classe 'active' de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            // Obtém o valor do filtro (ex: 'lapis', 'digital', 'all')
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter value:', filterValue); // Adicione esta linha

            // Itera sobre cada item da galeria para aplicar o filtro
            galleryItems.forEach(item => {
                console.log('Processing item:', item.classList); // Adicione esta linha
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

            // Isso simula um clique no botão "Todos" ao carregar a página
            // Garante que todos os itens da galeria sejam exibidos inicialmente
            // document.querySelector('.filter-btn[data-filter="all"]').click(); // Comente ou remova esta linha para teste, ela pode causar loops
        });
    });

    // Opcional: Simula um clique no botão "Todos" ao carregar a página
    // Garante que todos os itens da galeria sejam exibidos inicialmente
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click(); // Garante que "Todos" esteja ativo na carga inicial
        console.log('"Todos" button clicked on load.'); // Adicione esta linha
    }

    // --- Lógica do Lightbox (Modo Teatro para Imagens da Galeria) ---
    // ...
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
            mapLink: "https://maps.app.goo.gl/kByoeUpjNGj4Gx8BA" 
        },
        {
            name: "Unidade Norte da Ilha",
            address: "Rua Intendente João Nunes Vieira,1006 - Sala 5 - Ingleses Norte, Florianópolis - SC",
            cep: "88058-100",
            phone: "0800 323 3000",
            mapLink: "https://maps.app.goo.gl/9doYzYa2AMWdy28Q8" 
        },
        {
            name: "Unidade Campeche",
            address: "Av. Pequeno Príncipe,1455-sala 7- Campeche,Florianópolis - SC",
            cep: "88063-000",
            phone: "(48) 99613-2762",
            mapLink: "https://maps.app.goo.gl/k1UyjVq6kCbQbEgy8" 
        },
        // Adicione mais unidades aqui seguindo o mesmo formato
    ];

    // Função auxiliar para limpar e formatar o CEP (remover hífens e outros não-dígitos)
    function cleanAndFormatCep(cepString) {
        if (!cepString) { // Garante que a string não é nula/vazia
            return '';
        }
        // Remove tudo que não é dígito (números)
        return cepString.replace(/\D/g, '');
    }

    // Adiciona 'click' listener ao botão de buscar unidade
    findUnitBtn.addEventListener('click', function() {
        // 1. Obtém o CEP digitado pelo usuário e o limpa/formata
        const cepDigitado = cleanAndFormatCep(cepInput.value);

        let foundUnit = null; // Variável para armazenar a unidade encontrada

        // 2. Itera sobre a lista de unidades para encontrar uma correspondência
        // Usamos for...of para facilitar a leitura quando iterando sobre arrays
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
    });

    // Opcional: Adicionar formatação automática do CEP no input (adiciona hífen)
    // Isso é útil para o usuário, mas a lógica de busca ainda limpa o CEP para comparação.
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });

});