function verifyBrandIntegrity() {
  try {
    const normTitle = (document.title || '').replace(/\s+/g, '').toLowerCase();
    const authorMeta = (document.querySelector('meta[name="author"]')?.getAttribute('content') || '').toLowerCase();
    const footerEl = document.getElementById('zodi4cBrandFooter');
    const footerText = (footerEl?.textContent || '').toLowerCase();
    const footerLink = footerEl?.querySelector('a[href*="github.com/zodi4ctvn"]');
    const decodeTitle = document.getElementById('decodeTitle');
    const decodeText = ((decodeTitle?.getAttribute('data-original') || decodeTitle?.textContent || '')).replace(/\s+/g, '').toLowerCase();

    const valid =
      normTitle.includes('zodi4c') &&
      (authorMeta.includes('zodi4c') || authorMeta.includes('zodi4ctvn')) &&
      decodeText.includes('zodi4c') &&
      Boolean(footerEl && footerLink && footerText.includes('zodi4c'));

    if (!valid) {
      document.body.className = '';
      document.body.style.cssText = 'margin:0;min-height:100vh;display:grid;place-items:center;background:#08080c;color:#f1f3f8;font-family:system-ui,-apple-system,sans-serif;overflow:auto;padding:24px;';
      document.body.innerHTML = `
        <div style="max-width:560px;width:100%;padding:32px;border-radius:20px;background:rgba(18,19,26,0.92);border:1px solid rgba(255,255,255,0.12);box-shadow:0 24px 64px rgba(0,0,0,0.7);text-align:center;">
          <h1 style="margin:0 0 12px;font-size:1.35rem;letter-spacing:0.12em;">ATTRIBUTION REQUIRED / ATIF GEREKLİ</h1>
          <p style="margin:0 0 14px;color:#b8bcc8;line-height:1.6;font-size:0.95rem;">
            Bu site <strong>Zodi4c (zodi4ctvn)</strong> tarafından geliştirilmiştir. Lisans gereği orijinal marka ve atıf bilgilerini geri yükleyin.
          </p>
          <p style="margin:0 0 22px;color:#9ea3b0;line-height:1.6;font-size:0.92rem;">
            This site was created by <strong>Zodi4c (zodi4ctvn)</strong>. Please restore original attribution and branding to continue.
          </p>
          <a href="https://github.com/zodi4ctvn" target="_blank" rel="noopener noreferrer"
            style="display:inline-block;padding:10px 22px;border-radius:999px;background:#ffffff;color:#08080c;text-decoration:none;font-weight:600;font-size:0.9rem;">
            github.com/zodi4ctvn ↗
          </a>
        </div>
      `;
      return false;
    }
    return true;
  } catch (_) {
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!verifyBrandIntegrity()) return;
  document.addEventListener('selectstart', (e) => e.preventDefault());
  document.addEventListener('dragstart', (e) => e.preventDefault());
  initMatrixEntryCurtain();
  initDecodeTitle();
  initCustomCursor();
  initConstellationDnaCanvas();
  initLanyardActivity();
  initButtonAudioFeedback();
  initInteractiveTerminal();
  initKonamiEasterEgg();
  initSceneParallax();
  initBoxes3DTilt();
  initExternalLinkConfirm();
  initBottomEqualizerVisualizer();
  initVisitorCounter();
  initStoredTheme();
  initLanguageSystem();
  initTechModal();
  initTypewriterBio();
  initDiscordProfileCard();
  initUnifiedCardTabs();
  initGithubSplitDrawer();
  initMusicSwitcher();
  initMemoriesDrawer();
  initTabTitleTypewriter();
  initDiscordHandleCopy();
  initBgPresetSwitcher();
  initCustomContextMenu();
});
/* ── Visitor Counter ──────────────────────────────────────────── */
function initVisitorCounter() {
  const numEl = document.getElementById('visitorCount');
  if (!numEl) return;

  // Taban ziyaretçi sayısı
  const BASE_COUNT = 1340;
  const STORAGE_KEY = 'zodi4c_local_visits';

  let localHits = 0;
  try {
    localHits = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    // Her sayfaya girişte sadece kullanıcının kendi tarayıcısında ufak artış sağlar
    localHits += 1;
    localStorage.setItem(STORAGE_KEY, localHits.toString());
  } catch (_) {
    localHits = 1;
  }

  const total = BASE_COUNT + localHits;

  numEl.classList.remove('loading');
  numEl.textContent = total.toLocaleString('en-US');
}
function initMatrixEntryCurtain() {
  const curtain = document.getElementById('entryCurtain');
  if (!curtain) return;
  function enterSite() {
    if (curtain.classList.contains('fading')) return;
    // Trigger smooth curtain fade-out animation
    curtain.classList.add('fading');
    document.body.classList.remove('site-locked');
    document.body.classList.add('site-entered');

    // Remove curtain element from layout after smooth 0.8s transition
    setTimeout(() => {
      curtain.style.display = 'none';
    }, 820);

    startBackgroundMusic();
    playUiClickSound(660, 'sine', 0.08);

    // Start title decode immediately with the simultaneous illumination
    triggerDecodeAnimation();
  }
  curtain.addEventListener('click', enterSite);
  window.addEventListener('keydown', (e) => {
    if (!curtain.classList.contains('fading') && curtain.style.display !== 'none' && (e.key === 'Enter' || e.key === ' ')) {
      enterSite();
    }
  });
}

