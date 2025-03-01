import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import svgIcon from '../img/Group.svg';

let lightbox = null;

export function clearGallery() {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
}

export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  const searchInput = document.querySelector('input[type="text"]');

  galleryContainer.innerHTML = '';


  const markup = images
    .map((image) => {
      return `<li class="gallery-item">
                 <a href="${image.largeImageURL}" class="gallery-link">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
                 </a>
                 <ul class="gallery-info">
                    <li class="gallery-likes">
                        <span class="title">Likes</span>
                        <span class="content">${image.likes}</span>
                    </li>
                    <li class="gallery-views">
                        <span class="title">Views</span>
                        <span class="content">${image.views}</span>
                    </li>
                    <li class="gallery-comments">
                        <span class="title">Comments</span>
                        <span class="content">${image.comments}</span>
                    </li>
                    <li class="gallery-downloads">
                        <span class="title">Downloads</span>
                        <span class="content">${image.downloads}</span>
                    </li>
                 </ul>
              </li>`;
    })
    .join('');

  galleryContainer.innerHTML = markup;


  searchInput.value = '';


  if (lightbox) {
    lightbox.destroy(); 
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
  });

  lightbox.refresh(); // Оновлюємо галерею
}

export function showError(message) {

    iziToast.error({
        message: message,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: 'white',
        iconColor: 'white',
        iconUrl: svgIcon, 
        close: true, 
        progressBar: true,
        timeout: 10000,
        animateInside: false,
        messageSize: '16',
        transitionIn: 'fadeIn',
    });
}
