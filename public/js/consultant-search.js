$(async function() {
  var fields = [
    {
      name: "username",
      title: "Nom d'Utilisateur",
      cellRenderer: escapeCell
    },
    {
      name: "lastName",
      title: "Nom",
      type: "text",
      cellRenderer: escapeCell
    },
    {
      name: "firstName",
      title: "Prénom",
      type: "text",
      cellRenderer: escapeCell
    },
    {
      name: "email",
      title: "Email",
      cellRenderer: escapeCell
    },
    {
      name: "isFr",
      title: "Français",
      type: "checkbox",
      sorting: false
    }
  ];

  $("#result-table").jsGrid({
    width: "100%",
    filtering: true,
    sorting: true,

    paging: true,
    pageLoading: true,
    autoload: true,

    pageSize: 12,
    pageButtonCount: 5,
    pagePrevText: "<",
    pageNextText: ">",
    pageFirstText: "<<",
    pageLastText: ">>",
    pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",

    selectedRowClass: "jsgrid-hover",
    rowClick: function(args) {
      window.open(`/profile/consultants/${args.item.id}/view`);
    },

    fields,

    controller: {
      loadData: function(filter) {
        return $.ajax({
          type: "GET",
          url: "/data/consultants",
          data: filter
        });
      }
    }
  });

  $("input[type='radio'][name='pageSize']").on("click", function() {
    $("#result-table").jsGrid("option", "pageSize", $(this).val());
  });

  $("button[name='export']").on("click", function() {
    var idList = $("#result-table").jsGrid("option", "data").map((row) => {
      return row.id;
    });
    $.ajax({
      type: "POST",
      url: "/export/consultants",
      data: { idList },
      success: function(res) {
        window.location.href = res.location;
      }
    });
  });
});
