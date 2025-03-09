import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <li class="gallery__item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
        <div class="gallery__info">
          <p><b>Лайки:</b> ${image.likes}</p>
          <p><b>Перегляди:</b> ${image.views}</p>
          <p><b>Коментарі:</b> ${image.comments}</p>
          <p><b>Завантаження:</b> ${image.downloads}</p>
        </div>
      </a>
    </li>
  `).join('');

  
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function toggleLoader(show) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = show ? 'block' : 'none';
  }
}

export function showNotification(message) {
  iziToast.info({
    title: '',
    message: message,
    position: 'topRight',
    timeout: 3000
  });
}