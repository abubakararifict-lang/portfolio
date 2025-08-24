// Admin Panel JavaScript

// Global data storage
let portfolioData = {
    hero: {
        name: "Abubakar Bhutta",
        subtitle: "Software Engineering Student at University of Gujrat",
        initials: "AB",
        primaryBtn: "View My Work",
        secondaryBtn: "Get In Touch"
    },
    about: {
        text: "I am from Sialkot, Pakistan. Currently pursuing Software Engineering at the University of Gujrat. I am in my 3rd semester with a CGPA of 3.52/4. Passionate about web development and building modern applications."
    },
    education: {
        degree: "BS Software Engineering",
        university: "University of Gujrat",
        semester: "3rd",
        cgpa: "3.52/4"
    },
    skills: [
        { name: "HTML", icon: "fab fa-html5", color: "#f97316" },
        { name: "CSS", icon: "fab fa-css3-alt", color: "#3b82f6" },
        { name: "JavaScript", icon: "fab fa-js-square", color: "#eab308" },
        { name: "C++", icon: "fas fa-code", color: "#2563eb" },
        { name: "Python", icon: "fab fa-python", color: "#16a34a" },
        { name: "Git", icon: "fab fa-git-alt", color: "#dc2626" },
        { name: "React", icon: "fab fa-react", color: "#60a5fa" },
        { name: "Node.js", icon: "fab fa-node-js", color: "#22c55e" }
    ],
    projects: [
        {
            title: "E-Commerce Platform",
            description: "A modern e-commerce website built with React and Node.js, featuring user authentication and payment integration.",
            icon: "fas fa-laptop-code",
            color1: "#3b82f6",
            color2: "#1e40af",
            technologies: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Task Management App",
            description: "A responsive task management application with drag-and-drop functionality and real-time updates.",
            icon: "fas fa-mobile-alt",
            color1: "#22c55e",
            color2: "#0d9488",
            technologies: ["JavaScript", "CSS3", "HTML5"]
        },
        {
            title: "Data Visualization Dashboard",
            description: "Interactive dashboard displaying data analytics with charts and graphs using Chart.js and D3.js.",
            icon: "fas fa-chart-line",
            color1: "#a855f7",
            color2: "#ec4899",
            technologies: ["Python", "Chart.js", "Flask"]
        }
    ],
    contact: {
        email: "abubakar.ict@gmail.com",
        location: "Sialkot, Pakistan",
        formTitle: "Get In Touch"
    },
    settings: {
        title: "Abubakar Bhutta - Software Engineering Student",
        primaryColor: "#2563eb",
        secondaryColor: "#1e40af",
        backgroundColor: "#f9fafb"
    }
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel initializing...');
    
    // Check if user is logged in
    if (!checkAdminSession()) {
        console.log('User not logged in, redirecting...');
        window.location.href = 'admin-login.html';
        return;
    }
    
    console.log('User logged in, setting up admin panel...');
    initializeAdminPanel();
    loadPortfolioData();
    setupEventListeners();
    renderSkills();
    renderProjects();
    
    console.log('Admin panel initialized successfully');
});

// Initialize admin panel
function initializeAdminPanel() {
    // Set initial values
    updateFormValues();
    updatePreviews();
    updateColorPreviews();
}

// Load portfolio data from localStorage or use default
function loadPortfolioData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        portfolioData = { ...portfolioData, ...JSON.parse(saved) };
        updateFormValues();
        updatePreviews();
    }
}

