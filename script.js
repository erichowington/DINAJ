const baseUrl = "https://api.openweathermap.org";
const key = "db1ac38dac6827d5ace292718e7f7db1";

const inputTag = document.querySelector("input")
const button = document.querySelector("button")
const reportDiv = document.querySelector(".Report")


function fetchWeather(city) {
    fetch(`${baseUrl}/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            displayResults(res)
        })
        .catch(err => {
            console.log("something went wrong...", err);
        });
}

button.addEventListener("click", () => {
    const userValue = inputTag.value
console.log(userValue)
    const foundCity = userValue
    
    console.log("Found city: ", foundCity)

    fetchWeather(foundCity)
})

function displayResults(weatherData) {
    console.log(weatherData)
    let htmlMock
    if (weatherData.main.temp < 25) {
        htmlMock = `
        <h2>YEAH, YOU NEED A WINTER JACKET</h2>
        <p>${weatherData.main.temp}</p>
    `
    }
    else if (weatherData.main.temp > 25 && weatherData.main.temp <= 45){
        htmlMock=`
        <h2>YEAH,YOU NEED A MEDIUM JACKET</h2>
        <p>The current temp is ${weatherData.main.temp} degrees. </p>
    `
    }
    else if (weatherData.main.temp > 45 && weatherData.main.temp <= 64){
        htmlMock=`
        <h2>YEAH, YOU COULD USE A LIGHT JACKET(or a sweatshirt)</h2>
        <p>The current temp is ${weatherData.main.temp} degrees.</p>
        
    `
    }
    else if (weatherData.main.temp > 65){
        htmlMock=`
        <h2>NOPE, SHORT SLEEVES WOO HOO</h2>
        <p>The current temp is ${weatherData.main.temp} degress.</p>
        
    `}

    reportDiv.innerHTML = "";

    reportDiv.insertAdjacentHTML("beforeend", htmlMock)
}


