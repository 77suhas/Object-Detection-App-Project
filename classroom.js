function main() {
  window.location = "main.html"
}
img = "";
status = "";
object = "";
function preload() {
  img = loadImage("classroom.png")
}
function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()
  
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
  document.getElementById("status").innerHTML = "objects detected"
}
function modelLoaded() {
  console.log("model is loaded")
  status = true;
  objectDetector.detect(img, gotResults)
}
function gotResults(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(results)
    object = results
  }
}
function draw() {
  image(img, 0, 0, 600, 500)

  if (status != "") {
    for (i  = 0; i < object.length; i++) {
      document.getElementById("status").innerHTML = "There are 11 big objects in the image from which cocssd model has detected 10 objects"

      accuracy = floor(object[i].confidence * 100)+"%"
      fill("#FF0000")
      text(object[i].label +" " + accuracy, object[i].x, object[i].y)
      noFill()
      stroke("#FF0000")
      rect(object[i].x, object[i].y, object[i].width, object[i].height)
    }
  }
}