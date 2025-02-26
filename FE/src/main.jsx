import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-tailwind/react'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
