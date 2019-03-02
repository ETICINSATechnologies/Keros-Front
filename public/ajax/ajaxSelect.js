$('document').ready( function() {
  generateFirmOptions();
  generateConsultantOptions();
  generateLeaderOptions();
  generateQualityLeaderOptions();
  generateContactOptions();
});


$('body').on('change','.selectfirm' , function () { // Si on change de firm on enlève les contacts précédemment sélectionnés
  $('.selectcontacts option').remove();
  generateContactOptions(); // nécessaire en raison du délai de chargement de la page lors d'un viewStudy d'une étude existante
});

function generateContactOptions() {
  let selectedFirmId = $('.selectfirm option:selected').attr('value'); // Si une firm est séléctionnée on charge ses contacts (1) sinon on attend que ce soit le cas (2)
  if(selectedFirmId) { // (1)
    $.ajax({
      url: "/ua/contact/json",
      data: {firmId: selectedFirmId}
    }).then(function(data) {
      if (data.content.length !== 0) { // si résultats alors on affiche le résultat correspondant à l'étude
        $.each([1,2,3], (_, number) => {
          const selectObj = $(`.selectcontacts[data-n=${number}]`);
          const selectedContact = selectObj.attr('data-selected');
          $.each(data.content, (_, contact) => {
            if (contact.id == selectedContact) {
              selectObj.append(`<option value='${contact.id}' selected>${contact.firstName} ${contact.lastName}</option>`).trigger('change');
            }
          });
        });
      } else {
        $('.selectcontacts').append(`<option selected disabled>Pas de contact pour cette société</option>`).trigger('change');

      }
    });
    $.each([1,2,3], (_, number) => {
      const selectObj = $(`.selectcontacts[data-n=${number}]`);
      selectObj.select2({
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
            let result = [{
              text: "Pas de résultat",
              id: 0,
              disabled: true
            }];
            if (data.content.length !== 0) {
              result = $.map(data.content, function(obj) {
                obj.text = obj.text || `${obj.firstName} ${obj.lastName}`;
                return obj;
              });
            }
            return {
              results: result // le format doit être un tableau d'élements du type (au minimum) { text: "..." id: "..." }
            };
          }
        },
        minimumInputLength: 1,
        placeholder : "Search a contact"
      });
    });
  } else { // (2)
    const selectObj = $('.selectcontacts');
    selectObj.select2();
    selectObj.append("<option selected disabled>Veuillez sélectionner une société</option>").trigger('change');
  }
}

function generateFirmOptions() {
  let selectFirm = $('.selectfirm');
  let selectedFirmId = selectFirm.attr('data-selected');
  if(selectedFirmId) {
    $.ajax({
      url: "/ua/firm/json",
      data: {firmId: selectedFirmId}
    }).then(function(data) {
      selectFirm.append(`<option value='${data.content[0].id}' selected>${data.content[0].name}</option>`).trigger('change');
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
        let result = [{
          text: "Pas de résultat",
          id: 0,
          disabled: true
        }];
        if (data.content.length !== 0) {
          result = $.map(data.content, function(obj) {
            obj.text = obj.text || `${obj.name}`;
            return obj;
          });
        }
        return {
          results: result // le format doit être un tableau d'élements du type (au minimum) { text: "..." id: "..." }
        };
      }
    },
    minimumInputLength: 1,
    placeholder : "Search a firm"
  });
}

function generateLeaderOptions() {
  // Si étude existante on charge ses éléments
  $.ajax({
    url: "/core/member/json",
    data: {positionId: 3} // id chargé d'affaires
  }).then(function(data) {
    $.each([1,2,3], (_, number) => {
      const selectObj = $(`.selectleaders[data-n=${number}]`);
      const selectedLeader = selectObj.attr('data-selected');
      $.each(data.content, (_, leader) => {
        if (leader.id == selectedLeader) {
          selectObj.append(`<option value='${leader.id}' selected>${leader.firstName} ${leader.lastName}</option>`).trigger('change');
        }
      });
    });
  });
  $.each([1,2,3], (_, number) => {
    const selectObj = $(`.selectleaders[data-n=${number}]`);
    selectObj.select2({
      ajax: {
        url: "/core/member/json",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            search: params.term,
            positionId: 3 // id chargé d'affaires
          }
        },
        processResults: function (data) {
          let result = [{
            text: "Pas de résultat",
            id: 0,
            disabled: true
          }];
          if (data.content.length !== 0) {
            result = $.map(data.content, function(obj) {
              obj.text = obj.text || `${obj.firstName} ${obj.lastName}`;
              return obj;
            });
          }
          return {
            results: result // le format doit être un tableau d'élements du type (au minimum) { text: "..." id: "..." }
          };
        }
      },
      minimumInputLength: 1,
      placeholder : "Search a leader"
    });
  });
}

function generateQualityLeaderOptions() {
  // Si étude existante on charge ses éléments
  $.ajax({
    url: "/core/member/json",
    data: {poleId: 4} // id pole performance
  }).then(function(data) {
    $.each([1,2,3], (_, number) => {
      const selectObj = $(`.selectqualityleaders[data-n=${number}]`);
      const selectedLeader = selectObj.attr('data-selected');
      $.each(data.content, (_, leader) => {
        if (leader.id == selectedLeader) {
          selectObj.append(`<option value='${leader.id}' selected>${leader.firstName} ${leader.lastName}</option>`).trigger('change');
        }
      });
    });
  });
  $.each([1,2,3], (_, number) => {
    const selectObj = $(`.selectqualityleaders[data-n=${number}]`);
    selectObj.select2({
      ajax: {
        url: "/core/member/json",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            search: params.term,
            poleId: 4 // id pôle performance
          }
        },
        processResults: function (data) {
          let result = [{
            text: "Pas de résultat",
            id: 0,
            disabled: true
          }];
          if (data.content.length !== 0) {
            result = $.map(data.content, function(obj) {
              obj.text = obj.text || `${obj.firstName} ${obj.lastName}`;
              return obj;
            });
          }
          return {
            results: result // le format doit être un tableau d'élements du type (au minimum) { text: "..." id: "..." }
          };
        }
      },
      minimumInputLength: 1,
      placeholder : "Search a quality leader"
    });
  });
}

function generateConsultantOptions(){
  // Si étude existante on charge ses éléments
  $.ajax({
    url: "/core/member/json",
    data: {positionId: 6} // id consultant
  }).then(function(data) {
    $.each([1,2,3], (_, number) => {
      const selectObj = $(`.selectconsultants[data-n=${number}]`);
      const selectedConsultant = selectObj.attr('data-selected');
      $.each(data.content, (_, consultant) => {
        if (consultant.id == selectedConsultant) {
          selectObj.append(`<option value='${consultant.id}' selected>${consultant.firstName} ${consultant.lastName}</option>`).trigger('change');
        }
      });
    });
  });
  $.each([1,2,3], (_, number) => {
    const selectObj = $(`.selectconsultants[data-n=${number}]`);
    selectObj.select2({
      ajax: {
        url: "/core/member/json",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            search: params.term,
            positionId: 6 // id consultant
          }
        },
        processResults: function (data) {
          let result = [{
            text: "Pas de résultat",
            id: 0,
            disabled: true
          }];
          if (data.content.length !== 0) {
            result = $.map(data.content, function(obj) {
              obj.text = obj.text || `${obj.firstName} ${obj.lastName}`;
              return obj;
            });
          }
          return {
            results: result // le format doit être un tableau d'élements du type (au minimum) { text: "..." id: "..." }
          };
        }
      },
      minimumInputLength: 1,
      placeholder : "Search a consultant"
    });
  });
}
