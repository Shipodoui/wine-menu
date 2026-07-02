const views = document.querySelectorAll(".view");

/* show a view */
function showView(id) {
    views.forEach(v => v.classList.remove("active"));

    const el = document.getElementById(id);
    if (el) el.classList.add("active");
}

/* main navigation */
function navigate(id, addToHistory = true) {

    showView(id);

    if (addToHistory) {
        history.pushState({ page: id }, "", "/" + id);
    }
}

/* back/forward support */
window.addEventListener("popstate", (event) => {
    const id = event.state?.page || "starters";
    showView(id);
});

/* initial load */
window.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname.replace("/", "");

    const initial = path || "starters";

    navigate(initial, false);
});