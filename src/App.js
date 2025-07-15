import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useTranslation } from './hooks/useTranslation';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import LanguageSelector from './components/LanguageSelector';
import './styles/globals.css';

// ErrorAlert component for displaying user-friendly error messages
const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;
  return (
    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded mb-4 flex items-center justify-between" role="alert">
      <span>{error}</span>
      <button onClick={onClose} aria-label="Close error message" className="ml-4 text-red-600 hover:text-red-800">&times;</button>
    </div>
  );
};

const App = () => {
  const { todos, addTodo, toggleComplete, deleteTodo, updateTodoText, revertToOriginal } = useTodos();
  const { isTranslating, selectedLanguage, setSelectedLanguage, translateText } = useTranslation();
  // State for translation error
  const [translationError, setTranslationError] = useState(null);

  const handleTranslate = async (todoId, originalText) => {
    if (selectedLanguage === 'en') return;
    try {
      const translatedText = await translateText(originalText, selectedLanguage);
      updateTodoText(todoId, translatedText, selectedLanguage);
      setTranslationError(null);
    } catch (error) {
      setTranslationError('Translation failed, please try again.');
    }
  };

  const handleTranslateAll = async () => {
    if (selectedLanguage === 'en') return;
    try {
      for (const todo of todos) {
        if (!todo.completed) {
          await handleTranslate(todo.id, todo.originalText);
        }
      }
      setTranslationError(null);
    } catch (error) {
      setTranslationError('Translation failed, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Todo App</h1>
          <p className="text-gray-600">Manage your tasks with multilingual support</p>
        </div>

        {/* Error Alert */}
        <ErrorAlert error={translationError} onClose={() => setTranslationError(null)} />

        {/* Language selector and translate all button */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              disabled={isTranslating}
            />
            <button
              onClick={handleTranslateAll}
              disabled={isTranslating || selectedLanguage === 'en' || todos.length === 0}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              aria-label="Translate all todos"
            >
              {isTranslating ? 'Translating...' : 'Translate All'}
            </button>
          </div>
        </div>

        {/* Add todo form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Todo list */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onTranslate={handleTranslate}
            onRevert={revertToOriginal}
            isTranslating={isTranslating}
          />
        </div>
      </div>
    </div>
  );
};

export default App;