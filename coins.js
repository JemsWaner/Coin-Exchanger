const MainSelect = document.getElementById("first-select");
const SecondSelect = document.getElementById("second-select");
const Button = document.querySelector(".swap-button");
const NumberCounter = document.querySelector(".number-option");
const Currency = document.querySelector(".show.currency");
const ShortCurrency = document.querySelector(".short-currency");
let coin = "DOP";
let secondCoin;
let count = 0;
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
  if (count == 0) {
    let search = keys.indexOf("EUR");
    SecondSelect[search].setAttribute("selected", true);
    count++;
  }
  let defaults = keys.indexOf(SecondSelect.value);
  secondCoin = values[defaults];
  return secondCoin;
}

/* Here I call the API REST and the result is given as a parametrer to another function*/
async function GettingCountries(coins) {
  let dataCall = await fetch(
    `https://v6.exchangerate-api.com/v6/e361a23175b43c319c0a8570/latest/${coins}`
  );
  let convertObj = await dataCall.json();
  let countryRates = await convertObj.conversion_rates;
  let keysObjects = Object.keys(countryRates);
  let valuesObjects = Object.values(countryRates);
  InsertingList(keysObjects, valuesObjects);
}

GettingCountries(coin);

function Numbers() {
  let showNumber = Multiplication(NumberCounter.value, secondCoin);
  Currency.textContent = `${NumberCounter.value} ${
    MainSelect.value
  } = ${showNumber.toFixed(5)} ${SecondSelect.value}`;
  ShortCurrency.textContent = showNumber.toFixed(2);
}
///The event that changes the numbers
NumberCounter.addEventListener("input", Numbers);

MainSelect.addEventListener("change", async () => {
  coin = MainSelect.value;
  await GettingCountries(coin);
  Numbers();
});

SecondSelect.addEventListener("change", async () => {
  await GettingCountries(coin);
  Numbers();
});

Button.addEventListener("click", async () => {
  //In the variable I save the first value, because I'll alter it later...So It's better to have the initial value at the moment of giving the value to the SecondSelect
  let upValue = MainSelect.value;
  MainSelect.value = SecondSelect.value;
  SecondSelect.value = upValue;

  coin = MainSelect.value;
  await GettingCountries(coin);
  Numbers();

  ///Here below I just want to make sure if the coin values are being change
  console.log(MainSelect.value);
  console.log(SecondSelect.value);
});
