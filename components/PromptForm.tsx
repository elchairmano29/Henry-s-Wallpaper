
import React from 'react';
import { AspectRatio, ASPECT_RATIOS } from '../types';
import { WandIcon } from './icons';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onGenerate,
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-md flex flex-col gap-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Describe your wallpaper
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
          placeholder="e.g., A minimalist landscape with a single red tree..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.value}
              type="button"
              onClick={() => setAspectRatio(ratio.value)}
              disabled={isLoading}
              className={`py-2 px-2 text-sm rounded-md transition-colors duration-200 text-center ${
                aspectRatio === ratio.value
                  ? 'bg-indigo-600 text-white font-semibold shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {ratio.label} <span className="block text-xs text-gray-400">{ratio.value}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <WandIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate Wallpaper'}
      </button>
    </div>
  );
};
