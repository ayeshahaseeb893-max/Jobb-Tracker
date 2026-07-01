import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;

  if (savedTheme === "true") return true;
  if (savedTheme === "false") return false;

  return true; // default dark mode
});

  // Save theme to localStorage
 useEffect(() => {
  // Save readable theme value
  localStorage.setItem("theme", darkMode ? "dark" : "light");

  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc] text-zinc-900 transition-all duration-500 ease-out dark:bg-[#09090b] dark:text-zinc-100">
        <div className="flex min-h-screen">
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="flex-1 px-10 py-8 lg:px-12">
            <Routes>
              <Route
                path="/"
                element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
              />
              <Route
                path="/applications"
                element={<Applications darkMode={darkMode} setDarkMode={setDarkMode} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;