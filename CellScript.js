var widthSlider = document.getElementById("widthRange");
var widthValue = document.getElementById("widthOutput");
var heightSlider = document.getElementById("heightRange");
var heightValue = document.getElementById("heightOutput");
var heightOutput = document.getElementById("heightRange").value;
var widthOutput = document.getElementById("widthRange").value;
var theme = "LightMode";
// Update the current slider value (each time you drag the slider handle)
widthSlider.oninput = function () {
    widthOutput = this.value;
    widthValue.innerHTML = this.value;
}
heightSlider.oninput = function () {
    heightOutput = this.value;
    heightValue.innerHTML = this.value;
}
window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementById('widthRange').max = width - (width * .1);
    document.getElementById('heightRange').max = height - (height * .50);
    document.getElementById('widthRange').value = 100;
    document.getElementById('heightRange').value = 100;
    document.getElementById('widthOutput').innerHTML = 100;
    document.getElementById('heightOutput').innerHTML = 100;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.visibility = "hidden";
});
function simulate() {
    var canvas = document.getElementById("myCanvas");
    canvas.style.visibility = "visible";
    var ctx = canvas.getContext("2d");
    var xcoordsCenter = [];
    var ycoordsCenter = [];
    var distance = [];
    var largest = 0;
    var temp = 0;
    var width = document.getElementById('widthOutput').innerHTML;
    var height = document.getElementById('heightOutput').innerHTML;
    var cells = document.getElementById("cellInput").value;
    document.getElementById('myCanvas').width = width;
    document.getElementById('myCanvas').height = height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let g = 0; g < cells; g++) {
        xcoordsCenter.push(Math.floor(Math.random() * width));
        ycoordsCenter.push(Math.floor(Math.random() * height));
    }
    for (let x = 1; x <= width; x++) {

        for (let y = 1; y <= height; y++) {
            distance.push(CalculateAngularDistance(x, y, xcoordsCenter, ycoordsCenter, cells));
        }


    }
    distance.forEach((element) => {
        if (largest < element) {
            largest = element;
        }
    });
    let z = 0;
    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {
            temp = distance[z];
            ctx.fillStyle = "hsl(0, 0%, " + ((temp / largest*0.95) * 100) + "%)";
            ctx.fillRect(x + 1, y + 1, 1, 1);
            z++
        }

    }

    function CalculateAngularDistance(pixelX, pixelY, centerX, centerY, cells) {

        let angularDistance = 1000000000;
        let xTotal;
        let yTotal;
        let sum;
        for (let a = 0; a <= cells; a++) {
            xTotal = pixelX - centerX[a];
            yTotal = pixelY - centerY[a];
            sum = Math.pow(xTotal, 2) + Math.pow(yTotal, 2);
            sum = Math.sqrt(sum);
            if (sum < angularDistance) {
                angularDistance = sum;
            } else {

            }
        }



        return angularDistance;
    }
}
function changeTheme() {
    if (theme === "LightMode") {
      ///This changes the color to dark mode
    document.getElementById('SVG').data = "Sun.svg";
    document.getElementById('SVG').type = "Sun/svg+xml";
    document.getElementById('SunOrMoon').src = "/Images/Sun.svg";
    document.getElementById('stylesheets').href = "CellCSSDark.css";
    invert(100);
    theme = "DarkMode";
  } else {
    ///This changes the color to light mode
    document.getElementById('SVG').data = "Moon.svg";
    document.getElementById('SVG').type = "Moon/svg+xml";
    document.getElementById('SunOrMoon').src = "/Images/Moon.svg";
    document.getElementById('stylesheets').href = "CellCSSLight.css";
    invert(0);
    theme = "LightMode";
  }
  }
  function invert(i){
    document.getElementById("Home").style.filter="invert(" + i + "%)";
    }