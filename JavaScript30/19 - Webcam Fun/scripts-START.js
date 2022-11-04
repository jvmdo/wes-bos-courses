const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

async function getVideo(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    console.log(err);
  }
}

function paintToCanvas() {
  const vWidth = video.videoWidth;
  const vHeight = video.videoHeight;

  canvas.width = vWidth;
  canvas.height = vHeight;

  // setInterval(() => {
  //   ctx.drawImage(video, 0, 0, vWidth, vHeight);
  // }, 10);

  ctx.drawImage(video, 0, 0, vWidth, vHeight);
  window.requestAnimationFrame(paintToCanvas);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const snapshot = canvas.toDataURL("image/jpeg");
  const anchor = document.createElement("a");
  anchor.href = snapshot;
  anchor.download = "snapshot";
  anchor.innerHTML = `<img src="${snapshot}" alt="A single video frame snapshot"/>`;
  strip.appendChild(anchor);
  // strip.insertBefore(anchor, strip.firstChild);
}

getVideo({ audio: false, video: { ideal: 1280, ideal: 720 } });
// video.addEventListener("canplay", paintToCanvas);
video.addEventListener("canplay", () =>
  window.requestAnimationFrame(paintToCanvas)
);
