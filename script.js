const apiKey = "be7e338074494e8fb25182205262905";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if(city === "")
  {
    alert("Please enter city");
    return;
  }

  getWeather(city);

});
cityInput.addEventListener("keypress", function(event) 
{

  if(event.key === "Enter")
  {
    getWeather(cityInput.value);
  }

});
async function getWeather(city)
{
  weatherResult.innerHTML = "<p>Loading weather data...</p>";
  const url =
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    if(data.error)
    {
      weatherResult.innerHTML = `
        <p>Please enter a valid city name</p>
      `;
      return;
    }

    weatherResult.innerHTML = `
  <h2>${data.location.name}, ${data.location.country}</h2>

  <img src="${data.current.condition.icon}" alt="Weather Icon">

  <h3>${data.current.condition.text}</h3>

  <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>

  <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>

  <p><strong>Humidity:</strong> ${data.current.humidity}%</p>

  <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>

  <p><strong>Last Updated:</strong> ${data.current.last_updated}</p>
`;

  }
  catch(error)
  {

    weatherResult.innerHTML = `
      <p>unable to fetch weather data.please check your internet connection</p>
    `;

    console.log(error);
  }
  
}