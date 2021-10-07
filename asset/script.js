const video = document.getElementById('video');

function startvideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.scrObject = stream,
        err => console.log(err)
    );
}

startvideo();