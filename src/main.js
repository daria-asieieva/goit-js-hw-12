import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('.form');
    const loadMoreButton = document.querySelector('.load-more');
    const loaderElement = document.getElementById('loader');
    const gallery = new SimpleLightbox('.gallery a');

    let currentPage = 1;
    let currentQuery = '';
    const perPage = 15;

    const hideLoadMoreButton = () => (loadMoreButton.style.display = 'none');
    const showLoadMoreButton = () => (loadMoreButton.style.display = 'block');

    const toggleLoader = (show) => {
        loaderElement.style.display = show ? 'block' : 'none';
    };

    const showNotification = (message) => {
        iziToast.info({
            title: '',
            message: message,
            position: 'topRight',
            timeout: 3000
        });
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        currentQuery = event.currentTarget.elements.searchQuery.value.trim();

        if (currentQuery === '') {
            showNotification('Будь ласка, введіть пошуковий запит');
            return;
        }

        clearGallery();
        toggleLoader(true);
        hideLoadMoreButton();
        currentPage = 1;

        try {
            const data = await fetchImages(currentQuery, currentPage, perPage);
            if (!data.hits || data.hits.length === 0) {

                showNotification('На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!');
            } else {
                renderImages(data.hits);
                gallery.refresh();
                if (data.totalHits > perPage) {
                    showLoadMoreButton();
                }


                showNotification(`Ура! Ми знайшли ${data.totalHits} зображень.`);
            }
        } catch (error) {
            showNotification('Сталася помилка під час отримання зображень. Спробуйте пізніше.');
        } finally {
            toggleLoader(false);
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        currentPage += 1;
        toggleLoader(true);
        hideLoadMoreButton();

        try {
            const data = await fetchImages(currentQuery, currentPage, perPage);
            if (data.hits && data.hits.length > 0) {
                renderImages(data.hits);
                gallery.refresh();

                const totalFetched = currentPage * perPage;
                if (totalFetched >= data.totalHits) {
                    showNotification("Вибачте, але ви досягли кінця результатів пошуку.");
                } else {
                    showLoadMoreButton();


                    const { height: cardHeight } = document
                        .querySelector('.gallery')
                        .firstElementChild.getBoundingClientRect();

                    window.scrollBy({
                        top: cardHeight * 2,
                        behavior: 'smooth',
                    });
                }
            } else {
                showNotification("Вибачте, але ви досягли кінця результатів пошуку.");
            }
        } catch (error) {
            showNotification('Сталася помилка під час завантаження додаткових зображень. Спробуйте ще раз.');
        } finally {
            toggleLoader(false);
        }
    });
});