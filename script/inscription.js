// Variables globales
let currentStep = 1;
const totalSteps = 3;
let formData = {};

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée - Initialisation du formulaire');
    initializeForm();
    setupEventListeners();
    updateProgressBar();
});

function initializeForm() {
    console.log('Initialisation du formulaire');
    
    // Masquer toutes les étapes sauf la première
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
            console.log('Étape 1 activée');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Masquer la confirmation
    document.getElementById('confirmation').style.display = 'none';
}

function setupEventListeners() {
    console.log('Configuration des écouteurs d\'événements');
    
    // Navigation entre les étapes
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', handleNextStep);
    });
    
    document.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', handlePrevStep);
    });
    
    // Soumission du formulaire
    const submitBtn = document.getElementById('btn-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    } else {
        console.error('Bouton submit non trouvé');
    }
    
    // Validation en temps réel
    setupRealTimeValidation();
    
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

function setupRealTimeValidation() {
    console.log('Configuration de la validation en temps réel');
    
    // Validation des emails
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateEmail(this);
        });
    }
    
    // Validation des téléphones
    const phoneField = document.getElementById('telephone');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            validatePhone(this);
        });
    }
    
    // Validation des champs requis
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
            validateRequiredField(this);
        });
    });
}

function handleNextStep(event) {
    event.preventDefault();
    console.log('Clic sur Suivant - Étape actuelle:', currentStep);
    
    const currentStepElement = document.getElementById(`step${currentStep}-form`);
    
    if (validateStep(currentStep)) {
        // Sauvegarder les données de l'étape actuelle
        saveStepData(currentStep);
        
        // Passer à l'étape suivante
        currentStepElement.classList.remove('active');
        currentStep++;
        
        const nextStepElement = document.getElementById(`step${currentStep}-form`);
        if (nextStepElement) {
            nextStepElement.classList.add('active');
            updateProgressBar();
            console.log('Passage à l\'étape:', currentStep);
        } else {
            console.error('Étape suivante non trouvée:', `step${currentStep}-form`);
        }
    } else {
        console.log('Validation échouée pour l\'étape:', currentStep);
    }
}

function handlePrevStep(event) {
    event.preventDefault();
    console.log('Clic sur Précédent - Étape actuelle:', currentStep);
    
    const currentStepElement = document.getElementById(`step${currentStep}-form`);
    
    currentStepElement.classList.remove('active');
    currentStep--;
    
    const prevStepElement = document.getElementById(`step${currentStep}-form`);
    if (prevStepElement) {
        prevStepElement.classList.add('active');
        updateProgressBar();
        console.log('Retour à l\'étape:', currentStep);
    } else {
        console.error('Étape précédente non trouvée:', `step${currentStep}-form`);
    }
}

function validateStep(stepNumber) {
    console.log('Validation de l\'étape:', stepNumber);
    const stepElement = document.getElementById(`step${stepNumber}-form`);
    
    if (!stepElement) {
        console.error('Élément de l\'étape non trouvé:', `step${stepNumber}-form`);
        return false;
    }
    
    const inputs = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    console.log('Étape', stepNumber, 'valide:', isValid);
    return isValid;
}

function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    // Réinitialiser l'erreur
    field.style.borderColor = '#ddd';
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    
    // Validation selon le type de champ
    if (field.type === 'email' && field.value.trim() !== '') {
        if (!isValidEmail(field.value)) {
            showError(field, errorMessage, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    if (field.type === 'tel' && field.value.trim() !== '') {
        if (!isValidPhone(field.value)) {
            showError(field, errorMessage, 'Veuillez entrer un numéro de téléphone valide');
            return false;
        }
    }
    
    if (field.hasAttribute('required') && field.value.trim() === '') {
        showError(field, errorMessage, 'Ce champ est obligatoire');
        return false;
    }
    
    // Si tout est valide
    field.style.borderColor = '#27ae60';
    return true;
}

function validateRequiredField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    if (field.value.trim() === '') {
        showError(field, errorMessage, 'Ce champ est obligatoire');
        return false;
    }
    
    field.style.borderColor = '#27ae60';
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    return true;
}

function validateEmail(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    if (field.value.trim() === '') {
        showError(field, errorMessage, 'Veuillez entrer une adresse email');
        return false;
    }
    
    if (!isValidEmail(field.value)) {
        showError(field, errorMessage, 'Veuillez entrer une adresse email valide');
        return false;
    }
    
    field.style.borderColor = '#27ae60';
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    return true;
}

function validatePhone(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    if (field.value.trim() === '') {
        showError(field, errorMessage, 'Veuillez entrer un numéro de téléphone');
        return false;
    }
    
    if (!isValidPhone(field.value)) {
        showError(field, errorMessage, 'Veuillez entrer un numéro de téléphone valide');
        return false;
    }
    
    field.style.borderColor = '#27ae60';
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    return true;
}

function showError(field, errorMessage, message) {
    field.style.borderColor = '#e74c3c';
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    console.error('Erreur de validation:', message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Supprimer les espaces et caractères spéciaux pour la validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    return phoneRegex.test(cleanedPhone);
}

function updateProgressBar() {
    const progress = ((currentStep - 1) / totalSteps) * 100;
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    // Mettre à jour les étapes visuelles
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('completed', 'active');
        }
    });
    
    console.log('Barre de progression mise à jour:', progress + '%');
}

