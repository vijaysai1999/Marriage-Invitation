/* ==========================================================
   ALWAYS START AT TOP
========================================================== */

if ("scrollRestoration" in history) {

  history.scrollRestoration = "manual";

}

window.onbeforeunload = () => {

  window.scrollTo(0, 0);

};
/* ==========================================================
   V4 APPLE IOS 27 WEDDING EXPERIENCE
========================================================== */

"use strict";

const preloader =
document.getElementById(
  "preloader"
);

if(window.innerWidth > 768){

  document
  .querySelector(".countdown-header")
  ?.remove();

}
/* =========================================
   REMOVE MOBILE UI ON DESKTOP
========================================= */

if(window.innerWidth > 768){

  document
    .querySelector(".mobile-menu-overlay")
    ?.remove();

  document
    .querySelector(".mobile-nav-btn")
    ?.remove();

}
/* ==========================================================
   DOM REFERENCES
========================================================== */


const musicBtn =
document.getElementById(
  "musicControl"
);

const bgMusic =
document.getElementById(
  "bgMusic"
);

const saveDateBtn =
document.getElementById(
  "saveDateButton"
);

const daysEl =
document.getElementById(
  "days"
);

const hoursEl =
document.getElementById(
  "hours"
);

const minutesEl =
document.getElementById(
  "minutes"
);

const secondsEl =
document.getElementById(
  "seconds"
);

const stickyDaysEl = document.getElementById("stickyDays");
const stickyHoursEl = document.getElementById("stickyHours");
const stickyMinutesEl = document.getElementById("stickyMinutes");
const stickySecondsEl = document.getElementById("stickySeconds");

function escapeHTML(str){

  const div =
    document.createElement("div");

  div.textContent =
    str || "";

  return div.innerHTML;

}

/* ==========================================================
   PERFORMANCE SETTINGS
========================================================== */

const IS_MOBILE =
window.innerWidth <= 768;

/* ==========================================================
   PRELOADER
========================================================== */

document.body.style.overflow = "hidden";

function preloadImages() {
  const images = [
    "assets/images/hero-couple.jpg",
    "assets/images/bride.jpg",
    "assets/images/groom.jpg",
    "assets/images/tata-logo.jpg",
    "assets/images/bmw-logo.jpg"
  ];

  const percentEl = document.querySelector(".preloader-percent");
  const barFillEl = document.querySelector(".preloader-bar-fill");
  let loaded = 0;
  const total = images.length;

  function updateProgress() {
    const pct = Math.round((loaded / total) * 100);
    if (percentEl) percentEl.textContent = pct + "%";
    if (barFillEl) barFillEl.style.width = pct + "%";
  }

  return new Promise((resolve) => {
    if (total === 0) { updateProgress(); resolve(); return; }

    images.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        updateProgress();
        if (loaded >= total) resolve();
      };
      img.src = src;
    });

    setTimeout(() => {
      loaded = total;
      updateProgress();
      resolve();
    }, 6000);
  });
}

function hidePreloader() {
  if(preloader){
    gsap.to(preloader,{
      opacity:0,
      duration:1,
      onComplete(){
        preloader.remove();
        document.body.style.overflow = "";
        window.scrollTo(0,0);
        if(typeof fireConfetti === "function") fireConfetti();
        if(typeof playChime === "function") setTimeout(playChime, 300);
        window.dispatchEvent(new Event("preloaderDone"));
      }
    });
  } else {
    document.body.style.overflow = "";
  }
}

/* ==========================================================
   TOAST (must be global — used outside GSAP block)
========================================================== */

function showToast(message){
  const toast = document.createElement("div");
  toast.className = "wedding-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add("show"); }, 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.remove(); }, 400);
  }, 3000);
}

window.addEventListener("load", () => {

  window.scrollTo(0,0);

  preloadImages().then(() => {
    setTimeout(hidePreloader, 1500);
  });

  window.addEventListener("preloaderDone", () => {
    setTimeout(function(){ showToast("\uD83D\uDC8E Welcome to Sandeep & Sathiyapriya's Wedding Experience"); }, 800);
    setTimeout(function(){ showToast("\uD83C\uDFB6 Tap the music button for a better experience!"); }, 3500);
  });

  if(
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
  ){

    gsap.registerPlugin(
      ScrollTrigger
    );

    /* ---------------------------------------
   Hero Photo Motion
--------------------------------------- */

gsap.to(
  ".hero-image-wrapper img",
  {

    y: -8,

    scale: 1.015,

    duration: 7,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",

    force3D: true

  }
);

/* ---------------------------------------
   Parallax Depth Effect
--------------------------------------- */

gsap.to(".hero-image-wrapper", {
  y: IS_MOBILE ? 40 : 80,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-v4",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});

gsap.to(".hero-content", {
  y: IS_MOBILE ? -20 : -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-v4",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});

gsap.to(".site-bg-temple", {
  y: 80,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2
  }
});

gsap.to(".site-bg-mandala-left", {
  y: 50,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 3
  }
});

gsap.to(".site-bg-mandala-right", {
  y: 60,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2.5
  }
});

/* ---------------------------------------
   Hero Luxury Timeline
--------------------------------------- */

let heroAnimated = false;

gsap.set(".hero-name-top, .hero-infinity, .hero-name-bottom, .hero-date, .hero-location, .hero-actions a, .hero-actions button", {
  opacity: 1, y: 0, scale: 1, rotation: 0
});

gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: ".hero-v4",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
})
.to(".hero-name-top", { opacity: 0, y: -60 })
.to(".hero-infinity", { opacity: 0, scale: 0.6, rotation: 15 }, "-=0.7")
.to(".hero-name-bottom", { opacity: 0, y: -60 }, "-=0.7")
.to(".hero-date", { opacity: 0, y: -30 }, "-=0.5")
.to(".hero-location", { opacity: 0, y: -30 }, "-=0.5")
.to(".hero-actions a, .hero-actions button", { opacity: 0, y: -20, stagger: 0.06 }, "-=0.3");


/* ==========================================================
   MOBILE MENU V5
========================================================== */

(function initMobileMenu(){
  const menuBtn =
    document.getElementById("mobileMenuBtn");

  const miniMenuBtn =
    document.getElementById("miniMenuBtn");

  const menuOverlay =
    document.querySelector(".mobile-menu-overlay");

  const closeBtn =
    document.querySelector(".mobile-menu-close");

  if (!menuBtn || !menuOverlay) return;

  miniMenuBtn?.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    menuBtn?.classList.add("active");
    miniMenuBtn.classList.add("active");
  });

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    miniMenuBtn?.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  });

  closeBtn?.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    menuBtn.classList.remove("active");
    miniMenuBtn?.classList.remove("active");
  });

  document
    .querySelectorAll(".mobile-menu-inner a")
    .forEach(link => {
      link.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
})();

