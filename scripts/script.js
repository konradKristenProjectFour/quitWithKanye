const soberApp = {};

let timer = document.getElementById("timer");
let toggleBtn = document.getElementById("toggle");
let resetBtn = document.getElementById("reset");
let watch = new Stopwatch(timer);

// soberApp.getVoice = function() {
//   $.ajax({
//     url: "http://proxy.hackeryou.com",
//     dataType: "json",
//     method: "GET",
//     data: {
//       async: true,
//       crossDomain: true,
//       reqUrl:
//         "https://gateway-wdc.watsonplatform.net/text-to-speech/api/v1/synthesize",
//       method: "POST",
//         params: {
//           voice: "en-US_MichaelV3Voice"
//         },
//       proxyHeaders: {
//         "Content-Type": "application/json",
//         Accept: "audio/wav",
//         Authorization:
//           "Basic YXBpa2V5Ok1jM3FkR19MREdSNjVIVlAwTllZaUg3OXEyVFh1Y0hNczhfN3BEVF9xaFBJ",
//         "User-Agent": "PostmanRuntime/7.15.2",
//         "Cache-Control": "no-cache",
//         "Postman-Token":
//           "ab11293a-7802-46d3-b31c-64ce93053420,f13fdedf-efe9-41f9-aca1-eb9b0ca0f849",
//         Host: "gateway-wdc.watsonplatform.net",
//         "Accept-Encoding": "gzip, deflate",
//         "Content-Length": "22",
//         Connection: "keep-alive",
//         "cache-control": "no-cache"
//       },
//       xmlToJSON: false, // from notes
//       useCache: false, // from notes
//       processData: false,
//       data: '{"text":"hello world"}'
//     }
//   })
//     .then(function(res) {
//       console.log(res);
//     })
//     .fail(error => {
//       console.log(error);
//     });
// };

// soberApp.getVoice = function() {
//   $.ajax({
//     async: true,
//     crossDomain: true,
//     url:
//       "https://gateway-wdc.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=en-US_MichaelV3Voice",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "audio/wav",
//       Authorization:
//         "Basic YXBpa2V5Ok1jM3FkR19MREdSNjVIVlAwTllZaUg3OXEyVFh1Y0hNczhfN3BEVF9xaFBJ",
//       "User-Agent": "PostmanRuntime/7.15.2",
//       "Cache-Control": "no-cache",
//       "Postman-Token":
//         "ab11293a-7802-46d3-b31c-64ce93053420,f13fdedf-efe9-41f9-aca1-eb9b0ca0f849",
//       Host: "gateway-wdc.watsonplatform.net",
//       "Accept-Encoding": "gzip, deflate",
//       "Content-Length": "22",
//       Connection: "keep-alive",
//       "cache-control": "no-cache"
//     },
//     processData: false,
//     data: '{"text":"hello world"}'
//   })
//     .then(function(result) {
//     //   Enter success function
//     })
//     .fail(error => {
//     //   Enter error function
//     });
// };


soberApp.getVoice = function() {
  $.ajax({
    url:
      "https://gateway-wdc.watsonplatform.net/text-to-speech/api/v1/synthesize",
    method: "GET",
    datatype: "json",
    data: {
      accept: "audio%2Fwav",
      text: "hola%20mundo",
      voice: "es-ES_EnriqueVoice"
    },
    headers: {
      Authorization:
        "Basic YXBpa2V5Ok1jM3FkR19MREdSNjVIVlAwTllZaUg3OXEyVFh1Y0hNczhfN3BEVF9xaFBJ",
      "cache-control": "no-cache",
      "Postman-Token": "1fe32a98-d5fe-4906-8593-e809084c1cd3"
    }
  })
    .then(function(result) {
      // feed result into insertQuote if it excludes fuck
      console.log(result);
    })
    .fail(error => {
      console.log(error);
    });
};

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
    let userName = soberApp.retrieveUserName();
    let habit = soberApp.retrieveHabit();
    let spend = soberApp.retrieveSpend();

    $(".welcome").addClass("animated slideOutLeft");
    $("body").addClass("displayOverflow");

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
  soberApp.getQuotes();
  soberApp.getVoice();
  soberApp.insertQuote();
  soberApp.clickKanye();
  soberApp.formSubmit();
  soberApp.formReset();
};

$(document).ready(function() {
  soberApp.init();
});
