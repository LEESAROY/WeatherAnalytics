const geocodeBase = 'https://geocoding-api.open-meteo.com/v1/search';
const weatherBase = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(city = 'Toronto') {
    try {
        const geoRes = await fetch(`${geocodeBase}?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results || !geoData.results[0]) throw new Error('City not found');

        const { latitude: lat, longitude: lon } = geoData.results[0];

        const weatherRes = await fetch(`${weatherBase}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation`);
        const weatherData = await weatherRes.json();

        return { city, lat, lon, weather: weatherData };
    } catch (err) {
        console.error(err);
        return null;
    }
}
