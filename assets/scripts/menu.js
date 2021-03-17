window.addEventListener("load", registerEvents, false);

let activeTarget = "none";

function toggleDisplay() {
  let elementContent = document.getElementsByClassName(
    "menu-content-option"
  )[0];
  elementContent.classList.toggle("menu-content-option__show");
  window.scrollTo(0, document.body.scrollHeight);
}
function checkIfMenu1(event) {
  //(!! makes it a boolean, and if there is an aside which is not (display:none) it must have a "aside_title")
  let activeAside = !!document.getElementsByClassName("aside__title")[0];
  //Page already has an aside
  if (activeAside === true) {
    let openMenu2 = document.getElementsByClassName("control-menu")[0];
    let trueOrFalse = openMenu2.classList.contains("control-menu__block");
    //checks if it is blocked (not visuable) (nothing is active already)
    if (trueOrFalse) {
      openMenu2.classList.remove("control-menu__block");
      let nameClass = event.target.classList[0];
      activeTarget = nameClass.split("_")[0];
      //if it is visuable you know something is already active so you need to switch it.
    } else {
      if (activeTarget != event.target.classList[0].split("_")[0]) {
        let nameClass = event.target.classList[0];
        activeTarget = nameClass.split("_")[0];
        let parentClass = document.getElementsByClassName("control-menu")[0];
        let elements = parentClass.getElementsByTagName("h3");
        parentClass.removeChild(elements[0]);
        //If the click the same value nothing will happen.
      } else {
        return;
      }
    }
    //Page does not have an aside
  } else {
    let mainTag = document.getElementById("main");
    let asideTag = document.getElementsByTagName("aside")[0];
    let openMenu2 = document.getElementsByClassName("control-menu")[0];
    let trueOrFalse = asideTag.classList.contains("aside-none");
    //checks if it is blocked (not visuable) (nothing is active already)
    if (trueOrFalse) {
      asideTag.classList.remove("aside-none");
      let nameClass = event.target.classList[0];
      activeTarget = nameClass.split("_")[0];
      console.log(activeTarget);
      let CheckIfItIsHistory = document.getElementsByClassName(
        "this-page-has-a-tabel"
      )[0];
      if (CheckIfItIsHistory == null) {
        mainTag.classList.add("main-grid");
      } else {
        console.log("This is wrong");
      }
      openMenu2.classList.add("control-menu__show");
      //if it is visuable you know something is already active so you need to switch it.
    } else {
      //Check if it is not the same as the previous target.
      if (activeTarget != event.target.classList[0].split("_")[0]) {
        let nameClass = event.target.classList[0];
        activeTarget = nameClass.split("_")[0];
        console.log(activeTarget);
        let parentClass = document.getElementsByClassName("control-menu")[0];
        let elements = parentClass.getElementsByTagName("h3");
        parentClass.removeChild(elements[0]);
        // Same target so nothing will happen.
      } else {
        return;
      }
    }
  }
  // closing the options, creating the custom title which will happen in every case (expect same target.)
  let elementContent = document.getElementsByClassName(
    "menu-content-option"
  )[0];
  elementContent.classList.toggle("menu-content-option__show");
  let h3Title = document.createElement("h3");
  let nameClass = event.target.classList[0];
  let actualTitel = nameClass.split("_")[0];
  let text = document.createTextNode(
    'Change element appearance "' + actualTitel + '"'
  );
  h3Title.appendChild(text);
  let parentClass = document.getElementsByClassName("control-menu")[0];
  parentClass.insertBefore(h3Title, parentClass.firstChild);
}

function closeTheChangePanel() {
  let ActiveAside = !!document.getElementsByClassName("aside__title")[0];
  if (ActiveAside === true) {
    let openMenu2 = document.getElementsByClassName("control-menu")[0];
    openMenu2.classList.add("control-menu__block");
  } else {
    let mainTag = document.getElementById("main");
    let asideTag = document.getElementsByTagName("aside")[0];
    let openMenu2 = document.getElementsByClassName("control-menu")[0];
    asideTag.classList.add("aside-none");
    let CheckIfItIsHistory = !!document.getElementsByClassName(
      "this-page-has-a-tabel"
    )[0];
    if (CheckIfItIsHistory) {
    } else {
      mainTag.classList.remove("main-grid");
    }
    openMenu2.classList.remove("control-menu__show");
  }
  let parentClass = document.getElementsByClassName("control-menu")[0];
  let elements = parentClass.getElementsByTagName("h3");
  parentClass.removeChild(elements[0]);
}

function lettertype(event) {
  let currentlyActive = document.getElementsByTagName(activeTarget);
  let value = event.target.value + "%";
  for (i = 0; i < currentlyActive.length; i++) {
    currentlyActive[i].style.fontSize = value;
  }
}
function colorText(event) {
  console.log(activeTarget);
  let currentlyActive = document.getElementsByTagName(activeTarget);
  let value = event.target.value;
  for (i = 0; i < currentlyActive.length; i++) {
    currentlyActive[i].style.color = value;
  }
}

function registerEvents() {
  let elementName = document.getElementsByClassName("menu-button")[0];
  let elementOption = document.getElementsByClassName("menu-content-option")[0];
  let crossImage = document.getElementsByClassName("exit")[0];
  let inputScale = document.getElementsByName("fontsize-scale")[0];
  let colorPanel = document.getElementsByName("favcolor")[0];
  //Event Listener which checks if the Change appearance of element button is clicked.
  elementName.addEventListener("click", toggleDisplay, false);
  //Event delegation for all the options which are possible to change (and checks if page already has an aside.)
  elementOption.addEventListener(
    "click",
    function () {
      checkIfMenu1(event);
    },
    false
  );
  crossImage.addEventListener("click", closeTheChangePanel, false);
  inputScale.addEventListener(
    "input",
    function () {
      lettertype(event);
    },
    false
  );
  colorPanel.addEventListener(
    "input",
    function () {
      colorText(event);
    },
    false
  );
}
