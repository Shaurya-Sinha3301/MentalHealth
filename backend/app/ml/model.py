# train_model.py (run this just once)
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

texts = ["I feel happy today", "I'm so sad and anxious", "Life is great", "This sucks"]
labels = ["positive", "negative", "positive", "negative"]

model = Pipeline([
    ("vect", CountVectorizer()),
    ("clf", MultinomialNB())
])

model.fit(texts, labels)
joblib.dump(model, "sentiment_model.pkl")