/* ==========================================================
   COUNTDOWN
========================================================== */

const weddingDate =
new Date(
  "2026-08-30T07:30:00"
);

function animateCountdownValue(el, newVal, pad) {
  if (!el) return;
  const formatted = pad
    ? String(newVal).padStart(2, "0")
    : String(newVal);
  if (el.textContent !== formatted) {
    el.textContent = formatted;
    el.classList.add("tick");
    setTimeout(() => el.classList.remove("tick"), 300);
  }
}

function spawnParticles(container) {
  if (!container) return;
  const colors = ["#c9a227", "#ff7ba7", "#f1d778", "#ffd3e2"];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("span");
    p.className = "count-particle";
    const angle = (Math.PI * 2 * i) / 6;
    const dist = 20 + Math.random() * 30;
    p.style.setProperty("--px", Math.cos(angle) * dist + "px");
    p.style.setProperty("--py", Math.sin(angle) * dist + "px");
    p.style.background = colors[i % colors.length];
    p.style.left = "50%";
    p.style.top = "50%";
    container.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

let prevSeconds = -1;

function updateCountdown(){

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now =
  new Date();

  const diff =
  weddingDate - now;

  if(diff <= 0){

    daysEl.textContent =
    "00";

    hoursEl.textContent =
    "00";

    minutesEl.textContent =
    "00";

    secondsEl.textContent =
    "00";

    return;
  }

  const days =
  Math.floor(
    diff /
    (1000*60*60*24)
  );

  const hours =
  Math.floor(
    (
      diff %
      (1000*60*60*24)
    ) /
    (1000*60*60)
  );

  const minutes =
  Math.floor(
    (
      diff %
      (1000*60*60)
    ) /
    (1000*60)
  );

  const seconds =
  Math.floor(
    (
      diff %
      (1000*60)
    ) /
    1000
  );

  animateCountdownValue(daysEl, days, true);
  animateCountdownValue(hoursEl, hours, true);
  animateCountdownValue(minutesEl, minutes, true);
  animateCountdownValue(secondsEl, seconds, true);

  if (seconds !== prevSeconds) {
    spawnParticles(document.getElementById("particlesContainer"));
    prevSeconds = seconds;
  }

  if(stickyDaysEl){

    animateCountdownValue(stickyDaysEl, days, false);
    animateCountdownValue(stickyHoursEl, hours, false);
    animateCountdownValue(stickyMinutesEl, minutes, false);

    const sFormatted = String(seconds);
    if (stickySecondsEl.textContent !== sFormatted) {
      stickySecondsEl.textContent = sFormatted;
      stickySecondsEl.classList.add("tick");
      setTimeout(() => stickySecondsEl.classList.remove("tick"), 300);
    }

  }

}

updateCountdown();

setInterval(
  updateCountdown,
  1000
);

/* ==========================================================
   MUSIC PLAYER
========================================================== */

let musicPlaying =
false;

musicBtn?.addEventListener(
  "click",
  async() => {

    try{

      const src = bgMusic.querySelector("source[data-src]");
      if(src && !src.getAttribute("src")){
        src.src = src.dataset.src;
        bgMusic.load();
      }

      if(!musicPlaying){

        await bgMusic.play();

        musicPlaying =
        true;

        musicBtn.innerHTML =
        "❚❚";

        musicBtn.classList.add(
          "playing"
        );

        showToast(
          "🎵 Music Enabled"
        );

      }else{

        bgMusic.pause();

        musicPlaying =
        false;

        musicBtn.innerHTML =
        "♫";

        musicBtn.classList.remove(
          "playing"
        );

        showToast(
          "🔇 Music Disabled"
        );

      }

    }catch(err){

      console.error(err);

    }

  }
);

/* ==========================================================
   SAVE TO CALENDAR
========================================================== */

saveDateBtn?.addEventListener(
  "click",
  () => {

    const start =
    "20260830T020000Z";

    const end =
    "20260830T050000Z";

    const title =
    encodeURIComponent(
      "Sandeepkumar & Sathiyapriya Wedding"
    );

    const location =
    encodeURIComponent(
      "Sri Abirameshwarar Temple, Thiruvamathur"
    );

    const details =
    encodeURIComponent(
      "We would be delighted to celebrate this special day with you."
    );

    const googleUrl =

`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(
      googleUrl,
      "_blank",
      "noopener,noreferrer"
    );

  }
);

/* ==========================================================
   APPLE STYLE SCROLL REVEALS
========================================================== */

gsap.registerPlugin(
  ScrollTrigger
);

gsap.utils
.toArray(
`
.story-section,
.families-v4,
.family-showcase,
.journey-v4,
.countdown-v4,
.venue-v4,
.blessings-v4,
.footer-premium
`
)
.forEach(section=>{

  gsap.fromTo(
    section,
    { y:60, opacity:0, scale:0.97, filter:"blur(10px)" },
    {
      y:0, opacity:1, scale:1, filter:"blur(0px)",
      ease:"none",
      scrollTrigger:{
        trigger:section,
        start:"top 90%",
        end:"top 40%",
        scrub:1
      }
    }
  );

});

/* ==========================================================
   SECTION HEADINGS
========================================================== */

gsap.utils
.toArray(".section-heading")
.forEach(heading => {

  gsap.fromTo(heading,
    { y: 80, opacity: 0, scale: 0.95, filter: "blur(8px)" },
    {
      y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
      ease: "none",
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        end: "top 50%",
        scrub: 1
      }
    }
  );

});
/* ==========================================================
   STORY TITLES
========================================================== */

gsap.utils
.toArray(".story-content h2")
.forEach(title => {

  gsap.fromTo(title,
    { x: -100, opacity: 0 },
    {
      x: 0, opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: title,
        start: "top 88%",
        end: "top 50%",
        scrub: 1
      }
    }
  );

});
/* ==========================================================
   DEGREE CHIPS
========================================================== */

gsap.fromTo(
  ".story-degree,.career-chip",
  { scale: 0, opacity: 0 },
  {
    scale: 1, opacity: 1,
    stagger: .15,
    ease: "none",
    scrollTrigger: {
      trigger: ".story-section",
      start: "top 80%",
      end: "top 40%",
      scrub: 1
    }
  }
);

/* ==========================================================
   PARAGRAPH REVEAL
========================================================== */

gsap.utils
.toArray(".story-content p")
.forEach(paragraph => {

  gsap.fromTo(paragraph,
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: paragraph,
        start: "top 90%",
        end: "top 60%",
        scrub: 1
      }
    }
  );

});

/* ==========================================================
   TIMELINE CARDS
========================================================== */

gsap.fromTo(".reception-card",
  { x: -120, opacity: 0 },
  {
    x: 0, opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".reception-card",
      start: "top 88%",
      end: "top 50%",
      scrub: 1
    }
  }
);

gsap.fromTo(".wedding-card",
  { x: 120, opacity: 0 },
  {
    x: 0, opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".wedding-card",
      start: "top 88%",
      end: "top 50%",
      scrub: 1
    }
  }
);

/* ==========================================================
   FAMILY NAMES
========================================================== */

gsap.fromTo(".parent-name",
  { scale: 0.5, opacity: 0 },
  {
    scale: 1, opacity: 1,
    stagger: .15,
    ease: "none",
    scrollTrigger: {
      trigger: ".families-v4",
      start: "top 80%",
      end: "top 40%",
      scrub: 1
    }
  }
);

gsap.fromTo(".family-label",
  { y: 40, opacity: 0 },
  {
    y: 0, opacity: 1,
    stagger: .2,
    ease: "none",
    scrollTrigger: {
      trigger: ".families-v4",
      start: "top 85%",
      end: "top 50%",
      scrub: 1
    }
  }
);

gsap.fromTo(".family-glow",
  { scale: 0, rotation: 180, opacity: 0 },
  {
    scale: 1, rotation: 0, opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".family-glow",
      start: "top 85%",
      end: "top 40%",
      scrub: 1
    }
  }
);

if(document.querySelector(".family-luxury-card h3")){
  gsap.fromTo(".family-luxury-card h3",
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1,
      stagger: .2,
      ease: "none",
      scrollTrigger: {
        trigger: ".family-luxury-card",
        start: "top 85%",
        end: "top 50%",
        scrub: 1
      }
    }
  );
}
/* ==========================================================
   BLESSINGS LOUNGE V4
========================================================== */

const wishForm =
document.getElementById(
  "wishForm"
);

const wishCounter =
document.getElementById(
  "wishCounter"
);

const activeWish =
document.getElementById(
  "activeWish"
);

const prevWishBtn =
document.getElementById(
  "prevWish"
);

const nextWishBtn =
document.getElementById(
  "nextWish"
);

/* ==========================================================
   STATE
========================================================== */

let wishes = [];

let currentWishIndex = 0;

/* ==========================================================
   ABSTRACT GENDER-NEUTRAL AVATARS
========================================================== */

const avatarPalettes = [
  { bg: "#FFF0E6", ring: "#E8A060", accent: "#FF7BA7", dot: "#FFD3E2" },
  { bg: "#FFF8E6", ring: "#D4A850", accent: "#FF9AC9", dot: "#FFE8CC" },
  { bg: "#F0F0FF", ring: "#9090C0", accent: "#B0A0E0", dot: "#D8D8F8" },
  { bg: "#E8F8F0", ring: "#60B890", accent: "#80D4B0", dot: "#C0F0E0" },
  { bg: "#FFE8E8", ring: "#D08080", accent: "#FF9090", dot: "#FFD0D0" },
  { bg: "#F0F0FF", ring: "#8080B0", accent: "#A0A0D8", dot: "#D0D0F0" },
  { bg: "#FFF5F0", ring: "#D09070", accent: "#FFB090", dot: "#FFE0D0" },
  { bg: "#F5F0FF", ring: "#A080C0", accent: "#C0A0E8", dot: "#E0D0FF" }
];

const faceExpressions = [
  { eyes: "happy", mouth: "smile" },
  { eyes: "open", mouth: "grin" },
  { eyes: "wink", mouth: "smile" },
  { eyes: "happy", mouth: "open" },
  { eyes: "sparkle", mouth: "smile" },
  { eyes: "open", mouth: "neutral" }
];

function pickArr(arr, seed) {
  return arr[Math.abs(seed) % arr.length];
}

function generateNeutralAvatar(name, wishId) {
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) + (wishId || 0);
  const pal = pickArr(avatarPalettes, seed);
  const expr = pickArr(faceExpressions, seed + 1);
  const uid = "na" + Date.now().toString(36) + (wishId || 0);

  /* --- initials --- */
  const initials = (name || "?")
    .trim().split(" ")
    .map(w => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  /* --- eyes --- */
  let eyesSvg = "";
  if (expr.eyes === "happy") {
    eyesSvg = `
      <path d="M30 40 Q36 35 42 40" stroke="${pal.ring}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M58 40 Q64 35 70 40" stroke="${pal.ring}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  } else if (expr.eyes === "wink") {
    eyesSvg = `
      <circle cx="36" cy="39" r="3.5" fill="${pal.ring}"/>
      <circle cx="35" cy="38" r="1.2" fill="white"/>
      <path d="M58 40 Q64 35 70 40" stroke="${pal.ring}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  } else if (expr.eyes === "sparkle") {
    eyesSvg = `
      <circle cx="36" cy="39" r="4" fill="${pal.ring}"/>
      <circle cx="34" cy="37.5" r="1.8" fill="white"/>
      <circle cx="38" cy="41" r="0.8" fill="white" opacity="0.6"/>
      <circle cx="64" cy="39" r="4" fill="${pal.ring}"/>
      <circle cx="62" cy="37.5" r="1.8" fill="white"/>
      <circle cx="66" cy="41" r="0.8" fill="white" opacity="0.6"/>`;
  } else {
    eyesSvg = `
      <circle cx="36" cy="39" r="3.5" fill="${pal.ring}"/>
      <circle cx="35" cy="38" r="1.2" fill="white"/>
      <circle cx="64" cy="39" r="3.5" fill="${pal.ring}"/>
      <circle cx="63" cy="38" r="1.2" fill="white"/>`;
  }

  /* --- mouth --- */
  let mouthSvg = "";
  if (expr.mouth === "smile") {
    mouthSvg = `<path d="M40 54 Q50 62 60 54" stroke="${pal.accent}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  } else if (expr.mouth === "grin") {
    mouthSvg = `
      <path d="M38 53 Q50 65 62 53" stroke="${pal.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M41 54 Q50 61 59 54" fill="white" opacity="0.5"/>`;
  } else if (expr.mouth === "open") {
    mouthSvg = `<ellipse cx="50" cy="55" rx="5" ry="4" fill="${pal.accent}" opacity="0.7"/>`;
  } else {
    mouthSvg = `<path d="M42 55 Q50 58 58 55" stroke="${pal.ring}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  }

  /* --- decorative dots --- */
  const dots = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 * i) / 6 + (seed * 0.5);
    const r = 42 + (i % 2) * 4;
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    const size = 1.5 + (i % 3) * 0.5;
    dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}" fill="${pal.dot}" opacity="${0.4 + (i % 3) * 0.15}"/>`);
  }

  const svg = `
    <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ag${uid}" cx="50%" cy="40%">
          <stop offset="0%" stop-color="${pal.bg}"/>
          <stop offset="100%" stop-color="${pal.dot}"/>
        </radialGradient>
      </defs>

      <!-- decorative dots -->
      <g class="avatar-dots">${dots.join("")}</g>

      <!-- main circle -->
      <circle cx="50" cy="50" r="38" fill="url(#ag${uid})" stroke="${pal.ring}" stroke-width="2" opacity="0.95"/>

      <!-- inner ring -->
      <circle cx="50" cy="50" r="35" fill="none" stroke="${pal.ring}" stroke-width="0.5" opacity="0.3"/>

      <!-- eyes -->
      <g class="avatar-eyes">${eyesSvg}</g>

      <!-- mouth -->
      <g class="avatar-mouth">${mouthSvg}</g>

      <!-- initials overlay -->
      <text x="50" y="82" text-anchor="middle" fill="${pal.ring}" font-family="'Cormorant Garamond', serif" font-size="11" font-weight="600" opacity="0.7">${initials}</text>
    </svg>
  `;

  return svg;
}