function initDecodeTitle() {
  const titleEl = document.getElementById('decodeTitle');
  if (!titleEl) return;
  titleEl.addEventListener('mouseenter', triggerDecodeAnimation);
}
function triggerDecodeAnimation() {
  const titleEl = document.getElementById('decodeTitle');
  if (!titleEl) return;
  const targetText = titleEl.getAttribute('data-original') || 'Z O D I 4 C';
  const chars = '0123456789!@#$%^&*<>~§±ΩΨ∑_';
  let iteration = 0;
  clearInterval(titleEl.decodeInterval);
  titleEl.decodeInterval = setInterval(() => {
    titleEl.innerText = targetText
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' ';
        if (index < iteration) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    if (iteration >= targetText.length) {
      clearInterval(titleEl.decodeInterval);
      titleEl.innerText = targetText;
    }
    iteration += 1 / 3;
  }, 35);
}
function initConstellationDnaCanvas() {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });
  const mouse = { x: null, y: null, radius: 130 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  class Node {
    constructor(x, y, isDna = false, strand = 1, angle = 0, initialY = 0) {
      this.isDna = isDna;
      this.strand = strand;
      this.angle = angle;
      this.dnaSpeed = 0.0032;
      this.dnaAmplitude = 75;
      this.initialY = initialY;
      if (this.isDna) {
        this.y = initialY;
        const offset = Math.sin(this.angle) * this.dnaAmplitude * (this.strand === 1 ? 1 : -1);
        this.x = (width / 2) + offset;
        this.targetX = this.x;
        this.targetY = this.y;
      } else {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
      }
      this.vx = 0;
      this.vy = 0;
      this.radius = this.isDna ? 2.2 : (Math.random() * 1.5 + 0.8);
    }
    update() {
      if (this.isDna) {
        this.angle += this.dnaSpeed;
        const offset = Math.sin(this.angle) * this.dnaAmplitude * (this.strand === 1 ? 1 : -1);
        this.targetX = (width / 2) + offset;
        this.targetY = this.initialY;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx -= (dx / dist) * force * 3.5;
            this.vy -= (dy / dist) * force * 3.5;
          }
        }
        this.vx += (this.targetX - this.x) * 0.045;
        this.vy += (this.targetY - this.y) * 0.045;
        this.vx *= 0.88;
        this.vy *= 0.88;
        this.x += this.vx;
        this.y += this.vy;
        const m = 10;
        if (this.x < m) { this.x = m; this.vx *= -0.5; }
        else if (this.x > width - m) { this.x = width - m; this.vx *= -0.5; }
        if (this.y < m) { this.y = m; this.vy *= -0.5; }
        else if (this.y > height - m) { this.y = height - m; this.vy *= -0.5; }
      } else {
        this.wobblePhase += this.wobbleSpeed || 0.02;
        const driftX = Math.cos(this.wobblePhase) * 0.18;
        const driftY = Math.sin(this.wobblePhase) * 0.18;
        this.x += (this.vx || 0) + driftX;
        this.y += (this.vy || 0) + driftY;
        const pad = 15;
        if (this.x < -pad) this.x = width + pad;
        else if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        else if (this.y > height + pad) this.y = -pad;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx -= (dx / dist) * force * 0.8;
            this.vy -= (dy / dist) * force * 0.8;
          }
        }
        // Physical shockwave ripple push on click
        for (let r of dnaRipples) {
          const dx = this.x - r.x;
          const dy = this.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (Math.abs(dist - r.radius) < 55) {
            const push = (1 - Math.abs(dist - r.radius) / 55) * 1.45;
            this.vx += (dx / dist) * push;
            this.vy += (dy / dist) * push;
          }
        }
        this.vx += ((this.baseVx || 0.2) - this.vx) * 0.03;
        this.vy += ((this.baseVy || 0.2) - this.vy) * 0.03;
      }
    }
    draw(bassBoost = 0) {
      ctx.beginPath();
      const r = this.radius + (this.isDna ? bassBoost * 0.9 : bassBoost * 0.45);
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      const a = this.isDna ? Math.min(1, 0.9 + bassBoost * 0.1) : Math.min(0.85, 0.5 + bassBoost * 0.28);
      ctx.fillStyle = this.isDna ? `rgba(255, 255, 255, ${a.toFixed(2)})` : `rgba(215, 220, 232, ${a.toFixed(2)})`;
      ctx.fill();
    }
  }
  const dnaRipples = [];
  const meteors = [];
  let nextMeteorAt = performance.now() + 5000 + Math.random() * 6000;
  let nodes = [];
  function initNodes() {
    nodes = [];
    const dnaSteps = 28;
    const stepHeight = height / dnaSteps;
    for (let i = 0; i <= dnaSteps; i++) {
      const y = i * stepHeight;
      const angle = (i / dnaSteps) * Math.PI * 5;
      nodes.push(new Node(0, y, true, 1, angle, y));
      nodes.push(new Node(0, y, true, 2, angle + Math.PI, y));
    }
    const ambientCount = Math.min(Math.floor((width * height) / 11000), 80);
    for (let i = 0; i < ambientCount; i++) {
      const amb = new Node();
      amb.baseVx = (Math.random() - 0.5) * 0.45;
      amb.baseVy = (Math.random() - 0.5) * 0.45;
      if (Math.abs(amb.baseVx) < 0.12) amb.baseVx = amb.baseVx < 0 ? -0.2 : 0.2;
      if (Math.abs(amb.baseVy) < 0.12) amb.baseVy = amb.baseVy < 0 ? -0.2 : 0.2;
      amb.vx = amb.baseVx;
      amb.vy = amb.baseVy;
      amb.wobblePhase = Math.random() * Math.PI * 2;
      amb.wobbleSpeed = 0.015 + Math.random() * 0.02;
      nodes.push(amb);
    }
    initTechDnaNodes();
  }
  const techItems = [
    {
      name: 'Python',
      color: '#3776AB',
      desc: 'Otomasyon, veri işleme, bot geliştirme ve backend scriptleri için birincil dil.',
      desc_en: 'Primary language for automation, data processing, Discord bots, and backend scripting.',
      tags: ['Backend', 'Scripting', 'Automation', 'APIs'],
      projects: ['Discord Bot Hizmeti', 'Araçlar'],
      projects_en: ['Discord Bot Services', 'Automation Tools']
    },
    {
      name: 'Lua',
      color: '#5c82ff',
      desc: 'FiveM istemci ve sunucu taraflı oyun mantığı, performanslı oyun eklentileri mimarisi.',
      desc_en: 'FiveM client & server-side gameplay logic and high-performance game script architecture.',
      tags: ['FiveM', 'Game Dev', 'Scripts', 'High Performance'],
      projects: ['Özel FiveM Scriptleri', 'QBCore / Qbox Entegrasyonları'],
      projects_en: ['Custom FiveM Scripts', 'QBCore / Qbox Integrations']
    },
    {
      name: 'JavaScript',
      color: '#F7DF1E',
      desc: 'İnteraktif web deneyimleri, canvas animasyonları ve modern asenkron arayüzler.',
      desc_en: 'Interactive web experiences, canvas animations, and modern asynchronous UI architecture.',
      tags: ['Frontend', 'ES6+', 'Canvas API', 'DOM Engine'],
      projects: ['zodi4ctvn.github.io Kişisel Hub', 'İnteraktif Web Uygulamaları'],
      projects_en: ['zodi4ctvn.github.io Hub', 'Interactive Web Applications']
    },
    {
      name: 'Node.js',
      color: '#5FA04E',
      desc: 'Discord API bot motorları, REST API servisleri ve asenkron arka plan mimarisi.',
      desc_en: 'Discord API bot engines, RESTful web services, and async backend architectures.',
      tags: ['Runtime', 'Backend', 'WebSockets', 'Discord Bot'],
      projects: ['Lanyard Realtime Handler', 'Özel Discord Botları'],
      projects_en: ['Lanyard Realtime Handler', 'Custom Discord Bots']
    },
    {
      name: 'Discord.js',
      color: '#5865F2',
      desc: 'Gelişmiş komut sistemleri, etkinlik dinleyicileri ve Discord sunucu otomasyonu.',
      desc_en: 'Advanced slash command systems, real-time event listeners, and Discord community automation.',
      tags: ['Discord API', 'Slash Commands', 'Bot Dev'],
      projects: ['Topluluk Yönetim Botları', 'Webhook Entegrasyonları'],
      projects_en: ['Community Management Bots', 'Webhook Integrations']
    },
    {
      name: 'MySQL',
      color: '#00758F',
      desc: 'İlişkisel veritabanı tasarımı, FiveM sunucu tabloları ve veri kalıcılığı optimizasyonu.',
      desc_en: 'Relational database schema design, FiveM server storage, and high-load query optimization.',
      tags: ['Database', 'SQL Queries', 'Data Persistence'],
      projects: ['FiveM Oyuncu Veritabanı Mimarisi'],
      projects_en: ['FiveM Player Database Architecture']
    },
    {
      name: 'HTML5',
      color: '#E34F26',
      desc: 'Semantik web yapısı, erişilebilirlik, modern meta etiketler ve SEO optimizasyonu.',
      desc_en: 'Semantic HTML markup, accessibility best practices, SEO meta tags, and responsive design.',
      tags: ['Markup', 'SEO', 'Semantics', 'Modern Web'],
      projects: ['Dijital Profil Sayfası', 'Responsive UI Tasarımları'],
      projects_en: ['Digital Profile Portfolio', 'Responsive UI Layouts']
    },
    {
      name: 'CSS3',
      color: '#1572B6',
      desc: 'Glassmorphism, 3D tilt efektleri, modern temalar ve akıcı mikro animasyonlar.',
      desc_en: 'Glassmorphism, 3D tilt effects, dark cyber themes, and fluid micro-animations.',
      tags: ['Styles', 'Animations', 'Glassmorphism', 'Cyberpunk'],
      projects: ['Gelişmiş Takımyıldızı Arayüzü', 'Dinamik Tema Motoru'],
      projects_en: ['Advanced Constellation UI', 'Dynamic Theme Engine']
    },
    {
      name: 'GitHub',
      color: '#ffffff',
      desc: 'Versiyon kontrolü, GitHub Pages barındırma ve açık kaynaklı proje yönetimi.',
      desc_en: 'Version control, automated GitHub Pages deployments, and open-source project management.',
      tags: ['Git', 'CI/CD', 'Open Source', 'Deploy'],
      projects: ['zodi4ctvn.github.io Repository', 'Script Depoları'],
      projects_en: ['zodi4ctvn.github.io Repository', 'Open Source Script Repos']
    },
    {
      name: 'VS Code',
      color: '#007ACC',
      desc: 'Özelleştirilmiş siber ortam, entegre terminal, git iş akışı ve ana geliştirme merkezi.',
      desc_en: 'Customized cyberpunk dev environment, integrated terminal, and primary workflow center.',
      tags: ['IDE', 'Workflow', 'Productivity', 'Dev Environment'],
      projects: ['Günlük Kodlama & Script Geliştirme'],
      projects_en: ['Daily Development & Script Engineering']
    },
    {
      name: 'FiveM',
      color: '#f59e0b',
      desc: 'Özel GTA V roleplay sunucuları, optimize edilmiş istemci-sunucu senkronizasyonu.',
      desc_en: 'Custom GTA V roleplay servers and highly optimized client-server network synchronization.',
      tags: ['Roleplay Engine', 'Game Modding', 'Client/Server Sync'],
      projects: ['Özel Sunucu Mimarileri', 'HUD & UI Sistemleri'],
      projects_en: ['Custom Server Architectures', 'HUD & NUI Systems']
    },
    {
      name: 'QBCore',
      color: '#10b981',
      desc: 'FiveM için modüler ve kararlı roleplay altyapısı üzerinde sistem geliştirme.',
      desc_en: 'System and script development on top of the modular, stable QBCore FiveM framework.',
      tags: ['Framework', 'Economy', 'Jobs', 'Modular Code'],
      projects: ['QBCore Özel Envanter & Meslek Scriptleri'],
      projects_en: ['Custom QBCore Inventory & Job Scripts']
    },
    {
      name: 'Qbox',
      color: '#6366f1',
      desc: 'Modern, ox-lib tabanlı ve ultra yüksek performanslı FiveM framework mimarisi.',
      desc_en: 'Next-gen, ox-lib based, ultra high-performance FiveM framework architecture.',
      tags: ['Next-Gen RP', 'Ox-Lib', 'High FPS', 'Clean Code'],
      projects: ['Qbox Optimize Sunucu Paketleri'],
      projects_en: ['Qbox High-Performance Server Builds']
    },
    {
      name: 'Gemini',
      color: '#38bdf8',
      desc: 'Derin yapay zeka kodlama asistanı, karmaşık algoritma tasarımı ve refactoring.',
      desc_en: 'Deep agentic AI coding companion, complex algorithm design, and code optimization.',
      tags: ['AI Assistant', 'DeepMind', 'Code Architect'],
      projects: ['Antigravity IDE Geliştirme Oturumu'],
      projects_en: ['Antigravity IDE Development Sessions']
    },
    {
      name: 'Antigravity',
      color: '#a855f7',
      desc: 'Yeni nesil ajan tabanlı pair programming ve tam teşekküllü geliştirme ortamı.',
      desc_en: 'Next-generation agentic pair-programming workspace with proactive autonomous reasoning.',
      tags: ['Agentic AI', 'Pair Programming', 'Workspace Engine'],
      projects: ['zodi4ctvn Gelişmiş Özellik Güncellemeleri'],
      projects_en: ['zodi4ctvn Architecture & Features']
    },
    {
      name: 'Claude',
      color: '#d97706',
      desc: 'Gelişmiş dil modelleriyle mimari analiz ve kod inceleme.',
      desc_en: 'In-depth architectural analysis, code reviews, and reasoning with advanced LLMs.',
      tags: ['AI Model', 'Analysis', 'Architecture'],
      projects: ['Kod Standartları & Analiz'],
      projects_en: ['Code Quality & Architecture Reviews']
    },
    {
      name: 'Cursor',
      color: '#06b6d4',
      desc: 'Yapay zeka güdümlü akıllı kod tamamlama ve hızlı refaktör aracı.',
      desc_en: 'AI-assisted code editor for rapid prototyping and codebase refactoring.',
      tags: ['AI Code Editor', 'Speed', 'Refactoring'],
      projects: ['Hızlı Prototip Geliştirme'],
      projects_en: ['Rapid Prototyping & Iteration']
    }
  ];
  class TechDnaParticle {
    constructor() {
      this.spawn(true);
    }
    spawn(initial = false) {
      this.tech = techItems[Math.floor(Math.random() * techItems.length)];
      const margin = 60;
      this.x = margin + Math.random() * (width - margin * 2);
      this.y = margin + Math.random() * (height - margin * 2);
      // Sakin ve yavas salinim
      this.baseVx = (Math.random() - 0.5) * 0.08;
      this.baseVy = (Math.random() - 0.5) * 0.08;
      if (Math.abs(this.baseVx) < 0.025) this.baseVx = this.baseVx < 0 ? -0.04 : 0.04;
      if (Math.abs(this.baseVy) < 0.025) this.baseVy = this.baseVy < 0 ? -0.04 : 0.04;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.003 + Math.random() * 0.005;
      this.life = initial ? Math.random() * 400 : 0;
      this.maxLife = 600 + Math.random() * 400;
      this.alpha = 0;
    }
    update() {
      this.life++;
      this.angle += this.angleSpeed;
      const sinOffset = Math.sin(this.angle) * 0.05;
      const cosOffset = Math.cos(this.angle) * 0.05;
      this.x += this.vx + sinOffset;
      this.y += this.vy + cosOffset;
      const minX = 20;
      const maxX = width - 110;
      const minY = 25;
      const maxY = height - 35;
      if (this.x < minX) {
        this.x = minX;
        this.vx = Math.abs(this.vx) * 0.8;
      } else if (this.x > maxX) {
        this.x = maxX;
        this.vx = -Math.abs(this.vx) * 0.8;
      }
      if (this.y < minY) {
        this.y = minY;
        this.vy = Math.abs(this.vy) * 0.8;
      } else if (this.y > maxY) {
        this.y = maxY;
        this.vy = -Math.abs(this.vy) * 0.8;
      }
      const progress = this.life / this.maxLife;
      if (progress < 0.15) {
        this.alpha = (progress / 0.15) * 0.8;
      } else if (progress > 0.85) {
        this.alpha = ((1 - progress) / 0.15) * 0.8;
      } else {
        this.alpha = 0.8;
      }
      // Mouse tech balonlarini kacirmasin, aksine mouse yakindayken durulsun
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 60) {
          this.vx *= 0.85;
          this.vy *= 0.85;
        }
      }
      this.vx += (this.baseVx - this.vx) * 0.02;
      this.vy += (this.baseVy - this.vy) * 0.02;
      if (this.life >= this.maxLife) {
        this.spawn(false);
      }
    }
    draw() {
      if (this.alpha <= 0.01) return;
      ctx.save();
      // Hover glow: if mouse is close, increase glow
      const isHovered = (mouse.x !== null && mouse.y !== null &&
        mouse.x >= this.x - 25 && mouse.x <= this.x + 110 &&
        mouse.y >= this.y - 25 && mouse.y <= this.y + 25);
      const glowAlpha = isHovered ? Math.min(1, this.alpha + 0.2) : Math.max(0, Math.min(1, this.alpha));
      ctx.globalAlpha = glowAlpha;
      // Glow ring when hovered
      if (isHovered) {
        ctx.shadowBlur = 28;
        ctx.shadowColor = this.tech.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = this.tech.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
        ctx.globalAlpha = glowAlpha;
      }
      ctx.shadowBlur = isHovered ? 22 : 10;
      ctx.shadowColor = this.tech.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, isHovered ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.tech.color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, isHovered ? 6.5 : 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = this.tech.color;
      ctx.lineWidth = isHovered ? 1.2 : 0.8;
      ctx.stroke();
      ctx.font = isHovered ? '600 10.5px monospace' : '500 9.5px monospace';
      ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)';
      ctx.shadowBlur = isHovered ? 10 : 4;
      ctx.shadowColor = isHovered ? this.tech.color : 'rgba(255, 255, 255, 0.4)';
      ctx.fillText(this.tech.name, this.x + 8, this.y + 3);
      ctx.restore();
    }
  }
  let techDnaNodes = [];
  function initTechDnaNodes() {
    techDnaNodes = [];
    const count = Math.min(Math.floor(width / 75), 18);
    for (let i = 0; i < count; i++) {
      techDnaNodes.push(new TechDnaParticle());
    }
  }
  initNodes();
  const CONNECTION_DIST = 115;
  const MOUSE_CONNECTION_DIST = 145;
  function render() {
    if (document.hidden) {
      requestAnimationFrame(render);
      return;
    }
    ctx.clearRect(0, 0, width, height);
    const preset = window._bgPreset || 'dna';
    if (preset === 'mist') {
      requestAnimationFrame(render);
      return;
    }

    const bass = window._bassLevel || 0;

    if (preset === 'dna') {
      for (let tNode of techDnaNodes) {
        tNode.update();
        tNode.draw();
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      if (preset === 'stars' && nodeA.isDna) continue;
      nodeA.update();
      nodeA.draw(bass);
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        if (preset === 'stars' && nodeB.isDna) continue;
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * (0.34 + bass * 0.24);
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.7, alpha).toFixed(3)})`;
          ctx.lineWidth = 1.05 + bass * 0.45;
          ctx.stroke();
        }
      }
      if (mouse.x !== null && mouse.y !== null) {
        const dx = nodeA.x - mouse.x;
        const dy = nodeA.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_CONNECTION_DIST) {
          const alpha = (1 - dist / MOUSE_CONNECTION_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw & update DNA shockwave ripples
    for (let rIdx = dnaRipples.length - 1; rIdx >= 0; rIdx--) {
      const r = dnaRipples[rIdx];
      r.radius += 7.5;
      r.alpha *= 0.94;
      if (r.alpha < 0.02 || r.radius > r.maxRadius) {
        dnaRipples.splice(rIdx, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha.toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Periodic shooting star / meteor effect (every ~10-15s)
    const now = performance.now();
    if (now >= nextMeteorAt) {
      nextMeteorAt = now + 10000 + Math.random() * 5000;
      const fromLeft = Math.random() > 0.35;
      meteors.push({
        x: fromLeft ? Math.random() * width * 0.65 : width * 0.35 + Math.random() * width * 0.65,
        y: -20,
        vx: (fromLeft ? 1 : -1) * (8 + Math.random() * 5),
        vy: 5 + Math.random() * 3.5,
        len: 75 + Math.random() * 55,
        alpha: 0.9
      });
    }
    for (let mIdx = meteors.length - 1; mIdx >= 0; mIdx--) {
      const m = meteors[mIdx];
      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= 0.014;
      if (m.alpha <= 0 || m.y > height + 60 || m.x < -120 || m.x > width + 120) {
        meteors.splice(mIdx, 1);
        continue;
      }
      const mag = Math.hypot(m.vx, m.vy) || 1;
      const tx = m.x - (m.vx / mag) * m.len;
      const ty = m.y - (m.vy / mag) * m.len;
      const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
      grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha.toFixed(2)})`);
      grad.addColorStop(0.35, `rgba(180, 235, 255, ${(m.alpha * 0.55).toFixed(2)})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }
  render();

  // Click on screen to inspect constellation tech nodes & trigger DNA ripple
  window.addEventListener('click', (e) => {
    // If Discord card modal is open, or click is within modal/pill/interactive UI, ignore
    const dcModal = document.getElementById('discordCardModal');
    if (dcModal && !dcModal.classList.contains('hidden')) {
      return;
    }
    if (e.target.closest('a, button, input, .unified-card, .gh-edge-handle, .gh-split-drawer, .mem-edge-handle, .mem-drawer, .mem-lightbox, .music-player-wrap, .lang-toggle-wrap, .brand-footer, .bg-preset-btn, .confirm-modal-box, .tech-modal-box, .interactive-terminal, .entry-curtain, .discord-card, .discord-card-overlay, .discord-activity-pill, #discordPill')) {
      return;
    }
    const clickX = e.clientX;
    const clickY = e.clientY;

    dnaRipples.push({
      x: clickX,
      y: clickY,
      radius: 10,
      maxRadius: 260,
      alpha: 0.45
    });

    for (let tNode of techDnaNodes) {
      if (tNode.alpha > 0.1) {
        const dx = clickX - tNode.x;
        const dy = clickY - tNode.y;
        // Rahat ve geniş tıklama alanı (baloncuk ve yazı çevresi)
        if (dx >= -25 && dx <= 110 && dy >= -25 && dy <= 25) {
          openTechModal(tNode.tech);
          playUiClickSound(580, 'triangle', 0.08);
          break;
        }
      }
    }
  });
}
function initLanyardActivity() {
  const PRIMARY_ID = '1403455771563528252';
  const avatarEl = document.getElementById('discordAvatar');
  const statusDot = document.getElementById('userStatusDot');
  const usernameEl = document.getElementById('pillUsername');
  const actStateEl = document.getElementById('actState');
  const bgBanner = document.getElementById('discordBgBanner');
  const pillBannerSlice = document.getElementById('pillBannerSlice');
  const dynamicAmbient = document.getElementById('dynamicAmbient');
  const customBadge = document.getElementById('pillCustomBadge');
  const spotifyProgressWrap = document.getElementById('spotifyProgressWrap');
  const spotifyProgressBar = document.getElementById('spotifyProgressBar');
  const spotifyCurrentTime = document.getElementById('spotifyCurrentTime');
  const spotifyTotalTime = document.getElementById('spotifyTotalTime');
  let spotifyInterval = null;
  let heartbeatTimer = null;
  let reconnectTimer = null;
  let socket = null;

  function formatTime(ms) {
    if (!ms || isNaN(ms)) return '0:00';
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function applyLanyardData(data) {
    if (!data) return;
    // Sync with Discord profile card modal
    syncCardData(data);
    if (typeof window._refreshMemoriesIfProfiles === 'function') {
      window._refreshMemoriesIfProfiles();
    }
    if (data.discord_user && data.discord_user.id && data.discord_user.avatar) {
      const avatarSrc = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`;
      avatarEl.src = avatarSrc;
      const miniAv = document.getElementById('ucMiniAvatar');
      if (miniAv) miniAv.src = avatarSrc;
      const fav = document.querySelector('link[rel="icon"]');
      if (fav) fav.href = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;
    }
    if (data.discord_user && data.discord_user.username) {
      usernameEl.textContent = data.discord_user.username;
      const handleEl = document.getElementById('ucHandle');
      if (handleEl) handleEl.textContent = `@${data.discord_user.username}`;
    }
    if (data.discord_user && data.discord_user.banner) {
      const ext = data.discord_user.banner.startsWith('a_') ? 'gif' : 'png';
      const bannerUrl = `https://cdn.discordapp.com/banners/${data.discord_user.id}/${data.discord_user.banner}.${ext}?size=1024`;
      if (bgBanner) {
        bgBanner.style.backgroundImage = `url('${bannerUrl}')`;
        bgBanner.style.opacity = '0.35';
      }
      if (pillBannerSlice) {
        pillBannerSlice.style.backgroundImage = `url('${bannerUrl}')`;
        pillBannerSlice.classList.add('has-banner');
      }
    } else {
      if (data.discord_user && data.discord_user.avatar && bgBanner) {
        const ext = data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
        const fallbackBanner = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${ext}?size=512`;
        bgBanner.style.backgroundImage = `url('${fallbackBanner}')`;
        bgBanner.style.opacity = '0.18';
      }
    }
    const status = data.discord_status || 'offline';
    statusDot.className = `user-status-dot ${status}`;
    const miniStatus = document.getElementById('ucMiniStatus');
    if (miniStatus) miniStatus.className = `user-status-dot ${status}`;
    const dcSubcard = document.getElementById('ucDiscordSubcard');
    if (dcSubcard) {
      dcSubcard.classList.remove('status-online', 'status-dnd', 'status-idle', 'status-offline');
      dcSubcard.classList.add(`status-${status}`);
    }

    // Reset Spotify timer if any
    if (spotifyInterval) {
      clearInterval(spotifyInterval);
      spotifyInterval = null;
    }

    if (data.listening_to_spotify && data.spotify) {
      const song = data.spotify.song;
      const artist = data.spotify.artist;
      const art = data.spotify.album_art_url;
      actStateEl.textContent = `Listening to ${song} - ${artist}`;
      const spArt = document.getElementById('ucSpotifyArt');
      if (spArt && art) {
        spArt.src = art;
        spArt.classList.remove('hidden');
      }

      if (customBadge) {
        customBadge.textContent = 'Spotify';
        customBadge.className = 'pill-custom-badge badge-spotify';
      }

      if (spotifyProgressWrap && data.spotify.timestamps) {
        spotifyProgressWrap.classList.remove('hidden');
        const start = data.spotify.timestamps.start;
        const end = data.spotify.timestamps.end;
        const totalDuration = end - start;

        const updateSpotifyBar = () => {
          const now = Date.now();
          const current = Math.max(0, Math.min(now - start, totalDuration));
          const pct = Math.min(100, Math.max(0, (current / totalDuration) * 100));
          if (spotifyProgressBar) {
            spotifyProgressBar.style.setProperty('--spotify-progress-pct', `${pct}%`);
          }
          if (spotifyCurrentTime) spotifyCurrentTime.textContent = formatTime(current);
          if (spotifyTotalTime) spotifyTotalTime.textContent = formatTime(totalDuration);
        };
        updateSpotifyBar();
        spotifyInterval = setInterval(updateSpotifyBar, 1000);
      }

      if (art) {
        extractDominantColor(art, (color) => {
          if (dynamicAmbient) {
            dynamicAmbient.style.background = `radial-gradient(circle at 50% 50%, rgba(${color.r}, ${color.g}, ${color.b}, 0.45) 0%, transparent 70%)`;
            dynamicAmbient.style.opacity = '0.7';
          }
          document.documentElement.style.setProperty('--spotify-accent', `rgba(${color.r}, ${color.g}, ${color.b}, 0.45)`);
        });
      }
    } else {
      const spArt = document.getElementById('ucSpotifyArt');
      if (spArt) spArt.classList.add('hidden');
      if (spotifyProgressWrap) spotifyProgressWrap.classList.add('hidden');

      if (data.activities && data.activities.length > 0) {
        const nonSpotifyActivities = data.activities.filter(a => a.id !== 'spotify:1');
        const mainAct = nonSpotifyActivities.find(a => a.type !== 4) || nonSpotifyActivities[0];

        if (mainAct) {
          const name = mainAct.name || '';
          const details = mainAct.details ? ` - ${mainAct.details}` : '';
          const state = mainAct.state ? ` (${mainAct.state})` : '';

          if (customBadge) {
            if (name.toLowerCase().includes('visual studio code') || name.toLowerCase().includes('code')) {
              customBadge.textContent = 'VS Code';
              customBadge.className = 'pill-custom-badge badge-vscode';
            } else {
              customBadge.textContent = name;
              customBadge.className = 'pill-custom-badge';
            }
          }

          switch (mainAct.type) {
            case 0:
              actStateEl.textContent = `Playing ${name}${details}`;
              break;
            case 1:
              actStateEl.textContent = `Streaming ${name}${details}`;
              break;
            case 2:
              actStateEl.textContent = `Listening to ${name}${details}`;
              break;
            case 3:
              actStateEl.textContent = `Watching ${name}${details}`;
              break;
            case 4:
              actStateEl.textContent = mainAct.state || mainAct.name || 'Active';
              break;
            case 5:
              actStateEl.textContent = `Competing in ${name}${details}`;
              break;
            default:
              actStateEl.textContent = `${name}${details}`;
              break;
          }

          // Show activity icon if available
          if (spArt && mainAct.application_id && mainAct.assets && mainAct.assets.large_image) {
            const imgKey = mainAct.assets.large_image;
            spArt.src = imgKey.startsWith('mp:')
              ? `https://media.discordapp.net/${imgKey.slice(3)}`
              : `https://cdn.discordapp.com/app-assets/${mainAct.application_id}/${imgKey}.png`;
            spArt.classList.remove('hidden');
          }

          // Show elapsed time if activity has start timestamp
          if (mainAct.timestamps && mainAct.timestamps.start) {
            const actStart = mainAct.timestamps.start;
            const baseText = actStateEl.textContent;
            const updateElapsed = () => {
              const elapsed = Math.max(0, Date.now() - actStart);
              actStateEl.textContent = `${baseText} (${formatTime(elapsed)} elapsed)`;
            };
            updateElapsed();
            spotifyInterval = setInterval(updateElapsed, 1000);
          }
        } else if (status !== 'offline') {
          if (customBadge) customBadge.className = 'pill-custom-badge hidden';
          actStateEl.textContent = 'Active on Discord';
        } else {
          if (customBadge) customBadge.className = 'pill-custom-badge hidden';
          actStateEl.textContent = 'Offline / Sleeping';
        }
      } else if (status !== 'offline') {
        if (customBadge) customBadge.className = 'pill-custom-badge hidden';
        actStateEl.textContent = 'Active on Discord';
      } else {
        if (customBadge) customBadge.className = 'pill-custom-badge hidden';
        actStateEl.textContent = 'Offline / Sleeping';
      }
    }
  }

  fetch(`https://api.lanyard.rest/v1/users/${PRIMARY_ID}`)
    .then(r => r.json())
    .then(json => {
      if (json.success && json.data) applyLanyardData(json.data);
      else fallbackMock();
    })
    .catch(() => fallbackMock());

  function connectSocket() {
    if (socket) {
      try { socket.close(); } catch (_) { }
    }
    clearInterval(heartbeatTimer);
    clearTimeout(reconnectTimer);

    try {
      socket = new WebSocket('wss://api.lanyard.rest/socket');

      socket.onopen = () => {
        // Socket opened; Hello (op: 1) packet will arrive first from Lanyard
      };

      socket.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          // op 1 = Hello (provides heartbeat_interval in ms)
          if (msg.op === 1) {
            const interval = msg.d && msg.d.heartbeat_interval ? msg.d.heartbeat_interval : 30000;
            clearInterval(heartbeatTimer);
            heartbeatTimer = setInterval(() => {
              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ op: 3 }));
              }
            }, interval);

            // Now subscribe
            socket.send(JSON.stringify({
              op: 2,
              d: { subscribe_to_id: PRIMARY_ID }
            }));
          } else if (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') {
            applyLanyardData(msg.d);
          }
        } catch (parseErr) {
          console.warn('Lanyard socket message parse error:', parseErr);
        }
      };

      socket.onclose = () => {
        clearInterval(heartbeatTimer);
        reconnectTimer = setTimeout(connectSocket, 5000);
      };

      socket.onerror = () => {
        try { socket.close(); } catch (_) { }
      };
    } catch (err) {
      console.warn('Lanyard socket connection skipped:', err);
      reconnectTimer = setTimeout(connectSocket, 10000);
    }
  }

  connectSocket();

  function fallbackMock() {
    usernameEl.textContent = 'zodi4ctvn';
    actStateEl.textContent = 'Active on Discord';
    statusDot.className = 'user-status-dot online';
  }
}
function extractDominantColor(imgUrl, callback) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imgUrl;
  img.onload = () => {
    try {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      c.width = 12;
      c.height = 12;
      ctx.drawImage(img, 0, 0, 12, 12);
      const data = ctx.getImageData(0, 0, 12, 12).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const br = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (br > 35 && br < 225) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }
      if (count > 0) {
        callback({
          r: Math.round(r / count),
          g: Math.round(g / count),
          b: Math.round(b / count)
        });
      } else {
        callback({ r: 56, g: 189, b: 248 });
      }
    } catch (e) {
      callback({ r: 88, g: 101, b: 242 });
    }
  };
  img.onerror = () => {
    callback({ r: 88, g: 101, b: 242 });
  };
}
function initInteractiveTerminal() {
  const toggleBtn = document.getElementById('terminalToggleBtn');
  const terminalCard = document.getElementById('terminalCard');
  const termClose = document.getElementById('termClose');
  const termBody = document.getElementById('terminalBody');
  const termInput = document.getElementById('termInput');
  if (!toggleBtn || !terminalCard) return;
  function toggleTerminal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    terminalCard.classList.toggle('hidden');
    if (!terminalCard.classList.contains('hidden') && termInput) {
      setTimeout(() => termInput.focus(), 150);
    }
  }
  toggleBtn.addEventListener('click', toggleTerminal);
  if (termClose) {
    termClose.addEventListener('click', (e) => {
      e.stopPropagation();
      terminalCard.classList.add('hidden');
    });
  }
  const commands = {
    help: () => {
      const lang = typeof currentLang !== 'undefined' ? currentLang : 'tr';
      return [...I18N[lang].commandsHelp];
    },
    theme: (args) => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const mode = (args[0] || '').toLowerCase();
      const themes = ['matrix', 'bloodmoon', 'synthwave', 'void', 'default'];
      if (!mode) {
        return isEn ? [
          'Available Themes: matrix, bloodmoon, synthwave, void (default)',
          'Usage: theme <name>  (e.g.: theme matrix)'
        ] : [
          'Mevcut Temalar: matrix, bloodmoon, synthwave, void (varsayılan)',
          'Kullanım: theme <isim>  (Örn: theme matrix)'
        ];
      }
      document.body.classList.remove('theme-matrix', 'theme-bloodmoon', 'theme-synthwave');
      if (mode === 'matrix') {
        document.body.classList.add('theme-matrix');
        try { localStorage.setItem('zodi4c_theme', 'matrix'); } catch (_) { }
        return [isEn ? '[OK] Theme set to "matrix" (Emerald Rain).' : '[OK] Tema "matrix" (Emerald Rain) olarak ayarlandı.'];
      } else if (mode === 'bloodmoon' || mode === 'crimson') {
        document.body.classList.add('theme-bloodmoon');
        try { localStorage.setItem('zodi4c_theme', 'bloodmoon'); } catch (_) { }
        return [isEn ? '[OK] Theme set to "bloodmoon" (Crimson Cyber).' : '[OK] Tema "bloodmoon" (Crimson Cyber) olarak ayarlandı.'];
      } else if (mode === 'synthwave' || mode === 'violet') {
        document.body.classList.add('theme-synthwave');
        try { localStorage.setItem('zodi4c_theme', 'synthwave'); } catch (_) { }
        return [isEn ? '[OK] Theme set to "synthwave" (Neon Violet).' : '[OK] Tema "synthwave" (Neon Violet) olarak ayarlandı.'];
      } else if (mode === 'void' || mode === 'default' || mode === 'reset') {
        try { localStorage.removeItem('zodi4c_theme'); } catch (_) { }
        return [isEn ? '[OK] Reverted to default Void / Cyber Cyan theme.' : '[OK] Varsayılan Void / Cyber Cyan temasına dönüldü.'];
      } else {
        return [isEn ? `Unknown theme: '${mode}'. Valid: matrix, bloodmoon, synthwave, void` : `Bilinmeyen tema: '${mode}'. Geçerli olanlar: matrix, bloodmoon, synthwave, void`];
      }
    },
    lang: (args) => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        return isEn ? [
          `Current Language: ${currentLang.toUpperCase()}`,
          'Usage: lang <en|tr>  (e.g.: lang tr)'
        ] : [
          `Geçerli Dil: ${currentLang.toUpperCase()}`,
          'Kullanım: lang <en|tr>  (Örn: lang en)'
        ];
      }
      if (target === 'tr' || target === 'turkish' || target === 'turkce') {
        applyLanguage('tr');
        return ['[OK] Dil Türkçe (TR) olarak ayarlandı.'];
      } else if (target === 'en' || target === 'english' || target === 'eng') {
        applyLanguage('en');
        return ['[OK] Language switched to English (EN).'];
      } else {
        return isEn ? [
          `Invalid language code: '${target}'. Supported: 'en', 'tr'`,
          'Usage: lang en  or  lang tr'
        ] : [
          `Geçersiz dil kodu: '${target}'. Desteklenenler: 'tr', 'en'`,
          'Kullanım: lang tr  veya  lang en'
        ];
      }
    },
    whoami: () => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      return isEn ? [
        'Zodi4c (zodi4ctvn)',
        'Role: Lua, FiveM, Discord Bot, Python, JS',
        'Discord: 1403455771563528252 / 1350881372104949903'
      ] : [
        'Zodi4c (zodi4ctvn)',
        'Rol: Lua, FiveM, Discord Bot, Python, JS',
        'Discord: 1403455771563528252 / 1350881372104949903'
      ];
    },
    ls: () => ['about.txt    skills.json    socials.lnk    projects.md    constellation.map'],
    dir: () => ['about.txt    skills.json    socials.lnk    projects.md    constellation.map'],
    stars: () => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      return [
        isEn ? 'Constellation Projects:' : 'Takımyıldızı Projeleri:',
        '  [1] GitHub: https://github.com/zodi4ctvn/zodi4ctvn.github.io',
        '  [2] Discord Profile: ID 1403455771563528252',
        '  [3] guns.lol: https://guns.lol/zodi4c',
        '  [4] YouTube: https://www.youtube.com/@zodi4ctvn'
      ];
    },
    cat: (args) => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const file = args[0] ? args[0].toLowerCase() : '';
      if (!file) return [isEn ? 'Error: Specify a filename. Example: cat about.txt' : 'Hata: Bir dosya adı belirtin. Örnek: cat about.txt'];
      if (file === 'about.txt') {
        const lang = typeof currentLang !== 'undefined' ? currentLang : 'tr';
        return I18N[lang].catAbout;
      }
      if (file === 'socials.lnk') {
        return [
          isEn ? 'Social Links & Profiles:' : 'Bağlantılar & Profiller:',
          '  - Discord Primary: https://discord.com/users/1403455771563528252',
          '  - Discord Backup: https://discord.com/users/1350881372104949903',
          '  - guns.lol: https://guns.lol/zodi4c',
          '  - YouTube: https://www.youtube.com/@zodi4ctvn',
          '  - GitHub: https://github.com/zodi4ctvn'
        ];
      }
      if (file === 'skills.json') {
        const lang = typeof currentLang !== 'undefined' ? currentLang : 'tr';
        return [I18N[lang].catSkills];
      }
      if (file === 'projects.md' || file === 'constellation.map') {
        return isEn ? [
          '# Projects & Constellations',
          '- zodi4ctvn.github.io (Personal Hub)',
          '- Discord Bot & API Integrations',
          '- FiveM Script & Framework Engineering'
        ] : [
          '# Projeler & Yıldızlar',
          '- zodi4ctvn.github.io (Kişisel Alan)',
          '- Discord Bot & API Entegrasyonları',
          '- FiveM Script & Framework Geliştirme'
        ];
      }
      return [isEn ? `cat: ${file}: No such file found.` : `cat: ${file}: Böyle bir dosya bulunamadı.`];
    },
    skills: () => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      return [
        isEn ? 'Technical Skills:' : 'Yetenekler:',
        '  > JavaScript / TypeScript  [======....] 60%',
        '  > Lua / FiveM (QBCore/Qbox) [==========] 100%',
        '  > Node.js / Discord API     [=========.] 90%',
        '  > Python Scripting           [========..] 80%',
        '  > Modern CSS / Canvas Art   [=======...] 70%'
      ];
    },
    clear: () => {
      termBody.innerHTML = '';
      return [];
    },
    repo: () => {
      window.open('https://github.com/zodi4ctvn/zodi4ctvn.github.io', '_blank', 'noopener,noreferrer');
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      return [isEn ? 'Opening GitHub repository in a new tab...' : 'GitHub deposu yeni sekmede açılıyor...'];
    },
    date: () => [new Date().toString()],
    music: (args) => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const sub = (args[0] || '').toLowerCase();
      if (!sub || sub === 'list') {
        const list = YT_PLAYLIST.map((t, i) => `  [${i + 1}] ${t.title} - ${t.artist}${i === currentTrackIndex ? ' (active)' : ''}`);
        return [isEn ? 'Playlist:' : 'Çalma Listesi:', ...list, isEn ? 'Usage: music <next|prev|pause|play|list>' : 'Kullanım: music <next|prev|pause|play|list>'];
      }
      if (sub === 'next') { playNextTrack(); return [`Playing: ${YT_PLAYLIST[currentTrackIndex].title}`]; }
      if (sub === 'prev') { playTrackAt(currentTrackIndex - 1); return [`Playing: ${YT_PLAYLIST[currentTrackIndex].title}`]; }
      if (sub === 'pause') { pauseBackgroundMusic(); return [isEn ? 'Music paused.' : 'Müzik duraklatıldı.']; }
      if (sub === 'play') { startBackgroundMusic(); return [`Playing: ${YT_PLAYLIST[currentTrackIndex].title}`]; }
      return [isEn ? `Unknown subcommand: ${sub}` : `Bilinmeyen alt komut: ${sub}`];
    },
    copy: (args) => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const what = (args[0] || '').toLowerCase();
      if (what === 'discord' || !what) {
        copyDiscordHandle();
        return [isEn ? '[OK] Copied @zodi4ctvn to clipboard.' : '[OK] zodi4ctvn panoya kopyalandı.'];
      }
      return [isEn ? 'Usage: copy discord' : 'Kullanım: copy discord'];
    },
    exit: () => {
      terminalCard.classList.add('hidden');
      return [];
    }
  };
  if (termInput) {
    const cmdHistory = [];
    let histIdx = -1;
    termInput.addEventListener('keydown', (e) => {
      // Mekanik klavye tıklama sesi (BackSpace, Enter veya normal tuşlarda)
      if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
        playMechanicalKeySound(e.key);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        histIdx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
        termInput.value = cmdHistory[histIdx];
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx === -1) return;
        histIdx += 1;
        if (histIdx >= cmdHistory.length) {
          histIdx = -1;
          termInput.value = '';
        } else {
          termInput.value = cmdHistory[histIdx];
        }
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const val = termInput.value.trim().toLowerCase();
        if (!val) return;
        const match = Object.keys(commands).find((c) => c.startsWith(val));
        if (match) termInput.value = match;
        return;
      }

      if (e.key === 'Enter') {
        const raw = termInput.value.trim();
        termInput.value = '';
        histIdx = -1;
        if (!raw) return;
        cmdHistory.push(raw);
        appendLine(`zodi4c@root:~$ ${raw}`, 'cmd');
        const parts = raw.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        if (commands[cmd]) {
          const lines = commands[cmd](args);
          lines.forEach(l => appendLine(l, 'output'));
        } else {
          const lang = typeof currentLang !== 'undefined' ? currentLang : 'tr';
          appendLine(I18N[lang].terminal.notFound.replace('{cmd}', cmd), 'error');
        }
        termBody.scrollTop = termBody.scrollHeight;
      }
    });
  }
  function appendLine(text, type = 'output') {
    const div = document.createElement('div');
    div.className = `term-line ${type}`;
    div.textContent = text;
    termBody.appendChild(div);
  }
}
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}
function playUiClickSound() {
  // UI click & hover sounds disabled
}

