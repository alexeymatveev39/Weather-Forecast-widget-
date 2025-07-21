document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '2f2178ea14a82eb6c04a983e8153d238';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=54.7065&lon=20.511&appid=${apiKey}&units=metric&lang=ru`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('weather-widget').innerHTML = 
                '<p>Не удалось загрузить данные о погоде</p>';
        });

    function displayWeather(data) {
        const weatherWidget = document.getElementById('weather-widget');
        
        const description = data.weather[0].description.charAt(0).toUpperCase() + 
                          data.weather[0].description.slice(1);
        
        weatherWidget.innerHTML = `
            <div class="weather-city">Калининград</div>
            <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
            <div class="weather-description">${description}</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <span class="detail-icon">💧</span>
                    <span>${data.main.humidity}%</span>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">🌬️</span>
                    <span>${data.wind.speed} м/с</span>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">🌡️</span>
                    <span>Ощущается как ${Math.round(data.main.feels_like)}°C</span>
                </div>
            </div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].main}">
            </div>
        `;
    }
});