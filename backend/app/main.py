from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal, List, Optional
from datetime import datetime
import json
import os
import random

app = FastAPI(title="MentalMind API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

LOG_PATH = "logs/journal.json"
CHAT_LOG_PATH = "logs/chat.json"
os.makedirs("logs", exist_ok=True)

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "MentalMind API is running"}

# ==== MODELS ====
class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    sentiment: Literal['positive', 'neutral', 'negative']
    confidence: float
    mood: Literal['happy', 'neutral', 'sad', 'angry', 'excited', 'anxious', 'calm']
    timestamp: str
    recommendation: str
    quote: Optional[str] = None
    activity: Optional[str] = None
    song_suggestion: Optional[str] = None

class JournalEntry(BaseModel):
    text: str
    mood: Literal['happy', 'neutral', 'sad', 'angry', 'excited', 'anxious', 'calm']
    timestamp: str

class ChatMessage(BaseModel):
    message: str
    is_user: bool
    timestamp: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# ==== ENHANCED LOGIC ====
def analyze_sentiment_and_mood(text):
    # Enhanced mood detection based on keywords
    text_lower = text.lower()
    
    # Mood keywords
    happy_words = ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'love', 'blessed']
    sad_words = ['sad', 'depressed', 'down', 'upset', 'crying', 'hurt', 'lonely', 'empty']
    angry_words = ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated']
    anxious_words = ['anxious', 'worried', 'nervous', 'stressed', 'panic', 'overwhelmed']
    calm_words = ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content']
    excited_words = ['excited', 'thrilled', 'pumped', 'energetic', 'enthusiastic']
    
    # Count mood indicators
    mood_scores = {
        'happy': sum(1 for word in happy_words if word in text_lower),
        'sad': sum(1 for word in sad_words if word in text_lower),
        'angry': sum(1 for word in angry_words if word in text_lower),
        'anxious': sum(1 for word in anxious_words if word in text_lower),
        'calm': sum(1 for word in calm_words if word in text_lower),
        'excited': sum(1 for word in excited_words if word in text_lower)
    }
    
    # Determine primary mood
    primary_mood = max(mood_scores, key=mood_scores.get) if max(mood_scores.values()) > 0 else 'neutral'
    
    # Determine sentiment
    positive_score = mood_scores['happy'] + mood_scores['excited'] + mood_scores['calm']
    negative_score = mood_scores['sad'] + mood_scores['angry'] + mood_scores['anxious']
    
    if positive_score > negative_score:
        sentiment = 'positive'
    elif negative_score > positive_score:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'
    
    confidence = min(0.95, 0.7 + (max(mood_scores.values()) * 0.1))
    
    return sentiment, primary_mood, confidence

def get_personalized_content(mood):
    content = {
        "happy": {
            "recommendation": "You're radiating positivity! Share this energy with others and keep doing what makes you happy. 😊",
            "quote": "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
            "activity": "Write down 3 things you're grateful for today, or call someone to share your joy!",
            "song_suggestion": "Happy by Pharrell Williams"
        },
        "excited": {
            "recommendation": "Channel that excitement into something creative or productive! Your energy is contagious. ⚡",
            "quote": "The way to get started is to quit talking and begin doing. - Walt Disney",
            "activity": "Start that project you've been thinking about, or plan an adventure!",
            "song_suggestion": "Can't Stop the Feeling by Justin Timberlake"
        },
        "calm": {
            "recommendation": "Embrace this peaceful moment. Use this clarity to reflect and set intentions. 🧘‍♀️",
            "quote": "Peace comes from within. Do not seek it without. - Buddha",
            "activity": "Practice mindful breathing or enjoy a cup of tea in silence.",
            "song_suggestion": "Weightless by Marconi Union"
        },
        "sad": {
            "recommendation": "It's okay to feel sad. Allow yourself to process these emotions. Reach out to someone you trust. 💙",
            "quote": "The wound is the place where the Light enters you. - Rumi",
            "activity": "Take a warm bath, listen to soothing music, or write in your journal.",
            "song_suggestion": "Mad World by Gary Jules"
        },
        "angry": {
            "recommendation": "Take deep breaths. Your feelings are valid. Try physical activity or creative expression to release tension. 🔥",
            "quote": "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else. - Buddha",
            "activity": "Go for a run, punch a pillow, or do some intense exercise to release energy.",
            "song_suggestion": "Breathe Me by Sia"
        },
        "anxious": {
            "recommendation": "Ground yourself in the present moment. Try the 5-4-3-2-1 technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. 🌱",
            "quote": "You have been assigned this mountain to show others it can be moved. - Mel Robbins",
            "activity": "Practice box breathing: inhale for 4, hold for 4, exhale for 4, hold for 4.",
            "song_suggestion": "Anxiety by Julia Michaels"
        },
        "neutral": {
            "recommendation": "Sometimes neutral is exactly what we need. Take this moment to check in with yourself. 🤍",
            "quote": "In the middle of difficulty lies opportunity. - Albert Einstein",
            "activity": "Take a mindful walk or try a new hobby that interests you.",
            "song_suggestion": "Somewhere Only We Know by Keane"
        }
    }
    
    return content.get(mood, content["neutral"])

