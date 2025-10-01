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
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        document.querySelectorAll('.contact, footer').forEach(section => {
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
        document.querySelectorAll('.btn, .nav-link').forEach(button => {
            button.addEventListener('click', function(e) {
                // Simple animation effect on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn');
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Merci! Votre message a été envoyé avec succès.');
                    this.reset();
                    submitBtn.textContent = 'Envoyer le Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        // Initialize map
        function initMap() {
            // Coordinates for Matadi, Kongo Central, RDC
            const matadi = [-5.83424729389056, 13.451377647089606];
            
            // Create map
            const map = L.map('map').setView(matadi, 13);
            
            // Add tile layer (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add marker
            const marker = L.marker(matadi).addTo(map);
            marker.bindPopup("<b>ISTA/Matadi</b><br>Matadi, Kongo Central").openPopup();
            
            // Add circle to show area
            L.circle(matadi, {
                color: 'blue',
                fillColor: '#03a9f4',
                fillOpacity: 0.1,
                radius: 1000
            }).addTo(map);
        }
        
        // Initialize map when page loads
        window.addEventListener('load', initMap);