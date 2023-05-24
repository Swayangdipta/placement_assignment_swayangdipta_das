import React from 'react'
import './App.css'
import {ThemeProvider} from './ThemeContext'
import Dashboard from './Dashboard'
const App = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App