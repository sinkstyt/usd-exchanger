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
// display all pertinent exchange rates down a column on the right side of client window

// upon button click, display in a results div the product of multiplying requested USD value by its exchange to radio-button indicated destination currency. Include destination currency unit as part of display

function htmlMessageMaker(response, startNum, requested, productNum, destined) {
  let niceHtml = '';
  if (typeof response !== "string") {
    let sixRatesArr = [];
    const allISOArr = ["USD", "EUR", "MXN", "CRC", "BRL", "CLP", "BAM", "ZAR"];
    const namesOfCursArr = ["US Dollars", "Euros", "Mexican Peso", "Costa Rican Colon", "Brazilian Real", "Chilean Peso", "Bosnia and Herzegovina Mark", "South African Rand"];
    for (const iso of allISOArr) {
      if (iso !== requested || iso !== "USD" || iso !== "EUR") {
        sixRatesArr.push(response.conversion_rates[iso]);
      }
    }
    niceHtml += `<ul class="conversion-results">`;
    niceHtml += `<li class="requested-iso">You asked to convert ${startNum} ${namesOfCursArr[allISOArr.indexOf(requested)]}</li>`;
    niceHtml += `<li class="requested-iso">This exchanges for: ${productNum} ${namesOfCursArr[allISOArr.indexOf(destined)]}</li>`;
    niceHtml += `</ul>`;
  } else {
    niceHtml += `<p class="error-message">${response}</p>`;
  }
  return niceHtml;
}

function multiplyBy(jaySon, initialAmt, destISO) {
  let resultNum = Math.floor(initialAmt * jaySon.conversion_rates[destISO]);
  return resultNum;
}

function assignDefaults() {
  let textField = document.getElementById('usd-entry');
  textField.val(300);
  textField.focus();
  $("#euro-instead").prop("checked", false);
}

async function getExchangeRates(startCurrency) {
  const response = await MoneyService.getXChangeRates(startCurrency);
  return response.json();
}

$('#go-go-exchange').on("click", function(event) {
  event.preventDefault();
  let amountStart = parseInt($('#usd-entry').val());
  let requestISO = "USD";
  requestISO = $('input:checkbox[name=euro-switch]:checked').val();
  let destinyISO = $('input:radio[name=cur-name]:checked').val();
  const response = getExchangeRates(requestISO);
  let amountEnd = multiplyBy(response, amountStart, destinyISO);
  const dOMResponse = htmlMessageMaker(response, amountStart, requestISO, requestISO, amountEnd, destinyISO);
  $('form').slideUp();
  $('.results-display').prepend(dOMResponse);
  $('div.results-display').slideDown();
});

$('button.btn-danger').on("click", function() {
  $('form').slideDown();
  assignDefaults();
});