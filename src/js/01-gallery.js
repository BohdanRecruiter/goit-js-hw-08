// Add imports above this line
import { galleryItems } from './gallery-items';
import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const divRef = document.querySelector('.gallery');

function addImages(galleryItems) {
  const imgCollection = galleryItems.reduce((acc, element) => {
    return (acc += `<li><a data-lightbox="images" class="gallery__item" href="${element.preview}"><img class="gallery__image"  src="${element.preview}" alt="${element.description}" src="${element.preview}" title="${element.description}"/> </a></li>`);
  }, ``);
  divRef.insertAdjacentHTML('beforeend', imgCollection);
}
addImages(galleryItems);
const gallery = new SimpleLightbox('.gallery a ');
gallery.options.captionDelay = 250;
console.log(galleryItems);
