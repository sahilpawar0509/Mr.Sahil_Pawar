document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (!contactForm || !formStatus) {
        return;
    }

    // Your email address
    const recipient = "sahilvpawar1@gmail.com";

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        // Validate form
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Get form values
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Check empty fields
        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please complete all fields.";
            return;
        }

        // Prepare email content
        const emailBody = [
            "Hello Sahil,",
            "",
            "You have received a new message through your portfolio website.",
            "",
            "Name: " + name,
            "Email: " + email,
            "",
            "Message:",
            message,
            "",
            "Regards,",
            name
        ].join("\n");

        // Generate Gmail Compose URL
        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" + encodeURIComponent(recipient) +
            "&su=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        // Update status
        formStatus.textContent = "Opening Gmail...";

        // Open Gmail in a new tab
        const gmailWindow = window.open(
            gmailURL,
            "_blank"
        );

        // Fallback if popup is blocked
        if (!gmailWindow) {
            formStatus.innerHTML =
                'Gmail could not open automatically. ' +
                '<a href="' + gmailURL + '" target="_blank" rel="noopener noreferrer">Click here to open Gmail</a>.';
        }

    });

});