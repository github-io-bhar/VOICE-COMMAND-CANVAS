var x = 0;
var y = 0;
var draw_apple = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var screen_width = 0;
var screen_height = 0;
var apple = "";
var speak_data = "";
var to_number = "";
function clearCanvas() {
    background("pink");
    document.getElementById("status").innerHTML = "Canvas Cleared.";
    speak_data = "Canvas Cleared.";
    speak();   
}
function start() {
        document.getElementById("status").innerHTML = "System is listening, please speak a number.";  
        recognition.start();
} 
recognition.onresult = function(event) {
    console.log(event); 
    content = event.results[0][0].transcript;
    to_number = Number(content);
    if(Number.isInteger(to_number)){
        document.getElementById("status").innerHTML = "Started drawing apple.";
        draw_apple = "set";
    }else{
        document.getElementById("status").innerHTML = "The speech has not recognized a number.";
        speak_data = "The speech has not recognized a number.";
        speak();
    }
}
function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    createCanvas(screen_width - 150, screen_height - 250); 
}
function draw() {
    if(draw_apple == "set") {
        for(var i = 1; i <= to_number; i++){
          x = Math.floor(Math.random() * 700);
          y = Math.floor(Math.random() * 400);
          image(apple, x, y, 50, 50);
        }
        if(to_number <= 1){
            document.getElementById("status").innerHTML = to_number + " Apple drawn";
            speak_data = to_number + " Apple Drawn";
            speak();
        }else{
            document.getElementById("status").innerHTML = to_number + " Apples drawn";
            speak_data = to_number + " Apples Drawn";
            speak();
        }
        draw_apple = "";
    }
}
function speak() {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}
function preload() {
    apple = loadImage('apple.png');
}