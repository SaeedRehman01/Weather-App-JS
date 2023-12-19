// API key for the OpenWeatherMap API
// Link to create new account - https://home.openweathermap.org/users/sign_up
const apiKey = "YOUR_API_KEY_HERE";

// Base URL for the weather data API
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selectors for various elements in the HTML
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBackground = document.querySelector(".card");

// Async function to fetch and display weather data for a specified city
async function checkWeather(city) {
  // Fetch weather data from the API
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Handle errors like incorrect city name
  if (response.status == 404 || response.status == 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Parse the JSON response
    var data = await response.json();
    console.log(data);

    // Update the DOM elements with the weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + '<sup class="degree">°C</sup>';
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Change the weather icon and background based on the current weather
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      weatherBackground.style.background = "linear-gradient(#03a9f4, #00bcd4)";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      weatherBackground.style.background =
        "linear-gradient(#9dbcd4, #7a9ebf, #627c9b, #4e6478)";
    } else if ((data.weather[0].main = "Drizzle")) {
      weatherIcon.src = "images/drizzle.png";
      weatherBackground.style.background =
        "linear-gradient(#c5d0d8, #aebfc8, #98aeb8, #829da8)";
    } else if ((data.weather[0].main = "Clear")) {
      weatherIcon.src = "images/clear.png";
      weatherBackground.style.background =
        "linear-gradient(#f7c965, #eaad26, #f29e50, #ff7f4d)";
    } else if ((data.weather[0].main = "Mist")) {
      weatherIcon.src = "images/mist.png";
      weatherBackground.style.background =
        "linear-gradient(#e6e8ea, #d3d5d8, #bfc2c5, #abadb0)";
    } else if ((data.weather[0].main = "Snow")) {
      weatherIcon.src = "images/snow.png";
      weatherBackground.style.background =
        "linear-gradient(#848a90, #c2c9d1, #bdc3cd, #c0c5d0)";
    }

    // Display the weather information and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  // Call checkWeather function with the value from the search box
  checkWeather(searchBox.value);
});
