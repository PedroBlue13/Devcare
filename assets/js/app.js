// Smooth scrolling para links da navegação
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault(); // Evita o comportamento padrão

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector(".navbar").offsetHeight; // Obtém a altura do header fixo
            const targetPosition = targetElement.offsetTop - headerHeight - 80; // Ajuste fino

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth" // Faz um scroll suave
            });
        }
    });
});

// Fecha o menu mobile após clicar em um link
document.addEventListener("DOMContentLoaded", function(){
    const navLinks = document.querySelectorAll('.navbar-collapse a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        navbarCollapse.classList.remove('show');
      });
    });
});

// Animação dos contadores
document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(el, start, end, duration) {
        let startTime = null;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / duration, 1);
            el.innerText = Math.floor(progress * (end - start) + start);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.innerText = end; // Garante que o número final seja exato
            }
        }

        requestAnimationFrame(step);
    }

    function startCounters() {
        document.querySelectorAll("[countTo]").forEach((el) => {
            let endValue = parseInt(el.getAttribute("countTo"), 10);
            let startValue = parseInt(el.innerText, 10) || 0;
            animateCounter(el, startValue, endValue, 3000); // 3000ms = 3s
        });
    }

    // Inicia a animação quando a seção entra na tela
    function handleScroll() {
        let section = document.getElementById("count-stats");
        if (!section) return;
        
        let rect = section.getBoundingClientRect();
        let isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            startCounters();
            window.removeEventListener("scroll", handleScroll);
        }
    }

    // Dispara a animação quando a página carrega e ao rolar
    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

// Animação dos avatares dos profissionais parceiros
document.addEventListener("DOMContentLoaded", function () {
    const images = [
      "./assets/img/logos/andre.png",
      "./assets/img/logos/wesley.png"
    ];
    
    let index = 0;
    const avatarImg = document.getElementById("avatar-img");

    function changeAvatar() {
      index = (index + 1) % images.length;
      avatarImg.classList.remove("animate__fadeInLeft");
      void avatarImg.offsetWidth; // Força o reflow para reiniciar a animação
      avatarImg.classList.add("animate__fadeInLeft", "shadow", "margin-t");
      avatarImg.src = images[index];
    }

    // Inicializa o avatar
    if (avatarImg) {
      avatarImg.src = images[0];
      avatarImg.classList.add("animate__fadeInLeft", "shadow");
      setInterval(changeAvatar, 3000);
    }
});

// Controle do carrossel de depoimentos
document.addEventListener("DOMContentLoaded", function () {
    var depoimentos = Depoiments['cliente']; // Lista de depoimentos
    var currentIndex = 0; // Índice do depoimento atual

    function showDepoiment(index) {
        var cliente = depoimentos[index];

        var depoimentHTML = `
            <div class="depoiment-card p-4">
                <img src="${cliente.img}" class="depoiment-img" alt="${cliente.name}">
                <h5 class="fw-bold text-dark">${cliente.name}</h5>
                <p class="text-muted fst-italic">"${cliente.dsc}"</p>
            </div>
        `;

        document.getElementById("depoiment-container").innerHTML = depoimentHTML;
    }

    // Botão Anterior
    document.querySelector(".prev-btn").addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = depoimentos.length - 1; // Volta para o último depoimento
        }
        showDepoiment(currentIndex);
    });

    // Botão Próximo
    document.querySelector(".next-btn").addEventListener("click", function () {
        if (currentIndex < depoimentos.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta para o primeiro depoimento
        }
        showDepoiment(currentIndex);
    });

    // Exibir o primeiro depoimento ao carregar
    showDepoiment(currentIndex);
});