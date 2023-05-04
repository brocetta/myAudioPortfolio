// Create the hero section ------------------------------------------------
const hero = document.createElement("div");
document.body.append(hero);
hero.classList.add("hero-section");

// Create title in the hero section
const h1 = document.createElement("h1");
h1.innerHTML = "Your Audio Producer";
hero.append(h1);

// Create logo in the hero section
const logo = document.createElement("div");
hero.prepend(logo);
logo.classList.add("logo");

const logoImg = document.createElement("img");
logoImg.src = "media/Logo Img.png";
logoImg.classList.add("logoImg");
logo.append(logoImg);
// ------------------------------------------------------------------------

// Create main section that will contain subsections-----------------------
const main = document.createElement("div");
document.body.append(main);
main.classList.add("main");

// Create games subsection
const games = document.createElement("div");
main.append(games);
games.classList.add("games");

const gamesImg = document.createElement("img");
gamesImg.src = "media/knob.png";
gamesImg.classList.add("gamesImg");
games.append(gamesImg);

// Create podcasting sunsection
const podcasting = document.createElement("div");
main.append(podcasting);
podcasting.classList.add("podcasting");

const podcastImg = document.createElement("img");
podcastImg.src = "media/Headphone Guy no bg.png";
podcastImg.classList.add("podcastImg");
podcasting.append(podcastImg);
// ----------------------------------------------------------------------