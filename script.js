document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");

    if (location === "") {
        resultDiv.innerHTML = "<p class='error'>Please enter a location.</p>";
        return;
    }

    const apiKey = "7f0de3eb57ef46df91c52423250311";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Location not found");
        }

        const data = await response.json();

        resultDiv.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <div class="temperature">${data.current.temp_c}°C</div>
            <div class="condition">${data.current.condition.text}</div>
            <img src="https:${data.current.condition.icon}" alt="Weather icon">
        `;

    } catch (error) {
        resultDiv.innerHTML = "<p class='error'>Error fetching weather data. Please try again.</p>";
    }
}