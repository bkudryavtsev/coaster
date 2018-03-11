$(function() {
  $("#date-from").datepicker();
  $("#date-to").datepicker();
});

function initMap() {
  var from = $("#place-from")[0];
  var to = $("#place-to")[0];
  var aFrom = new google.maps.places.Autocomplete(from).getPlace();
  var aTo = new google.maps.places.Autocomplete(to).getPlace();
}

$('#search-form').submit(function (e) {
  var placeFrom = $("#place-from").val();
  var placeTo = $("#place-to").val();
  var dateFrom = new Date($("#date-from").val());
  var dateTo = new Date($("#date-to").val());

  console.log(placeFrom + " " + placeTo + " " + dateFrom + " " + dateTo);

  var tripDuration =  Math.ceil(( dateTo - dateFrom ) / 86400000);

  console.log(tripDuration);

  var tripData = {
                  "placeFrom": placeFrom,
                  "placeTo": placeTo,
                  "dateFrom": dateFrom,
                  "dateTo": dateTo
                 };

  var costData = {
                  "dailyFoodCost": 30.0,
                  "flightCosts": 1234.0,
                  "hotelCosts": 123.00,
                  "weather": [10.0, "rain"]
                 };

  var foodCost = costData["dailyFoodCost"] * tripDuration;
  var flightCosts = costData["flightCosts"];
  var hotelCosts = costData["dailyLivingCosts"] * tripDuration;
  var clothes = (costData["weather"][0] < 10.0) ? "jacket" : "shirt";
  var umbrella = (costData["weather"][1] === "rain") ? true : false;

  if (clothes === "jacket") {

  } else if (clothes === "shirt") {

  }

  if (umbrella) {

  }

  var totalCost = flightCosts + hotelCosts + foodCost;

  $('#cost-estimate').animateNumber({
    number: totalCost,
    numberStep: $.animateNumber.numberStepFactories.separator(',')
  });

  e.preventDefault();
});
