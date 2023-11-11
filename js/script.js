jQuery(document).ready(function ($) {
  // Localize the ajaxurl variable
  // var ajaxurl = feature_coord_converter_params.ajaxurl;

  //handle the change in select tag
  $("#format").on("change", function () {
    let format = $(this).val();
  });

  // AJAX request to save coordinates to the database
  jQuery("#save-btn").on("click", function () {
    alert("clickedme ");
    var data = {
      action: "feature_coord_converter",
      latitude: $("#latitude").val(),
      longitude: $("#longitude").val(),
      format: $("#format").val(),
    };

    $.post(ajaxurl, data, function (response) {
      if (response.success) {
        alert("Coordinates saved to the database.");
      } else {
        alert("Error saving coordinates to the database.");
      }
    });
  });

  $("#convert-btn").on("click", function (event) {
    event.preventDefault();
    let initial_latitude = $("#latitude").val();
    let initial_longitude = $("#longitude").val();
    let format = $("#format").val();

    console.log(format, initial_latitude, initial_longitude);
    let convertedLatitude = newConvert(format, initial_latitude, true);
    let convertedLongitude = newConvert(format, initial_longitude, false);

    //display
    jQuery("#latitude_value").text(convertedLatitude);
    jQuery("#longitude_value").text(convertedLongitude);
  });
});

function newConvert(format, value, isLatitude) {
  if (format.toLowerCase() === "dd") {
    // Convert Decimal Degrees (DD) to Degrees, Minutes, and Seconds (DMS)
    var dms = ddToDMS(value, isLatitude);
    console.log(dms);
    return dms;
  } else if (format.toLowerCase() === "dms") {
    // Convert Degrees, Minutes, and Seconds (DMS) to Decimal Degrees (DD)
    var dd = dmsToDD(value);
    console.log(dd);
    return dd;
  } else {
    return "Invalid format";
  }
}

function ddToDMS(value, isLatitude) {
  // Check if the input is a valid number
  if (isNaN(value)) {
    return "Invalid input";
  }

  // Ensure the input is within the valid range for latitude (-90 to 90) or longitude (-180 to 180)
  if (Math.abs(value) > 90 && Math.abs(value) > 180) {
    return "Invalid input range";
  }

  // Determine the direction (N, S, E, W)
  var direction = isLatitude
    ? value >= 0
      ? "N"
      : "S"
    : value >= 0
    ? "E"
    : "W";

  const ddRegex = /([-+]?\d+\.\d+)/;
  const ddMatch = value.match(ddRegex);

  if (ddMatch) {
    var degrees = Math.floor(value);
    var minutes = Math.floor((value - degrees) * 60);
    var seconds = ((value - degrees - minutes / 60) * 3600).toFixed(2);

    return degrees + "° " + minutes + "' " + seconds + '" ' + direction;
  } else {
    return "Invalid input.";
  }
}

function dmsToDD(value) {
  //checking
  const dmsRegex = /(\d+)°(\d+)'([\d.]+)"([NSWE])/;
  const match = value.match(dmsRegex);

  if (match) {
    const degrees = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const seconds = parseFloat(match[3]);
    const direction = match[4];

    const conversion =
      degrees + minutes / 60 + (seconds / 3600) * (direction === "S" ? -1 : 1);

    return conversion;
  } else {
    return "Invalid input.";
  }
}
