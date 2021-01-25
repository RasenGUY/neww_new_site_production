// all js functions used in the newworld site

// general 
// function for toggling pseudo elements on and off
export function togglePseudo(htmlEl, pseudo, cssRule){ //function for animating pseudo-elements 
     
    // retrieve all childnodes 
    var children = document.querySelector("head").childNodes;

    // toggle the style  
    var ruleExists = false;
    var childIndex = null;
    var pseudoEl = htmlEl + pseudo + "{"+ cssRule + "}"

    // remove existing style
    children.forEach((child, index) =>{
        if (child['innerHTML'] == pseudoEl){
            ruleExists = true; 
            childIndex = index;
        } 
    });

    if (ruleExists == true){

        // remove child
        document.querySelector("head").removeChild(children[childIndex]);
        console.log("removed child");

    } 
    else {

        // add child
        var el = document.createElement("style");
        el.innerHTML = pseudoEl;
        console.log(el);
        document.querySelector("head").appendChild(el);
    }; 

    return 0;
};

// function for animating menu
export function animateMenu(){

    // variables to animate 
    var navBtm = document.querySelector("nav#nav-mobile");
    var linksUl = document.querySelector("ul.nav-links-bottom");
    var burger = document.querySelector(".hamburger .burger");
    var burgerTop = document.querySelector(".burger-top");
    var burgerMiddle = document.querySelector(".burger-middle");
    var burgerBottom = document.querySelector(".burger-bottom");
    
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
    var htmlEl = "nav#nav-mobile-links";
    var cssRule = "transform: translateY(-5.5rem);"
    var pseudo = "::before"
    togglePseudo(htmlEl, pseudo, cssRule);
};

// function for doing media queries on site 
export function medQueries(width, minMax){
    
    let query = null; 
    // max or min
    if (minMax == ">"){ // if min then create min-width query
        query = `(min-width: ${width})`;
    }
    else if (minMax == "<"){ // if min then create max-width query
        query = `(max-width: ${width})`;
    }

    // initialize and listen to changes on page
    return window.matchMedia(query);
};

// queries for index page
export function queriesIndex(window){
    
    // select elements
    // section one
    const sOneTopRCir = document.querySelector("#index-s-one .shapes .circles .wrapper > div:nth-child(1)");

    if (window.matches){ // section one 
        
    } else {

    }
    return;
};
