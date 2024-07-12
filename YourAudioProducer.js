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

//  EXPERIMENTING ZONE

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const videoTriggers = document.querySelectorAll('.video-trigger');
  const closeModalBtn = document.querySelector('.close');

  let isPlaying = false;

  function openModal(videoSrc) {
    video.src = videoSrc;
    modal.style.display = 'block';
    isPlaying = true;
    video.play();
  }

  function closeModal() {
    modal.style.display = 'none';
    video.pause();
    isPlaying = false;
  }
  function handleClickOutsideModal(event) {
    event.preventDefault();
    if (event.target === modal) {
      closeModal();
    }
  }

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      const videoSrc = this.getAttribute('data-video-src');
      openModal(videoSrc);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  document.addEventListener('click', handleClickOutsideModal);
  // Close modal when video ends
  video.addEventListener('ended', closeModal);
});