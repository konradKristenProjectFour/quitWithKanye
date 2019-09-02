class Stopwatch {
  constructor(watchElement) {
    let time = 0;
    let trophies = 0;
    let interval;
    let offset;

    this.isOn = false; //timer is off

    this.start = function() {
      if (!this.isOn) {
        interval = setInterval(update.bind(this), 1000); // updates timer every second
        offset = Date.now();
        this.isOn = true;
      }
    };

    const update = () => {
      // arrow function allows this. to access the parent

      // if the stopwatch is on, time is equal to time + delta
      if (this.isOn) {
        time += delta();
      }

      let formattedTime;

      formattedTime = timeFormatter(time);
      watchElement.textContent = formattedTime;

      let updateTime = 86400;
      updateTime = soberApp.retrieveSpeed();
      const trophyLimit = 3;

      // add trophy to trophyList (max trophies appear depending on numberOfTrophies)
      if (Math.floor(time / 1000) % updateTime === 0 && time > 0) {
        // time > 0 prevents trophy sound from firing
        this.trophyCounter();
      }

      if (Math.floor(time / 1000) % updateTime === 0) {
        //refreshes quote on timed interval
        soberApp.getQuotes();
      }
    };

    // take the time now from the javascript time function
    // time passed is equal to the
    function delta() {
      let now = Date.now();
      let timePassed = now - offset;
      offset = now;
      return timePassed;
    }

    //converts miliseconds into hours, minutes seconds
    function timeFormatter(timeInMilliseconds) {
      let time = new Date(timeInMilliseconds);
      let hours;

      //
      if (time.getHours() >= 19 && time.getHours() <= 23) {
        hours = (time.getHours() - 19).toString();
      } else {
        hours = (time.getHours() + 5).toString();
      }

      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();

      if (hours.length < 2) {
        hours = "0" + hours;
      }

      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }

      while (seconds.length < 2) {
        seconds = "0" + seconds;
      }

      return hours + " : " + minutes + " : " + seconds;
    }

    this.stop = function() {
      if (this.isOn) {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
      }
    };

    this.reset = function() {
      this.stop();
      time = 0;
      trophies = 0;
      update(time);
    };

    this.trophyCounter = function() {
      trophies = trophies + 1;
      console.log(trophies);
      console.log(time);

      let trophySound = new Audio("./audio/coin.wav");
      trophySound.play();

      if (trophies < 4) {
        $(".trophyList").append(`<li><i class="fas fa-trophy"></i></li>`);
      } else {
        $(".trophyList").html(
          `<li><i class="fas fa-trophy"></i></li><p>x ${trophies}</p>`
        );
      }

      $(".lowerMoney").html(
        `<p>$${trophies *
          soberApp.retrieveSpend()}</p>`
      );
    };
  }
}