/* ==========================================================
   RENDER WISH
========================================================== */

function renderWish(){

  if(!activeWish) return;

  if(!wishes.length){

    activeWish.innerHTML = `

      <div class="wish-empty-state">

        <div class="wish-empty-icon">

          💌

        </div>

        <h3>

          Be The First To Leave
          Your Wishes

        </h3>

      </div>

    `;

    wishCounter.textContent =
    "0 / 0";

    return;
  }

  const wish =
  wishes[currentWishIndex];

  activeWish.innerHTML = `

    <div class="wish-card-v4">

      <div class="wish-avatar">

        ${generateNeutralAvatar(
          wish.guest_name,
          wish.id
        )}

      </div>

      <h3>

        ${escapeHTML(wish.guest_name) || "Guest"}

      </h3>

      <div class="wish-role">

        ${escapeHTML(wish.relation) || "Well Wisher"}

      </div>

      <p>

        ${escapeHTML(wish.guest_message) || ""}

      </p>

<div class="wish-actions">

            <button
    class="wish-like-btn"
    data-id="${wish.id}">

                💖

                <span class="wish-like-count">
                    ${wish.likes || 0}
                </span>

            </button>

        </div>

    </div>

  `;

  wishCounter.textContent =

  `${currentWishIndex + 1}
   /
   ${wishes.length}`;

  if(typeof updateWishCounter === "function") updateWishCounter();

}