/* ⌨️ Mekanik Klavye (Mechanical Keyboard Switch) Ses Simülatörü */
let lastKeySoundTime = 0;
function playMechanicalKeySound(key = '') {
  try {
    const now = performance.now();
    // Flood koruması (tuşa basılı tutunca aşırı gürültüyü engeller)
    if (now - lastKeySoundTime < 35) return;
    lastKeySoundTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Tuşa göre hafif akustik frekans çeşitliliği (doğal click/thock)
    const isEnter = key === 'Enter';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';

    let baseFreq = 480;
    if (isEnter) baseFreq = 340;
    else if (isSpace) baseFreq = 310;
    else if (isBackspace) baseFreq = 420;
    else baseFreq = 460 + Math.random() * 80;

    // 1. Switch Click (Tık - keskin yüksek klik)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(baseFreq * 2.8, t);
    clickOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, t + 0.012);
    clickGain.gain.setValueAtTime(0.035, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.02);

    // 2. Switch Bottom-out / Housing Thock (Tok vuruntu)
    const thockOsc = ctx.createOscillator();
    const thockGain = ctx.createGain();
    thockOsc.type = 'sine';
    thockOsc.frequency.setValueAtTime(baseFreq, t + 0.004);
    thockOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, t + 0.045);
    thockGain.gain.setValueAtTime(0.04, t + 0.004);
    thockGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    thockOsc.connect(thockGain);
    thockGain.connect(ctx.destination);
    thockOsc.start(t + 0.004);
    thockOsc.stop(t + 0.055);
  } catch (_) { }
}
function initButtonAudioFeedback() {
  // UI click & hover audio feedback disabled
}
function initKonamiEasterEgg() {
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let position = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const expected = konamiSequence[position].toLowerCase();
    if (key === expected) {
      position++;
      if (position === konamiSequence.length) {
        triggerConfetti();
        position = 0;
      }
    } else {
      position = 0;
    }
  });
  function triggerConfetti() {
    playUiClickSound(880, 'sine', 0.2);
    for (let i = 0; i < 65; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.zIndex = '999999';
      el.style.width = `${Math.random() * 8 + 4}px`;
      el.style.height = `${Math.random() * 8 + 4}px`;
      el.style.backgroundColor = ['#5865F2', '#ffd700', '#ff0000', '#00ff66', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 6)];
      el.style.top = '-10px';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.pointerEvents = 'none';
      el.style.opacity = '1';
      el.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease';
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        const destX = (Math.random() - 0.5) * 350;
        const destY = window.innerHeight + 50;
        el.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 2600);
    }
  }
}
let isMusicPlaying = false;
let audioAnalyser = null;
let audioFreqData = null;
let audioSourceConnected = false;

