'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  // Detect platform from URL
  const detectPlatform = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('facebook.com') || url.includes('fb.com')) return 'facebook';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    return 'unknown';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Call our backend API
      const response = await fetch('http://localhost:3001/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, format: 'best' }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process download');
      }

      // For demo purposes, we'll simulate getting video info
      setVideoInfo({
        title: data.title || 'Sample Video Title',
        thumbnail: 'https://placehold.co/600x400',
        duration: '3:45',
        formats: [
          { quality: '720p', format: 'mp4', size: '45MB' },
          { quality: '1080p', format: 'mp4', size: '85MB' },
          { quality: 'audio', format: 'mp3', size: '5MB' }
        ]
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video information. Please check the URL and try again.');
      setIsLoading(false);
    }
  };

  // Handle download
  const handleDownload = async (format: string) => {
    // In a real app, this would trigger the actual download
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = 'http://localhost:3001/api/download/mock-video.mp4';
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert(`Downloading in ${format} format!`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set dark mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">VD</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              VideoDownloader
            </h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Download Videos in Seconds
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Paste any video link from YouTube, Instagram, Facebook, TikTok, or Twitter and download in one click. No ads, no redirects.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste video link here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Paste
                </button>
              </div>
              <button
                type="submit"
                disabled={!url || isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  !url || isLoading
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? 'Processing...' : 'Download'}
              </button>
            </div>
            
            {detectPlatform(url) !== 'unknown' && url && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                <span className="mr-2">Detected:</span>
                <span className="capitalize font-medium">{detectPlatform(url)}</span>
              </div>
            )}
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Analyzing video...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-8">
            <div className="flex items-center text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Video Preview */}
        {videoInfo && !isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Video Preview</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={videoInfo.thumbnail} 
                      alt={videoInfo.title} 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                      {videoInfo.duration}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{videoInfo.title}</h3>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Download Options</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {videoInfo.formats.map((format: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => handleDownload(format.quality)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{format.quality}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{format.format}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{format.size}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supported Platforms */}
        {!videoInfo && !isLoading && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Supported Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Twitter'].map((platform) => (
                <div 
                  key={platform}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mb-2">
                    <span className="text-white font-bold">{platform.charAt(0)}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} VideoDownloader. All rights reserved.</p>
      </footer>
    </div>
  );
}