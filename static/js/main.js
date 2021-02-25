// main js for the new new world website
import * as f from "./functions.js";
import * as g from "./gmap.js";
import * as c from "./carousel.js";
import * as gal from "./gallery.js";
import * as an from "./animations.js";


// function to be run after the whole page is loaded 
window.onload = (()=>{

    // intilialize map only if index page
    if (window.location.pathname === "/index.html" || window.location.pathname === "/"){
        // let map; 
        g.initMap();
        console.log("initialized map")
    };
    

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
        // toggle psuedoattributes
        const htmlEl = "nav#nav-mobile-links";
        const cssRule = "transform: translateY(-5.5rem);"
        const pseudo = "::before"
        f.togglePseudo(htmlEl, pseudo, cssRule);
    });
    
    // initialize carousel instance for each carousel on the site
    const
    carousels = document.querySelectorAll(".carousel-wrapper"); // all carousels
    carousels.forEach( (carousel) => {
        const carou = new c.Carousel(carousel);
        carou.initCarousel();
    });

    // run loader function except for gallery page
    if (window.location.pathname != "/gallery.html"){
        
        // run loader functon
        f.loaderFunc({
            sel: "#loader", 
            parentSettings: "loader-settings",
            deactivate: "deactivate"
        });
    }

    // animations
    const sel = ".anim"
    const els = document.querySelectorAll(sel);
    const baseSet = {
        duration: 0.75,
        ease: "circ.inOut",
        clearProps: "true", 
        scrollTrigger: {
            start: "top 75%",
            once: true, 
            // markers: {
            //     startColor: "green", 
            //     endColor: "red", 
            //     fontSize: "12px"
            // } 
        }
    }
    const animation = new an.Animation(baseSet);
    animation.animInit(els, sel);   

})()

// run gallery code 
if (window.location.pathname === "/gallery.html"){

    // settings for gallery 
    const galWrapper = document.querySelector("#gallery-s-gallery .wrapper");
    const imgSz = {
        "square" : "450",
        "rectV" : "450/600",
        "rectH" : "450/300"
    }; 
    const queries = [f.medQueries(">", "768px"), f.medQueries("<", "767px"), f.medQueries("<", "575px")]; // create queries

    const callBack = () => { // query callback 
        f.removeChilds(gallery.wrapper);
        gallery.initialize(true, observer);
    }
    const reverse = () => { // query reverse 
        f.removeChilds(gallery.wrapper);
        gallery.initialize(true, observer);
    }

    // settings for mutation observer
    const config = {attributes: false, childList: true, subtree: false };
    const observerCallB = () => { // callback for changes in wrapper
                       
            // run lightbox function 
            observer.lb = new SimpleLightbox("a.gal-item");
            console.log("initialized lightbox")
            // run lightbox function 
            console.log('observer instance disconnected');

    };
    
    // initiate gallery 
    const gallery = new gal.Gallery(galWrapper, 60, "https://picsum.photos/", imgSz);
    const observer = f.observeEl(gallery.wrapper, config, observerCallB); // intialize observer
    (async ()=>{

        try {
            
            await gallery.initialize(false, observer);
            observer.lb = new SimpleLightbox("a.gal-item");
            // deactivate loader
            f.loaderFunc({
                injectTarget: "body",
                sel: "#loader", 
                parentSettings: "loader-settings",
                deactivate: "deactivate"
            });
                        
        
        } catch (e){
            console.log(e);
        }
    }
    )()
    
    // initialize queries 
    queries.forEach(q =>{ 
        
        let handler = () => {
            f.callQueries(q, callBack, reverse);
        };

        q.addListener(handler);
    });

};


