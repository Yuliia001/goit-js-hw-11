import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getData } from './js/get-data';
import { createMarkup } from './js/markup';
import { scrollSmooth } from './js/smooth-scroll';
import { refs } from './js/refs';

const { form, gallery, btnLoadMore } = refs;

const perPage = 40;
let currentPage = 1;
let searchQuery = '';
let lightbox;


form.addEventListener('submit', handlerFormSearch);
btnLoadMore.addEventListener('click', handlerLoadMore);
btnLoadMore.style.display = 'none';

async function handlerFormSearch(evt) {
    evt.preventDefault();
    searchQuery = evt.target.elements.searchQuery.value.trim();
    if (!searchQuery) {
        return;
    }
    try {
        currentPage = 1;
        const data = await getData(searchQuery, currentPage);
        if (!data.hits.length) {
            gallery.innerHTML = '';
            btnLoadMore.style.display = 'none';
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        gallery.innerHTML = createMarkup(data.hits);
        form.reset();
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
        })
        
        if (data.hits.length >= perPage) {
            btnLoadMore.style.display = 'block';
        } else {
            btnLoadMore.style.display = 'none';
        }
    }
    catch (err) {
        console.log(err);
         Notiflix.Notify.failure('Failed to get data. Please try again later.');
    }   
}

 async function handlerLoadMore() { 
    currentPage += 1;
    try {const data = await getData(searchQuery, currentPage);
        if (!data.hits.length) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        lightbox.refresh();
        scrollSmooth();
        if (data.totalHits > currentPage * perPage) {
            btnLoadMore.style.display = 'block';
        } else {
            btnLoadMore.style.display = 'none';
            Notiflix.Notify.info('Opps! It is the end of search results.');
    }
        
    } catch (err) {
        console.log(err);
        Notiflix.Notify.failure('Failed to get data. Please try again later.');
    }

}

 

