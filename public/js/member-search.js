// Helper functions

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

var escapeCell = function(value, item) {
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

// jsGrid instantiation

$(document).ready(async function(){

	const positions = await $.ajax({
		type: "GET",
		url: "/data/positions"
	});

	const poles = await $.ajax({
		type: "GET",
		url: "/data/poles"
	});

	var memberFields = [
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
			textField: "label"
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
			textField: "name"
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
		fields: memberFields,

		controller: {
			loadData: function(filter) {
				return $.ajax({
					type: "GET",
					url: "/data/members",
					data: removeFalsy(filter)
				});
			}
		}
	});
});
