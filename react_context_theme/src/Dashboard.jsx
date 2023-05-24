import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const Dashboard = () => {
    const [theme,setTheme] = useContext(ThemeContext)
  return (
    <div className='container' style={theme === 'light'? {background: '#ffe6e6'} : {background: '#333'}}>
        <div className='header' style={theme === 'light'? {background: '#cbc8c8',color: '#111'} : {background: '#111',color: '#eee'}}>
            <h1>Dashboard</h1>
        </div>

        <button className='theme_btn' 
        style={theme === 'light'? {background: '#2196f3',color: '#111'} : {background: '#111',color: '#eee'}}
        onClick={e=> theme === 'light' ? setTheme('dark') : setTheme('light')}>
            Toggle Theme
        </button>
    </div>
  )
}

export default Dashboard