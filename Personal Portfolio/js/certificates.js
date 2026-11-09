document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(
        "[data-certificate-filter]"
    );

    const certificateGrid = document.getElementById("certificateGrid");
    const emptyState = document.getElementById("certificateEmptyState");
    const certificateCount = document.getElementById("certificateCount");

    if (!certificateGrid || !emptyState || !certificateCount) {
        return;
    }

    const certificateCards = Array.from(
        certificateGrid.querySelectorAll("[data-certificate-category]")
    );

    function filterCertificates(category) {
        let visibleCount = 0;

        certificateCards.forEach((card) => {
            const cardCategory = card.dataset.certificateCategory;

            const shouldShow =
                category === "all" || cardCategory === category;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        emptyState.hidden = visibleCount > 0;

        if (certificateCards.length === 0) {
            certificateCount.textContent = "Certificates will be added soon.";
        } else {
            certificateCount.textContent =
                `${visibleCount} ${visibleCount === 1 ? "certificate" : "certificates"} found.`;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.certificateFilter;

            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            filterCertificates(selectedCategory);
        });
    });

    filterCertificates("all");
});