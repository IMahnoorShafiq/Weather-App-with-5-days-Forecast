document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    const apiKey = '5560694c5487df96c723cdd3a1997398';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const cityName = data.city.name;
    const currentTemp = data.list[0].main.temp;
    const weatherDescription = data.list[0].weather[0].description;
    const weatherIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('currentTemp').textContent = `${currentTemp}°C`;
    document.getElementById('weatherDescription').textContent = weatherDescription;
    document.getElementById('weatherIcon').src = weatherIcon;

    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous forecast
// Forecast loop for next five days
    for (let i = 0; i < 5; i++) {
        // 3-hour intervals, so 8 intervals per day
        const forecastDay = data.list[i * 8]; 
        const date = new Date(forecastDay.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
        const temp = forecastDay.main.temp;
        const icon = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;
// Creating Elements for forecasts further 
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="Weather Icon">
            <p>${temp}°C</p>
        `;
// This appends the forecastElement to the forecastContainer, making it visible on the webpage.
        forecastContainer.appendChild(forecastElement);
    }
}
