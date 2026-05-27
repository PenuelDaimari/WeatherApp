const enterName = document.getElementById("search-button")
const input = document.getElementById("city-input")
const button = document.getElementById("get-location-button")
const name = document.getElementById("name")

const cityName = document.getElementById("city-name");
const cityLat = document.getElementById("city-lat");
const cityLon = document.getElementById("city-lon");
const cityTime = document.getElementById("city-time");
const cityTemperature = document.getElementById("city-temperature");
const cityHumidity = document.getElementById("city-humidity");
const cityChanceOfRain = document.getElementById("city-chance-of-rain");
const info = document.getElementById("info");

async function getData(lat, long) {
    const response = await fetch(
        `http://localhost:5000/weather?lat=${lat}&lon=${long}`
    );
    return await response.json();
}

const uName = localStorage.getItem("userName")

if(uName == null){
    name.innerText = `Mr. Unknown Enter Your Name`;
}
else{
    name.innerText = `Hi ${uName}!\nGet your location to know the weather at your place`;
}

enterName.addEventListener("click", () => {
    const value = input.value;
    localStorage.setItem("userName",value);
    location.reload();
})

let lat;
let long;

function failedToGetLocation(error) {
    console.log("Error:", error.message);
}

async function gotLocation(position) {

    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const result = await getData(lat, long);

    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityLat.innerText = `Latitude: ${result.location.lat}`;
    cityLon.innerText = `Longitude: ${result.location.lon}`;
    cityTime.innerText = `Time: ${result.location.localtime}`;
    cityTemperature.innerText = `Temperature: ${result.current.temp_c}°C`;
    cityHumidity.innerText = `Humidity: ${result.current.humidity}`;
    cityChanceOfRain.innerText = `Chance of Rain: ${result.current.chance_of_rain}%`;

    let temperature = result.current.temp_c;

    const minTemp = -20;
    const maxTemp = 50;

    const t = Math.max(minTemp, Math.min(maxTemp, temperature));
    const p = (t - minTemp) / (maxTemp - minTemp);
    const hue = 240 - (240 * p);

    info.style.color = `hsl(${hue}, 100%, 50%)`;
}

button.addEventListener("click", () => {

    if(uName == null){
        alert("First Enter Your Name Mr. Unknown");
    }
    else{
        navigator.geolocation.getCurrentPosition(
            gotLocation,
            failedToGetLocation
        );
    }
});