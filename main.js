// nav on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Pixels to scroll before the header appears

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
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

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class .box
    const boxes = document.querySelectorAll('.box');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (in view)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tell the observer to watch each box
    boxes.forEach(box => {
        observer.observe(box);
    });
});


