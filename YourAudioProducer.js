const h1 = document.createElement("h1");
const hero = document.createElement("div");
const main = document.createElement("div");
const games = document.createElement("div");
const podcasting = document.createElement("div");

const logo = document.createElement("div");
const logoImg = document.createElement("img");
const gamesImg = document.createElement("img");
const podcastImg = document.createElement("img");

document.body.append(hero);
hero.classList.add("hero-section");

h1.innerHTML = "Your Audio Producer";
hero.append(h1);

hero.prepend(logo);
logo.classList.add("logo");

logoImg.src = "media/Logo Img.png";
logoImg.style.height = "80px";
logo.append(logoImg);

document.body.append(main);
main.classList.add("main");

main.append(games);
games.classList.add("games");

gamesImg.src = "media/knob.png";
gamesImg.classList.add("gamesImg");
gamesImg.style.width = "100%";
gamesImg.style.height = "100%";
gamesImg.style.objectFit = "cover";
games.append(gamesImg);

main.append(podcasting);
podcasting.classList.add("podcasting");

podcastImg.src = "media/Headphone Guy no bg.png";
podcastImg.classList.add("podcastImg");
podcastImg.style.width = "100%";
podcastImg.style.height = "100%";
podcastImg.style.objectFit = "cover";
podcasting.append(podcastImg);
