import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("class", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const isDark = theme === "dark";

    return { theme, toggleTheme, isDark };
};

export default useTheme;
