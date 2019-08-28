const soberApp = {};

// this is the link that accesses the api
soberApp.baseUrl = `https://api.kanye.rest?format=text`;

// this is the function that retrieves the data from the api
soberApp.getQuotes = function () {
    $.ajax({
        url: soberApp.baseUrl,
        method: "GET",
        datatype: "json"
    }).then(function (result) {
        // result is the data we received
        soberApp.insertQuote(result); 
        // we feed the result into our insertQuote function
    });
};

// this plugs into quoteContainer class
soberApp.insertQuote = function(newQuote) {
    $(".quoteContainer").html(`<p>${newQuote}</p>`)
};

soberApp.stopWatch = function() {
    let now = Date.now();
    


};


soberApp.init = () => {
    soberApp.getQuotes();
    soberApp.insertQuote;
};

$(document).ready(function() {
    soberApp.init();
});