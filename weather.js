const citiesURL = "https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json";
const reg = document.getElementById("reg");
const city = document.getElementById("city");

let regions = [];
let cities = [];
let coordinates = [];

fetch(citiesURL).then(response => {
    return response.json();
}).then(data => {
    cities = data[0].regions;
    data[0].regions.forEach(item => {
        regions.push(item.name);
    })
    let newRegions = regions.map((item, index) => {
        return `<option value=${index}>${item}</option>`;
    })
    reg.innerHTML = newRegions.join('');
})

reg.addEventListener('change', e => {
    let newCities = cities[e.target.value].cities.map((item, index) => {
        coordinates.push(item);
        return `<option value=${index}>${item.name}</option>`;
    })
    city.innerHTML = newCities.join('');

    city.addEventListener('change', e => {
        let lat = coordinates[e.target.value].lat;
        let lng = coordinates[e.target.value].lng;

        const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&lang=ru&appid=9fc9593c21d5e889cf2bf0fc1c814aba";

        fetch(weatherURL).then(response => {
            return response.json();
        }).then(data => {
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.desc').innerHTML = data.weather[0].description;
            document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        })
    })
})




