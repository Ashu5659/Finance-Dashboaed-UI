import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/Themee.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
  <BrowserRouter>
  <App></App>
  </BrowserRouter>
  </ThemeProvider>
);
