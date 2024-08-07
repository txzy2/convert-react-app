import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext({
  isOn: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isOn, setIsOn] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isOn);
    localStorage.setItem('theme', isOn ? 'dark' : 'light');
  }, [isOn]);

  const toggleTheme = () => {
    setIsOn(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{isOn, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
