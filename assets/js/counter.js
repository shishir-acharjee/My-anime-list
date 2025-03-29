// Create the counter animation for statistics
document.addEventListener('DOMContentLoaded', function() {
    // The stats we want to animate (selector and target value)
    const statsToAnimate = [
        { selector: '.statistics h2.fw-bold:nth-of-type(1)', value: 104 },  // 104+ anime
        { selector: '.statistics h2.fw-bold:nth-of-type(2)', value: 2000 }, // 2k+ episodes
        { selector: '.statistics h2.fw-bold:nth-of-type(3)', value: 4 },    // 4 manga/manwa
        { selector: '.statistics h2.fw-bold:nth-of-type(4)', value: 7.5 },  // 7.5 avg rating
    ];

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to animate counting
    function animateCounter(element, targetValue, duration = 2100) {
        // Handle decimal values
        const isDecimal = !Number.isInteger(targetValue);
        const decimalPlaces = isDecimal ? 1 : 0; // For 7.5, use 1 decimal place
        
        let startTime = null;
        const startValue = 0;
        
        // Store original text to preserve any "+" or suffix
        const originalText = element.textContent;
        const hasSuffix = originalText.includes("+");
        const suffix = hasSuffix ? "+" : "";
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = startValue + progress * (targetValue - startValue);
            
            // Format with appropriate decimal places and add any suffix
            element.textContent = currentValue.toFixed(decimalPlaces) + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure we end exactly at the target value
                element.textContent = targetValue.toFixed(decimalPlaces) + suffix;
            }
        }
        
        window.requestAnimationFrame(step);
    }

    // Find all stat elements
    const statElements = document.querySelectorAll('.statistics h2.fw-bold');
    
    // Function to start animation when scrolled into view
    function handleScroll() {
        if (statElements.length > 0 && isInViewport(statElements[0])) {
            // Start animations for each stat
            statsToAnimate.forEach((stat, index) => {
                const element = statElements[index];
                if (element) {
                    animateCounter(element, stat.value);
                }
            });
            
            // Remove scroll listener once animation has started
            window.removeEventListener('scroll', handleScroll);
        }
    }
    
    // Check on initial load and add scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});