import { galleryItems } from "./gallery-items.js";

//console.log(galleryItems[0].original);
//! ======= Варіант 1 >>>>>>>>>>>> для append
// const makeGalleryItem = ({ preview, original, description }) => {
//   const itemElDiv = document.createElement("div");
//   itemElDiv.className = "gallery__item";

//   const itemElA = document.createElement("a");
//   itemElA.classList = "gallery__link";
//   itemElA.href = original;

//   const itemElImg = document.createElement("img");
//   itemElImg.className = "gallery__image";
//   itemElImg.src = preview;
//   itemElImg.alt = description;
//   itemElImg.dataset.source = original;

//   itemElA.append(itemElImg);
//   itemElDiv.append(itemElA);

//   return itemElDiv;
// };
//! ======= Варіант 1 <<<<<<<<<<<<

//! ======= Варіант 2 >>>>>>>>>>>> для insertAdjacentHTML
const makeGalleryItem = ({ preview, original, description }) => {
  return `
  <div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>`;
};
//! ======= Варіант 2 <<<<<<<<<<<<

const onCLickImg = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") return;

  const htmlContent = `<img 
    src="${event.target.dataset.source}"
    width="800" 
    height="600"
    >`;
  const instance = basicLightbox.create(htmlContent, {
    onShow: (instance) => {
      event.currentTarget.addEventListener("keydown", (event) => {
        if (event.code === "Escape") instance.close();
      });
    },
  });

  instance.show();
};

const galleryList = document.querySelector(".gallery");
galleryList.addEventListener("click", onCLickImg);

// const list = galleryItems.map(makeGalleryItem);
// galleryList.append(...list);

const list = galleryItems.map(makeGalleryItem).join(" ");
galleryList.insertAdjacentHTML("afterbegin", list);
