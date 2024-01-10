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

audioPlayer("#pod1", "media/audio/HCH 15.mp3");
audioPlayer("#pod2", "media/audio/voice.mp3");
audioPlayer("#pod3", "media/audio/HCH 15.mp3");
audioPlayer("#pod4", "media/audio/voice.mp3");

audioPlayer("#audiobook1", "media/audio/voice.mp3");
audioPlayer("#audiobook2", "media/audio/HCH 15.mp3");
audioPlayer("#audiobook3", "media/audio/voice.mp3");
audioPlayer("#audiobook4", "media/audio/HCH 15.mp3");

// REVIEWS

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
window.onload= function () {
 setInterval(function(){ 
     plusSlides(1);
 }, 3000);
 }