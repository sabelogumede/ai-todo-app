# AI Todo App

A web-based task management application with multilingual support, built using React and AI-assisted development practices.

## Features

- **Add Todo Items:** Quickly add new tasks with instant feedback and input validation.
- **Mark as Complete:** Toggle completion status with clear visual feedback.
- **Display Todo List:** View all tasks in a clean, responsive list.
- **Language Selection:** Choose from multiple languages (English, Spanish, French, German, Chinese, Japanese, etc.).
- **Translate Todos:** Translate individual or all todo items using the Google Translate API. Option to revert to original text.
- **Local Storage:** Todos are saved in your browser for persistence.
- **Accessible UI:** Keyboard navigation, semantic HTML, and ARIA labels for improved accessibility.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Google Cloud Translate API key (for translation feature)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd ai-todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add your API key to a `.env` file in the project root:
   ```env
   REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage
- Add a new todo using the input field and "Add" button.
- Mark todos as complete by clicking the checkbox.
- Select a language from the dropdown to translate todos.
- Click "Translate" on a todo or "Translate All" to translate all incomplete todos.
- Click "Revert" to restore the original text.

## Accessibility
- All interactive elements (buttons, inputs) are keyboard accessible.
- ARIA labels and roles are used for better screen reader support.
- Icons include `aria-label` attributes for clarity.

## Deployment
- Deploy on Vercel for best results. Set your API key in Vercel's environment variables.

## Development
- Built with React, Tailwind CSS, and AI-assisted code generation.
- Code is modular, with hooks and services for state and API logic.

## License
MIT
