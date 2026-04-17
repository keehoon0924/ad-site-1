// Copy Tool Page Script
// Handles Swiper carousel and emoji copying functionality

(() => {
  "use strict";

  class CopyToolPage {
    constructor() {
      this.swiper = null;
      this.emojiSets = this.defineEmojiSets();
      this.initSwiper();
      this.setupEventListeners();
    }

    defineEmojiSets() {
      return {
        emotion: "😊 😍 🤣 😢 😡 😴 🤔 😎",
        jobs: "👨‍💻 👨‍⚕️ 👨‍🎓 👨‍🍳 👨‍🎨 👨‍🚀 👨‍🌾 👨‍⚖️",
        mbti: "🦁 🐺 🦝 🦘 🐯 🦊 🐻 🦌",
        seasons: "🌸 ☀️ 🍂 ❄️ 🌼 🌻 🌹 🌺",
        celebration: "🎉 🎊 🎈 🎁 🎀 ✨ 🎆 🎇",
        love: "❤️ 💕 💖 💗 💘 💝 💞 💓",
      };
    }

    initSwiper() {
      this.swiper = new Swiper(".copy-tool-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 20,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      });
    }

    setupEventListeners() {
      document.querySelectorAll(".copy-tool-card__btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.copyEmojiSet(e.target);
        });
      });
    }

    copyEmojiSet(btn) {
      const setType = btn.dataset.set;
      const emojis = this.emojiSets[setType] || "";

      navigator.clipboard.writeText(emojis).then(() => {
        this.showNotification();

        // Change button text temporarily
        const originalText = btn.textContent;
        btn.textContent = "✅ 복사됨!";

        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    }

    showNotification() {
      const notification = document.getElementById("copyNotification");
      if (notification) {
        notification.classList.add("show");

        setTimeout(() => {
          notification.classList.remove("show");
        }, 2500);
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new CopyToolPage();
    });
  } else {
    new CopyToolPage();
  }
})();
