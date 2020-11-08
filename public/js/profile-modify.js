function addPositionFields() {
  var position = $("#addPosition").val();
  var year = $("#addYear").val();

  $("#added-positions").append(`<h1>${position} ${year}</h1>`);
  console.log(`${position} ${year}`);
}
