window.addEventListener("load", registerEvents, false);

function toggleDisplay() {
 let content = document.getElementById("menu-conetent-option-notable-features");
 content.classList.toggle("menu-content-option__show");
}

function registerEvents() {
 document.getElementById("menu-notable-features").addEventListener("click", toggleDisplay, false);
}
