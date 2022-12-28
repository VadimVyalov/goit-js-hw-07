import { galleryItems } from "./gallery-items.js";

// console.log(galleryItems);

const makeGalleryItem = ({ preview, original, description }) => {
  return `

  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      alt=${description}
    />
  </a>`;
};

const galleryList = document.querySelector(".gallery");
const list = galleryItems.map(makeGalleryItem).join(" ");
galleryList.insertAdjacentHTML("afterbegin", list);

let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
gallery.on("show.simplelightbox");

gallery.on("error.simplelightbox", function (e) {
  console.log(e); // some usefull information
});
