let themeButton = document.getElementById("theme-toggle");


function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");
  
    let themeText = themeButton.querySelector(".theme-text");

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent ="NIGHT MODE";
        localStorage.setItem("biteboxTheme","dark");
    }  

 else {
        themeIcon.textContent = "☀";
        themeText.textContent ="DAY MODE";
        localStorage.setItem("biteboxTheme","light");

    }
}

function loadTheme() {
    let savedTheme = localStorage.getItem("biteboxTheme");

    /* Disable animation while loading */
    document.body.classList.add("theme-loading");

    if (savedTheme === "dark") {
       document.body.classList.add("dark-theme");
    }

else {
        document.body.classList.remove("dark-theme");
    }

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if (savedTheme === "dark") {
        if (themeIcon) {
            themeIcon.textContent ="☾";
        }

        if (themeText) {
            themeText.textContent = "NIGHT MODE";
        }
    }

    else {

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }


        if (themeText) {
            themeText.textContent = "DAY MODE";
        }
    }

    /* Allow animation again */
    setTimeout(function () {
        document.body.classList.remove("theme-loading");
    }, 50);

}
if (themeButton) {
     themeButton.addEventListener("click",function () {
            toggleTheme();
        }
    );
}
loadTheme();

// Task 3: Implement Contact Form Feedback

let contactForm = document.querySelector(".right-column form");
function showToast(message, type) {
    let toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("show");
    }, 100);

    setTimeout(function () {
        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3000);
}
let name = contactForm.querySelector('input[name="name"]');
let email = contactForm.querySelector('input[name="email"]');
let phone = contactForm.querySelector('input[name="phone"]');
let subject = contactForm.querySelector('input[name="subject"]');
let message = contactForm.querySelector('textarea[name="message"]');

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
});
if (contactForm) {
    contactForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            let name = contactForm.querySelector('input[name="name"]');
            let email = contactForm.querySelector('input[name="email"]');
            let phone = contactForm.querySelector('input[name="phone"]');

            let subject = contactForm.querySelector('input[name="subject"]');
            let message = contactForm.querySelector('textarea[name="message"]');

            if (!name.value.trim()) {
                showToast("⚠ Please enter your name.","error");
                return;
            }

            if (!email.value.trim()) {
                showToast("⚠ Please enter your email address.","error");
                return;
            }

            if (!email.validity.valid) {
                showToast("⚠ Please enter a valid email address.","error");
                return;
            }

            let phonePattern = /^[6-9]\d{9}$/;
            if (!phone.value.trim()) {
                showToast( "⚠ Please enter your phone number.","error");
                return;
            }

            if (!phonePattern.test(phone.value.trim())) {
                showToast("⚠ Please enter a valid 10-digit phone number.", 
                "error");
                return;
            }

 if (!subject.value.trim()) {
                showToast("⚠ Please enter a subject.","error");
                return;
            }
            if (!message.value.trim()) {
                showToast("⚠ Please enter your message.","error");
                return;
            }
            showToast("✓ Message sent successfully!","success");
            contactForm.reset();
        }
    );
}
