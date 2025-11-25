import { initAuth, checkAuth, logout } from './auth.js';
import { fetchWeather } from './api.js';
import { initCharts } from './charts.js';

export function initUI() {
    initAuth();

    // Dashboard
    const tempCtx = document.getElementById('tempChart')?.getContext('2d');
    const rainCtx = document.getElementById('rainChart')?.getContext('2d');
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    const searchSpinner = document.getElementById('searchSpinner');
    const searchForm = document.getElementById('searchForm');

    async function loadWeather(city) {
        showButtonLoader();
        try {
            const data = await fetchWeather(city);
            if (!data) return;
            document.getElementById('locName').textContent = data.city;
            document.getElementById('locCoords').textContent = `${data.lat}, ${data.lon}`;
            document.getElementById('currentTemp').textContent = `${data.weather.hourly.temperature_2m[0]}°C`;
            document.getElementById('currentCond').textContent = 'Weather Data';

            initCharts(tempCtx, rainCtx, data.weather);

            const summary = document.getElementById('summaryList');
            summary.innerHTML = '';
            summary.innerHTML += `<li>Temperature range: ${Math.min(...data.weather.hourly.temperature_2m)} - ${Math.max(...data.weather.hourly.temperature_2m)} °C</li>`;
            summary.innerHTML += `<li>Total precipitation: ${data.weather.hourly.precipitation.reduce((a, b) => a + b, 0).toFixed(2)} mm</li>`;
        }
        catch (err) {
            console.error(err);
            alert("Failed to load weather data");
        }
        finally {
            hideButtonLoader();
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const city = cityInput.value || 'Toronto';
            loadWeather(city);
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', e => {
            e.preventDefault();
            const city = cityInput.value || 'Toronto';
            loadWeather(city);
        });
    }

    // Load default dashboard city
    if (tempCtx && rainCtx) loadWeather('Toronto');

    // Logout links
    document.querySelectorAll('a.nav-link').forEach(link => {
        if (link.textContent === 'Logout') link.addEventListener('click', logout);
    });

    // Loader
    function showButtonLoader() {
        searchText.classList.add('hidden');
        searchSpinner.classList.remove('hidden');
        searchBtn.disabled = true;
    }

    function hideButtonLoader() {
        searchText.classList.remove('hidden');
        searchSpinner.classList.add('hidden');
        searchBtn.disabled = false;
    }
}
