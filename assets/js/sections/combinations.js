// Combinations Copy Functionality
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".combination-card__copy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const emojis = e.target.dataset.emojis;
        const originalText = btn.textContent;

        const copyToClipboard = () => {
          if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(emojis);
          } else {
            // Fallback for older browsers
            return new Promise((resolve, reject) => {
              const textArea = document.createElement("textarea");
              textArea.value = emojis;
              textArea.style.position = "fixed";
              textArea.style.left = "-999999px";
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();

              try {
                document.execCommand("copy");
                document.body.removeChild(textArea);
                resolve();
              } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
              }
            });
          }
        };

        copyToClipboard()
          .then(() => {
            btn.textContent = "✅ 복사됨!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1500);
          })
          .catch((err) => {
            console.error("복사 실패:", err);
          });
      });
    });
  });
})();
