document.addEventListener("DOMContentLoaded", function() {
  const videoPopup = document.getElementById("video-popup");

  if (videoPopup) {
    videoPopup.classList.add("show");

    document.addEventListener("click", function(event) {
      if (!videoPopup.contains(event.target)) {
        videoPopup.classList.remove("show");
      }
    });
  }
});
