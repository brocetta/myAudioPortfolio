const h1 = document.createElement("h1");
const heroImg = document.createElement("img");
const hero = document.createElement("div");


document.body.append(hero);
hero.classList.add("hero-section");

h1.innerHTML = "Your Audio Producer";
hero.append(h1);

heroImg.src = "../media/DrumMachine.png";
heroImg.alt = "Picture of Drum Machine";

hero.append(heroImg);
img.classList.add("hero-image");