/* ==========================================================
   WISH LIKE SYSTEM
========================================================== */

document.addEventListener(
  "click",
  async (e) => {

    const btn =
    e.target.closest(
      ".wish-like-btn"
    );

    if(!btn) return;

    const wishId =
    btn.dataset.id;

    if(!wishId) return;

    const storageKey =
    `wish-liked-${wishId}`;

    if(
      localStorage.getItem(
        storageKey
      )
){

  btn.disabled = true;

  btn.classList.add(
    "liked"
  );

      showToast(
        "💖 You already liked this wish"
      );

      return;
    }

    const countSpan =
    btn.querySelector(
      ".wish-like-count"
    );

    const currentCount =
    parseInt(
      countSpan.textContent
    ) || 0;

    const newCount =
currentCount + 1;

countSpan.textContent =
newCount;

const { data, error } = await window.db

.from("wedding_wishes")

.update({
  likes:newCount
})

.eq("id", Number(wishId))

.select();


if(error){

  console.error(error);

  return;

}

localStorage.setItem(
  storageKey,
  "true"
);


  }
);


/* ==========================================================
   LOAD WISHES
========================================================== */

async function loadWishes(){

  if(!window.db){

    console.warn(
      "Supabase client not found"
    );

    return;
  }

  try{

    const {
      data,
      error
    } = await window.db

    .from(
      "wedding_wishes"
    )

    .select("*")

    .order(
      "created_at",
      {
        ascending:false
      }
    );

    if(error){

      console.error(error);

      return;
    }

    wishes = data || [];

    if(
      currentWishIndex >
      wishes.length - 1
    ){

      currentWishIndex = 0;

    }

    renderWish();

  }catch(err){

    console.error(err);

  }

}

/* ==========================================================
   NEXT
========================================================== */

nextWishBtn?.addEventListener(
  "click",
  () => {

    if(!wishes.length)
      return;

    currentWishIndex++;

    if(
      currentWishIndex >=
      wishes.length
    ){

      currentWishIndex = 0;

    }

    renderWish();

  }
);

/* ==========================================================
   PREVIOUS
========================================================== */

prevWishBtn?.addEventListener(
  "click",
  () => {

    if(!wishes.length)
      return;

    currentWishIndex--;

    if(
      currentWishIndex < 0
    ){

      currentWishIndex =
      wishes.length - 1;

    }

    renderWish();

  }
);

