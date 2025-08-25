# MentalMind Journal Analyzer

A modern web application that analyzes journal entries to provide insights into emotional well-being using sentiment analysis. Track your mood patterns and get personalized recommendations for better mental health.

![MentalMind](https://img.shields.io/badge/MentalMind-Journal%20Analyzer-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## ✨ Features

- 📝 **Smart Journal Analysis** - AI-powered sentiment analysis of your entries
- 😊 **Mood Tracking** - Visual mood indicators and emotional pattern recognition  
- 💡 **Personalized Recommendations** - Get tailored suggestions based on your emotional state
- 📚 **Journal History** - Browse and review all your previous entries
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- ⚡ **Real-time Analysis** - Instant feedback as you write
- 🔒 **Privacy First** - Your data stays secure and local

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd mentalmind-frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to start journaling!

## 🏗️ Project Structure

```
mentalmind/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # API endpoints
│   │   └── logs/           # Journal storage
│   └── requirements.txt
├── mentalmind-frontend/     # Next.js frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities & API
│   │   └── types/          # TypeScript types
│   └── package.json
└── setup.md                # Detailed setup guide
```

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Radix UI Components
- Lucide React Icons

**Backend:**
- FastAPI
- Python
- Pydantic
- JSON Storage (easily replaceable)

## 📱 Screenshots

The app features a clean, modern interface with:
- Intuitive journal entry form
- Real-time sentiment analysis
- Mood tracking with emojis
- Personalized recommendations
- Historical entry browsing

## 🔧 Configuration

Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 API Endpoints

- `POST /analyze` - Analyze journal entry sentiment
- `POST /journal` - Save journal entry  
- `GET /logs` - Retrieve journal history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for mental wellness and emotional awareness** 