function ensureAudioAnalyser() {
  if (audioSourceConnected) {
    if (audioAnalyser && audioAnalyser.context && audioAnalyser.context.state === 'suspended') {
      audioAnalyser.context.resume().catch(() => { });
    }
    return;
  }
  const bgAudio = document.getElementById('bgAudio');
  if (!bgAudio) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const actx = getAudioContext ? getAudioContext() : new AudioCtx();
    if (!actx) return;
    if (actx.state === 'suspended') actx.resume().catch(() => { });
    const srcNode = actx.createMediaElementSource(bgAudio);
    const analyser = actx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.78;
    srcNode.connect(analyser);
    analyser.connect(actx.destination);
    audioAnalyser = analyser;
    audioFreqData = new Uint8Array(analyser.frequencyBinCount);
    audioSourceConnected = true;
  } catch (_) { }
}

function initBottomEqualizerVisualizer() {
  const canvas = document.getElementById('bottomVisualizerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = 42);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = 42;
  });

  const barWidth = 3;
  const barGap = 3.5;
  let barHeights = [];

  function draw() {
    requestAnimationFrame(draw);
    if (document.hidden) return;
    ctx.clearRect(0, 0, width, height);

    const totalBars = Math.floor(width / (barWidth + barGap));
    if (barHeights.length !== totalBars) {
      barHeights = new Array(totalBars).fill(2);
    }

    let hasRealFreq = false;
    let rawBass = 0;
    if (isMusicPlaying && usingLocalAudio && audioAnalyser && audioFreqData) {
      audioAnalyser.getByteFrequencyData(audioFreqData);
      for (let k = 0; k < audioFreqData.length; k++) {
        if (audioFreqData[k] > 0) { hasRealFreq = true; break; }
      }
      // Compute low-frequency bass energy (bins 0..4 ~ 20-120 Hz)
      let bassSum = 0;
      for (let b = 0; b < 5 && b < audioFreqData.length; b++) bassSum += audioFreqData[b];
      rawBass = (bassSum / 5) / 255;
    } else if (isMusicPlaying) {
      rawBass = Math.max(0, Math.sin(performance.now() * 0.006)) * 0.45;
    }
    window._bassLevel = (window._bassLevel || 0) + (rawBass - (window._bassLevel || 0)) * 0.22;

    const t = performance.now() * 0.0038;
    const halfBars = Math.max(1, Math.floor(totalBars / 2));

    for (let i = 0; i < totalBars; i++) {
      let targetH = 2;
      if (isMusicPlaying && hasRealFreq) {
        // Mirror frequency spectrum from center outward for balanced visual feel
        const distFromCenter = Math.abs(i - halfBars) / halfBars;
        const binIdx = Math.min(audioFreqData.length - 1, Math.floor(distFromCenter * (audioFreqData.length * 0.72)));
        const val = audioFreqData[binIdx] / 255;
        targetH = Math.max(2, Math.pow(val, 1.25) * (height - 3));
      } else if (isMusicPlaying) {
        const w1 = Math.sin(t * 2.3 + i * 0.11);
        const w2 = Math.cos(t * 1.5 - i * 0.07);
        const w3 = Math.sin(t * 3.8 + i * 0.22);
        const dynamicBeats = Math.pow(Math.abs(w1 * w2 * 0.72 + w3 * 0.28), 1.55);
        targetH = Math.max(2, dynamicBeats * (height - 3));
      } else {
        targetH = 1.5;
      }

      barHeights[i] += (targetH - barHeights[i]) * 0.28;

      const x = i * (barWidth + barGap);
      const h = Math.max(1.5, barHeights[i]);
      const y = height - h;

      const intensity = h / height;
      const alpha = isMusicPlaying ? (0.22 + intensity * 0.75) : 0.08;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.shadowBlur = 0;
      ctx.fillRect(x, y, barWidth, h);
    }
  }

  draw();
}
const YT_PLAYLIST = [
  { id: 'gB7au6C0X8E', src: 'assets/audio/jilet-yarasi.m4a', title: 'Jilet Yarası', artist: 'WUHA!' },
  { id: 'CeuGpLNpFpE', src: 'assets/audio/risk-al.m4a', title: 'Risk Al', artist: '417se' },
  { id: '3mnzId0riw0', src: 'assets/audio/dale.m4a', title: 'DALE', artist: '13 Killoki' },
  { id: 'pVD1h6iz3cM', src: 'assets/audio/xnxx.m4a', title: 'XNXX', artist: 'KILLOKI X TAI' },
  { id: 'rIdygqrDV14', src: 'assets/audio/cal-par.m4a', title: 'CAL & PAR', artist: '13 Killoki' },
  { id: '', src: 'assets/audio/music.mp3', title: 'Hayattt', artist: 'egetouchdown' }
];
let currentTrackIndex = 0;
let loadedTrackId = null;
let usingLocalAudio = false;
let isShuffle = false;
let savedVolume = 0.25;
try {
  const v = parseFloat(localStorage.getItem('zodi4c_music_vol'));
  if (!isNaN(v) && v >= 0 && v <= 1) savedVolume = v;
} catch (_) { }

function formatAudioClock(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function playNextTrack() {
  if (isShuffle && YT_PLAYLIST.length > 1) {
    let nextIdx = currentTrackIndex;
    while (nextIdx === currentTrackIndex) {
      nextIdx = Math.floor(Math.random() * YT_PLAYLIST.length);
    }
    playTrackAt(nextIdx);
  } else {
    playTrackAt(currentTrackIndex + 1);
  }
}

function sendYtCommand(func) {
  const iframe = document.getElementById('ytAudioIframe');
  if (iframe && iframe.contentWindow && iframe.src && iframe.src.startsWith('https://www.youtube.com/')) {
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: '' }), 'https://www.youtube.com');
  }
}

function updateMusicPlayerUI() {
  const track = YT_PLAYLIST[currentTrackIndex] || YT_PLAYLIST[0];
  const nameEl = document.getElementById('mpTrackName');
  const toggleBtn = document.getElementById('mpToggleBtn');
  if (nameEl) nameEl.textContent = track.title;
  if (toggleBtn) toggleBtn.textContent = isMusicPlaying ? '❚❚' : '▶';

  const items = document.querySelectorAll('.music-drop-item');
  items.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === currentTrackIndex);
  });
}

let npToastTimer = null;
function showNowPlayingToast(track) {
  const toast = document.getElementById('nowPlayingToast');
  const textEl = document.getElementById('npToastText');
  if (!toast || !textEl || !track) return;
  const isTr = typeof currentLang === 'undefined' || currentLang === 'tr';
  textEl.textContent = isTr
    ? `Şimdi Çalıyor: ${track.title} — ${track.artist}`
    : `Now Playing: ${track.title} — ${track.artist}`;
  toast.classList.add('show');
  clearTimeout(npToastTimer);
  npToastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function playTrackAt(index) {
  currentTrackIndex = ((index % YT_PLAYLIST.length) + YT_PLAYLIST.length) % YT_PLAYLIST.length;
  loadedTrackId = null;
  startBackgroundMusic(true);
}

function playTrackViaYouTube(track) {
  const iframe = document.getElementById('ytAudioIframe');
  usingLocalAudio = false;
  if (!iframe) return;
  if (loadedTrackId === track.id && iframe.src) {
    sendYtCommand('playVideo');
  } else {
    loadedTrackId = track.id;
    iframe.src = `https://www.youtube.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}&enablejsapi=1`;
  }
}

function startBackgroundMusic(showNotice = false) {
  const bgAudio = document.getElementById('bgAudio');
  const track = YT_PLAYLIST[currentTrackIndex] || YT_PLAYLIST[0];

  isMusicPlaying = true;
  updateMusicPlayerUI();
  if (showNotice) showNowPlayingToast(track);

  if (bgAudio && track.src) {
    ensureAudioAnalyser();
    bgAudio.loop = false;
    bgAudio.volume = savedVolume;
    bgAudio.muted = false;

    // If same local track was paused, resume immediately from currentTime
    if (usingLocalAudio && bgAudio.getAttribute('data-track') === track.src) {
      bgAudio.play().catch(() => playTrackViaYouTube(track));
      return;
    }

    // Stop YouTube before trying local mp3
    sendYtCommand('pauseVideo');
    bgAudio.setAttribute('data-track', track.src);
    bgAudio.src = track.src;

    const p = bgAudio.play();
    if (p !== undefined) {
      p.then(() => {
        usingLocalAudio = true;
      }).catch(() => {
        playTrackViaYouTube(track);
      });
      return;
    }
  }

  playTrackViaYouTube(track);
}

function pauseBackgroundMusic() {
  const bgAudio = document.getElementById('bgAudio');
  isMusicPlaying = false;
  if (bgAudio) bgAudio.pause();
  sendYtCommand('pauseVideo');
  updateMusicPlayerUI();
}

function toggleBackgroundMusic() {
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
}

function initMusicSwitcher() {
  const prevBtn = document.getElementById('mpPrevBtn');
  const nextBtn = document.getElementById('mpNextBtn');
  const volSlider = document.getElementById('mpVolSlider');
  const progressFill = document.getElementById('mpProgressFill');
  const timeText = document.getElementById('mpTimeText');
  const toggleBtn = document.getElementById('mpToggleBtn');
  const trackBtn = document.getElementById('mpTrackBtn');
  const dropdown = document.getElementById('musicDropdown');

  // Preload first local audio file metadata so it starts immediately on click-to-enter
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.loop = false;
    bgAudio.volume = savedVolume;
    if (YT_PLAYLIST[0] && YT_PLAYLIST[0].src) {
      bgAudio.setAttribute('data-track', YT_PLAYLIST[0].src);
      bgAudio.src = YT_PLAYLIST[0].src;
      bgAudio.load();
    }
    bgAudio.addEventListener('timeupdate', () => {
      const cur = bgAudio.currentTime || 0;
      const dur = bgAudio.duration || 0;
      if (progressFill && dur > 0) {
        progressFill.style.width = `${Math.min(100, (cur / dur) * 100).toFixed(1)}%`;
      }
      if (timeText) {
        timeText.textContent = `${formatAudioClock(cur)} / ${formatAudioClock(dur)}`;
      }
    });
    bgAudio.addEventListener('ended', () => {
      playNextTrack();
    });
  }

  const progressTrack = document.getElementById('mpProgressTrack');
  if (progressTrack && bgAudio) {
    let seeking = false;
    const seekTo = (clientX) => {
      const dur = bgAudio.duration || 0;
      if (dur <= 0) return;
      const rect = progressTrack.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      bgAudio.currentTime = ratio * dur;
    };
    progressTrack.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      seeking = true;
      seekTo(e.clientX);
    });
    window.addEventListener('pointermove', (e) => {
      if (seeking) seekTo(e.clientX);
    });
    window.addEventListener('pointerup', () => {
      seeking = false;
    });
  }

  if (volSlider) {
    volSlider.value = Math.round(savedVolume * 100);
    volSlider.addEventListener('input', () => {
      savedVolume = Math.max(0, Math.min(1, Number(volSlider.value) / 100));
      if (bgAudio) bgAudio.volume = savedVolume;
      try { localStorage.setItem('zodi4c_music_vol', String(savedVolume)); } catch (_) { }
    });
  }

  if (dropdown) {
    dropdown.innerHTML = '';
    YT_PLAYLIST.forEach((track, idx) => {
      const item = document.createElement('button');
      item.className = `music-drop-item${idx === currentTrackIndex ? ' active' : ''}`;
      item.innerHTML = `<span>${track.title}</span><span class="music-drop-artist">${track.artist}</span>`;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        playTrackAt(idx);
        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(item);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); playTrackAt(currentTrackIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); playNextTrack(); });
  if (toggleBtn) toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleBackgroundMusic(); });
  if (trackBtn && dropdown) {
    trackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#musicPlayerWrap')) {
        dropdown.classList.add('hidden');
      }
    });
  }
  updateMusicPlayerUI();
}

