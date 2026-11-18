(() => {
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };
    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      nav.classList.toggle("is-open", opening);
      document.body.classList.toggle("menu-open", opening);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".service-card,.event-card,.stat,.intro-copy,.about-visual,.section-heading,.work-heading,.contact-inner").forEach(el => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  const eventRoot = document.getElementById("event-detail");
  if (eventRoot) renderEventDetail(eventRoot);

  function renderEventDetail(root) {
    const events = {
      "hamaki-2021": {
        artist: "Mohamed Hamaki", title: "A night built around the music.", year: "2021",
        type: "Live concert", venue: "Golden Jewel Beach & Hotel", city: "Alexandria, Egypt",
        description: "A large-scale live concert bringing thousands together for a night of music, production and shared energy.",
        images: ["hamaki-21 -2.jpg","hamaki-21 3.jpg","hamaki-21 4.jpg","hamaki-21..jpg","hamaki-21.jpg"]
      },
      "tamer-ashour-2022": {
        artist: "Tamer Ashour", title: "An unforgettable live performance.", year: "2022",
        type: "Live concert", venue: "Golden Jewel Beach & Hotel", city: "Alexandria, Egypt",
        description: "A live experience shaped by a powerful performance, an engaged audience and a full concert atmosphere.",
        images: ["tamerashour-22 1.jpg","tamerashour-22 2.jpg","tamerashour-22 3.jpg","tamerashour-22 4.jpg","tamerashour-22 5.jpg","tamerashour-22 7.jpg"]
      },
      "ramy-reda-2023": {
        artist: "Ramy Gamal & Reda El Bahrawy", title: "Two artists. One big night.", year: "2023",
        type: "Live concert", venue: "Golden Jewel Beach & Hotel", city: "Alexandria, Egypt",
        description: "A major concert experience featuring two artists and a crowd of thousands.",
        images: ["redaxramygamal-23 2.jpg","reda-23 1.jpg","reda-23  3.jpg"]
      },
      "zaza-shehab-2024": {
        artist: "Ziad Zaza × Shehab El Sayed × LEG-CY", title: "A new wave took the stage.", year: "2024",
        type: "Live show", venue: "Antoniadis Gardens", city: "Alexandria, Egypt",
        description: "A high-energy live show bringing a new generation of artists to one stage in Alexandria.",
        images: ["zaza x shehab x legecy.jpg","zaza x shehab x legecy 2.jpg","zaza x shehab x legecy 3.jpg","zaza x shehab x legecy 4.jpg","zaza x shehab x legecy 5.jpg","zaza x shehab x legecy 6.jpg","zaza x shehab x legecy 7.jpg","zaza x shehab x legecy 8.jpg","zaza x shehab x legecy 9.jpg","zaza x shehab x legecy 10.jpg"]
      },
      "tamer-ashour-2024": {
        artist: "Tamer Ashour", title: "Back to the stage. Bigger than ever.", year: "2024",
        type: "Live concert", venue: "Antoniadis Gardens", city: "Alexandria, Egypt",
        description: "A large outdoor concert experience at one of Alexandria's landmark venues.",
        images: ["tamerashour-24 1.jpg","tamerashour-24 2.jpg","tamerashour-24 3.jpg","tamerashour-24 4.jpg","tamerashour-24 5.jpg"]
      },
      "ramy-gamal-2025": {
        artist: "Ramy Gamal", title: "A crowd united by the music.", year: "2025",
        type: "Live concert", venue: "Antoniadis Gardens", city: "Alexandria, Egypt",
        description: "A 2025 live concert produced for thousands of music fans in Alexandria.",
        images: ["ramygamal x felo -25.jpg"]
      }
    };

    const key = new URLSearchParams(window.location.search).get("event");
    const event = events[key];
    if (!event) {
      root.innerHTML = '<div class="event-not-found"><p class="section-kicker">EVENT NOT FOUND</p><h1>This story is not available yet.</h1><a class="text-link" href="/">Back to MJ Events <span>↗</span></a></div>';
      return;
    }

    document.title = event.artist + " — MJ Events";
    const images = event.images.map((file, index) => `<figure class="detail-photo"><img src="/public/images/${encodeURIComponent(file).replace(/%2F/g, "/")}" alt="${event.artist} event photo ${index + 1}" loading="lazy"></figure>`).join("");
    root.innerHTML = `
      <section class="event-hero">
        <div class="event-hero-bg" style="background-image:url('/public/images/${encodeURIComponent(event.images[0])}')"></div>
        <div class="event-hero-overlay"></div>
        <div class="event-hero-content">
          <a class="back-link" href="/#work">← BACK TO SELECTED WORK</a>
          <p class="section-kicker">${event.year} / ${event.type.toUpperCase()}</p>
          <h1>${event.artist}</h1>
          <p class="event-subtitle">${event.title}</p>
        </div>
      </section>
      <section class="event-facts">
        <div><span>VENUE</span><strong>${event.venue}</strong></div>
        <div><span>LOCATION</span><strong>${event.city}</strong></div>
        
        <div><span>YEAR</span><strong>${event.year}</strong></div>
      </section>
      <section class="event-story">
        <div class="section-kicker">THE STORY</div>
        <div><h2>Made for the moment.</h2><p>${event.description}</p></div>
      </section>
      <section class="event-gallery"><div class="section-kicker">EVENT GALLERY</div><div class="detail-gallery">${images}</div></section>
      <section class="event-next"><p>HAVE A MOMENT IN MIND?</p><h2>LET'S MAKE IT<br><em>HAPPEN.</em></h2><a class="contact-button" href="mailto:mjevents20@gmail.com">CONTACT MJ EVENTS <span>↗</span></a></section>`;
  }
})();