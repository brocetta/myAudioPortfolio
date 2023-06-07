import WaveSurfer from "https://unpkg.com/wavesurfer.js@beta";

// Reusable fuctions for dynamic creating page elements (<div>, <h>, <img>, <video>, audio etc)

function heading(text, tag, where) {
  const h1 = document.createElement(tag);
  h1.innerHTML = text;
  where.append(h1);
}

function image(src, classList, where) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add(classList);
  where.append(img);
}

function logo(classList, where) {
  const div = document.createElement("div");
  div.classList.add(classList);
  where.append(div);
  image("media/Logo Img.png", "logoImg", div);
}

function video(src, where, autoPlay, loop, muted) {
  const videoFrame = document.createElement("div");
  videoFrame.classList.add("videoFrame");
  where.append(videoFrame);

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("videoContainer");
  videoFrame.append(videoContainer);

  const video = document.createElement("video");
  video.src = src;
  video.classList.add("video");
  video.autoplay = autoPlay === undefined ? true : autoPlay;
  video.loop = loop === undefined ? true : loop;
  video.muted = muted === undefined ? true : muted;
  videoContainer.append(video);
}

function audio(text, imgLink, audioLink, where) {
  const waveContainer = document.createElement("div");
  waveContainer.classList.add("waveContainer");
  where.append(waveContainer);

  const waveImg = document.createElement("div");
  waveImg.classList.add("waveImg");
  waveContainer.append(waveImg);

  const wave = document.createElement("div");
  wave.classList.add("wave");
  waveContainer.append(wave);

  heading(text, "h3", wave);
  image(imgLink, "audioImg", waveImg);

  const wavesurfer = WaveSurfer.create({
    container: wave,
    waveColor: "gray",
    progressColor: "#df313c",
    normalize: true,
    url: audioLink,
  });

  wavesurfer.on("interaction", () => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
      }
    }
  });
}

//  PAGE SECTIONS
// Create the hero section
function createHeroSection() {
  const hero = document.createElement("div");
  hero.classList.add("hero-section");

  logo("logo", hero);
  heading("Your Audio Producer", "h1", hero);

  document.body.append(hero);
}

// Create the games section
function createGamesSection() {
  const games = document.createElement("div");
  games.classList.add("games");

  const imgFrame = document.createElement("div");
  imgFrame.classList.add("gamesImgFrame");
  games.append(imgFrame);

  image("media/knob.png", "gamesImg", imgFrame);

  const gamesContent = document.createElement("div");
  gamesContent.classList.add("gamesContent");
  games.append(gamesContent);

  heading("Sound Design Examples:", "h2", gamesContent);

  video("media/videoMute/Retanol Estrich (b&w).mp4", gamesContent);
  video("media/video/Pressol Easter Animation.mp4", gamesContent);
  video("media/videoMute/Machiavillain (b&w).mp4", gamesContent);
  video("media/video/Game sound effects short.mp4", gamesContent);
  video("media/video/Miloš B. Sound Design.mp4", gamesContent);
  video("media/video/Creepy (crop).mp4", gamesContent);

  return games;
}

// Create the podcasting section
function createPodcastingSection() {
  const podcasting = document.createElement("div");
  podcasting.classList.add("podcasting");

  const imgFrame = document.createElement("div");
  imgFrame.classList.add("podImgFrame");
  podcasting.append(imgFrame);

  image("media/Headphone Guy no bg.png", "podcastImg", imgFrame);

  const podContent = document.createElement("div");
  podContent.classList.add("podContent");
  podcasting.append(podContent);

  heading("Podcast examples:", "h2", podContent);

  audio(
    "Bald & Blonde Podcast",
    "media/Podcast Logos/AC.png",
    "media/Audio/voice.mp3",
    podContent
  );
  audio(
    "Belly of the Beast podcast",
    "media/Podcast Logos/Shape the System.png",
    "myAudioPortfolio/media/Audio/voice.mp3",
    podContent
  );
  audio(
    "Above the Goal Podcast",
    "media/Podcast Logos/AC.png",
    "media/Audio/voice.mp3",
    podContent
  );
  audio(
    "audiobook connection podcast",
    "media/Podcast Logos/Shape the System.png",
    "myAudioPortfolio/media/Audio/voice.mp3",
    podContent
  );

  return podcasting;
}

// Create the main section
function createMainSection() {
  const main = document.createElement("div");
  main.classList.add("main");

  const games = createGamesSection();
  main.append(games);

  const podcasting = createPodcastingSection();
  main.append(podcasting);

  document.body.append(main);
}

// Calling the page section functions

createHeroSection();
createMainSection();
