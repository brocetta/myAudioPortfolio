// Reusable fuctions for dynamic creating page elements (<div>, <h>, <img>, <video>)

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

  image("media/knob.png", "gamesImg", games);

  const gamesContent = document.createElement("div");
  gamesContent.classList.add("gamesContent");
  games.append(gamesContent);

  video(
    "media/videoMute/Retanol Estrich (b&w).mp4",
    gamesContent
  );
  video(
    "media/video/Pressol Easter Animation.mp4",
    gamesContent
  );
  video(
    "media/videoMute/Machiavillain (b&w).mp4",
    gamesContent
    );
  video(
    "media/video/Game sound effects short.mp4",
    gamesContent
  );
  video(
    "media/video/Miloš B. Sound Design.mp4",
    gamesContent
  );
  video(
    "media/video/Creepy (crop).mp4",
    gamesContent
  );

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

  video(
    "media/videoMute/Retanol Estrich (b&w).mp4",
    podContent
  );
  video(
    "media/video/Pressol Easter Animation.mp4",
    podContent
  );
  video(
    "media/videoMute/Machiavillain (b&w).mp4",
    podContent
    );
  video(
    "media/video/Game sound effects short.mp4",
    podContent
  );
  video(
    "media/video/Miloš B. Sound Design.mp4",
    podContent
  );
  video(
    "media/video/Creepy (crop).mp4",
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

// Calling page section functions

createHeroSection();
createMainSection();
