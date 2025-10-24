
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { DownloadIcon, ImageIcon } from './icons';

interface ImageDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
  prompt: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, error, generatedImage, prompt }) => {
  const getAspectRatioClass = (imageSrc: string | null) => {
    if (!imageSrc) return 'aspect-[9/16]'; // Default aspect ratio for placeholder
    return 'aspect-auto';
  };

  const downloadFileName = prompt.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_') + '.png';

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
          <LoadingSpinner />
          <p className="text-lg">AI is painting your masterpiece...</p>
          <p className="text-sm text-gray-500 text-center max-w-sm">This can take a moment. High-quality art requires a little patience!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Generation Failed</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (generatedImage) {
      return (
        <div className="relative group">
          <img
            src={generatedImage}
            alt={prompt}
            className="w-full h-auto rounded-xl object-contain shadow-2xl shadow-black/50"
          />
          <a
            href={generatedImage}
            download={downloadFileName}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 text-white py-2 px-4 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-600"
          >
            <DownloadIcon className="w-5 h-5" />
            Download
          </a>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
        <ImageIcon className="w-24 h-24" />
        <h2 className="text-2xl font-semibold text-gray-400">Your wallpaper will appear here</h2>
        <p className="text-gray-600">Fill out the prompt and click "Generate".</p>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-4xl mx-auto bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center p-4 transition-all duration-300 min-h-[60vh] lg:min-h-[80vh] ${getAspectRatioClass(generatedImage)}`}>
      {renderContent()}
    </div>
  );
};
