const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const placeArray = [];
fetch(endpoint)
  .then((data) => data.json())
  .then((data) => placeArray.push(...data));
// console.log(placeArray);

function placeMatch(searchWords, placeArray) {
  return placeArray.filter((place) => {
    const regexp = new RegExp(searchWords, "gi");
    return place.city.match(regexp) || place.state.match(regexp);
  });
}

function displayPlace() {
  // console.log(this);
  // console.log(this.value);
  const matchPlaces = placeMatch(this.value, placeArray);
  const display = matchPlaces
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const highlightCityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const highlightStateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
     <li>
     <span class="name">${highlightCityName},${highlightStateName}</span>
     <span class="population">${numberCommas(place.population)}</span>
     </li>
    `;
    })
    .join("");
  suggestions.innerHTML = display;
}

function numberCommas(population) {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const search = document.querySelector(".place");
const suggestions = document.querySelector(".suggestions");

search.addEventListener("change", displayPlace);
search.addEventListener("keyup", displayPlace);
