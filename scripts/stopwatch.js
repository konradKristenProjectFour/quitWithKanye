
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

          let formattedTime = timeFormatter(time);
          watchElement.textContent = formattedTime;
        }

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

          console.log(time);


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

          return hours + " : " + minutes + " . " + seconds;
        }


        this.start = function() {
          if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
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
            // console.log(this);
          this.stop();
          time = 0;
            console.log(this);

          update(time);
        };
    }
}



// function Stopwatch(elem) {

    
//     let time = 0; 
//     let interval; 
//     let offset;

//     function update() {

//         // if the stopwatch is on, time is equal to time + delta
//         if (this.isOn) {
//             time += delta();
//         }

//         let formattedTime = timeFormatter(time); 
//         elem.textContent = formattedTime;
//     }

//     // take the time now from the javascript time function
//     // time passed is equal to the 
//     function delta() {
//         let now = Date.now();
//         let timePassed = now - offset; 
//         offset = now; 
//         return timePassed;
//     }

//     function timeFormatter(timeInMilliseconds) {
//         let time = new Date(timeInMilliseconds); 
//         let minutes = time.getMinutes().toString(); 
//         let seconds = time.getSeconds().toString(); 
//         let milliseconds = time.getMilliseconds().toString(); 
    

//         if (minutes.length < 2) {
//             minutes = "0" + minutes; 
//         }

//         if (seconds.length < 2) {
//             seconds = "0" + seconds; 
//         }

//         while (milliseconds.length < 3) {
//             milliseconds = "0" + milliseconds
//         }

//         return minutes + " : " + seconds + " . " + milliseconds;
//     }

//     this.isOn = false;

//     this.start = function() {
//         if (!this.isOn) {
//             interval = setInterval(update.bind(this), 10);
//             offset = Date.now(); 
//             this.isOn = true; 
//         }
//     };

//     this.stop = function() {
//         if (this.isOn) {
//             clearInterval(interval); 
//             interval = null; 
//             this.isOn = false; 
//         }
//     };

//     this.reset = function() {
//         this.stop();
//         time = 0;
//         update(time);
//     };
// }


//  let watch = new Stopwatch(); 
// watch.start(); 
// watch.stop();
// watch.reset(); 