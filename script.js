// Configuração principal
class DeployScreen {
    constructor() {
        this.progressFill = document.getElementById('progressFill');
        this.progressLabel = document.getElementById('progressLabel');
        this.lightThemeBtn = document.getElementById('lightThemeBtn');
        this.darkThemeBtn = document.getElementById('darkThemeBtn');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Inicializar tema
        this.setupTheme();
        
        // Iniciar animações
        this.animateProgressBar();
        this.animateDots();
        
        // Configurar listeners
        this.setupEventListeners();
        
        // Verificar imagem
        this.checkImage();
        
        console.log('Mivo Deploy Screen inicializada');
    }
    
    // Verificar se a imagem carregou
    checkImage() {
        const logoImg = document.querySelector('.mivo-logo');
        
        logoImg.onload = () => {
            console.log('✅ Imagem da marca carregada:', logoImg.src);
        };
        
        logoImg.onerror = () => {
            console.error('❌ Erro ao carregar imagem:', logoImg.src);
            
            // Mostrar fallback
            const logoBackground = document.querySelector('.logo-background');
            logoBackground.innerHTML = `
                <div style="color: white; font-size: 24px; font-weight: bold; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
                    MIVO
                </div>
            `;
        };
    }
    
    // Animar a barra de progresso
    animateProgressBar() {
        let progress = 0;
        const target = 70;
        const duration = 2000; // 2 segundos para chegar a 70%
        const interval = 30;
        const increment = (target / (duration / interval));
        
        const animate = () => {
            progress += increment;
            
            if (progress >= target) {
                progress = target;
                
                // Esperar 40 segundos e reiniciar
                setTimeout(() => {
                    this.resetProgressBar();
                }, 40000);
                
                return;
            }
            
            this.progressFill.style.width = progress + '%';
            this.progressLabel.textContent = Math.round(progress) + '%';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Reiniciar a barra de progresso
    resetProgressBar() {
        this.progressFill.style.width = '0%';
        this.progressLabel.textContent = '0%';
        
        // Esperar 1 segundo e reiniciar animação
        setTimeout(() => {
            this.animateProgressBar();
        }, 1000);
    }
    
    // Animar os pontos do "Aguarde..."
    animateDots() {
        const dotsElement = document.querySelector('.dots');
        let dotCount = 0;
        const maxDots = 3;
        
        setInterval(() => {
            dotCount = (dotCount + 1) % (maxDots + 1);
            dotsElement.textContent = '.'.repeat(dotCount);
        }, 500);
    }
    
    // Configurar tema
    setupTheme() {
        // Carregar tema salvo ou usar light como padrão
        const savedTheme = localStorage.getItem('mivo-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Ativar botão correto
        if (savedTheme === 'light') {
            this.lightThemeBtn.classList.add('active');
            this.darkThemeBtn.classList.remove('active');
        } else {
            this.darkThemeBtn.classList.add('active');
            this.lightThemeBtn.classList.remove('active');
        }
    }
    
    // Aplicar tema
    setTheme(theme) {
        this.body.className = theme + '-theme';
        localStorage.setItem('mivo-theme', theme);
        
        // Atualizar meta tag theme-color
        this.updateThemeColor(theme);
    }
    
    // Atualizar cor do tema no meta tag
    updateThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'light' ? '#F0EEE9' : '#000000';
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Botões de tema
        this.lightThemeBtn.addEventListener('click', () => {
            this.setTheme('light');
            this.lightThemeBtn.classList.add('active');
            this.darkThemeBtn.classList.remove('active');
        });
        
        this.darkThemeBtn.addEventListener('click', () => {
            this.setTheme('dark');
            this.darkThemeBtn.classList.add('active');
            this.lightThemeBtn.classList.remove('active');
        });
        
        // Detectar mudança de tema do sistema
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            const handleThemeChange = (e) => {
                // Só muda se não tiver tema salvo
                if (!localStorage.getItem('mivo-theme')) {
                    const theme = e.matches ? 'dark' : 'light';
                    this.setTheme(theme);
                    
                    if (theme === 'light') {
                        this.lightThemeBtn.classList.add('active');
                        this.darkThemeBtn.classList.remove('active');
                    } else {
                        this.darkThemeBtn.classList.add('active');
                        this.lightThemeBtn.classList.remove('active');
                    }
                }
            };
            
            // Listener para mudanças
            mediaQuery.addEventListener('change', handleThemeChange);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new DeployScreen();
});

// Adicionar efeito de partículas sutil
function addParticles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: currentColor;
            border-radius: 50%;
            opacity: ${Math.random() * 0.1 + 0.05};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 0;
            animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        container.appendChild(particle);
    }
    
    // Adicionar keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: ${Math.random() * 0.1 + 0.05};
            }
            100% {
                transform: translateY(${Math.random() * 100 - 50}px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Adicionar partículas após um delay
setTimeout(addParticles, 2000);