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
      // event.preventDefault prevents form submit button from refreshing page automatically
      
    event.preventDefault();
    console.log('test');
    
    $(".welcome").addClass("removeWelcome");
    
    })
};



soberApp.init = () => {
    soberApp.getQuotes();
    soberApp.insertQuote(); // brackets were missing?
    soberApp.clickKanye(); 
    soberApp.formSubmit(); 
};

$(document).ready(function() {
    soberApp.init();

});