def generate_chat_response(message):
    """Simple chatbot responses for mental health support"""
    message_lower = message.lower()
    
    # Greeting responses
    if any(word in message_lower for word in ['hello', 'hi', 'hey', 'good morning', 'good evening']):
        return random.choice([
            "Hello! I'm here to listen and support you. How are you feeling today?",
            "Hi there! I'm glad you're here. What's on your mind?",
            "Hey! I'm your mental wellness companion. How can I help you today?"
        ])
    
    # Feeling-based responses
    if any(word in message_lower for word in ['sad', 'depressed', 'down', 'upset']):
        return random.choice([
            "I hear that you're feeling sad. It's completely normal to have these feelings. Would you like to talk about what's making you feel this way?",
            "Sadness is a natural emotion, and it's okay to sit with it. Remember that this feeling is temporary. What usually helps you feel better?",
            "I'm sorry you're going through a tough time. Your feelings are valid. Have you tried any coping strategies that worked for you before?"
        ])
    
    if any(word in message_lower for word in ['anxious', 'worried', 'stressed', 'nervous']):
        return random.choice([
            "Anxiety can feel overwhelming, but you're not alone. Try taking slow, deep breaths. What's causing you to feel anxious right now?",
            "I understand you're feeling anxious. Let's try grounding together: Can you name 5 things you can see around you right now?",
            "Stress and worry are tough to handle. Remember that you've overcome challenges before. What's one small thing you can do right now to feel more calm?"
        ])
    
    if any(word in message_lower for word in ['angry', 'mad', 'frustrated', 'annoyed']):
        return random.choice([
            "It sounds like you're feeling really frustrated. Anger is a valid emotion. What's triggering these feelings?",
            "I can sense your anger. It's okay to feel this way. Have you tried any physical activities to help release this energy?",
            "Frustration can be really intense. Take a moment to breathe. What would help you feel more balanced right now?"
        ])
    
    if any(word in message_lower for word in ['happy', 'great', 'amazing', 'wonderful']):
        return random.choice([
            "That's wonderful to hear! I'm so glad you're feeling happy. What's bringing you joy today?",
            "Your positive energy is beautiful! It's great that you're in a good space. How can you carry this feeling forward?",
            "I love hearing that you're doing well! Happiness is precious. What's been the highlight of your day?"
        ])
    
    # Help/support requests
    if any(word in message_lower for word in ['help', 'support', 'advice', 'what should i do']):
        return random.choice([
            "I'm here to help! Can you tell me more about what you're going through? Sometimes talking it out can provide clarity.",
            "Of course I want to support you. What specific area would you like guidance on? Your feelings, a situation, or coping strategies?",
            "I'm glad you reached out. You've already taken a brave step by asking for help. What's the most pressing thing on your mind right now?"
        ])
    
    # Default responses
    return random.choice([
        "Thank you for sharing that with me. How does talking about this make you feel?",
        "I appreciate you opening up. What would be most helpful for you right now?",
        "It sounds like you have a lot on your mind. Would you like to explore these feelings further?",
        "I'm here to listen without judgment. What else would you like to share?",
        "Your thoughts and feelings matter. How can I best support you today?"
    ])

# ==== ANALYZE ====
@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_text(data: AnalyzeRequest):
    if not data.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")

    sentiment, mood, confidence = analyze_sentiment_and_mood(data.text)
    timestamp = datetime.now().isoformat()
    content = get_personalized_content(mood)

    return AnalyzeResponse(
        sentiment=sentiment,
        confidence=confidence,
        mood=mood,
        timestamp=timestamp,
        recommendation=content["recommendation"],
        quote=content["quote"],
        activity=content["activity"],
        song_suggestion=content["song_suggestion"]
    )

# ==== JOURNAL POST ====
@app.post("/journal")
def add_journal(entry: JournalEntry):
    journal_data = []
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, "r") as f:
            journal_data = json.load(f)

    journal_data.append(entry.dict())

    with open(LOG_PATH, "w") as f:
        json.dump(journal_data, f, indent=2)

    return {"message": "Journal entry saved ✅"}

# ==== LOG GET ====
@app.get("/logs", response_model=List[JournalEntry])
def get_logs():
    if not os.path.exists(LOG_PATH):
        return []

    with open(LOG_PATH, "r") as f:
        return json.load(f)

# ==== CHATBOT ====
@app.post("/chat", response_model=ChatResponse)
def chat_with_bot(data: ChatRequest):
    if not data.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    timestamp = datetime.now().isoformat()
    response = generate_chat_response(data.message)
    
    # Save chat history
    chat_data = []
    if os.path.exists(CHAT_LOG_PATH):
        with open(CHAT_LOG_PATH, "r") as f:
            chat_data = json.load(f)
    
    # Add user message and bot response
    chat_data.extend([
        {"message": data.message, "is_user": True, "timestamp": timestamp},
        {"message": response, "is_user": False, "timestamp": timestamp}
    ])
    
    with open(CHAT_LOG_PATH, "w") as f:
        json.dump(chat_data, f, indent=2)
    
    return ChatResponse(response=response, timestamp=timestamp)

@app.get("/chat/history", response_model=List[ChatMessage])
def get_chat_history():
    if not os.path.exists(CHAT_LOG_PATH):
        return []
    
    with open(CHAT_LOG_PATH, "r") as f:
        return json.load(f)

@app.delete("/chat/history")
def clear_chat_history():
    if os.path.exists(CHAT_LOG_PATH):
        os.remove(CHAT_LOG_PATH)
    return {"message": "Chat history cleared"}