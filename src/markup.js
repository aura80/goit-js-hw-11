import SimpleLightbox from 'simplelightbox';

export function createMarkup({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <a href="${largeImageURL}" class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
      </a>
      `;
}

export function updateMarkup(markup, isOnLoadMoreSearch = false) {
    const allElemMarkup = markup.map(createMarkup).join('');
    
    if (isOnLoadMoreSearch) {
       document.querySelector('.gallery').innerHTML = allElemMarkup;       
    } else {
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', allElemMarkup);
    }

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
