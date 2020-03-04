try {
    let pathname = document.location.pathname;
    let parameters = document.location.search;

// Pour ItemPerPage

    let filter = parameters.replace(/pageSize=\d*/, "").substring(1);

    if (filter[0] === "&") {
        filter = filter.replace(/[&]?/, "");
    }

    $('#pageSize').change(function () {
        if (filter === "") {
            document.location = pathname + "?pageSize=" + this.options[this.selectedIndex].value;
        } else {
            document.location = pathname + "?pageSize=" + this.options[this.selectedIndex].value + "&" + filter;
        }
    });

// Pour OrderBy

    let value = parameters.match(/orderBy=\w*/);

    if (value) {
        let id = value.toString().substring(8);

        $(".select_filter").each(function () {
            let elem = $(this);
            elem.attr("href", pathname + parameters.replace(/orderBy=\w*/, "orderBy=" + this.getAttribute('id')).replace(/order=\w*/, "order=asc"));
        });

        if (parameters.match(/order=asc/)) {
            $("#" + id).attr("href", pathname + parameters.replace(/order=asc/, "order=desc"));
            $("#" + id).attr("class", "fa fa-sort-amount-asc fa-pull-right select_filter");
        } else {
            $("#" + id).attr("href", pathname + parameters.replace(/order=desc/, "order=asc"));
            $("#" + id).attr("class", "fa fa-sort-amount-desc fa-pull-right select_filter");
        }
    } else {
        $('.select_filter').each(function () {
            let elem = $(this);
            if (parameters !== "") {
                elem.attr("href", pathname + parameters + "&orderBy=" + this.getAttribute('id') + "&order=asc");
            } else {
                elem.attr("href", pathname + "?orderBy=" + this.getAttribute('id') + "&order=asc");
            }
        });
    }

// Pour Search

    $('#searching').change(function () {
        if (parameters !== "") {
            if (parameters.match(/\?search/)) {
                if (parameters.replace(/search=\w*/, "") !== "?") {
                    document.location = pathname + parameters.replace(/search=\w*&/, "") + "&search=" + this.value;
                } else {
                    document.location = pathname + parameters.replace(/search=\w*/, "") + "search=" + this.value;
                }
            } else {
                document.location = pathname + parameters.replace(/&search=\w*/, "") + "&search=" + this.value;
            }
        } else {
            document.location = pathname + "?search=" + this.value;
        }
    })
} catch {
}
