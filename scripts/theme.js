// Dark Mode + Gradient UI Toggle

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

if (localStorage.theme === "dark") {
    html.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️"; // Sun icon for dark mode active
} else {
    html.classList.remove("dark");
    if (themeToggle) themeToggle.textContent = "🌙"; // Moon icon for light mode
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
            localStorage.theme = "dark";
            themeToggle.textContent = "☀️";
        } else {
            localStorage.theme = "light";
            themeToggle.textContent = "🌙";
        }
    });
}

if (!localStorage.theme) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark");
    } else {
        html.classList.remove("dark");
    }
}
