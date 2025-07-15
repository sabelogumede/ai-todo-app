import React from 'react';
import TodoItem from './TodoItem';
import logo from '../logo.svg'; // Import the logo SVG

// TodoList component renders the list of todos using semantic HTML
const TodoList = ({ todos, onToggle, onDelete, onTranslate, onRevert, isTranslating }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <img src={logo} alt="App Logo" className="mx-auto mb-4 w-16 h-16" />
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="space-y-4">
      {/* Logo at the top of the todo list */}
      <div className="flex flex-col items-center mb-2">
        <img src={logo} alt="App Logo" className="w-16 h-16 mb-2" />
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Total: {todos.length}</span>
        <span>Completed: {completedCount}</span>
      </div>
      {/* Use semantic HTML for the todo list */}
      <ul className="space-y-3" aria-label="Todo list">
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onTranslate={onTranslate}
              onRevert={onRevert}
              isTranslating={isTranslating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;