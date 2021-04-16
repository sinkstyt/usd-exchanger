import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MoneyService from './MoneyService.js';

// make request to get USD exchange rates - ALL - on page load
let promise = MoneyService.getXChangeRates();

promise.then(function(response) {
  const body = JSON.parse(response);
  populateSidebar(body);
  return body;
}, function(error) {
  const errorText = JSON.parse(error);
  populateSidebar(errorText);
  return errorText["error-type"];
});

function populateSidebar(parsedJSON) {
  let sidebarUl = $(".all-results");
  sidebarUl.empty();
  if (parsedJSON.result == "error") {
    sidebarUl.prepend(parsedJSON["error-type"]);
    return parsedJSON;
  } else {
    for (const rate in parsedJSON.conversion_rates) {
      sidebarUl.append(`<li>${rate}: ${parsedJSON.conversion_rates[rate]}</li>`);
    }
    return parsedJSON;
  }
}

function htmlMessageMaker(body, startNum, endNum, endType) {
  const iSOs = ["MXN", "CRC", "BRL", "CLP", "BAM", "ZAR"];
  const moneyNames = ["Mexican Peso", "Costa Rican Colon", "Brazilian Real", "Chilean Peso", "Bosnia and Herzegovina Mark", "South African Rand"];
  let niceHtml = `<ul class="conversion-results"><li class="requested-iso">You asked to convert $${startNum} into ${moneyNames[iSOs.indexOf(endType)]}</li>`;
  niceHtml += `<li class="requested-iso">This exchanges for: {endNum} ${moneyNames[iSOs.indexOf(endType)]}</li></ul>`;
  return niceHtml;
}

function multiplyBy(amountUSD, wantedMoney, body) {
  let resultNum = Math.floor(amountUSD * body.conversion_rates[wantedMoney]);
  return resultNum;
}

function assignDefaults() {
  let textField = document.getElementById('usd-entry');
  textField.val(300);
  textField.focus();
}

$('#go-go-exchange').on("click", function(event, body) {
  event.preventDefault();
  let amountStart = parseInt($('#usd-entry').val());
  let destinedISO = $('input:radio[name=cur-name]:checked').val();
  let amountEnd = multiplyBy(amountStart, destinedISO, body);
  const dOMResponse = htmlMessageMaker(body, amountStart, amountEnd, destinedISO);
  $('.results-display').prepend(dOMResponse);
  assignDefaults();
});