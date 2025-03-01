import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError, clearGallery } from './js/render-functions.js';
import './css/loader.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('#loader'); 

function showLoader() {
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = form.elements.searchQuery.value.trim();

  // Очищення галереї перед новим пошуком
  clearGallery();

  if (!query) {
    showError(`You didn't enter anything!`);
    return;
  }

  try {
    showLoader(); // Показуємо прелоадер перед запитом
    const data = await fetchImages(query);
    hideLoader(); // Приховуємо прелоадер після отримання відповіді

    if (data.hits.length === 0) {
      showError('Nothing was found for your query. Please try a different search term!');
      return;
    }

    renderGallery(data.hits);

  } catch (error) {
    hideLoader(); // Приховуємо прелоадер при помилці
    console.error('Error loading images:', error);
    showError('Sorry, there are no images matching your search query. Please try again!');
  }
});

