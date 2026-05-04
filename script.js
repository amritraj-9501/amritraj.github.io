// 1. Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. Premium UX: Dynamic Number Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 100; // Animation speed (lower is faster)

// Function to animate the numbers
const animateCounters = () => {
    counters.forEach(counter => {
        // Store the original text (e.g., "1000+", "100%")
        const originalText = counter.innerText;
        // Extract just the number from the text
        const targetNumber = parseInt(originalText.replace(/\D/g, '')); 
        
        // Temporarily set the display to 0 but keep the symbol
        if(originalText.includes('+')) {
            counter.innerText = '0+';
        } else if (originalText.includes('%')) {
            counter.innerText = '0%';
        } else {
            counter.innerText = '0';
        }

        let currentCount = 0;
        const increment = targetNumber / speed;

        const updateCount = () => {
            currentCount += increment;
            
            if (currentCount < targetNumber) {
                // Keep updating the number and add the symbol back
                if(originalText.includes('+')) {
                    counter.innerText = Math.ceil(currentCount) + '+';
                } else if (originalText.includes('%')) {
                    counter.innerText = Math.ceil(currentCount) + '%';
                } else {
                    counter.innerText = Math.ceil(currentCount);
                }
                // Call the function again smoothly
                requestAnimationFrame(updateCount);
            } else {
                // Ensure it finishes exactly on the target text
                counter.innerText = originalText;
            }
        };

        updateCount();
    });
};

// 3. Trigger the animation ONLY when the user scrolls to the Impact section
const impactSection = document.querySelector('.impact');

if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Run the animation
                animateCounters();
                // Stop observing once it has animated so it doesn't repeat infinitely
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5 // Trigger when 50% of the section is visible on screen
    }); 

    observer.observe(impactSection);
}
