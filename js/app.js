var RS_MRTDB = 'http://mrtdb-mrtool.127.0.0.1.nip.io/';

function checkUser() {
  if (! localStorage.rhid) {
    $('#enterAssociateInfoModal').modal('show');
  }
};

function saveUser() {
  // { "rhid": "9053",
  //   "name": "Andrea Leoncini",
  //   "email": "aleoncin@redhat.com",
  //   "costCenter": "420",
  //   "car": { "registryNumber":"FB214ZM", "mileageRate": 0.89 }
  // }
  if($('#inputYear').val() != "")
  var data = '{ "rhid": "' + $('#inputAssociateId').val() + '", ';
  data += '"name": "' + $('#inputAssociateName').val() + '", ';
  data += '"email": "' + $('#inputAssociateMail').val() + '", ';
  data += '"costCenter": "' + $('#inputAssociateCostCenter').val() + '", ';
  data += '"car": { "registryNumber": "' + $('#inputCarRegNumber').val() + '", "mileageRate": ' + $('#inputCarRate').val() + ' } ';
  data += '}';
  $.ajax({
        type: "POST",
        url: RS_MRTDB + "rs/associates/add",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          alert(data);
        },
  });
};

function initTripsTable() {
    var rhid = "9053";
    var month = $('#inputMonth').val();
    var year = $('#inputYear').val();
    var theUrl = '/rs/trips/' + rhid + "/" + year + "/" + month;
    $.ajax({
        url: theUrl,
        type: 'GET',
        data: {},
        dataType: 'json',
        complete: function(response, status, xhr){
            var data = jQuery.parseJSON(response.responseText);
            formatTripsTable(data.trips);
            //$("#the_response").text(data.result);
        }
    });
};

function formatTripsTable(trips) {
    var numberOfTrips = 0;
    var totalMileage = 0;
    var tableContent = '<thead>';
    tableContent += '<tr><th>Day</th><th>From office to</th><th>purpose</th><th>mileage (Km)</th></tr>';
    tableContent += '</thead>';
    tableContent += '<tbody>';
    $.each(trips, function (index, trip) {
        tableContent += '<tr>';
        tableContent += '<td>' + trip.date.day + '</td>';
        tableContent += '<td>' + trip.location.destination + '</td>';
        tableContent += '<td>' + trip.purpose + '</td>';
        tableContent += '<td>' + trip.location.distance + '</td>';
        tableContent += '</tr>';
        numberOfTrips += 1;
        totalMileage += trip.location.distance;
    });
    tableContent += '</tbody>';

    var tableInfo = '<p><img src="images/transparent_spacer.png"><strong>' + $("#inputMonth option:selected").text() + ' ' + $("#inputYear option:selected").text() + '</strong>';
    tableInfo += '- Number of Trips: <strong>' + numberOfTrips + '</strong>';
    tableInfo += ' - Total mileage (Km): <strong>' + totalMileage + '</strong>';
    document.getElementById("tableInfo").innerHTML = tableInfo;
    document.getElementById("tbl_round_list").innerHTML = tableContent;
};
