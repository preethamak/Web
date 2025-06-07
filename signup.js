// Form handling and validation
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const container = document.querySelector('.container');
const toggleButton = document.querySelector('.toggle-button');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');

// Smooth transition between login and signup
toggleButton.addEventListener('click', () => {
  container.classList.toggle('active');
});

// Handle form submissions with improved performance
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Show success animation
      const card = document.querySelector('.card-main');
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0';
      
      // Redirect after animation
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 300);
    } else {
      loginError.textContent = data.error;
      loginError.classList.remove('hidden');
      
      // Shake animation for error
      const card = document.querySelector('.card-main');
      card.style.animation = 'shake 0.5s';
      setTimeout(() => {
        card.style.animation = '';
      }, 500);
    }
  } catch (error) {
    console.error('Login error:', error);
    loginError.textContent = 'An error occurred. Please try again.';
    loginError.classList.remove('hidden');
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('signup-name').value;

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success animation
      const card = document.querySelector('.card-alt');
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0';
      
      // Redirect to login after animation
      setTimeout(() => {
        container.classList.remove('active');
        card.style.transform = '';
        card.style.opacity = '';
      }, 300);
    } else {
      signupError.textContent = data.error;
      signupError.classList.remove('hidden');
      
      // Shake animation for error
      const card = document.querySelector('.card-alt');
      card.style.animation = 'shake 0.5s';
      setTimeout(() => {
        card.style.animation = '';
      }, 500);
    }
  } catch (error) {
    console.error('Signup error:', error);
    signupError.textContent = 'An error occurred. Please try again.';
    signupError.classList.remove('hidden');
  }
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Add event listeners
if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (signupForm) signupForm.addEventListener('submit', handleSignup);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginCard = document.querySelector('.card-main');
    const signupCard = document.querySelector('.card-alt');
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const errorMessages = document.querySelectorAll('.error-message');

    // Toggle between login and signup forms
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            loginCard.classList.toggle('card-main');
            loginCard.classList.toggle('card-alt');
            signupCard.classList.toggle('card-main');
            signupCard.classList.toggle('card-alt');
        });
    });

    // Form validation and submission
    loginForm.addEventListener('submit', handleFormSubmit);
    signupForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const errors = validateForm(formData, form.id);

        if (errors.length > 0) {
            showErrors(form, errors);
            return;
        }

        // Simulate form submission
        simulateSubmission(form);
    }

    function validateForm(formData, formId) {
        const errors = [];
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        if (formId === 'signupForm') {
            const confirmPassword = formData.get('confirmPassword');
            if (password !== confirmPassword) {
                errors.push('Passwords do not match');
            }
        }

        return errors;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showErrors(form, errors) {
        const errorContainer = form.querySelector('.error-message');
        errorContainer.textContent = errors.join('\n');
        errorContainer.classList.remove('hidden');
        form.classList.add('shake');

        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }

    function simulateSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Success!';
            submitButton.classList.add('success');
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('success');
                form.reset();
            }, 2000);
        }, 1500);
    }

    // Add input validation on blur
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => {
            const form = input.closest('form');
            const formData = new FormData(form);
            const errors = validateForm(formData, form.id);
            
            if (errors.length > 0) {
                showErrors(form, errors);
            } else {
                form.querySelector('.error-message').classList.add('hidden');
            }
        });
    });
}); 