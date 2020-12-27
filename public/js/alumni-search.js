$(async function() {
  const positions = await $.ajax({
    type: "GET",
    url: "/data/positions"
  });

  const poles = await $.ajax({
    type: "GET",
    url: "/data/poles"
  });

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
      name: "positionId",
      title: "Position",
      type: "select",
      items: [
        { id: 0, label: "" },
        ...positions
      ],
      valueField: "id",
      textField: "label",
      sorting: false
    },
    {
      name: "poleId",
      title: "Pôle",
      type: "select",
      items: [
        { id: 0, name: "" },
        ...poles
      ],
      valueField: "id",
      textField: "name",
      sorting: false
    },
    {
      name: "company",
      title: "Entreprise",
      type: "text",
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
      window.open(`/profile/alumni/${args.item.id}/view`);
    },

    fields,

    controller: {
      loadData: function(filter) {
        return $.ajax({
          type: "GET",
          url: "/data/alumni",
          data: removeFalsy(filter)
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
      url: "/export/members",
      data: { idList },
      success: function(res) {
        window.location.href = res.location;
      }
    });
  });
});