/* ==========================================================
   MOBILE SWIPE SUPPORT
========================================================== */

let touchStartX = 0;
let touchEndX = 0;

activeWish?.addEventListener(
  "touchstart",
  e => {

    touchStartX =
    e.changedTouches[0].screenX;

  }
);

activeWish?.addEventListener(
  "touchend",
  e => {

    touchEndX =
    e.changedTouches[0].screenX;

    handleSwipe();

  }
);

function handleSwipe(){

  const distance =
  touchEndX - touchStartX;

  if(Math.abs(distance) < 50)
    return;

  if(distance < 0){

    nextWishBtn?.click();

  }else{

    prevWishBtn?.click();

  }

}

/* ==========================================================
   INITIAL LOAD
========================================================== */

loadWishes();

/* ==========================================================
   AUTO REFRESH
========================================================== */

setInterval(
  loadWishes,
  30000
);

/* ==========================================================
   WISH SUBMISSION
========================================================== */

wishForm?.addEventListener(
  "submit",
  async(e)=>{

    e.preventDefault();

    const guestName =
    document
    .getElementById(
      "guestName"
    )
    .value
    .trim();

    const relation =
    document
    .getElementById(
      "guestRelation"
    )
    .value
    .trim();

    const guestWish =
    document
    .getElementById(
      "guestWish"
    )
    .value
    .trim();

    if(
      !guestName ||
      !relation ||
      !guestWish
    ){

      showToast(
        "Please fill all fields."
      );

      return;
    }

    /* =====================================
       OPTIMISTIC UI
    ===================================== */

    const optimisticWish = {

      id: -Date.now(),

      guest_name:
      guestName,

      relation:
      relation,

      guest_message:
      guestWish,

      created_at:
      new Date()
      .toISOString()

    };

    wishes.unshift(
      optimisticWish
    );

    currentWishIndex = 0;

    renderWish();

    wishForm.reset();

    showToast(
      "💌 Thank you for your wishes!"
    );

    if(typeof fireConfetti === "function"){
      fireConfetti();
    }
    if(typeof firePetalBurst === "function"){
      firePetalBurst();
    }

    /* =====================================
       SAVE TO SUPABASE
    ===================================== */

    if(!window.db){

      console.warn(
        "Supabase unavailable"
      );

      return;
    }

    try{

      const {
        error
      } = await window.db

      .from(
        "wedding_wishes"
      )

      .insert([
        {
          guest_name:
          guestName,

          relation:
          relation,

          guest_message:
          guestWish
        }
      ]);

      if(error){

        console.error(
          error
        );

        showToast(
          "Message saved locally. Refreshing..."
        );

        await loadWishes();

        return;
      }

      setTimeout(
        loadWishes,
        1000
      );

    }catch(err){

      console.error(err);

    }

  }
);

/* ==========================================================
   SMOOTH ANCHOR SCROLLING
========================================================== */

document
.querySelectorAll(
  'a[href^="#"]'
)
.forEach(link=>{

  link.addEventListener(
    "click",
    e=>{

      const targetId =
      link.getAttribute(
        "href"
      );

      if(
        !targetId ||
        targetId === "#"
      ){
        return;
      }

      const target =
      document.querySelector(
        targetId
      );

      if(!target)
        return;

      e.preventDefault();

const navHeight = 100;

window.scrollTo({
  top:
    target.offsetTop - navHeight,
  behavior: "smooth"
});

    }
  );

});

/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

const navbar =
document.querySelector(
  ".glass-nav"
);

window.addEventListener(
  "scroll",
  ()=>{

    if(
      window.scrollY > 50
    ){

      navbar?.classList.add(
        "scrolled"
      );

    }else{

      navbar?.classList.remove(
        "scrolled"
      );

    }

  },
  { passive: true }
);

/* ==========================================================
   IOS 27 FLOATING EFFECT
========================================================== */

  document
  .querySelectorAll(
    ".family-panel,.timeline-card,.venue-card,.footer-premium-card"
  )
  .forEach(card=>{

    let ticking = false;

    card.addEventListener(
      "mousemove",
      e=>{

        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {

          const rect =
          card.getBoundingClientRect();

          const x =
          e.clientX -
          rect.left;

          const y =
          e.clientY -
          rect.top;

          const rotateY =
          (
            x /
            rect.width -
            0.5
          ) * 8;

          const rotateX =
          (
            y /
            rect.height -
            0.5
          ) * -8;

          card.style.transform =

          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;

          ticking = false;

        });

      }
    );

    card.addEventListener(
      "mouseleave",
      ()=>{

        card.style.transform =
        "";

      }
    );

  });

/* ==========================================================
   FIRST LOAD
========================================================== */

if(typeof initWishWall === "function") initWishWall();
if(typeof updateGuestCounters === "function") setTimeout(updateGuestCounters, 2000);

/* ==========================================================
   WELCOME TOAST — MOVED TO PRELOADER
========================================================== */

/* ==========================================================
   VENUE SWITCHER V5
========================================================== */

const venueData = {

  reception: {

    title:
    "Wedding Reception",

    description:
    "Join us on the evening of 29 August 2026 for a joyful reception filled with love, laughter and cherished memories.",

    details: [

      ["Date","29 August 2026"],
      ["Time","6:30 PM Onwards"],
      ["Venue","Jayam Mahal"]

    ],

    directions:
    "https://maps.app.goo.gl/XQd1CLPbcFSdesSe8",

    map:
    "https://maps.google.com/maps?q=Jayam%20Mahal%20Villupuram&t=&z=15&ie=UTF8&iwloc=&output=embed"

  },

  wedding: {

    title:
    "Sacred Muhurtham",

    description:
    "The wedding ceremony will take place at Sri Abirameshwarar Temple, Thiruvamathur. We warmly invite you to bless the couple during this auspicious occasion.",

    details: [

      ["Date","30 August 2026"],
      ["Muhurtham","7:30 AM \u2013 9:00 AM"],
      ["Venue","Sri Abirameshwarar Temple, Thiruvamathur"]

    ],

    directions:
    "https://maps.app.goo.gl/czJdGR5sQNPjzD1h6",

    map:
    "https://maps.google.com/maps?q=Sri%20Abirameshwarar%20Temple%20Thiruvamathur&t=&z=15&ie=UTF8&iwloc=&output=embed"

  },

  feast: {

    title:
    "Breakfast",

    description:
    "Following the Sacred Muhurtham, breakfast will be served at Jayam Mahal. We warmly welcome everyone to continue the celebrations with us.",

    details: [

      ["Date","30 August 2026"],
      ["Time","After Muhurtham"],
      ["Venue","Jayam Mahal"]

    ],

    directions:
    "https://maps.app.goo.gl/XQd1CLPbcFSdesSe8",

    map:
    "https://maps.google.com/maps?q=Jayam%20Mahal%20Villupuram&t=&z=15&ie=UTF8&iwloc=&output=embed"

  }

};

