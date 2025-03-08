// Replace this with your actual OpenWeatherMap API key
const apiKey ='42a8b9ea478132ee074d8a50ee5be782';

// Get references to HTML elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherOutput = document.getElementById('weather-output');

// Function to fetch weather data
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch weather data from the API
    const response = await fetch(url);

    // If the response is not ok (status code is not 200)
    if (!response.ok) {
      throw new Error('City not found!');
    }

    // Parse the response data
    const data = await response.json();

    // Display the weather data
    displayWeather(data);
  } catch (error) {
    // Handle errors like invalid city name or network issues
    weatherOutput.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// Function to display the weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  const temp = main.temp;
  const description = weather[0].description;

  // Update the weather output with the fetched data
  weatherOutput.innerHTML = `
    <p class="success">Weather in ${name}:</p>
    <p>Temperature: ${temp}°C</p>
    <p>Description: ${description}</p>
  `;
}

// Event listener for the button to get weather
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim(); // Get the city name input by the user

  // Check if city input is empty
  if (city) {
    fetchWeather(city); // Fetch weather data for the entered city
  } else {
    // Display an error if no city is entered
    weatherOutput.innerHTML = '<p class="error">Please enter a city name!</p>';
  }
});
