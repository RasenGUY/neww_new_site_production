// all js functions used in the newworld site

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
        let el = document.createElement("style");
        el.innerHTML = pseudoEl;
        console.log(el);
        document.querySelector("head").appendChild(el);
    }; 

    return 0;
};

// function for doing media queries on site 
export function medQueries(minMax, width){
    
    let query = null; 

    // max or min
    if (minMax === ">"){ // if min then create min-width query
        query = `(min-width: ${width})`;
    }
    else if (minMax === "<"){ // if min then create max-width query
        query = `(max-width: ${width})`;
    }
    // initialize and listen to changes on page
    return window.matchMedia(query);
};

// queries for index page
export function callQueries(window, callBack, reverse){

    // will execute callBack and reverseFunction on matched or unmatched window
    if (window.matches){ // section one 
        callBack(); 
    } 
    else {
        reverse(); 
    }

    return 0;
};

export function removeChilds(parent){
    console.log("removing children");
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

// mutationObserver -> creates instance of element observer and executes given callBack function -> returns the created instance
export function observeEl(el, config, callBack) {
    
    const observerCallB = (mutationList, observer) => { // check for changes in DOM el
        
        // loop trough mutationlist and call the callBackfunction  
        for (const mutation of mutationList){
            
            // call callback if child has been added or removed
            if (mutation.type === 'childList') {
                callBack();
            }
        }
    }
    
    return {config: config, el: el, inst: new MutationObserver(observerCallB), lb: null}; // create new observer obj instance 
}

// loader function 
export function loaderFunc(ldrObj){
    // function that creates and removes loaders 

    if (typeof ldrObj.el === "string" || ldrObj.el instanceof String){
        
        // select loader if not selected already
        const loader = document.querySelector(ldrObj.el); 
        
    } else {
        
        // select loader if not selected already
        const loader = ldrObj.el; 
    }

    // deactivate loader if settings is deactivate
    if (ldrObj.turnOff == true){
        
        // hide loader and remove settings to parent element
        (()=>{
            return new Promise((resolve)=> {
                loader.querySelector('.loader-wrapper').classList.toggle(ldrObj.turnOffClass);
                resolve(true);
            })
        })().then( (finished) => {

            if (finished == true){
                loader.parentElement.classList.remove(ldrObj.settings); // removes loader settings from injectTarget
                setTimeout(() => { 
                    loader.remove(); // remove the loader itself after the turnOff animation finishes
                }, ldrObj.wait);
            };

        })
    
    // activate if settings are not deactivate
    } else {
        
        const injTarget = document.querySelector(ldrObj.injTarget); 
        
        // create loader
        (()=>{
            return new Promise((resolve)=> {
                const loader = document.createElement("div");
                const loaderWrapper = document.createElement("div");
                const loaderClass = document.createElement("div");
                
                loaderWrapper.className += " " + "loader-wrapper";
                loaderClass.className += " " + "loader";
                loaderWrapper.appendChild(loaderClass);
                loader.appendChild(loaderWrapper)
                loader.id = "loader"; 
                // still need to add functionality for creating the body of the loader
                resolve(loader);
            })
        })().then((loader) => {
            injTarget.appendChild(loader);
            injTarget.className += " " + ldrObj.settings;
        })
    }
    return 0;
}
