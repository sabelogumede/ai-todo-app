import { useState, useEffect } from 'react';

// Custom hook for managing todo items and their state
export const useTodos = () => {
  // State for the list of todos
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo item
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      originalText: text,
      completed: false,
      createdAt: new Date().toISOString(),
      language: 'en'
    };
    setTodos(prev => [...prev, newTodo]);
  };

  // Toggle completion status of a todo item
  const toggleComplete = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo item
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Update the text and language of a todo item (used for translation)
  const updateTodoText = (id, newText, language) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: newText, language } : todo
    ));
  };

  // Revert a todo item to its original text and language
  const revertToOriginal = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: todo.originalText, language: 'en' } : todo
    ));
  };

  // Expose todos and CRUD operations
  return {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    updateTodoText,
    revertToOriginal
  };
};