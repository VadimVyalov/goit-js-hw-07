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

  //! -1- >>> не реализовано снятие событий
  //   const instance = basicLightbox.create(htmlContent, {
  //     onShow: (currentInstance) => {
  //       event.currentTarget.addEventListener("keydown", (event) => {
  //         if (event.code === "Escape") currentInstance.close();
  //       });
  //     },
  //   });
  //   instance.show();
  // };
  //! -1- <<<

  //! -2- >>> ошибка на снятии события

  //   const instance = basicLightbox.create(htmlContent, {
  //     onShow: (currentInstance) => {
  //       event.currentTarget.addEventListener(
  //         "keydown",
  //         closeOnShow(currentInstance)
  //       );
  //     },
  //     onClose: (currentInstance) => {
  //       event.currentTarget.removeEventListener(
  //         "keydown",
  //         closeOnShow(currentInstance)
  //       ); //error
  //     },
  //   });
  //   instance.show();
  // };
  // const closeOnShow = function (inst) {
  //   return function keypress(evt) {
  //     if (evt.code === "Escape") {
  //       inst.close();
  //     }
  //   };
  // };

  //! -2- <<<

  //! -3- >>> снимает событие только по ESC, костыль в CallBack

  //   const instance = basicLightbox.create(htmlContent, {
  //     onShow: (instance) => {
  //       document.body.addEventListener("keydown", closeOnShow(instance));
  //     },
  //     onClose: (instance) => {
  //       document.body.removeEventListener("keydown", closeOnShow(instance));
  //     },
  //   });

  //   instance.show();
  // };

  // //*========= CallBack >>>>>>>>>

  // const closeOnShow = function (inst) {
  //   return function keypress(evt) {
  //     if (evt.code === "Escape") {
  //       inst.close();
  //       evt.currentTarget.removeEventListener("keydown", keypress);
  //       console.log("Escape");
  //     }
  //   };
  // };
  // //*========= CallBack <<<<<<<<<<
  //! -3- <<<
  //! дошло что евент смотрит вникуда. всё дальше работает
  //! -4- >>> CallBack внутри обработчика, поэтому у всех одна область видимости
  //   const instance = basicLightbox.create(htmlContent, {
  //     onShow: () => {
  //       document.body.addEventListener("keydown", closeShowOn);
  //     },
  //     onClose: () => {
  //       document.body.removeEventListener("keydown", closeShowOn);
  //     },
  //   });

  //   instance.show();

  //   function closeShowOn(evt) {
  //     if (evt.code === "Escape") {
  //       instance.close();
  //       console.log("Escape");
  //     }
  //   }
  // };
  //! -4- <<<

  //! -5- >>> сделано через bind. как работает до конца не понимаю
  //   const instance = basicLightbox.create(htmlContent, {
  //     onShow: () => {
  //       document.body.addEventListener("keydown", ff);
  //     },
  //     onClose: () => {
  //       document.body.removeEventListener("keydown", ff);
  //     },
  //   });
  //   const ff = closeShowOn.bind(null, instance);
  //   instance.show();
  // };

  // const closeShowOn = function (inst) {
  //   if (event.code === "Escape") {
  //     inst.close();
  //     console.log("Escape");
  //   }
  // };
  //! -5- <<<

  //! -6- >>> сделано по спецификации, глобальный объект

  evtHandler.instance = basicLightbox.create(htmlContent, {
    onShow: () => {
      document.body.addEventListener("keydown", evtHandler);
    },
    onClose: () => {
      document.body.removeEventListener("keydown", evtHandler);
    },
  });

  evtHandler.instance.show();
};

const evtHandler = {
  inst: null,
  handleEvent: keydownHandler,
};

function keydownHandler(evt) {
  if (evt.code === "Escape") {
    this.instance.close();
    console.log("Escape");
  }
}
//! -6- <<<

//! ======== main

const galleryList = document.querySelector(".gallery");
galleryList.addEventListener("click", onCLickImg);

// const list = galleryItems.map(makeGalleryItem);
// galleryList.append(...list);

const list = galleryItems.map(makeGalleryItem).join(" ");
galleryList.insertAdjacentHTML("afterbegin", list);
