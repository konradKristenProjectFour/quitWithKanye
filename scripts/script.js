const soberApp = {};

let myTypeItInstance = new TypeIt("#headerType", {
  cursor: false,
  speed: 75
});

let timer = document.getElementById("timer");
let toggleBtn = document.getElementById("toggle");
let resetBtn = document.getElementById("reset");
let watch = new Stopwatch(timer);

// WELCOME PAGE

soberApp.clickYes = function() {
  $(document).on("click", "#yes", function() {
    // $("header").addClass("removeSection");
    // $(".welcome").removeClass("removeSection");

    $("header").addClass("animated slideOutLeft");
    $("body").addClass("displayOverflow");

    let elementWelcome = document.getElementById("header");

    elementWelcome.addEventListener("animationend", function() {
      $("header").removeClass("animated slideOutLeft");
      $("header").addClass("removeSection");
      $(".welcome").addClass("animated slideInRight");
      $(".welcome").removeClass("removeSection");

      let elementWelcome = document.getElementById("welcome");

      elementWelcome.addEventListener("animationend", function() {
        $("body").removeClass("displayOverflow");
        $(".welcome").removeClass("animated slideInRight");
      });
    });
  });
};

// MAIN PAGE

soberApp.baseUrl = `https://api.kanye.rest?format=text`;

// Retrieve data from api
soberApp.getQuotes = function() {
  $.ajax({
    url: soberApp.baseUrl,
    method: "GET",
    datatype: "json"
  })
    .then(function(result) {
      // feed result into insertQuote if it excludes fuck
      if (result.indexOf("fuck") === -1 && result.indexOf("sex") === -1) {
        soberApp.insertQuote(result);
      } else {
        soberApp.getQuotes();
      }
    })
    .fail(error => {
      console.log(error);
    });
};

// plugs insertQuote result into quoteContainer
soberApp.insertQuote = function(newQuote) {
  $(".quoteContainer").html(`<p>${newQuote}</p>`);
};

//on demand quotes
soberApp.clickKanye = function() {
  $(".kanyeButton").on("click", function() {
    soberApp.getQuotes();
    $(".kanyeButton").addClass("animated shake");

    let element = document.getElementById("kanyeButton");

    element.addEventListener("animationend", function() {
      $(".kanyeButton").removeClass("animated shake");
    });
  });
};

//listen for submit, save variables, switch to next screen
soberApp.formSubmit = () => {
  $("form").on("submit", function(event) {
    event.preventDefault();
    watch.start();

    //declare variables based on user inputs
    // let userName = soberApp.retrieveUserName();
    // let habit = soberApp.retrieveHabit();
    let spend = soberApp.retrieveSpend();

    $("body").addClass("displayOverflow");
    $(".welcome").addClass("animated slideOutLeft");
    

    let elementWelcome = document.getElementById("welcome");

    elementWelcome.addEventListener("animationend", function() {
      $(".welcome").removeClass("animated slideOutLeft");
      $(".welcome").addClass("removeSection");
      $(".dashboard").addClass("animated slideInRight");
      $(".dashboard").removeClass("removeSection");

      let elementDashboard = document.getElementById("dashboard");

      elementDashboard.addEventListener("animationend", function() {
        $("body").removeClass("displayOverflow");
        $(".dashboard").removeClass("animated slideInRight");
      });
    });
  });
};

//variables are declared outside submit form to be used in Stopwatch
soberApp.retrieveUserName = () => {
  return $('input[name="username"]').val();
};

soberApp.retrieveHabit = () => {
  return $('input[name="habit"]').val();
};

soberApp.retrieveSpend = () => {
  return Number($('input[name="spend"]').val());
};

//reset button refreshes page
soberApp.formReset = () => {
  $("form").on("reset", function(event) {
    watch.reset();
    $("ul").html("");

    $(".dashboard").addClass("removeSection");
    $(".welcome").removeClass("removeSection");
  });
};

soberApp.init = () => {
  myTypeItInstance.go();
  soberApp.clickYes();
  soberApp.getQuotes();
  soberApp.insertQuote();
  soberApp.clickKanye();
  soberApp.formSubmit();
  soberApp.formReset();
};

$(document).ready(function() {
  soberApp.init();
});
