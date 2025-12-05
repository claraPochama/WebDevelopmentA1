// nav on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 80; // pixels to scroll before the header appears

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            console.log("nav scrolled triggered");
        } else {
            header.classList.remove('scrolled');
        }
    });
});

//background fade out
document.addEventListener('DOMContentLoaded', function() {
    const homeMedia = document.querySelector('.home-media');
    const scrollThreshold = 400;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            homeMedia.classList.add('darken');
        } else {
            homeMedia.classList.remove('darken');
        }
    });
});


//https://www.youtube.com/watch?v=Jo8ABAJtMM0
//https://www.youtube.com/watch?v=adqwnu3gs2k <<dif btw addEventListener & IntersectionObserver


document.addEventListener('DOMContentLoaded', function() {
    // select all elements with the class .box
    const boxes = document.querySelectorAll('.box');
    const observerOptions = {
        threshold: 0.1 // triggers when 10% of the element visible
    };

    //a function that observe anything that comes into view port
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {// if the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // stop observing the element after its visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // tell the observer function to watch each box
    boxes.forEach(box => {
        observer.observe(box);
        console.log("box is-visivible");
    });
});


