/**
 * Translation service - handles all translation logic
 * This can be easily replaced with a real API service
 */

/**
 * TranslationService class to manage text translation using Google Translate API
 * Implements caching to optimize API usage
 */
class TranslationService {
  constructor() {
    // Load Google Translate API key from environment variable for secure configuration
    this.apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    // Define base URL for Google Translate API v2
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    // Initialize in-memory cache using Map to store previously translated texts
    this.cache = new Map();
  }

  /**
   * Creates a unique cache key for a translation request
   * @param {string} text - The text to translate
   * @param {string} targetLanguage - The target language code (e.g., 'es')
   * @returns {string} A unique key combining text and target language
   */
  getCacheKey(text, targetLanguage) {
    return `${text}:${targetLanguage}`;
  }

  /**
   * Translates text to the specified target language
   * @param {string} text - The text to translate
   * @param {string} targetLanguage - The target language code
   * @param {string} [sourceLanguage='en'] - The source language code (defaults to English)
   * @returns {Promise<string>} The translated text
   * @throws {Error} If the API key is missing or the API request fails
   */
  async translateText(text, targetLanguage, sourceLanguage = 'en') {
    // Return original text if source and target languages are the same
    if (targetLanguage === sourceLanguage) {
      return text;
    }

    // Generate cache key and check if translation exists in cache
    const cacheKey = this.getCacheKey(text, targetLanguage);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Verify API key availability
    if (!this.apiKey) {
      throw new Error('Google Translate API key is not configured. Please add REACT_APP_GOOGLE_TRANSLATE_API_KEY to your environment variables.');
    }

    try {
      // Make POST request to Google Translate API with query parameters
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text, // The text to translate
          source: sourceLanguage, // Source language code
          target: targetLanguage, // Target language code
          format: 'text' // Ensure plain text format
        })
      });

      // Check for API errors and throw with detailed message
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Translation API error: ${response.status}`);
      }

      // Parse response and extract translated text
      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;

      // Store the translated text in cache for future use
      this.cache.set(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      // Log error for debugging and rethrow to be handled by caller
      console.error('Translation error:', error);
      throw error;
    }
  }
}

// Create a singleton instance of TranslationService to ensure a single point of access
const translationService = new TranslationService();

/**
 * Exported function to translate text using the singleton TranslationService
 * @param {string} text - The text to translate
 * @param {string} targetLanguage - The target language code
 * @returns {Promise<string>} The translated text or a fallback with language code
 */
export const translateText = async (text, targetLanguage) => {
  try {
    // Attempt translation using the singleton service
    return await translationService.translateText(text, targetLanguage);
  } catch (error) {
    // Fallback: return original text prefixed with target language code if translation fails
    return `[${targetLanguage.toUpperCase()}] ${text}`;
  }
};

/**
 * Array of supported languages for the application
 * Each object contains a language code and its display name
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' }
];