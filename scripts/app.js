const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const {cityDets, weather} = data;

    // Update Weather details
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

    // Update images and icons
    let iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    let timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';
    time.setAttribute('src', timeSrc);

    // Remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get City Value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Set Local Storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city') != null) {
    // Update UI with new city
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}