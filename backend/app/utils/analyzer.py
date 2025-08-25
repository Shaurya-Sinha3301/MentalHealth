import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ml", "sentiment_model.pkl")
model = joblib.load(MODEL_PATH)

def analyze_text(text):
    if not text:
        return {"error": "Empty text"}

    # Fake preprocessing
    X = [text]
    prediction = model.predict(X)[0]
    return {"sentiment": prediction}
