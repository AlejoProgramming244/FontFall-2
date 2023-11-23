noseX = 0;
noseY = 0;

diference = 0;

leftWristX = 0;
rightWristX = 0;

function setup()
{
    Canvas = createCanvas(800, 470)
    Canvas.position(200, 135);
    Canvas.center()

    video = createCapture(VIDEO);
    video.size(550, 412);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Modelo P5 inicializado");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("La coordenada en Y de la nariz es: ", noseY, "La coordenada en X de la nariz es: ", noseX);


        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;

        diference = floor(leftWristX - rightWristX);

        console.log("La coordenada en X de la muñeca derecha es: ", rightWristX, "La coordenada en X de la muñeca izquierda es: ", leftWristX);

        document.getElementById("tamañoT").innerHTML = "El tamaño de tu texto es de: " + diference + "px";

    }
}

function draw()
{
    background("lightgray");
    textSize(diference);
    text('ALEMICHU', noseX, noseY);
}

