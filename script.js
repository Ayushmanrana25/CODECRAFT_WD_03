'use strict'

const form = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');


const getLocation = function(){

}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const locationInput = document.getElementById('locationInput').value.trim();
    form.value='';

    const apiKey = '25224dde9c4a49c2a9041208240407';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
            } else {
                const { location, current } = data;
                const { name, region, country } = location;
                const { temp_c, condition, wind_kph, humidity } = current;

                weatherInfo.innerHTML='';

                const html = `
                    <h2>${name}, ${region}, ${country}</h2>
                    <p>Temperature: ${temp_c}°C</p>
                    <p>Condition: ${condition.text}</p>
                    <p>Wind: ${wind_kph} km/h</p>
                    <p>Humidity: ${humidity}%</p>
                `
                weatherInfo.insertAdjacentHTML('afterbegin', html)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        });
});
