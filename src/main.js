import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError, clearGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/loader.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let currentPage = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function toggleLoadMore(show) {
  loadMoreBtn.style.display = show ? 'block' : 'none';
}

//  Функція нового пошуку
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  query = form.elements.searchQuery.value.trim();
  if (!query) {
    showError(`You didn't enter anything!`);
    return;
  }

  clearGallery();
  currentPage = 1;
  totalHits = 0;
  toggleLoadMore(false);

  try {
    showLoader();
    const data = await fetchImages(query, currentPage);
    hideLoader();

    if (!data.hits?.length) {
      showError('Nothing was found for your query. Please try a different search term!');
      return;
    }

    totalHits = data.totalHits;
    renderGallery(data.hits, false);
    lightbox.refresh();

    toggleLoadMore(currentPage * 40 < totalHits);
  } catch (error) {
    hideLoader();
    console.error('Error loading images:', error);
    showError('Sorry, there are no images matching your search query. Please try again!');
  }
});

//  Завантаження наступних зображень
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    showLoader();
    const data = await fetchImages(query, currentPage);
    hideLoader();

    if (!data.hits?.length) { //  Якщо зображення закінчилися
      toggleLoadMore(false);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#FFA500',
        messageColor: 'white',
        timeout: 5000,
        progressBar: true,
        transitionIn: 'fadeIn',
      });
      return;
    }

    renderGallery(data.hits, true);
    lightbox.refresh();
    smoothScroll();

    if (currentPage * 40 >= totalHits) { //  Перевірка, чи є ще сторінки
      toggleLoadMore(false);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#FFA500',
        messageColor: 'white',
        timeout: 5000,
        progressBar: true,
        transitionIn: 'fadeIn',
      });
    }

  } catch (error) {
    hideLoader();
    console.error('Error loading images:', error);
    showError('Something went wrong. Please try again later!');
  }
});


//  Функція плавного скролу після підвантаження
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
