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

    // ===== 3) WOW.js 초기화 (wow 클래스 애니메이션) =====
    if (typeof WOW !== "undefined") {
      new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true,
        scrollContainer: null,
      }).init();
    }

    // ===== 4) 전역 에러 핸들링 =====
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.message);
    });

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled rejection:", e.reason);
    });

    // ===== 5) 터치 디바이스 감지 =====
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

  // ===== 6) 뷰포트 리사이즈 감지 =====
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    document.body.classList.add("is-resizing");
    resizeTimeout = setTimeout(() => {
      document.body.classList.remove("is-resizing");
    }, 150);
  });

  // ===== 7) 페이지 보이기/숨김 감지 =====
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.body.classList.add("is-hidden");
    } else {
      document.body.classList.remove("is-hidden");
    }
  });

  // ===== 8) 성능 모니터링 (옵션) =====
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
})();
