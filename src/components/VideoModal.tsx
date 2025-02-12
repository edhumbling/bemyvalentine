import { useState } from 'react';
import { X } from 'lucide-react';

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src="https://fast.wistia.net/embed/iframe/gkkws8y4s5?autoPlay=true"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            title="Valentine Video"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 