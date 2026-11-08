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
  let activePhotos = photos;
  let activeProject = "Paraíso";
  let swipeStart = null;

  if (!Array.isArray(photos) || !gallery || !photoCount || !lightbox) {
    throw new Error("Não foi possível inicializar a galeria do Paraíso.");
  }

  photoCount.textContent = `${photos.length} ${
    photos.length === 1 ? "fotografia" : "fotografias"
  }`;

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

  function showPhoto(index) {
    currentIndex = (index + activePhotos.length) % activePhotos.length;
    expandedPhoto.src = activePhotos[currentIndex];
    expandedPhoto.alt = `Imagem ${currentIndex + 1} do empreendimento ${activeProject}`;
    currentPhotoCount.textContent = `${currentIndex + 1} / ${activePhotos.length}`;
    previousButton.hidden = activePhotos.length < 2;
    nextButton.hidden = activePhotos.length < 2;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function openPhoto(index) {
    activePhotos = photos;
    activeProject = "Paraíso";
    showPhoto(index);
  }

  function openOrigemPhoto(index) {
    activePhotos = origemImages;
    activeProject = "Örigem";
    showPhoto(index);
  }

  function movePhoto(direction) {
    if (activePhotos.length > 1) showPhoto(currentIndex + direction);
  }

  function openOrigemCover() {
    openOrigemPhoto(0);
  }

  function navigatePhotos(event) {
    if (!lightbox.classList.contains("show")) return;
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  }

  function startSwipe(event) {
    swipeStart = event.changedTouches[0].clientX;
  }

  function endSwipe(event) {
    if (swipeStart === null) return;
    const distance = event.changedTouches[0].clientX - swipeStart;
    swipeStart = null;
    if (Math.abs(distance) >= 45) movePhoto(distance < 0 ? 1 : -1);
  }

  document.getElementById("projectImageButton").addEventListener("click", openOrigemCover);
  document.addEventListener("keydown", navigatePhotos);
  expandedPhoto.addEventListener("touchstart", startSwipe, { passive: true });
  expandedPhoto.addEventListener("touchend", endSwipe, { passive: true });

  window.openPhoto = openPhoto;
  window.openOrigemPhoto = openOrigemPhoto;
  window.movePhoto = movePhoto;
  window.closePhoto = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  };
})();
