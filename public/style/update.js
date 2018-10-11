const buttons = '<button type="button" class="btn btn-primary" onclick="refresh();" id="cancel">Annuler</button> ' +
    '<button type="submit" class="btn btn-primary pull-right" id="validate">Valider</button>',
  genders = {"H":"Homme", "F":"Femme", "A":"Autre", "I":"Inconnu"},
  gendersId = {"H":1, "F":2, "A":3, "I":4};

var url = document.location.pathname;

if (url.match(/update\/\d*/) || url.match(/create/)) {
  $("#update").remove();
  $("#box_buttons").html(buttons);
  $(".form-control").each(function () {
    $(this).prop('disabled', false);
  });
  $("#cancel").remove();
  if (url.match(/create/)) {
    $("option[value='']").remove();
  }
}
else {
  $("#update").click(function () {
    $("#update").remove();
    $("#box_buttons").html(buttons);
    $(".form-control").each(function () {
      $(this).prop('disabled', false);
    });
  });
}

function refresh() {
  location.reload();
}

$("select[name='genderId'] > option:first").attr("value", gendersId[$("select[name='genderId'] > option:first").html()]);

$("select[name='genderId'] > option").each(function () {
  var tmp = $(this).html();
  $(this).html(genders[tmp]);
});

