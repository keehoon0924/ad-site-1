/**
 * Hashtags Page Logic
 * - Category tabs with hashtag data
 * - Individual hashtag selection (pills)
 * - Bottom fixed selection bar
 * - Copy, reset, edit, delete functionality
 */

$(document).ready(function() {
  // ========================================
  // HASHTAG DATA BY CATEGORY
  // ========================================
  const hashtagData = {
    follow: [
      '#instalike', '#lfl', '#맞팔', '#선팔환영', '#팔로우', '#좋반', '#f4f',
      '#fff', '#상호팔로우', '#맞팔해요', '#팔로우백', '#팔로우미', '#팔로잉',
      '#팔로워', '#커뮤니티', '#팔로우이벤트', '#포기하지마', '#화이팅',
      '#응원', '#함께', '#동반성장', '#팔로우반댓글', '#따라와', '#나도해줘',
      '#서로를위해', '#상호작용', '#관심', '#소통', '#네트워킹', '#친구'
    ],
    style: [
      '#ootd', '#데일리룩', '#패션스타그램', '#코디', '#패션', '#스타일',
      '#룩북', '#옷', '#쇼핑', '#신발', '#가방', '#액세서리', '#시계',
      '#의류', '#코디하기', '#옷추천', '#유행', '#트렌드', '#패션위크',
      '#디자이너', '#럭셔리', '#캐주얼', '#스트릿', '#힙합', '#클래식',
      '#보태니컬', '#미니멀', '#오버사이즈', '#크롭', '#롱스커트', '#청바지'
    ],
    photo: [
      '#instagood', '#selca', '#photography', '#셀카', '#뷰티스타그램',
      '#사진', '#포토', '#인생샷', '#감성', '#감성사진', '#일상', '#순간',
      '#추억', '#기억', '#스냅샷', '#카메라', '#렌즈', '#셔터스톡',
      '#프로필샷', '#프사', '#자화상', '#거울', '#자석', '#비포애프터',
      '#메이크업', '#뷰티', '#메이크업아티스트', '#메이크', '#화장',
      '#스킨케어', '#스킨', '#뷰티팁', '#뷰티루틴', '#글래머'
    ],
    life: [
      '#일상스타그램', '#여행', '#직장인', '#데이트', '#추억', '#감성',
      '#휴식', '#힐링', '#일상', '#순간', '#감정', '#기분', '#날씨',
      '#오늘', '#내일', '#매일', '#매주', '#매월', '#계절', '#여름',
      '#봄', '#가을', '#겨울', '#아침', '#점심', '#저녁', '#밤',
      '#휴일', '#주말', '#평일', '#버킷리스트', '#여행가고싶다'
    ],
    study: [
      '#공스타그램', '#studygram', '#공부기록', '#스터디플래너', '#수능',
      '#시험', '#공부법', '#노트필기', '#필기', '#정리', '#공부중',
      '#독서', '#책', '#책추천', '#독서기록', '#논문', '#강의',
      '#온라인강의', '#인강', '#학원', '#과외', '#멘토', '#코칭',
      '#성장', '#발전', '#스킬업', '#자기계발', '#동기부여', '#화이팅'
    ],
    food: [
      '#맛집', '#먹스타그램', '#카페스타그램', '#foodstagram', '#음식',
      '#식사', '#점심', '#저녁', '#아침', '#베이커리', '#카페', '#디저트',
      '#케이크', '#쿠키', '#아이스크림', '#커피', '#라테', '#카푸치노',
      '#에스프레소', '#음료', '#칵테일', '#와인', '#맥주', '#치킨',
      '#피자', '#버거', '#라면', '#떡볶이', '#초밥', '#한식', '#일식',
      '#중식', '#양식', '#이탈리안', '#프렌치', '#스시', '#타코'
    ],
    parenting: [
      '#육아', '#육아스타그램', '#아기스타그램', '#맘스타그램', '#아이',
      '#키즈', '#아이옷', '#베이비', '#신생아', '#돌잔치', '#백일',
      '#돌사진', '#유아', '#어린이', '#육아팁', '#육아꿀팁', '#육아법',
      '#아기용품', '#베이비용품', '#기저귀', '#분유', '#이유식',
      '#장난감', '#그림책', '#그림동화', '#그림책추천', '#어린이교육',
      '#조기교육', '#취학전', '#어린이집', '#유치원', '#아이사랑'
    ],
    health: [
      '#fitness', '#workout', '#헬스타그램', '#다이어트', '#바디프로필',
      '#운동', '#헬스', '#피트니스', '#근력운동', '#유산소', '#스트레칭',
      '#요가', '#필라테스', '#홈트', '#홈트레이닝', '#운동하는여자',
      '#운동하는남자', '#미라클모닝', '#아침운동', '#저녁운동',
      '#체력', '#건강', '#건강하게', '#웰니스', '#헬시', '#비건',
      '#채식', '#영양', '#영양사', '#식이요법', '#칼로리'
    ],
    etc: [
      '#daily', '#인스타', '#소통', '#반려동물', '#강아지', '#고양이',
      '#펫', '#펫스타그램', '#댕댕이', '#냐옹이', '#야옹이', '#귀염',
      '#귀여움', '#사랑', '#사랑해', '#행복', '#감사', '#축하',
      '#축하해', '#응원해', '#화이팅', '#힘내', '#위로', '#공감',
      '#공감가요', '#그래맞아', '#공감백프로', '#공감+1', '#좋아요'
    ],
    preset: [
      '#좋아요를부탁해요', '#좋아요', '#댓글', '#공유', '#팔로우미',
      '#팔로우해요', '#맞팔해요', '#선팔환영', '#선팔합니다',
      '#소통하는계정', '#일상스타그램', '#데일리', '#감성', '#감성사진',
      '#정감', '#따뜻한말', '#좋은말', '#긍정', '#긍정에너지',
      '#희망', '#꿈', '#도전', '#성공', '#화이팅', '#파이팅',
      '#화화화', '#힘내', '#응원', '#함께', '#동반성장', '#상호작용'
    ]
  };

  // ========================================
  // UI STATE
  // ========================================
  let uiState = {
    currentCategory: 'follow',
    selectedTags: [],
    editMode: false
  };

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    renderInitialHashtags();
    bindCategoryTabs();
    bindHashtagSelection();
    bindBottomBar();
    initializeBottomBar();
  }

  // ========================================
  // RENDER HASHTAGS
  // ========================================
  function renderInitialHashtags() {
    updateHashtagList(uiState.currentCategory);
    updateCategoryTitle(uiState.currentCategory);
  }

  function updateHashtagList(category) {
    const hashtags = hashtagData[category] || [];
    const container = $('#hashtag-list');
    
    container.empty();
    
    hashtags.forEach((tag) => {
      const isSelected = uiState.selectedTags.includes(tag);
      const pillClass = isSelected ? 'hashtag-pill--selected' : '';
      
      const pill = $(`
        <span class="hashtag-pill ${pillClass}" data-tag="${tag}">
          ${tag}
        </span>
      `);
      
      container.append(pill);
    });
  }

  function updateCategoryTitle(category) {
    const categoryNames = {
      follow: '팔로우 해시태그',
      style: '스타일 해시태그',
      photo: '사진 해시태그',
      life: '라이프 해시태그',
      study: '공부 해시태그',
      food: '맛집 해시태그',
      parenting: '육아 해시태그',
      health: '헬스 해시태그',
      etc: '기타 해시태그',
      preset: '프리셋 해시태그'
    };
    
    $('#category-title').text(categoryNames[category] || '해시태그');
  }

  // ========================================
  // CATEGORY TAB BINDING
  // ========================================
  function bindCategoryTabs() {
    $('.hashtag-tab').on('click', function() {
      const category = $(this).data('category');
      
      // Update UI state
      uiState.currentCategory = category;
      
      // Update active tab
      $('.hashtag-tab').removeClass('hashtag-tab--active');
      $(this).addClass('hashtag-tab--active');
      
      // Render hashtags for this category
      updateHashtagList(category);
      updateCategoryTitle(category);
      
      // Rebind selection events
      bindHashtagSelection();
      
      // Scroll to hashtag list
      $('html, body').animate({
        scrollTop: $('#hashtags-main').offset().top - 100
      }, 300);
    });
  }

  // ========================================
  // HASHTAG SELECTION BINDING
  // ========================================
  function bindHashtagSelection() {
    $('.hashtag-pill').off('click').on('click', function() {
      const tag = $(this).data('tag');
      
      // Toggle selection
      if (uiState.selectedTags.includes(tag)) {
        uiState.selectedTags = uiState.selectedTags.filter(t => t !== tag);
        $(this).removeClass('hashtag-pill--selected');
      } else {
        uiState.selectedTags.push(tag);
        $(this).addClass('hashtag-pill--selected');
      }
      
      // Update bottom bar
      syncSelectedBar();
      
      showToast(`${tag} ${uiState.selectedTags.includes(tag) ? '선택됨' : '선택 해제됨'}`);
    });
  }

  // ========================================
  // BOTTOM BAR MANAGEMENT
  // ========================================
  function initializeBottomBar() {
    syncSelectedBar();
  }

  function syncSelectedBar() {
    const bar = $('#hashtag-bottom-bar');
    const selectedContainer = $('#bottom-bar-selected');
    
    if (uiState.selectedTags.length === 0) {
      bar.addClass('hashtag-bottom-bar--empty');
      selectedContainer.text('');
    } else {
      bar.removeClass('hashtag-bottom-bar--empty');
      const tagString = uiState.selectedTags.join(' ');
      selectedContainer.text(tagString);
    }
  }

  function bindBottomBar() {
    // Copy button
    $('#copy-tags-btn').off('click').on('click', function() {
      if (uiState.selectedTags.length === 0) {
        showToast('선택된 해시태그가 없습니다.', 'warning');
        return;
      }
      
      const tagString = uiState.selectedTags.join(' ');
      copyToClipboard(tagString);
      showToast('해시태그가 복사되었습니다!', 'success');
    });
    
    // Reset button
    $('#reset-tags-btn').off('click').on('click', function() {
      if (uiState.selectedTags.length === 0) {
        showToast('선택된 해시태그가 없습니다.', 'warning');
        return;
      }
      
      // Clear selected tags
      uiState.selectedTags = [];
      
      // Update UI
      $('.hashtag-pill').removeClass('hashtag-pill--selected');
      syncSelectedBar();
      
      showToast('모든 해시태그가 초기화되었습니다.', 'success');
    });
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function showToast(message, type = 'info') {
    const toast = $(`<div class="toast toast--${type}">${message}</div>`);
    $('body').append(toast);
    
    setTimeout(() => {
      toast.fadeOut(300, function() {
        $(this).remove();
      });
    }, 2500);
  }

  // ========================================
  // INITIALIZATION CALL
  // ========================================
  init();
});
