// Create the hero section ------------------------------------------------
const hero = document.createElement("div");
document.body.append(hero);
hero.classList.add("hero-section");

// Create heading in the hero section
const h1 = document.createElement("h1");
h1.innerHTML = "Your Audio Producer";
hero.append(h1);

// Create logo in the herosection
const logo = document.createElement("div");
hero.prepend(logo);
logo.classList.add("logo");

const logoImg = document.createElement("img");
logoImg.src = "media/Logo Img.png";
logoImg.style.height = "80px";
logo.append(logoImg);
// ------------------------------------------------------------------------


// Create main section that will contain other subsections-----------------
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
gamesImg.style.width = "100%";
gamesImg.style.height = "100%";
gamesImg.style.objectFit = "cover";
games.append(gamesImg);

// Create podcasting sunsection
const podcasting = document.createElement("div");
main.append(podcasting);
podcasting.classList.add("podcasting");

const podcastImg = document.createElement("img");
podcastImg.src = "media/Headphone Guy no bg.png";
podcastImg.classList.add("podcastImg");
podcastImg.style.width = "100%";
podcastImg.style.height = "100%";
podcastImg.style.objectFit = "cover";
podcasting.append(podcastImg);
// ----------------------------------------------------------------------
