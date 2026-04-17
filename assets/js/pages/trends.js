// Trends Page Script
// Handles generation-based trend filtering and display

(() => {
  "use strict";

  class TrendsPage {
    constructor() {
      this.currentGeneration = "alpha";
      this.setupEventListeners();
    }

    setupEventListeners() {
      document.querySelectorAll(".gen-tab").forEach((tab) => {
        tab.addEventListener("click", (e) => {
          this.handleGenerationChange(e.target.closest(".gen-tab"));
        });
      });
    }

    handleGenerationChange(tab) {
      // Update active tab
      document.querySelectorAll(".gen-tab").forEach((t) => {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      this.currentGeneration = tab.dataset.gen;

      // Animate trend items
      this.animateTrends();
    }

    animateTrends() {
      const items = document.querySelectorAll(".trend-item");

      items.forEach((item, index) => {
        // Reset animation
        item.classList.remove("wow", "slideInLeft");
        void item.offsetWidth; // Trigger reflow

        // Add animation with delay
        item.style.animationDelay = `${index * 50}ms`;
        item.classList.add("wow", "slideInLeft");
      });

      // Reinitialize WOW
      if (typeof WOW !== "undefined") {
        new WOW().init();
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new TrendsPage();
    });
  } else {
    new TrendsPage();
  }
})();
