// Returns an array of quote objects, optionally filtered by topic.
// Demonstrates query strings: /api/quotes?topic=science
export const getQuotes = async (topic = '') => {
  let url = '/api/quotes';
  if (topic) {
    url = `/api/quotes?topic=${topic}`;
  }
  const response = await fetch(url);
  return response.json();
};

// Returns a single quote object by id.
// Demonstrates route parameters: /api/quotes/3
export const getQuote = async (id) => {
  const response = await fetch(`/api/quotes/${id}`);
  return response.json();
};
