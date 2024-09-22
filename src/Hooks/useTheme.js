import { useContext } from "react"
import { ThemeContext } from "../Contexts/ThemeProvider"

const useTheme = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    
  return {darkMode, toggleDarkMode}
}

export default useTheme