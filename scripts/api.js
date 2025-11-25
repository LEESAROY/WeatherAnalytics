const geocodeBase = 'https://nominatim.openstreetmap.org/search';
const weatherBase = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(city = 'Toronto') {
    try {
        const geoRes = await fetch(`${geocodeBase}?q=${city}&format=json&limit=1`);
        const geoData = await geoRes.json();
        if (!geoData[0]) throw new Error('City not found');

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        const weatherRes = await fetch(`${weatherBase}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation`);
        const weatherData = await weatherRes.json();

        return { city, lat, lon, weather: weatherData };
    } catch (err) {
        console.error(err);
        return null;
    }
}
