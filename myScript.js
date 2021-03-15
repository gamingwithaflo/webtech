window.addEventListener("load", registerEvents, false);

function toggleDisplay(element) {
 let elementContent = document.getElementsByClassName("menu-content-option")[0];
 elementContent.classList.toggle("menu-content-option__show");
 window.scrollTo(0,document.body.scrollHeight);
}

function registerEvents() {
    let elementName = document.getElementsByClassName("menu-button")[0];
    elementName.addEventListener("click",toggleDisplay, false);
}
