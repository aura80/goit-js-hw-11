import Notiflix from 'notiflix';
// Import suplimentar de stil
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './api.js';
import { updateMarkup } from "./markup.js";

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let queryText = '';

// loadMoreButton.style.display = 'none';

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();

    currentPage = 1;

    queryText = event.target.elements.searchQuery.value.trim();
    console.log("Textul introdus in input: ", queryText);

    if (queryText === '') {
        Notiflix.Notify.failure('Please enter a search query.');
        return;
    }
    
    try {
        console.log('Fetching images');

        const images = await getImages(queryText, currentPage);
        console.log('Images: ', images);
        console.log('Total Hits: ', images.totalHits);

        if (images.hits.length === 0) {
            Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
            );
        loadMoreButton.style.display = 'none';   
        } else {
            updateMarkup(images.hits, true);

            console.log('No of images of the same type per_page: ', images.hits.length);
            
            Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

            loadMoreButton.style.display = (currentPage * 40) < images.totalHits ? 'block' : 'none';      }
            console.log('Display style:', loadMoreButton.style.display);
        
        if ((currentPage * 40) >= images.totalHits) {
                Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
                );
        }

    } catch (error) {
            Notiflix.Notify.failure(`Something went wrong. Please try again later.`);
    }

}

async function onLoadMore() {
    currentPage += 1;

    try {
      const images = await getImages(queryText, currentPage);

      updateMarkup(images.hits, false);

      loadMoreButton.style.display =
        currentPage * 40 < images.totalHits ? 'block' : 'none';

      if (currentPage * 40 >= images.totalHits) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      // Smooth scrolling
      // getting the height of the first card to compute how much to scroll
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      // scrolling 2 * cardHeight
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
        
    } catch (error) {
      Notiflix.Notify.failure(`Something went wrong. Please try again later.`);
    }
}
