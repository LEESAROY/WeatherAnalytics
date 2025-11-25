export function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const formError = document.getElementById('formError');
    if (!loginForm) return;

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            formError.textContent = 'Email and password are required';
            formError.classList.remove('hidden');
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email check
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

        if (!emailRegex.test(email)) {
            formError.textContent = 'Please enter a valid email address';
            formError.classList.remove('hidden');
            return;
        }

        if (!passwordRegex.test(password)) {
            formError.textContent = 'Password must be at least 6 characters long, include uppercase, lowercase, number, and special character';
            formError.classList.remove('hidden');
            return;
        }

        // Demo validation
        if (email === 'demo@company.com' && password === 'Demo123!') {
            localStorage.setItem('auth', 'true');
            window.location.href = 'dashboard.html';
        } else {
            formError.textContent = 'Invalid demo credentials!';
            formError.classList.remove('hidden');
        }
    });
}

export function checkAuth() {
    return localStorage.getItem('auth') === 'true';
}

export function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'login.html';
}
