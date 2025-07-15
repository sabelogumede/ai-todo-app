# User & Developer Guide for AI Todo App

## For Users

### Getting Started
- Visit the deployed app or run locally with `npm start` after setup.
- Add todos using the input field and "Add" button.
- Mark todos as complete by clicking the checkbox.
- Select your preferred language from the dropdown to translate todos.
- Use "Translate" on a todo or "Translate All" for all incomplete todos.
- Click "Revert" to restore the original text.

### Accessibility
- All controls are keyboard accessible.
- ARIA labels and semantic HTML are used for screen reader support.

### Data Persistence
- Todos are saved in your browser's localStorage. Clearing browser data will remove your todos.

---

## For Developers

### Project Structure
- `src/components/`: UI components (TodoList, TodoItem, AddTodoForm, etc.)
- `src/hooks/`: Custom React hooks (useTodos, useTranslation)
- `src/services/`: API and translation logic (translationService.js)
- `public/`: Static files, favicon, manifest
- `doc/`: Documentation files

### Environment Variables
- Add your Google Translate API key to `.env` as `REACT_APP_GOOGLE_TRANSLATE_API_KEY`.
- Never commit `.env` to version control (it's in `.gitignore`).

### Translation
- Uses Google Translate API via REST.
- Supported languages are defined in `SUPPORTED_LANGUAGES` in `translationService.js`.

### Styling
- Tailwind CSS is used for utility-first styling.

### Accessibility & Best Practices
- Semantic HTML, ARIA labels, and keyboard navigation are implemented.
- Code is modular and commented for clarity.

### Deployment
- Recommended: Vercel. Set environment variables in the Vercel dashboard.

### Contributing
- Fork the repo, create a feature branch, and submit a pull request.
- Ensure code is accessible, tested, and documented.

---

For more details, see the README and PRD files.

---

## Future Additions

- **Backend API:** Move data persistence from localStorage to a secure backend (Node.js/Express, Firebase, or similar) for multi-device sync and scalability.
- **User Accounts:** Add authentication (email/password, OAuth) so users can log in and access their todos from any device.
- **Collaboration:** Allow sharing todo lists with other users or teams.
- **Notifications:** Add reminders and push/email notifications for due tasks.
- **Advanced Permissions:** Support for admin/user roles and list-level permissions.
- **Mobile App:** Build a companion mobile app using React Native or similar framework.
- **Analytics:** Provide insights into productivity and usage patterns.

These features are not yet implemented but are planned for future versions to enhance functionality and user experience.
