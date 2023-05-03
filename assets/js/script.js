// Responsive navbar show/hide by button
let nav = document.querySelector("nav");
let navButton = document.querySelector(".ti-menu");

if (window.innerWidth <= 1023) {
    isNavShown = false;
    toggleNav(isNavShown);

    navButton.onclick = (event) => {
        isNavShown = isNavShown ? false : true;
        toggleNav(isNavShown);
        event.stopPropagation();
    };

    function toggleNav(isNavShown) {
        if (!isNavShown) nav.classList.add("hidden");
        else nav.classList.remove("hidden");
    }

    // Exit nav by touching anywhere else
    body = document.querySelector("body");

    body.onclick = () => {
        if (isNavShown) {
            isNavShown = false;
            toggleNav(isNavShown);
        }
    };
}
