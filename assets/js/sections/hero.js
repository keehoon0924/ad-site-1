/**
 * hero.js
 * - Hero 섹션 전용 인터랙션
 * - 모바일 내비게이션 토글 + 텍스트의 은은한 등장 효과 + 다크모드
 */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  )?.matches;

  document.addEventListener("DOMContentLoaded", () => {
    // ===== 1) AOS (Animate On Scroll) 초기화 =====
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out-cubic",
        once: true,
        offset: 100,
      });
    }

    // ===== 2) 모바일 내비게이션 토글 =====
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (toggle && nav) {
      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        nav.dataset.open = open ? "true" : "false";
      };

      setOpen(false);

      // 토글 버튼 클릭
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });

      // 네비게이션 링크 클릭 시 메뉴 닫기
      const navLinks = nav.querySelectorAll(".site-nav__link");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          setOpen(false);
        });
      });

      // 바깥 클릭 시 닫기
      document.addEventListener("click", (e) => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          const isOpen = toggle.getAttribute("aria-expanded") === "true";
          if (!isOpen) return;
          const target = e.target;
          if (!(target instanceof Node)) return;
          if (nav.contains(target) || toggle.contains(target)) return;
          setOpen(false);
        }
      });

      // ESC 키로 닫기
      document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) setOpen(false);
      });
    }

    // ===== 3) 다크모드 토글 =====
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const htmlElement = document.documentElement;

    // 저장된 테마 로드
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeButton(savedTheme);

    function updateThemeButton(theme) {
      const icon = themeToggle?.querySelector(".theme-icon");
      if (!icon) return;
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
      themeToggle?.setAttribute("aria-pressed", theme === "dark");
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeButton(newTheme);
      });
    }

    // ===== 4) 검색 기능 (기본 구현) =====
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchInput && searchBtn) {
      const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
          console.log("검색어:", query);
          // 추후 실제 검색 로직 구현
          // window.location.href = `#emoji?q=${encodeURIComponent(query)}`;
        }
      };

      searchBtn.addEventListener("click", performSearch);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch();
        }
      });
    }

    // ===== 5) 부드러운 텍스트 등장 애니메이션 =====
    if (!prefersReducedMotion) {
      const elements = document.querySelectorAll(
        ".hero__eyebrow, .hero__title, .hero__subtitle, .hero__meta, .hero__buttons"
      );
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
          el.style.transition = "all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 50 + index * 100);
      });
    }

    // ===== 6) 부드러운 스크롤 =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href !== "#" && href !== "#hero") {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  });
})();
