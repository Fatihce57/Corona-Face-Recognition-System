const video = document.getElementById('video');
const debug = document.getElementById('debug');
const virus = new Image()

///////////CAMERA STARTED/////////
Promise.all(
    [
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        // faceapi.nets.faceLandmark68.net.loadFromUri('models'),
        // faceapi.net.faceRecognitionNet.loadFromUri('models'),
    ]
).then(
    console.log('models downloaded'),
    virus.src = "asset/virus.png",
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
);



/////////FACE RECOGNITION////////////////
video.addEventListener('play', () => {
    console.log('video started');

    const canvas = faceapi.createCanvasFromMedia(video);
    const context = canvas.getContext('2d');
    ocument.body.append(canvas);

    const displaySize = { width: canvas.width, height: canvas.height };
    faceapi.matchDimensions(canvas, displaySize);


    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        context.clearRect(0, 0, canvas.width, canvas.height);
        detections.forEach(face => {
            debug.innerHTML = face._score;
            console.log(face);
        });
    }, 100);


})