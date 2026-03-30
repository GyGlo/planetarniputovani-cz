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
