const quotesContainer = document.querySelector('#quotes-container');
const quoteDetail = document.querySelector('#quote-detail');
const errorEl = document.querySelector('#error');

// Builds and returns a single quote card element.
export const createQuoteCard = (quote) => {
  const article = document.createElement('article');
  article.className = 'quote-card';
  article.dataset.id = quote.id;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = `"${quote.text}"`;

  const cite = document.createElement('cite');
  cite.textContent = `— ${quote.author}`;

  const tag = document.createElement('span');
  tag.className = 'topic-tag';
  tag.textContent = quote.topic;

  article.append(blockquote, cite, tag);
  return article;
};

// Clears the container and renders an array of quote cards.
export const renderQuotes = (quotes) => {
  quotesContainer.innerHTML = '';

  quotes.forEach((quote) => {
    quotesContainer.append(createQuoteCard(quote));
  });

  quotesContainer.classList.remove('hidden');
  quoteDetail.classList.add('hidden');
  errorEl.classList.add('hidden');
};

// Clears the container and renders the detail card for a single quote.
// onClose is called when the close button is clicked.
export const renderQuoteDetail = (quote) => {
  const blockquoteEl = document.querySelector('#quote-text');
  blockquoteEl.textContent = quote.text;

  const citeEl = document.querySelector('#quote-cite');
  citeEl.textContent = `— ${quote.author}`;

  const topicEl = document.querySelector('#quote-topic');
  topicEl.textContent = quote.topic;

  quoteDetail.classList.remove('hidden');
  errorEl.classList.add('hidden');
};

export const hideQuoteDetails = () => {
  quoteDetail.classList.add('hidden');
}

// Clears the container and renders an error message.
export const renderError = (message) => {
  errorEl.classList.remove('hidden');
  errorEl.textContent = message;
};
