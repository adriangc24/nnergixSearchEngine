$("input#searchButton").on("click", function() {
    searchFunction($("input#searchInput").val())
})

$("input#searchInput").on('keyup', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        searchFunction($("input#searchInput").val())
    }
})

searchFunction = (textToSearch) => {
    if (!/\S/.test(textToSearch)) {
        throw "invalid search"
    }
    let data = {
        toSearch: textToSearch
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/search",
        data: data,
        dataType: "json",
        success: function(response) {
            console.log("RESPONSE " + JSON.stringify(response))
        },
        error: function(err) {
            console.log(err)
        }
    });

}