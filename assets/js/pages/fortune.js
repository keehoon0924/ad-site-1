// Fortune Page Script
// Handles emotion selection and fortune generation

(() => {
  "use strict";

  class FortunePage {
    constructor() {
      this.fortunes = this.defineFortunes();
      this.setupEventListeners();
    }

    defineFortunes() {
      return {
        happy: {
          emoji: "😊",
          name: "행복",
          quote: '"오늘은 모든 것이 순조롭게 흘러갈 하루입니다. 긍정적인 마음으로 시작하세요."',
          fortune: "대길",
          luckyColor: "노란색",
          luckyNumber: "7",
          advice:
            "주변 사람들과의 소통을 소중히 여기고, 작은 행복들을 감사함으로 받아들이세요.",
        },
        sad: {
          emoji: "😢",
          name: "슬픔",
          quote: '"힘든 시간도 지나갑니다. 지금의 감정을 인정하고 천천히 치유해보세요."',
          fortune: "중길",
          luckyColor: "파란색",
          luckyNumber: "3",
          advice: "누군가와 당신의 감정을 나누세요. 공감과 위로가 최고의 치약입니다.",
        },
        excited: {
          emoji: "😍",
          name: "설렘",
          quote: '"당신의 기대감이 현실로 이루어질 날이 곧 옵니다. 설레임을 잃지 마세요."',
          fortune: "대길",
          luckyColor: "핑크색",
          luckyNumber: "5",
          advice:
            "그 설렘을 행동으로 옮기세요. 작은 발걸음이 모여 큰 변화를 만듭니다.",
        },
        tired: {
          emoji: "😴",
          name: "피곤",
          quote: '"충분한 휴식은 미래의 에너지입니다. 자신을 돌보는 것도 중요한 일입니다."',
          fortune: "소길",
          luckyColor: "초록색",
          luckyNumber: "2",
          advice:
            "오늘은 자신을 위해 시간을 내세요. 편안한 마음이 최고의 회복제입니다.",
        },
        angry: {
          emoji: "😡",
          name: "화남",
          quote: '"화는 에너지입니다. 그것을 건설적인 무언가로 변화시켜보세요."',
          fortune: "평길",
          luckyColor: "빨간색",
          luckyNumber: "9",
          advice:
            "깊게 숨을 쉬고, 당신의 감정이 전하려는 메시지를 들어보세요. 분노도 성장의 기회입니다.",
        },
        confused: {
          emoji: "🤔",
          name: "혼란",
          quote: '"혼란 속에서도 답은 있습니다. 천천히 생각하고 믿음을 가지세요."',
          fortune: "중길",
          luckyColor: "보라색",
          luckyNumber: "4",
          advice:
            "지금은 성급할 시간이 아닙니다. 필요한 정보를 모으고 신중하게 결정하세요.",
        },
        cool: {
          emoji: "😎",
          name: "멋짐",
          quote: '"당신의 자신감이 주변을 밝게 만듭니다. 그 멋짐을 잃지 마세요."',
          fortune: "대길",
          luckyColor: "검은색",
          luckyNumber: "8",
          advice:
            "당신의 영향력을 긍정적으로 사용하세요. 자신감 있는 모습이 다른 이를 영감을 줍니다.",
        },
        love: {
          emoji: "💕",
          name: "사랑",
          quote: '"사랑은 당신을 더 나은 사람으로 만듭니다. 그 마음을 소중히 지키세요."',
          fortune: "대길",
          luckyColor: "연홍색",
          luckyNumber: "6",
          advice:
            "사랑하는 이에게 마음을 전하세요. 당신의 감정이 누군가에게 큰 힘이 될 수 있습니다.",
        },
      };
    }

    setupEventListeners() {
      document.querySelectorAll(".emotion-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.handleEmotionSelect(e.target.closest(".emotion-btn"));
        });
      });

      const closeBtn = document.getElementById("closeResult");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.closeResult();
        });
      }

      const retryBtn = document.getElementById("retryBtn");
      if (retryBtn) {
        retryBtn.addEventListener("click", () => {
          this.closeResult();
        });
      }
    }

    handleEmotionSelect(btn) {
      const emotion = btn.dataset.emotion;
      const fortune = this.fortunes[emotion];

      if (!fortune) return;

      // Update active button
      document.querySelectorAll(".emotion-btn").forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      // Update result
      this.displayFortune(fortune);
    }

    displayFortune(fortune) {
      document.getElementById("resultEmoji").textContent = fortune.emoji;
      document.getElementById("resultEmotion").textContent = fortune.name;
      document.getElementById("resultQuote").textContent = fortune.quote;
      document.getElementById("fortuneText").textContent = fortune.fortune;
      document.getElementById("luckyColor").textContent = fortune.luckyColor;
      document.getElementById("luckyNumber").textContent = fortune.luckyNumber;
      document.getElementById("adviceText").textContent = fortune.advice;

      // Show result
      const result = document.getElementById("fortuneResult");
      result.classList.remove("hidden");

      // Animate
      result.classList.add("wow", "zoomIn");
      if (typeof WOW !== "undefined") {
        new WOW().init();
      }

      // Scroll to result
      setTimeout(() => {
        result.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }

    closeResult() {
      const result = document.getElementById("fortuneResult");
      result.classList.add("hidden");

      document.querySelectorAll(".emotion-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new FortunePage();
    });
  } else {
    new FortunePage();
  }
})();
