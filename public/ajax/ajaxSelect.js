$('document').ready( function() {
  $.get("/ua/firm/json", function (data) {
    generateOptions($(".selectpicker.selectfirm"), data, true);
  });
  $.get("/core/member/json" , function (data) {
    generateOptions($(".selectpicker.selectmembers"), data, true);
  });
  let selectedFirm = $("firmId").attr('data-selected'); //Problème ici : lors de l'initialisation la valeur reçue est nulle
  let params = {};
  params.firmId = selectedFirm;
  $.get("/ua/contact/json?" + $.param(params), function (data) {
    generateOptions($(".selectpicker.selectcontacts"), data, true);
  });

});

$('body').on('change','.selectpicker , .form-control', function () {

  if($(this).attr("id") == "firmId"){
    let selectedFirm = $(this).find('option:selected').attr("value");
    let params = {};
    params.firmId = selectedFirm;
    $.get("/ua/contact/json?" + $.param(params), function (data) {
      generateOptions($(".selectpicker.selectcontacts"), data, true);
    });
  }

  if ($(this).val().match(/link/)) {
    let select_menu = $(this.parentElement.attr("class"));
    let params = {};
    params.pageNumber = $(this).val().split("_")[1];

    $.get($(this).attr("data-endpoint") + "/json?" + $.param(params), function (data) {
    generateOptions(select_menu, data);
  })
  }

});

function generateOptions(select_menu, data, init) {

  var listeElem = new Map(); //Map qui va regrouper les éléments en associant la data aux champs correspondants

  if(select_menu.attr("class").match(/selectmembers/)) {
    //On traite en fonction de chaque cas
    let leaderSpots = select_menu.filter(function () {
      return $(this).attr("class").match(/selectleaders/);
    });
    let perfLeaderSpots = select_menu.filter(function () {
      return $(this).attr("class").match(/selectPerfleaders/);
    });
    let consultantSpots = select_menu.filter(function () {
      return $(this).attr("class").match(/selectconsultants/);
    });
    let leaderData = data.content.filter(function (elem) {
      return elem.positions.some(function (el) {
        return el.id === 3;
      });
    });
    let perfLeaderData = data.content.filter(function (elem) {
      return elem.positions.some(function (el) {
        return el.id === 4;
      });
    });
    let consultantData = data.content.filter(function (elem) {
      return elem.positions.some(function (el) {
        return el.id === 6;
      });
    });

    listeElem.set(leaderSpots, leaderData);
    listeElem.set(perfLeaderSpots, perfLeaderData);
    listeElem.set(consultantSpots, consultantData);
  } /**else if (select_menu.attr("class").match(/selectcontacts/)){  //J'ai laissé ça en commentaire si jamais tu veux totalement filtrer au front donc sans utiliser firmId
    let contactData = data.content.filter(function (elem) {
      return elem.firm.id === $("firmId").attr('data-selected');
    });
    listeElem.set(select_menu, contactData)
    ;
  }**/ else {
    listeElem.set(select_menu, data.content);
  }

  let emptyFields = select_menu.empty().not($(".required"));
  emptyFields.append("<option></option>");
  //Ajoue de l'option 'Aucun membre/responsable' dans la première case uniquement (inutile ailleurs)
  let emptyMemberFields = emptyFields.filter(function () {
    return $(this).attr('name').match(/.*Id1$/) && $(this).attr('data-endpoint') === "/core/member";
  });
  emptyMemberFields.empty();
  emptyMemberFields.append("<option value=''>Aucun membre/responsable</option>");

  if (select_menu.attr("class").match(/selectcontacts/) && data.content.length === 0) { // cas où il n'y a pas de contact pour l'entreprise
    select_menu.filter(function () {
      return $(this).attr('name') === "contactId1";
    }).append("<option value=''>Pas de contact</option>");
  }

  //Pour chaque couple (champ/data) on y ajoute les éléments
  listeElem.forEach(function (elems, select) {
    elems.forEach(function (elem) {
      select.each(function () {
        let selected = "";
        if (elem.id == $(this).attr('data-selected')) {
          selected = "selected";
        }
        if ($(this).attr("class").match(/selectfirm/)) {
          $(this).append("<option value='" + elem.id + "' " + selected + ">" + elem.name + "</option>");
        } else {
          $(this).append("<option value='" + elem.id + "' " + selected + ">" + elem.firstName + " " + elem.lastName + "</option>");
        }
      });
    });
  });

  select_menu.selectpicker('refresh');
  if (!init) {select_menu.addClass('open').selectpicker('setStyle');}
}