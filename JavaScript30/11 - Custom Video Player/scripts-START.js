const video = document.querySelector(".player__video.viewer");
const play = document.querySelector(".player__button.play");
const forward = document.querySelector(".player__button.forward");
const backward = document.querySelector(".player__button.backward");
const volume = document.querySelector(".player__slider.volume");
const speed = document.querySelector(".player__slider.speed");
const currentProgress = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");

/* 
  Event handlers 
*/

// Play / pause, also change button icon
function togglePlay() {
  if (video.paused) {
    video.play();
    play.textContent = "⏸️";
  } else {
    video.pause();
    play.textContent = "▶️";
  }
}

// Skip 25s forward or 10s backward
function backOrForth() {
  const skip = Number.parseFloat(this.dataset.skip);
  video.currentTime += skip;
}

// Change the video's volume and the playback rate
function slideUpOrDown() {
  if (this.name === "volume") {
    video.volume = this.value;
  } else {
    // speed
    video.playbackRate = this.value;
  }
}

function autoChangeProgress() {
  const size = `${(video.currentTime / video.duration).toFixed(2) * 100}%`;
  currentProgress.style.flexBasis = size;
}

// TODO: nice comment
function manualChangeProgress(event) {
  /* 
    [progress.offsetWidth] is the element width
    [event.offsetX] is the x coordinate wherein the width is its axis
    Therefore, [event.offsetX] is between [0, progress.offsetWidth]
  */
  if (event.type === "mousemove" && !isPressing) return;
  const nextTime = (event.offsetX * video.duration) / progress.offsetWidth;
  video.currentTime = nextTime;
}

/*
  Event listeners
*/

// Play / pause
video.addEventListener("click", togglePlay);
play.addEventListener("click", togglePlay);

// Go forward / backward
forward.addEventListener("click", backOrForth);
backward.addEventListener("click", backOrForth);

// Volume/speed up/down;
volume.addEventListener("input", slideUpOrDown);
speed.addEventListener("input", slideUpOrDown);

// Auto increase/decrease the progress bar
video.addEventListener("timeupdate", autoChangeProgress);

// TODO: nice comment
let isPressing = false;
progress.addEventListener("mousedown", () => (isPressing = true));
progress.addEventListener("mouseup", () => (isPressing = false));
progress.addEventListener("mousemove", manualChangeProgress);
progress.addEventListener("click", manualChangeProgress);

// TODO: fullscreen move

// TODO: display current volume and speed values
