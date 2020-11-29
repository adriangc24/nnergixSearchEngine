var result = []
var currentPage = 1;

//#region listeners
$("input#searchButton").on("click", function() {
    searchFunction($("input#searchInput").val())
})

$("input#searchInput").on('keyup', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        searchFunction($("input#searchInput").val())
    }
})

$("#goBackButton").on('click', function(e) {
    $("div#resultsContainer").hide()
    $("div#mainContainer").show()
})

$("#itemsPerPage").on("change", function() {
    appendResults(result);
})

$("li.page-item").on("click", function() {
        if (!$(this).hasClass("disabled")) {
            if ($(this).children("a").text().includes("«")) {
                $("li.number").each(function(i, elem) {
                    $(this).children("a").text(parseInt($(this).children("a").text()) - 3)
                })
                currentPage -= 3;
            } else if ($(this).children("a").text().includes("»")) {
                $("li.number").each(function(i, elem) {
                    $(this).children("a").text(parseInt($(this).children("a").text()) + 3)
                })
                currentPage += 3;
            } else {
                currentPage = parseInt($(this).children("a").text())
            }

            if (currentPage >= 1 && currentPage <= 3) {
                $("li.page-item a:contains('«')").parent().addClass("disabled")
            } else {
                $("li.page-item a:contains('«')").parent().removeClass("disabled")
            }

            appendResults(result)
        }
    })
    //#endregion

searchFunction = (textToSearch) => {
    if (!/\S/.test(textToSearch)) {
        throw "invalid search"
    }
    let data = {
        query: textToSearch
    }

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:3000/search",
        data: data,
        dataType: "*",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                $("div.alert > span").text("ERROR: " + response.error).parent().show()
                throw "Error " + response.error
            }
            result = response.result;
            $("div.alert").hide()
            $("div#mainContainer").hide()
            $("div#resultsContainer").show()
            appendResults(result);
        },
        error: function(err) {
            console.log(err)
        }
    });
}

appendResults = (result) => {
    $("ul.list-group").empty()

    let itemsPerPage = parseInt($("#itemsPerPage option:selected").val())

    let i, x;
    if (currentPage == 1) {
        i = 0;
        x = itemsPerPage * currentPage
    } else {
        i = (currentPage - 1) * itemsPerPage
        x = itemsPerPage * currentPage;
    }

    if (x <= result.length) {
        $("li.page-item a:contains('»')").parent().removeClass("disabled")
        for (i; i < x; i++) {
            $(".list-group").append(`<li class="list-group-item">${result[i]}</li>`)
        }
    } else {
        $("li.page-item a:contains('»')").parent().addClass("disabled")
    }
    result = []


    $(".list-group-item").on("click", function() {
        $(".list-group-item").removeClass("active")
        $(this).addClass("active")
    })

    $(".list-group-item").on("dblclick", function() {
        searchFunction($(this).text())
    })

    // $("#currentPage").text("Current page: " + currentPage)
    $("li.page-item").removeClass("active")
    $(`li.page-item a:contains('${currentPage}')`).parent().addClass("active")
}