document.addEventListener("DOMContentLoaded", () => {

/* =========================================
ELEMENTS
========================================= */

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const backToTop = document.querySelector(".back-to-top");
const year = document.getElementById("year");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

const revealElements = document.querySelectorAll(".reveal");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const modal = document.querySelector(".project-modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");

const modalLabel = document.querySelector(".modal-label");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalTech = document.querySelector(".modal-tech");

const toast = document.getElementById("toast");

/* =========================================
CURRENT YEAR
========================================= */

if (year) {
year.textContent = new Date().getFullYear();
}

/* =========================================
MOBILE NAVIGATION
========================================= */

if (menuToggle && navMenu) {

menuToggle.addEventListener("click", () => {

  const isOpen = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});

}

/* =========================================
NAVBAR SCROLL EFFECT
========================================= */

const updateNavbar = () => {

if (!navbar) return;

if (window.scrollY > 35) {
  navbar.classList.add("scrolled");
} else {
  navbar.classList.remove("scrolled");
}

};

/* =========================================
ACTIVE NAVIGATION
========================================= */

const updateActiveNav = () => {

let currentSection = "";

const scrollPosition =
  window.scrollY + window.innerHeight * 0.35;


sections.forEach(section => {

  const sectionTop = section.offsetTop;

  const sectionBottom =
    sectionTop + section.offsetHeight;


  if (
    scrollPosition >= sectionTop &&
    scrollPosition < sectionBottom
  ) {
    currentSection = section.id;
  }

});


navLinks.forEach(link => {

  link.classList.remove("active");

  if (
    link.getAttribute("href") ===
    `#${currentSection}`
  ) {
    link.classList.add("active");
  }

});

};

/* =========================================
SCROLL REVEAL
========================================= */

const revealObserver =
new IntersectionObserver(
entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
  }
);

revealElements.forEach(element => {

revealObserver.observe(element);

});

/* =========================================
PROJECT FILTERING
========================================= */

filterButtons.forEach(button => {

button.addEventListener("click", () => {

  const filter =
    button.dataset.filter;


  filterButtons.forEach(btn => {

    btn.classList.remove("active");

  });


  button.classList.add("active");


  projectCards.forEach(card => {

    const category =
      card.dataset.category || "";


    if (
      filter === "all" ||
      category.includes(filter)
    ) {

      card.classList.remove("hidden");

      requestAnimationFrame(() => {

        card.style.opacity = "1";
        card.style.transform = "";

      });

    } else {

      card.classList.add("hidden");

    }

  });

});

});

/* =========================================
PROJECT MODAL
========================================= */

const projectData = {

"HR Onboarding Checklist Assistant": {
  label: "FULL-STACK · INTELLIGENT SEARCH",

  description:
    "A full-stack employee onboarding platform with separate employee and HR workflows. The system combines FastAPI and SQLite with a React interface, semantic search using transformer embeddings and cosine similarity, automated reminders, SMTP workflows and audit logging.",

  tech: [
    "Python",
    "FastAPI",
    "React.js",
    "SQLite",
    "Transformer Embeddings",
    "Cosine Similarity",
    "APScheduler",
    "SMTP"
  ]
},


"Multi-Vendor Canteen Management": {
  label: "FULL-STACK · ROLE-BASED SYSTEM",

  description:
    "A responsive canteen management platform designed around customer and vendor workflows. The application includes multiple vendor dashboards, menu management, order processing, role-based access and real-time order tracking.",

  tech: [
    "React.js",
    "Tailwind CSS",
    "REST APIs",
    "Role-Based Access",
    "Order Tracking"
  ]
},


"Self-Balancing Robot": {
  label: "ROBOTICS · CONTROL SYSTEMS",

  description:
    "A simulation-based robotics project focused on autonomous balancing and stable locomotion. The workflow uses ROS 2, Gazebo and CoppeliaSim while exploring PID control and physics-based robot simulation.",

  tech: [
    "ROS 2",
    "Gazebo",
    "CoppeliaSim",
    "PID Control",
    "Robot Simulation"
  ]
},


"ECG Monitoring System": {
  label: "BIOMEDICAL · HARDWARE",

  description:
    "A collaborative ECG monitoring project developed during the Young Technology Scholars program at Plaksha University. The project explored biosensor-based signal acquisition, signal processing and microcontroller integration.",

  tech: [
    "Bio-sensors",
    "Signal Processing",
    "Microcontrollers",
    "Biomedical Engineering"
  ]
},


"Interactive Escape Room": {
  label: "PROTOTYPING · ARDUINO",

  description:
    "An interactive multi-stage escape room prototype built with Arduino, sensors, LEDs and control logic. The project focused on hands-on electronics, prototyping and hardware-software integration.",

  tech: [
    "Arduino",
    "Python",
    "Sensors",
    "LEDs",
    "Hardware Prototyping"
  ]
},


"FTC Autonomous Routines": {
  label: "COMPUTER VISION · ROBOTICS",

  description:
    "Autonomous robotics work completed as Programming Team Lead for an all-girls FIRST Tech Challenge team. Developed Java-based autonomous routines and integrated computer vision for object detection across two competition seasons.",

  tech: [
    "Java",
    "Computer Vision",
    "FIRST Tech Challenge",
    "Autonomous Robotics"
  ]
}

};

const openProjectModal = card => {

const title =
  card.querySelector("h3")?.textContent.trim();


const data = projectData[title];


if (!data || !modal) return;


modalLabel.textContent = data.label;

modalTitle.textContent = title;

modalDescription.textContent =
  data.description;


modalTech.innerHTML = "";


data.tech.forEach(technology => {

  const span =
    document.createElement("span");

  span.textContent = technology;

  modalTech.appendChild(span);

});


modal.classList.add("active");

modal.setAttribute(
  "aria-hidden",
  "false"
);

document.body.classList.add("modal-open");

};

const closeProjectModal = () => {

if (!modal) return;

modal.classList.remove("active");

modal.setAttribute(
  "aria-hidden",
  "true"
);

document.body.classList.remove("modal-open");

};

projectCards.forEach(card => {

card.addEventListener("click", event => {

  /*
   * Don't open modal when selecting
   * text or clicking a future interactive
   * element inside the card.
   */

  if (
    event.target.closest("a") ||
    event.target.closest("button")
  ) {
    return;
  }


  openProjectModal(card);

});

card.style.cursor = "pointer";

});

if (modalClose) {

modalClose.addEventListener(
  "click",
  closeProjectModal
);

}

if (modalOverlay) {

modalOverlay.addEventListener(
  "click",
  closeProjectModal
);

}

document.addEventListener(
"keydown",
event => {

  if (event.key === "Escape") {

    closeProjectModal();

  }

}

);

/* =========================================
BACK TO TOP
========================================= */

const updateBackToTop = () => {

if (!backToTop) return;

if (window.scrollY > 650) {

  backToTop.classList.add("show");

} else {

  backToTop.classList.remove("show");

}

};

if (backToTop) {

backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

}

/* =========================================
EMAIL COPY
========================================= */

const emailLinks =
document.querySelectorAll(
'a[href^="mailto:"]'
);

emailLinks.forEach(link => {

link.addEventListener(
  "contextmenu",
  async event => {

    event.preventDefault();

    const email =
      "salonikori1314@gmail.com";


    try {

      await navigator.clipboard.writeText(email);

      showToast("Email copied to clipboard");

    } catch {

      showToast(
        "Email: salonikori1314@gmail.com"
      );

    }

  }
);

});

function showToast(message) {

if (!toast) return;

toast.textContent = message;

toast.classList.add("show");


setTimeout(() => {

  toast.classList.remove("show");

}, 2300);

}

/* =========================================
HERO MOUSE PARALLAX
========================================= */

const heroGrid =
document.querySelector(".hero-grid");

if (
heroGrid &&
window.matchMedia("(pointer:fine)").matches
) {

document.addEventListener(
  "mousemove",
  event => {

    const x =
      (event.clientX / window.innerWidth - .5) * 10;

    const y =
      (event.clientY / window.innerHeight - .5) * 10;


    heroGrid.style.transform =
      `translate(${x}px, ${y}px)`;

  }
);

}

/* =========================================
SCROLL EVENTS
========================================= */

let ticking = false;

const handleScroll = () => {

if (!ticking) {

  window.requestAnimationFrame(() => {

    updateNavbar();

    updateActiveNav();

    updateBackToTop();

    ticking = false;

  });

  ticking = true;

}

};

window.addEventListener(
"scroll",
handleScroll,
{ passive: true }
);

/* =========================================
INITIAL STATE
========================================= */

updateNavbar();

updateActiveNav();

updateBackToTop();

});
