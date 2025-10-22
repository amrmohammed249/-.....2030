import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Fatal Error: The root element with ID "root" was not found in the DOM.');
    // You could render a fallback UI here if you wanted.
    document.body.innerHTML = '<div style="text-align: center; padding: 50px; font-family: sans-serif;"><h1>Application failed to load</h1><p>The root element was not found. Please check the console for details.</p></div>';
    return;
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// The script can be executed before the DOM is fully parsed.
// We need to ensure we only call renderApp() after the DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // The DOM was already ready
  renderApp();
}
