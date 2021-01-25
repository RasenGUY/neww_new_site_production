// --------------- carousell -------------------
export function Carousel(carousel){  // object instance function carousel function
    
    this.carousel = carousel; 
    this.itemClassName = this.carousel.querySelector(".carousel-photo").className;
    this.items = document.getElementsByClassName(this.itemClassName);
    this.totalItems = this.items.length; 
    this.slide = 0;
    this.moving = true;

    
    // ------------ carousel functions ------------------
    
    // initialize carousel photo classes
    this.setInitialClass = () => { 
        // target current previous, current and next items
        // assuming there are at least 3 items
        this.items[this.totalItems - 1].classList.add("prev");
        this.items[0].classList.add("active");
        this.items[1].classList.add("next");
    };
    
    // add click events to the next and previous buttons 
    this.setListeners = () => {
        const 
        next = this.carousel.querySelector(".carousel-btn--next"), 
        prev = this.carousel.querySelector(".carousel-btn--prev");
        next.addEventListener("click", this.moveNext);
        prev.addEventListener("click", this.movePrev);
    };

    // move items right
    this.moveNext = () => {
        // check if moving 
        if (!this.moving){
            // if it is the last slide, reset to 0, else +1
            if (this.slide === (this.totalItems - 1 )){
                this.slide = 0; 
            } else {
                this.slide++;
            }
            // move carousel to updated slide
            this.moveCarouselTo(this.slide);
        }
    };
     
    // move items left
    this.movePrev = () => {
           
        // check if moving 
        if (!this.moving){
        // if it is the last slide, reset to 0, else +1
        if (this.slide === 0){
            this.slide = (this.totalItems - 1); 
        } else {
            this.slide--;
        }
        // move carousel to updated slide
        this.moveCarouselTo(this.slide);
        }

    };

    // disable interaction 
    this.disableInteraction = () => {
        // Set 'moving' to true for the same duration as our transition.
        // (0.5s = 500ms)
        this.moving = true; 
         
        // setTimeout runs its function once after the given time
        setTimeout(() => {
            this.moving = false
        }, 500);
    }
    
    // main carousel function 
    this.moveCarouselTo = () => {
        
        // if slide not moving then allow interaction
        if (!this.moving){
    
            // disable interaction for 5 seconds
            this.disableInteraction()
    
            // update old adjacent slides with new ones
            var 
            newPrevious = this.slide - 1,
            newNext = this.slide + 1, 
            oldPrevious = this.slide - 2,
            oldNext = this.slide + 2; 
            
            // test if carousel has more then 3 items
            // Checks and updates if the new slides are out of bounds
            if (newPrevious <= 0) {
                oldPrevious = (this.totalItems - 1);
            } else if (newNext >= (this.totalItems - 1)) {
                oldNext = 0;
            }

            // checks and updates if the slide is at the beginning/end
            if (this.slide === 0){
                newPrevious = (this.totalItems - 1);
                oldPrevious = (this.totalItems - 2);
                oldNext = (this.slide + 1);
            } else if (this.slide === (this.totalItems - 1)) {
                newPrevious = (this.slide - 1);
                newNext = 0;
                oldNext = 1;
            }

            // reset old next/prev elements to default classes
            this.items[oldPrevious].className = this.itemClassName;
            this.items[oldNext].className = this.itemClassName;


            // add new classes
            this.items[newPrevious].className = this.itemClassName + " prev";
            this.items[this.slide].className = this.itemClassName + " active";
            this.items[newNext].className = this.itemClassName + " next";

        }
    }

    // initialize
    this.initCarousel = () => {
    
        this.setInitialClass();
        this.setListeners();
        
        // set moving to false
        this.moving = false;
    }
    
}