function saveStepData(stepNumber) {
    console.log('Sauvegarde des données de l\'étape:', stepNumber);
    
    switch(stepNumber) {
        case 1:
            formData.personal = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                dateNaissance: document.getElementById('date-naissance').value,
                nationalite: document.getElementById('nationalite').value,
                adresse: document.getElementById('adresse').value
            };
            break;
            
        case 2:
            formData.formation = {
                faculte: document.getElementById('faculte').value,
                niveau: document.getElementById('niveau').value,
                annee: document.getElementById('annee').value,
                formationSpecifique: document.getElementById('formation').value,
                motivation: document.getElementById('motivation').value
            };
            break;
            
        case 3:
            formData.documents = {
                diplome: document.getElementById('diplome').files[0]?.name || '',
                releveNotes: document.getElementById('releve-notes').files[0]?.name || '',
                photo: document.getElementById('photo').files[0]?.name || '',
                cv: document.getElementById('cv').files[0]?.name || '',
                autresDocuments: Array.from(document.getElementById('autres-documents').files).map(f => f.name),
                conditionsAcceptees: document.getElementById('conditions').checked
            };
            break;
    }
    
    console.log('Données sauvegardées:', formData);
}

function handleSubmit(event) {
    event.preventDefault();
    console.log('Tentative de soumission du formulaire');
    
    if (validateStep(3)) {
        const conditionsCheckbox = document.getElementById('conditions');
        if (!conditionsCheckbox.checked) {
            alert('Veuillez accepter les conditions générales avant de soumettre.');
            return;
        }
        
        // Sauvegarder les données de la dernière étape
        saveStepData(3);
        
        // Afficher l'animation de chargement
        showLoading();
        
        console.log('Formulaire validé, génération du PDF...');
        
        // Simuler le traitement (2 secondes)
        setTimeout(() => {
            // Générer le PDF
            generateAndSendPDF();
            
            // Afficher la confirmation
            showConfirmation();
        }, 2000);
    } else {
        console.log('Échec de la validation du formulaire');
        alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
    }
}

function showLoading() {
    const submitBtn = document.getElementById('btn-submit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
        submitBtn.disabled = true;
    }
}

function showConfirmation() {
    console.log('Affichage de la confirmation');
    
    // Masquer le formulaire
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.display = 'none';
    }
    
    // Afficher la confirmation
    const confirmation = document.getElementById('confirmation');
    if (confirmation) {
        confirmation.style.display = 'block';
        confirmation.style.animation = 'fadeIn 0.5s ease';
    }
    
    // Mettre à jour la barre de progression
    document.getElementById('progress-bar').style.width = '100%';
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.add('completed');
    });
}

function generateAndSendPDF() {
    console.log('Début de la génération du PDF');
    
    // Vérifier si jsPDF est disponible
    if (typeof jspdf !== 'undefined') {
        generatePDF();
        sendEmailConfirmation();
    } else {
        console.warn('jsPDF non chargé, tentative de chargement...');
        // Charger jsPDF dynamiquement
        loadJSPDF().then(() => {
            generatePDF();
            sendEmailConfirmation();
        }).catch(error => {
            console.error('Erreur lors du chargement de jsPDF:', error);
            // Fallback: afficher les données en console
            console.log('Données du formulaire:', formData);
            alert('PDF généré avec succès! (simulation)');
        });
    }
}

function loadJSPDF() {
    return new Promise((resolve, reject) => {
        if (typeof jspdf !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            console.log('jsPDF chargé avec succès');
            resolve();
        };
        script.onerror = () => {
            console.error('Erreur lors du chargement de jsPDF');
            reject(new Error('Impossible de charger jsPDF'));
        };
        document.head.appendChild(script);
    });
}

