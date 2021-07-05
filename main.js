song = "";
song_2 = "";

song_status = "";
song_2_status = "";

left_wrist_x = 0;
left_wrist_y = 0;

right_wrist_x = 0;
right_wrist_y = 0;

score_left_wrist = 0;
score_right_wrist = 0;


function preload() {
    song = "music.mp3";
    song_2 = "music2.mp3";
}


function setup() {
    canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on("pose", getPoses);
}


function modelLoaded() {
    console.log("PoseNet is Intialised");
}


function getPoses(error, results) {
    if (error) {
        console.error(error);
    }
    
    if (results.length > 0) {
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.xy;

        score_left_wrist =  results[0].pose.keypoints[9].score;
    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");

    song.isPlaying();
    song_2.isPlaying();

    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        song_2.stop();

        if (song_status == "false") {
            song.play();
            document.getElementById("song").innerHTML = "Cradles";
        }
    }
}