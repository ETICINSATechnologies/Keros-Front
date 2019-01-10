function callAjax(source, number, id) {
  source += "?pageNumber=" + number;        //RIGHT
  $.get(source, function (data) {
    generateButtons(data, id);
    generateLinks(number, id, 5);          //WRONG
    //generateLinks(data.meta.page, id, data.meta.totalPages);    //RIGHT
  })
}

function generateLinks(number, id, max) {
  var links = "";
  if (number == 0) {
    links += "<a href='javascript:void(0)' onclick='callAjax(\"/ua/contact/json/\", " + (parseInt(number)+1) + ", \"" + id + "\")' class='fa fa-arrow-right fa-pull-right'></a>";
  }
  else if (number == max) {
    links += "<a href='javascript:void(0)' onclick='callAjax(\"/ua/contact/json/\", " + (parseInt(number)-1) + ", \"" + id + "\")' class='fa fa-arrow-left fa-pull-left'></a>";
  }
  else {
    links += "<a href='javascript:void(0)' onclick='callAjax(\"/ua/contact/json/\", " + (parseInt(number)-1) + ", \"" + id + "\")' class='fa fa-arrow-left fa-pull-left'></a>";
    links += "<a href='javascript:void(0)' onclick='callAjax(\"/ua/contact/json/\", " + (parseInt(number)+1) + ", \"" + id + "\")' class='fa fa-arrow-right fa-pull-right'></a>";
  }
  console.log("link" + id);
  $("#link" + id).empty().append(links);
}

function generateButtons(data, id) {
  var options = "";
  var name = id.substring(14, id.length);
  if (name.split("Id")[1] !== "1") {
    options += "<button class='btn btn-block btn-flat' type='button' id='" + name + "_' onclick='selectValue(\"" + name + "_" + "\")'>---</button>";
  }
  data.content.forEach(function (elem) {
    options += "<button class='btn btn-block btn-flat' type='button' id='" + name + "_" + elem.id + "' onclick='selectValue(\"" + name + "_" + elem.id +"\")'>" + elem.firstName + " " + elem.lastName + "</button>";
  });
  $("#" + id).empty().append(options);
}

function selectValue(id) {
  console.log(id);
  var tmp = $("#" + id);
  var grandParentId = tmp.parent().parent().attr("id");
  var value = tmp.html();
  var id = tmp.attr("id").split("_")[1];

  $("a[href='#" + grandParentId + "'").html(value);
  $("input[id='input" + grandParentId + "'").attr("value", id);
  $(".collapse").collapse('hide');
}