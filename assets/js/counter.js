document.addEventListener('DOMContentLoaded', function() {
  // The stats we want to animate (selector and target value)
  const statsToAnimate = [
    { selector: '.statistics h2.fw-bold:nth-of-type(1)', value: 104 },  // 104+ anime
    { selector: '.statistics h2.fw-bold:nth-of-type(2)', value: 2000 }, // 2k+ episodes
    { selector: '.statistics h2.fw-bold:nth-of-type(3)', value: 4 },    // 4 manga/manwa
    { selector: '.statistics h2.fw-bold:nth-of-type(4)', value: 7.5 }   // 7.5 avg rating
  ];

  // Function to animate counting from 0 to targetValue
  function animateCounter(element, targetValue, duration = 2100) {
    const isDecimal = !Number.isInteger(targetValue);
    const decimalPlaces = isDecimal ? 1 : 0; // For example, 7.5 needs 1 decimal place
    
    let startTime = null;
    const startValue = 0;
    
    // Detect if a suffix (like "+") exists
    const originalText = element.textContent;
    const hasSuffix = originalText.includes("+");
    const suffix = hasSuffix ? "+" : "";
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = startValue + progress * (targetValue - startValue);
      
      element.textContent = currentValue.toFixed(decimalPlaces) + suffix;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure it ends exactly at target value
        element.textContent = targetValue.toFixed(decimalPlaces) + suffix;
      }
    }
    
    window.requestAnimationFrame(step);
  }

  // Select all statistic elements
  const statElements = document.querySelectorAll('.statistics h2.fw-bold');

  // Create an IntersectionObserver to trigger the animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      // Determine which stat this is by index
      const index = Array.from(statElements).indexOf(element);
      const targetValue = statsToAnimate[index].value;
      
      if (entry.isIntersecting) {
        // When the element enters the viewport, animate the counter
        animateCounter(element, targetValue);
      } else {
        // When leaving, reset to "0" so it can animate again on re-entry.
        // Preserve a "+" if present in the original text.
        const hasSuffix = element.textContent.includes("+");
        const suffix = hasSuffix ? "+" : "";
        element.textContent = "0" + suffix;
      }
    });
  }, {
    threshold: 0.1// Adjust this threshold as needed
  });

  // Observe each statistic element
  statElements.forEach(element => observer.observe(element));
});