document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    const apiKey = '5560694c5487df96c723cdd3a1997398';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
            document.getElementById('errorMessage').style.display = 'none'; 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError(error.message);
        });
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

    for (let i = 0; i < 5; i++) {
        const forecastDay = data.list[i * 8];
        const date = new Date(forecastDay.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
        const temp = forecastDay.main.temp;
        const icon = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="Weather Icon">
            <p>${temp}°C</p>
        `;

        forecastContainer.appendChild(forecastElement);
    }
}

function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
