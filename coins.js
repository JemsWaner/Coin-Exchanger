const MainSelect = document.getElementById("first-select");
const SecondSelect = document.getElementById("second-select");
const NumberCounter = document.querySelector(".number-option");
const Currency = document.querySelector(".show.currency");
const ShortCurrency = document.querySelector(".short-currency");
let coin = "DOP";
let showNumber = 0.01818;

Currency.textContent = `${NumberCounter.value} ${coin} = ${showNumber}`;

function Multiplication(A, B) {
  let multi = A * B;
  return multi;
}

function InsertingList(arr) {
  for (let j of arr) {
    const option = document.createElement("option");
    const option2 = document.createElement("option");
    option.value = j[0];
    option2.value = j[0];
    option.textContent = j[0];
    option2.textContent = j[0];
    MainSelect.appendChild(option);
    SecondSelect.appendChild(option2);
  }
}

async function GettingCountries() {
  let dataCall = await fetch(
    `https://v6.exchangerate-api.com/v6/8479ed75352302d431c6ae3e/latest/${coin}`
  );
  let convertObj = await dataCall.json();
  let countryRates = await convertObj.conversion_rates;
  arrayObjects = Object.entries(countryRates);
  InsertingList(arrayObjects);
}

GettingCountries();

NumberCounter.addEventListener("input", (e) => {
  showNumber = Multiplication(e.target.value, 0.01818);
  Currency.textContent = `${e.target.value} ${
    MainSelect.value
  } = ${showNumber.toFixed(5)}`;
  ShortCurrency.textContent = showNumber.toFixed(2);
  return showNumber;
});

MainSelect.addEventListener("change", () => {
  coin = MainSelect.value;
  GettingCountries();
  Currency.textContent = `${NumberCounter.value} ${MainSelect.value} = ${showNumber}`;
});
