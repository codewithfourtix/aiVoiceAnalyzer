# Voice AI Evaluator - Server

Express.js backend server for the Voice AI Evaluator application.

## Features

- 🎤 Audio file upload handling
- 🔍 Voice analysis integration (AssemblyAI/Deepgram)
- 📊 RESTful API endpoints
- 🛡️ Error handling and validation
- 📁 Automatic file cleanup

## API Endpoints

### POST /api/analyze-voice

Upload and analyze voice recording.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: audio file (max 10MB)

**Response:**
\`\`\`json
{
"pace": "normal",
"pitch": "medium",
"volume": "loud",
"confidence": 85
}
\`\`\`

### GET /api/health

Health check endpoint.

**Response:**
\`\`\`json
{
"status": "Server is running",
"timestamp": "2023-12-07T10:30:00.000Z",
"port": 3001
}
\`\`\`

## Environment Variables

Create a `.env` file in the server directory:

\`\`\`
PORT=3001
ASSEMBLY_AI_API_KEY=your_key_here
NODE_ENV=development
\`\`\`

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Production

\`\`\`bash
npm install
npm start
