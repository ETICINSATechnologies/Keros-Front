$('document').ready( function() {
  generateFirmOptions();
  generateConsultantOptions();
  generateLeaderOptions();
  generateQualityLeaderOptions();
  generateContactOptions();
});


$('body').on('change','.selectfirm' , function () {
  $('.selectcontacts option').remove();
  generateContactOptions();
});

function generateContactOptions(page, numSelect) {

  let selectContacts = $('.selectcontacts');
  let selectedFirmId = $('.selectfirm option:selected').attr('value');
  /**if(selectedFirmId) {
    $.ajax({
      url: "/ua/contact/json",
      data: {firmId: selectedFirmId}
    }).then(function(data) {
      $.each(selectContacts, (_, selectObj) => {
        let selectedContact = selectObj.attr('data-selected');
        $.each(data.content, (_, contact) => {
          if (contact.id === selectedContact) {
            selectObj.append(`<option value='${contact.id}' selected>${contact.name}</option>`)
          }
        });
        selectObj.trigger('change');
        selectObj.trigger({
          type: 'select2:select',
          params: {
            data: data.content
          }
        });
      });
    });
  }**/

  selectContacts.select2({
    ajax: {
      url: "/ua/contact/json",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          search: params.term,
          firmId: selectedFirmId
        }
      },
      processResults: function (data) {
        let result = $.map(data.content, function(obj) {
          obj.selected = selectedFirmId === obj.id;
          obj.text = obj.text || obj.name;
          return obj;
        });
        return {
          results: result
        };
      }
    },
    minimumInputLength: 1,
    placeholder : "Search a contact"
  });
  /**
  // Si une entreprise est selectionnée, on utilise son ID
  let selectedFirm = $('#selectFirm option:selected').attr('value');
  // Sinon le firm ID initial du study
  if (!selectedFirm) {
    selectedFirm = $('#selectFirm').attr('data-selected');
  }
  let params = {
    firmId: selectedFirm
  };
  if (page) { //Si on cherche une nouvelle page, on ne va modifier que le contenu d'un select, pas de tous les champs possibles
    $(`.selectcontacts[data-n=${numSelect}] option`).remove();
    params.pageNumber = page;
  } else {
    $('.selectcontacts option').remove();
  }
  if (selectedFirm === "") {
    $(`.selectcontacts[data-n=${1}]`).append("<option>Veuillez sélectionner une société</option>"); //Si aucune société n'est pré-sélectionnée au chargement de la page (cas du study/create)
  }
  $.get("/ua/contact/json?" + $.param(params), function (data) {
    if (!page) { // Pour chaque select
    $.each([1, 2, 3], (_, number) => {
        const selectObj = $(`.selectcontacts[data-n=${number}]`);
        let html = "<option></option>";
        if(number === 1 && data.content.length === 0) { //si aucun contact, on le précise dans le premier champ
          html = "<option>Aucun contact</option>";
        }
        selectObj.append(html);
        $.each(data.content, (_, contact) => {
          let selected = (`${contact.id}` === selectObj.attr("data-selected")) ? "selected" : "";
          let html = `<option value="${contact.id}" ${selected}>${contact.firstName} ${contact.lastName}</option>`;
          selectObj.append(html);
        });
        paginate(selectObj, data.meta);
        selectObj.selectpicker('refresh');
      });
    } else { //Si page alors on ne modifie que le select avec lequel le user a intéragi
      const selectObj = $(`.selectcontacts[data-n=${numSelect}]`);
      let html = "<option></option>";
      selectObj.append(html);
      $.each(data.content, (_, contact) => {
        let selected = (`${contact.id}` === selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${contact.id}" ${selected}>${contact.firstName} ${contact.lastName}</option>`;
        selectObj.append(html);
      });
      paginate(selectObj, data.meta);
      selectObj.selectpicker('refresh');
    }
  });**/
}

function generateFirmOptions(page) {
  /**
  let params = {};
  if (page) {
    params.pageNumber = page;
  }
  let selectObj = $('#selectFirm');
  $('#selectFirm option').remove();
  selectObj.append("<option>Aucune société sélectionnée</option>");
  $.get("/ua/firm/json?" + $.param(params), function (data) {
    $.each(data.content, (_, firm) => {
      let selected = (`${firm.id}` === selectObj.attr("data-selected")) ? "selected" : "";
      let html = `<option value="${firm.id}" ${selected}>${firm.name}</option>`;
      selectObj.append(html);
    });
    paginate(selectObj, data.meta);
    selectObj.selectpicker('refresh');
  });**/

  let selectFirm = $('.selectfirm');
  let selectedFirmId = selectFirm.attr('data-selected');
  if(selectedFirmId) {
    $.ajax({
      url: "/ua/firm/json",
      data: {firmId: selectedFirmId}
    }).then(function(data) {
      selectFirm.append(`<option value='${data.content[0].id}' selected>${data.content[0].name}</option>`).trigger('change');
      selectFirm.trigger({
        type: 'select2:select',
        params: {
          data: data.content[0]
        }
      });
    });
  }

  selectFirm.select2({
    ajax: {
      url: "/ua/firm/json",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          search: params.term,
        }
      },
      processResults: function (data) {
        let result = $.map(data.content, function(obj) {
          obj.selected = selectedFirmId === obj.id;
          obj.text = obj.text || obj.name;
          return obj;
        });
        return {
          results: result
        };
      }
    },
    minimumInputLength: 1,
    placeholder : "Search a firm"
  });
}

