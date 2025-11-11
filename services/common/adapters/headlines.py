import datetime as dt
import requests
from typing import List, Dict

def fetch_headlines_cryptopanic(api_key: str = None) -> List[Dict]:
    """Fetch real headlines from CryptoPanic"""
    if not api_key:
        return fetch_headlines_mock()
    
    try:
        url = "https://cryptopanic.com/api/v1/posts/"
        params = {
            'auth_token': api_key,
            'public': 'true',
            'kind': 'news'
        }
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        
        headlines = []
        for post in data.get('results', [])[:10]:  # Get latest 10
            headlines.append({
                "ts": dt.datetime.fromisoformat(post['created_at'].replace('Z', '+00:00')),
                "source": "CryptoPanic",
                "title": post['title'],
                "url": post['url'],
                "keywords": extract_keywords(post['title'])
            })
        return headlines
        
    except Exception as e:
        print(f"CryptoPanic headlines error: {e}")
        return fetch_headlines_mock()

def extract_keywords(title: str) -> List[str]:
    """Extract relevant keywords from title"""
    keywords = []
    crypto_terms = ['bitcoin', 'btc', 'ethereum', 'eth', 'solana', 'sol', 
                   'funding', 'liquidat', 'margin', 'oi', 'open interest',
                   'crash', 'rally', 'surge', 'dump']
    
    title_lower = title.lower()
    for term in crypto_terms:
        if term in title_lower:
            keywords.append(term)
    return keywords

def fetch_headlines_mock():
    """Fallback mock headlines"""
    now = dt.datetime.now(dt.timezone.utc)
    return [{
        "ts": now,
        "source": "mock",
        "title": "Market shows mixed signals as OI surges and funding turns negative",
        "url": "https://example.com",
        "keywords": ["open interest", "funding"]
    }]

def fetch_headlines(api_key: str = None) -> List[Dict]:
    """Main headlines function with real data fallback"""
    try:
        real_headlines = fetch_headlines_cryptopanic(api_key)
        if real_headlines:
            return real_headlines
    except Exception as e:
        print(f"Real headlines failed, using mock: {e}")
    
    return fetch_headlines_mock()