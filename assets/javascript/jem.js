$(document).ready(function() {

    //* generates random target number bewteen 120-12*//
    var targetNumber = Math.floor(12 + (Math.random() * (120 - 12)));
    $("#number-to-guess").text(targetNumber);


    //* variables needed for tallies *//
    var wins = 0;
    var loses = 0;
    var counter = 0;
    var numberOptions = [];

    //* audio files *//
    var audioWin = new Audio("AudioWin.mp3");
    var audioLose = new Audio("AudioLose.mp3");

    //*audio time*//


    //* start function*//
    function start() {
        counter = 0;
        $('#totalScore').text(counter);
    }

    //* creates crystals and numbers for crystals*//
    function crystalCreate() {
        //* create 4 random numbers bewtween 1-12 assigned to the crystals*//
        numberOptions = [];
        for (var i = 1; i <= 4; i++) {
            numberOptions.push(Math.floor(12 + (Math.random() * (1 - 12))));
        }

        //*loop to create crystals for every number option*//
        for (var i = 0; i < 4; i++) {
            //*for each interation we will create an imageCrystal
            var imageCrystal = $("<img>");
            imageCrystal.addClass("crystal-image");
            imageCrystal.attr("src", "https://4.bp.blogspot.com/_xOLjKos6g8Y/TOzwq3WXAvI/AAAAAAAAGns/4ANz-YmId6M/s1600/Jem_by_NickDraw.jpg");
            imageCrystal.attr("data-crystalvalue", numberOptions[i]);

            $("#crystals").append(imageCrystal);
        }

        setClickHandlers();
    }

    function restart() {
        counter = 0;

        targetNumber = Math.floor(12 + (Math.random() * (120 - 12)));
        $("#number-to-guess").text(targetNumber);

        // clear existing crystals
        $("#crystals").empty();

        crystalCreate();

        start();
    }


    crystalCreate();
    start();

    //* when click on image get value*//
    //* put total in total score*//
    function setClickHandlers() {
        $(".crystal-image").on("click", function () {
            var crystalValue = ($(this).attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            counter += crystalValue;
            $('#totalScore').text(counter);
            //*clears innerHTML
            document.getElementById("results").innerHTML = "";

            //*why did I have to put the clear in html here, it did not work when I tried putting it in the win/loss if/else if statements. 

            //* when win *//
            if (counter === targetNumber) {
                wins++;
                $('#wins').text(wins);
                 //* writes to inner HTML*//
                document.getElementById("results").innerHTML = "YOU WIN!!!!";
                audioWin.play();
                setTimeout(1000 * 7);
                restart();

                //* why did I have to put a timer on the audio clip if it is only 7 seconds? restart would not run until I did that. 
            }

            //* when lose *//
            else if (counter >= targetNumber) {
                loses++;
                $('#loses').text(loses);
                //* writes to inner HTML*//
                document.getElementById("results").innerHTML = "YOU LOSE";
                audioLose.play();
                setTimeout(1000 * 7);
                restart();
            }
        });
    }

});