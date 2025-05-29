
function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".slide");
  let slideWidth = slideEl.getBoundingClientRect().width;


  // Botones de navegación
  document.querySelector("#back-button").addEventListener("click", () => navigate("backward"));
  document.querySelector("#forward-button").addEventListener("click", () => navigate("forward"));

  // Indicadores (puntos)
  document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
    dot.addEventListener("click", () => navigate(index));
    dot.addEventListener("mouseenter", () => clearInterval(autoplay));
  });

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      clearInterval(autoplay);
      navigate("backward");
    } else if (e.code === "ArrowRight") {
      clearInterval(autoplay);
      navigate("forward");
    }
  });

  // Adaptación en redimensionamiento
  window.addEventListener("resize", () => {
    slideWidth = slideContainerEl.offsetWidth;
  });

  // Autoplay (cada 3 segundos)
  const autoplay = setInterval(() => navigate("forward"), 1000);

  // Lógica de desplazamiento
  const getNewScrollPosition = (arg) => {
    const gap = 5;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft;
    } else if (typeof arg === "number") {
      return arg * (slideWidth + gap);
    }
  };

  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  // Activación de indicadores por slide visible
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = entry.target.dataset.slideindex;
          carouselEl.querySelector(".slide-indicator.active").classList.remove("active");
          carouselEl.querySelectorAll(".slide-indicator")[slideIndex].classList.add("active");
        }
      });
    },
    { root: slideContainerEl, threshold: 0.1 }
  );

  document.querySelectorAll(".slide").forEach((slide) => {
    slideObserver.observe(slide);
  });
}
autoplayCarousel();