// Check admin session
function checkAdminSession() {
    const sessionData = JSON.parse(localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession') || '{}');
    
    if (!sessionData.isLoggedIn || sessionData.expiresAt < new Date().getTime()) {
        // Clear expired session
        localStorage.removeItem('adminSession');
        sessionStorage.removeItem('adminSession');
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    // Clear session data
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminSession');
    
    // Redirect to login page
    window.location.href = 'admin-login.html';
}

// Setup event listeners
function setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });

    // Form inputs - Hero section
    document.getElementById('hero-name').addEventListener('input', updateHeroPreview);
    document.getElementById('hero-subtitle').addEventListener('input', updateHeroPreview);
    document.getElementById('hero-initials').addEventListener('input', updateHeroPreview);
    document.getElementById('hero-primary-btn').addEventListener('input', updateHeroPreview);
    document.getElementById('hero-secondary-btn').addEventListener('input', updateHeroPreview);

    // Form inputs - About section
    document.getElementById('about-text').addEventListener('input', updateAboutPreview);

    // Form inputs - Education section
    document.getElementById('education-degree').addEventListener('input', updateEducationPreview);
    document.getElementById('education-university').addEventListener('input', updateEducationPreview);
    document.getElementById('education-semester').addEventListener('input', updateEducationPreview);
    document.getElementById('education-cgpa').addEventListener('input', updateEducationPreview);

    // Form inputs - Contact section
    document.getElementById('contact-email').addEventListener('input', updateContactPreview);
    document.getElementById('contact-location').addEventListener('input', updateContactPreview);

    // Form inputs - Settings section
    document.getElementById('site-title').addEventListener('input', updateSettings);
    document.getElementById('primary-color').addEventListener('input', updateColorPreviews);
    document.getElementById('secondary-color').addEventListener('input', updateColorPreviews);
    document.getElementById('bg-color').addEventListener('input', updateColorPreviews);

    // Buttons
    document.getElementById('add-skill-btn').addEventListener('click', showSkillModal);
    document.getElementById('add-project-btn').addEventListener('click', showProjectModal);
    document.getElementById('save-all-btn').addEventListener('click', saveAllChanges);
    document.getElementById('preview-btn').addEventListener('click', previewWebsite);
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Test button
    const testBtn = document.getElementById('test-btn');
    if (testBtn) {
        testBtn.addEventListener('click', testAdminFunctions);
    }

    // Modal events
    setupModalEvents();
}

// Switch between content sections
function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active');
    }

    // Activate corresponding tab
    const activeTab = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Update form values from portfolio data
function updateFormValues() {
    // Hero section
    document.getElementById('hero-name').value = portfolioData.hero.name;
    document.getElementById('hero-subtitle').value = portfolioData.hero.subtitle;
    document.getElementById('hero-initials').value = portfolioData.hero.initials;
    document.getElementById('hero-primary-btn').value = portfolioData.hero.primaryBtn;
    document.getElementById('hero-secondary-btn').value = portfolioData.hero.secondaryBtn;

    // About section
    document.getElementById('about-text').value = portfolioData.about.text;

    // Education section
    document.getElementById('education-degree').value = portfolioData.education.degree;
    document.getElementById('education-university').value = portfolioData.education.university;
    document.getElementById('education-semester').value = portfolioData.education.semester;
    document.getElementById('education-cgpa').value = portfolioData.education.cgpa;

    // Contact section
    document.getElementById('contact-email').value = portfolioData.contact.email;
    document.getElementById('contact-location').value = portfolioData.contact.location;

    // Settings section
    document.getElementById('site-title').value = portfolioData.settings.title;
    document.getElementById('primary-color').value = portfolioData.settings.primaryColor;
    document.getElementById('secondary-color').value = portfolioData.settings.secondaryColor;
    document.getElementById('bg-color').value = portfolioData.settings.backgroundColor;
}

// Update previews
function updatePreviews() {
    updateHeroPreview();
    updateAboutPreview();
    updateEducationPreview();
    updateContactPreview();
}

// Update hero preview
function updateHeroPreview() {
    const name = document.getElementById('hero-name').value;
    const subtitle = document.getElementById('hero-subtitle').value;
    const initials = document.getElementById('hero-initials').value;
    const primaryBtn = document.getElementById('hero-primary-btn').value;
    const secondaryBtn = document.getElementById('hero-secondary-btn').value;

    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-subtitle').textContent = subtitle;
    document.getElementById('preview-initials').textContent = initials;
    document.getElementById('preview-primary-btn').textContent = primaryBtn;
    document.getElementById('preview-secondary-btn').textContent = secondaryBtn;

    // Update portfolio data
    portfolioData.hero = { name, subtitle, initials, primaryBtn, secondaryBtn };
}

// Update about preview
function updateAboutPreview() {
    const text = document.getElementById('about-text').value;
    document.getElementById('preview-about-text').textContent = text;
    portfolioData.about.text = text;
}

