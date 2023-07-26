import { refs } from "./refs"; 
const { gallery } = refs;

function scrollSmooth() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

export { scrollSmooth };