import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

// Function for creating audioplayers and adding funcionality to the playbuttons

document.addEventListener('DOMContentLoaded', function() {
  const players = [
    {id: "#pod1", link: "media/audio/HCH 15.mp3"},
    {id: "#pod2", link: "media/audio/voice.mp3"},
    {id: "#pod3", link: "media/audio/HCH 15.mp3"},
    {id: "#pod4", link: "media/audio/voice.mp3"},
    {id: "#audiobook1", link: "media/audio/voice.mp3"},
    {id: "#audiobook2", link: "media/audio/HCH 15.mp3"},
    {id: "#audiobook3", link: "media/audio/voice.mp3"},
    {id: "#audiobook4", link: "media/audio/HCH 15.mp3"}
  ];

  const waveSurferInstances = {};

  // Initialize WaveSurfer instances for all players
  players.forEach(player => {
    const waveSurfer = WaveSurfer.create({
      container: player.id,
      waveColor: "gray",
      progressColor: "#df313c",
      normalize: true,
      url: player.link,
    });
    
    document.addEventListener("keydown", event => {
      if (event.code === "Space") {
        if (waveSurfer.isPlaying()) {
            waveSurfer.pause();
            const playPods = document.querySelectorAll(".playPod");
            playPods.forEach(pod => {
              pod.src = "media/images/My Play Button GREY.webp";
            });
        }
      }
    })
    waveSurferInstances[player.id.slice(1)] = waveSurfer; // Store the instance without the '#' in the key
  });

  const playBtns = document.querySelectorAll(".waveImg");

  playBtns.forEach(btn => {
    btn.addEventListener("click", event => {
      const container = event.target.closest(".waveContainer"); // Find the closest .waveContainer
      if (container) {
        const podId = container.querySelector(".wave > div").id; // Get the id of the child div of .wave
        const waveSurfer = waveSurferInstances[podId]; // Get the corresponding WaveSurfer instance

        if (waveSurfer) {
          waveSurfer.playPause();
          // Visual feedback
          if (waveSurfer.isPlaying()) {
            event.target.src = "media/images/My Play Button RED.webp"; 
          } else {
            event.target.src = "media/images/My Play Button GREY.webp"; 
          }
        }
      }
    });
  });
});


// REVIEWS

let slideIndex = 1;
showSlides(slideIndex);

let next = document.getElementsByClassName("next");

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    plusSlides(1);
  }
  if (event.code === "ArrowLeft") {
    plusSlides(-1);
  }
});
document.getElementById("nextButton").addEventListener("click", function () {
  plusSlides(1);
});
document.getElementById("prevButton").addEventListener("click", function () {
  plusSlides(-1);
});

window.onload = function () {
  setInterval(function () {
    plusSlides(1);
  }, 3000);
};

// VIDEO MODAL FUNCIONALITY

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  const videoTriggers = document.querySelectorAll(".videoFrame");
  const closeModalBtn = document.querySelector(".close");
  let spaceDownTime = 0;
  let isSpaceDown = false;

  let isPlaying = false;

  function openModal(videoSrc) {
    video.src = videoSrc;
    modal.style.display = "block";
    isPlaying = true;
    video.play();
    video.focus();
  }

  function closeModal() {
    modal.style.display = "none";
    video.pause();
    isPlaying = false;
  }
  function handleClickOutsideModal(event) {
    event.preventDefault();
    if (event.target === modal) {
      closeModal();
    }
  }
  function handleClickOnVideoModal(event) {
    console.log("clicked");
    if (event.target === video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      isPlaying = !isPlaying;
    }
  }

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const videoSrc = this.getAttribute("data-video-src");
      openModal(videoSrc);
    });
  });

  //  Functions for double speed when space is held

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !isSpaceDown) {
      event.preventDefault();
      spaceDownTime = new Date().getTime();
      isSpaceDown = true;

      setTimeout(() => {
        if (isSpaceDown) {
          video.playbackRate = 2.0;
        }
      }, 500); // Adjust the delay as needed for recognizing long press
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
      const spaceUpTime = new Date().getTime();
      isSpaceDown = false;
      video.playbackRate = 1.0;

      if (spaceUpTime - spaceDownTime < 500) {
        // Adjust the delay to match the long press delay
        togglePlayPause();
      } else if (isPlaying) {
        video.play(); // Continue playing if it was playing
      }
    }
  });

  closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("click", handleClickOutsideModal);
  video.addEventListener("click", handleClickOnVideoModal);
  // Close modal when video ends
  video.addEventListener("ended", closeModal);
});