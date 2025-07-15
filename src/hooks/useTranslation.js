import { useState } from 'react';
import { translateText as translateTextService } from '../services/translationService';

// Custom hook for managing translation state and logic
export const useTranslation = () => {
  // State for tracking if translation is in progress
  const [isTranslating, setIsTranslating] = useState(false);
  // State for the currently selected language
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Function to translate text using the translation service
  const translateText = async (text, targetLanguage) => {
    setIsTranslating(true);
    try {
      const translatedText = await translateTextService(text, targetLanguage);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    } finally {
      setIsTranslating(false);
    }
  };

  // Expose translation state and functions
  return {
    isTranslating,
    selectedLanguage,
    setSelectedLanguage,
    translateText
  };
};