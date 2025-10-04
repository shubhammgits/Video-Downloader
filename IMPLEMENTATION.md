# Implementation Guide for Video Downloading Functionality

This document provides guidance on implementing the actual video downloading functionality for the VideoDownloader application.

## Overview

The current implementation includes a complete frontend UI and a basic backend structure. To make the application fully functional, you need to implement the actual video downloading logic in the backend.

## Required Tools

To implement the full video downloading functionality, you'll need to integrate with existing video downloading tools:

### 1. yt-dlp (Recommended)

yt-dlp is a youtube-dl fork with additional features and fixes.

**Installation:**
```bash
# On Windows
pip install yt-dlp

# On macOS/Linux
pip3 install yt-dlp
```

### 2. ffmpeg (Optional but Recommended)

ffmpeg is useful for video processing and format conversion.

**Installation:**
- Windows: Download from https://ffmpeg.org/download.html
- macOS: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg` (Ubuntu/Debian)

## Backend Implementation

### 1. Modify `backend/server.js`

Replace the mock download endpoint with actual implementation:

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// Download endpoint
app.post('/api/download', async (req, res) => {
  const { url, format } = req.body;
  
  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `video_${timestamp}`;
    const outputPath = path.join(__dirname, 'downloads', filename);
    
    // Ensure downloads directory exists
    if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
      fs.mkdirSync(path.join(__dirname, 'downloads'));
    }
    
    // Build yt-dlp command
    let command = `yt-dlp -o "${outputPath}.%(ext)s"`;
    
    // Add format specification if provided
    if (format) {
      command += ` -f ${format}`;
    }
    
    command += ` "${url}"`;
    
    // Execute download command
    await executeCommand(command);
    
    // Find the downloaded file
    const files = fs.readdirSync(path.join(__dirname, 'downloads'));
    const downloadedFile = files.find(file => file.startsWith(filename));
    
    if (!downloadedFile) {
      throw new Error('Download failed: File not found');
    }
    
    // Return success response
    res.json({
      success: true,
      message: 'Download completed successfully',
      filename: downloadedFile,
      downloadUrl: `/api/download/${downloadedFile}`
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ 
      error: 'Download failed', 
      message: error.message 
    });
  }
});

// Serve downloaded files
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'downloads', filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Set headers for download
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  // Stream the file
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
  
  // Handle stream errors
  fileStream.on('error', (error) => {
    console.error('File stream error:', error);
    res.status(500).json({ error: 'Failed to stream file' });
  });
  
  // Clean up file after download (optional)
  res.on('finish', () => {
    // Uncomment the following lines if you want to delete files after download
    // fs.unlinkSync(filePath);
  });
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
```

### 2. Update Dependencies

Update `backend/package.json` to include additional dependencies:

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  }
}
```

### 3. Environment Variables

Update `backend/.env` with any necessary configuration:

```env
PORT=3001
NODE_ENV=development
DOWNLOAD_DIR=./downloads
MAX_FILE_SIZE=100MB
```

## Frontend Integration

### 1. Update Frontend to Handle Real Downloads

Modify the download handler in your frontend to handle the actual file download:

```javascript
// Handle download
async function handleDownload(format) {
  try {
    // Call backend download endpoint
    const response = await fetch('http://localhost:3001/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: videoUrlInput.value, 
        format: format 
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Download failed');
    }
    
    // Trigger file download
    const downloadUrl = `http://localhost:3001/api/download/${data.filename}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = data.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Download started!');
  } catch (error) {
    console.error('Download failed:', error);
    alert(`Download failed: ${error.message}`);
  }
}
```

## Platform-Specific Handlers

For better control over different platforms, you might want to implement platform-specific handlers:

```javascript
// Platform-specific download handlers
const platformHandlers = {
  youtube: async (url, format) => {
    // YouTube-specific logic
    const command = `yt-dlp -f "${format}" "${url}"`;
    return await executeCommand(command);
  },
  
  instagram: async (url, format) => {
    // Instagram-specific logic
    const command = `yt-dlp -f "best[height<=?1080]" "${url}"`;
    return await executeCommand(command);
  },
  
  facebook: async (url, format) => {
    // Facebook-specific logic
    const command = `yt-dlp -f "best" "${url}"`;
    return await executeCommand(command);
  },
  
  tiktok: async (url, format) => {
    // TikTok-specific logic
    const command = `yt-dlp -f "best" "${url}"`;
    return await executeCommand(command);
  },
  
  twitter: async (url, format) => {
    // Twitter-specific logic
    const command = `yt-dlp -f "best" "${url}"`;
    return await executeCommand(command);
  }
};

// Updated download endpoint using platform handlers
app.post('/api/download', async (req, res) => {
  const { url, format } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // Detect platform
    const platform = detectPlatform(url);
    
    // Use platform-specific handler if available
    if (platformHandlers[platform]) {
      const result = await platformHandlers[platform](url, format);
      // Process result...
    } else {
      // Fallback to generic handler
      const command = `yt-dlp "${url}"`;
      await executeCommand(command);
    }
    
    // Return success response...
  } catch (error) {
    // Handle error...
  }
});
```

## Security Considerations

1. **Input Validation**: Always validate and sanitize user inputs
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **File Access Control**: Ensure downloaded files are properly isolated
4. **Command Injection**: Sanitize inputs to prevent command injection attacks
5. **CORS**: Configure CORS properly for production

## Performance Optimization

1. **Caching**: Cache video metadata to reduce repeated requests
2. **Streaming**: Stream large files instead of loading them into memory
3. **Compression**: Use compression for API responses
4. **Asynchronous Processing**: For large files, consider queuing downloads
5. **CDN**: Use a CDN for static assets

## Deployment Considerations

1. **File Storage**: Consider using cloud storage (S3, Google Cloud Storage) for downloaded files
2. **Containerization**: Use Docker for consistent deployment
3. **Load Balancing**: Implement load balancing for high-traffic scenarios
4. **Monitoring**: Add logging and monitoring for production
5. **Backup**: Implement backup strategies for downloaded files

## Testing

1. **Unit Tests**: Test individual functions and handlers
2. **Integration Tests**: Test the complete download flow
3. **Platform Tests**: Test each supported platform
4. **Edge Cases**: Test invalid URLs, network errors, etc.
5. **Performance Tests**: Test with large files and concurrent downloads

## Legal Considerations

1. **Terms of Service**: Ensure compliance with platform terms of service
2. **Copyright**: Respect copyright laws and content ownership
3. **Licensing**: Ensure proper licensing of all components
4. **User Agreements**: Implement clear user agreements and disclaimers

This implementation guide provides a foundation for building a fully functional video downloader. Remember to test thoroughly and consider all legal and ethical implications of your implementation.