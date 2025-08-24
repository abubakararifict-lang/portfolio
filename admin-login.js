// Admin Login JavaScript

// Admin credentials (you can change these)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'portfolio123'
};

// Session timeout (in minutes)
const SESSION_TIMEOUT = 30;

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkExistingSession();
});

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Password toggle
    document.getElementById('toggle-password').addEventListener('click', togglePassword);
    
    // Enter key on password field
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate inputs
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Successful login
        showNotification('Login successful! Redirecting...', 'success');
        
        // Set session
        setSession(remember);
        
        // Redirect to admin panel after a short delay
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
        
        // Update button state
        updateLoginButtonState(true);
    } else {
        // Failed login
        showNotification('Invalid username or password', 'error');
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
        
        // Shake animation
        shakeForm();
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
        toggleBtn.title = 'Hide password';
    } else {
        passwordInput.type = 'password';
        icon.className = 'fas fa-eye';
        toggleBtn.title = 'Show password';
    }
}

// Set admin session
function setSession(remember = false) {
    const sessionData = {
        isLoggedIn: true,
        username: ADMIN_CREDENTIALS.username,
        loginTime: new Date().getTime(),
        expiresAt: new Date().getTime() + (SESSION_TIMEOUT * 60 * 1000)
    };
    
    if (remember) {
        // Store in localStorage for persistent session
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
    } else {
        // Store in sessionStorage for browser session only
        sessionStorage.setItem('adminSession', JSON.stringify(sessionData));
    }
}

// Check if user is already logged in
function checkExistingSession() {
    const sessionData = JSON.parse(localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession') || '{}');
    
    if (sessionData.isLoggedIn && sessionData.expiresAt > new Date().getTime()) {
        // Valid session exists, redirect to admin panel
        showNotification('Welcome back! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    }
}

// Update login button state
function updateLoginButtonState(isLoading) {
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');
    const icon = loginBtn.querySelector('i');
    
    if (isLoading) {
        loginBtn.disabled = true;
        loginBtn.classList.add('opacity-75', 'cursor-not-allowed');
        loginText.textContent = 'Logging in...';
        icon.className = 'fas fa-spinner fa-spin mr-2';
    } else {
        loginBtn.disabled = false;
        loginBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        loginText.textContent = 'Login to Admin Panel';
        icon.className = 'fas fa-sign-in-alt mr-2';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationMessage = document.getElementById('notification-message');
    
    // Set notification content
    notificationMessage.textContent = message;
    
    // Set icon and colors based on type
    switch (type) {
        case 'success':
            notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 bg-green-500 text-white';
            notificationIcon.className = 'fas fa-check-circle';
            break;
        case 'error':
            notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 bg-red-500 text-white';
            notificationIcon.className = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 bg-yellow-500 text-white';
            notificationIcon.className = 'fas fa-exclamation-triangle';
            break;
        default:
            notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 bg-blue-500 text-white';
            notificationIcon.className = 'fas fa-info-circle';
    }
    
    // Show notification
    notification.classList.remove('hidden');
    notification.classList.remove('translate-x-full');
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 4000);
}

// Shake form animation for failed login
function shakeForm() {
    const form = document.getElementById('login-form');
    form.classList.add('animate-shake');
    
    setTimeout(() => {
        form.classList.remove('animate-shake');
    }, 500);
}

// Add shake animation CSS
const shakeCSS = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .animate-shake {
        animation: shake 0.5s ease-in-out;
    }
`;

// Inject shake animation CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Auto-focus username field
document.getElementById('username').focus();

// Add some security features
document.addEventListener('keydown', function(e) {
    // Prevent F12 key
    if (e.key === 'F12') {
        e.preventDefault();
        showNotification('Developer tools are disabled for security', 'warning');
    }
    
    // Prevent right-click context menu
    if (e.button === 2) {
        e.preventDefault();
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Right-click is disabled for security', 'warning');
});

// Add loading state to form submission
function addLoadingState() {
    updateLoginButtonState(true);
    
    // Simulate loading delay
    setTimeout(() => {
        updateLoginButtonState(false);
    }, 2000);
}

// Enhanced security: Check for multiple failed attempts
let failedAttempts = 0;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkFailedAttempts() {
    const lastFailedTime = localStorage.getItem('lastFailedLogin');
    const currentTime = new Date().getTime();
    
    if (lastFailedTime && (currentTime - parseInt(lastFailedTime)) < LOCKOUT_DURATION) {
        if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
            const remainingTime = Math.ceil((LOCKOUT_DURATION - (currentTime - parseInt(lastFailedTime))) / 60000);
            showNotification(`Account temporarily locked. Try again in ${remainingTime} minutes.`, 'error');
            return false;
        }
    } else {
        // Reset failed attempts after lockout period
        failedAttempts = 0;
        localStorage.removeItem('lastFailedLogin');
    }
    
    return true;
}

// Update the handleLogin function to include failed attempts tracking
const originalHandleLogin = handleLogin;
function handleLogin(e) {
    e.preventDefault();
    
    // Check if account is locked
    if (!checkFailedAttempts()) {
        return;
    }
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate inputs
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Successful login
        failedAttempts = 0;
        localStorage.removeItem('lastFailedLogin');
        showNotification('Login successful! Redirecting...', 'success');
        
        // Set session
        setSession(remember);
        
        // Redirect to admin panel after a short delay
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
        
        // Update button state
        updateLoginButtonState(true);
    } else {
        // Failed login
        failedAttempts++;
        localStorage.setItem('lastFailedLogin', new Date().getTime().toString());
        
        if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
            showNotification('Too many failed attempts. Account locked for 15 minutes.', 'error');
        } else {
            const remainingAttempts = MAX_FAILED_ATTEMPTS - failedAttempts;
            showNotification(`Invalid credentials. ${remainingAttempts} attempts remaining.`, 'error');
        }
        
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
        
        // Shake animation
        shakeForm();
    }
}

// Replace the original function
window.handleLogin = handleLogin;
