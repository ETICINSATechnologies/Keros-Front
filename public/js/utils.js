// Helper functions
// General helpers
function deleteElement(id) {
  $(`[id="${id}"`).remove();
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

function escapeCell(value, _item) {
  return $("<td>").append(escapeHTML(value));
}

function removeFalsyExceptFalse(object) {
  var newObject = {};
  Object.keys(object).forEach(function (key) {
    if (!(object[key] === undefined || object[key] === "" || object[key] === 0)) {
      newObject[key] = object[key];
    }
  });
  return newObject;
}

function generateFilterTemplate(defaultValue, type) {
  switch (type) {
    case "checkbox":
      if (defaultValue === "true") {
        return function() {
          const $filterControl = jsGrid.fields.checkbox.prototype.filterTemplate.call(this);
          return $filterControl.prop({
            indeterminate: false,
            checked: true
          });
        }
      } else {
        return function() {
          const $filterControl = jsGrid.fields.checkbox.prototype.filterTemplate.call(this);
          return $filterControl.prop({
            indeterminate: false,
            checked: false
          });
        }
      }
  }
}

function setDefaultFilterValues(fields, queryString) {
  const query = new URLSearchParams(queryString);
  return fields.map((field) => {
    if (query.has(field.name) && query.get(field.name)) {
      return {
        ...field,
        filterTemplate: generateFilterTemplate(query.get(field.name), field.type)
      };
    }
    return field;
  });
}
// end JSGrid helpers

// File input helpers
function triggerFileInput() {
  $(this).next("input[type=file]").trigger("click");
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
    data,
    success: function() {
      window.location.reload();
    }
  });
}
// end File input helpers

// Form helpers
function validateFields(id1, id2, message) {
  if ($(`#${id1}`).val() === $(`#${id2}`).val()) {
    $(`#${id2}`).removeClass("is-invalid");
    $(`#${id2}`).addClass("is-valid");
    $(`#${id2}`)[0].setCustomValidity("");
  } else {
    $(`#${id2}`).removeClass("is-valid");
    $(`#${id2}`).addClass("is-invalid");
    $(`#${id2}`)[0].setCustomValidity(message);
  }
}
// end Form helpers
