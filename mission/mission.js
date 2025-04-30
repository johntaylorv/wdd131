const themeSelector = document.getElementById("theme-selector");
const logoImage = document.querySelector("footer img");

function changeTheme() {
    if (themeSelector.value === "dark") {
        document.body.classList.add("dark");
        logoImage.src = "byui-logo-darkmode.png"; // Dark theme logo
    } else {
        document.body.classList.remove("dark");
        logoImage.src = "byui-logo.webp"; // Light theme logo
    }
}

themeSelector.addEventListener("change", changeTheme);
