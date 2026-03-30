
const solarScene = document.querySelector('.solar-scene');
const planetTooltip = document.getElementById('planet-tooltip');
const planets = document.querySelectorAll('.planet[data-planet-name]');

const showPlanetTooltip = (planet) => {
  if (!solarScene || !planetTooltip) return;
  const sceneRect = solarScene.getBoundingClientRect();
  const planetRect = planet.getBoundingClientRect();
  const name = planet.dataset.planetName || '';
  planetTooltip.textContent = name;
  planetTooltip.style.left = `${planetRect.left - sceneRect.left + planetRect.width / 2}px`;
  planetTooltip.style.top = `${planetRect.top - sceneRect.top - 18}px`;
  planetTooltip.classList.add('is-visible');
};

const hidePlanetTooltip = () => planetTooltip?.classList.remove('is-visible');

planets.forEach((planet) => {
  planet.addEventListener('mouseenter', () => showPlanetTooltip(planet));
  planet.addEventListener('focus', () => showPlanetTooltip(planet));
  planet.addEventListener('mouseleave', hidePlanetTooltip);
  planet.addEventListener('blur', hidePlanetTooltip);
});

const triggers = Array.from(document.querySelectorAll('[data-gallery-trigger]'));
const dialog = document.getElementById('gallery-lightbox');
const image = document.getElementById('gallery-lightbox-image');
const title = document.getElementById('gallery-lightbox-title');
const caption = document.getElementById('gallery-lightbox-caption');
const prev = document.querySelector('[data-gallery-prev]');
const next = document.querySelector('[data-gallery-next]');
const close = document.querySelector('[data-gallery-close]');
let currentIndex = 0;

const renderGalleryItem = (index) => {
  const item = triggers[index];
  if (!item || !image || !title || !caption) return;
  currentIndex = index;
  image.src = item.dataset.src || '';
  image.alt = item.dataset.title || '';
  title.textContent = item.dataset.title || '';
  caption.textContent = item.dataset.caption || '';
};

const openGallery = (index) => {
  if (!dialog) return;
  renderGalleryItem(index);
  dialog.showModal();
};

const stepGallery = (delta) => {
  if (!triggers.length) return;
  const nextIndex = (currentIndex + delta + triggers.length) % triggers.length;
  renderGalleryItem(nextIndex);
};

triggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => openGallery(index));
});
prev?.addEventListener('click', () => stepGallery(-1));
next?.addEventListener('click', () => stepGallery(1));
close?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
window.addEventListener('keydown', (event) => {
  if (!dialog?.open) return;
  if (event.key === 'ArrowLeft') stepGallery(-1);
  if (event.key === 'ArrowRight') stepGallery(1);
});
