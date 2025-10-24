
import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateWallpaper } from './services/geminiService';
import { AspectRatio } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A vibrant nebula in deep space, hyperrealistic, 8k');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageB64 = await generateWallpaper(prompt, aspectRatio);
      setGeneratedImage(`data:image/png;base64,${imageB64}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to generate wallpaper: ${err.message}`);
      } else {
        setError('An unknown error occurred while generating the wallpaper.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            isLoading={isLoading}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="w-full lg:w-2/3">
          <ImageDisplay
            isLoading={isLoading}
            error={error}
            generatedImage={generatedImage}
            prompt={prompt}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
