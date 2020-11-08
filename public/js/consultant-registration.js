$(document).ready(async function(){
  var fields = [
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
      name: "department",
      title: "Département",
      cellRenderer: escapeCell
    },
    {
      name: "createdDate",
      title: "Date d'Inscription",
      cellRenderer: escapeCell
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
      window.open(`/sg/registrations/consultants/${args.item.id}/view`);
    },

    fields,

    controller: {
      loadData: function(filter) {
        return $.ajax({
          type: "GET",
          url: "/sg/data/consultants",
          data: removeFalsy(filter)
        });
      }
    }
  });

  $("input[type='radio'][name='pageSize']").click(function() {
    $("#result-table").jsGrid("option", "pageSize", $(this).val());
  });
});
