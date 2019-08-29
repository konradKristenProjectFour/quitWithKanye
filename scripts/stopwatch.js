class Stopwatch {
  constructor(watchElement) {
    let time = 0;
    let interval;
    let offset;

    this.isOn = false;

    const update = () => {
      // this needs to refer to watch object, so we use an arrow function

      // if the stopwatch is on, time is equal to time + delta
      if (this.isOn) {
        time += delta();
      }

      let formattedTime;

      formattedTime = timeFormatter(time);
      watchElement.textContent = formattedTime;

      // add trophy to trophyList, but set a max

      // add money saved to .money

      // let newSpend = soberApp.retrieveSpend();
      // console.log(newSpend);

      const updateTime = 1;

      if (
        watchElement.textContent.slice(-2) % updateTime === 0 &&
        watchElement.textContent.slice(-2)
      < updateTime*10) {
        $(".trophyList").append(`<li><i class="fas fa-trophy"></i></li>`);
      }

      if (watchElement.textContent.slice(-2) % updateTime === 0) {

        soberApp.getQuotes();

        $(".money").html(
          `<p>${(watchElement.textContent.slice(-2) / updateTime) *
            soberApp.retrieveSpend()}</p>`
        );
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

    function timeFormatter(timeInMilliseconds) {
      let time = new Date(timeInMilliseconds);

      let hours = (time.getHours() - 19).toString();
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

    this.start = function() {
      if (!this.isOn) {
        interval = setInterval(update.bind(this), 1000); // updates every second
        offset = Date.now();
        this.isOn = true;
      }
    };

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
      update(time);
    };
  }
}
