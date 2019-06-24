$('document').ready( function() {
  generateFirmOptions();
  generateConsultantOptions();
  generateLeaderOptions();
  generateQualityLeaderOptions();
  generateContactOptions(false);
});


$('body').on('change','.selectfirm' , function () { // Si on change de firm on enlève les contacts précédemment sélectionnés
  $('.selectcontacts option').remove();
  generateContactOptions(true);
});

function generateContactOptions(reload) {
  let selectedFirmId = $('.selectfirm option:selected').attr('value'); // Si une firm est séléctionnée on laisse la possibilité de sélectionner les contacts correspondants (1) sinon on attend que ce soit le cas (2)
  if(selectedFirmId) { // (1)
    if(reload) { // si on sélectionne une nouvelle société on test si elle a des contacts associés dans la BDD
      $.ajax({
        url: "/ua/contact/json",
        data: {firmId: selectedFirmId}
      }).then(function(data) {
        if (data.content.length == 0) { // Si pas de contact pour cette société on le précise
          $('.selectcontacts').append(`<option selected disabled>Pas de contact pour cette société</option>`).trigger('change'); // si pas de contacts pour cette entreprise on le précise
        }
      });
    }
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
  $('.selectfirm').select2({
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
              obj.id = `${obj.id}/${obj.firstName} ${obj.lastName}`;
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

/**
$("#addFileFormButton").click(function(e) {
  let files = new FormData(); // you can consider this as 'data bag'
  const form = $("#addFileForm");
  files.append("file", $("#addFile")[0].files[0]);
  const action = form.attr("action");
  const url = 'http://pre-keros-api.etic-insa.com/api/v1/' + action;

  $.ajax({
    type: "POST",
    url: url,
    processData: false,
    crossDomain: true,
    mimeTypes: "multipart/form-data",
    contentType: false,
    data: files,
    success: function(response) {
      console.log(response);

    },
    error: function(err) {
      console.log(err);
    },
  });
});
 */
