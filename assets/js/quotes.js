// quotes.js

const quotes = [
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" }
  // Add more quotes as needed
];

function displayRandomQuote() {
  // Locate the section with id "favorite-quotes" and the quote display element inside it.
  const section = document.getElementById('favorite-quotes');
  if (!section) return;
  const displayElement = section.querySelector('#quote-display');
  if (!displayElement) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  displayElement.innerHTML = `
    “${quote.text}”<br>
    <footer class="blockquote-footer mt-2">— ${quote.author}</footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Add event listener for the "Show another quote" button.
  const newQuoteButton = document.getElementById('new-quote');
  if (newQuoteButton) {
    newQuoteButton.addEventListener('click', displayRandomQuote);
  }
  // Display a quote when the page loads.
  displayRandomQuote();
});