// Update education preview
function updateEducationPreview() {
    const degree = document.getElementById('education-degree').value;
    const university = document.getElementById('education-university').value;
    const semester = document.getElementById('education-semester').value;
    const cgpa = document.getElementById('education-cgpa').value;

    document.getElementById('preview-degree').textContent = degree;
    document.getElementById('preview-university').textContent = university;
    document.getElementById('preview-semester').textContent = semester;
    document.getElementById('preview-cgpa').textContent = cgpa;

    portfolioData.education = { degree, university, semester, cgpa };
}

// Update contact preview
function updateContactPreview() {
    const email = document.getElementById('contact-email').value;
    const location = document.getElementById('contact-location').value;

    document.getElementById('preview-contact-email').textContent = email;
    document.getElementById('preview-contact-location').textContent = location;

    portfolioData.contact = { ...portfolioData.contact, email, location };
}

// Update color previews
function updateColorPreviews() {
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const bgColor = document.getElementById('bg-color').value;

    document.getElementById('preview-primary-color').style.backgroundColor = primaryColor;
    document.getElementById('preview-secondary-color').style.backgroundColor = secondaryColor;
    document.getElementById('preview-bg-color').style.backgroundColor = bgColor;

    portfolioData.settings = { ...portfolioData.settings, primaryColor, secondaryColor, backgroundColor };
}

// Update settings
function updateSettings() {
    const title = document.getElementById('site-title').value;
    portfolioData.settings.title = title;
}

// Update all form data from inputs
function updateAllFormData() {
    // Hero section
    portfolioData.hero.name = document.getElementById('hero-name').value;
    portfolioData.hero.subtitle = document.getElementById('hero-subtitle').value;
    portfolioData.hero.initials = document.getElementById('hero-initials').value;
    portfolioData.hero.primaryBtn = document.getElementById('hero-primary-btn').value;
    portfolioData.hero.secondaryBtn = document.getElementById('hero-secondary-btn').value;

    // About section
    portfolioData.about.text = document.getElementById('about-text').value;

    // Education section
    portfolioData.education.degree = document.getElementById('education-degree').value;
    portfolioData.education.university = document.getElementById('education-university').value;
    portfolioData.education.semester = document.getElementById('education-semester').value;
    portfolioData.education.cgpa = document.getElementById('education-cgpa').value;

    // Contact section
    portfolioData.contact.email = document.getElementById('contact-email').value;
    portfolioData.contact.location = document.getElementById('contact-location').value;

    // Settings section
    portfolioData.settings.title = document.getElementById('site-title').value;
    portfolioData.settings.primaryColor = document.getElementById('primary-color').value;
    portfolioData.settings.secondaryColor = document.getElementById('secondary-color').value;
    portfolioData.settings.backgroundColor = document.getElementById('bg-color').value;
}

// Render skills
function renderSkills() {
    console.log('Rendering skills:', portfolioData.skills);
    const container = document.getElementById('skills-container');
    if (!container) {
        console.error('Skills container not found!');
        return;
    }
    
    container.innerHTML = '';

    portfolioData.skills.forEach((skill, index) => {
        const skillCard = createSkillCard(skill, index);
        container.appendChild(skillCard);
    });
}

// Create skill card
function createSkillCard(skill, index) {
    const card = document.createElement('div');
    card.className = 'skill-card-admin fade-in';
    card.innerHTML = `
        <div class="skill-header">
            <div class="skill-icon" style="color: ${skill.color}">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-actions">
                <button class="btn-danger edit-skill" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-danger delete-skill" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="skill-name">${skill.name}</div>
    `;

    // Add event listeners
    card.querySelector('.edit-skill').addEventListener('click', () => editSkill(index));
    card.querySelector('.delete-skill').addEventListener('click', () => deleteSkill(index));

    return card;
}

