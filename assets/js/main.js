/**
 * main.js
 * - 공통 엔트리 포인트
 * - 초기화/공용 이벤트 바인딩
 * - 섹션별 스크립트는 assets/js/sections/*.js 형태로 분리
 */

(() => {
  "use strict";

  // DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    // ===== 1) 시스템 다크모드 감지 =====
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    // 저장된 테마가 없으면 시스템 설정 따르기
    if (!savedTheme) {
      const theme = prefersDarkMode ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }

    // ===== 2) 페이지 로드 완료 플래그 =====
    document.documentElement.classList.add("is-ready");

    // ===== 3) AOS.js 초기화 (Animate On Scroll) =====
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out-quad",
        once: false,
        mirror: true,
        offset: 100,
      });
    }

    // ===== 5) 전역 에러 핸들링 =====
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.message);
    });

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled rejection:", e.reason);
    });

    // ===== 6) 터치 디바이스 감지 =====
    const isTouchDevice = () => {
      return (
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      document.body.classList.add("is-touch");
    }
  });

  // ===== 7) 뷰포트 리사이즈 감지 =====
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    document.body.classList.add("is-resizing");
    resizeTimeout = setTimeout(() => {
      document.body.classList.remove("is-resizing");
    }, 150);
  });

  // ===== 8) 페이지 보이기/숨김 감지 =====
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.body.classList.add("is-hidden");
    } else {
      document.body.classList.remove("is-hidden");
    }
  });

  // ===== 9) 성능 모니터링 (옵션) =====
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.renderTime || entry.loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      // PerformanceObserver 미지원
    }
  }

  // ===== Emoji Items Copy 기능 =====
  document.addEventListener("DOMContentLoaded", () => {
    // 이모지 아이템 클릭 시 복사
    document.querySelectorAll(".emoji-item").forEach((item) => {
      item.addEventListener("click", () => {
        const emoji = item.querySelector(".emoji-item__emoji").textContent;
        
        navigator.clipboard
          .writeText(emoji)
          .then(() => {
            showToast(item, "복사됨 ✅");
          })
          .catch((err) => {
            console.error("복사 실패:", err);
          });
      });
    });

    // Generation card 이모지 클릭 시 복사
    document.querySelectorAll(".generation-card__emojis span").forEach((span) => {
      span.style.cursor = "pointer";
      span.addEventListener("click", (e) => {
        const emoji = e.target.textContent;
        
        navigator.clipboard
          .writeText(emoji)
          .then(() => {
            const card = e.target.closest(".generation-card");
            showToast(card, "복사됨!");
          })
          .catch((err) => {
            console.error("복사 실패:", err);
          });
      });
    });
  });

  // Toast 메시지 함수
  function showToast(element, message) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #ec4899 70%, #f97316 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 1000;
      white-space: nowrap;
      animation: slideDown 0.3s ease-out;
    `;
    toast.textContent = message;

    const parent = element.style.position === "static" ? element.parentElement : element;
    parent.style.position = "relative";
    parent.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideUp 0.3s ease-out forwards";
      setTimeout(() => toast.remove(), 300);
    }, 800);
  }

  // 검색 기능
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchInput && searchBtn) {
      const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const emojiItems = document.querySelectorAll(".emoji-item");
        let hasResults = false;

        emojiItems.forEach((item) => {
          const name = item.querySelector(".emoji-item__name")?.textContent.toLowerCase() || "";

          if (searchTerm === "" || name.includes(searchTerm)) {
            item.style.display = "";
            hasResults = true;
          } else {
            item.style.display = "none";
          }
        });

        // 검색 결과 없을 때 메시지
        let noResults = document.querySelector(".no-search-results");
        if (!hasResults && searchTerm) {
          if (!noResults) {
            noResults = document.createElement("div");
            noResults.className = "no-search-results";
            noResults.style.cssText = `
              grid-column: 1 / -1;
              text-align: center;
              padding: 40px;
              color: #999;
              font-size: 1rem;
            `;
            const emojiGrid = document.querySelector(".emoji-grid");
            if (emojiGrid) {
              emojiGrid.appendChild(noResults);
            }
          }
          noResults.textContent = "검색 결과가 없어요 😢";
        } else if (noResults) {
          noResults.remove();
        }
      };

      searchBtn.addEventListener("click", performSearch);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch();
        }
      });
      searchInput.addEventListener("input", performSearch);
    }
  });

  // Stats 숫자 카운트업 애니메이션
  document.addEventListener("DOMContentLoaded", () => {
    const statsCards = document.querySelectorAll(".stat-card__number");

    if (statsCards.length > 0) {
      const observerOptions = {
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            animateNumber(entry.target);
          }
        });
      }, observerOptions);

      statsCards.forEach((card) => {
        observer.observe(card);
      });
    }

    function animateNumber(element) {
      const text = element.textContent;
      let targetNumber = 0;
      let suffix = "";

      // 숫자와 접미사 분리
      if (text.includes("+")) {
        targetNumber = parseInt(text);
        suffix = "+";
      } else if (text.includes("%")) {
        targetNumber = parseInt(text);
        suffix = "%";
      } else {
        targetNumber = parseInt(text);
      }

      const duration = 1500;
      const startTime = Date.now();

      function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuart 이징
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        const currentNumber = Math.floor(targetNumber * easeProgress);
        element.textContent = currentNumber + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = targetNumber + suffix;
        }
      }

      update();
    }
  });
})();
