// main js for the new new world website
import * as f from "./functions.js";
import * as g from "./gmap.js";
import * as c from "./carousel.js";

// intilialize map
let map; 
g.initMap(map);

// menu-mobile-animation
const animateMenu = document.querySelector("#nav-mobile .hamburger");
animateMenu.addEventListener("click", () => {

    // variables to animate 
    const navBtm = document.querySelector("nav#nav-mobile");
    const linksUl = document.querySelector("ul.nav-links-bottom");
    const burger = document.querySelector(".hamburger .burger");
    const burgerTop = document.querySelector(".burger-top");
    const burgerMiddle = document.querySelector(".burger-middle");
    const burgerBottom = document.querySelector(".burger-bottom");
    
    // toggle class
    linksUl.classList.toggle("animate");
    burger.classList.toggle("animate-burger-border");
    burgerTop.classList.toggle("animate-top");
    burgerMiddle.classList.toggle("hide");
    burgerBottom.classList.toggle("animate-bottom");
    navBtm.classList.toggle("animate");
    

    // remove attributes
    // navBtm.style.removeProperty("box-shadow");

    // toggle psuedoattributes
    const htmlEl = "nav#nav-mobile-links";
    const cssRule = "transform: translateY(-5.5rem);"
    const pseudo = "::before"
    f.togglePseudo(htmlEl, pseudo, cssRule);
});

// queries section one index page
const indexSOneQ1 = f.medQueries(`412px`, "<"); 
indexSOneQ1.addEventListener("change", f.queriesIndex);
 
// initialize carousel instance for each carousel on the site
const
carousels = document.querySelectorAll(".carousel-wrapper"); // all carousels
carousels.forEach( (carousel) => {
    let carou = new c.Carousel(carousel);
    carou.initCarousel();
});

