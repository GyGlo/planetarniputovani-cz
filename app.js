const filterButtons = document.querySelectorAll(".filter-button");
const stopCards = document.querySelectorAll(".stop-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    stopCards.forEach((card) => {
      const kind = card.dataset.kind;
      const shouldShow = filter === "all" || kind === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const panelTiles = document.querySelectorAll(".panel-tile");

panelTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    lightboxImage.src = tile.dataset.image;
    lightboxImage.alt = `Panel ${tile.dataset.title}`;
    lightboxTitle.textContent = tile.dataset.title;
    lightbox.showModal();
  });
});

lightbox?.addEventListener("click", (event) => {
  const content = lightbox.querySelector(".lightbox-content");
  const close = lightbox.querySelector(".lightbox-close");

  if (!content.contains(event.target) && !close.contains(event.target)) {
    lightbox.close();
  }
});

const solarScene = document.querySelector(".solar-scene");
const planetTooltip = document.getElementById("planet-tooltip");
const planets = document.querySelectorAll(".planet[data-planet-name]");

const showPlanetTooltip = (planet) => {
  if (!solarScene || !planetTooltip) {
    return;
  }

  const sceneRect = solarScene.getBoundingClientRect();
  const planetRect = planet.getBoundingClientRect();
  const name = planet.dataset.planetName || "";

  planetTooltip.textContent = name;
  planetTooltip.style.left = `${planetRect.left - sceneRect.left + planetRect.width / 2}px`;
  planetTooltip.style.top = `${planetRect.top - sceneRect.top - 18}px`;
  planetTooltip.classList.add("is-visible");
};

const hidePlanetTooltip = () => {
  planetTooltip?.classList.remove("is-visible");
};

planets.forEach((planet) => {
  planet.addEventListener("mouseenter", () => showPlanetTooltip(planet));
  planet.addEventListener("focus", () => showPlanetTooltip(planet));
  planet.addEventListener("mouseleave", hidePlanetTooltip);
  planet.addEventListener("blur", hidePlanetTooltip);
});
