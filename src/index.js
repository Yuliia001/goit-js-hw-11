import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getData } from './get-data';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more')
}
const { form, gallery, btnLoadMore } = refs;

const perPage = 40;
let currentPage = 1;
// let searchQuery = '';
let lightbox;

form.addEventListener('submit', handlerFormSearch);
btnLoadMore.addEventListener('.click', handlerLoadMore);

async function handlerFormSearch(evt) {
    evt.preventDefault();
   const searchQuery = evt.target.elements.searchQuery.value.trim();
    if (!searchQuery) {
        return;
    }
    try {
        const data = await getData(searchQuery, currentPage);
        if (!data.hits.length) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        gallery.innerHTML = createMarkup(data.hits);
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
        });
    }


    catch (err) {
        console.log(err);
         Notiflix.Notify.failure('Failed to get data. Please try again later.');
  }
}

function handlerLoadMore() {
    
}
function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}}" loading="lazy" width="300"/>
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${views }</b>
            </p>
            <p class="info-item">
            <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`).join('')
    
    
}


