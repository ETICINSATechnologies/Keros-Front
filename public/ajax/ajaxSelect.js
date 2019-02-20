function generateFirmOptions() {
  $("#selectFirm").empty();
  $.get("/ua/firm/json", function (data) {
    $.each(data.content, (_, firm) => {
      let selected = (firm.id == $("#selectFirm").attr("data-selected")) ? "selected" : "";
      let html = `<option value="${firm.id}" ${selected}>${firm.name}</option>`;
      $("#selectFirm").append(html);
    });
  });
}

function generateContactOptions() {
  $(".selectcontacts").empty();
  // Si une entreprise est selectionné, on utilisé son ID
  let selectedFirm = $('#selectFirm option:selected').attr('value');
  // Sinon le firm ID initial du study
  if (!selectedFirm) {
    selectedFirm = $('#selectFirm').attr('data-selected');
  }
  let params = {
    firmId: selectedFirm
  };
  $.get("/ua/contact/json?" + $.param(params), function (data) {
    // Pour chaque select
    $.each([1, 2, 3], (_, number) => {
      const selectObj = $(`.selectcontacts[data-n=${number}]`);
      let html = "<option></option>";
      selectObj.append(html);
      $.each(data.content, (_, contact) => {
        let selected = (contact.id == selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${contact.id}" ${selected}>${contact.firstName} ${contact.lastName}</option>`;
        selectObj.append(html);
      });
    });
  });
}

function generateLeaderOptions() {
  let params = {
    positionId: 3 // Chargé d'affaires
  };
  $.get("/core/member/json?" + $.param(params), function (data) {
    $.each([1, 2, 3], (_, number) => {
      const selectObj = $(`.selectleaders[data-n=${number}]`);
      let html = "<option></option>";
      selectObj.append(html);
      $.each(data.content, (_, leader) => {
        let selected = (leader.id == selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
        selectObj.append(html);
      });
    });
  });
}

function generateConsultantOptions() {
  let params = {
    positionId: 6 // Consultant
  };
  $.get("/core/member/json?" + $.param(params), function (data) {
    $.each([1, 2, 3], (_, number) => {
      const selectObj = $(`.selectconsultants[data-n=${number}]`);
      let html = "<option></option>";
      selectObj.append(html);
      $.each(data.content, (_, consultant) => {
        let selected = (consultant.id == selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${consultant.id}" ${selected}>${consultant.firstName} ${consultant.lastName}</option>`;
        selectObj.append(html);
      });
    });
  });
}

function generateQualityLeaderOptions() {
  let params = {
    poleId: 4 // Performance
  };
  $.get("/core/member/json?" + $.param(params), function (data) {
    $.each([1, 2], (_, number) => {
      const selectObj = $(`.selectqualityleaders[data-n=${number}]`);
      let html = '<option></option>';
      selectObj.append(html);
      $.each(data.content, (_, leader) => {
        let selected = (leader.id == selectObj.attr("data-selected")) ? "selected" : "";
        let html = `<option value="${leader.id}" ${selected}>${leader.firstName} ${leader.lastName}</option>`;
        selectObj.append(html);
      });
    });
  });
}

$('document').ready(function () {
  generateFirmOptions();
  generateContactOptions();
  generateLeaderOptions();
  generateConsultantOptions();
  generateQualityLeaderOptions();

  // Quand on change de Firm, on recharge les contacts
  $("#selectFirm").change(() => {
    generateContactOptions();
  });
});