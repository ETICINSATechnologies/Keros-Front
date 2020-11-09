// Helper functions
// General helpers
function deleteElement(id) {
  $(`[id='${id}'`).remove();
}
// end General helpers

// Position helpers
function addNewPosition() {
  var position = $("#addPosition option:selected").text();
  var positionId = $("#addPosition").val();
  var year = $("#addYear").val();
  var id = `${position}${year}`;

  if ($(`[id="${id}"]`).length || !year || isNaN(year)) {
    return;
  }

  $("#added-positions").append(
    $("<div/>", {
      id,
      class: "d-flex justify-content-between align-center px-4 py-1 my-1 bg-primary rounded-pill"
    }).append(
      $("<label/>", { class: "m-0 py-1" }).text(`${position} - ${year}`)
    ).append(
      $("<input/>", {
        name: `positionToAdd[${year}]`,
        hidden: true,
        type: "text"
      }).val(positionId)
    ).append(
      $("<button/>", {
        type: "button",
        class: "btn btn-primary btn-sm rounded-circle",
        click: function() { deleteElement(id); }
      }).append(
        $("<i/>", { class: "fas fa-minus" })
      )
    )
  );
}
// end Position helpers

// JSGrid helpers
function escapeHTML(s, noEscapeQuotes) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  if (!s || !s.replace) {
    return s;
  }

  return s.replace(noEscapeQuotes ? /[&<>]/g : /[&<>'"]/g, function(c) {
    return map[c];
  });
}

function escapeCell(value, item) {
  return $("<td>").append(escapeHTML(value));
}

function removeFalsy(object) {
  var newObject = {};
  Object.keys(object).forEach(function (key) {
    if (object[key]) {
      newObject[key] = object[key];
    }
  });
  return newObject;
}
// end JSGrid helpers

// File input helpers
function triggerFileInput() {
  $(this).next("input[type=file]").click();
}

function uploadFile(id, doc, entity) {
  var data = new FormData();
  data.append("file", $(this)[0].files[0]);

  $.ajax({
    type: "POST",
    url: `/sg/registrations/${entity}/${id}/documents/${doc}`,
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    data
  });
}
// end File input helpers
