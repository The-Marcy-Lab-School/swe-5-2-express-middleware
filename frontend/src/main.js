/**
 * Quote Gallery — frontend application
 *
 * This file is already complete. Do not modify it.
 *
 * It demonstrates same-origin fetch requests: because the frontend is
 * served by the same Express server as the API, fetch calls can use
 * relative paths like '/api/quotes' instead of a hardcoded absolute URL
 * like 'http://localhost:8080/api/quotes'.
 */

import { getQuotes, getQuote } from './fetch-helper.js';
import { renderQuotes, renderQuoteDetail, renderError, hideQuoteDetails } from './dom-helper.js';

const quotesContainer = document.querySelector('#quotes-container');
const topicFilter = document.querySelector('#topic-filter');
const closeDetailBtn = document.querySelector('#close-detail');

const loadQuotes = async (topic = '') => {
  try {
    const quotes = await getQuotes(topic);
    renderQuotes(quotes);
  } catch (err) {
    renderError('Could not load quotes. Is the server running?');
    console.error('Failed to load quotes:', err);
  }
};

// Delegated click listener — one handler on the container covers all cards
quotesContainer.addEventListener('click', async (event) => {
  const card = event.target.closest('.quote-card');
  if (!card) return;

  const id = card.dataset.id;
  try {
    const quote = await getQuote(id);
    renderQuoteDetail(quote);
  } catch (err) {
    renderError('Failed to load quote');
    console.error('Failed to load quote:', err);
  }
});

// Re-fetch quotes when the topic filter changes
topicFilter.addEventListener('change', () => {
  loadQuotes(topicFilter.value);
});

closeDetailBtn.addEventListener('click', () => {
  hideQuoteDetails();
});

// Load all quotes on page load
loadQuotes();
