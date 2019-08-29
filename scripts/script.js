

const soberApp = {};

let timer = document.getElementById('timer');
let toggleBtn = document.getElementById('toggle');
let resetBtn = document.getElementById('reset');

let watch = new Stopwatch(timer);

// console.log(timer.textContent);

console.log();

toggleBtn.addEventListener('click', function() {
    // if (watch.isOn) {
    //     watch.stop();
    //     toggleBtn.textContent = 'Start';
    // } 
    // else {
        watch.start();
    //     toggleBtn.textContent = 'Stop';
    // }
});

resetBtn.addEventListener('click', function () {
    watch.reset();
});


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

// soberApp.stopWatch = function() {
//     let now = Date.now();
// };

soberApp.clickKanye = function() {
    $(".kanyeButton").on("click", function() {
        soberApp.getQuotes();
    })
}

soberApp.formSubmit = () => {
    $("form").on("submit", function(event) {
    
    // prevent default page refresh
    event.preventDefault(); 
    
    //declare variables for user inputs
    const username = $('input[name="username"]').val();
    const habit = $('input[name="habit"]').val();
    const spend = $('input[name="spend"]').val();

    //move welcome form off page to show dashboard
    $(".welcome").addClass("removeSection");
    $(".dashboard").removeClass("removeSection");

    })
};

soberApp.formSubmit = () => {
    $("form").on("submit", function(event) {
    
    // prevent default page refresh
    event.preventDefault(); 
    
    //declare variables for user inputs
    let userName = soberApp.retrieveUserName();
    let habit = soberApp.retrieveHabit();
    let spend = soberApp.retrieveSpend();

    console.log(userName);

    //move welcome form off page to show dashboard
    $(".welcome").addClass("removeSection");
    $(".dashboard").removeClass("removeSection");

    })
};

soberApp.retrieveUserName = () => {
    return $('input[name="username"]').val();
}

soberApp.retrieveHabit = () => {
    return $('input[name="habit"]').val();
}

soberApp.retrieveSpend = () => {
    return $('input[name="spend"]').val();
}

soberApp.counter = 0;

//reset button refreshes page
soberApp.formReset = () => {
  $("form").on("reset", function(event) {

    $(".welcome").removeClass("removeSection");
    $(".dashboard").addClass("removeSection");
  });
};

soberApp.init = () => {
    soberApp.getQuotes();
    soberApp.insertQuote(); // brackets were missing?
    soberApp.clickKanye(); 
    soberApp.formSubmit(); 
    soberApp.formReset();
};

$(document).ready(function() {
    soberApp.init();
});