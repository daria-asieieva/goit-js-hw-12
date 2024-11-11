import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification, toggleLoader } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    const loadMoreButton = document.querySelector('.load-more');
    const gallery = new SimpleLightbox('.gallery a');

    let currentPage = 1;
    let currentQuery = '';
    const perPage = 15;

    const hideLoadMoreButton = () => (loadMoreButton.style.display = 'none');
    const showLoadMoreButton = () => (loadMoreButton.style.display = 'block');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        currentQuery = event.currentTarget.elements.searchQuery.value.trim();

        if (currentQuery === '') {
            showNotification('Please enter a search query');
            return;
        }

        clearGallery();
        toggleLoader(true);
        hideLoadMoreButton();
        currentPage = 1;

        try {
            const data = await fetchImages(currentQuery, currentPage, perPage);
            if (!data.hits || data.hits.length === 0) {
                showNotification('Sorry, there are no images matching your search query. Please try again!');
            } else {
                renderImages(data.hits);
                gallery.refresh();
                if (data.totalHits > perPage) {
                    showLoadMoreButton();
                }
            }
        } catch (error) {
            showNotification('An error occurred while fetching images. Please try again later.');
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
                renderImages(data.hits, true);  // додаємо зображення до галереї
                gallery.refresh();

                const totalFetched = currentPage * perPage;
                if (totalFetched >= data.totalHits) {
                    showNotification("We're sorry, but you've reached the end of search results.");
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
                showNotification("We're sorry, but you've reached the end of search results.");
            }
        } catch (error) {
            showNotification('An error occurred while loading more images. Please try again.');
        } finally {
            toggleLoader(false);
        }
    });
});