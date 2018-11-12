$("#test").click(function () {
  $.get("/ua/contact/json", function (data) {
    generateOptions(data);
  });
});

function generateOptions(data) {
  console.log(data.content);
  var options = "";

  data.content.forEach(function (elem) {
    options += "<option value='" + elem.id + "'>" + elem.firstName + " " + elem.lastName +"</option>";
  });
  console.log(options);
  return options;
}