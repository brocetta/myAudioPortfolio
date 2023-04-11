const h1 = document.createElement("h1");
const hero = document.createElement("div");
const logo = document.createElement("div");
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image"
);

document.body.append(hero);
hero.classList.add("hero-section");

h1.innerHTML = "Your Audio Producer";
hero.append(h1);

hero.prepend(logo);
logo.classList.add("logo");

svg.setAttribute("width", "100");
svg.setAttribute("height", "100");
svg.style.fill = "white";
svgImage.setAttributeNS(
  "http://www.w3.org/1999/xlink",
  "xlink:href",
  "../media/logo.svg"
);
svg.appendChild(svgImage);

logo.append(svg);
