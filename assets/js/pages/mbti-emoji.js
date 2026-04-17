// MBTI Emoji Page Script
(() => {
  "use strict";

  // ===== MBTI DATA =====
  const MBTI_DATA = [
    { type:"INTJ", name:"전략가", group:"분석가형", color:"#4f46e5", emojis:"🎯🔭📐", desc:"논리적이고 계획적인 완벽주의자", best:"ENFP", worst:"ESFP" },
    { type:"INTP", name:"논리술사", group:"분석가형", color:"#4f46e5", emojis:"🤔💡🔬", desc:"지식 탐구를 즐기는 사색가", best:"ENTJ", worst:"ESFJ" },
    { type:"ENTJ", name:"통솔자", group:"분석가형", color:"#4f46e5", emojis:"👑💼🎯", desc:"카리스마 넘치는 리더", best:"INTP", worst:"INFP" },
    { type:"ENTP", name:"변론가", group:"분석가형", color:"#4f46e5", emojis:"💬⚡🎭", desc:"창의적이고 논쟁을 즐기는 혁신가", best:"INFJ", worst:"ISFJ" },
    
    { type:"INFJ", name:"옹호자", group:"외교관형", color:"#7c3aed", emojis:"🌸💜✨", desc:"이상적이고 공감 능력이 높은 몽상가", best:"ENTP", worst:"ESTP" },
    { type:"INFP", name:"중재자", group:"외교관형", color:"#7c3aed", emojis:"🌙🦋📖", desc:"감성적이고 자유로운 영혼", best:"ENFJ", worst:"ESTJ" },
    { type:"ENFJ", name:"선도자", group:"외교관형", color:"#7c3aed", emojis:"🌟❤️🤝", desc:"사람을 이끄는 따뜻한 리더", best:"INFP", worst:"ISTP" },
    { type:"ENFP", name:"활동가", group:"외교관형", color:"#7c3aed", emojis:"🎉🌈💫", desc:"열정적이고 창의적인 자유영혼", best:"INTJ", worst:"ISTJ" },
    
    { type:"ISTJ", name:"현실주의자", group:"수호자형", color:"#0d9488", emojis:"📋🏛️⏰", desc:"책임감 강하고 신뢰할 수 있는 완벽주의자", best:"ESFP", worst:"ENFP" },
    { type:"ISFJ", name:"수호자", group:"수호자형", color:"#0d9488", emojis:"🛡️🌺🤗", desc:"헌신적이고 따뜻한 보호자", best:"ESTP", worst:"ENTP" },
    { type:"ESTJ", name:"경영자", group:"수호자형", color:"#0d9488", emojis:"📊🏆⚖️", desc:"질서와 규칙을 중시하는 관리자", best:"ISFP", worst:"INFP" },
    { type:"ESFJ", name:"집정관", group:"수호자형", color:"#0d9488", emojis:"🏠❤️🎁", desc:"타인을 돌보는 사교적인 협력자", best:"ISFP", worst:"INTP" },
    
    { type:"ISTP", name:"장인", group:"탐험가형", color:"#d97706", emojis:"🔧⚙️🎯", desc:"분석적이고 실용적인 문제해결사", best:"ESFJ", worst:"ENFJ" },
    { type:"ISFP", name:"모험가", group:"탐험가형", color:"#d97706", emojis:"🎨🌿🎵", desc:"감각적이고 예술적인 자유영혼", best:"ESTJ", worst:"ENTJ" },
    { type:"ESTP", name:"사업가", group:"탐험가형", color:"#d97706", emojis:"🚀💥🎲", desc:"대담하고 직접적인 행동가", best:"ISFJ", worst:"INFJ" },
    { type:"ESFP", name:"연예인", group:"탐험가형", color:"#d97706", emojis:"🎤🎉🌟", desc:"즉흥적이고 활발한 엔터테이너", best:"ISTJ", worst:"INTJ" }
  ];

  // ===== TEST QUESTIONS =====
  const TEST_QUESTIONS = [
    {
      q: "주말에 나는...",
      a: [
        { text: "친구들과 왁자지껄 놀기 🎉", points: {E: 1, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0} },
        { text: "혼자 조용히 충전하기 📚", points: {E: 0, I: 1, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0} }
      ]
    },
    {
      q: "결정할 때 나는...",
      a: [
        { text: "논리와 데이터를 따른다 📊", points: {E: 0, I: 0, S: 0, N: 0, T: 1, F: 0, J: 0, P: 0} },
        { text: "내 감정과 가치관을 따른다 💜", points: {E: 0, I: 0, S: 0, N: 0, T: 0, F: 1, J: 0, P: 0} }
      ]
    },
    {
      q: "나의 일 스타일은...",
      a: [
        { text: "계획을 철저히 세운다 📋", points: {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 1, P: 0} },
        { text: "흐름에 맞게 유연하게 간다 🌊", points: {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 1} }
      ]
    },
    {
      q: "새로운 것을 배울 때 나는...",
      a: [
        { text: "실제 경험으로 배우는 게 좋다 🔧", points: {E: 0, I: 0, S: 1, N: 0, T: 0, F: 0, J: 0, P: 0} },
        { text: "개념과 아이디어로 배우는 게 좋다 💡", points: {E: 0, I: 0, S: 0, N: 1, T: 0, F: 0, J: 0, P: 0} }
      ]
    },
    {
      q: "나를 잘 표현하는 이모지는?",
      a: [
        { text: "🔥💪✨ (열정, 에너지)", points: {E: 1, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0} },
        { text: "🌙📖🌿 (차분, 사색)", points: {E: 0, I: 1, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0} }
      ]
    }
  ];

  // ===== FONT CONVERSION =====
  const FONT_MAP = {
    cursive: {
      'a':'𝓪','b':'𝓫','c':'𝓬','d':'𝓭','e':'𝓮','f':'𝓯','g':'𝓰','h':'𝓱','i':'𝓲','j':'𝓳','k':'𝓴','l':'𝓵','m':'𝓶','n':'𝓷','o':'𝓸','p':'𝓹','q':'𝓺','r':'𝓻','s':'𝓼','t':'𝓽','u':'𝓾','v':'𝓿','w':'𝔀','x':'𝔁','y':'𝔂','z':'𝔃',
      'A':'𝓐','B':'𝓑','C':'𝓒','D':'𝓓','E':'𝓔','F':'𝓕','G':'𝓖','H':'𝓗','I':'𝓘','J':'𝓙','K':'𝓚','L':'𝓛','M':'𝓜','N':'𝓝','O':'𝓞','P':'𝓟','Q':'𝓠','R':'𝓡','S':'𝓢','T':'𝓣','U':'𝓤','V':'𝓥','W':'𝓦','X':'𝓧','Y':'𝓨','Z':'𝓩',
      '0':'𝟘','1':'𝟙','2':'𝟚','3':'𝟛','4':'𝟜','5':'𝟝','6':'𝟞','7':'𝟟','8':'𝟠','9':'𝟡'
    },
    gothic: {
      'a':'𝔞','b':'𝔟','c':'𝔠','d':'𝔡','e':'𝔢','f':'𝔣','g':'𝔤','h':'𝔥','i':'𝔦','j':'𝔧','k':'𝔨','l':'𝔩','m':'𝔪','n':'𝔫','o':'𝔬','p':'𝔭','q':'𝔮','r':'𝔯','s':'𝔰','t':'𝔱','u':'𝔲','v':'𝔳','w':'𝔴','x':'𝔵','y':'𝔶','z':'𝔷',
      'A':'𝔄','B':'𝔅','C':'𝔆','D':'𝔇','E':'𝔈','F':'𝔉','G':'𝔊','H':'𝔉','I':'𝔎','J':'𝔍','K':'𝔎','L':'𝔏','M':'𝔐','N':'𝔑','O':'𝔒','P':'𝔓','Q':'𝔔','R':'𝔕','S':'𝔖','T':'𝔗','U':'𝔘','V':'𝔙','W':'𝔚','X':'𝔛','Y':'𝔜','Z':'𝔝'
    },
    bubble: {
      'a':'🅐','b':'🅑','c':'🅒','d':'🅓','e':'🅔','f':'🅕','g':'🅖','h':'🅗','i':'🅘','j':'🅙','k':'🅚','l':'🅛','m':'🅜','n':'🅝','o':'🅞','p':'🅟','q':'🅠','r':'🅡','s':'🅢','t':'🅣','u':'🅤','v':'🅥','w':'🅦','x':'🅧','y':'🅨','z':'🅩',
      'A':'🅰','B':'🅱','C':'🅲','D':'🅳','E':'🅴','F':'🅵','G':'🅶','H':'🅷','I':'🅸','J':'🅹','K':'🅺','L':'🅻','M':'🅼','N':'🅽','O':'🅾','P':'🅿','Q':'🆀','R':'🆁','S':'🆂','T':'🆃','U':'🆄','V':'🆅','W':'🆆','X':'🆇','Y':'🆈','Z':'🆉'
    },
    fullwidth: {
      'a':'ａ','b':'ｂ','c':'ｃ','d':'ｄ','e':'ｅ','f':'ｆ','g':'ｇ','h':'ｈ','i':'ｉ','j':'ｊ','k':'ｋ','l':'ｌ','m':'ｍ','n':'ｎ','o':'ｏ','p':'ｐ','q':'ｑ','r':'ｒ','s':'ｓ','t':'ｔ','u':'ｕ','v':'ｖ','w':'ｗ','x':'ｘ','y':'ｙ','z':'ｚ',
      'A':'Ａ','B':'Ｂ','C':'Ｃ','D':'Ｄ','E':'Ｅ','F':'Ｆ','G':'Ｇ','H':'Ｈ','I':'Ｉ','J':'Ｊ','K':'Ｋ','L':'Ｌ','M':'Ｍ','N':'Ｎ','O':'Ｏ','P':'Ｐ','Q':'Ｑ','R':'Ｒ','S':'Ｓ','T':'Ｔ','U':'Ｕ','V':'Ｖ','W':'Ｗ','X':'Ｘ','Y':'Ｙ','Z':'Ｚ',
      '0':'０','1':'１','2':'２','3':'３','4':'４','5':'５','6':'６','7':'７','8':'８','9':'９',' ':'　'
    },
    tiny: {
      'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','q':'᠎ᵍ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
      'A':'ᴬ','B':'ᴮ','C':'ᶜ','D':'ᴰ','E':'ᴱ','F':'ᶠ','G':'ᴳ','H':'ᴴ','I':'ᴵ','J':'ᴶ','K':'ᴷ','L':'ᴸ','M':'ᴹ','N':'ᴺ','O':'ᴼ','P':'ᴾ','R':'ᴿ','S':'ˢ','T':'ᵀ','U':'ᵁ','V':'ᵛ','W':'ᵂ','X':'ˣ','Y':'ʸ'
    }
  };

  // ===== STATE =====
  let testScores = {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};
  let currentQuestion = 0;
  let userMBTI = null;

  // ===== FUNCTIONS =====
  function getMBTIFromScores() {
    const e_i = testScores.E >= testScores.I ? 'E' : 'I';
    const s_n = testScores.S >= testScores.N ? 'S' : 'N';
    const t_f = testScores.T >= testScores.F ? 'T' : 'F';
    const j_p = testScores.J >= testScores.P ? 'J' : 'P';
    return e_i + s_n + t_f + j_p;
  }

  function getMBTIData(type) {
    return MBTI_DATA.find(m => m.type === type);
  }

  function calculateCompatibility(type1, type2) {
    if (type1 === type2) return 80;
    
    const data1 = getMBTIData(type1);
    if (data1.best === type2) return 95;
    if (data1.worst === type2) return 35;
    
    // 같은 그룹 70%, 다른 그룹 50%
    const group1 = getMBTIData(type1).group;
    const group2 = getMBTIData(type2).group;
    return group1 === group2 ? 70 : 50;
  }

  function convertFont(text, fontType) {
    if (!FONT_MAP[fontType]) return text;
    
    if (fontType === 'strike') {
      return text.split('').map(c => c + '̶').join('');
    }
    
    return text.split('').map(c => FONT_MAP[fontType][c] || c).join('');
  }

  // ===== UI FUNCTIONS =====
  function renderQuestion() {
    const q = TEST_QUESTIONS[currentQuestion];
    document.getElementById('question-text').textContent = q.q;
    
    const container = document.getElementById('answers-container');
    container.innerHTML = q.a.map((ans, i) => `
      <button class="answer-btn" onclick="selectAnswer(${i})"
        style="padding:16px; text-align:left; background:#f9fafb; border:2px solid #e5e7eb;
        border-radius:10px; font-size:1rem; cursor:pointer; transition:all 0.2s;">
        ${ans.text}
      </button>
    `).join('');
    
    document.getElementById('progress-text').textContent = `${currentQuestion + 1} / 5`;
    document.getElementById('progress-bar').style.width = `${(currentQuestion + 1) * 20}%`;
  }

  window.selectAnswer = function(answerIndex) {
    const q = TEST_QUESTIONS[currentQuestion];
    const points = q.a[answerIndex].points;
    
    Object.keys(points).forEach(key => {
      testScores[key] += points[key];
    });
    
    currentQuestion++;
    if (currentQuestion < TEST_QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    userMBTI = getMBTIFromScores();
    const data = getMBTIData(userMBTI);
    
    document.getElementById('mbti-test-section').style.display = 'none';
    document.getElementById('test-result-section').style.display = 'block';
    
    document.getElementById('result-mbti').textContent = userMBTI;
    document.getElementById('result-name').textContent = data.name;
    document.getElementById('result-emojis').textContent = data.emojis.split('').join(' ');
    document.getElementById('result-desc').textContent = data.desc;
    
    window.scrollTo({top: document.getElementById('test-result-section').offsetTop - 100, behavior: 'smooth'});
  }

  function renderMBTICards(group = '분석가형') {
    const cards = MBTI_DATA.filter(m => m.group === group);
    const grid = document.getElementById('mbti-cards-grid');
    
    grid.innerHTML = cards.map(data => `
      <div style="background:white; border-radius:16px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.08);
        border:2px solid ${data.color}33; transition:all 0.2s;">
        <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:12px;">
          <div>
            <div style="font-size:2rem; font-weight:900; color:${data.color};">${data.type}</div>
            <div style="font-size:0.9rem; color:#666; margin-top:4px;">${data.group}</div>
          </div>
          <div style="font-size:2.5rem; letter-spacing:4px;">${data.emojis.split('').join('')}</div>
        </div>
        <div style="font-size:1.1rem; font-weight:700; color:#111827; margin-bottom:8px;">${data.name}</div>
        <p style="font-size:0.9rem; color:#666; margin-bottom:16px; line-height:1.5;">${data.desc}</p>
        <div style="display:flex; gap:8px;">
          <button onclick="copyToClipboard('${data.emojis}')" style="flex:1; padding:10px; background:${data.color}20;
            color:${data.color}; border:none; border-radius:8px; font-weight:600; cursor:pointer;">
            복사
          </button>
          <button onclick="showCompatibility('${data.type}')" style="flex:1; padding:10px; background:#f0f0f0;
            border:none; border-radius:8px; font-weight:600; cursor:pointer;">
            궁합
          </button>
        </div>
      </div>
    `).join('');
  }

  window.copyToClipboard = async function(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('✅ 복사됨!');
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('✅ 복사됨!');
    }
  };

  window.showCompatibility = function(type1) {
    document.getElementById('compat-left').value = type1;
    document.getElementById('compat-right').value = '';
    window.scrollTo({top: document.getElementById('compatibility-section').offsetTop - 100, behavior: 'smooth'});
  };

  // ===== EVENT LISTENERS =====
  document.getElementById('start-test-btn').addEventListener('click', () => {
    testScores = {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};
    currentQuestion = 0;
    document.getElementById('mbti-test-section').style.display = 'block';
    document.getElementById('test-result-section').style.display = 'none';
    document.getElementById('mbti-cards-section').style.display = 'none';
    renderQuestion();
    window.scrollTo({top: document.getElementById('mbti-test-section').offsetTop - 100, behavior: 'smooth'});
  });

  document.getElementById('copy-result-btn').addEventListener('click', async () => {
    const data = getMBTIData(userMBTI);
    await copyToClipboard(data.emojis);
  });

  document.getElementById('share-sns-btn').addEventListener('click', async () => {
    const data = getMBTIData(userMBTI);
    const text = `나는 ${userMBTI} ${data.name} ${data.emojis} #이모지MBTI #EmojiRibbit`;
    await copyToClipboard(text);
    alert('✅ SNS 공유 텍스트 복사됨!');
  });

  document.getElementById('view-all-btn').addEventListener('click', () => {
    document.getElementById('mbti-cards-section').style.display = 'block';
    renderMBTICards('분석가형');
    window.scrollTo({top: document.getElementById('mbti-cards-section').offsetTop - 100, behavior: 'smooth'});
  });

  document.getElementById('retry-test-btn').addEventListener('click', () => {
    document.getElementById('start-test-btn').click();
  });

  // 탭 이벤트
  document.querySelectorAll('.mbti-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mbti-tab').forEach(t => {
        t.style.background = 'white';
        t.style.color = t.dataset.group === '분석가형' ? '#4f46e5' : t.dataset.group === '외교관형' ? '#7c3aed' : t.dataset.group === '수호자형' ? '#0d9488' : '#d97706';
      });
      tab.style.background = tab.dataset.group === '분석가형' ? '#4f46e5' : tab.dataset.group === '외교관형' ? '#7c3aed' : tab.dataset.group === '수호자형' ? '#0d9488' : '#d97706';
      tab.style.color = 'white';
      renderMBTICards(tab.dataset.group);
    });
  });

  // 궁합 확인
  document.getElementById('check-compat-btn').addEventListener('click', () => {
    const left = document.getElementById('compat-left').value;
    const right = document.getElementById('compat-right').value;
    
    if (!left || !right) {
      alert('두 MBTI를 모두 선택해주세요');
      return;
    }
    
    const compat = calculateCompatibility(left, right);
    const leftData = getMBTIData(left);
    const rightData = getMBTIData(right);
    
    let grade = '';
    if (compat >= 90) grade = '💕천생연분';
    else if (compat >= 75) grade = '👍잘 맞아요';
    else if (compat >= 60) grade = '🤝무난해요';
    else grade = '⚡긴장감있어요';
    
    const resultHtml = `
      <div style="text-align:center;">
        <div style="font-size:3rem; font-weight:900; color:#7c3aed; margin-bottom:16px;">${compat}%</div>
        <div style="font-size:1.3rem; font-weight:700; color:#111827; margin-bottom:24px;">${grade}</div>
        <div style="font-size:1.2rem; letter-spacing:8px; margin:20px 0;">${leftData.emojis} + ${rightData.emojis}</div>
        <p style="color:#666; margin-top:20px; line-height:1.6;">
          ${leftData.name}과 ${rightData.name}은 ${compat >= 75 ? '좋은 조합이에요!' : compat >= 60 ? '괜찮은 조합입니다.' : '도전적인 조합이지만 서로 배울 점이 많아요!'}
        </p>
      </div>
    `;
    
    document.getElementById('compat-result').innerHTML = resultHtml;
    document.getElementById('compat-result').style.display = 'block';
  });

  // 폰트 변환
  document.querySelectorAll('.font-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fontType = btn.dataset.font;
      const input = document.getElementById('font-input').value;
      const output = convertFont(input, fontType);
      document.getElementById('font-output').value = output;
    });
  });

  document.getElementById('copy-font-btn').addEventListener('click', async () => {
    const output = document.getElementById('font-output').value;
    if (!output) {
      alert('변환된 텍스트가 없습니다');
      return;
    }
    await copyToClipboard(output);
    alert('✅ 복사됨!');
  });

  // 셀렉트에 MBTI 옵션 추가
  ['compat-left', 'compat-right'].forEach(id => {
    const select = document.getElementById(id);
    MBTI_DATA.forEach(data => {
      const option = document.createElement('option');
      option.value = data.type;
      option.textContent = `${data.type} - ${data.name}`;
      select.appendChild(option);
    });
  });

})();
