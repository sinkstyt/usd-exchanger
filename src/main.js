import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MoneyService from './MoneyService.js';

function populateSidebar(parsedJSON) {
  let sidebarUl = $(".all-results");
  sidebarUl.empty();
  if (parsedJSON.result == "error") {
    sidebarUl.prepend(parsedJSON["error-type"]);
  } else {
    const updated = parsedJSON["time_last_update_utc"].slice(0, 16);
    sidebarUl.append(`<li id="last-updated">last updated:`+ `<br>`+`${updated}</li>`);
    for (const rate in parsedJSON.conversion_rates) {
      sidebarUl.append(`<li>${rate}: ${parsedJSON.conversion_rates[rate]}</li>`);
    }
  }
}

function htmlMessageMaker(startNum, endNum, endType) {
  const iSOs = ["MXN", "CRC", "BRL", "CLP", "BAM", "ZAR", "CIC"];
  const destinationIndex = iSOs.indexOf(endType);
  const moneyNames = ["Mexican Peso", "Costa Rican Colon", "Brazilian Real", "Chilean Peso", "Bosnia and Herzegovina Mark", "South African Rand", "Cook Islands Crown"];
  let niceHtml = `<li class="requested-iso">You asked to convert $${startNum} US Dollars into ${moneyNames[destinationIndex]}</li>`;
  niceHtml += `<li class="requested-iso">This exchanges for: ${endNum} ${moneyNames[destinationIndex]}</li>`;
  return niceHtml;
}

function displayErrorText(errorText) {
  return `<li>Your conversion could not be completed. The Exchange Rate service responded with ${errorText}</li>`;
}

function multiplyBy(amountUSD, wantedMoney, body) {
  let resultNum = Math.floor(amountUSD * body.conversion_rates[wantedMoney]);
  return resultNum;
}

function assignDefaults() {
  let textField = $('#usd-entry');
  textField.val(300);
}

$('#go-go-exchange').on("click", function(event) {
  event.preventDefault();
  let amountStart = parseInt($('#usd-entry').val());
  let destinedISO = $('input:radio[name=cur-name]:checked').val();
  const resultsContainer = $(".results-display ul");
  resultsContainer.empty();
  let body;
  let promise = MoneyService.getXChangeRates();
  promise.then(function(response) {
    body = JSON.parse(response);
    populateSidebar(body);
    if (Object.prototype.hasOwnProperty.call(body.conversion_rates, destinedISO)) {
      let endNumber = multiplyBy(amountStart, destinedISO, body);
      resultsContainer.append(htmlMessageMaker(amountStart, endNumber, destinedISO));
    } else {
      let errorListElement = displayErrorText(`${destinedISO} is not a supported currency. Do Cook Islands Crowns even exist?`);
      resultsContainer.append(errorListElement);
    }
  }, function(error) {
    resultsContainer.append(error);
  });
  assignDefaults();
});