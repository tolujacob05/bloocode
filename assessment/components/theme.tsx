import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = storedTheme || (prefersDarkMode ? "dark" : "light");

    setIsDarkMode(defaultTheme === "dark");
    document.documentElement.classList.toggle("dark", defaultTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Persist the user's preference
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={"ghost"}
      className="border-muted-foreground" // Class remains the same in both modes
    >
      <Icon
        icon={isDarkMode ? "fa6-solid:moon" : "iconamoon:mode-light-bold"}
        width="24"
        height="24"
        className={isDarkMode ? "text-white" : "text-black"} // Change icon color based on the theme
      />
    </Button>
  );
};

export default ThemeSwitcher;
