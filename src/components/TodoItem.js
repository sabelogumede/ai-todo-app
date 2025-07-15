import React from 'react';
import { Check, X } from 'lucide-react';

// TodoItem component displays a single todo item with actions
const TodoItem = ({ todo, onToggle, onDelete, onTranslate, onRevert, isTranslating }) => {
  // Handler for translating the todo item
  const handleTranslate = async () => {
    await onTranslate(todo.id, todo.originalText);
  };

  // Handler for reverting the todo item to its original text
  const handleRevert = () => {
    onRevert(todo.id);
  };

  return (
    <div className={`p-4 border border-gray-200 rounded-lg bg-white shadow-sm ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center gap-3">
        {/* Toggle completion status */}
        <button
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <Check size={12} aria-label="Completed" />}
        </button>
        {/* Display todo text and original if translated */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.text}
          </p>
          {todo.language !== 'en' && (
            <p className="text-xs text-gray-400 mt-1">
              Original: {todo.originalText}
            </p>
          )}
        </div>
        {/* Action buttons: revert, translate, delete */}
        <div className="flex items-center gap-2">
          {todo.language !== 'en' && (
            <button
              onClick={handleRevert}
              aria-label="Revert to original text"
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
            >
              Revert
            </button>
          )}
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            aria-label="Translate todo"
            className="text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 py-1 rounded disabled:opacity-50"
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
            className="text-red-500 hover:text-red-700 p-1"
          >
            <X size={14} aria-label="Delete icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;