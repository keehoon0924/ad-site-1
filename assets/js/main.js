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

  // Toast 메시지 함수 (전역)
  function showToastMessage(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #667eea, #ec4899);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => toast.remove(), 300);
    }, 1500);
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

  // Stats 숫자 카운트업 애니메이션 및 복사 기능
  document.addEventListener("DOMContentLoaded", () => {
    const statsCards = document.querySelectorAll(".stat-card__number");

    // ===== Emoji Item Copy (Most Used) =====
    document.addEventListener("click", (e) => {
      if (e.target.closest(".emoji-item")) {
        const emojiSpan = e.target.closest(".emoji-item").querySelector(".emoji-item__emoji");
        if (emojiSpan) {
          const emoji = emojiSpan.textContent;
          navigator.clipboard.writeText(emoji).then(() => {
            showToastMessage("\"" + emoji + "\" 복사됨!");
          });
        }
      }
    });

    // ===== Generation Card Emoji Copy =====
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("generation-emoji")) {
        const emoji = e.target.getAttribute("data-emoji");
        if (emoji) {
          navigator.clipboard.writeText(emoji).then(() => {
            showToastMessage("\"" + emoji + "\" 복사됨!");
          });
        }
      }
    });

    // ===== Combination Card Copy Button =====
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("combination-card__copy-btn")) {
        const btn = e.target;
        const emojis = btn.getAttribute("data-emojis");
        
        if (!emojis) return;
        
        // 클립보드에 복사
        navigator.clipboard.writeText(emojis).then(() => {
          // 버튼 텍스트 변경
          const originalText = btn.textContent;
          btn.textContent = "✅ 복사됨!";
          btn.style.pointerEvents = "none";
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.pointerEvents = "auto";
          }, 1500);
          
          // 토스트 메시지 표시
          showToastMessage("\"" + emojis + "\" 복사됨!");
        }).catch(() => {
          showToastMessage("복사 실패. 다시 시도해주세요.");
        });
      }
    });

    // Stats 숫자 애니메이션
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
