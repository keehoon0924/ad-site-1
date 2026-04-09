/**
 * hero.js
 * - Hero 섹션 전용 인터랙션
 * - 모바일 내비게이션 토글 + 텍스트의 은은한 등장 효과 트리거
 */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  )?.matches;

  document.addEventListener("DOMContentLoaded", () => {
    // 1) 텍스트 등장(과하지 않게)
    if (!prefersReducedMotion) {
      document.documentElement.classList.add("is-ready");
    }

    // 2) 모바일 내비 토글
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (toggle && nav) {
      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        nav.dataset.open = open ? "true" : "false";
      };

      setOpen(false);

      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });

      // 바깥 클릭 시 닫기(모바일 UX)
      document.addEventListener("click", (e) => {
        if (window.matchMedia("(max-width: 720px)").matches) {
          const isOpen = toggle.getAttribute("aria-expanded") === "true";
          if (!isOpen) return;
          const target = e.target;
          if (!(target instanceof Node)) return;
          if (nav.contains(target) || toggle.contains(target)) return;
          setOpen(false);
        }
      });

      // ESC로 닫기
      document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) setOpen(false);
      });
    }
  });
})();

