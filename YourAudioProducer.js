import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

// Global varialble for storing currently playing instance of the audio player, used to stop playing many audio tracks at once
let currentPlayingInstance = null;
let isAudioPlaying = null;

const waveSurferInstances = {};
const players = [
  {
    id: "#pod1",
    link: "media/audio/HCH 15.mp3",
    url: "https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web",
  },
  {
    id: "#pod2",
    link: "media/audio/voice.mp3",
    url: "https://online.mtsbanka.rs/webapp/Identity/Login#",
  },
  { 
    id: "#pod3", 
    link: "media/audio/HCH 15.mp3", 
    url: "https://squoosh.app/" },
  {
    id: "#pod4",
    link: "media/audio/voice.mp3",
    url: "https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language",
  },
  { id: "#audiobook1", link: "media/audio/voice.mp3" },
  { id: "#audiobook2", link: "media/audio/HCH 15.mp3" },
  { id: "#audiobook3", link: "media/audio/voice.mp3" },
  { id: "#audiobook4", link: "media/audio/HCH 15.mp3" },
];

document.addEventListener("DOMContentLoaded", function () {
  handleAudioPlay();
  setupObserver();
  handleVisitPodcast();
  handleReviews();
  moveReviews();
  handleVideoModal();
  handleTextModal();
  handleFooterButons();
});

window.addEventListener("resize", moveReviews);

function audioPlayer(id, link) {
  const waveSurfer = WaveSurfer.create({
    container: id,
    waveColor: "gray",
    progressColor: "#df313c",
    normalize: true,
    url: link,
  });
  waveSurferInstances[id.slice(1)] = waveSurfer;
}

function handleAudioPlay() {
  const playBtns = document.querySelectorAll(".waveImg");

  playBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      btn.classList.add("clicked");
      setTimeout(function () {
        btn.classList.remove("clicked");
      }, 100);

      const container = event.target.closest(".waveContainer"); // Find the closest .waveContainer
      if (!container) return;

      const podId = container.querySelector(".wave > div").id; // Get the id of the child div of .wave
      const waveSurfer = waveSurferInstances[podId]; // Get the corresponding WaveSurfer instance
      waveSurfer.playPause();
      isAudioPlaying = waveSurfer.isPlaying();

      if (!waveSurfer) return;
      // Pause any currently playing instance before playing the new one
      if (currentPlayingInstance && currentPlayingInstance !== waveSurfer) {
        currentPlayingInstance.pause();
        playBtns.forEach((pod) => {
          pod.setAttribute("aria-pressed", "false");
        });
      }

      // Visual feedback
      if (isAudioPlaying === true) {
        currentPlayingInstance = waveSurfer; // Update the currently playing instance
        btn.setAttribute("aria-pressed", "true");
      } else {
        currentPlayingInstance = null; // Reset the currently playing instance
        btn.setAttribute("aria-pressed", "false");
      }

      waveSurfer.on("finish", () => {
        currentPlayingInstance = null; // Reset the currently playing instance when finished
        btn.setAttribute("aria-pressed", "false");
        isAudioPlaying = waveSurfer.stop();
      });
      btn.addEventListener("keydown", (event) => {
        if (event.code === "ArrowRight") {
          waveSurfer.skip(1);
        }
        if (event.code === "ArrowLeft") {
          waveSurfer.skip(-1);
        }
      });
    });
  });
}

// Setting up observer to load audio files as they come in the viewport

function setupObserver() {
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const player = players.find((p) => p.id === `#${entry.target.id}`);
        if (player) {
          audioPlayer(player.id, player.link);
          observer.unobserve(entry.target); // Stop observing once initialized
        }
      }
    });
  }, observerOptions);

  players.forEach((player) => {
    const element = document.querySelector(player.id);
    if (element) {
      observer.observe(element);
    }
  });
}

function handleVisitPodcast() {
  const visitBtn = document.querySelectorAll(".visitPod");

  visitBtn.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      window.open(players[index].url, "_blank");
    });
  });
}

// REVIEWS

function handleReviews() {
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
}

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

// VIDEO MODAL FUNCIONALITY

function handleVideoModal() {
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
    currentPlayingInstance.pause();
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
        // togglePlayPause();
      } else if (isPlaying) {
        video.play(); // Continue playing if it was playing
      }
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  });

  closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("click", handleClickOutsideModal);
  video.addEventListener("click", handleClickOnVideoModal);
  // Close modal when video ends
  video.addEventListener("ended", closeModal);
}

// TEXT MODAL FUNCTIONALITY

function handleTextModal() {
  const modal = document.getElementById("textModal");
  const closeBtn = document.querySelector(".txtClose");
  const listBtn = document.querySelector(".full-audiobook-list");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }
  function handleClickOutsideModal(event) {
    if (event.target === modal) {
      closeModal();
    }
  }
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  });

  listBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("click", handleClickOutsideModal);
}

// Footer links

function handleFooterButons() {
  const links = document.querySelectorAll(".link-anchor");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const url = link.getAttribute("href");
      window.open(url, "_blank");
    });
  });
}
