const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock download endpoint
app.post('/api/download', (req, res) => {
  const { url, format } = req.body;
  
  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  // In a real implementation, you would:
  // 1. Validate the URL format
  // 2. Check which platform it belongs to
  // 3. Use appropriate library (yt-dlp, etc.) to fetch video info
  // 4. Process the download
  
  // For this demo, we'll return mock data
  const responseData = {
    success: true,
    message: 'Download initiated successfully',
    downloadUrl: '/api/download/mock-video.mp4',
    title: 'Sample Video Title',
    platform: 'youtube'
  };
  
  res.json(responseData);
});

// Mock video file download
app.get('/api/download/mock-video.mp4', (req, res) => {
  // In a real implementation, this would serve the actual video file
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="sample-video.mp4"');
  res.send('Mock video content');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});