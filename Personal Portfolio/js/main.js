
/* =========================================
   SAHIL PAWAR — PORTFOLIO
   MAIN JAVASCRIPT
   iOS GLASS THEME CONTROLLER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. COPYRIGHT YEAR
    ===================================== */

    const currentYear = new Date().getFullYear();

    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = currentYear;
    }

    document.querySelectorAll("[data-current-year]").forEach(element => {
        element.textContent = currentYear;
    });


    /* =====================================
       2. DARK / LIGHT GLASS THEME
    ===================================== */

    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    const THEME_STORAGE_KEY = "portfolio-theme";

    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    const systemTheme = window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;


    /* GET SAVED THEME */

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
        console.warn("Theme preference could not be loaded.");
    }


    /* DETERMINE INITIAL THEME */

    const initialTheme =
        savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : systemTheme && systemTheme.matches
                ? "dark"
                : "light";


    /* APPLY THEME */

    function applyTheme(theme, savePreference = true) {

        const selectedTheme =
            theme === "dark" ? "dark" : "light";

        root.setAttribute("data-theme", selectedTheme);

        root.style.colorScheme = selectedTheme;


        /* UPDATE BROWSER THEME COLOR */

        if (themeColor) {

            themeColor.setAttribute(
                "content",
                selectedTheme === "dark"
                    ? "#0c1421"
                    : "#f3f6fb"
            );

        }


        /* UPDATE THEME BUTTON */

        if (themeToggle) {

            const isDark = selectedTheme === "dark";

            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "title",
                isDark
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );

        }


        /* SAVE USER PREFERENCE */

        if (savePreference) {

            try {
                localStorage.setItem(
                    THEME_STORAGE_KEY,
                    selectedTheme
                );
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }

        }

    }


    /* APPLY INITIAL THEME */

    applyTheme(initialTheme, false);


    /* THEME TOGGLE CLICK */

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                root.getAttribute("data-theme");

            const nextTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(nextTheme);

        });

    }


    /* =====================================
       3. FOLLOW SYSTEM THEME IF NO
          USER PREFERENCE IS SAVED
    ===================================== */

    if (systemTheme) {

        systemTheme.addEventListener("change", event => {

            let currentSavedTheme = null;

            try {
                currentSavedTheme = localStorage.getItem(
                    THEME_STORAGE_KEY
                );
            } catch (error) {
                currentSavedTheme = null;
            }

            if (
                currentSavedTheme !== "dark" &&
                currentSavedTheme !== "light"
            ) {

                applyTheme(
                    event.matches ? "dark" : "light",
                    false
                );

            }

        });

    }


    /* =====================================
       4. PREVENT EMPTY LINK NAVIGATION
    ===================================== */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


    /* =====================================
       5. IMAGE FALLBACK
    ===================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-unavailable");

            image.setAttribute(
                "aria-label",
                "Image unavailable"
            );

        });

    });

});
