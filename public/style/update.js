const buttons = '<button type="button" class="btn btn-primary" onclick="refresh();" id="cancel">Annuler</button> ' +
    '<button type="submit" class="btn btn-primary pull-right" id="validate">Valider</button>';

var url = document.location.pathname;

if (url.match(/update\/\d*/) || url.match(/create/)) {
  $("#update").remove();
  $("#box_buttons").html(buttons);
  $(".form-control").each(function () {
    $(this).prop('disabled', false);
    $(this).prop('readonly', false);
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
      $(this).prop('readonly', false);
    });
  });
}

function refresh() {
  location.reload();
}