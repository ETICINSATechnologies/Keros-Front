var div_select, select_menu;

$('body').on('change','.selectpicker', function () {
  if (!($(this).val().match(/previous|next/))) {return;}

  select_menu = $(this);
  div_select = "#" + select_menu.parent().parent().attr("id");
  var pageNumber = parseInt(select_menu.val().split("_")[1]);

  $(this).val().match(/previous/) ? pageNumber-- : pageNumber++;

  $.get(select_menu.attr("id") + "/json?pageNumber=" + pageNumber, function (data) {
    generateOptions(data);
  })
});

function generateOptions(data) {
  var required = select_menu.attr('class').split(" ")[1] === "required" ? select_menu.attr('class').split(" ")[1] : "";
  var options = "<select class='selectpicker " + required + "' data-width='100%' id='" + select_menu.attr("id") + "' name='"+ select_menu.attr("name") +"' " + required + "></select>";
  $(div_select).empty().append(options);

  if(required !== "required") {$(div_select).children().append("<option></option>");}
  data.content.forEach(function (elem) {
    $(div_select).children().append("<option value='" + elem.id + "'>" + elem.firstName + " " + elem.lastName + "</option>");
  });
  paginate($(div_select).children(), data.meta);

  $(div_select).children().selectpicker('refresh').addClass('open').selectpicker('setStyle');
}

function paginate($, meta) {
  if (meta.totalPages === 1) {
    return $;
  }
  else if (meta.page === 0) {
    return $.append("<option value='next_"+ meta.page +"' data-icon=\"fa fa-arrow-right fa-pull-right\"></option>");
  }
  else if (meta.page === meta.totalPages - 1) {
    return $.append("<option value='previous_"+ meta.page +"' data-icon=\"fa fa-arrow-left fa-pull-left\"></option>");
  }
  else {
    return $.append("<option value='previous_"+ meta.page +"' class='selectlinks' data-icon=\"fa fa-arrow-left fa-pull-left\" style='position: absolute; width: 50%; z-index: 9999;'></option>" +
      "<option value='next_"+ meta.page +"' class='selectlinks' data-icon=\"fa fa-arrow-right fa-pull-right\" style='width: 50%; margin-left: 50%;'></option>");
  }
}