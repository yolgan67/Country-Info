const select = document.getElementById("select");
const flag = document.getElementById("img");
const name = document.getElementById("name");
const official = document.getElementById("official");
const info = document.getElementById("info");
const continent = document.getElementById("continent");
const population = document.getElementById("population");
const capital = document.getElementById("capital");
const language = document.getElementById("language");
const area = document.getElementById("area");
const currency = document.getElementById("currency");
const border = document.getElementById("border");
const map = document.getElementById("map");
const world = document.getElementById("world")

// Select List
import countryList from "./countrylist.js";
for (let i = 0; i < countryList.length; i++) {

  const x = ` <option value="${countryList[i].name}">${countryList[i].name}</option>`;
  select.insertAdjacentHTML("beforeend", x);
}

select.addEventListener("change", async () => {
  const data = await (
    await fetch(`https://restcountries.com/v3.1/name/${select.value}`)).json();
  console.log(data);
  info.style.display="block"
  world.style.display="none"
  info.classList.add("visible");
  flag.src = data[0].flags.png;
  name.innerHTML = data[0].name.common.toUpperCase();
  official.innerHTML = data[0].name.official;
  continent.innerHTML = data[0].continents[0];
  population.innerHTML =
    (data[0].population / 1000000).toFixed(2) + " M people";
  capital.innerHTML = data[0].capital[0].toUpperCase();
  language.innerHTML = Object.values(data[0].languages).join(" - ");
  area.innerHTML = data[0].area / 1000 + " km²";

  //Currency
  let cur = [];
  Object.values(data[0].currencies).forEach((item) => cur.push(item.name));
  currency.innerHTML = cur.join(" - ");

  // Neighbour
  let borderCountries = [];
  if (data[0].borders) {
    for (let i = 0; i < data[0].borders.length; i++) {
      const neighbor = await (
        await fetch(
          `https://restcountries.com/v3.1/alpha/${data[0].borders[i]}`
        )
      ).json();
      borderCountries.push(neighbor[0].name.common);
    }
    border.innerHTML = borderCountries.join(" - ").toUpperCase();
  } else {
    border.innerHTML = "";
  }

  // Map
  map.onclick = () => {

    window.location.href = `${Object.values(data[0].maps)[0]}`;
  };

  select.value = "Select Country";
});