import React from 'react';

interface VideoPopupProps {
  onClose: () => void;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        <script src="https://fast.wistia.com/player.js" async></script>
        <script src="https://fast.wistia.com/embed/gkkws8y4s5.js" async type="module"></script>
        <style>
          {`
            wistia-player[media-id='gkkws8y4s5']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/gkkws8y4s5/swatch');
              display: block;
              filter: blur(5px);
              padding-top: 177.78%;
            }
          `}
        </style>
        <wistia-player media-id="gkkws8y4s5" aspect="0.5625"></wistia-player>
      </div>
    </div>
  );
};

export default VideoPopup;
