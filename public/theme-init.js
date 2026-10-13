(() => {
  let theme = "crayon";
  try {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (["crayon", "original", "classic"].includes(saved)) theme = saved;
  } catch {
    // Use the light theme when browser storage is unavailable.
  }
  document.documentElement.classList.add(`theme-${theme}`);
  document.documentElement.style.colorScheme = theme === "crayon" ? "light" : "dark";
})();
