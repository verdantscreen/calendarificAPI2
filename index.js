//html target
const selectCountry = document.getElementById("selectCountry");
const anotherHoliday = document.getElementById("anotherHoliday");

//base api url and key
const apiData = {
  base: "https://calendarific.com/api/v2/holidays",
  key: "?&api_key=f8da2cc053fa96518340c0766a9eafd35a3f7d5b",
  countries: "https://calendarific.com/api/v2/countries", //for use in dd
};

const { base, key, countries } = apiData;

// drop down variables
let countriesArr = `${countries}${key}`;
console.log(countriesArr);

//establish html targets - populate dropdowns
// fill w array of iso-3166 values from the countries supported by calendarific
function jsonCountriesArr() {
  fetch(countriesArr)
    .then((response) => response.json())
    .then((json) => {
      json.response.countries.map(function (details) {
        let option = document.createElement("option");
        option.text = details.country_name;
        option.value = details["iso-3166"];
        selectCountry.insertBefore(option, selectCountry.lastChild);
      });
    });
}
jsonCountriesArr();

// eventListener for drop down
selectCountry.addEventListener("change", (event) => {
  jsonHoliday(event.target.value);
});

// eventListener for button: I want the button to keep the same selected URL but rerun the random holiday aspect of it.
/*anotherHoliday.addEventListener("click", (event) => {
  displayHoliday(select.value);
}); */

function jsonHoliday(iso) {
  let selectedURL = `${base}${key}&country=${iso}&year=2021`;
  fetch(selectedURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      displayHoliday(json);
    })
    .catch((err) => alert("Make sure to select a country!"));
}

function displayHoliday(jsonResponse) {
  let holidayListElement = document.getElementById("holidayList");
  if (holidayListElement.firstChild) {
    holidayListElement.firstChild.remove();
  }
  let section = document.createElement("section");
  let arr = jsonResponse.response.holidays;
  //get a random number between 0 and the length of array
  let randomHoliday = Math.floor(Math.random() * Math.floor(arr.length));
  console.log(randomHoliday);
  //access the holiday in the holidays array based off the number []
  //console log that holiday
  let details = arr[randomHoliday];

  let inputName = document.createElement("h2");
  inputName.innerHTML = details.name;
  section.appendChild(inputName);
  holidayListElement.appendChild(section);
  let inputDate = document.createElement("h3");
  inputDate.innerHTML = details.date.iso;
  section.appendChild(inputDate);
  console.log(details);
  holidayListElement.appendChild(section);
  let inputCelebration = document.createElement("p");
  inputCelebration.innerHTML = details.description;
  section.appendChild(inputCelebration);
  holidayListElement.appendChild(section);
}
