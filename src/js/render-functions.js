import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
      </a>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('hidden');
}

export function showEndOfResultsMessage() {
  const message = document.createElement('p');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  message.classList.add('end-of-results');
  document.querySelector('.gallery').appendChild(message);
}

export function showNotification(message) {
  iziToast.show({
    message,
    position: 'topRight', 
    color: 'blue', 
    timeout: 3000, 
  });
}