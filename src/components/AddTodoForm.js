import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// AddTodoForm component allows users to add new todo items
const AddTodoForm = ({ onAdd }) => {
  // State for the input value
  const [inputValue, setInputValue] = useState('');

  // Handles form submission for adding a todo
  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  // Handles Enter key press to submit the form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
      >
        <Plus size={16} />
        Add
      </button>
    </div>
  );
};

export default AddTodoForm;