import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;  
    
    gallery.innerHTML = images.map(image => `
        <a href="${image.largeImageURL}" class="gallery__link">
            <div class="gallery__item">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="gallery__info">
                    <p><b>Likes:</b> ${image.likes}</p>
                    <p><b>Views:</b> ${image.views}</p>
                    <p><b>Comments:</b> ${image.comments}</p>
                    <p><b>Downloads:</b> ${image.downloads}</p>
                </div>
            </div>
        </a>
    `).join('');
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    if (gallery) gallery.innerHTML = '';
}


export function showNotification(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}


export function toggleLoader(show) {
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = show ? 'block' : 'none';
}