import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

// Function for creating audioplayers and adding funcionality to the playbuttons

// Global varialble for storing currently playing instance of audio player used for stop playing more audio at once
let currentPlayingInstance = null;

document.addEventListener("DOMContentLoaded", function () {
  const players = [
    { id: "#pod1", link: "media/audio/HCH 15.mp3" },
    { id: "#pod2", link: "media/audio/voice.mp3" },
    { id: "#pod3", link: "media/audio/HCH 15.mp3" },
    { id: "#pod4", link: "media/audio/voice.mp3" },
    { id: "#audiobook1", link: "media/audio/voice.mp3" },
    { id: "#audiobook2", link: "media/audio/HCH 15.mp3" },
    { id: "#audiobook3", link: "media/audio/voice.mp3" },
    { id: "#audiobook4", link: "media/audio/HCH 15.mp3" },
  ];

  const waveSurferInstances = {};

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  // adding observer for observing audio elements and loading files as audio elements come in the viewport

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const player = players.find((p) => p.id === `#${entry.target.id}`);
        if (player) {
          // Initialize WaveSurfer instance for the intersecting element
          const waveSurfer = WaveSurfer.create({
            container: player.id,
            waveColor: "gray",
            progressColor: "#df313c",
            normalize: true,
            url: player.link,
          });
          waveSurferInstances[player.id.slice(1)] = waveSurfer; // Store the instance without the '#' in the key
          observer.unobserve(entry.target); // Stop observing once initialized
        }
      }
    });
  }, observerOptions);

  // Start observing each element
  players.forEach((player) => {
    const element = document.querySelector(player.id);
    if (element) {
      observer.observe(element);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && currentPlayingInstance) {
      currentPlayingInstance.pause();
      const playPods = document.querySelectorAll(".playPod");
      playPods.forEach((pod) => {
        pod.src = "media/images/My Play Button GREY.webp";
      });
    }
  });

  const playBtns = document.querySelectorAll(".waveImg");

  playBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      btn.classList.add("clicked");

      setTimeout(function () {
        btn.classList.remove("clicked");
      }, 100);

      const container = event.target.closest(".waveContainer"); // Find the closest .waveContainer
      if (container) {
        const podId = container.querySelector(".wave > div").id; // Get the id of the child div of .wave
        const waveSurfer = waveSurferInstances[podId]; // Get the corresponding WaveSurfer instance

        if (waveSurfer) {
          // Pause any currently playing instance before playing the new one
          if (currentPlayingInstance && currentPlayingInstance !== waveSurfer) {
            currentPlayingInstance.pause();
            const playPods = document.querySelectorAll(".playPod");
            playPods.forEach((pod) => {
              pod.src = "media/images/My Play Button GREY.webp";
            });
          }
          waveSurfer.playPause();

          // Visual feedback
          if (waveSurfer.isPlaying()) {
            event.target.src = "media/images/My Play Button RED.webp";
            currentPlayingInstance = waveSurfer; // Update the currently playing instance
          } else {
            event.target.src = "media/images/My Play Button GREY.webp";
            currentPlayingInstance = null; // Reset the currently playing instance
          }

          waveSurfer.on("finish", () => {
            event.target.src = "media/images/My Play Button GREY.webp";
            currentPlayingInstance = null; // Reset the currently playing instance when finished
            waveSurfer.stop();
          });
        }
      }
    });
  });
});

// Function for iterating trough "visit podcast" buttons and its functionality

document.addEventListener("DOMContentLoaded", function () {
  const links = [
    "https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web",
    "https://online.mtsbanka.rs/webapp/Identity/Login#",
    "https://squoosh.app/",
    "https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language",
  ];
  const visitBtn = document.querySelectorAll(".visitPod");

  visitBtn.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      window.open(links[index], "_blank");
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

// Function for moving the "reviews" element in different elements based on screen size

function moveReviews() {
  const width = window.innerWidth;
  const reviews = document.querySelector(".slideshow-container");
  const games = document.querySelector(".games");
  const podcasting = document.querySelector(".podcasting");
  const audiobooks = document.querySelector(".audiobooks");

  if (width < 952) {
    podcasting.appendChild(reviews);
  } else if (width >= 952 && width < 1356) {
    games.appendChild(reviews);
  } else {
    audiobooks.insertBefore(reviews, audiobooks.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", moveReviews);
window.addEventListener("resize", moveReviews);

// VIDEO MODAL FUNCIONALITY

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  const videoTriggers = document.querySelectorAll(".videoFrame");
  const closeModalBtn = document.querySelector(".close");
  const blur = document.getElementsByClassName("blur-container")[0];
  let spaceDownTime = 0;
  let isSpaceDown = false;

  let isPlaying = false;

  function openModal(videoSrc) {
    video.src = videoSrc;
    modal.style.display = "block";
    isPlaying = true;
    video.play();
    video.focus();
    blur.classList.add("blur-background");
    currentPlayingInstance.pause();
  }

  function closeModal() {
    modal.style.display = "none";
    video.pause();
    isPlaying = false;
    blur.classList.remove("blur-background");
  }
  function handleClickOutsideModal(event) {
    event.preventDefault();
    if (event.target === modal) {
      closeModal();
    }
  }
  function handleClickOnVideoModal(event) {
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

// TEXT MODAL FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("textModal");
  const closeBtn = document.querySelector(".txtClose");
  const blur = document.getElementsByClassName("blur-container")[0];
  const listBtn = document.querySelector(".full-audiobook-list");

  function openModal() {
    modal.style.display = "block";
    blur.classList.add("blur-background");
  }

  function closeModal() {
    modal.style.display = "none";
    blur.classList.remove("blur-background");
  }
  function handleClickOutsideModal(event) {
    event.preventDefault();
    if (event.target === modal) {
      closeModal();
    }
  }

  listBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("click", handleClickOutsideModal);
});

// Footer links

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link-anchor");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const url = link.getAttribute("href");
      window.open(url, "_blank");
    });
  });
});
