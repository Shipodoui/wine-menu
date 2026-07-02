const views = document.querySelectorAll(".view");
const nav = document.querySelector("nav");

/* show a view */
function showView(id) {
    views.forEach(v => v.classList.remove("active"));

    const el = document.getElementById(id);
    if (el) el.classList.add("active");
}

/* detect overflow */
function checkNavOverflow() {
    if (!nav) return;

    const hasOverflow = nav.scrollWidth > nav.clientWidth;

    if (hasOverflow) {
        nav.classList.add("is-overflow");
    } else {
        nav.classList.remove("is-overflow");
    }
}

/* navigation */
function navigate(id, addToHistory = true) {

    showView(id);

    if (addToHistory) {
        history.pushState({ page: id }, "", "");
    }

    // important: re-check after DOM/layout changes
    requestAnimationFrame(checkNavOverflow);
}

/* back/forward */
window.addEventListener("popstate", (event) => {
    const id = event.state?.page || "vins";
    showView(id);

    requestAnimationFrame(checkNavOverflow);
});

/* initial load */
window.addEventListener("DOMContentLoaded", () => {
    navigate("vins", false);

    // initial check
    requestAnimationFrame(checkNavOverflow);

    // keep it responsive
    window.addEventListener("resize", checkNavOverflow);
});