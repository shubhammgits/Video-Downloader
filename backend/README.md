# VideoDownloader Backend

Backend server for the VideoDownloader application.

## API Endpoints

### POST /api/download
Initiates a video download process.

**Request Body:**
```json
{
  "url": "string",      // Video URL to download
  "format": "string"    // Optional format specification
}
```

**Response:**
```json
{
  "success": true,
  "message": "Download initiated successfully",
  "downloadUrl": "/api/download/mock-video.mp4",
  "title": "Sample Video Title",
  "platform": "youtube"
}
```

### GET /api/download/mock-video.mp4
Returns a mock video file (for demonstration purposes).

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=3001
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Running the Server

### Production Mode
```bash
node server.js
```

### Development Mode (requires nodemon)
```bash
npm run dev
```

## Dependencies

- express: Web framework
- cors: Cross-origin resource sharing
- dotenv: Environment variable management

## Dev Dependencies

- nodemon: Development server with auto-restart