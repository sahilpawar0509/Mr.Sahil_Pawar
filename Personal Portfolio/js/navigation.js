
/* =========================================
   SAHIL PAWAR — PORTFOLIO
   MOBILE GLASS NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("mobileMenuToggle");
    const navigation = document.getElementById("primaryNavigation");

    if (!menuToggle || !navigation) {
        return;
    }


    /* =====================================
       1. INITIAL MENU STATE
    ===================================== */

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "primaryNavigation");
    menuToggle.setAttribute("aria-label", "Open navigation menu");


    /* =====================================
       2. CLOSE MENU
    ===================================== */

    function closeMenu(returnFocus = false) {

        navigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (returnFocus) {
            menuToggle.focus();
        }

    }


    /* =====================================
       3. OPEN MENU
    ===================================== */

    function openMenu() {

        navigation.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    /* =====================================
       4. TOGGLE MENU
    ===================================== */

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================
       5. CLOSE AFTER CLICKING A LINK
    ===================================== */

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================
       6. CLOSE WHEN CLICKING OUTSIDE
    ===================================== */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeMenu();

        }

    });


    /* =====================================
       7. CLOSE WITH ESCAPE KEY
    ===================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu(true);
            }

        }

    });


    /* =====================================
       8. RESET MENU ON DESKTOP
    ===================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });


    /* =====================================
       9. PREVENT STALE MENU STATE
    ===================================== */

    window.addEventListener("pageshow", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });

});
