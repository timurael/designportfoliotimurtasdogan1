// Modern Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupThemeToggle();
        this.setupParallax();
        this.setupTilt();
        this.setupModal();
        this.setupForm();
        this.setupNavigation();
        this.setupLazyLoading();
    }

    // Event Listeners
    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.onResize.bind(this), 250));
        window.addEventListener('mousemove', this.throttle(this.onMouseMove.bind(this), 16));
    }

    onDOMReady() {
        // Add loaded class to body for initial animations
        document.body.classList.add('loaded');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
        }
    }

    onScroll() {
        this.updateNavigation();
        this.updateScrollProgress();
    }

    onResize() {
        this.updateParallax();
    }

    onMouseMove(event) {
        this.updateParallax(event);
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with fade-in-scroll class
        const elementsToObserve = document.querySelectorAll('.fade-in-scroll');
        elementsToObserve.forEach(element => {
            this.observer.observe(element);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav-container').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Add ripple effect
                this.createRipple(themeToggle);
            });
        }
    }

    // Parallax Effects
    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.gradient-orb');
        this.heroCard = document.querySelector('.hero-glass-card');
    }

    updateParallax(event) {
        if (!event || !this.heroCard) return;

        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        // Move hero card slightly based on mouse position
        if (this.heroCard) {
            const transformX = xPos * 10;
            const transformY = yPos * 10;
            this.heroCard.style.transform = `translate(${transformX}px, ${transformY}px)`;
        }

        // Move parallax elements
        this.parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = xPos * speed * 20;
            const y = yPos * speed * 20;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Tilt Effect
    setupTilt() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Modal System
    setupModal() {
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        const closeButton = document.querySelector('.modal-close');
        const overlay = document.querySelector('.modal-overlay');
        
        // Project data
        this.projects = {
            tom: {
                title: '📱 TOM Content',
                links: [
                    {
                        title: '1️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_a%C5%9Fk-ile-activity-6898954153285029888-nwWm'
                    },
                    {
                        title: '2️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_5k-olduk-activity-6892833086460059648-D2DZ'
                    },
                    {
                        title: '3️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_tomzamanaft-managementtrainee-fintech-activity-6950744136450727936-ggKx'
                    },
                    {
                        title: '4️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_bayram-tom-tomtayfa-activity-6925793693190750208-KEBp'
                    },
                    {
                        title: '5️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_avukatlargaesnaes-5nisan-tom-activity-6917087277428940800-QLCq'
                    },
                    {
                        title: '6️⃣',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_fintech-tompay-tomfinansman-activity-6909131615235436544-Qajn'
                    }
                ]
            },
            video: {
                title: '🎬 Video Content',
                videos: [
                    {
                        title: '🏖️ TOM Bodrum Event',
                        type: 'youtube',
                        embedId: 't_IxBeJX3cI'
                    },
                    {
                        title: '📹 TOM Event Coverage',
                        type: 'linkedin',
                        url: 'https://www.linkedin.com/posts/technologyofmoney_tom-bodrumda-yapt%C4%B1%C4%9F%C4%B1-i%C5%9Fin-her-alan%C4%B1nda-activity-6858464059348529152-ybDB'
                    },
                    {
                        title: '🎥 Video Production',
                        type: 'linkedin',
                        url: 'https://www.linkedin.com/posts/timur-tasdogan_no-one-is-actually-too-busy-to-experiment-activity-7326301293604450304-ZCno?utm_source=share&utm_medium=member_desktop&rcm=ACoAACtx3D4BEyw02Ku677rzdxMPrZmAGCop2mo'
                    }
                ]
            },
            logo: {
                title: '🎨 Logo Design',
                pdf: 'Logo_Design.pdf'
            },
            others: {
                title: '✨ Others',
                files: [
                    'Reel.mp4',
                    '_2db6617b-bc8f-4bbe-9053-0624e64dfe1a.jpeg',
                    'priceless2.png',
                    'Screenshot 2023-07-31 at 10.51.07.png',
                    'timoel_3d_illustration_of_emojis_animals_having_a_meeting_there_e7ef56d7-cc51-407c-8360-5d919a6edc2d.png',
                    'timoel_3d_vector_illustration_of_one_unicorn_one_dragon_one_app_6e867b51-3862-433f-9dc4-60d3537c5267.png',
                    'Untitled design (2).mp4',
                    'reels 5a.mp4'
                ]
            }
        };
        
        // Open modal
        document.querySelectorAll('.work-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.project;
                const project = this.projects[projectId];
                
                if (project) {
                    this.openModal(project);
                }
            });
        });
        
        // Close modal
        [closeButton, overlay].forEach(element => {
            if (element) {
                element.addEventListener('click', () => this.closeModal());
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(project) {
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        
        let contentHTML = '';
        
        // Handle different content types - ONLY show the content
        if (project.links) {
            // TOM Content with LinkedIn links only
            contentHTML = `
                <div class="simple-modal">
                    <h2>${project.title}</h2>
                    <div class="links-grid">
                        ${project.links.map(link => `
                            <a href="${link.url}" target="_blank" rel="noopener" class="link-card glass">
                                <span>${link.title}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (project.videos) {
            // Video Content with embedded videos only
            contentHTML = `
                <div class="simple-modal">
                    <h2>${project.title}</h2>
                    <div class="videos-grid">
                        ${project.videos.map(video => {
                            if (video.type === 'youtube') {
                                return `
                                    <div class="video-container">
                                        <h3>${video.title}</h3>
                                        <iframe width="100%" height="315" 
                                            src="https://www.youtube.com/embed/${video.embedId}" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen>
                                        </iframe>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="video-container">
                                        <h3>${video.title}</h3>
                                        <a href="${video.url}" target="_blank" rel="noopener" class="glass-button primary">
                                            View on LinkedIn
                                        </a>
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>
                </div>
            `;
        } else if (project.pdf) {
            // Logo Design PDF only
            contentHTML = `
                <div class="simple-modal">
                    <h2>${project.title}</h2>
                    <div class="pdf-container">
                        <iframe src="${project.pdf}" width="100%" height="600" frameborder="0">
                            <p>Your browser does not support PDFs. <a href="${project.pdf}" target="_blank">Download the PDF</a>.</p>
                        </iframe>
                    </div>
                </div>
            `;
        } else if (project.files) {
            // Others files only
            contentHTML = `
                <div class="simple-modal">
                    <h2>${project.title}</h2>
                    <div class="files-grid">
                        ${project.files.map(file => {
                            const isVideo = file.endsWith('.mp4');
                            const isImage = file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png');
                            
                            if (isVideo) {
                                return `
                                    <div class="file-item">
                                        <video width="100%" height="200" controls>
                                            <source src="${file}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                `;
                            } else if (isImage) {
                                return `
                                    <div class="file-item">
                                        <img src="${file}" alt="Creative work" style="width: 100%; height: auto; border-radius: 8px;">
                                    </div>
                                `;
                            }
                            return '';
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        modalContent.innerHTML = contentHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupModalLightbox() {
        const modalImages = document.querySelectorAll('.modal-gallery img');
        modalImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const close = () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', close);
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Form Handling
    setupForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Sending...</span>
        `;
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
            await this.delay(2000); // Simulate network request
            
            // Success state
            submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10L9 12L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Message Sent!</span>
            `;
            
            // Reset form
            form.reset();
            
            // Show success message
            this.showNotification('Message sent successfully!', 'success');
            
        } catch (error) {
            // Error state
            submitButton.innerHTML = `
                <span>Failed to send</span>
            `;
            this.showNotification('Failed to send message. Please try again.', 'error');
        }
        
        // Reset button after delay
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 3000);
    }

    // Navigation
    setupNavigation() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
    }

    updateNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Update nav background opacity based on scroll
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    updateScrollProgress() {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }

    // Lazy Loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Utility Functions
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createRipple(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content glass">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
}

// Additional CSS for dynamic elements
const additionalStyles = `
    /* Modal Styles */
    .modal-project {
        padding: 2rem;
    }
    
    .modal-hero-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .modal-category {
        color: var(--accent-primary);
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .modal-title {
        font-size: 2rem;
        margin: 0.5rem 0 1rem;
    }
    
    .modal-description {
        font-size: 1.125rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .modal-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--glass-bg);
        border-radius: 1rem;
        border: 1px solid var(--glass-border);
    }
    
    .modal-meta h4 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .modal-tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tech-tag {
        padding: 0.25rem 0.75rem;
        background: var(--accent-primary);
        color: white;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .modal-details {
        margin-bottom: 2rem;
    }
    
    .modal-details h4 {
        margin-bottom: 1rem;
    }
    
    .modal-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .modal-gallery img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .modal-gallery img:hover {
        transform: scale(1.05);
    }
    
    .modal-actions {
        display: flex;
        justify-content: center;
    }
    
    /* Simple Modal Styles */
    .simple-modal {
        padding: 2rem;
        text-align: center;
    }
    
    .simple-modal h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--text-primary);
    }
    
    .simple-modal h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .link-card {
        padding: 1.5rem;
        border-radius: 1rem;
        text-decoration: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
    }
    
    .link-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px var(--glass-shadow);
    }
    
    .link-card span {
        font-size: 1rem;
        color: var(--text-primary);
        font-weight: 500;
        text-align: center;
    }
    
    .videos-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .video-container {
        margin-bottom: 1rem;
    }
    
    .video-container iframe {
        border-radius: 1rem;
        box-shadow: 0 8px 24px var(--glass-shadow);
    }
    
    .pdf-container {
        max-width: 900px;
        margin: 0 auto;
    }
    
    .pdf-container iframe {
        border-radius: 1rem;
        box-shadow: 0 8px 24px var(--glass-shadow);
    }
    
    .files-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .file-item {
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 16px var(--glass-shadow);
    }
    
    .file-item video,
    .file-item img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    /* Lightbox */
    .lightbox {
        position: fixed;
        inset: 0;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
    
    .lightbox-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 1rem;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    /* Loading Spinner */
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Notifications */
    .notification {
        position: fixed;
        top: 100px;
        right: 2rem;
        z-index: 2500;
        animation: slideIn 0.3s ease;
    }
    
    .notification-content {
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
    }
    
    .notification-success .notification-content {
        border-left: 4px solid #10B981;
    }
    
    .notification-error .notification-content {
        border-left: 4px solid #EF4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        padding: 0;
        font-size: 1.2rem;
        margin-left: auto;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    /* Ripple Effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Navigation Active State */
    .nav-link.active {
        color: var(--accent-primary);
    }
    
    .nav-container.scrolled {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px var(--glass-shadow);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .modal-meta {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .modal-gallery {
            grid-template-columns: 1fr;
        }
        
        .notification {
            right: 1rem;
            left: 1rem;
        }
        
        .notification-content {
            min-width: auto;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the portfolio app
new PortfolioApp();