window.addEventListener("load", registerEvents, false);

let activeTarget = "none";

function toggleDisplay() {
 let elementContent = document.getElementsByClassName("menu-content-option")[0];
 elementContent.classList.toggle("menu-content-option__show");
 window.scrollTo(0,document.body.scrollHeight);
}
function checkIfMenu1 (event){
   //(!! makes it a boolean, and if there is an aside which is not (display:none) it must have a "aside_title")
  let ActiveAside = !!document.getElementsByClassName("aside__title")[0];
  //Page already has an aside
  if (ActiveAside === true){
      let OpenMenu2 = document.getElementsByClassName("control-menu")[0];
      let trueOrFalse = OpenMenu2.classList.contains("control-menu__block")
      if (trueOrFalse){
          OpenMenu2.classList.remove("control-menu__block");
          activeTarget = event.target.getAttribute("name");
      } else {
          if (activeTarget != event.target.getAttribute("name")){
          activeTarget = event.target.getAttribute("name");
          let ParentClass = document.getElementsByClassName("control-menu")[0]; 
          let elements = ParentClass.getElementsByTagName("h3");
          ParentClass.removeChild(elements[0]);
          } else {
              return;
              }
      }

 //Page does not have an aside
  } else {
      
      let mainTag = document.getElementById("main");
      let asideTag = document.getElementsByTagName("aside")[0];
      let OpenMenu2 = document.getElementsByClassName("control-menu")[0];
      let trueOrFalse = asideTag.classList.contains("aside-none")
      if (trueOrFalse){
          asideTag.classList.remove("aside-none")
      } else {
        asideTag.classList.add("aside-none")
      }
      mainTag.classList.toggle("main-grid");
      OpenMenu2.classList.toggle("control-menu__show");      
  }
      let elementContent = document.getElementsByClassName("menu-content-option")[0];
      elementContent.classList.toggle("menu-content-option__show");
      let h3Title = document.createElement("h3");
      let text = document.createTextNode("Change element appearance \"" + event.target.getAttribute("name") + "\"");
      h3Title.appendChild(text);
      let ParentClass = document.getElementsByClassName("control-menu")[0];
      ParentClass.insertBefore(h3Title, ParentClass.firstChild);      
  }

function closeTheChangePanel(){
let ActiveAside = !!document.getElementsByClassName("aside__title")[0];
if (ActiveAside === true){
 let OpenMenu2 = document.getElementsByClassName("control-menu")[0];
 OpenMenu2.classList.add("control-menu__block")    
} else {
  let mainTag = document.getElementById("main");
  let asideTag = document.getElementsByTagName("aside")[0];
  let OpenMenu2 = document.getElementsByClassName("control-menu")[0];
  asideTag.add("aside-none");
  mainTag.classList.remove("main-grid");
  OpenMenu2.classList.remove("control-menu__show");
  }
  let ParentClass = document.getElementsByClassName("control-menu")[0]; 
  let elements = ParentClass.getElementsByTagName("h3");
  ParentClass.removeChild(elements[0]);
}


function registerEvents() {
    let elementName = document.getElementsByClassName("menu-button")[0];
    let ElementOption = document.getElementsByClassName("menu-content-option")[0];
    let CrossImage = document.getElementsByName("exit")[0];
    //Event Listener which checks if the Change appearance of element button is clicked.
    elementName.addEventListener("click",toggleDisplay, false);
    //Event delegation for all the options which are possible to change (and checks if page already has an aside.)
    ElementOption.addEventListener("click", function(){checkIfMenu1(event)}, false);
    CrossImage.addEventListener("click", closeTheChangePanel,false);
}
