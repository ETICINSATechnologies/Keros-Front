const currentYear = new Date().getFullYear();
$('#yearPosition1').attr({"max": currentYear});
$('#yearPosition2').attr({"max": currentYear});
$('#yearPosition3').attr({"max": currentYear});

try {
  if ($('#yearPosition1').val().length === 0) {
    $('#yearPosition1').val(currentYear);
  }
  if ($('#yearPosition2').val().length === 0) {
  $('#yearPosition2').val(currentYear);
  }
  if ($('#yearPosition3').val().length === 0) {
  $('#yearPosition3').val(currentYear);
  }
} catch {
}

