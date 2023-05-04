// Create the hero section
function createHeroSection() {
  const hero = document.createElement("div");
  hero.classList.add("hero-section");

  const h1 = document.createElement("h1");
  h1.innerHTML = "Your Audio Producer";
  hero.append(h1);

  const logo = document.createElement("div");
  logo.classList.add("logo");

  const logoImg = document.createElement("img");
  logoImg.src = "media/Logo Img.png";
  logoImg.classList.add("logoImg");
  logo.append(logoImg);

  hero.prepend(logo);
  document.body.append(hero);
}

// Create the games section
function createGamesSection() {
  const games = document.createElement("div");
  games.classList.add("games");

  const gamesImg = document.createElement("img");
  gamesImg.src = "media/knob.png";
  gamesImg.classList.add("gamesImg");
  games.append(gamesImg);

  const gamesContent = document.createElement("div");
  gamesContent.classList.add("gamesContent");
  games.append(gamesContent);

  // Videos in games section

  const video1Frame = document.createElement("div");
  video1Frame.classList.add("video1Frame");
  gamesContent.append(video1Frame);

  const video1Container = document.createElement("div");
  video1Container.classList.add("video1Container");
  video1Frame.append(video1Container)

  const video1 = document.createElement("video");
  video1.src = "media/videoMute/Retanol Estrich (b&w).mp4";
  video1.classList.add("video1");
  video1.autoplay = true;
  video1.loop = true;
  video1.muted = true;
  video1Container.append(video1);

  return games;
}

// Create the podcasting section
function createPodcastingSection() {
  const podcasting = document.createElement("div");
  podcasting.classList.add("podcasting");

  const podcastImg = document.createElement("img");
  podcastImg.src = "media/Headphone Guy no bg.png";
  podcastImg.classList.add("podcastImg");

  podcasting.append(podcastImg);
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

createHeroSection();
createMainSection();
