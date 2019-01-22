$('document').ready( function() {
  if ($(".selectpicker.selectcontacts").length > 1) {
    $.get("/ua/contact/json", function (data) {
      generateOptions($(".selectpicker.selectcontacts"), data, true);
    });
  }
  if ($(".selectpicker.selectmembers").length > 1) {
    $.get("/core/member/json", function (data) {
      data.content = data.content.filter(function(el){
        return el.positions.some(function(el) {
          return el == "Consultant";
        });
      });
      generateOptions($(".selectpicker.selectmembers"), data, true);
    });
  }
  if ($(".selectpicker.selectmembers.selectleaders").length > 1) {
    $.get("/core/member/json", function (data) {
      data.content = data.content.filter(function(el){
        return el.positions.some(function(el) {
          return el.pole.name == "Chargé d'affaire";
        });
      });
      generateOptions($(".selectpicker.selectmembers.selectleaders"), data, true);
    });
  }
  if ($(".selectpicker.selectmembers.selectPerfleaders").length > 1) {
    $.get("/core/member/json", function (data) {
      data.content = data.content.filter(function(el){
        return el.positions.some(function(el) {
          return el.pole.name == "Performance";
        });
      });
      generateOptions($(".selectpicker.selectmembers.selectPerfleaders"), data, true);
    });
  }
});

$('body').on('change','.selectpicker , .form-control', function () {

  if($(this).attr("id") == "firmId"){
    let selectedFirm = $(this).find('option:selected').text();
    $.get("/ua/contact/json", function (data) {
      data.content = data.content.filter(function(el) {
        return el.firm.name == selectedFirm;
      });
      generateOptions($(".selectpicker.selectcontacts"), data, true);
    });
  }

  if ($(this).val().match(/link/)) {
    let select_menu = $(this);
    let params = {};
    params.pageNumber = $(this).val().split("_")[1];

    $.get($(this).attr("data-endpoint") + "/json?" + $.param(params), function (data) {
    generateOptions(select_menu, data);
  })
  }


});

function generateOptions(select_menu, data, init) {
  select_menu.empty().not($(".required")).append("<option></option>");

  data.content.forEach(function (elem) {
      select_menu.each(function () {
        let selected = "";
        if (elem.id == $(this).attr('data-selected')) {
          selected = "selected";
        }
        $(this).append("<option value='" + elem.id + "' " + selected + ">" + elem.firstName + " " + elem.lastName + "</option>");
      });
  });
  paginate(select_menu, data.meta);

  select_menu.selectpicker('refresh');
  if (!init) {select_menu.addClass('open').selectpicker('setStyle');}
}

function paginate(select, meta) {
  if (meta.totalPages === 1) {
    return select;
  }
  else if (meta.page === 0) {
    return select.append("<option value='link_"+ (meta.page + 1) +"' data-icon=\"fa fa-arrow-right fa-pull-right\"></option>");
  }
  else if (meta.page === meta.totalPages - 1) {
    return select.append("<option value='link_"+ (meta.page - 1) +"' data-icon=\"fa fa-arrow-left fa-pull-left\"></option>");
  }
  else {
    return select.append("<option value='link_"+ (meta.page - 1) +"' class='selectlinks' data-icon=\"fa fa-arrow-left fa-pull-left\" style='position: absolute; width: 50%; z-index: 9999;'></option>" +
      "<option value='link_"+ (meta.page + 1) +"' class='selectlinks' data-icon=\"fa fa-arrow-right fa-pull-right\" style='width: 50%; margin-left: 50%;'></option>");
  }
}