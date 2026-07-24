// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Animação de Rolagem para Revelar Seções (Intersection Observer API) ---
    const sections = document.querySelectorAll('section'); // Seleciona TODAS as tags <section>

    const observerOptions = {
        root: null, // viewport como root
        rootMargin: '0px', // sem margem extra
        threshold: 0.2 // Quando 20% da seção estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Adiciona a classe que torna a seção visível
                observer.unobserve(entry.target); // Para de observar, animação uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        console.log("Observando seção:", section.id || section.className); // Verifique se 'skills' aparece
        sectionObserver.observe(section);
        sectionObserver.observe(section);
    });

    // --- Scroll Suave para Links de Navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Função para Enviar Mensagem via WhatsApp ---
    window.enviarWhats = function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const mensagem = document.getElementById('mensagem').value;
        const telefone = '5561995289297'; // SEU NÚMERO DE WHATSAPP AQUI

        const emailInput = document.getElementById('email');
        const email = emailInput ? emailInput.value : '';

        const texto = `Olá! Meu nome é ${nome}.${email ? ` Email: ${email}.` : ''} Mensagem: ${mensagem}`;
        const mgFormatada = encodeURIComponent(texto);

        const url = `https://wa.me/${telefone}?text=${mgFormatada}`;
        console.log(url);
        window.open(url, '_blank');
        document.getElementById('formulario').reset();
    };

    // --- Navegação Ativa (Destaca o link do menu da seção atual) ---
    const menuLinks = document.querySelectorAll('.menu-link');

    const highlightActiveLink = () => {
        const scrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajuste este offset se seu header fixo tiver altura diferente
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Chama ao carregar para definir a seção inicial
});