/* ==========================================================
   LOAD VENUE
========================================================== */

function loadVenue(key){

  const venue = venueData[key];

  if(!venue) return;

  const venueContent =
  document.getElementById(
    "venueContent"
  );

  const venueMap =
  document.getElementById(
    "venueMap"
  );

  if(
    !venueContent ||
    !venueMap
  ) return;

  venueContent.innerHTML = `

    <div class="venue-card">

      <div class="venue-chip">

        ${venue.title}

      </div>

      <h3>

        ${venue.title}

      </h3>

      <p>

        ${venue.description}

      </p>

      <div class="venue-info-list">

        ${venue.details.map(item => `

          <div class="venue-info-row">

            <span>
              ${item[0]}
            </span>

            <strong>
              ${item[1]}
            </strong>

          </div>

        `).join("")}

      </div>

      <div class="venue-buttons">

        <a
        href="${venue.directions}"
        target="_blank"
        class="primary-btn">

          Get Directions

        </a>

      </div>

    </div>

  `;

  venueMap.src =
  venue.map;

}

/* ==========================================================
   INITIALIZE VENUE SWITCHER
========================================================== */

(function initVenueSwitcher(){
  const tabs = document.querySelectorAll(".venue-tab");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(btn => btn.classList.remove("active"));
      tab.classList.add("active");
      loadVenue(tab.dataset.venue);
    });
  });

  loadVenue("reception");
})();

/* ==========================================================
   AMBIENT LIGHT MOTION
========================================================== */

if(typeof gsap !== "undefined"){

  gsap.to(".light-1",{

    x:40,
    y:-30,

    duration:18,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

  });

  gsap.to(".light-2",{

    x:-50,
    y:40,

    duration:22,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

  });

  gsap.to(".light-3",{

    x:30,
    y:50,

    duration:26,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

  });

}

/* =========================================
   COUNTDOWN HEADER SWITCH
   MOBILE ONLY
========================================= */
if(window.innerWidth <= 768){

  const countdownSection =

  document.querySelector(
    ".countdown-v4"
  );

  const countdownHeader =
  document.querySelector(
    ".countdown-header"
  );

  const navbar =
  document.querySelector(
    ".glass-nav"
  );

  window.addEventListener(
    "scroll",
    () => {

      if(
        !countdownSection ||
        !countdownHeader ||
        !navbar
      ) return;

      const triggerPoint =

        countdownSection.offsetTop +
        countdownSection.offsetHeight;

      if(
        window.scrollY >
        triggerPoint - 150
      ){

        navbar.classList.add(
          "hide"
        );

        countdownHeader.classList.add(
          "active"
        );

      }else{

        navbar.classList.remove(
          "hide"
        );

        countdownHeader.classList.remove(
          "active"
        );

      }

    },
    { passive: true }
  );

}

/* ==========================================================
   UPGRADE 7: CURSOR TRAIL SPARKLE (Desktop Only)
========================================================== */

(function initCursorTrail(){
  if (window.innerWidth <= 768) return;
  if ("ontouchstart" in window) return;

  const container = document.getElementById("cursorSparkleContainer");
  if (!container) return;

  let lastTime = 0;
  const throttleMs = 50;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < throttleMs) return;
    lastTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";
    const tx = (Math.random() - 0.5) * 30;
    const ty = (Math.random() - 0.5) * 30;
    sparkle.style.setProperty("--tx", tx + "px");
    sparkle.style.setProperty("--ty", ty + "px");
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.background = Math.random() > 0.5 ? "#c9a227" : "#ff7ba7";
    sparkle.style.width = (3 + Math.random() * 4) + "px";
    sparkle.style.height = sparkle.style.width;
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  });
})();

/* ==========================================================
   UPGRADE 8: SECTION REVEAL VARIETY
========================================================== */

(function initSectionReveals(){
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const reveals = [
    { selector: ".bride-story .story-container", from: { x: -80, opacity: 0, filter: "blur(10px)" } },
    { selector: ".groom-story .story-container", from: { x: 80, opacity: 0, filter: "blur(10px)" } },
    { selector: ".save-date-card", from: { scale: 0.85, opacity: 0, filter: "blur(10px)" } },
    { selector: ".invitation-card", from: { y: 80, opacity: 0, filter: "blur(10px)" } },
    { selector: ".tamil-card", from: { y: 60, opacity: 0, filter: "blur(10px)" } },
    { selector: ".thank-you-content", from: { scale: 0.9, opacity: 0, filter: "blur(10px)" } },
    { selector: ".footer-content", from: { y: 40, opacity: 0, filter: "blur(8px)" } }
  ];

  reveals.forEach(({ selector, from }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    gsap.fromTo(el,
      from,
      {
        x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 40%",
          scrub: 1
        }
      }
    );
  });
})();

/* ==========================================================
   TYPING EFFECT ON HERO SUBTITLE (CONTINUOUS)
========================================================== */

(function initTypingEffect(){
  const typingEl = document.getElementById("heroTypingText");
  if (!typingEl) return;

  const fullText = typingEl.textContent;
  const chars = fullText.split("");
  typingEl.textContent = "";
  typingEl.style.visibility = "visible";

  const charSpans = chars.map(ch => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.opacity = "0";
    typingEl.appendChild(span);
    return span;
  });

  let i = 0;
  function typeNext() {
    if (i < charSpans.length) {
      charSpans[i].style.opacity = "1";
      i++;
      setTimeout(typeNext, 80 + Math.random() * 40);
    } else {
      setTimeout(() => {
        charSpans.forEach(s => s.style.opacity = "0");
        i = 0;
        setTimeout(typeNext, 600);
      }, 2500);
    }
  }
  setTimeout(typeNext, 1200);
})();

