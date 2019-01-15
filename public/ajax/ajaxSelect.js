$('document').ready( function() {
  $.get("/ua/contact/json", function (data) {
    generateOptions($(".selectpicker.selectcontacts"), data, true);
  });
  $.get("/core/member/json", function (data) {
    generateOptions($(".selectpicker.selectmembers"), data, true);
  });
});

$('body').on('change','.selectpicker', function () {
  if (!($(this).val().match(/link/))) {return;}

  var select_menu = $(this);
  var pageNumber = parseInt($(this).val().split("_")[1]);

  $.get($(this).attr("data-endpoint") + "/json?pageNumber=" + pageNumber, function (data) {
    generateOptions(select_menu, data);
  })
});

function generateOptions(select_menu, data, init) {
  select_menu.empty().filter(function () {return !($(this).attr('class').match(/required/));}).append("<option></option>");

  data.content.forEach(function (elem) {
    select_menu.each( function () {
      if (elem.id == $(this).attr('data-selected')) {var selected = "selected";}
      $(this).append("<option value='" + elem.id + "' "+ selected +">" + elem.firstName + " " + elem.lastName + "</option>");
    });
  });
  paginate(select_menu, data.meta);

  select_menu.selectpicker('refresh');
  if (!init) {select_menu.addClass('open').selectpicker('setStyle');}
}

function paginate($, meta) {
  if (meta.totalPages === 1) {
    return $;
  }
  else if (meta.page === 0) {
    return $.append("<option value='link_"+ (meta.page + 1) +"' data-icon=\"fa fa-arrow-right fa-pull-right\"></option>");
  }
  else if (meta.page === meta.totalPages - 1) {
    return $.append("<option value='link_"+ (meta.page - 1) +"' data-icon=\"fa fa-arrow-left fa-pull-left\"></option>");
  }
  else {
    return $.append("<option value='link_"+ (meta.page - 1) +"' class='selectlinks' data-icon=\"fa fa-arrow-left fa-pull-left\" style='position: absolute; width: 50%; z-index: 9999;'></option>" +
      "<option value='link_"+ (meta.page + 1) +"' class='selectlinks' data-icon=\"fa fa-arrow-right fa-pull-right\" style='width: 50%; margin-left: 50%;'></option>");
  }
}