import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

function audioPlayer(nameString, link) {
  const audio = WaveSurfer.create({
    container: nameString,
    waveColor: "gray",
    progressColor: "#df313c",
    normalize: true,
    url: link,
  });

  audio.on("interaction", () => {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (audio.isPlaying()) {
        audio.pause();
      }
    }
  });
}

audioPlayer("#pod1", "media/Audio/HCH 15.mp3");
audioPlayer("#pod2", "media/Audio/voice.mp3");
audioPlayer("#pod3", "media/Audio/HCH 15.mp3");
audioPlayer("#pod4", "media/Audio/voice.mp3");