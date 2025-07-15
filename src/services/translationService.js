/**
 * Translation service - handles all translation logic
 * This can be easily replaced with a real API service
 */
// Translation service using Google Translate API
class TranslationService {
  constructor() {
    // API key for Google Translate, loaded from environment variable
    this.apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    // Base URL for Google Translate API
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    // Simple in-memory cache to reduce API calls
    this.cache = new Map();
  }

  // Create a unique cache key for each translation request
  getCacheKey(text, targetLanguage) {
    return `${text}:${targetLanguage}`;
  }

  // Main translation method: translates text to the target language
  async translateText(text, targetLanguage, sourceLanguage = 'en') {
    // Return original text if translating to same language
    if (targetLanguage === sourceLanguage) {
      return text;
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, targetLanguage);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check if API key is available
    if (!this.apiKey) {
      throw new Error('Google Translate API key is not configured. Please add REACT_APP_GOOGLE_TRANSLATE_API_KEY to your environment variables.');
    }

    try {
      // Make POST request to Google Translate API
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text'
        })
      });

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Translation API error: ${response.status}`);
      }

      // Parse and cache the translated text
      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      // Cache the result
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }
}

// Singleton instance of the translation service
const translationService = new TranslationService();

// Exported function to translate text using the singleton service
export const translateText = async (text, targetLanguage) => {
  try {
    return await translationService.translateText(text, targetLanguage);
  } catch (error) {
    // Fallback: return original text with language code if translation fails
    return `[${targetLanguage.toUpperCase()}] ${text}`;
  }
};

// Supported languages for translation
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' }
];