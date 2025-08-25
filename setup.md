# MentalMind Setup Guide

## Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend will run on `http://localhost:8000`

### 2. Frontend Setup
```bash
cd mentalmind-frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

✅ **Journal Entry Analysis** - Write your thoughts and get advanced sentiment analysis
✅ **Voice Input** - Speak your thoughts using voice recognition
✅ **Mental Health Chatbot** - Chat with an AI companion for emotional support
✅ **Enhanced Mood Tracking** - Track 7 different emotional states (happy, sad, angry, excited, anxious, calm, neutral)
✅ **Personalized Content** - Get quotes, activities, and song suggestions based on your mood
✅ **Modern UI** - Clean, responsive design inspired by modern healthcare apps
✅ **Real-time Analysis** - Instant feedback with confidence scores
✅ **Chat History** - Persistent conversations with your AI companion
✅ **Dark Mode Support** - Automatic theme switching

## API Endpoints

- `POST /analyze` - Analyze text sentiment with enhanced mood detection
- `POST /journal` - Save journal entry
- `GET /logs` - Retrieve journal history
- `POST /chat` - Send message to mental health chatbot
- `GET /chat/history` - Retrieve chat conversation history
- `DELETE /chat/history` - Clear chat history

## Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide React icons
- Web Speech API for voice input
- Modern glassmorphism design

**Backend:**
- FastAPI
- Python
- Pydantic for data validation
- JSON file storage (easily replaceable with database)

## Environment Variables

Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Notes

- Enhanced sentiment analysis with keyword-based mood detection
- Journal entries stored in `backend/logs/journal.json`
- Chat conversations stored in `backend/logs/chat.json`
- Voice input requires HTTPS in production (works on localhost)
- Frontend includes proper error handling and loading states
- Responsive design with organic background shapes
- Glassmorphism design elements
- Dark mode support included
- CORS enabled for frontend-backend communication