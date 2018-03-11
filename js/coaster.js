$(function() {
  $('#date-from').datepicker();
  $('#date-to').datepicker();
  $("[data-toggle='tooltip']").tooltip();

  $('#place-from').val(getCookie('placeFrom'));
  $('#place-to').val(getCookie('placeTo'));
});

function initMap() {
  var from = $('#place-from')[0];
  var to = $('#place-to')[0];
  var aFrom = new google.maps.places.Autocomplete(from).getPlace();
  var aTo = new google.maps.places.Autocomplete(to).getPlace();
}

$('#submit').click(function () {
  var placeFrom = $('#place-from').val();
  var placeTo = $('#place-to').val();
  var dateFrom = new Date($('#date-from').val());
  var dateTo = new Date($('#date-to').val());

  if (placeFrom === '' || placeTo === '' ||
      isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime()) ||
      dateFrom > dateTo) {
    alert('Please fill in all information correctly.');
    return false;
  }

  setCookie('placeFrom', placeFrom, 365);
  setCookie('placeTo', placeTo, 365);

  console.log(placeFrom + ' ' + placeTo + ' ' + dateFrom + ' ' + dateTo);

  var tripDuration =  Math.ceil(( dateTo - dateFrom ) / 86400000);

  console.log(tripDuration);

  var tripData = {
                  'placeFrom': placeFrom,
                  'placeTo': placeTo,
                  'dateFrom': dateFrom,
                  'dateTo': dateTo
                 };

  var costData = {
                  'dailyFoodCost': 30.0,
                  'flightCosts': 1234.0,
                  'hotelCost': 123.00,
                  'weather': [10.0, 'rain']
                 };

  var foodCost = costData['dailyFoodCost'] * tripDuration;
  var flightCosts = costData['flightCosts'];
  var hotelCosts = costData['hotelCost'] * tripDuration;
  var clothes = (costData['weather'][0] < 10.0) ? 'jacket' : 'shirt';
  var umbrella = (costData['weather'][1] === 'rain') ? true : false;

  if (clothes === 'jacket') {
    $('#tshirt').hide();
    $('#jacket').show();
  } else if (clothes === 'shirt') {
    $('#jacket').hide();
    $('#tshirt').show();
  }

  if (umbrella) {
    $('#umbrella').show();
  } else {
    $('#umbrella').hide();
  }

  var totalCost = flightCosts + hotelCosts + foodCost;

  $('#cost-estimate').animateNumber({
    number: totalCost,
    numberStep: $.animateNumber.numberStepFactories.separator(',')
  });
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
