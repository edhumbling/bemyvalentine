document.addEventListener('DOMContentLoaded', function () {
  const videoPopup = document.getElementById('video-popup');
  const wistiaPlayer = videoPopup.querySelector('wistia-player');

  function closeVideoPopup(event) {
    if (!wistiaPlayer.contains(event.target)) {
      videoPopup.style.display = 'none';
    }
  }

  document.addEventListener('click', closeVideoPopup);
});