function generatePDF() {
    try {
        console.log('Génération du PDF en cours...');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuration du document
        doc.setProperties({
            title: `Inscription - ${formData.personal.nom} ${formData.personal.prenom}`,
            subject: 'Formulaire d\'inscription ISTA Matadi',
            author: 'ISTA Matadi'
        });
        
        // En-tête
        doc.setFillColor(41, 128, 185);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('ISTA MATADI', 105, 15, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text('CONFIRMATION DE VOTRE INSCRIPTION EN LIGNE', 105, 25, { align: 'center' });
        
        // Corps du document
        doc.setTextColor(0, 0, 0);
        
        // Informations personnelles
        addSection(doc, 'INFORMATIONS PERSONNELLES', 60);
        
        let y = 70;
        y = addField(doc, 'Nom', formData.personal.nom, 20, y);
        y = addField(doc, 'Prénom', formData.personal.prenom, 100, y);
        y = addField(doc, 'Email', formData.personal.email, 20, y);
        y = addField(doc, 'Téléphone', formData.personal.telephone, 100, y);
        y = addField(doc, 'Date', formatDate(formData.personal.dateNaissance), 20, y);
        y = addField(doc, 'Nationalité', formData.personal.nationalite, 100, y);
        
        // Adresse
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.text('Adresse:', 20, y);
        y += 8;
        doc.setFont('helvetica', 'normal');
        const adresseLines = doc.splitTextToSize(formData.personal.adresse, 170);
        doc.text(adresseLines, 25, y);
        y += adresseLines.length * 5 + 10;
        
        // Formation
        addSection(doc, 'FORMATION CHOISIE', y);
        y += 15;
        
        y = addField(doc, 'Faculté', getFaculteLabel(formData.formation.faculte), 20, y);
        y = addField(doc, 'Niveau', getNiveauLabel(formData.formation.niveau), 100, y);
        y = addField(doc, 'Année', formData.formation.annee, 20, y);
        
        if (formData.formation.formationSpecifique) {
            y = addField(doc, 'Formation', formData.formation.formationSpecifique, 100, y);
        }
        
        if (formData.formation.motivation) {
            y += 10;
            addSection(doc, 'LETTRE DE MOTIVATION', y);
            y += 10;
            const motivationLines = doc.splitTextToSize(formData.formation.motivation, 170);
            doc.text(motivationLines, 20, y);
            y += motivationLines.length * 5;
        }
        
        y += 10;
        
        // Documents
      
        
        // Pied de page
        doc.setFontSize(13);
        doc.setTextColor(100, 100, 100);
        doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 20, 280);
        doc.text('ISTA Matadi - Tous droits réservés', 115, 285, { align: 'center' });
        
        // Téléchargement automatique
        const fileName = `inscription_${formData.personal.nom}_${formData.personal.prenom}.pdf`;
        doc.save(fileName);
        
        console.log('PDF généré avec succès:', fileName);
        
    } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
}

function addSection(doc, title, y) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, y);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
}

function addField(doc, label, value, x, y) {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value || 'Non renseigné', x + 25, y);
    return y + 8;
}

function sendEmailConfirmation() {
    console.log('Envoi de la confirmation par email à:', formData.personal.email);
    
    // Simulation d'envoi d'email
    setTimeout(() => {
        console.log('Email envoyé avec succès à:', formData.personal.email);
    }, 1000);
}

// Fonctions utilitaires
function formatDate(dateString) {
    if (!dateString) return 'Non renseignée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

function getFaculteLabel(value) {
    const facultes = {
        'telecommunication': 'Télécommunication',
        'electricite': 'Électricité',
        'electronique': 'Électronique',
        'mecanique': 'Mécanique',
        'maintenance': 'Maintenance Industrielle',
        'environnement': 'Environnement',
        'portuaire': 'Portuaire',
        
    };
    return facultes[value] || value;
}

function getNiveauLabel(value) {
    const niveaux = {
        'licence': 'Licence',
        'master': 'Master',
        'doctorat': 'Doctorat',
        'Preparatoire': 'Preparatoire'
    };
    return niveaux[value] || value;
}

// Gestion du menu hamburger pour mobile
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Gestion du scroll pour le header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Ajouter le CSS pour les animations si absent
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('Script JavaScript chargé avec succès');