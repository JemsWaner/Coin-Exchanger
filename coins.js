const MainSelect = document.getElementsByName("first-select")[0];
const SecondSelect = document.getElementsByName("second-select")[0];

async function inyectCurrency() {
  try {
    let response = await fetch(
      "https://v6.exchangerate-api.com/v6/8479ed75352302d431c6ae3e/latest/USD"
    );
    let converted = await response.json();
    let object = converted.conversion_rates;
    for (let j in object) {
      let valor = document.createElement("option");
      let a = Object.keys(j);
      valor.textContent = a;
      MainSelect.textContent = a;
    }
  } catch (err) {
    console.log(err);
  }
}
inyectCurrency();
