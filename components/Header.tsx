
import React from 'react';
import { WandIcon } from './icons';

export const Header: React.FC = () => (
  <header className="py-4 px-6 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
    <div className="container mx-auto flex items-center gap-3">
        <WandIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            AI Wallpaper Studio
        </h1>
    </div>
  </header>
);
