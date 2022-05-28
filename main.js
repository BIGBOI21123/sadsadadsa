Webcam.set({
    width: 350,
    height: 340,
    image_format: 'png',
    png_quality: 100
});
var camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="snapshot" src=" '+ data_uri +' "/>';
    });
}

console.log('ml5 version', ml5.version);

Classfier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9AMpNvn74/model.json", modelloaded);

function modelloaded() {
    console.log("Model Loaded");
}

function speak() {
    synth = window.speechSynthesis;
    speakdata1 = "The First Prediction is" + prediction1;
    speakdata2 = "The Second Prediction is" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis);
}

function predictemotion() {
    img = document.getElementById("snapshot")
    Classfier.classify(img, gotresult)
}

function gotresult(error, results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "fist") {
            document.getElementById("showemoji").innerHTML = "&#128512;";
        }
        if (results[0].label == "pointing") {
            document.getElementById("showemoji").innerHTML = "&#128548;";
        }
        if (results[0].label == "peace") {
            document.getElementById("showemoji").innerHTML = "&#128549;";
        }

        if (results[1].label == "fist") {
            document.getElementById("showemoji2").innerHTML = "&#128512;";
        }
        if (results[1].label == "pointing") {
            document.getElementById("showemoji2").innerHTML = "&#128548;";
        }
        if (results[1].label == "peace") {
            document.getElementById("showemoji2").innerHTML = "&#128549;";
        }
    }
}
