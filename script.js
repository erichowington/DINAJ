const baseUrl = "https://api.openweathermap.org";
const key = "db1ac38dac6827d5ace292718e7f7db1";

const inputTag = document.querySelector("input");
const button = document.querySelector("button");
const reportDiv = document.querySelector(".report");

function fetchWeather(city) {
  fetch(`${baseUrl}/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      displayResults(res);
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
}

button.addEventListener("click", () => {
  const userValue = inputTag.value;
  console.log(userValue);
  const foundCity = userValue;

  console.log("Found city: ", foundCity);

  fetchWeather(foundCity);
});

function displayResults(weatherData) {
  console.log(weatherData.name);
  let htmlMock;
  const roundedTemp = Math.floor(weatherData.main.temp);
  if (weatherData.main.temp < 25) {
    htmlMock = `
        <h1>${weatherData.name}</h1>
        <h2>YEAH, YOU NEED A WINTER JACKET</h2>
        <p>${roundedTemp}</p>
    `;
  } else if (weatherData.main.temp > 25 && weatherData.main.temp <= 45) {
    htmlMock = `
        <h1>${weatherData.name}</h1>
        <h2>YEAH,YOU NEED A MEDIUM JACKET</h2>
        <p>The current temp is ${roundedTemp} degrees. </p>
    `;
  } else if (weatherData.main.temp > 45 && weatherData.main.temp <= 64) {
    htmlMock = `
        <h1>${weatherData.name}</h1>
        <h2>YEAH, YOU COULD USE A LIGHT JACKET(or a sweatshirt)</h2>
        <p>The current temp is ${roundedTemp} degrees.</p>
        
    `;
  } else if (weatherData.main.temp > 65) {
    htmlMock = `
        <h2>NOPE, SHORT SLEEVES WOO HOO</h2>
        <p>The current temp is ${roundedTemp} degress.</p>
        
    `;
  }

  reportDiv.innerHTML = "";
  reportDiv.insertAdjacentHTML("beforeend", htmlMock);

  const WEATHER_DATA_NAMES = {
    temp: "Temperature",
    feels_like: "Feels like",
    temp_min: "Min Temp.",
    temp_max: "Max Temp.",
    pressure: "Pressure",
    humidity: "Humidity",
  };

  const extendedReportList = document.querySelector(".extended-report__list");
  extendedReportList.replaceChildren([]);

  Object.entries(weatherData.main).forEach((entry) => {
    const [field, value] = entry;
    const listItem = document.createElement("li");
    listItem.classList.add("extended-report__item");
    listItem.innerHTML = `<span>${WEATHER_DATA_NAMES[field]}</span><span>${value}</span>`;
    extendedReportList.appendChild(listItem);
  });
}

const setIsLoading = (isLoading) => {
  if (isLoading) {
    // Show loading spinner
    console.log("Showing loading spinner");
    document.querySelector(".loading-spinner").style.display = "block";
  } else {
    // Hide loading spinner
    console.log("Hiding loading spinner");
    document.querySelector(".loading-spinner").style.display = "none";
  }
};

setIsLoading(true);

navigator.geolocation.getCurrentPosition((position) => {
  console.log("position is: ", position);
  fetch(
    `${baseUrl}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      displayResults(res);
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    })
    .finally(() => {
      setIsLoading(false);
    });
});