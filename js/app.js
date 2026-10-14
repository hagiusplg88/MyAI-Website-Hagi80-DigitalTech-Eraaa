document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THEME TOGGLE (DARK / LIGHT MODE) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌙 Dark Mode';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // --- 2. GREETING & CLOCK (RENTANG WAKTU KUSTOM) ---
  const greetingText = document.getElementById('greeting-text');
  const clockText = document.getElementById('clock-text');
  const dateText = document.getElementById('date-text');
  const usernameInput = document.getElementById('username-input');

  const savedName = localStorage.getItem('username') || 'Hagius';
  usernameInput.value = savedName;

  usernameInput.addEventListener('input', (e) => {
    localStorage.setItem('username', e.target.value);
    updateGreeting();
  });

  function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let name = localStorage.getItem('username');
    let nameSuffix = name ? `, ${name}` : '';
    
    // Logika Rentang Waktu Sesuai Permintaan
    let timeGreeting = 'Selamat Malam';

    if (hours >= 1 && hours <= 10) {
      timeGreeting = 'Selamat Pagi';   // 01.00 - 10.00
    } else if (hours >= 11 && hours <= 14) {
      timeGreeting = 'Selamat Siang';  // 11.00 - 14.00
    } else if (hours >= 15 && hours <= 18) {
      timeGreeting = 'Selamat Sore';   // 15.00 - 18.00
    } else if (hours >= 19 || hours === 0) {
      timeGreeting = 'Selamat Malam';  // 19.00 - 00.00
    }

    greetingText.textContent = `${timeGreeting}${nameSuffix}!`;

    // Format Jam HH.MM.SS
    const hoursStr = String(now.getHours()).padStart(2, '0');
    const minutesStr = String(now.getMinutes()).padStart(2, '0');
    const secondsStr = String(now.getSeconds()).padStart(2, '0');
    clockText.textContent = `${hoursStr}.${minutesStr}.${secondsStr}`;
    
    // Format Tanggal Indonesia
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = now.toLocaleDateString('id-ID', options);
  }

  setInterval(updateGreeting, 1000);
  updateGreeting();

  // --- 3. AI TOOLS LINKS MANAGEMENT ---
  const addAiForm = document.getElementById('add-ai-form');
  const aiTitleInput = document.getElementById('ai-title-input');
  const aiUrlInput = document.getElementById('ai-url-input');
  const aiLinksList = document.getElementById('ai-links-list');

  let aiLinks = JSON.parse(localStorage.getItem('aiLinks')) || [
    { title: 'ChatGPT', url: 'https://chatgpt.com' }
  ];

  function renderAiLinks() {
    localStorage.setItem('aiLinks', JSON.stringify(aiLinks));
    aiLinksList.innerHTML = '';

    aiLinks.forEach((link, index) => {
      const li = document.createElement('li');
      
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.textContent = link.title;

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Hapus';
      delBtn.className = 'btn-red';
      delBtn.addEventListener('click', () => {
        aiLinks.splice(index, 1);
        renderAiLinks();
      });

      li.appendChild(a);
      li.appendChild(delBtn);
      aiLinksList.appendChild(li);
    });
  }

  addAiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = aiTitleInput.value.trim();
    const url = aiUrlInput.value.trim();

    if (title && url) {
      aiLinks.push({ title, url });
      aiTitleInput.value = '';
      aiUrlInput.value = '';
      renderAiLinks();
    }
  });

  renderAiLinks();

  // --- 4. DIGITALTECH TOOLS LINKS MANAGEMENT ---
  const addTechForm = document.getElementById('add-tech-form');
  const techTitleInput = document.getElementById('tech-title-input');
  const techUrlInput = document.getElementById('tech-url-input');
  const techLinksList = document.getElementById('tech-links-list');

  let techLinks = JSON.parse(localStorage.getItem('techLinks')) || [
    { title: 'GitHub', url: 'https://github.com' }
  ];

  function renderTechLinks() {
    localStorage.setItem('techLinks', JSON.stringify(techLinks));
    techLinksList.innerHTML = '';

    techLinks.forEach((link, index) => {
      const li = document.createElement('li');
      
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.textContent = link.title;

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Hapus';
      delBtn.className = 'btn-red';
      delBtn.addEventListener('click', () => {
        techLinks.splice(index, 1);
        renderTechLinks();
      });

      li.appendChild(a);
      li.appendChild(delBtn);
      techLinksList.appendChild(li);
    });
  }

  addTechForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = techTitleInput.value.trim();
    const url = techUrlInput.value.trim();

    if (title && url) {
      techLinks.push({ title, url });
      techTitleInput.value = '';
      techUrlInput.value = '';
      renderTechLinks();
    }
  });

  renderTechLinks();

});