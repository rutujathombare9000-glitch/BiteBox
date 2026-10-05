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