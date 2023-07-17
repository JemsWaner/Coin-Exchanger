const MainSelect = document.getElementById("first-select");
const SecondSelect = document.getElementById("second-select");
const Button = document.querySelector(".swap-button");
const NumberCounter = document.querySelector(".number-option");
const Currency = document.querySelector(".show.currency");
const ShortCurrency = document.querySelector(".short-currency");
let coin = "DOP";
let secondCoin;

///////Putting a default text
Currency.textContent = "1 DOP = 0.01607 EUR";
ShortCurrency.textContent = 0.02;

function Multiplication(A, B) {
  let multi = A * B;
  return multi;
}

/*I'm iterating through the array and giving their content to the select values*/
function InsertingList(keys, values) {
  for (let j of keys) {
    const option = document.createElement("option");
    const option2 = document.createElement("option");
    option.value = j;
    option2.value = j;
    option.textContent = j;
    option2.textContent = j;
    MainSelect.appendChild(option);
    SecondSelect.appendChild(option2);
  }

  let search = keys.indexOf("EUR");
  SecondSelect[search].setAttribute("selected", true);
  let defaults = keys.indexOf(SecondSelect.value);
  secondCoin = values[defaults];
  return secondCoin;
}
/* Here I call the API REST and the result is given as a parametrer to another function*/
async function GettingCountries() {
  let dataCall = await fetch(
    `https://v6.exchangerate-api.com/v6/8479ed75352302d431c6ae3e/latest/${coin}`
  );
  let convertObj = await dataCall.json();
  let countryRates = await convertObj.conversion_rates;
  let keysObjects = Object.keys(countryRates);
  let valuesObjects = Object.values(countryRates);
  InsertingList(keysObjects, valuesObjects);
}

GettingCountries();

NumberCounter.addEventListener("input", (e) => {
  let showNumber = Multiplication(e.target.value, secondCoin);
  Currency.textContent = `${e.target.value} ${
    MainSelect.value
  } = ${showNumber.toFixed(5)} ${SecondSelect.value}`;
  ShortCurrency.textContent = showNumber.toFixed(2);
  return showNumber;
});

MainSelect.addEventListener("change", async () => {
  coin = MainSelect.value;
  await GettingCountries();
  Currency.textContent = `${NumberCounter.value} ${this.value} = ${showNumber}`;
});

SecondSelect.addEventListener("change", async () => {
  await GettingCountries();
  Currency.textContent = `${NumberCounter.value} ${MainSelect.value} = ${showNumber}`;
  alert(secondCoin);
});

console.log(
  "If the country's options aren't showing up, wait some seconds or reload the page again"
);

Button.addEventListener("click", () => {
  //In the variable I save the first value, because I'll alter it later...So It's better to have the initial value at the moment of giving the value to the SecondSelect
  let upValue = MainSelect.value;
  coin = SecondSelect.value;
  GettingCountries();
  MainSelect.value = SecondSelect.value;
  SecondSelect.value = upValue;

  ///Here below I just want to make sure if the coin values are being change
  console.log(MainSelect.value);
  console.log(SecondSelect.value);
});
