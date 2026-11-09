document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");
    const projectCount = document.getElementById("projectCount");

    function filterProjects(category) {

        let visibleCount = 0;

        projectCards.forEach(function (card) {

            const cardCategory = card.getAttribute("data-category");

            if (category === "all" || cardCategory === category) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        if (projectCount) {
            projectCount.textContent =
                `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
        }
    }

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            filterProjects(category);

        });

    });

    filterProjects("all");

});