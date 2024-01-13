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

let slideIndex = 1;
showSlides(slideIndex);

let next = document.getElementsByClassName("next");

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

document.addEventListener("keydown", (event)=> {
        if (event.code === "ArrowRight") {
          plusSlides(1)
        }
        if (event.code === "ArrowLeft") {
          plusSlides(-1)
        }
})
document.getElementById('nextButton').addEventListener('click', function() {
  plusSlides(1);
});
document.getElementById('prevButton').addEventListener('click', function() {
  plusSlides(-1);
});

window.onload= function () {
 setInterval(function(){ 
     plusSlides(1);
 }, 3000);
 }