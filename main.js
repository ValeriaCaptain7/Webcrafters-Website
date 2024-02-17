new Vue({
  el: "#app",
  data: {
      accordions: [
        { question: "What is the CSS transform property used for?", answer: "The transform property in CSS is used to apply 2D and 3D transformations to elements." },
        { question: "What does the CSS transform property allows you to do?", answer: "It allows you to translate, rotate, scale, and skew elements, providing a way to modify their appearance and position on the page." },
        { question: "Can multiple transformations be combined using the transform property?", answer: "Yes, you can combine multiple transformations by listing them within the transform property. Check out our content to find out how to." },
        { question: "What is the difference between transform and position properties in CSS?", answer: "The position property is used to set the positioning method of an element within its containing element, while the transform property is used to modify an element's visual appearance, such as translation, rotation, scaling, or skewing. They serve different purposes but can be used together to achieve specific layouts or effects." },
        { question: "Is the transform property supported in all browsers?", answer: "Generally yes, this property is well-supported in modern browsers. However, it's always a good practice to check its compatibility with different browsers." }
      ],
    basics: {
      title: "Basics of transform",
      description: "CSS transformations are key to shaping how web elements appear. The transform property empowers you to precisely adjust element position, rotation, scale, and skew, unlocking creative possibilities in web design. Explore the transformative capabilities further and enhance your web design skills.",
    },
    advanced: {
      title: "Advanced techniques",
      description: "While 2D transformations allow you to manipulate elements on a flat plane, 3D transformations add depth and perspective to your designs. Discover three-dimensional transformations and explore how to bring an extra dimension to your web elements.",
    },
    practices: {
      title: "Best practices",
      description: "Learn best practices for effective and efficient use of the transform property. Discover tips for performance optimization, responsive design, and accessibility considerations.",
    },
    resources: {
      title: "Resources",
      description: "Explore additional resources and tools to enhance your knowledge of CSS transformations. Recommended reading, video tutorials, code snippets, tools, and community forums await you.",
    },
    activeAccordion: null,
    isOpen: false,
  },
  methods: {
      toggleAccordion(index) {
        this.activeAccordion = this.activeAccordion === index ? null : index;
      },
      toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  }
});


//Weather app with geo-localization
//Weather app with geo-localization
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML += `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> 18° </span>
              <span class="weather-forecast-temperature-min"> 12° </span>
            </div>
          </div>
        `;
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let visibilityElement = document.querySelector("#visibility");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  visibilityElement.innerHTML = response.data.visibility / 1000;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchLocation(latitude, longitude) {
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      searchLocation(latitude, longitude);
    });
  } else {
    alert("Geolocation not supported. Try again.");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocationButton = document.querySelector("#showPosition");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Default city
search("Rome");
