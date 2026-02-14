import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Admin/Components/Themes/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
<ThemeProvider>

  <App />
</ThemeProvider>

)
