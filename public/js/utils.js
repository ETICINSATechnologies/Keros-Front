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
