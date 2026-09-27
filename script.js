(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");

  const setTheme = (theme) => {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";
    if (themeIcon) {
      themeIcon.classList.toggle("fa-sun", isLight);
      themeIcon.classList.toggle("fa-moon", !isLight);
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
  };

  const storedTheme = localStorage.getItem("portfolio-theme");
  setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = siteNav?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    const icon = menuToggle.querySelector("i");
    icon?.classList.toggle("fa-bars", !isOpen);
    icon?.classList.toggle("fa-xmark", Boolean(isOpen));
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".current-year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const contactForm = document.getElementById("contact-form");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject"));
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
    );
    const status = document.getElementById("form-status");
    if (status) {
      status.textContent = "Opening your email app…";
    }
    window.location.href = `mailto:sebitm74@gmail.com?subject=${subject}&body=${body}`;
  });
})();