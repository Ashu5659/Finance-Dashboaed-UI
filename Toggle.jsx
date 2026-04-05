import React, { useContext } from 'react'
import { Themee } from '../context/Themee'


export default function Toggle() {

    const {theme, toggleTheme} = useContext(Themee);
   
  return (
    <div>
        <h2>Current Theme: {theme}</h2>
        <button onClick={toggleTheme}>Change Theme : 
            {theme === 'light'?'Dark Mode':'Light Mode'}
        </button>
    </div>
  );
}
