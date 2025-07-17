import React from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/translationService';

// Define the LanguageSelector functional component, accepting three props:
// - selectedLanguage: The currently selected language code (string)
// - onLanguageChange: Callback function to handle language change events
// - disabled: Boolean to enable/disable the select element
const LanguageSelector = ({ selectedLanguage, onLanguageChange, disabled }) => {
  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-gray-500" />
      <select
      // Set the current value of the select to the selectedLanguage prop
        value={selectedLanguage}
        // Call onLanguageChange with the selected value when the user changes the selection
        onChange={(e) => onLanguageChange(e.target.value)}
        // Disable the select element if the disabled prop is true
        disabled={disabled}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >{/* Map over SUPPORTED_LANGUAGES array to create an option for each language */}
        {SUPPORTED_LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;