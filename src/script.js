import * as loadTable from "./load.js";

loadTable.loadTable();
const API_KEY = "E2KBGH5HQES72K7J2XDWC3Q5S";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

// Main Event Listener
const form = document.querySelector("form");
const input = document.querySelector("input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  makeQuery(input.value);
});

/*** Query Related ***/
class API_REQUEST {
  constructor(location, date1, date2) {
    this.query =
      BASE_URL + "/" + location + "/" + date1 + "/" + date2 + "?key=" + API_KEY;
  }
}

function makeQuery(searchValue) {
  const date = getFormattedDate();
  const queryObject = new API_REQUEST(searchValue, date[0], date[1]);

  getData(queryObject.query)
    // Get a promise
    .then((response) => {
      // Return a JSON object
      console.log(response);
      return response.json();
    })
    .then((data) => {
      display(processData(data));
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getData(query) {
  const weatherData = await fetch(query);
  return weatherData;
}

/*** Data Processing ***/
const processData = function (data) {
  try {
    const forecastConditions = data.days;
    console.log(forecastConditions);

    /*
  const currentConditionsResult = {
    address: data.address,
    temp: currentConditions.temp,
    conditions: currentConditions.conditions,
    feelslike: currentConditions.feelslike,
    humidity: currentConditions.humidity,
    precipprob: currentConditions.precipprob,
    uvindex: currentConditions.uvindex,
    icon: currentConditions.icon,
  };
  */

    const forecastConditionsResult = {};
    for (let i = 0; i < 7; i++) {
      forecastConditionsResult[i] = {
        datetime: forecastConditions[i].datetime,
        //conditions: forecastConditions[i].conditions,
        tempmin: forecastConditions[i].tempmin,
        tempmax: forecastConditions[i].tempmax,
        //uvindex: forecastConditions[i].uvindex,
        //windspeed: forecastConditions[i].windspeed,
        icon: forecastConditions[i].icon,
      };
    }

    return { forecastConditionsResult };
  } catch (error) {
    console.log(data);
  }
};

/*** User Interface ***/
const display = function (data) {
  for (let i = 0; i < 7; i++) {
    for (const [key, el] of Object.entries(data.forecastConditionsResult[i])) {
      try {
        if (key === "icon") {
          let icon = document.querySelector(`tr:nth-child(${i + 1}) img`);
          if (!icon) {
            icon = document.createElement("img");
          }
          icon.src = icons[el];
          document
            .querySelector(`tr:nth-child(${i + 1}) .${key}`)
            .appendChild(icon);
        } else if (key === "datetime") {
          const date = getWeekDay(el);
          document.querySelector(`tr:nth-child(${i + 1}) .${key}`).textContent =
            date;
        } else {
          document.querySelector(`tr:nth-child(${i + 1}) .${key}`).textContent =
            el;
        }
      } catch (err) {
        console.log(key, i);
      }
    }
  }
};

const icons = {
  snow: "../icons/snow.svg",
  rain: "../icons/rain.svg",
  fog: "../icons/fog.svg",
  wind: "../icons/wind.svg",
  cloudy: "../icons/cloudy.svg",
  "partly-cloudy-day": "../icons/partly-cloudy-day.svg",
  "partly-cloudy-night": "../icons/partly-cloudy-night.svg",
  "clear-day": "../icons/clear-day.svg",
  "clear-night": "../icons/clear-day.svg",
};

/*** Helper ***/
const getFormattedDate = function () {
  const fromDate = new Date();
  const toDate = new Date();

  toDate.setDate(toDate.getDate() + 6);

  fromDate.setFullYear(fromDate.getFullYear() - 50);
  toDate.setFullYear(toDate.getFullYear() - 50);

  return [
    fromDate.toISOString().slice(0, 10),
    toDate.toISOString().slice(0, 10),
  ];
};

const getWeekDay = function (dateString) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  return dayNames[date.getDay()];
};
