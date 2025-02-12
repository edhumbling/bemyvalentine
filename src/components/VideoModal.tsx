import { useState } from 'react';
import { X } from 'lucide-react';

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 md:p-4 p-0">
      <div className="relative w-full h-full md:h-auto md:max-w-4xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:-top-10 md:right-0 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Close video"
        >
          <X className="w-8 h-8 md:w-6 md:h-6" />
        </button>
        
        <div className="relative w-full h-full md:pt-[56.25%]">
          <iframe
            src="https://fast.wistia.net/embed/iframe/gkkws8y4s5?autoPlay=true&preload=true"
            className="absolute top-0 left-0 w-full h-full md:rounded-lg"
            title="Valentine Video"
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="eager"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 