function generateLeaderOptions(page, numSelect) {
  let params = {
    positionId: 3 // Chargé d'affaires
  };
  if (page) { //Si on cherche une nouvelle page, on ne va modifier que le contenu d'un select, pas de tous les champs possibles
    $(`.selectleaders[data-n=${numSelect}] option`).remove();
    params.pageNumber = page;
  } else {
    $('.selectleaders option').remove();
  }
  $.get("/core/member/json?"  + $.param(params), function (data) {
    if(!page) {
      $.each([1,2, 3], (_, number) => {
        const selectObj = $(`.selectleaders[data-n=${number}]`);
        let html = "<option></option>";
        if (number === 1) {
          html = "<option>Aucun membre/responsable</option>";
        }
        selectObj.append(html);
        $.each(data.content, (_, leader) => {
          let selected = (`${leader.id}` === selectObj.attr('data-selected')) ? "selected" : "";
          let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
          selectObj.append(html);
        });
        paginate(selectObj, data.meta);
        selectObj.selectpicker('refresh');
      });
    } else { //Si page alors on ne modifie que le select avec lequel le user a intéragi
      const selectObj = $(`.selectleaders[data-n=${numSelect}]`);
      let html = "<option></option>";
      if (numSelect === "1") {
        html = "<option>Aucun membre/responsable</option>";
      }
      selectObj.append(html);
      $.each(data.content, (_, leader) => {
        let selected = (`${leader.id}` === selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
        selectObj.append(html);
      });
      paginate(selectObj, data.meta);
      selectObj.selectpicker('refresh');
    }
  });
}

function generateQualityLeaderOptions(page, numSelect) {
  let params = {
    poleId: 4 // Performance
  };
  if (page) { //Si on cherche une nouvelle page, on ne va modifier que le contenu d'un select, pas de tous les champs possibles
    $(`.selectqualityleaders[data-n=${numSelect}] option`).remove();
    params.pageNumber = page;
  } else {
    $('.selectqualityleaders option').remove();
  }
  $.get("/core/member/json?"  + $.param(params), function (data) {
    if (!page) {
      $.each([1,2], (_, number) => {
        const selectObj = $(`.selectqualityleaders[data-n=${number}]`);
        let html = '<option></option>';
        if (number === 1) {
          html = "<option>Aucun membre/responsable</option>";
        }
        selectObj.append(html);
        $.each(data.content, (_, leader) => {
          let selected = (`${leader.id}` === selectObj.attr("data-selected")) ? "selected" : "";
          let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
          selectObj.append(html);
        });
        paginate(selectObj, data.meta);
        selectObj.selectpicker('refresh');
      });
    } else { //Si page alors on ne modifie que le select avec lequel le user a intéragi
      const selectObj = $(`.selectqualityleaders[data-n=${numSelect}]`);
      let html = "<option></option>";
      if (numSelect === "1") {
        html = "<option>Aucun membre/responsable</option>";
      }
      selectObj.append(html);
      $.each(data.content, (_, leader) => {
        let selected = (`${leader.id}` === selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
        selectObj.append(html);
      });
      paginate(selectObj, data.meta);
      selectObj.selectpicker('refresh');
    }
  });
}

function generateConsultantOptions(page, numSelect){
  let params = {
    positionId: 6 // Consultant
  };
  if (page) { //Si on cherche une nouvelle page, on ne va modifier que le contenu d'un select, pas de tous les champs possibles
    $(`.selectconsultants[data-n=${numSelect}] option`).remove();
    params.pageNumber = page;
  } else {
    $('.selectconsultants option').remove();
  }
  $.get("/core/member/json?"  + $.param(params), function (data) {
    if (!page) {
      $.each([1, 2, 3], (_, number) => {
        const selectObj = $(`.selectconsultants[data-n=${number}]`);
        let html = "<option></option>";
        if (number === 1) {
          html = "<option>Aucun membre/responsable</option>";
        }
        selectObj.append(html);
        $.each(data.content, (_, consultant) => {
          let selected = (`${consultant.id}`=== selectObj.attr("data-selected")) ? "selected" : "";
          let html = `<option value="${consultant.id}" ${selected}>${consultant.firstName} ${consultant.lastName}</option>`;
          selectObj.append(html);
        });
        paginate(selectObj, data.meta);
        selectObj.selectpicker('refresh');
      });
    } else { //Si page alors on ne modifie que le select avec lequel le user a intéragi
      const selectObj = $(`.selectconsultants[data-n=${numSelect}]`);
      let html = "<option></option>";
      if (numSelect === "1") {
        html = "<option>Aucun membre/responsable</option>";
      }
      selectObj.append(html);
      $.each(data.content, (_, consultant) => {
        let selected = (`${consultant.id}`=== selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${consultant.id}" ${selected}>${consultant.firstName} ${consultant.lastName}</option>`;
        selectObj.append(html);
      });
      paginate(selectObj, data.meta);
      selectObj.selectpicker('refresh');
    }
  });
}

function paginate(select, meta) {
    if (meta.totalPages === 1 || meta.totalPages === 0) {
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