// Render projects
function renderProjects() {
    console.log('Rendering projects:', portfolioData.projects);
    const container = document.getElementById('projects-container');
    if (!container) {
        console.error('Projects container not found!');
        return;
    }
    
    container.innerHTML = '';

    portfolioData.projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card-admin fade-in';
    card.innerHTML = `
        <div class="project-header">
            <h4 class="project-title">${project.title}</h4>
            <div class="project-actions">
                <button class="btn-danger edit-project" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-danger delete-project" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="project-preview" style="background: linear-gradient(135deg, ${project.color1}, ${project.color2})">
            <i class="${project.icon}"></i>
        </div>
        <div class="project-description">${project.description}</div>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;

    // Add event listeners
    card.querySelector('.edit-project').addEventListener('click', () => editProject(index));
    card.querySelector('.delete-project').addEventListener('click', () => deleteProject(index));

    return card;
}

// Setup modal events
function setupModalEvents() {
    // Skill modal
    document.getElementById('save-skill-btn').addEventListener('click', saveSkill);
    document.querySelectorAll('#skill-modal .modal-close, #skill-modal .modal-cancel').forEach(btn => {
        btn.addEventListener('click', hideSkillModal);
    });

    // Project modal
    document.getElementById('save-project-btn').addEventListener('click', saveProject);
    document.querySelectorAll('#project-modal .modal-close, #project-modal .modal-cancel').forEach(btn => {
        btn.addEventListener('click', hideProjectModal);
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

// Show skill modal
function showSkillModal() {
    document.getElementById('skill-modal').classList.remove('hidden');
    // Clear form only if not editing
    const saveBtn = document.getElementById('save-skill-btn');
    if (!saveBtn.dataset.editIndex) {
        document.getElementById('new-skill-name').value = '';
        document.getElementById('new-skill-icon').selectedIndex = 0;
        document.getElementById('new-skill-color').value = '#3b82f6';
    }
}

// Hide skill modal
function hideSkillModal() {
    document.getElementById('skill-modal').classList.add('hidden');
}

// Save skill
function saveSkill() {
    const name = document.getElementById('new-skill-name').value.trim();
    const icon = document.getElementById('new-skill-icon').value;
    const color = document.getElementById('new-skill-color').value;

    if (!name) {
        showNotification('Please enter a skill name', 'error');
        return;
    }

    const saveBtn = document.getElementById('save-skill-btn');
    const editIndex = saveBtn.dataset.editIndex;

    if (editIndex !== undefined) {
        // Update existing skill
        portfolioData.skills[editIndex] = { name, icon, color };
        saveBtn.textContent = 'Add Skill';
        delete saveBtn.dataset.editIndex;
        showNotification('Skill updated successfully!', 'success');
    } else {
        // Add new skill
        const newSkill = { name, icon, color };
        portfolioData.skills.push(newSkill);
        showNotification('Skill added successfully!', 'success');
    }
    
    renderSkills();
    hideSkillModal();
}

// Show project modal
function showProjectModal() {
    document.getElementById('project-modal').classList.remove('hidden');
    // Clear form only if not editing
    const saveBtn = document.getElementById('save-project-btn');
    if (!saveBtn.dataset.editIndex) {
        document.getElementById('new-project-title').value = '';
        document.getElementById('new-project-description').value = '';
        document.getElementById('new-project-icon').selectedIndex = 0;
        document.getElementById('new-project-color1').value = '#3b82f6';
        document.getElementById('new-project-color2').value = '#1e40af';
        document.getElementById('new-project-tech').value = '';
    }
}

// Hide project modal
function hideProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

// Save project
function saveProject() {
    const title = document.getElementById('new-project-title').value.trim();
    const description = document.getElementById('new-project-description').value.trim();
    const icon = document.getElementById('new-project-icon').value;
    const color1 = document.getElementById('new-project-color1').value;
    const color2 = document.getElementById('new-project-color2').value;
    const tech = document.getElementById('new-project-tech').value.trim();

    if (!title || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const technologies = tech ? tech.split(',').map(t => t.trim()) : [];
    
    const saveBtn = document.getElementById('save-project-btn');
    const editIndex = saveBtn.dataset.editIndex;

    if (editIndex !== undefined) {
        // Update existing project
        portfolioData.projects[editIndex] = { title, description, icon, color1, color2, technologies };
        saveBtn.textContent = 'Add Project';
        delete saveBtn.dataset.editIndex;
        showNotification('Project updated successfully!', 'success');
    } else {
        // Add new project
        const newProject = { title, description, icon, color1, color2, technologies };
        portfolioData.projects.push(newProject);
        showNotification('Project added successfully!', 'success');
    }
    
    renderProjects();
    hideProjectModal();
}

// Edit skill
function editSkill(index) {
    const skill = portfolioData.skills[index];
    
    // Change save button text first
    const saveBtn = document.getElementById('save-skill-btn');
    saveBtn.textContent = 'Update Skill';
    saveBtn.dataset.editIndex = index;
    
    // Show modal first
    showSkillModal();
    
    // Then populate modal with current values
    document.getElementById('new-skill-name').value = skill.name;
    document.getElementById('new-skill-icon').value = skill.icon;
    document.getElementById('new-skill-color').value = skill.color;
}

// Edit project
function editProject(index) {
    const project = portfolioData.projects[index];
    
    // Change save button text first
    const saveBtn = document.getElementById('save-project-btn');
    saveBtn.textContent = 'Update Project';
    saveBtn.dataset.editIndex = index;
    
    // Show modal first
    showProjectModal();
    
    // Then populate modal with current values
    document.getElementById('new-project-title').value = project.title;
    document.getElementById('new-project-description').value = project.description;
    document.getElementById('new-project-icon').value = project.icon;
    document.getElementById('new-project-color1').value = project.color1;
    document.getElementById('new-project-color2').value = project.color2;
    document.getElementById('new-project-tech').value = project.technologies.join(', ');
}

// Delete skill
function deleteSkill(index) {
    if (confirm('Are you sure you want to delete this skill?')) {
        portfolioData.skills.splice(index, 1);
        renderSkills();
        showNotification('Skill deleted successfully!', 'success');
    }
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        portfolioData.projects.splice(index, 1);
        renderProjects();
        showNotification('Project deleted successfully!', 'success');
    }
}

// Save all changes
function saveAllChanges() {
    try {
        // Update portfolio data from all form inputs first
        updateAllFormData();
        
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        showNotification('All changes saved successfully!', 'success');
        
        // Update the main portfolio website
        updatePortfolioWebsite();
        
        console.log('Portfolio data saved:', portfolioData);
    } catch (error) {
        showNotification('Error saving changes: ' + error.message, 'error');
        console.error('Save error:', error);
    }
}

// Update portfolio website
function updatePortfolioWebsite() {
    // This function would typically send the data to a backend
    // For now, we'll just show a success message
    console.log('Portfolio data updated:', portfolioData);
}

// Preview website
function previewWebsite() {
    // Open the main portfolio in a new tab
    window.open('index.html', '_blank');
}

// Show notification
function showNotification(message, type = 'info') {
    console.log(`Notification: ${message} (${type})`);
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export portfolio data
function exportPortfolioData() {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'portfolio-data.json';
    link.click();
}

// Import portfolio data
function importPortfolioData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                portfolioData = { ...portfolioData, ...importedData };
                updateFormValues();
                updatePreviews();
                renderSkills();
                renderProjects();
                showNotification('Portfolio data imported successfully!', 'success');
            } catch (error) {
                showNotification('Error importing data: ' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveAllChanges();
    }
    
    // Ctrl/Cmd + P to preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        previewWebsite();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
});

// Auto-save functionality
let autoSaveTimeout;
function setupAutoSave() {
    console.log('Setting up auto-save...');
    // Auto-save after 30 seconds of inactivity
    const inputs = document.querySelectorAll('input, textarea, select');
    console.log('Found inputs for auto-save:', inputs.length);
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            console.log('Input changed, setting up auto-save...');
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                console.log('Auto-saving...');
                saveAllChanges();
            }, 30000);
        });
    });
}

// Initialize auto-save
setupAutoSave();

// Check session timeout every minute
setInterval(() => {
    if (!checkAdminSession()) {
        showNotification('Session expired. Please login again.', 'error');
        setTimeout(() => {
            logout();
        }, 2000);
    }
}, 60000);

// Test admin functions
function testAdminFunctions() {
    console.log('Testing admin functions...');
    
    // Test notification system
    showNotification('Testing notification system...', 'info');
    
    // Test data access
    console.log('Current portfolio data:', portfolioData);
    
    // Test form values
    console.log('Hero name input value:', document.getElementById('hero-name')?.value);
    console.log('About text input value:', document.getElementById('about-text')?.value);
    
    // Test containers
    console.log('Skills container:', document.getElementById('skills-container'));
    console.log('Projects container:', document.getElementById('projects-container'));
    
    showNotification('Test completed! Check console for details.', 'success');
}
