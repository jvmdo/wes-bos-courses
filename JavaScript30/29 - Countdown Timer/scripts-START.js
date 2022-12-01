let secondsLeft, countdown;

function timer(seconds) {
  const beginAt = Date.now();
  const endAt = beginAt + seconds * 1000;
  displayEnd(endAt);

  secondsLeft = Math.round((endAt - beginAt) / 1000);
  displayTimer(secondsLeft);

  countdown = setInterval(() => {
    secondsLeft = Math.round(Math.abs(endAt - Date.now()) / 1000);
    displayTimer(secondsLeft);
    !secondsLeft && (clearInterval(countdown), startMessage());
  }, 1000);
}

function displayTimer(seconds) {
  // This formatting works fine, but it can't display more than 24 hours
  const format = new Date(seconds * 1000).toISOString().slice(11, -5);
  document.querySelector(".display h1").textContent = format;
}

function displayEnd(timestamp) {
  const endTime = new Date(timestamp).toLocaleTimeString();
  document.querySelector(".display p").textContent = `Be back at ${endTime}`;
}

const controls = document.querySelector(".timer__controls");
controls.addEventListener("click", function (event) {
  if (event.target.className === "timer__button") {
    clearInterval(countdown);
    timer(+event.target.dataset.time);
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const { minutes } = Object.fromEntries(new FormData(form));
  if (Number.isFinite(+minutes) /* && +minutes > 0 */) {
    clearInterval(countdown);
    timer(+minutes * 60);
    form.reset();
  }
});

function startMessage() {
  setTimeout(() => {
    document.querySelector(
      ".display p"
    ).textContent = `Pick or type a desired amount of time`;
  }, 1000);
}

startMessage();

// TODO: When 0 is entered, the countdown timer turns into "count up"
