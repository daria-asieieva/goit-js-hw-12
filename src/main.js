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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        currentQuery = event.currentTarget.elements.searchQuery.value.trim();

        if (currentQuery === '') {
            showNotification('Please enter a search query');
            return;
        }

        clearGallery();
        toggleLoader(true);
        loadMoreButton.style.display = 'none';
        currentPage = 1;

        try {
            const data = await fetchImages(currentQuery, currentPage, perPage);
            if (data.hits.length === 0) {
                showNotification('Sorry, there are no images matching your search query. Please try again!');
            } else {
                renderImages(data.hits);
                gallery.refresh();
                if (data.totalHits > perPage) {
                    loadMoreButton.style.display = 'block';
                }
            }
        } catch (error) {
            showNotification('An error occurred while fetching images. Please try again.');
        } finally {
            toggleLoader(false);
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        currentPage += 1;
        toggleLoader(true);

        try {
            const data = await fetchImages(currentQuery, currentPage, perPage);
            renderImages(data.hits);
            gallery.refresh();

            const totalFetched = currentPage * perPage;
            if (totalFetched >= data.totalHits) {
                loadMoreButton.style.display = 'none';
                showNotification("We're sorry, but you've reached the end of search results.");
            } else {
                window.scrollBy({
                    top: document.querySelector('.gallery').firstElementChild.getBoundingClientRect().height * 2,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            showNotification('An error occurred while loading more images. Please try again.');
        } finally {
            toggleLoader(false);
        }
    });
});