window.addEventListener('keydown', (e) => {
  const curtain = document.getElementById('entryCurtain');
  if (curtain && !curtain.classList.contains('fading') && curtain.style.display !== 'none') return;

  const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
  if (targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable) return;
  if (e.target.closest && e.target.closest('button, a, [role="button"]')) return;

  if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
    e.preventDefault();
    toggleBackgroundMusic();
  }
});
function initCustomCursor() {
  const navDockEl = document.querySelector('.horizontal-nav');
  const navButtons = navDockEl ? Array.from(navDockEl.querySelectorAll('.icon-nav-btn')) : [];
  let hoveredNavBtn = null;

  function findNavButtonAt(x, y) {
    if (!navDockEl) return null;
    const dockRect = navDockEl.getBoundingClientRect();
    if (x < dockRect.left || x > dockRect.right || y < dockRect.top || y > dockRect.bottom) return null;
    let closest = null;
    let closestDist = Infinity;
    for (const btn of navButtons) {
      const r = btn.getBoundingClientRect();
      if (x >= r.left && x <= r.right) return btn;
      const cx = r.left + r.width / 2;
      const d = Math.abs(x - cx);
      if (d < closestDist) { closestDist = d; closest = btn; }
    }
    return closest;
  }

  function updateNavHover(x, y) {
    const btn = findNavButtonAt(x, y);
    if (btn === hoveredNavBtn) return;
    if (hoveredNavBtn) hoveredNavBtn.classList.remove('is-hover');
    hoveredNavBtn = btn;
    if (btn) {
      btn.classList.add('is-hover');
      document.body.classList.add('cursor-hover');
    } else if (!document.querySelector('a:hover, button:hover, .discord-activity-pill:hover, #decodeTitle:hover')) {
      document.body.classList.remove('cursor-hover');
    }
  }

  if (navDockEl) {
    window.addEventListener('mousemove', (e) => updateNavHover(e.clientX, e.clientY), { passive: true });
    document.addEventListener('mouseleave', () => updateNavHover(-1, -1));
    navDockEl.addEventListener('click', (e) => {
      if (e.target.closest('.icon-nav-btn')) return;
      const btn = findNavButtonAt(e.clientX, e.clientY);
      if (btn) btn.click();
    });
  }

  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

function initSceneParallax() {
  const backdrop = document.querySelector('.background-backdrop');
  if (!backdrop) return;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  window.addEventListener('pointermove', (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = normX * 7;
    targetY = normY * 7;
  }, { passive: true });
  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    backdrop.style.transform = `translate3d(${(-currentX * 0.55).toFixed(2)}px, ${(-currentY * 0.55).toFixed(2)}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();
}
function initBoxes3DTilt() {
  let mouseGlobal = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    normX: 0,
    normY: 0
  };
  window.addEventListener('mousemove', (e) => {
    mouseGlobal.x = e.clientX;
    mouseGlobal.y = e.clientY;
    mouseGlobal.normX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseGlobal.normY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('mouseleave', () => {
    mouseGlobal.normX = 0;
    mouseGlobal.normY = 0;
  });
  const unifiedCard = document.getElementById('unifiedCard');
  if (unifiedCard) {
    const glareEl = document.getElementById('ucGlare');
    let localTiltX = 0, localTiltY = 0;
    let curTiltX = 0, curTiltY = 0;
    unifiedCard.addEventListener('mousemove', (e) => {
      const rect = unifiedCard.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const x = relX / rect.width - 0.5;
      const y = relY / rect.height - 0.5;
      localTiltX = -y * 9;
      localTiltY = x * 10;
      if (glareEl) {
        glareEl.style.setProperty('--glare-tx', `${relX.toFixed(1)}px`);
        glareEl.style.setProperty('--glare-ty', `${relY.toFixed(1)}px`);
      }
    });
    unifiedCard.addEventListener('mouseleave', () => {
      localTiltX = 0;
      localTiltY = 0;
    });
    function updateUnifiedPhysics() {
      const globalTiltX = -mouseGlobal.normY * 7;
      const globalTiltY = mouseGlobal.normX * 8;
      const targetX = globalTiltX + localTiltX;
      const targetY = globalTiltY + localTiltY;
      curTiltX += (targetX - curTiltX) * 0.16;
      curTiltY += (targetY - curTiltY) * 0.16;
      unifiedCard.style.transform = `perspective(900px) rotateX(${curTiltX.toFixed(2)}deg) rotateY(${curTiltY.toFixed(2)}deg)`;
      requestAnimationFrame(updateUnifiedPhysics);
    }
    updateUnifiedPhysics();
  }
}

function initUnifiedCardTabs() {
  const dcSubcard = document.getElementById('ucDiscordSubcard');
  if (dcSubcard) {
    const openDiscordModal = () => {
      const modal = document.getElementById('discordCardModal');
      if (modal) modal.classList.remove('hidden');
      playUiClickSound(680, 'sine', 0.05);
    };
    dcSubcard.addEventListener('click', openDiscordModal);
    dcSubcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        openDiscordModal();
      }
    });
  }
}

function initExternalLinkConfirm() {
  const modal = document.getElementById('redirectModal');
  const targetUrlEl = document.getElementById('confirmTargetUrl');
  const targetHostEl = document.getElementById('confirmTargetHost');
  const proceedBtn = document.getElementById('confirmProceedBtn');
  const cancelBtn = document.getElementById('confirmCancelBtn');
  if (!modal || !targetUrlEl || !proceedBtn || !cancelBtn) return;

  let pendingHref = '';

  // Intercept all external link clicks explicitly
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http://"], a[href^="https://"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href) {
      e.preventDefault();
      e.stopPropagation();

      // Trigger dynamic spring pulse on the clicked icon button
      link.classList.remove('btn-clicked');
      void link.offsetWidth;
      link.classList.add('btn-clicked');
      setTimeout(() => link.classList.remove('btn-clicked'), 480);

      pendingHref = href;
      targetUrlEl.textContent = href;
      try {
        const urlObj = new URL(href);
        if (targetHostEl) targetHostEl.textContent = urlObj.hostname.replace('www.', '');
      } catch (_) {
        if (targetHostEl) targetHostEl.textContent = 'external';
      }
      modal.classList.remove('hidden');
    }
  }, true);

  proceedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pendingHref) {
      window.open(pendingHref, '_blank', 'noopener,noreferrer');
      pendingHref = '';
    }
    modal.classList.add('hidden');
  });

  cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    pendingHref = '';
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      pendingHref = '';
      modal.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        pendingHref = '';
        modal.classList.add('hidden');
      } else if (e.key === 'Enter') {
        if (pendingHref) {
          window.open(pendingHref, '_blank', 'noopener,noreferrer');
          pendingHref = '';
        }
        modal.classList.add('hidden');
      }
    }
  });
}

/* ── Bilingual System (TR / EN Language Engine) ────────────────────────────── */
const I18N = {
  tr: {
    curtainPrompt: 'Zodi4c',
    visitorLabel: 'ziyaretçi',
    navTitles: {
      discordMain: 'Discord (Ana Profil)',
      gunslol: 'guns.lol/zodi4c',
      youtube: 'YouTube: @zodi4ctvn',
      spotify: 'Spotify: Kurtulamadım',
      github: 'GitHub',
      terminal: 'Terminali Aç / Kapat',
      discordBackup: 'Discord (Yedek Profil)',
      langToggle: 'Dili Değiştir / Switch to English'
    },
    terminal: {
      title: 'zodi4c@system:~ (bash)',
      hint: "yardım için 'help'",
      placeholder: 'komut yaz...',
      welcome1: 'Zodi4c Interactive Shell v1.2.0',
      welcome2: "İpucu: 'help' yazarak mevcut komutları görebilirsiniz.",
      notFound: "Komut bulunamadı: '{cmd}'. Yardım için 'help' yazın."
    },
    commandsHelp: [
      'Kullanılabilir Komutlar:',
      '  whoami       - Profil kimliği ve bio',
      '  ls / dir     - Dizindeki dosyaları listele',
      '  cat [dosya]  - Dosya içeriğini oku (örn: cat about.txt)',
      '  stars        - Takımyıldızı projelerini listele',
      '  skills       - Yazılım & teknik yetenekler',
      '  theme [mod]  - Siber temayı değiştir (matrix, bloodmoon, synthwave, void/default)',
      '  clear        - Terminal ekranını temizle',
      '  lang [dil]   - Dili değiştir (en / tr)',
      '  repo         - GitHub kaynak koduna git',
      '  date         - Sistem tarih ve saati',
      '  exit         - Terminali kapat'
    ],
    catAbout: [
      'Zodi4c resmi kişisel sayfası.',
      'Etkileşimli terminal, dinamik Lanyard Discord durumu ve DNA parçacık ağı.'
    ],
    catSkills: '{ "diller": ["JavaScript", "TypeScript", "Lua", "Python", "HTML5", "CSS3"], "platformlar": ["Node.js", "FiveM (QBCore / Qbox)", "Discord API", "Git"] }',
    dcAbout: 'Lua &middot; FiveM &middot; Discord Bot &middot; Python &middot; JS',
    techModalFallbackDesc: 'Bu teknoloji takımyıldızında aktif olarak kullanılan bileşenlerden biridir.',
    techModalDefaultProject: 'Kişisel Altyapı',
    confirmCancel: 'iptal',
    confirmProceed: 'devam et ↗'
  },
  en: {
    curtainPrompt: 'Zodi4c',
    visitorLabel: 'visitors',
    navTitles: {
      discordMain: 'Discord (Primary Profile)',
      gunslol: 'guns.lol/zodi4c',
      youtube: 'YouTube: @zodi4ctvn',
      spotify: 'Spotify: Kurtulamadım',
      github: 'GitHub Profile',
      terminal: 'Toggle Terminal Interface',
      discordBackup: 'Discord (Backup Profile)',
      langToggle: 'Switch Language / Türkçe yap'
    },
    terminal: {
      title: 'zodi4c@system:~ (bash)',
      hint: "type 'help' for commands",
      placeholder: 'type a command...',
      welcome1: 'Zodi4c Interactive Shell v1.2.0',
      welcome2: "Tip: Type 'help' to see available commands.",
      notFound: "Command not found: '{cmd}'. Type 'help' for available commands."
    },
    commandsHelp: [
      'Available Commands:',
      '  whoami       - Profile identity and bio',
      '  ls / dir     - List files in current directory',
      '  cat [file]   - Display file contents (e.g. cat about.txt)',
      '  stars        - List constellation projects',
      '  skills       - Software engineering skills',
      '  theme [mode] - Switch cyber theme (matrix, bloodmoon, synthwave, void/default)',
      '  clear        - Clear terminal screen',
      '  lang [code]  - Switch language (en / tr)',
      '  repo         - Open GitHub repository',
      '  date         - System date and time',
      '  exit         - Close terminal interface'
    ],
    catAbout: [
      'Zodi4c official personal website.',
      'Interactive terminal, real-time Lanyard Discord status, and DNA particle network.'
    ],
    catSkills: '{ "languages": ["JavaScript", "TypeScript", "Lua", "Python", "HTML5", "CSS3"], "platforms": ["Node.js", "FiveM (QBCore / Qbox)", "Discord API", "Git"] }',
    dcAbout: 'Lua &middot; FiveM &middot; Discord Bot &middot; Python &middot; JS',
    techModalFallbackDesc: 'This is one of the core technologies actively used across the constellation.',
    techModalDefaultProject: 'Personal Infrastructure',
    confirmCancel: 'cancel',
    confirmProceed: 'continue ↗'
  }
};

let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('zodi4c_lang', lang);
  } catch (_) { }

  document.documentElement.lang = lang;

  // 2. Entry curtain text
  const entryPrompt = document.querySelector('.entry-prompt');
  if (entryPrompt) {
    entryPrompt.textContent = I18N[lang].curtainPrompt;
  }

  // 3. Visitor counter label
  const visitorLabel = document.querySelector('.visitor-counter-label');
  if (visitorLabel) {
    visitorLabel.textContent = I18N[lang].visitorLabel;
  }

  // 4. Nav buttons, Discord & Music player tooltips
  const isTr = lang === 'tr';
  const discordBtns = document.querySelectorAll('.btn-discord');
  if (discordBtns[0]) discordBtns[0].title = I18N[lang].navTitles.discordMain;
  if (discordBtns[1]) discordBtns[1].title = I18N[lang].navTitles.discordBackup;
  const btnGithub = document.querySelector('.btn-github');
  if (btnGithub) btnGithub.title = I18N[lang].navTitles.github;
  const btnTerminal = document.getElementById('terminalToggleBtn');
  if (btnTerminal) btnTerminal.title = I18N[lang].navTitles.terminal;

  const dcSubcard = document.getElementById('ucDiscordSubcard');
  if (dcSubcard) dcSubcard.title = isTr ? 'Discord Profil Kartını Aç' : 'Open Discord Profile Card';
  const handleEl = document.getElementById('ucHandle');
  if (handleEl) handleEl.title = isTr ? 'Kopyalamak için tıkla' : 'Click to copy';

  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.title = I18N[lang].navTitles.langToggle;
    langToggleBtn.setAttribute('aria-label', I18N[lang].navTitles.langToggle);
    langToggleBtn.querySelectorAll('.lang-opt').forEach((opt) => {
      opt.classList.toggle('active', opt.getAttribute('data-lang-opt') === lang);
    });
  }

  // Music player tooltips & aria-labels
  const mpPrevBtn = document.getElementById('mpPrevBtn');
  if (mpPrevBtn) {
    mpPrevBtn.title = isTr ? 'Önceki Şarkı' : 'Previous Track';
    mpPrevBtn.setAttribute('aria-label', mpPrevBtn.title);
  }
  const mpTrackBtn = document.getElementById('mpTrackBtn');
  if (mpTrackBtn) {
    mpTrackBtn.title = isTr ? 'Şarkı Seç' : 'Select Track';
    mpTrackBtn.setAttribute('aria-label', isTr ? 'Şarkı Listesi' : 'Track List');
  }
  const mpToggleBtn = document.getElementById('mpToggleBtn');
  if (mpToggleBtn) {
    mpToggleBtn.title = isTr ? 'Oynat / Duraklat' : 'Play / Pause';
    mpToggleBtn.setAttribute('aria-label', mpToggleBtn.title);
  }
  const mpNextBtn = document.getElementById('mpNextBtn');
  if (mpNextBtn) {
    mpNextBtn.title = isTr ? 'Sonraki Şarkı' : 'Next Track';
    mpNextBtn.setAttribute('aria-label', mpNextBtn.title);
  }
  const mpVolWrap = document.querySelector('.mp-vol-wrap');
  const mpVolSlider = document.getElementById('mpVolSlider');
  if (mpVolWrap) mpVolWrap.title = isTr ? 'Ses Seviyesi' : 'Volume';
  if (mpVolSlider) mpVolSlider.setAttribute('aria-label', isTr ? 'Ses Seviyesi' : 'Volume');
  const mpProgressTrack = document.getElementById('mpProgressTrack');
  if (mpProgressTrack) mpProgressTrack.title = isTr ? 'Sarmak için tıkla veya sürükle' : 'Click or drag to seek';

  // 5. Terminal header, hint, welcome lines & placeholder
  const termTitle = document.querySelector('.terminal-title');
  if (termTitle) termTitle.textContent = I18N[lang].terminal.title;
  const termHint = document.querySelector('.terminal-hint');
  if (termHint) termHint.textContent = I18N[lang].terminal.hint;
  const termWelcome1 = document.getElementById('termWelcome1');
  if (termWelcome1) termWelcome1.textContent = I18N[lang].terminal.welcome1;
  const termWelcome2 = document.getElementById('termWelcome2');
  if (termWelcome2) termWelcome2.textContent = I18N[lang].terminal.welcome2;
  const termInput = document.getElementById('termInput');
  if (termInput) termInput.placeholder = I18N[lang].terminal.placeholder;

  // 6. Discord Profile Card About Me
  const dcAbout = document.getElementById('dcAbout');
  if (dcAbout) dcAbout.innerHTML = I18N[lang].dcAbout;

  // 7. Redirect modal buttons
  const confirmCancel = document.getElementById('confirmCancelBtn');
  if (confirmCancel) confirmCancel.textContent = I18N[lang].confirmCancel;
  const confirmProceed = document.getElementById('confirmProceedBtn');
  if (confirmProceed) confirmProceed.textContent = I18N[lang].confirmProceed;

  // 8. Left-Edge GitHub & Right-Edge Memories Drawer Labels
  const ghEdgeHandle = document.getElementById('ghEdgeHandle');
  const ghEdgeText = document.getElementById('ghEdgeText');
  const ghSplitCloseText = document.getElementById('ghSplitCloseText');
  if (ghEdgeText) ghEdgeText.textContent = isTr ? 'GitHub Projelerim' : 'GitHub Projects';
  if (ghEdgeHandle) {
    ghEdgeHandle.title = isTr ? 'GitHub Projelerim' : 'GitHub Projects';
    ghEdgeHandle.setAttribute('aria-label', ghEdgeHandle.title);
  }
  if (ghSplitCloseText) ghSplitCloseText.textContent = isTr ? 'Kapat' : 'Close';

  const fallbackRepoDescs = isTr ? {
    'zodi4c-storage': 'Lua tabanlı FiveM depolama & sistem altyapısı.',
    'coc-bb-autoattack': 'Python ile geliştirilmiş Clash of Clans Builder Base otomatik saldırı aracı.',
    'zodi4ctvn.github.io': 'Lanyard Discord entegrasyonlu, interaktif terminal ve DNA parçacık ağına sahip kişisel web sitesi.'
  } : {
    'zodi4c-storage': 'Lua-based FiveM storage & server system infrastructure.',
    'coc-bb-autoattack': 'Python-powered Clash of Clans Builder Base auto-attack automation tool.',
    'zodi4ctvn.github.io': 'Personal portfolio site with Lanyard Discord presence, interactive terminal, and DNA particle network.'
  };
  document.querySelectorAll('[data-fallback-repo]').forEach((el) => {
    const key = el.getAttribute('data-fallback-repo');
    if (fallbackRepoDescs[key]) el.textContent = fallbackRepoDescs[key];
  });

  const memEdgeHandle = document.getElementById('memEdgeHandle');
  const memEdgeText = document.getElementById('memEdgeText');
  const memCloseText = document.getElementById('memCloseText');
  const memTitle = document.getElementById('memTitle');
  const memSubtitle = document.getElementById('memSubtitle');
  if (memEdgeText) memEdgeText.textContent = isTr ? 'Anılar' : 'Memories';
  if (memEdgeHandle) {
    memEdgeHandle.title = isTr ? 'Anılar' : 'Memories';
    memEdgeHandle.setAttribute('aria-label', memEdgeHandle.title);
  }
  if (memCloseText) memCloseText.textContent = isTr ? 'Kapat' : 'Close';
  if (memTitle) memTitle.textContent = isTr ? 'Anılar' : 'Memories';
  if (memSubtitle) memSubtitle.textContent = isTr ? 'Zodi4c · Fotoğraf ve video arşivi' : 'Zodi4c · Photo & video archive';

  const ctxMap = isTr ? {
    ctxCopyDiscord: 'Discord Kopyala',
    ctxNextTrack: 'Sonraki Şarkı',
    ctxToggleMusic: 'Müziği Durdur / Başlat',
    ctxOpenGithub: 'GitHub Projelerim',
    ctxOpenMemories: 'Anılar',
    ctxToggleTerminal: 'Terminal',
    ctxCycleBg: 'Arka Planı Değiştir'
  } : {
    ctxCopyDiscord: 'Copy Discord',
    ctxNextTrack: 'Next Track',
    ctxToggleMusic: 'Play / Pause Music',
    ctxOpenGithub: 'GitHub Projects',
    ctxOpenMemories: 'Memories',
    ctxToggleTerminal: 'Terminal',
    ctxCycleBg: 'Switch Background'
  };
  Object.entries(ctxMap).forEach(([id, txt]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  });

  // 9. Refresh Memories drawer UI if mounted
  if (typeof window._rerenderMemories === 'function') {
    window._rerenderMemories();
  }

  // 10. Re-render typewriter phrases for new language
  if (typeof restartTypewriterBio === 'function') {
    restartTypewriterBio();
  }
}

function initLanguageSystem() {
  // Öncelik Sırası: Kayıtlı tercih (localStorage) → Tarayıcı dili (navigator.language) → Varsayılan (EN)
  try {
    const saved = localStorage.getItem('zodi4c_lang');
    if (saved === 'en' || saved === 'tr') {
      currentLang = saved;
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      currentLang = browserLang.startsWith('tr') ? 'tr' : 'en';
    }
  } catch (_) {
    currentLang = 'en';
  }

  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyLanguage(currentLang === 'tr' ? 'en' : 'tr');
      playUiClickSound(640, 'sine', 0.05);
    });
  }

  applyLanguage(currentLang);
}

/* ── Stored Theme Initializer ── */
function initStoredTheme() {
  try {
    const saved = localStorage.getItem('zodi4c_theme');
    if (saved && ['matrix', 'bloodmoon', 'synthwave'].includes(saved)) {
      document.body.classList.add(`theme-${saved}`);
    }
  } catch (_) { }
}

/* ── Tech / Node Details Modal ── */
let currentTechModal = null;
function openTechModal(tech) {
  if (!tech) return;
  const modal = document.getElementById('techModal');
  const dot = document.getElementById('techModalDot');
  const title = document.getElementById('techModalTitle');
  const desc = document.getElementById('techModalDesc');

  if (!modal) return;

  if (dot) {
    dot.style.backgroundColor = tech.color || '#38bdf8';
    dot.style.boxShadow = `0 0 12px ${tech.color || '#38bdf8'}`;
  }
  if (title) title.textContent = tech.name || 'Tech Node';

  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const techDesc = isEn ? (tech.desc_en || tech.desc) : (tech.desc || tech.desc_en);
  if (desc) desc.textContent = techDesc || I18N[currentLang || 'tr'].techModalFallbackDesc;

  modal.classList.remove('hidden');
}

function initTechModal() {
  const modal = document.getElementById('techModal');
  const closeBtn = document.getElementById('techModalClose');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });
}

/* ── Typewriter Bio ─────────────────────────────────────────── */
let restartTypewriterBio = null;

function initTypewriterBio() {
  const el = document.getElementById('twText');
  if (!el) return;

  const phrasesMap = {
    tr: [
      'Lua & FiveM',
      'Discord Bot & Python',
      'JavaScript & Web',
      'QBCore / Qbox'
    ],
    en: [
      'Lua & FiveM',
      'Discord Bot & Python',
      'JavaScript & Web',
      'QBCore / Qbox'
    ]
  };

  function getPhrases() {
    const lang = (typeof currentLang !== 'undefined' && phrasesMap[currentLang]) ? currentLang : 'tr';
    return phrasesMap[lang];
  }

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;

  restartTypewriterBio = () => {
    clearTimeout(pauseTimer);
    phraseIdx = 0;
    charIdx = 0;
    isDeleting = false;
    el.textContent = '';
    tick();
  };

  function tick() {
    const list = getPhrases();
    const current = list[phraseIdx % list.length];
    if (isDeleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % list.length;
        pauseTimer = setTimeout(tick, 420);
        return;
      }
      pauseTimer = setTimeout(tick, 42);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx >= current.length) {
        isDeleting = true;
        pauseTimer = setTimeout(tick, 1800);
        return;
      }
      pauseTimer = setTimeout(tick, 78);
    }
  }

  // Start after site enter animation
  const startDelay = document.body.classList.contains('site-entered') ? 500 : 1800;
  setTimeout(tick, startDelay);
}

/* ── Cursor Trail ───────────────────────────────────────────── */
function initCursorTrail() {
  // Trail color follows Spotify accent or defaults to white
  let trailColor = 'rgba(255, 255, 255, 0.6)';
  let lastX = -999, lastY = -999;
  let frameCount = 0;

  // Trail color follows active THEME, then Spotify, then defaults to white
  function getTrailColor() {
    const body = document.body;
    if (body.classList.contains('theme-matrix')) return 'rgba(34, 197, 94, 0.75)';
    if (body.classList.contains('theme-bloodmoon')) return 'rgba(220, 38, 38, 0.75)';
    if (body.classList.contains('theme-synthwave')) return 'rgba(168, 85, 247, 0.75)';
    return 'rgba(255, 255, 255, 0.5)';
  }

  window.addEventListener('mousemove', (e) => {
    frameCount++;
    // Spawn a trail dot every 4 frames for lightweight performance
    if (frameCount % 4 !== 0) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 6) return; // skip if barely moved

    lastX = e.clientX;
    lastY = e.clientY;

    trailColor = getTrailColor();

    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    dot.style.background = trailColor;
    dot.style.boxShadow = `0 0 6px ${trailColor}`;
    // Vary size slightly based on speed
    const speedScale = Math.min(1.8, 0.6 + dist * 0.04);
    dot.style.width = `${Math.round(5 * speedScale)}px`;
    dot.style.height = `${Math.round(5 * speedScale)}px`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 560);
  }, { passive: true });
}

/* ── Discord Profile Card ───────────────────────────────────── */
// Global store for Lanyard data to populate the card
window._lanyardCache = null;
window._lanyardRestData = null; // REST API provides premium_type, decoration, etc.

// Fetch Lanyard REST API once for richer badge data
function fetchLanyardRest() {
  const USER_ID = '1403455771563528252';
  fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
    .then(r => r.json())
    .then(json => {
      if (json.success && json.data) {
        window._lanyardRestData = json.data;
        console.log('[Zodi4c REST] premium_type:', json.data.premium_type,
          '| flags:', json.data.discord_user?.public_flags,
          '| decoration:', json.data.discord_user?.avatar_decoration_data);
        // Re-render card if it's open
        const overlay = document.getElementById('discordCardModal');
        if (overlay && !overlay.classList.contains('hidden')) {
          syncCardData(window._lanyardCache || json.data);
        }
      }
    })
    .catch(() => { }); // Silent fail, WS data is still used
}

function initDiscordProfileCard() {
  const pill = document.getElementById('discordPill');
  const overlay = document.getElementById('discordCardModal');
  const card = document.getElementById('discordCard');
  const closeBtn = document.getElementById('dcClose');
  if (!pill || !overlay) return;

  // Fetch REST data early so badges are ready
  fetchLanyardRest();

  function resetCardTilt() {
    if (!card) return;
    card.classList.add('is-resetting');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 32px 72px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)';
  }

  function openCard() {
    // Merge WS + REST data before syncing
    if (window._lanyardCache) syncCardData(window._lanyardCache);
    resetCardTilt();
    overlay.classList.remove('hidden');
    playUiClickSound(520, 'sine', 0.06);
  }

  function closeCard() {
    resetCardTilt();
    overlay.classList.add('hidden');
  }

  pill.addEventListener('click', (e) => {
    // Don't open if clicking inside pill interactive children
    if (e.target.closest('a, button')) return;
    openCard();
  });

  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCard();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCard();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeCard();
  });

  // ── 3D Tilt Effect on Discord Card ──────────────────────────
  if (card) {
    let tiltRaf = null;

    function handleMouseMove(e) {
      if (overlay.classList.contains('hidden')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mouse card sınırları içinde mi?
      const isInside = x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40;
      if (!isInside) {
        resetCardTilt();
        return;
      }

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // -1 ile +1 arası normalize katsayı
      const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
      const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

      // Belirgin ve akıcı 3D açı (15 derece)
      const maxAngle = 15;
      const rotateX = (-normY * maxAngle).toFixed(2);
      const rotateY = (normX * maxAngle).toFixed(2);

      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      tiltRaf = requestAnimationFrame(() => {
        card.classList.remove('is-resetting');
        card.classList.add('is-tilted');
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Dinamik derin gölge
        const shadowX = (-normX * 30).toFixed(1);
        const shadowY = (-normY * 30 + 35).toFixed(1);
        card.style.boxShadow = `${shadowX}px ${shadowY}px 70px rgba(0,0,0,0.9), 0 0 30px rgba(88,101,242,0.22), 0 0 0 1px rgba(255,255,255,0.1)`;
      });
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    document.addEventListener('mouseleave', () => {
      resetCardTilt();
    });
  }
}

function syncCardData(data) {
  if (!data) return;
  window._lanyardCache = data;

  const dcAvatar = document.getElementById('dcAvatar');
  const dcBanner = document.getElementById('dcBanner');
  const dcDisplayName = document.getElementById('dcDisplayName');
  const dcUsername = document.getElementById('dcUsername');
  const dcStatusDot = document.getElementById('dcStatusDot');
  const dcActName = document.getElementById('dcActName');
  const dcActDetail = document.getElementById('dcActDetail');
  const dcActIcon = document.getElementById('dcActIcon');
  const dcBadgesEl = document.getElementById('dcBadges');

  if (data.discord_user) {
    const u = data.discord_user;
    if (u.avatar && dcAvatar) {
      dcAvatar.src = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=256`;
    }
    if (dcDisplayName) {
      dcDisplayName.textContent = u.global_name || u.username || 'zodi4ctvn';
    }
    if (dcUsername) {
      dcUsername.textContent = `@${u.username || 'zodi4ctvn'}`;
    }
    // Banner — full cover, no blur
    if (dcBanner) {
      dcBanner.style.filter = '';
      dcBanner.style.backgroundRepeat = 'no-repeat';
      if (u.banner) {
        const ext = u.banner.startsWith('a_') ? 'gif' : 'png';
        dcBanner.style.backgroundImage = `url('https://cdn.discordapp.com/banners/${u.id}/${u.banner}.${ext}?size=600')`;
        dcBanner.style.backgroundSize = 'cover';
        dcBanner.style.backgroundPosition = 'center top';
      } else if (u.avatar) {
        // Avatar zoomed as banner fallback, cover
        dcBanner.style.backgroundImage = `url('https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=512')`;
        dcBanner.style.backgroundSize = 'cover';
        dcBanner.style.backgroundPosition = 'center top';
      }
    }

    // ── Badges ──────────────────────────────────────────────────
    if (dcBadgesEl) {
      dcBadgesEl.innerHTML = '';
      const USER_BADGES = [
        //{ file: 'balance.png',           tip: 'HypeSquad Balance' },
        //{ file: 'nitro.png',             tip: 'Discord Nitro' },
        { file: 'developer.png', tip: 'Active Developer' },
        //{ file: 'partner.png', tip: 'Discord Partner' },
        //{ file: 'staff.png', tip: 'Discord Staff' },
        { file: 'boosting_9.png', tip: 'Server Booster' },
        { file: 'early_supporter.png', tip: 'Early Supporter' },
        { file: 'hypesquad_events.png', tip: 'HypeSquad Events' },
        //{ file: 'bughunter_2.png', tip: 'Bug Hunter Lv.2' },
        //{ file: 'quest.png',             tip: 'Quest Completed' },
        //{ file: 'orbs.png',              tip: 'Quest Orbs' },
        //{ file: 'nitroopal.png',         tip: 'Discord Nitro (Opal)' },
      ];

      USER_BADGES.forEach(({ file, tip }) => {
        const el = document.createElement('div');
        el.className = 'dc-badge';
        el.setAttribute('data-tip', tip);
        el.innerHTML = `<img src="assets/discord/${file}" alt="${tip}" loading="lazy">`;
        dcBadgesEl.appendChild(el);
      });
    }
  }

  const status = data.discord_status || 'offline';
  if (dcStatusDot) dcStatusDot.className = `dc-status-dot ${status}`;

  function setActIconImg(src, alt) {
    if (!dcActIcon) return;
    dcActIcon.innerHTML = '';
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:6px;';
    dcActIcon.appendChild(img);
  }

  // Activity
  if (data.listening_to_spotify && data.spotify) {
    const sp = data.spotify;
    if (dcActName) dcActName.textContent = sp.song || 'Spotify';
    if (dcActDetail) dcActDetail.textContent = sp.artist ? `by ${sp.artist}` : '';
    if (dcActIcon && sp.album_art_url) {
      setActIconImg(sp.album_art_url, 'Album');
    }
  } else if (data.activities && data.activities.length > 0) {
    const act = data.activities.find(a => a.type !== 4) || data.activities[0];
    if (act) {
      if (dcActName) dcActName.textContent = act.name || 'Active';
      if (dcActDetail) dcActDetail.textContent = act.details || act.state || '';
      if (dcActIcon) {
        if (act.application_id && act.assets && act.assets.large_image) {
          const imgKey = act.assets.large_image;
          if (imgKey.startsWith('mp:')) {
            setActIconImg(`https://media.discordapp.net/${imgKey.slice(3)}`, '');
          } else {
            setActIconImg(`https://cdn.discordapp.com/app-assets/${act.application_id}/${imgKey}.png`, '');
          }
        } else {
          dcActIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="12" cy="12" r="10" opacity="0.2"/><circle cx="12" cy="12" r="4"/></svg>`;
        }
      }
    }
  } else {
    const statusLabels = { online: 'Online', idle: 'Away', dnd: 'Do Not Disturb', offline: 'Offline' };
    if (dcActName) dcActName.textContent = statusLabels[status] || 'Offline';
    if (dcActDetail) dcActDetail.textContent = '';
    if (dcActIcon) dcActIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="12" cy="12" r="10" opacity="0.2"/><circle cx="12" cy="12" r="4"/></svg>`;
  }
}


/* ── Left-Edge Handle & 2-Way GitHub Projects Split Drawer ────── */
function initGithubSplitDrawer() {
  const handle = document.getElementById('ghEdgeHandle');
  const drawer = document.getElementById('ghSplitDrawer');
  const closeBtn = document.getElementById('ghSplitClose');
  if (!handle || !drawer) return;

  let dragStartX = null;
  let dragStartY = null;
  let isDragging = false;
  let dragWasOpen = false;
  let dragDeltaX = 0;
  let suppressNextHandleClick = false;
  let suppressNextPanelClick = false;

  // Suppress accidental link click right after a horizontal drag
  window.addEventListener('click', (e) => {
    if (suppressNextPanelClick) {
      suppressNextPanelClick = false;
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);

  function openDrawer() {
    drawer.style.transition = '';
    drawer.style.transform = '';
    drawer.style.opacity = '';
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    playUiClickSound(640, 'sine', 0.05);
  }

  function closeDrawer() {
    drawer.style.transition = '';
    drawer.style.transform = '';
    drawer.style.opacity = '';
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  // Open only on click (not hover)
  handle.addEventListener('click', () => {
    if (suppressNextHandleClick) {
      suppressNextHandleClick = false;
      return;
    }
    openDrawer();
  });

  // Drag anywhere on the screen left/right to slide between GitHub Projects (left), Main Card, and Memories (right)
  const memDrawer = document.getElementById('memDrawer');
  let dragMode = null; // 'gh-open' | 'gh-close' | 'mem-open' | 'mem-close'

  function openMemDrawer() {
    if (!memDrawer) return;
    memDrawer.style.transition = '';
    memDrawer.style.transform = '';
    memDrawer.style.opacity = '';
    if (typeof window._openMemDrawer === 'function') {
      window._openMemDrawer();
    } else {
      memDrawer.classList.add('open');
      memDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeMemDrawer() {
    if (!memDrawer) return;
    memDrawer.style.transition = '';
    memDrawer.style.transform = '';
    memDrawer.style.opacity = '';
    memDrawer.classList.remove('open');
    memDrawer.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (document.body.classList.contains('site-locked')) return;
    if (e.target.closest('a:not(.gh-split-panel), button:not(#ghEdgeHandle):not(#memEdgeHandle), input, textarea, .interactive-terminal, .mem-lightbox:not(.hidden), .discord-card-overlay:not(.hidden), .tech-modal-overlay:not(.hidden), .confirm-modal-overlay:not(.hidden)')) {
      return;
    }
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragWasOpen = drawer.classList.contains('open');
    const memWasOpen = memDrawer ? memDrawer.classList.contains('open') : false;
    dragMode = dragWasOpen ? 'gh-close' : (memWasOpen ? 'mem-close' : 'idle');
    isDragging = false;
    dragDeltaX = 0;
  });

  window.addEventListener('pointermove', (e) => {
    if (dragStartX === null) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (!isDragging) {
      if (Math.abs(dx) < 10 || Math.abs(dy) > Math.abs(dx) * 1.2) return;
      isDragging = true;
      if (dragMode === 'idle') {
        dragMode = dx >= 0 ? 'gh-open' : 'mem-open';
      }
      if (dragMode === 'gh-open' || dragMode === 'gh-close') {
        drawer.style.transition = 'none';
      } else if (memDrawer) {
        memDrawer.style.transition = 'none';
      }
      document.body.style.cursor = 'grabbing';
    }

    dragDeltaX = dx;
    const w = window.innerWidth || 1;
    if (dragMode === 'gh-open') {
      const clamped = Math.max(0, Math.min(w, dx));
      const pct = clamped / w;
      drawer.style.transform = `translateX(${(-100 + pct * 100).toFixed(2)}%)`;
      drawer.style.opacity = `${Math.min(1, 0.25 + pct * 0.75).toFixed(2)}`;
    } else if (dragMode === 'gh-close') {
      const clamped = Math.min(0, Math.max(-w, dx));
      const pct = Math.abs(clamped) / w;
      drawer.style.transform = `translateX(${(-pct * 100).toFixed(2)}%)`;
      drawer.style.opacity = `${Math.max(0.2, 1 - pct * 0.8).toFixed(2)}`;
    } else if (dragMode === 'mem-open' && memDrawer) {
      const clamped = Math.min(0, Math.max(-w, dx));
      const pct = Math.abs(clamped) / w;
      memDrawer.style.transform = `translateX(${(100 - pct * 100).toFixed(2)}%)`;
      memDrawer.style.opacity = `${Math.min(1, 0.25 + pct * 0.75).toFixed(2)}`;
    } else if (dragMode === 'mem-close' && memDrawer) {
      const clamped = Math.max(0, Math.min(w, dx));
      const pct = clamped / w;
      memDrawer.style.transform = `translateX(${(pct * 100).toFixed(2)}%)`;
      memDrawer.style.opacity = `${Math.max(0.2, 1 - pct * 0.8).toFixed(2)}`;
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (dragStartX === null) return;
    const wasDragging = isDragging;
    const dx = dragDeltaX;
    const mode = dragMode;
    dragStartX = null;
    dragStartY = null;
    dragMode = null;
    isDragging = false;
    dragDeltaX = 0;
    document.body.style.cursor = '';

    if (!wasDragging) return;
    suppressNextPanelClick = true;
    setTimeout(() => { suppressNextPanelClick = false; }, 120);
    if (e.target && e.target.closest && e.target.closest('#ghEdgeHandle')) {
      suppressNextHandleClick = true;
    }

    const threshold = window.innerWidth <= 768
      ? Math.min(75, window.innerWidth * 0.16)
      : Math.min(130, window.innerWidth * 0.18);

    if (mode === 'gh-open') {
      if (dx > threshold) openDrawer();
      else closeDrawer();
    } else if (mode === 'gh-close') {
      if (dx < -threshold) closeDrawer();
      else openDrawer();
    } else if (mode === 'mem-open') {
      if (dx < -threshold) openMemDrawer();
      else closeMemDrawer();
    } else if (mode === 'mem-close') {
      if (dx > threshold) closeMemDrawer();
      else openMemDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Dynamically load all GitHub repos (excluding profile README repo) for zodi4ctvn
  const container = document.getElementById('ghSplitContainer');
  (async () => {
    const allRepos = [];
    let page = 1;
    while (true) {
      const res = await fetch(`https://api.github.com/users/zodi4ctvn/repos?sort=pushed&per_page=100&page=${page}`);
      if (!res.ok) break;
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      allRepos.push(...batch);
      if (batch.length < 100) break;
      page += 1;
    }
    return allRepos;
  })()
    .then((repos) => {
      if (!Array.isArray(repos) || !container) return;
      const filtered = repos.filter((r) => r.name && r.name.toLowerCase() !== 'zodi4ctvn');
      if (filtered.length === 0) return;

      const panelThemes = ['gh-panel-left', 'gh-panel-mid', 'gh-panel-right'];
      const langColors = {
        Lua: '#3b82f6',
        Python: '#3572A5',
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        HTML: '#e34c26',
        CSS: '#563d7c'
      };

      container.innerHTML = '';
      filtered.forEach((repo, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const themeClass = panelThemes[idx % panelThemes.length];
        const safeUrl = (typeof repo.html_url === 'string' && repo.html_url.startsWith('https://github.com/'))
          ? repo.html_url
          : 'https://github.com/zodi4ctvn';
        const panel = document.createElement('a');
        panel.href = safeUrl;
        panel.target = '_blank';
        panel.rel = 'noopener noreferrer';
        panel.className = `gh-split-panel ${themeClass}`;

        const langName = repo.language || 'Code';
        const langColor = langColors[langName] || '#a1a1aa';
        const descText = repo.description || (typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Open-source GitHub repository.' : 'Açık kaynaklı GitHub projesi.');
        panel.innerHTML = `
          <div class="gh-panel-bg-num">${num}</div>
          <div class="gh-panel-content">
            <div class="gh-panel-meta">
              <span class="gh-lang-pill"><span class="gh-lang-dot"></span><span class="gh-lang-name"></span></span>
              <span class="gh-star-pill"></span>
            </div>
            <h2 class="gh-panel-title"></h2>
            <p class="gh-panel-desc"></p>
          </div>
        `;
        panel.querySelector('.gh-lang-dot').style.backgroundColor = langColor;
        panel.querySelector('.gh-lang-name').textContent = langName;
        panel.querySelector('.gh-star-pill').textContent = `★ ${Number(repo.stargazers_count) || 0}`;
        panel.querySelector('.gh-panel-title').textContent = repo.name;
        panel.querySelector('.gh-panel-desc').textContent = descText;
        container.appendChild(panel);
      });
    })
    .catch(() => { });
}


/* ── Right-Edge Handle & Memories Drawer (Categories + Media) ─── */
const MEMORIES_CATEGORIES = [
  { id: 'legal-departman', label: 'Legal Departman', label_en: 'Legal Department' },
  { id: 'profiles', label: 'Kullandığım Profiller', label_en: 'My Profiles' }
];

// Geçmiş Discord profil fotoğrafları (GIF destekli).
// İstediğin profile `note: 'Özel notun'` ekleyebilirsin.
const MEMORIES_PROFILES = [
  { id: 'profil-01', src: 'assets/memories/profiles/profil-01.gif', title: 'Profil #1', isGif: true, note: '' },
  { id: 'profil-02', src: 'assets/memories/profiles/profil-02.jpg', title: 'Profil #2', note: '' },
  { id: 'profil-03', src: 'assets/memories/profiles/profil-03.jpg', title: 'Profil #3', note: '' },
  { id: 'profil-04', src: 'assets/memories/profiles/profil-04.jpg', title: 'Profil #4', note: '' },
  { id: 'profil-05', src: 'assets/memories/profiles/profil-05.jpg', title: 'Profil #5', note: '' },
  { id: 'profil-06', src: 'assets/memories/profiles/profil-06.jpg', title: 'Profil #6', note: '' },
  { id: 'profil-07', src: 'assets/memories/profiles/profil-07.jpg', title: 'Profil #7', note: '' },
  { id: 'profil-08', src: 'assets/memories/profiles/profil-08.jpg', title: 'Profil #8', note: '' },
  { id: 'profil-09', src: 'assets/memories/profiles/profil-09.jpg', title: 'Profil #9', note: '' },
  { id: 'profil-10', src: 'assets/memories/profiles/profil-10.jpg', title: 'Profil #10', note: '' },
  { id: 'profil-11', src: 'assets/memories/profiles/profil-11.jpg', title: 'Profil #11', note: '' },
  { id: 'profil-12', src: 'assets/memories/profiles/profil-12.jpg', title: 'Profil #12', note: '' },
  { id: 'profil-13', src: 'assets/memories/profiles/profil-13.jpg', title: 'Profil #13', note: '' },
  { id: 'profil-14', src: 'assets/memories/profiles/profil-14.jpg', title: 'Profil #14', note: '' },
  { id: 'profil-15', src: 'assets/memories/profiles/profil-15.jpg', title: 'Profil #15', note: '' },
  { id: 'profil-16', src: 'assets/memories/profiles/profil-16.jpg', title: 'Profil #16', note: '' },
  { id: 'profil-17', src: 'assets/memories/profiles/profil-17.jpg', title: 'Profil #17', note: '' },
  { id: 'profil-18', src: 'assets/memories/profiles/profil-18.jpg', title: 'Profil #18', note: '' },
  { id: 'profil-19', src: 'assets/memories/profiles/profil-19.jpg', title: 'Profil #19', note: '' },
  { id: 'profil-20', src: 'assets/memories/profiles/profil-20.jpg', title: 'Profil #20', note: '' },
  { id: 'profil-21', src: 'assets/memories/profiles/profil-21.jpg', title: 'Profil #21', note: '' },
  { id: 'profil-22', src: 'assets/memories/profiles/profil-22.jpg', title: 'Profil #22', note: '' },
  { id: 'profil-23', src: 'assets/memories/profiles/profil-23.jpg', title: 'Profil #23', note: '' },
  { id: 'profil-24', src: 'assets/memories/profiles/profil-24.jpg', title: 'Profil #24', note: '' },
  { id: 'profil-25', src: 'assets/memories/profiles/profil-25.jpg', title: 'Profil #25', note: '' },
  { id: 'profil-26', src: 'assets/memories/profiles/profil-26.jpg', title: 'Profil #26', note: '' },
  { id: 'profil-27', src: 'assets/memories/profiles/profil-27.jpg', title: 'Profil #27', note: '' }
];

// En güncel Discord profilin için özel not bırakmak istersen burayı doldurabilirsin:
const LIVE_PROFILE_NOTE = '';

function getLiveDiscordAvatarItem() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const liveTitleText = isEn ? 'Latest' : 'En Güncel';
  const data = window._lanyardCache || window._lanyardRestData;
  const user = data && data.discord_user;
  if (user && user.id && user.avatar) {
    const isGif = user.avatar.startsWith('a_');
    const ext = isGif ? 'gif' : 'png';
    return {
      id: 'en-guncel',
      isProfile: true,
      isLive: true,
      isGif,
      src: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`,
      title: liveTitleText,
      handle: user.username ? `@${user.username}` : '@zodi4ctvn',
      note: LIVE_PROFILE_NOTE
    };
  }
  const fallbackEl = document.getElementById('discordAvatar');
  const fallbackSrc = (fallbackEl && fallbackEl.src) ? fallbackEl.src : 'https://cdn.discordapp.com/embed/avatars/0.png';
  return {
    id: 'en-guncel',
    isProfile: true,
    isLive: true,
    isGif: fallbackSrc.includes('.gif'),
    src: fallbackSrc,
    title: liveTitleText,
    handle: '@zodi4ctvn',
    note: LIVE_PROFILE_NOTE
  };
}

async function downloadProfileMedia(src, filename) {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error('fetch failed');
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    if (typeof showCopyToast === 'function') {
      showCopyToast(isEn ? `Downloading: ${filename}` : `İndiriliyor: ${filename}`);
    }
  } catch {
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

// Fotoğraf ve videolarını assets/memories/legal-departman/ klasörüne koyup buraya ekleyebilirsin:
// Örnek: { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/foto1.jpg', title: 'Ekip', date: '2026' }
// Örnek: { category: 'legal-departman', type: 'video', src: 'assets/memories/legal-departman/klip1.mp4', title: 'Operasyon', date: '2026' }
const MEMORIES_MEDIA = [
  { category: 'legal-departman', type: 'video', src: 'assets/memories/legal-departman/legal-01.mp4', title: 'WCPD', date: 'Video' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-02.png', title: 'Anı #1', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-03.png', title: 'Anı #2', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-04.png', title: 'Anı #3', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-06.png', title: 'Anı #4', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-07.png', title: 'Anı #5', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-08.png', title: 'Anı #6', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-09.png', title: 'Anı #7', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-10.png', title: 'Anı #8', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-11.png', title: 'Anı #9', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-12.png', title: 'Anı #10', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-13.png', title: 'Anı #11', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-14.png', title: 'Anı #12', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-16.png', title: 'Anı #13', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-17.png', title: 'Anı #14', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-18.png', title: 'Anı #15', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-22.png', title: 'Anı #16', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-23.png', title: 'Anı #17', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-24.png', title: 'Anı #18', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-25.png', title: 'Anı #19', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-27.png', title: 'Anı #20', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-28.png', title: 'Anı #21', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-29.png', title: 'Anı #22', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-30.png', title: 'Anı #23', date: 'Legal Departman' },
  { category: 'legal-departman', type: 'image', src: 'assets/memories/legal-departman/legal-31.png', title: 'Anı #24', date: 'Legal Departman' }
];

function initMemoriesDrawer() {
  const handle = document.getElementById('memEdgeHandle');
  const drawer = document.getElementById('memDrawer');
  const closeBtn = document.getElementById('memDrawerClose');
  const catsEl = document.getElementById('memCats');
  const gridEl = document.getElementById('memGrid');
  const lb = document.getElementById('memLightbox');
  const lbContent = document.getElementById('memLbContent');
  const lbCaption = document.getElementById('memLbCaption');
  const lbMeta = document.getElementById('memLbMeta');
  const lbClose = document.getElementById('memLbClose');
  if (!handle || !drawer) return;

  let activeCat = null;
  let currentLbItems = [];
  let currentLbIdx = 0;

  function renderProfileLightboxMeta(item) {
    if (!lbMeta) return;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    lbMeta.innerHTML = '';
    lbMeta.classList.remove('hidden');

    const noteText = (item.note || '').trim();
    if (noteText) {
      const noteCard = document.createElement('div');
      noteCard.className = 'mem-lb-note-card';

      const noteHeader = document.createElement('div');
      noteHeader.className = 'mem-lb-note-header';
      const noteLabel = document.createElement('span');
      noteLabel.className = 'mem-lb-note-label';
      noteLabel.textContent = isEn ? 'Profile Note' : 'Profil Özel Not';
      noteHeader.appendChild(noteLabel);
      noteCard.appendChild(noteHeader);

      const noteBody = document.createElement('p');
      noteBody.className = 'mem-lb-note-text';
      noteBody.textContent = noteText;
      noteCard.appendChild(noteBody);
      lbMeta.appendChild(noteCard);
    }

    const actionRow = document.createElement('div');
    actionRow.className = 'mem-lb-actions';

    const dlBtn = document.createElement('button');
    dlBtn.type = 'button';
    dlBtn.className = 'mem-lb-download-btn';
    dlBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <span>${isEn ? 'Download Profile' : 'Profili İndir'}</span>
    `;
    const ext = item.isGif ? 'gif' : (item.src && item.src.toLowerCase().endsWith('.jpg') ? 'jpg' : 'png');
    const fileBase = item.isLive ? 'zodi4c-en-guncel-pp' : (item.id || 'profil');
    dlBtn.addEventListener('click', () => downloadProfileMedia(item.src, `${fileBase}.${ext}`));
    actionRow.appendChild(dlBtn);

    lbMeta.appendChild(actionRow);
  }

  function openLightbox(item, list, idx) {
    if (!lb || !lbContent) return;
    if (Array.isArray(list)) {
      currentLbItems = list;
      currentLbIdx = idx || 0;
    }
    lbContent.innerHTML = '';
    lb.classList.toggle('mem-lb-profile-mode', Boolean(item.isProfile));

    if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = item.src;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      lbContent.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title || '';
      lbContent.appendChild(img);
    }
    if (lbCaption) {
      lbCaption.textContent = item.isLive
        ? `${item.title} · ${item.handle || '@zodi4ctvn'}`
        : (item.title || '');
    }
    if (lbMeta) {
      if (item.isProfile) {
        renderProfileLightboxMeta(item);
      } else {
        lbMeta.innerHTML = '';
        lbMeta.classList.add('hidden');
      }
    }
    lb.classList.remove('hidden');
    lb.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lb || !lbContent) return;
    lb.classList.add('hidden');
    lb.classList.remove('mem-lb-profile-mode');
    lb.setAttribute('aria-hidden', 'true');
    lbContent.innerHTML = '';
    if (lbMeta) {
      lbMeta.innerHTML = '';
      lbMeta.classList.add('hidden');
    }
  }

  function renderProfilesView() {
    if (!gridEl) return;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    gridEl.classList.add('mem-grid--profiles');

    const liveItem = getLiveDiscordAvatarItem();
    const archiveItems = MEMORIES_PROFILES.map((p, idx) => ({
      ...p,
      title: isEn ? `Profile #${idx + 1}` : p.title,
      isProfile: true
    }));
    const allProfileItems = [liveItem, ...archiveItems];

    // 1. En Güncel Live Discord PP Hero
    const liveHero = document.createElement('div');
    liveHero.className = 'mem-live-profile-hero';

    const liveAvatarWrap = document.createElement('div');
    liveAvatarWrap.className = 'mem-live-avatar-wrap';
    const liveImg = document.createElement('img');
    liveImg.src = liveItem.src;
    liveImg.alt = isEn ? 'Latest Discord Profile' : 'En Güncel Discord Profili';
    liveImg.decoding = 'async';
    liveAvatarWrap.appendChild(liveImg);
    if (liveItem.isGif) {
      const gifBadge = document.createElement('span');
      gifBadge.className = 'mem-profile-gif-badge';
      gifBadge.textContent = 'GIF';
      liveAvatarWrap.appendChild(gifBadge);
    }

    const liveBody = document.createElement('div');
    liveBody.className = 'mem-live-profile-body';

    const liveBadge = document.createElement('span');
    liveBadge.className = 'mem-live-badge';
    liveBadge.innerHTML = isEn
      ? '<span class="mem-live-dot"></span> LATEST · LIVE DISCORD AVATAR'
      : '<span class="mem-live-dot"></span> EN GÜNCEL · ANLIK DISCORD PP';

    const liveTitle = document.createElement('h3');
    liveTitle.className = 'mem-live-title';
    liveTitle.textContent = isEn ? `Latest (${liveItem.handle})` : `En Güncel (${liveItem.handle})`;

    const liveNote = (liveItem.note || '').trim();
    const liveActions = document.createElement('div');
    liveActions.className = 'mem-live-actions';

    const inspectBtn = document.createElement('button');
    inspectBtn.type = 'button';
    inspectBtn.className = 'mem-profile-btn mem-profile-btn--ghost';
    inspectBtn.textContent = liveNote
      ? (isEn ? 'Inspect / View Note' : 'İncele / Notu Gör')
      : (isEn ? 'Inspect' : 'İncele');
    inspectBtn.addEventListener('click', () => openLightbox(liveItem, allProfileItems, 0));

    const dlLiveBtn = document.createElement('button');
    dlLiveBtn.type = 'button';
    dlLiveBtn.className = 'mem-profile-btn mem-profile-btn--primary';
    dlLiveBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <span>${isEn ? 'Download' : 'İndir'}</span>
    `;
    dlLiveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ext = liveItem.isGif ? 'gif' : 'png';
      downloadProfileMedia(liveItem.src, `zodi4c-en-guncel-pp.${ext}`);
    });

    liveActions.append(inspectBtn, dlLiveBtn);
    liveBody.append(liveBadge, liveTitle);
    if (liveNote) {
      const liveDesc = document.createElement('p');
      liveDesc.className = 'mem-live-desc';
      liveDesc.textContent = liveNote;
      liveBody.appendChild(liveDesc);
    }
    liveBody.appendChild(liveActions);
    liveHero.append(liveAvatarWrap, liveBody);
    liveHero.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openLightbox(liveItem, allProfileItems, 0);
    });
    gridEl.appendChild(liveHero);

    // 2. Section Divider
    const divider = document.createElement('div');
    divider.className = 'mem-profiles-divider';
    divider.innerHTML = isEn
      ? `<span>Past Discord Profiles</span><span class="mem-profiles-count">${archiveItems.length} Profiles</span>`
      : `<span>Geçmiş Discord Profilleri</span><span class="mem-profiles-count">${archiveItems.length} Profil</span>`;
    gridEl.appendChild(divider);

    // 3. Circular Profiles Grid
    const profilesWrap = document.createElement('div');
    profilesWrap.className = 'mem-profiles-grid';

    archiveItems.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'mem-profile-card';

      const avatarWrap = document.createElement('div');
      avatarWrap.className = 'mem-profile-avatar-wrap';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      img.decoding = 'async';
      avatarWrap.appendChild(img);

      if (item.isGif) {
        const gifPill = document.createElement('span');
        gifPill.className = 'mem-profile-gif-badge';
        gifPill.textContent = 'GIF';
        avatarWrap.appendChild(gifPill);
      }

      const quickDl = document.createElement('button');
      quickDl.type = 'button';
      quickDl.className = 'mem-profile-quick-dl';
      quickDl.title = isEn ? `Download ${item.title}` : `${item.title} İndir`;
      quickDl.setAttribute('aria-label', quickDl.title);
      quickDl.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
      quickDl.addEventListener('click', (e) => {
        e.stopPropagation();
        const ext = item.isGif ? 'gif' : (item.src && item.src.toLowerCase().endsWith('.jpg') ? 'jpg' : 'png');
        downloadProfileMedia(item.src, `${item.id}.${ext}`);
      });
      avatarWrap.appendChild(quickDl);

      const meta = document.createElement('div');
      meta.className = 'mem-profile-meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'mem-profile-name';
      nameEl.textContent = item.title;
      meta.appendChild(nameEl);

      const noteText = (item.note || '').trim();
      if (noteText) {
        const noteTag = document.createElement('div');
        noteTag.className = 'mem-profile-note-pill';
        noteTag.textContent = noteText;
        meta.appendChild(noteTag);
      }

      card.append(avatarWrap, meta);
      card.addEventListener('click', () => openLightbox(item, allProfileItems, idx + 1));
      profilesWrap.appendChild(card);
    });

    gridEl.appendChild(profilesWrap);
  }

  function renderSectionPicker() {
    if (!gridEl) return;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    gridEl.classList.add('mem-grid--picker');

    const legalItems = MEMORIES_MEDIA.filter((m) => m.category === 'legal-departman');
    const legalVideos = legalItems.filter((m) => m.type === 'video').length;
    const legalPhotos = legalItems.filter((m) => m.type !== 'video').length;
    const liveAvatar = getLiveDiscordAvatarItem();

    const sections = [
      {
        id: 'legal-departman',
        num: '01',
        title: isEn ? 'Legal Department' : 'Legal Departman',
        stats: isEn ? `${legalVideos} Video · ${legalPhotos} Photos` : `${legalVideos} Video · ${legalPhotos} Fotoğraf`,
        desc: isEn ? 'Operation clips and team photo archive.' : 'Operasyon klipleri ve ekip fotoğraf arşivi.',
        previewSrc: 'assets/memories/legal-departman/legal-02.png',
        isCircular: false
      },
      {
        id: 'profiles',
        num: '02',
        title: isEn ? 'My Profiles' : 'Kullandığım Profiller',
        stats: isEn ? `Latest + ${MEMORIES_PROFILES.length} Profiles` : `En Güncel + ${MEMORIES_PROFILES.length} Profil`,
        desc: isEn ? 'Live Discord avatar and past profile archive.' : 'Anlık Discord profil fotoğrafı ve geçmiş avatar arşivi.',
        previewSrc: liveAvatar.src,
        isCircular: true
      }
    ];

    sections.forEach((sec) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `mem-section-card${sec.isCircular ? ' mem-section-card--profiles' : ''}`;

      const bgNum = document.createElement('span');
      bgNum.className = 'mem-section-num';
      bgNum.textContent = sec.num;

      const previewWrap = document.createElement('div');
      previewWrap.className = `mem-section-preview${sec.isCircular ? ' is-circular' : ''}`;
      const img = document.createElement('img');
      img.src = sec.previewSrc;
      img.alt = sec.title;
      img.decoding = 'async';
      previewWrap.appendChild(img);

      const body = document.createElement('div');
      body.className = 'mem-section-body';

      const statsEl = document.createElement('span');
      statsEl.className = 'mem-section-stats';
      statsEl.textContent = sec.stats;

      const titleEl = document.createElement('h3');
      titleEl.className = 'mem-section-title';
      titleEl.textContent = sec.title;

      const descEl = document.createElement('p');
      descEl.className = 'mem-section-desc';
      descEl.textContent = sec.desc;

      const ctaEl = document.createElement('span');
      ctaEl.className = 'mem-section-cta';
      ctaEl.textContent = isEn ? 'Open Section →' : 'Bölümü Aç →';

      body.append(statsEl, titleEl, descEl, ctaEl);
      card.append(bgNum, previewWrap, body);
      card.addEventListener('click', () => {
        activeCat = sec.id;
        renderMemories();
      });
      gridEl.appendChild(card);
    });
  }

  function renderMemories() {
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const subtitleEl = document.getElementById('memSubtitle');
    if (subtitleEl) {
      subtitleEl.textContent = activeCat === null
        ? (isEn ? 'Zodi4c · Choose a section' : 'Zodi4c · Bir bölüm seç')
        : (isEn ? 'Zodi4c · Photo & video archive' : 'Zodi4c · Fotoğraf ve video arşivi');
    }

    if (catsEl) {
      catsEl.innerHTML = '';
      if (activeCat !== null) {
        const backBtn = document.createElement('button');
        backBtn.className = 'mem-cat-btn mem-cat-back';
        backBtn.textContent = isEn ? '← Sections' : '← Bölümler';
        backBtn.addEventListener('click', () => {
          activeCat = null;
          renderMemories();
        });
        catsEl.appendChild(backBtn);

        MEMORIES_CATEGORIES.forEach((cat) => {
          const btn = document.createElement('button');
          btn.className = `mem-cat-btn${cat.id === activeCat ? ' active' : ''}`;
          btn.textContent = isEn ? (cat.label_en || cat.label) : cat.label;
          btn.addEventListener('click', () => {
            activeCat = cat.id;
            renderMemories();
          });
          catsEl.appendChild(btn);
        });
      }
    }

    const spotlightEl = document.getElementById('memVideoSpotlight');
    if (spotlightEl) {
      spotlightEl.innerHTML = '';
      spotlightEl.classList.add('hidden');
    }

    if (!gridEl) return;
    gridEl.innerHTML = '';
    gridEl.classList.remove('mem-grid--profiles', 'mem-grid--picker');

    if (activeCat === null) {
      renderSectionPicker();
      return;
    }

    if (activeCat === 'profiles') {
      renderProfilesView();
      return;
    }

    const items = MEMORIES_MEDIA.filter((m) => m.category === activeCat);
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'mem-empty-box';
      empty.innerHTML = isEn
        ? `No media in this category yet.<br>Place files inside <code>assets/memories/${activeCat}/</code> and add them to <code>MEMORIES_MEDIA</code>.`
        : `Henüz bu kategoride medya yok.<br>Dosyaları <code>assets/memories/${activeCat}/</code> klasörüne koyup <code>MEMORIES_MEDIA</code> listesine ekleyebilirsin.`;
      gridEl.appendChild(empty);
      return;
    }

    const videos = items.filter((m) => m.type === 'video');
    const photos = items.filter((m) => m.type !== 'video');

    if (spotlightEl && videos.length > 0) {
      const mainVid = videos[0];
      spotlightEl.classList.remove('hidden');
      spotlightEl.innerHTML = `
        <div class="mem-spot-media">
          <video src="${mainVid.src}" muted loop autoplay playsinline preload="metadata"></video>
          <div class="mem-spot-play">▶</div>
        </div>
        <div class="mem-spot-body">
          <span class="mem-spot-badge">${isEn ? 'Featured Clip' : 'Öne Çıkan Klip'}</span>
          <h3 class="mem-spot-title"></h3>
          <p class="mem-spot-meta">${isEn ? 'Legal Department · Video Archive' : 'Legal Departman · Video Arşivi'}</p>
          <span class="mem-spot-cta">${isEn ? 'Watch Fullscreen ▶' : 'Tam Ekran İzle ▶'}</span>
        </div>
      `;
      spotlightEl.querySelector('.mem-spot-title').textContent = mainVid.title || 'Video';
      spotlightEl.onclick = () => openLightbox(mainVid, items, items.indexOf(mainVid));
    }

    photos.forEach((item) => {
      const globalIdx = items.indexOf(item);
      const card = document.createElement('div');
      card.className = 'mem-media-card';
      const thumb = document.createElement('div');
      thumb.className = 'mem-media-thumb';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title || '';
      img.loading = 'lazy';
      thumb.appendChild(img);

      const info = document.createElement('div');
      info.className = 'mem-media-info';
      const titleEl = document.createElement('div');
      titleEl.className = 'mem-media-title';
      titleEl.textContent = item.title || '';
      info.appendChild(titleEl);
      if (item.date) {
        const dateEl = document.createElement('div');
        dateEl.className = 'mem-media-date';
        dateEl.textContent = item.date;
        info.appendChild(dateEl);
      }

      card.appendChild(thumb);
      card.appendChild(info);
      card.addEventListener('click', () => openLightbox(item, items, globalIdx));
      gridEl.appendChild(card);
    });
  }

  function openMem() {
    activeCat = null;
    renderMemories();
    drawer.style.transition = '';
    drawer.style.transform = '';
    drawer.style.opacity = '';
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  window._openMemDrawer = openMem;
  window._rerenderMemories = renderMemories;
  window._refreshMemoriesIfProfiles = () => {
    if (drawer.classList.contains('open') && (activeCat === 'profiles' || activeCat === null)) {
      renderMemories();
    }
  };
  function closeMem() {
    closeLightbox();
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  renderMemories();
  handle.addEventListener('click', openMem);
  if (closeBtn) closeBtn.addEventListener('click', closeMem);
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lb) lb.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target === lb) closeLightbox();
  });
  if (lbContent) lbContent.addEventListener('click', (e) => e.stopPropagation());
  if (lbMeta) lbMeta.addEventListener('click', (e) => e.stopPropagation());
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeMem();
  });
  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) {
      if (e.key === 'Escape' && lb && !lb.classList.contains('hidden')) closeLightbox();
      return;
    }
    if (e.key === 'Escape') {
      if (lb && !lb.classList.contains('hidden')) closeLightbox();
      else if (drawer.classList.contains('open')) closeMem();
    } else if (lb && !lb.classList.contains('hidden') && currentLbItems.length > 1) {
      if (e.key === 'ArrowRight') {
        currentLbIdx = (currentLbIdx + 1) % currentLbItems.length;
        openLightbox(currentLbItems[currentLbIdx], currentLbItems, currentLbIdx);
      } else if (e.key === 'ArrowLeft') {
        currentLbIdx = (currentLbIdx - 1 + currentLbItems.length) % currentLbItems.length;
        openLightbox(currentLbItems[currentLbIdx], currentLbItems, currentLbIdx);
      }
    }
  });
}

/* ── Copy Discord Handle + Toast ──────────────────────────────── */
let copyToastTimer = null;
function showCopyToast(msg) {
  const toast = document.getElementById('copyToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(copyToastTimer);
  copyToastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyDiscordHandle() {
  const handleEl = document.getElementById('ucHandle');
  const raw = (handleEl ? handleEl.textContent : '@zodi4ctvn').replace(/^@/, '').trim();
  const isTr = typeof currentLang === 'undefined' || currentLang === 'tr';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(raw).catch(() => { });
  }
  showCopyToast(isTr ? `Kopyalandı: ${raw} ✓` : `Copied: ${raw} ✓`);
  playUiClickSound(760, 'sine', 0.05);
}

function initDiscordHandleCopy() {
  const handleEl = document.getElementById('ucHandle');
  if (!handleEl) return;
  handleEl.title = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'Click to copy' : 'Kopyalamak için tıkla';
  handleEl.addEventListener('click', (e) => {
    e.stopPropagation();
    copyDiscordHandle();
  });
}

/* ── Animated Browser Tab Title (Type / Erase Effect) ─────────── */
function initTabTitleTypewriter() {
  const fullTitle = 'Z O D I 4 C';
  let idx = fullTitle.length;
  let deleting = true;

  setInterval(() => {
    if (deleting) {
      idx--;
      if (idx <= 1) {
        idx = 1;
        deleting = false;
      }
    } else {
      idx++;
      if (idx >= fullTitle.length) {
        idx = fullTitle.length;
        deleting = true;
      }
    }
    document.title = fullTitle.slice(0, idx);
  }, 340);
}


/* ── Background Preset Switcher (via Right-Click Menu) ───────── */
function initBgPresetSwitcher() {
  const presets = ['dna', 'stars', 'mist'];
  const labels = {
    tr: { dna: 'DNA Ağı', stars: 'Yıldız Alanı', mist: 'Koyu Sis' },
    en: { dna: 'DNA Network', stars: 'Starfield', mist: 'Dark Mist' }
  };

  let cur = 'dna';
  try {
    const saved = localStorage.getItem('zodi4c_bg_preset');
    if (saved && presets.includes(saved)) cur = saved;
  } catch (_) { }

  window._bgPreset = cur;

  window.cycleBgPreset = () => {
    const idx = presets.indexOf(cur);
    cur = presets[(idx + 1) % presets.length];
    window._bgPreset = cur;
    try { localStorage.setItem('zodi4c_bg_preset', cur); } catch (_) { }
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const label = labels[isEn ? 'en' : 'tr'][cur];
    showCopyToast(isEn ? `Background: ${label}` : `Arka Plan: ${label}`);
    playUiClickSound(640, 'sine', 0.04);
  };
}


/* ── Custom Glassmorphic Right-Click Context Menu ─────────────── */
function initCustomContextMenu() {
  const menu = document.getElementById('customCtxMenu');
  if (!menu) return;

  function hideMenu() {
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      menu.setAttribute('aria-hidden', 'true');
    }
  }

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (document.body.classList.contains('site-locked')) return;

    menu.classList.remove('hidden');
    menu.setAttribute('aria-hidden', 'false');

    const mw = menu.offsetWidth || 220;
    const mh = menu.offsetHeight || 260;
    const x = Math.min(e.clientX, window.innerWidth - mw - 12);
    const y = Math.min(e.clientY, window.innerHeight - mh - 12);
    menu.style.left = `${Math.max(10, x)}px`;
    menu.style.top = `${Math.max(10, y)}px`;
    playUiClickSound(660, 'sine', 0.035);
  });

  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;
    e.stopPropagation();
    const action = item.getAttribute('data-ctx');
    hideMenu();

    if (action === 'copy-discord') {
      copyDiscordHandle();
    } else if (action === 'next-track') {
      playNextTrack();
    } else if (action === 'toggle-music') {
      toggleBackgroundMusic();
    } else if (action === 'open-github') {
      const ghHandle = document.getElementById('ghEdgeHandle');
      if (ghHandle) ghHandle.click();
    } else if (action === 'open-memories') {
      const memHandle = document.getElementById('memEdgeHandle');
      if (memHandle) memHandle.click();
    } else if (action === 'toggle-terminal') {
      const termBtn = document.getElementById('terminalToggleBtn');
      if (termBtn) termBtn.click();
    } else if (action === 'cycle-bg') {
      if (typeof window.cycleBgPreset === 'function') window.cycleBgPreset();
    }
  });

  menu.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!menu.matches(':hover')) hideMenu();
    }, 160);
  });

  window.addEventListener('pointermove', (e) => {
    if (menu.classList.contains('hidden')) return;
    const r = menu.getBoundingClientRect();
    const pad = 42;
    if (
      e.clientX < r.left - pad ||
      e.clientX > r.right + pad ||
      e.clientY < r.top - pad ||
      e.clientY > r.bottom + pad
    ) {
      hideMenu();
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#customCtxMenu')) hideMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideMenu();
  });
  window.addEventListener('resize', hideMenu);
}
