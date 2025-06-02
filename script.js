// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script start.');

    // --- Lógica do Menu Hambúrguer ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav'); // Certifique-se de que sua tag <nav> no HTML tem a classe 'main-nav'
    const navLinks = document.querySelectorAll('.main-nav ul li a'); // Seleciona todos os links da navegação

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            // Impede o scroll do body quando o menu está aberto
            document.body.classList.toggle('no-scroll');
        });

        // Fecha o menu ao clicar em um link (útil para navegação de âncora)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        console.log('Hamburger menu logic added.');
    } else {
        console.warn('Hamburger menu or main navigation not found. Mobile menu functionality will not work.');
    }


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