// Dictionary Page - Emoji Data Loading & Rendering
(async function() {
  "use strict";

  // --- 설정 ---
  let allEmojis = [];
  let currentCat = 'all';
  let searchQuery = '';
  let displayCount = 60;

  const CATEGORY_MAP = {
    0: '감정',
    1: '사람',
    3: '자연',
    4: '음식',
    5: '활동',
    6: '활동',
    7: '물체',
    8: '기호',
    9: '기호'
  };

  // --- 데이터 로드 ---
  try {
    const [enRes, koRes] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/data.json'),
      fetch('https://cdn.jsdelivr.net/npm/emojibase-data@latest/ko/data.json')
    ]);

    if (!enRes.ok || !koRes.ok) {
      throw new Error('데이터 로드 실패');
    }

    const enData = await enRes.json();
    const koData = await koRes.json();

    // hexcode 기준으로 ko 데이터 맵 생성
    const koMap = {};
    koData.forEach(e => {
      if (e.hexcode) {
        koMap[e.hexcode] = e;
      }
    });

    // 병합: component(group=2) 제외
    allEmojis = enData
      .filter(e => e.group !== 2 && e.emoji && e.group !== undefined)
      .map(e => ({
        emoji: e.emoji,
        hexcode: e.hexcode,
        nameKo: (koMap[e.hexcode] && koMap[e.hexcode].label) || e.label || '이모지',
        nameEn: e.label || 'Emoji',
        group: e.group,
        categoryKo: CATEGORY_MAP[e.group] || '기타'
      }));

    // 중복 제거 (hexcode 기준)
    const seenHex = new Set();
    allEmojis = allEmojis.filter(e => {
      if (seenHex.has(e.hexcode)) return false;
      seenHex.add(e.hexcode);
      return true;
    });

    console.log(`✅ 이모지 데이터 로드 완료: ${allEmojis.length}개`);

  } catch (err) {
    console.error('데이터 로드 오류:', err);
    document.getElementById('emoji-loading').textContent =
      '데이터 로딩 실패. 페이지를 새로고침해주세요.';
    return;
  }

  document.getElementById('emoji-loading').style.display = 'none';
  document.getElementById('emoji-grid').style.display = 'grid';

  // --- 필터링 함수 ---
  function getFiltered() {
    let list = allEmojis;

    // 카테고리 필터
    if (currentCat !== 'all') {
      const cats = currentCat.split(',').map(Number);
      list = list.filter(e => cats.includes(e.group));
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(e =>
        e.nameKo.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q) ||
        e.emoji === q
      );
    }

    return list;
  }

  // --- 모달 HTML 생성 ---
  document.body.insertAdjacentHTML('beforeend', `
    <div id="dict-modal" style="display:none; position:fixed; inset:0;
      background:rgba(0,0,0,0.55); z-index:9999;
      align-items:center; justify-content:center;
      backdrop-filter:blur(6px);">
      <div class="dict-modal-inner" style="background:white; border-radius:24px;
        padding:40px; max-width:440px; width:90%; position:relative;
        text-align:center; animation:modalIn 0.25s ease;">
        <button id="dict-modal-close" style="position:absolute; top:16px; right:20px;
          background:none; border:none; font-size:1.5rem;
          cursor:pointer; color:#9ca3af;">✕</button>
        <div id="dict-modal-emoji" style="font-size:5rem; margin-bottom:16px;"></div>
        <h2 id="dict-modal-name-ko" style="font-size:1.4rem; font-weight:700;
          color:#111827; margin-bottom:6px;"></h2>
        <p id="dict-modal-name-en" style="color:#9ca3af; font-style:italic;
          margin-bottom:12px;"></p>
        <span id="dict-modal-category" style="display:inline-block; padding:4px 14px;
          background:#f3e8ff; color:#7c3aed; border-radius:99px;
          font-size:0.85rem; font-weight:600; margin-bottom:24px;"></span>
        <button id="dict-modal-copy" style="width:100%; padding:14px;
          background:linear-gradient(135deg,#7c3aed,#a855f7);
          color:white; border:none; border-radius:12px;
          font-size:1rem; font-weight:600; cursor:pointer;
          transition:all 0.2s;">
          이모지 복사하기
        </button>
      </div>
    </div>
  `);

  // 모달 CSS 애니메이션
  if (!document.querySelector('style[data-dict-modal]')) {
    const style = document.createElement('style');
    style.setAttribute('data-dict-modal', 'true');
    style.textContent = `
      @keyframes modalIn {
        from { opacity:0; transform:scale(0.88); }
        to   { opacity:1; transform:scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  let modalEmoji = '';

  function openModal(emoji, nameKo, nameEn, category) {
    modalEmoji = emoji;
    document.getElementById('dict-modal-emoji').textContent = emoji;
    document.getElementById('dict-modal-name-ko').textContent = nameKo;
    document.getElementById('dict-modal-name-en').textContent = nameEn;
    document.getElementById('dict-modal-category').textContent = category;
    document.getElementById('dict-modal').style.display = 'flex';
  }

  // --- 클립보드 복사 ---
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-999999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }

  // --- 카드 렌더링 ---
  function renderCards() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, displayCount);
    const grid = document.getElementById('emoji-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (toShow.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center;
        padding:60px 20px; color:#999; font-size:1.1rem;">
        검색 결과가 없어요 😢</div>`;
      loadMoreBtn.style.display = 'none';
      return;
    }

    grid.innerHTML = toShow.map(e => `
      <div class="dict-card" data-emoji="${e.emoji.replace(/"/g, '&quot;')}"
           data-name-ko="${e.nameKo.replace(/"/g, '&quot;')}"
           data-name-en="${e.nameEn.replace(/"/g, '&quot;')}"
           data-category="${e.categoryKo.replace(/"/g, '&quot;')}">
        <span class="dict-card__emoji">${e.emoji}</span>
        <div class="dict-card__name-ko">${e.nameKo}</div>
        <div class="dict-card__name-en">${e.nameEn}</div>
        <span class="dict-card__category">${e.categoryKo}</span>
        <button class="dict-card__copy-btn">복사</button>
      </div>
    `).join('');

    // 더보기 버튼
    if (filtered.length > displayCount) {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.textContent = `더 보기 (+100개, 현재 ${toShow.length}/${filtered.length})`;
    } else {
      loadMoreBtn.style.display = 'none';
    }

    // 카드 클릭 → 모달
    grid.querySelectorAll('.dict-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('dict-card__copy-btn')) return;
        openModal(
          card.dataset.emoji,
          card.dataset.nameKo,
          card.dataset.nameEn,
          card.dataset.category
        );
      });
    });

    // 복사 버튼
    grid.querySelectorAll('.dict-card__copy-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const emoji = btn.closest('.dict-card').dataset.emoji;
        await copyToClipboard(emoji);
        btn.textContent = '✅ 복사됨!';
        btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
        setTimeout(() => {
          btn.textContent = '복사';
          btn.style.background = 'linear-gradient(135deg,#7c3aed,#a855f7)';
        }, 1500);
      });
    });
  }

  // --- 모달 이벤트 ---
  document.getElementById('dict-modal-close').addEventListener('click', () => {
    document.getElementById('dict-modal').style.display = 'none';
  });

  document.getElementById('dict-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('dict-modal').style.display = 'none';
    }
  });

  document.getElementById('dict-modal-copy').addEventListener('click', async () => {
    await copyToClipboard(modalEmoji);
    const btn = document.getElementById('dict-modal-copy');
    btn.textContent = '✅ 복사됨!';
    btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
    setTimeout(() => {
      btn.textContent = '이모지 복사하기';
      btn.style.background = 'linear-gradient(135deg,#7c3aed,#a855f7)';
    }, 1500);
  });

  // --- 카테고리 버튼 이벤트 ---
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      displayCount = 60;
      renderCards();
      const gridTop = document.getElementById('emoji-grid').offsetTop;
      window.scrollTo({ top: gridTop - 120, behavior: 'smooth' });
    });
  });

  // --- 검색 이벤트 ---
  document.getElementById('dict-search').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    displayCount = 60;
    renderCards();
  });

  // --- 더보기 버튼 ---
  document.getElementById('load-more-btn').addEventListener('click', () => {
    displayCount += 100;
    renderCards();
  });

  // --- 페이지 로드 완료 후 개수 업데이트 ---
  window.addEventListener('load', () => {
    document.querySelectorAll('[data-update-count]').forEach(el => {
      if (el.textContent.includes('3,600')) {
        el.textContent = allEmojis.length.toLocaleString() + '+';
      }
    });
  });

  // 최초 렌더링
  renderCards();

})();
