 // Animation on scroll for sections
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate cards inside sections with delay
                    if (entry.target.id === 'organization' || entry.target.id === 'info') {
                        const cards = entry.target.querySelectorAll('.org-card, .info-item');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animated');
                            }, index * 200);
                        });
                    }
                    
                    // Animate history image
                    if (entry.target.id === 'history') {
                        const historyImage = entry.target.querySelector('.history-image');
                        setTimeout(() => {
                            historyImage.classList.add('animated');
                        }, 300);
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        document.querySelectorAll('.history, .organization, .info, footer').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Animate social icons on hover
        document.querySelectorAll('.social-icons a').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'rotate(360deg)';
                this.querySelector('i').style.transition = 'transform 0.5s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'rotate(0deg)';
            });
        });
        
        // Logo animation on page load
        window.addEventListener('load', function() {
            const logoIcon = document.querySelector('.logo i');
            logoIcon.style.animation = 'pulse 2s infinite';
        });

        // Menu hamburger functionality
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Hide header on scroll down, show on scroll up
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        });
        
        // Animation on button click
        document.querySelectorAll('.nav-link').forEach(button => {
            button.addEventListener('click', function(e) {
                // Simple animation effect on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Add floating animation to org icons
        document.querySelectorAll('.org-icon').forEach(icon => {
            icon.classList.add('float');
        });