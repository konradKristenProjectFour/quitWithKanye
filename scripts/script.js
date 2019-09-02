const soberApp = {};

// PLUGS INS

let headerTypeInstance = new TypeIt("#headerType", {
  cursor: false,
  speed: 75
});

let timer = document.getElementById("timer");
let toggleBtn = document.getElementById("toggle");
let resetBtn = document.getElementById("reset");
let watch = new Stopwatch(timer);

// HEADER PAGE

soberApp.clickYes = function() {
  $(document).on("click keydown", "#yes", function(event) {
    if (
      event.type === "click" ||
      (event.type === "keydown" && (event.which === 13 || event.which === 32))
    ) {
      soberApp.yesAction();
    }
  });
};

soberApp.yesAction = function() {
  $("header").addClass("animated slideOutLeft");
  $("body").addClass("displayOverflowHeader");

  let elementWelcome = document.getElementById("header");

  elementWelcome.addEventListener("animationend", function() {
    $("header").removeClass("animated slideOutLeft");
    $("header").addClass("removeSection");
    $(".welcome").addClass("animated slideInRight");
    $(".welcome").removeClass("removeSection");

    let elementWelcome = document.getElementById("welcome");

    elementWelcome.addEventListener("animationend", function() {
      $("body").removeClass("displayOverflowHeader");
      $(".welcome").removeClass("animated slideInRight");
    });
  });
};

// WELCOME PAGE

//listen for submit, save variables, switch to next screen
soberApp.formSubmit = () => {
  $("form").on("submit", function(event) {
    event.preventDefault();
    $("body").addClass("displayOverflowWelcome");

    watch.start();

    //declare variables based on user inputs
    let vice = soberApp.retrieveVice();
    let spend = soberApp.retrieveSpend();

    console.log(vice);

    if (spend < 1) {
      $(".numberBox").addClass("badInput");
    } else {
      // adds vice to the sentence below the time
      $(".viceSelection").html(`${vice}`);

      $(".welcome").addClass("animated slideOutLeft");

      let elementWelcome = document.getElementById("welcome");

      elementWelcome.addEventListener("animationend", function() {
        $(".welcome").removeClass("animated slideOutLeft");
        $(".welcome").addClass("removeSection");
        $(".dashboard").addClass("animated slideInRight");
        $(".dashboard").removeClass("removeSection");

        let elementDashboard = document.getElementById("dashboard");

        elementDashboard.addEventListener("animationend", function() {
          $("body").removeClass("displayOverflowWelcome");
          $(".dashboard").removeClass("animated slideInRight");
        });
      });
    }
  });
};

//variables are declared outside submit form to be used in Stopwatch

soberApp.retrieveVice = () => {
  return $("input[type=radio]:checked").val();
};

soberApp.retrieveSpend = () => {
  return Number($('input[name="spend"]').val());
};

soberApp.toggleSpeed = () => {
  $("button.speedButton").on("click", function() {
    if (!$("button.speedButton").hasClass("highSpeed") === true) {
      $("button.speedButton").addClass("highSpeed");
      console.log("High Speed");
    } else {
      $("button.speedButton").removeClass("highSpeed");
      console.log("Normal Speed");
    }
  });
};

soberApp.retrieveSpeed = () => {
  if (!$("button.speedButton").hasClass("highSpeed")) {
    return 86400;
  } else {
    return 5;
  }
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
      // feed result into insertQuote if it excludes fuck or sex
      if (result.indexOf("fuck") === -1 && result.indexOf("sex") === -1) {
        soberApp.insertQuote(result);
      } else {
        soberApp.getQuotes();
      }
    })
    .fail(error => {
      console.log(error);
      soberApp.insertQuote(
        "If you have the opportunity to play this game of life you need to appreciate every moment."
      );
    });
};

// plugs insertQuote result into quoteContainer
soberApp.insertQuote = function(newQuote) {
  $(".quoteContainer").html(`<p>${newQuote}</p>`);
  soberApp.shakeKanye();
};

//on demand quotes
soberApp.clickKanye = function() {
  $(".kanyeButton").on("click", function() {
    soberApp.getQuotes();
    soberApp.shakeKanye();
  });
};

// Animation to shake Kanye
soberApp.shakeKanye = function() {
  $(".kanyeButton").addClass("animated shake");

  let element = document.getElementById("kanyeButton");

  element.addEventListener("animationend", function() {
    $(".kanyeButton").removeClass("animated shake");
  });
};

soberApp.welcomeBack = () => {

  $(".fa-long-arrow-alt-left").on("click", function() {
    $(".welcome").addClass("removeSection");
    $("header").removeClass("removeSection");
  });
  
}

//reset button rests all the form information and brings you back to the Welcome Page
soberApp.formReset = () => {
  $("form").on("reset", function(event) {
    watch.reset();

    $("ul").html("");
    $(".numberBox").removeClass("badInput");
    $("button.speedButton").removeClass("highSpeed");
    $(".lowerMoney").html(`<p>$0</p>`);

    $(".dashboard").addClass("removeSection");
    $(".welcome").removeClass("removeSection");
  });
};

soberApp.init = () => {
  headerTypeInstance.go();
  soberApp.clickYes();
  soberApp.welcomeBack();
  soberApp.getQuotes();
  soberApp.insertQuote();
  soberApp.clickKanye();
  soberApp.formSubmit();
  soberApp.formReset();
  soberApp.toggleSpeed();
};

$(document).ready(function() {
  soberApp.init();
});
