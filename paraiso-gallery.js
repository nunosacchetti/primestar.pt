(function () {
  const photos = window.paraisoPhotos;
  const gallery = document.getElementById("galleryGrid");
  const photoCount = document.getElementById("paraisoPhotoCount");
  const lightbox = document.getElementById("photoLightbox");
  const expandedPhoto = document.getElementById("photoExpanded");
  const currentPhotoCount = document.getElementById("photoCount");
  const previousButton = lightbox.querySelector(".photo-prev");
  const nextButton = lightbox.querySelector(".photo-next");
  let currentIndex = 0;

  if (!Array.isArray(photos) || !gallery || !photoCount || !lightbox) {
    throw new Error("Não foi possível inicializar a galeria do Paraíso.");
  }

  photoCount.textContent = `${photos.length} ${
    photos.length === 1 ? "fotografia" : "fotografias"
  }`;
  previousButton.hidden = photos.length < 2;
  nextButton.hidden = photos.length < 2;

  photos.forEach((src, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.setAttribute(
      "aria-label",
      `Ampliar fotografia ${index + 1} do Paraíso`,
    );
    button.addEventListener("click", () => openPhoto(index));

    image.src = src;
    image.alt = `Fotografia ${index + 1} do empreendimento Paraíso`;
    image.loading = "lazy";

    button.appendChild(image);
    gallery.appendChild(button);
  });

  function openPhoto(index) {
    currentIndex = (index + photos.length) % photos.length;
    expandedPhoto.src = photos[currentIndex];
    expandedPhoto.alt = `Fotografia ${currentIndex + 1} do empreendimento Paraíso`;
    currentPhotoCount.textContent = `${currentIndex + 1} / ${photos.length}`;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  window.openPhoto = openPhoto;
  window.movePhoto = (direction) => {
    if (photos.length > 1) openPhoto(currentIndex + direction);
  };
  window.closePhoto = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  };
})();
