document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('selectstart', (e) => e.preventDefault());
  document.addEventListener('dragstart', (e) => e.preventDefault());
  initMatrixEntryCurtain();
  initDecodeTitle();
  initCustomCursor();
  initCursorTrail();
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
  initTechModal();
  initTypewriterBio();
  initDiscordProfileCard();
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

    // Remove curtain element from layout after smooth 1.4s transition
    setTimeout(() => {
      curtain.style.display = 'none';
    }, 1450);

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
        this.vx += ((this.baseVx || 0.2) - this.vx) * 0.03;
        this.vy += ((this.baseVy || 0.2) - this.vy) * 0.03;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isDna ? 'rgba(255, 255, 255, 0.75)' : 'rgba(200, 205, 215, 0.35)';
      ctx.fill();
    }
  }
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
      tags: ['Backend', 'Scripting', 'Automation', 'APIs'],
      projects: ['Discord Bot Hizmeti', 'Araçlar']
    },
    {
      name: 'Lua',
      color: '#5c82ff',
      desc: 'FiveM istemci ve sunucu taraflı oyun mantığı, performanslı oyun eklentileri mimarisi.',
      tags: ['FiveM', 'Game Dev', 'Scripts', 'High Performance'],
      projects: ['Özel FiveM Scriptleri', 'QBCore / Qbox Entegrasyonları']
    },
    {
      name: 'JavaScript',
      color: '#F7DF1E',
      desc: 'İnteraktif web deneyimleri, canvas animasyonları ve modern asenkron arayüzler.',
      tags: ['Frontend', 'ES6+', 'Canvas API', 'DOM Engine'],
      projects: ['zodi4ctvn.github.io Kişisel Hub', 'İnteraktif Web Uygulamaları']
    },
    {
      name: 'Node.js',
      color: '#5FA04E',
      desc: 'Discord API bot motorları, REST API servisleri ve asenkron arka plan mimarisi.',
      tags: ['Runtime', 'Backend', 'WebSockets', 'Discord Bot'],
      projects: ['Lanyard Realtime Handler', 'Özel Discord Botları']
    },
    {
      name: 'Discord.js',
      color: '#5865F2',
      desc: 'Gelişmiş komut sistemleri, etkinlik dinleyicileri ve Discord sunucu otomasyonu.',
      tags: ['Discord API', 'Slash Commands', 'Bot Dev'],
      projects: ['Topluluk Yönetim Botları', 'Webhook Entegrasyonları']
    },
    {
      name: 'MySQL',
      color: '#00758F',
      desc: 'İlişkisel veritabanı tasarımı, FiveM sunucu tabloları ve veri kalıcılığı optimizasyonu.',
      tags: ['Database', 'SQL Queries', 'Data Persistence'],
      projects: ['FiveM Oyuncu Veritabanı Mimarisi']
    },
    {
      name: 'HTML5',
      color: '#E34F26',
      desc: 'Semantik web yapısı, erişilebilirlik, modern meta etiketler ve SEO optimizasyonu.',
      tags: ['Markup', 'SEO', 'Semantics', 'Modern Web'],
      projects: ['Dijital Profil Sayfası', 'Responsive UI Tasarımları']
    },
    {
      name: 'CSS3',
      color: '#1572B6',
      desc: 'Glassmorphism, 3D tilt efektleri, modern temalar ve akıcı mikro animasyonlar.',
      tags: ['Styles', 'Animations', 'Glassmorphism', 'Cyberpunk'],
      projects: ['Gelişmiş Takımyıldızı Arayüzü', 'Dinamik Tema Motoru']
    },
    {
      name: 'GitHub',
      color: '#ffffff',
      desc: 'Versiyon kontrolü, GitHub Pages barındırma ve açık kaynaklı proje yönetimi.',
      tags: ['Git', 'CI/CD', 'Open Source', 'Deploy'],
      projects: ['zodi4ctvn.github.io Repository', 'Script Depoları']
    },
    {
      name: 'VS Code',
      color: '#007ACC',
      desc: 'Özelleştirilmiş siber ortam, entegre terminal, git iş akışı ve ana geliştirme merkezi.',
      tags: ['IDE', 'Workflow', 'Productivity', 'Dev Environment'],
      projects: ['Günlük Kodlama & Script Geliştirme']
    },
    {
      name: 'FiveM',
      color: '#f59e0b',
      desc: 'Özel GTA V roleplay sunucuları, optimize edilmiş istemci-sunucu senkronizasyonu.',
      tags: ['Roleplay Engine', 'Game Modding', 'Client/Server Sync'],
      projects: ['Özel Sunucu Mimarileri', 'HUD & UI Sistemleri']
    },
    {
      name: 'QBCore',
      color: '#10b981',
      desc: 'FiveM için modüler ve kararlı roleplay altyapısı üzerinde sistem geliştirme.',
      tags: ['Framework', 'Economy', 'Jobs', 'Modular Code'],
      projects: ['QBCore Özel Envanter & Meslek Scriptleri']
    },
    {
      name: 'Qbox',
      color: '#6366f1',
      desc: 'Modern, ox-lib tabanlı ve ultra yüksek performanslı FiveM framework mimarisi.',
      tags: ['Next-Gen RP', 'Ox-Lib', 'High FPS', 'Clean Code'],
      projects: ['Qbox Optimize Sunucu Paketleri']
    },
    {
      name: 'Gemini',
      color: '#38bdf8',
      desc: 'Derin yapay zeka kodlama asistanı, karmaşık algoritma tasarımı ve refactoring.',
      tags: ['AI Assistant', 'DeepMind', 'Code Architect'],
      projects: ['Antigravity IDE Geliştirme Oturumu']
    },
    {
      name: 'Antigravity',
      color: '#a855f7',
      desc: 'Yeni nesil ajan tabanlı pair programming ve tam teşekküllü geliştirme ortamı.',
      tags: ['Agentic AI', 'Pair Programming', 'Workspace Engine'],
      projects: ['zodi4ctvn Gelişmiş Özellik Güncellemeleri']
    },
    {
      name: 'Claude',
      color: '#d97706',
      desc: 'Gelişmiş dil modelleriyle mimari analiz ve kod inceleme.',
      tags: ['AI Model', 'Analysis', 'Architecture'],
      projects: ['Kod Standartları & Analiz']
    },
    {
      name: 'Cursor',
      color: '#06b6d4',
      desc: 'Yapay zeka güdümlü akıllı kod tamamlama ve hızlı refaktör aracı.',
      tags: ['AI Code Editor', 'Speed', 'Refactoring'],
      projects: ['Hızlı Prototip Geliştirme']
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
    for (let tNode of techDnaNodes) {
      tNode.update();
      tNode.draw();
    }
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      nodeA.update();
      nodeA.draw();
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
      if (mouse.x !== null && mouse.y !== null) {
        const dx = nodeA.x - mouse.x;
        const dy = nodeA.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_CONNECTION_DIST) {
          const alpha = (1 - dist / MOUSE_CONNECTION_DIST) * 0.38;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // ── Dinamik Yıldız Saati ──
    {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = now.getSeconds();
      const timeStr = `${hh}:${mm}`;
      const cx = width - 70;
      const cy = 32;
      const pulse = 0.6 + Math.sin(performance.now() * 0.002) * 0.4;
      const orbitPct = ss / 60; // seconds as orbit progress

      ctx.save();

      // Outer orbit ring (seconds progress)
      ctx.beginPath();
      ctx.arc(cx, cy, 14, -Math.PI / 2, -Math.PI / 2 + orbitPct * Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, 0.28)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dim full orbit track
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, 0.07)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Orbiting dot
      const dotAngle = -Math.PI / 2 + orbitPct * Math.PI * 2;
      const dotX = cx + Math.cos(dotAngle) * 14;
      const dotY = cy + Math.sin(dotAngle) * 14;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.5 + pulse * 0.5).toFixed(2)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffffff';
      ctx.fill();

      // Center star dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse.toFixed(2)})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ffffff';
      ctx.fill();

      // Time text
      ctx.shadowBlur = 0;
      ctx.font = '500 9px monospace';
      ctx.fillStyle = `rgba(255, 255, 255, 0.55)`;
      ctx.textAlign = 'center';
      ctx.fillText(timeStr, cx, cy + 26);
      ctx.textAlign = 'left';

      ctx.restore();
    }

    requestAnimationFrame(render);
  }
  render();

  // Click on screen to inspect constellation tech nodes
  window.addEventListener('click', (e) => {
    // If Discord card modal is open, or click is within modal/pill/interactive UI, ignore
    const dcModal = document.getElementById('discordCardModal');
    if (dcModal && !dcModal.classList.contains('hidden')) {
      return;
    }
    if (e.target.closest('a, button, input, .confirm-modal-box, .tech-modal-box, .interactive-terminal, .entry-curtain, .discord-card, .discord-card-overlay, .discord-activity-pill, #discordPill')) {
      return;
    }
    const clickX = e.clientX;
    const clickY = e.clientY;

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
    if (data.discord_user && data.discord_user.id && data.discord_user.avatar) {
      avatarEl.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;
    }
    if (data.discord_user && data.discord_user.username) {
      usernameEl.textContent = data.discord_user.username;
    }
    if (data.discord_user && data.discord_user.banner) {
      const bannerUrl = `https://cdn.discordapp.com/banners/${data.discord_user.id}/${data.discord_user.banner}.png?size=1024`;
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
        const fallbackBanner = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=512`;
        bgBanner.style.backgroundImage = `url('${fallbackBanner}')`;
        bgBanner.style.opacity = '0.18';
      }
    }
    const status = data.discord_status || 'offline';
    statusDot.className = `user-status-dot ${status}`;

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
    help: () => [
      'Kullanılabilir Komutlar:',
      '  whoami       - Profil kimliği ve bio',
      '  ls / dir     - Dizindeki dosyaları listele',
      '  cat [dosya]  - Dosya içeriğini oku (örn: cat about.txt)',
      '  stars        - Takımyıldızı projelerini listele',
      '  skills       - Yazılım & teknik yetenekler',
      '  theme [mod]  - Siber temayı değiştir (matrix, bloodmoon, synthwave, void/default)',
      '  clear        - Terminal ekranını temizle',
      '  repo         - GitHub kaynak koduna git',
      '  date         - Sistem tarih ve saati',
      '  exit         - Terminali kapat'
    ],
    theme: (args) => {
      const mode = (args[0] || '').toLowerCase();
      const themes = ['matrix', 'bloodmoon', 'synthwave', 'void', 'default'];
      if (!mode) {
        return [
          'Mevcut Temalar: matrix, bloodmoon, synthwave, void (varsayılan)',
          'Kullanım: theme <isim>  (Örn: theme matrix)'
        ];
      }
      document.body.classList.remove('theme-matrix', 'theme-bloodmoon', 'theme-synthwave');
      if (mode === 'matrix') {
        document.body.classList.add('theme-matrix');
        try { localStorage.setItem('zodi4c_theme', 'matrix'); } catch (_) { }
        return ['[OK] Tema "matrix" (Emerald Rain) olarak ayarlandı.'];
      } else if (mode === 'bloodmoon' || mode === 'crimson') {
        document.body.classList.add('theme-bloodmoon');
        try { localStorage.setItem('zodi4c_theme', 'bloodmoon'); } catch (_) { }
        return ['[OK] Tema "bloodmoon" (Crimson Cyber) olarak ayarlandı.'];
      } else if (mode === 'synthwave' || mode === 'violet') {
        document.body.classList.add('theme-synthwave');
        try { localStorage.setItem('zodi4c_theme', 'synthwave'); } catch (_) { }
        return ['[OK] Tema "synthwave" (Neon Violet) olarak ayarlandı.'];
      } else if (mode === 'void' || mode === 'default' || mode === 'reset') {
        try { localStorage.removeItem('zodi4c_theme'); } catch (_) { }
        return ['[OK] Varsayılan Void / Cyber Cyan temasına dönüldü.'];
      } else {
        return [`Bilinmeyen tema: '${mode}'. Geçerli olanlar: matrix, bloodmoon, synthwave, void`];
      }
    },
    whoami: () => [
      'Zodi4c (zodi4ctvn)',
      'Rol: Digital Artisan & Web Architect',
      'Discord: 1403455771563528252 / 1350881372104949903',
      'Bio: "Sadelik ve detaylardaki zarafet."'
    ],
    ls: () => ['about.txt    skills.json    socials.lnk    projects.md    constellation.map'],
    dir: () => ['about.txt    skills.json    socials.lnk    projects.md    constellation.map'],
    stars: () => [
      'Takımyıldızı Projeleri:',
      '  [1] GitHub: https://github.com/zodi4ctvn/zodi4ctvn.github.io',
      '  [2] Discord Ana Profil: ID 1403455771563528252',
      '  [3] guns.lol: https://guns.lol/zodi4c',
      '  [4] YouTube: https://www.youtube.com/@zodi4ctvn'
    ],
    cat: (args) => {
      const file = args[0] ? args[0].toLowerCase() : '';
      if (!file) return ['Hata: Bir dosya adı belirtin. Örnek: cat about.txt'];
      if (file === 'about.txt') {
        return [
          'Zodi4c resmi kişisel sayfası.',
          'Etkileşimli terminal, dinamik Lanyard Discord durumu ve DNA parçacık ağı.'
        ];
      }
      if (file === 'socials.lnk') {
        return [
          'Bağlantılar & Profiller:',
          '  - Discord Ana: https://discord.com/users/1403455771563528252',
          '  - Discord Yedek: https://discord.com/users/1350881372104949903',
          '  - guns.lol: https://guns.lol/zodi4c',
          '  - YouTube: https://www.youtube.com/@zodi4ctvn',
          '  - GitHub: https://github.com/zodi4ctvn'
        ];
      }
      if (file === 'skills.json') {
        return ['{ "languages": ["JavaScript", "TypeScript", "Lua", "Python", "HTML5", "CSS3"], "platforms": ["Node.js", "FiveM (QBCore / Qbox)", "Discord API", "Git"] }'];
      }
      if (file === 'projects.md' || file === 'constellation.map') {
        return ['# Projeler & Yıldızlar', '- zodi4ctvn.github.io (Kişisel Alan)', '- Discord Bot & API Entegrasyonları', '- FiveM Script & Framework Geliştirme'];
      }
      return [`cat: ${file}: Böyle bir dosya bulunamadı.`];
    },
    skills: () => [
      'Yetenekler:',
      '  > JavaScript / TypeScript  [======....] 60%',
      '  > Lua / FiveM (QBCore/Qbox) [==========] 100%',
      '  > Node.js / Discord API     [=========.] 90%',
      '  > Python Scripting           [========..] 80%',
      '  > Modern CSS / Canvas Art   [=======...] 70%'
    ],
    clear: () => {
      termBody.innerHTML = '';
      return [];
    },
    repo: () => {
      window.open('https://github.com/zodi4ctvn/zodi4ctvn.github.io', '_blank');
      return ['GitHub deposu yeni sekmede açılıyor...'];
    },
    date: () => [new Date().toString()],
    sudo: () => ['Permission denied: You are not in the sudoers file.'],
    exit: () => {
      terminalCard.classList.add('hidden');
      return [];
    }
  };
  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = termInput.value.trim();
        termInput.value = '';
        if (!raw) return;
        appendLine(`zodi4c@root:~$ ${raw}`, 'cmd');
        const parts = raw.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        if (commands[cmd]) {
          const lines = commands[cmd](args);
          lines.forEach(l => appendLine(l, 'output'));
        } else {
          appendLine(`Komut bulunamadı: '${cmd}'. Yardım için 'help' yazın.`, 'error');
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
function playUiClickSound(type = 'click', waveType = 'triangle', duration = 0.045) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (typeof type === 'number') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.setValueAtTime(type, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      return;
    }
    if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
      return;
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.045);
    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch (e) { }
}
function initButtonAudioFeedback() {
  const targets = document.querySelectorAll('a, button, [role="button"], .icon-nav-btn, .discord-activity-pill');
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => playUiClickSound('hover'));
    el.addEventListener('click', () => playUiClickSound('click'));
  });
  window.addEventListener('click', (e) => {
    if (!e.target.closest('a, button, [role="button"]')) {
      playUiClickSound('click');
    }
  });
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
const YT_VIDEO_ID = 'tZRuphhoirQ';

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

    const t = performance.now() * 0.0038;

    for (let i = 0; i < totalBars; i++) {
      let targetH = 2;
      if (isMusicPlaying) {
        const w1 = Math.sin(t * 2.3 + i * 0.11);
        const w2 = Math.cos(t * 1.5 - i * 0.07);
        const w3 = Math.sin(t * 3.8 + i * 0.22);
        const dynamicBeats = Math.pow(Math.abs(w1 * w2 * 0.72 + w3 * 0.28), 1.55);
        targetH = Math.max(2, dynamicBeats * (height - 3));
      } else {
        targetH = 1.5;
      }

      barHeights[i] += (targetH - barHeights[i]) * 0.24;

      const x = i * (barWidth + barGap);
      const h = Math.max(1.5, barHeights[i]);
      const y = height - h;

      const intensity = h / height;
      const alpha = isMusicPlaying ? (0.22 + intensity * 0.75) : 0.08;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.fillRect(x, y, barWidth, h);
    }
  }

  draw();
}
function startBackgroundMusic() {
  const bgAudio = document.getElementById('bgAudio');
  const iframe = document.getElementById('ytAudioIframe');
  const vol = 0.1;

  isMusicPlaying = true;

  if (bgAudio) {
    try {
      bgAudio.volume = vol;
      bgAudio.muted = false;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Background music playing successfully.');
          })
          .catch((err) => {
            console.warn('HTML5 audio play blocked/failed, using YouTube fallback:', err);
            if (iframe) {
              iframe.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&enablejsapi=1`;
            }
          });
        return;
      }
    } catch (e) {
      console.warn('Audio play exception:', e);
    }
  }

  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&enablejsapi=1`;
  }
}

function pauseBackgroundMusic() {
  const bgAudio = document.getElementById('bgAudio');
  const iframe = document.getElementById('ytAudioIframe');
  isMusicPlaying = false;
  if (bgAudio) bgAudio.pause();
  if (iframe) iframe.src = '';
}

function toggleBackgroundMusic() {
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
}

window.addEventListener('keydown', (e) => {
  const curtain = document.getElementById('entryCurtain');
  if (curtain && !curtain.classList.contains('fading') && curtain.style.display !== 'none') return;

  const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
  if (targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable) return;

  if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
    e.preventDefault();
    toggleBackgroundMusic();
  }
});
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let isCursorVisible = false;
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isCursorVisible) {
      isCursorVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mousemove', onMouseMove, { passive: true });

  document.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget && !e.toElement) {
      isCursorVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    }
  });

  document.addEventListener('mouseenter', () => {
    isCursorVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  function renderCursorRing() {
    if (isCursorVisible) {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursorRing);
  }
  renderCursorRing();

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, [role="button"], input, .discord-activity-pill, #decodeTitle, .icon-nav-btn');
    if (target) {
      document.body.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const fromEl = e.target.closest('a, button, [role="button"], input, .discord-activity-pill, #decodeTitle, .icon-nav-btn');
    const toEl = e.relatedTarget ? e.relatedTarget.closest('a, button, [role="button"], input, .discord-activity-pill, #decodeTitle, .icon-nav-btn') : null;
    if (fromEl && !toEl && !hoveredNavBtn) {
      document.body.classList.remove('cursor-hover');
    }
  }, { passive: true });

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
  const scene = document.querySelector('.scene-center');
  const backdrop = document.querySelector('.background-backdrop');
  if (!scene) return;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let sceneFrozen = false;
  const dockEl = document.querySelector('.horizontal-nav');
  if (dockEl) {
    dockEl.addEventListener('mouseenter', () => { sceneFrozen = true; });
    dockEl.addEventListener('mouseleave', () => { sceneFrozen = false; });
  }
  window.addEventListener('mousemove', (e) => {
    if (sceneFrozen) return;
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = normX * 7;
    targetY = normY * 7;
  });
  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
  function animate() {
    if (sceneFrozen) {
      requestAnimationFrame(animate);
      return;
    }
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    const rotX = (-currentY * 0.16).toFixed(2);
    const rotY = (currentX * 0.16).toFixed(2);
    scene.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (backdrop) {
      backdrop.style.transform = `translate3d(${(-currentX * 0.45).toFixed(2)}px, ${(-currentY * 0.45).toFixed(2)}px, 0)`;
    }
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
  const titleEl = document.getElementById('decodeTitle');
  if (titleEl) {
    let titleHover = false;
    let localTiltX = 0, localTiltY = 0;
    let curTiltX = 0, curTiltY = 0;
    titleEl.addEventListener('mouseenter', () => {
      titleHover = true;
    });
    titleEl.addEventListener('mousemove', (e) => {
      const rect = titleEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      localTiltX = -y * 12;
      localTiltY = x * 12;
    });
    titleEl.addEventListener('mouseleave', () => {
      titleHover = false;
      localTiltX = 0;
      localTiltY = 0;
    });
    function updateTitlePhysics() {
      const globalTiltX = -mouseGlobal.normY * 6;
      const globalTiltY = mouseGlobal.normX * 6;
      const targetX = globalTiltX + localTiltX;
      const targetY = globalTiltY + localTiltY;
      curTiltX += (targetX - curTiltX) * 0.12;
      curTiltY += (targetY - curTiltY) * 0.12;
      const zDepth = titleHover ? 12 : 0;
      const scale = titleHover ? 1.03 : 1.0;
      titleEl.style.transform = `perspective(1000px) rotateX(${curTiltX.toFixed(2)}deg) rotateY(${curTiltY.toFixed(2)}deg) translateZ(${zDepth}px) scale(${scale})`;
      requestAnimationFrame(updateTitlePhysics);
    }
    updateTitlePhysics();
  }
  const pill = document.querySelector('.discord-activity-pill');
  if (pill) {
    let pillHover = false;
    let localTiltX = 0, localTiltY = 0;
    let curTiltX = 0, curTiltY = 0;
    pill.addEventListener('mouseenter', () => {
      pillHover = true;
    });
    pill.addEventListener('mousemove', (e) => {
      const rect = pill.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      localTiltX = -y * 10;
      localTiltY = x * 10;
    });
    pill.addEventListener('mouseleave', () => {
      pillHover = false;
      localTiltX = 0;
      localTiltY = 0;
    });
    function updatePillPhysics() {
      const globalTiltX = -mouseGlobal.normY * 8;
      const globalTiltY = mouseGlobal.normX * 8;
      const globalShiftX = mouseGlobal.normX * 4;
      const globalShiftY = mouseGlobal.normY * 4;
      const targetX = globalTiltX + localTiltX;
      const targetY = globalTiltY + localTiltY;
      curTiltX += (targetX - curTiltX) * 0.12;
      curTiltY += (targetY - curTiltY) * 0.12;
      const zDepth = pillHover ? 12 : 0;
      const scale = pillHover ? 1.02 : 1.0;
      pill.style.transform = `perspective(1000px) translate3d(${globalShiftX.toFixed(2)}px, ${globalShiftY.toFixed(2)}px, ${zDepth}px) rotateX(${curTiltX.toFixed(2)}deg) rotateY(${curTiltY.toFixed(2)}deg) scale(${scale})`;
      requestAnimationFrame(updatePillPhysics);
    }
    updatePillPhysics();
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

/* ── Stored Theme Initializer ── */
function initStoredTheme() {
  try {
    const saved = localStorage.getItem('zodi4c_theme');
    if (saved && ['matrix', 'bloodmoon', 'synthwave'].includes(saved)) {
      document.body.classList.add(`theme-matrix` === `theme-${saved}` ? `theme-${saved}` : `theme-${saved}`);
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
  const tagsWrap = document.getElementById('techModalTags');
  const projectsWrap = document.getElementById('techModalProjects');

  if (!modal) return;

  if (dot) {
    dot.style.backgroundColor = tech.color || '#38bdf8';
    dot.style.boxShadow = `0 0 12px ${tech.color || '#38bdf8'}`;
  }
  if (title) title.textContent = tech.name || 'Tech Node';
  if (desc) desc.textContent = tech.desc || 'Bu teknoloji takımyıldızında aktif olarak kullanılan bileşenlerden biridir.';

  if (tagsWrap) {
    tagsWrap.innerHTML = '';
    const tags = tech.tags || ['Core', 'Active'];
    tags.forEach(t => {
      const sp = document.createElement('span');
      sp.className = 'tech-tag';
      sp.textContent = `#${t}`;
      tagsWrap.appendChild(sp);
    });
  }

  if (projectsWrap) {
    projectsWrap.innerHTML = '';
    const projects = tech.projects || ['Kişisel Altyapı'];
    projects.forEach(p => {
      const item = document.createElement('div');
      item.className = 'tech-project-item';
      item.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style="margin-right:6px;flex-shrink:0;vertical-align:middle"><polygon points="0,1 9,5 0,9" fill="currentColor" opacity="0.85"/></svg><span>${p}</span>`;
      projectsWrap.appendChild(item);
    });
  }

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
function initTypewriterBio() {
  const el = document.getElementById('twText');
  if (!el) return;

  const phrases = [
    'Full-Stack FiveM Developer',
    'Lua & Systems Engineer',
    'Discord Bot Architect',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;

  function tick() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
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
    // Theme takes priority
    if (body.classList.contains('theme-matrix')) return 'rgba(34, 197, 94, 0.75)';
    if (body.classList.contains('theme-bloodmoon')) return 'rgba(220, 38, 38, 0.75)';
    if (body.classList.contains('theme-synthwave')) return 'rgba(168, 85, 247, 0.75)';
    // Then Spotify album color
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--spotify-accent').trim();
    if (accent && accent !== 'rgba(255, 255, 255, 0.15)') {
      const match = accent.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.65)`;
    }
    return 'rgba(255, 255, 255, 0.5)';
  }

  window.addEventListener('mousemove', (e) => {
    frameCount++;
    // Spawn a trail dot every 2 frames for smooth trail
    if (frameCount % 2 !== 0) return;

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
      // Kullanıcının belirttiği Discord rozetleri (assets/discord/*.png)
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

  // Activity
  if (data.listening_to_spotify && data.spotify) {
    const sp = data.spotify;
    if (dcActName) dcActName.textContent = sp.song || 'Spotify';
    if (dcActDetail) dcActDetail.textContent = sp.artist ? `by ${sp.artist}` : '';
    if (dcActIcon && sp.album_art_url) {
      dcActIcon.innerHTML = `<img src="${sp.album_art_url}" alt="Album" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
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
            dcActIcon.innerHTML = `<img src="https://media.discordapp.net/${imgKey.slice(3)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
          } else {
            dcActIcon.innerHTML = `<img src="https://cdn.discordapp.com/app-assets/${act.application_id}/${imgKey}.png" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
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
