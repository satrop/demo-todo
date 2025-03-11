import { useTodo } from "@/context/TodoContext";
import Image from "next/image";
import "./Header.scss";

export function Header() {
  const { theme, toggleTheme } = useTodo();

  return (
    <header className="header">
      <h1>TODO</h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Image
          src={theme === "light" ? "/images/moon.svg" : "/images/sun.svg"}
          alt={theme === "light" ? "Dark mode" : "Light mode"}
          width={24}
          height={24}
        />
      </button>
    </header>
  );
}
