import { checkAuth, logout } from './auth.js';

export function initRouter() {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        // Update Login -> Logout if logged in
        if (link.textContent === 'Login' && checkAuth()) {
            link.textContent = 'Logout';
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }

        // Handle Logout link clicks
        if (link.textContent === 'Logout') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    });

    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'home.html', 'about.html'];

    // Redirect if not authenticated
    if (protectedPages.includes(currentPage) && !checkAuth()) {
        window.location.href = 'login.html';
    }

    // Redirect from login page if already logged in
    if (currentPage === 'login.html' && checkAuth()) {
        window.location.href = 'dashboard.html';
    }
}
