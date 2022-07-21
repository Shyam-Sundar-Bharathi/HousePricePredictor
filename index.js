function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getParkValue() {
    var uiPark = document.getElementsByName("uiPark");
    for(var i in uiPark) {
      if(uiPark[i].checked) {
          return parseInt(i);
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var parkPresent = getParkValue();
    var location = document.getElementById("uiLocations");
    var approach = document.getElementById("uiApproach");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var ageOfHouse = document.getElementById("uiAge");
    var distMainRoad = document.getElementById("uiDist");
  
    var url = "http://54.67.19.242:8080/predict_home_price";
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bed: bhk,
        bath: bathrooms,
        park: parkPresent,
        location: location.value,
        approach_road: approach.value,
        age: parseFloat(ageOfHouse.value),
        dist_mainroad: parseFloat(distMainRoad.value)
    },function(data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toLocaleString('en-IN') + " Rs</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var urlLoc = "http://54.67.19.242:8080/get_location_names";
    $.get(urlLoc,function(data, status) {
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i][0].toUpperCase() + locations[i].substring(1));
                if(locations[i] == 'kk nagar')
                  $('#uiLocations').append(new Option('Karapakkam'));
                $('#uiLocations').append(opt);
            }
        }
    });
    urlApp = "http://54.67.19.242:8080/get_approach_types";
    $.get(urlApp,function(data, status) {
        if(data) {
            var approachtypes = data.approachtypes;
            var uiApproach = document.getElementById("uiApproach");
            $('#uiApproach').empty();
            for(var i in approachtypes) {
                var opt = new Option(approachtypes[i][0].toUpperCase() + approachtypes[i].substring(1));
                $('#uiApproach').append(opt);
            }
            var opt = new Option('No Access')
            $('#uiApproach').append(opt);
        }
    });
  }
  
  window.onload = onPageLoad;