import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

const pod1 = WaveSurfer.create({
  container: "#pod1",
  waveColor: "gray",
  progressColor: "#df313c",
  normalize: true,
  url: "media/Audio/HCH 15.mp3",
});

pod1.on("interaction", () => {
  if (pod1.isPlaying()) {
    pod1.pause();
  } else {
    pod1.play();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (pod1.isPlaying()) {
      pod1.pause();
    }
  }
});

const pod2 = WaveSurfer.create({
  container: "#pod2",
  waveColor: "gray",
  progressColor: "#df313c",
  normalize: true,
  url: "media/Audio/voice.mp3",
});

pod2.on("interaction", () => {
  if (pod2.isPlaying()) {
    pod2.pause();
  } else {
    pod2.play();
  }
});

const pod3 = WaveSurfer.create({
  container: "#pod3",
  waveColor: "gray",
  progressColor: "#df313c",
  normalize: true,
  url: "media/Audio/HCH 15.mp3",
});

pod3.on("interaction", () => {
  if (pod3.isPlaying()) {
    pod3.pause();
  } else {
    pod3.play();
  }
});

const pod4 = WaveSurfer.create({
  container: "#pod4",
  waveColor: "gray",
  progressColor: "#df313c",
  normalize: true,
  url: "media/Audio/voice.mp3",
});

pod4.on("interaction", () => {
  if (pod4.isPlaying()) {
    pod4.pause();
  } else {
    pod4.play();
  }
});