/* ==========================================================
   UPGRADE 11: LAZY LOAD IMAGES
========================================================== */

(function initLazyLoad(){
  const images = document.querySelectorAll("img:not(.lazy-loaded)");
  if (!images.length) return;

  images.forEach(img => {
    if (img.complete) return;
    img.classList.add("lazy-img");
    img.addEventListener("load", () => {
      img.classList.add("loaded", "lazy-loaded");
    });
    img.addEventListener("error", () => {
      img.classList.add("loaded", "lazy-loaded");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  }, { rootMargin: "100px" });

  document.querySelectorAll(".lazy-img").forEach(img => observer.observe(img));
})();

/* ==========================================================
   UPGRADE 13: CONFETTI ON WISH SUBMISSION
========================================================== */

function fireConfetti(){
  const colors = ["#c9a227", "#ff7ba7", "#f1d778", "#ffd3e2", "#fff", "#e8d5b7"];
  const shapes = ["circle", "square"];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.background = color;
    piece.style.borderRadius = shape === "circle" ? "50%" : "2px";
    piece.style.width = (5 + Math.random() * 8) + "px";
    piece.style.height = piece.style.width;
    piece.style.left = (30 + Math.random() * 40) + "vw";
    piece.style.top = (30 + Math.random() * 20) + "vh";

    const x = (Math.random() - 0.5) * 300;
    const y = 200 + Math.random() * 300;
    const rot = Math.random() * 720;
    piece.style.setProperty("--conf-x", x + "px");
    piece.style.setProperty("--conf-y", y + "px");
    piece.style.setProperty("--conf-rot", rot + "deg");
    piece.style.setProperty("--fall-duration", (1.5 + Math.random() * 1.5) + "s");

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

/* ==========================================================
   UPGRADE 14: DARK MODE TOGGLE
========================================================== */

(function initDarkMode(){
  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;

  document.body.classList.remove("dark-mode");
  toggle.textContent = "\uD83C\uDF19";

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggle.textContent = isDark ? "\u2600\uFE0F" : "\uD83C\uDF19";
    localStorage.setItem("weddingDarkMode", isDark ? "1" : "0");
    showToast(isDark ? "Dark mode enabled" : "Light mode enabled");
  });
})();

/* ==========================================================
   SOCIAL SHARE FAB
========================================================== */

(function initShareFAB(){
  const shareBar = document.getElementById("shareBar");
  const toggleBtn = document.getElementById("shareToggle");
  const whatsappBtn = document.getElementById("shareWhatsApp");
  const instagramBtn = document.getElementById("shareInstagram");
  const copyBtn = document.getElementById("shareCopy");

  if (!shareBar || !toggleBtn) return;

  const shareUrl = "https://sandeepwedssathiya.netlify.app/";
  const shareText = "You are cordially invited to celebrate the wedding of Sandeepkumar & Sathiyapriya on 29 & 30 August 2026 💕";

  setTimeout(() => shareBar.classList.add("visible"), 4500);

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    shareBar.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!shareBar.contains(e.target)) {
      shareBar.classList.remove("open");
    }
  });

  whatsappBtn?.addEventListener("click", () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`, "_blank");
    shareBar.classList.remove("open");
  });

  instagramBtn?.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({ title: "Sandeepkumar & Sathiyapriya Wedding", text: shareText, url: shareUrl });
    } else {
      window.open(shareUrl, "_blank");
    }
    shareBar.classList.remove("open");
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      copyBtn.innerHTML = '<i class="ri-check-line"></i>';
      copyBtn.classList.add("copied");
      showToast("Link copied!");
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="ri-link"></i>';
        copyBtn.classList.remove("copied");
      }, 2000);
    } catch {
      showToast("Copy failed - please copy from address bar");
    }
    shareBar.classList.remove("open");
  });
})();

/* ==========================================================
   SOUND EFFECTS (Web Audio API)
========================================================== */

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let chimeQueued = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

document.addEventListener("click", () => {
  initAudio();
  if (chimeQueued) {
    chimeQueued = false;
    setTimeout(playChime, 200);
  }
}, { once: true });

document.addEventListener("touchstart", () => {
  initAudio();
  if (chimeQueued) {
    chimeQueued = false;
    setTimeout(playChime, 200);
  }
}, { once: true });

function playChime() {
  if (!audioCtx || audioCtx.state !== "running") {
    chimeQueued = true;
    return;
  }
  try {
    const now = audioCtx.currentTime;

    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.8);
    });
  } catch(e) {}
}

function playClick() {
  if (!audioCtx || audioCtx.state !== "running") return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch(e) {}
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button, a, .venue-tab")) {
    playClick();
  }
});

/* ==========================================================
   ANIMATED GUEST COUNTER
========================================================== */

function animateCounter(el, target) {
  const duration = 1500;
  const start = parseInt(el.textContent) || 0;
  const diff = target - start;
  if (diff === 0) return;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + diff * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function updateGuestCounters() {
  if (!window.db) return;

  const visitorEl = document.getElementById("visitorCount");

  window.db.from("site_counters").select("visitor_count").eq("id", 1)
    .then(({ data, error }) => {
      if (error || !data || !data.length) {
        return window.db.from("site_counters").insert({ id: 1, visitor_count: 1 })
          .then(() => 1)
          .catch(() => null);
      }
      const current = data[0].visitor_count || 0;
      const newCount = current + 1;
      return window.db.from("site_counters").update({ visitor_count: newCount }).eq("id", 1)
        .then(() => newCount);
    })
    .then((count) => {
      if (count !== null && visitorEl) animateCounter(visitorEl, count);
    })
    .catch(() => {
      let visitorCount = parseInt(localStorage.getItem("visitorCount") || "0");
      visitorCount++;
      localStorage.setItem("visitorCount", visitorCount);
      if (visitorEl) animateCounter(visitorEl, visitorCount);
    });
}

/* ==========================================================
   FLOATING PETAL BURST ON WISH SUBMIT
========================================================== */

function firePetalBurst() {
  const emojis = ["🌸", "🌺", "🪷", "🌷", "💐", "🌼"];
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("span");
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    petal.style.cssText = `
      position: fixed;
      left: ${30 + Math.random() * 40}vw;
      top: ${40 + Math.random() * 20}vh;
      font-size: ${14 + Math.random() * 12}px;
      pointer-events: none;
      z-index: 99999;
      animation: floatPetal ${10 + Math.random() * 6}s linear forwards;
      animation-delay: ${Math.random() * 0.5}s;
      opacity: 0;
    `;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
  }
}

/* ==========================================================
   WISH WALL MODE
========================================================== */

function initWishWall() {
  const viewer = document.querySelector(".active-wish-container");
  const wishList = document.querySelector(".wish-list-v4");
  const nav = document.querySelector(".blessing-navigation");
  if (!viewer || !wishList || !nav) return;

  const toggle = document.createElement("button");
  toggle.className = "wish-wall-toggle";
  toggle.innerHTML = '<i class="ri-grid-fill"></i> All Wishes';
  toggle.setAttribute("aria-label", "Toggle wish wall view");
  nav.appendChild(toggle);

  let wallMode = false;

  async function fetchWishesDirect() {
    const url = "https://lhdjrsbawidcjvofmspa.supabase.co/rest/v1/wedding_wishes?order=created_at.desc&select=*";
    const key = typeof supabaseKey !== "undefined" ? supabaseKey : "";
    const res = await fetch(url, {
      headers: {
        "apikey": key,
        "Authorization": "Bearer " + key
      }
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  }

  toggle.addEventListener("click", async () => {
    wallMode = !wallMode;
    if (wallMode) {
      viewer.style.display = "none";
      document.querySelector(".blessing-header").style.display = "none";
      document.querySelectorAll(".blessing-navigation .nav-wish-btn").forEach(b => b.style.display = "none");
      wishList.style.display = "block";
      wishList.classList.add("wish-wall-active");
      wishList.innerHTML = '<div class="wish-wall-empty">Loading wishes...</div>';
      toggle.innerHTML = '<i class="ri-loader-4-line"></i> Loading...';

      let loaded = false;

      // Try direct REST first
      try {
        const data = await fetchWishesDirect();
        if (data && data.length) {
          wishes = data;
          renderWishWall();
          loaded = true;
        }
      } catch(e) {
        console.warn("Direct fetch failed:", e);
      }

      // Fallback to JS client
      if (!loaded) {
        try { await loadWishes(); } catch(e) {}
        if (wishes.length) {
          renderWishWall();
          loaded = true;
        }
      }

      if (!loaded) {
        wishList.innerHTML = '<div class="wish-wall-empty">No wishes yet. Be the first to send your blessings!</div>';
      }
      toggle.innerHTML = '<i class="ri-layout-row-fill"></i> Single View';
    } else {
      viewer.style.display = "";
      document.querySelector(".blessing-header").style.display = "";
      document.querySelectorAll(".blessing-navigation .nav-wish-btn").forEach(b => b.style.display = "");
      wishList.style.display = "none";
      wishList.classList.remove("wish-wall-active");
      toggle.innerHTML = '<i class="ri-grid-fill"></i> All Wishes';
    }
  });
}

function renderWishWall() {
  const wishList = document.querySelector(".wish-list-v4");
  if (!wishList) return;

  if (!wishes.length) {
    wishList.innerHTML = '<div class="wish-wall-empty">No wishes yet. Be the first to send your blessings!</div>';
    return;
  }

  wishList.innerHTML = wishes.map(wish => `
    <div class="wish-wall-card">
      <div class="wish-avatar-sm">${generateNeutralAvatar(wish.guest_name, wish.id)}</div>
      <div class="wish-wall-body">
        <h4>${escapeHTML(wish.guest_name) || "Guest"}</h4>
        <span class="wish-wall-role">${escapeHTML(wish.relation) || ""}</span>
        <p>${escapeHTML(wish.guest_message) || ""}</p>
      </div>
    </div>
  `).join("");
}

/* ==========================================================
   LIVE WISH COUNTER ANIMATION
========================================================== */

let prevWishCount = 0;

function updateWishCounter() {
  const counter = document.getElementById("wishCounter");
  if (!counter) return;
  const newCount = wishes.length;
  if (newCount !== prevWishCount && prevWishCount > 0) {
    counter.classList.add("counter-bump");
    setTimeout(() => counter.classList.remove("counter-bump"), 400);
  }
  prevWishCount = newCount;
}

/* ==========================================================
   CONFETTI ON SCROLL — INVITATION SECTION
========================================================== */

(function initScrollConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let fired = false;
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const colors = ["#c9a227","#ff7ba7","#ff9ac9","#e8c547","#fff5d4","#ff6ea8","#d4a843"];

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: -10,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      life: 1,
      decay: 0.005 + Math.random() * 0.008
    };
  }

  function burst() {
    for (let i = 0; i < 120; i++) {
      particles.push(createParticle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.rot += p.rotV;
      p.life -= p.decay;
      if (p.life <= 0) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    particles = particles.filter(p => p.life > 0);
    if (particles.length > 0) {
      animFrame = requestAnimationFrame(animate);
    }
  }

  const section = document.querySelector(".invitation-v4");
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        burst();
        animate();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

(function initScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }, { passive: true });
})();

/* ==========================================================
   SVG TIMELINE CONNECTOR ANIMATION
========================================================== */

/* ==========================================================
   PWA INSTALL PROMPT
========================================================== */

(function initPWAInstall() {
  const btn = document.getElementById("pwaInstallBtn");
  if (!btn) return;

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.classList.add("visible");
  });

  btn.addEventListener("click", async () => {
    const confirmed = confirm("📲 Add this wedding invitation to your home screen for quick access anytime!");
    if (!confirmed) return;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        showToast("✅ Added to home screen!");
      }
      deferredPrompt = null;
      btn.classList.remove("visible");
    } else {
      showToast("ℹ️ Use your browser's menu → 'Add to Home Screen' to install.");
    }
  });

  window.addEventListener("appinstalled", () => {
    showToast("✅ App installed successfully!");
    deferredPrompt = null;
    btn.classList.remove("visible");
  });
})();

  } // end gsap check

}); // end window load

