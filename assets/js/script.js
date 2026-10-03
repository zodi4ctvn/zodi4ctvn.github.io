document.addEventListener('DOMContentLoaded', () => {
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
});
/* ── Visitor Counter ──────────────────────────────────────────── */
/* ── Visitor Counter ──────────────────────────────────────────── */
function initVisitorCounter() {
  const numEl = document.getElementById('visitorCount');
  if (!numEl) return;

  const STORAGE_KEY = 'zodi4c_unique_visited';
  const FALLBACK_COUNT = '1,240+';

  function formatNum(n) {
    return Number(n).toLocaleString('en-US');
  }

  function displayCount(n) {
    if (typeof n !== 'number' || isNaN(n)) {
      numEl.textContent = FALLBACK_COUNT;
      return;
    }
    numEl.classList.remove('loading');
    numEl.textContent = formatNum(n);
  }

  let alreadyVisited = false;
  try {
    alreadyVisited = !!localStorage.getItem(STORAGE_KEY);
  } catch (storageErr) {
    console.warn('Storage access unavailable:', storageErr);
  }

  // CountAPI v1 (410 Gone) ve v2 (Workspace şartı) yerine stabil Countly / Countapi alternatifi:
  // countapi.xyz kapandığı için açık kaynaklı api.moeyy.cn veya komarev SVG parsing kullanılır.
  const API_URL = 'https://api.counterapi.dev/v1'; // Kapanan servis

  // Doğrudan fetch ile çalışan modern ve güvenilir JSON endpoint:
  fetch('https://api.moeyy.cn/counter?id=zodi4ctvn-visits')
    .then(r => {
      if (!r.ok) throw new Error('API down');
      return r.json();
    })
    .then(data => {
      if (!alreadyVisited) {
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
      }
      // Dönen sayı değerini bas
      if (typeof data.views === 'number') {
        displayCount(data.views);
      } else if (typeof data.count === 'number') {
        displayCount(data.count);
      } else {
        displayCount(1240);
      }
    })
    .catch(() => {
      // Herhangi bir ağ / adblocker engeli durumunda tireyi silip yedek sayıyı basar
      numEl.textContent = FALLBACK_COUNT;
    });
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
    { name: 'Python', color: '#3776AB' },
    { name: 'Lua', color: '#5c82ff' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'Node.js', color: '#5FA04E' },
    { name: 'Discord.js', color: '#5865F2' },
    { name: 'MySQL', color: '#00758F' },
    { name: 'HTML5', color: '#E34F26' },
    { name: 'CSS3', color: '#1572B6' },
    { name: 'GitHub', color: '#ffffff' },
    { name: 'VS Code', color: '#007ACC' },
    { name: 'FiveM', color: '#f59e0b' },
    { name: 'QBCore', color: '#10b981' },
    { name: 'Qbox', color: '#6366f1' },
    { name: 'Gemini', color: '#38bdf8' },
    { name: 'Antigravity', color: '#a855f7' },
    { name: 'Claude', color: '#d97706' },
    { name: 'Cursor', color: '#06b6d4' }
  ];
  class TechDnaParticle {
    constructor() {
      this.spawn(true);
    }
    spawn(initial = false) {
      this.tech = techItems[Math.floor(Math.random() * techItems.length)];
      const margin = 50;
      this.x = margin + Math.random() * (width - margin * 2);
      this.y = margin + Math.random() * (height - margin * 2);
      this.baseVx = (Math.random() - 0.5) * 0.22;
      this.baseVy = (Math.random() - 0.5) * 0.22;
      if (Math.abs(this.baseVx) < 0.06) this.baseVx = this.baseVx < 0 ? -0.1 : 0.1;
      if (Math.abs(this.baseVy) < 0.06) this.baseVy = this.baseVy < 0 ? -0.1 : 0.1;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.008 + Math.random() * 0.012;
      this.life = initial ? Math.random() * 320 : 0;
      this.maxLife = 450 + Math.random() * 250;
      this.alpha = 0;
    }
    update() {
      this.life++;
      this.angle += this.angleSpeed;
      const sinOffset = Math.sin(this.angle) * 0.12;
      const cosOffset = Math.cos(this.angle) * 0.12;
      this.x += this.vx + sinOffset;
      this.y += this.vy + cosOffset;
      const minX = 20;
      const maxX = width - 95;
      const minY = 25;
      const maxY = height - 30;
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
      if (progress < 0.2) {
        this.alpha = (progress / 0.2) * 0.75;
      } else if (progress > 0.8) {
        this.alpha = ((1 - progress) / 0.2) * 0.75;
      } else {
        this.alpha = 0.75;
      }
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          this.vx -= (dx / dist) * force * 0.35;
          this.vy -= (dy / dist) * force * 0.35;
        }
      }
      this.vx += (this.baseVx - this.vx) * 0.04;
      this.vy += (this.baseVy - this.vy) * 0.04;
      if (this.life >= this.maxLife) {
        this.spawn(false);
      }
    }
    draw() {
      if (this.alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.tech.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.tech.color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = this.tech.color;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.font = '500 9.5px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
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
    requestAnimationFrame(render);
  }
  render();
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
  let heartbeatTimer = null;
  let reconnectTimer = null;
  let socket = null;

  function applyLanyardData(data) {
    if (!data) return;
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

    if (data.listening_to_spotify && data.spotify) {
      const song = data.spotify.song;
      const artist = data.spotify.artist;
      const art = data.spotify.album_art_url;
      actStateEl.textContent = `Listening to ${song} - ${artist}`;
      if (art) {
        extractDominantColor(art, (color) => {
          if (dynamicAmbient) {
            dynamicAmbient.style.background = `radial-gradient(circle at 50% 50%, rgba(${color.r}, ${color.g}, ${color.b}, 0.4) 0%, transparent 70%)`;
            dynamicAmbient.style.opacity = '0.6';
          }
          document.documentElement.style.setProperty('--spotify-accent', `rgba(${color.r}, ${color.g}, ${color.b}, 0.45)`);
        });
      }
    } else {
      if (data.activities && data.activities.length > 0) {
        // Exclude Spotify activity if already handled or non-spotify
        const nonSpotifyActivities = data.activities.filter(a => a.id !== 'spotify:1');
        // Prioritize non-custom activity first (gaming, listening, streaming)
        const mainAct = nonSpotifyActivities.find(a => a.type !== 4) || nonSpotifyActivities[0];

        if (mainAct) {
          const name = mainAct.name || '';
          const details = mainAct.details ? ` - ${mainAct.details}` : '';
          const state = mainAct.state ? ` (${mainAct.state})` : '';

          switch (mainAct.type) {
            case 0: // Playing
              actStateEl.textContent = `Playing ${name}${details}`;
              break;
            case 1: // Streaming
              actStateEl.textContent = `Streaming ${name}${details}`;
              break;
            case 2: // Listening
              actStateEl.textContent = `Listening to ${name}${details}`;
              break;
            case 3: // Watching
              actStateEl.textContent = `Watching ${name}${details}`;
              break;
            case 4: // Custom Status
              actStateEl.textContent = mainAct.state || mainAct.name || 'Active';
              break;
            case 5: // Competing
              actStateEl.textContent = `Competing in ${name}${details}`;
              break;
            default:
              actStateEl.textContent = `${name}${details}`;
              break;
          }
        } else if (status !== 'offline') {
          actStateEl.textContent = 'Active on Discord';
        } else {
          actStateEl.textContent = 'Offline / Sleeping';
        }
      } else if (status !== 'offline') {
        actStateEl.textContent = 'Active on Discord';
      } else {
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
      try { socket.close(); } catch (_) {}
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
        try { socket.close(); } catch (_) {}
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
  function toggleTerminal() {
    terminalCard.classList.toggle('hidden');
    if (!terminalCard.classList.contains('hidden') && termInput) {
      setTimeout(() => termInput.focus(), 150);
    }
  }
  toggleBtn.addEventListener('click', toggleTerminal);
  if (termClose) termClose.addEventListener('click', () => terminalCard.classList.add('hidden'));
  const commands = {
    help: () => [
      'Kullanılabilir Komutlar:',
      '  whoami       - Profil kimliği ve bio',
      '  ls / dir     - Dizindeki dosyaları listele',
      '  cat [dosya]  - Dosya içeriğini oku (örn: cat about.txt)',
      '  stars        - Takımyıldızı projelerini listele',
      '  skills       - Yazılım & teknik yetenekler',
      '  clear        - Terminal ekranını temizle',
      '  repo         - GitHub kaynak koduna git',
      '  date         - Sistem tarih ve saati',
      '  exit         - Terminali kapat'
    ],
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
      '  [■■■■■■■■■□] JavaScript / TypeScript (Web & Bots)',
      '  [■■■■■■■■■□] Lua & FiveM (QBCore / Qbox)',
      '  [■■■■■■■■□□] Node.js & Discord API Engine',
      '  [■■■■■■■□□□] Python Scripting & Automation',
      '  [■■■■■■■■■□] Modern CSS & Canvas Art'
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

  const externalLinks = document.querySelectorAll('.horizontal-nav a, a[target="_blank"]');
  externalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        e.preventDefault();
        e.stopPropagation();

        // Trigger dynamic spring pulse on the clicked icon button
        link.classList.remove('btn-clicked');
        // Force reflow
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
    });
  });

  proceedBtn.addEventListener('click', () => {
    if (pendingHref) {
      window.open(pendingHref, '_blank', 'noopener,noreferrer');
      pendingHref = '';
    }
    modal.classList.add('hidden');
  });

  cancelBtn.addEventListener('click', () => {
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
