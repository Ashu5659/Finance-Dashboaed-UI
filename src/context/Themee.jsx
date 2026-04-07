import React, {Children, useState} from 'react'

export const Themee = React.createContext();

export const ThemeProvider = ({children})=>{

    const [theme, setTheme] = useState('light');

    const toggleTheme = ()=>{

        setTheme(prev=>(prev==='light'?'dark':'light'));
    }

    return(
            <Themee.Provider value={{theme,toggleTheme}}>
               {children} 
            </Themee.Provider>
        )
}
