alarm = "";
status = "";
objects = [];
alarmstatus = "";

function preload(){
alarm = loadSound("alarm.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById('status').innerHTML = 'Status: finding baby...';
}

  function modelLoaded()
{
  console.log('Model Loaded!');
  status = true;
}

function gotResult(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw(){
    translate(600,0);
    scale(-1,1);
    image(video,0,0,600,500);

    if(status != ""){
objectDetector.detect(video,gotResult);
alarmstatus = alarm.isPlaying();
for(i=0; i< objects.length; i++){
  if(objects[i].label == "person"){
  document.getElementById("status").innerHTML = "Status: baby detected.";
  alarm.stop();
  fill("red");
  percent = floor(objects[i].confidence*100);
  text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
  noFill();
  stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
else{
  document.getElementById("status").innerHTML = "Status: baby not found!";
  if(alarmstatus == false){
  alarm.play();}
}
    }
  }
}