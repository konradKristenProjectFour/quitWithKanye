const soberApp = {};

let timer = document.getElementById('timer'); 
let toggleBtn = document.getElementById('toggle');
let resetBtn = document.getElementById('reset');
let watch = new Stopwatch(timer);

// Link to api
soberApp.baseUrl = `https://api.kanye.rest?format=text`;

// Retrieve data from api
soberApp.getQuotes = function () {
    $.ajax({
        url: soberApp.baseUrl,
        method: "GET",
        datatype: "json"
    }).then(function (result) {
        // feed result into insertQuote if it excludes fuck
        if (result.indexOf("fuck") === -1) {
            soberApp.insertQuote(result); 
        } else {
            soberApp.getQuotes(); 
        }
    });
};

// plugs insertQuote result into quoteContainer
soberApp.insertQuote = function(newQuote) {
    $(".quoteContainer").html(`<p>${newQuote}</p>`)
};

//on demand quotes
soberApp.clickKanye = function() {
    $(".kanyeButton").on("click", function() {
        soberApp.getQuotes();
    })
}

//listen for submit, save variables, switch to next screen
soberApp.formSubmit = () => {
    $("form").on("submit", function(event) {
    event.preventDefault(); 
    watch.start();
    
    //declare variables based on user inputs
    let userName = soberApp.retrieveUserName();
    let habit = soberApp.retrieveHabit();
    let spend = soberApp.retrieveSpend();

    //move welcome form off page to show dashboard
    $(".welcome").addClass("removeSection");
    $(".dashboard").removeClass("removeSection");
    })
};

//variables are declared outside submit form to be used in Stopwatch
soberApp.retrieveUserName = () => {
    return $('input[name="username"]').val();
}

soberApp.retrieveHabit = () => {
    return $('input[name="habit"]').val();
}

soberApp.retrieveSpend = () => {
    return Number($('input[name="spend"]').val());
}

//reset button refreshes page
soberApp.formReset = () => {
    $("form").on("reset", function(event) {
        watch.reset();
        $(".welcome").removeClass("removeSection");
        $(".dashboard").addClass("removeSection");
        $("ul").html("");
    });
};

soberApp.init = () => {
    soberApp.getQuotes();
    soberApp.insertQuote();
    soberApp.clickKanye(); 
    soberApp.formSubmit(); 
    soberApp.formReset();
};

$(document).ready(function() {
    soberApp.init();
});






//list for click on submit button
// toggleBtn.addEventListener('click', function() {
//     watch.start();
// });

// resetBtn.addEventListener('click', function () {
//     watch.reset();
// });

// //reset button refreshes page
// soberApp.formReset = () => {
//     $("form").on("reset", function(event) {
//         $(".welcome").removeClass("removeSection");
//         $(".dashboard").addClass("removeSection");
//     });
// };
