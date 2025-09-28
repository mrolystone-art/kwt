document.addEventListener("DOMContentLoaded", function() {
  // API details
  const API_KEY = 'fbc86c03bcd3b4aa44d72af0c5bdd2d5'; // Get free from openweathermap.org
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const input = document.getElementById("cityInput");
  const button = document.getElementById("Btn");
  const result = document.getElementById("results");

  // fetch weather data
  async function getWeather(city) {
    try {
      // Build API URL
      const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

      // Fetch data from APIa
      const response = await fetch(url); // fetch returns a promise
      if (!response.ok) {
        throw new Error("City not found");
      }

      // Convert response to JSON
      const data = await response.json();

      // Extract useful info
      const temperature = data.main.temp;
      const description = data.weather[0].description;

      // Display result
      result.innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>Temperature: ${temperature}℃</p>
        <p>Condition: ${description}</p>
      `;
    } catch (error) {
      // Handle errors (e.g., wrong city name)
      result.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }

  // Add click event to button
  button.addEventListener("click", () => {
    const city = input.value.trim();
    if (city) {
      getWeather(city); // call async function
    } else {
      result.innerHTML = "<p style='color:red;'>Please enter a city name!</p>";
    }
  });
});

