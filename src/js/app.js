import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

import * as formValidation from "./modules/form-validation.js";
formValidation.formValidation();

import Swiper, { Pagination, EffectCoverflow } from "swiper";

var swiper;

/* Which media query
 **************************************************************/
function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 1399px)");
  let desktop = window.matchMedia("(min-width: 1400px)");

  // Enable (for mobile)
  if (mobile.matches) {
    if (!swiper) { // check if swiper object exists
      swiper = new Swiper(".swiper", {
        modules: [Pagination, EffectCoverflow],
        pagination: {
          el: ".swiper-pagination",
          paginationClickable: true,
          dynamicBullets: true,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: false,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        slidesPerView: 1,
        loop: true,
        direction: "horizontal",

        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }
  }

  // Disable (for desktop)
  else if (desktop.matches) {
    if (swiper) { // check if swiper object exists
      swiper.destroy(true, true);
      swiper = undefined; // reset swiper variable
    }
  }
}

/* On Load
 **************************************************************/
window.addEventListener("load", function () {
  swiperMode();
});

/* On Resize
 **************************************************************/
window.addEventListener("resize", function () {
  swiperMode();
});

