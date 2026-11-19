# Z O D I 4 C — Personal Portfolio Website

Live Site: **[https://zodi4ctvn.github.io](https://zodi4ctvn.github.io)**

[🇹🇷 Türkçe](#-türkçe) · [🇬🇧 English](#-english)

---

## 🇹🇷 Türkçe

### Hakkında
`zodi4ctvn.github.io`, herhangi bir framework kullanılmadan saf **HTML, CSS ve JavaScript** ile geliştirilmiş kişisel portföy ve dijital kimlik sayfasıdır.

### Özellikler
- **Canlı Discord Durumu (Lanyard API & WebSocket)**: Anlık durum, Spotify dinleme ilerleme çubuğu, dinamik ortam rengi ve etkileşimli 3D Discord profil kartı.
- **DNA Parçacık Ağı & Teknoloji Takımyıldızı**: Tıklanabilir teknoloji düğümleri, şok dalgası efektleri ve arka plan ön ayarları (`DNA Ağı`, `Yıldız Alanı`, `Koyu Sis`).
- **Etkileşimli Terminal**: `help`, `theme`, `lang`, `whoami`, `stars`, `skills`, `music`, `copy` gibi komutlara sahip yerleşik bash arayüzü.
- **Tek Tıkla TR / EN Dil Değiştirici**: Üst soldaki dil değiştirme düğmesi ile anlık Türkçe / İngilizce arayüz geçişi.
- **Müzik Çalar & Ekolayzer**: Yerel ses dosyaları + YouTube yedek çalma desteği, ses kontrolü, ilerleme çubuğu ve canlı alt frekans görselleştirici.
- **GitHub Projeleri & Anılar Çekmeceleri**: GitHub API üzerinden dinamik depo listeleme ve kategori tabanlı fotoğraf/video/profil arşivi.

### Proje Yapısı
```text
.
├── index.html
├── 404.html
├── LICENSE
├── README.md
├── robots.txt
├── site.webmanifest
├── sitemap.xml
└── assets/
    ├── audio/          # Arka plan müzik dosyaları
    ├── css/
    │   └── style.css   # Tema, animasyon ve arayüz stilleri
    ├── discord/        # Discord rozet ikonları
    ├── img/
    │   └── favicon.svg # Yerel site ikonu
    ├── js/
    │   └── script.js   # Lanyard, Canvas, Terminal, I18N ve arayüz mantığı
    └── memories/       # Fotoğraf, video ve geçmiş profil arşivi
```

### Yerelde Çalıştırma
`index.html` dosyasını doğrudan tarayıcıda açabilir veya herhangi bir statik sunucu (`npx serve .` / `python -m http.server`) ile çalıştırabilirsiniz.

### Lisans
Bu proje **Custom Non-Commercial Attribution License** altında lisanslanmıştır. Kişisel ve ticari olmayan amaçlarla kullanılabilir; ancak **Zodi4c (`zodi4ctvn`)** atfı ve `https://github.com/zodi4ctvn` bağlantısı korunmalıdır. Detaylar için [`LICENSE`](./LICENSE) dosyasına bakın.

---

## 🇬🇧 English

### About
`zodi4ctvn.github.io` is a personal portfolio and digital presence hub built with pure **HTML, CSS, and JavaScript** — zero frameworks.

### Features
- **Live Discord Presence (Lanyard API & WebSocket)**: Real-time status, Spotify playback progress bar, dynamic ambient lighting, and interactive 3D Discord profile card.
- **DNA Particle Network & Tech Constellation**: Clickable technology nodes, shockwave ripples, and switchable background presets (`DNA Network`, `Starfield`, `Dark Mist`).
- **Interactive Terminal**: Built-in bash-style shell supporting `help`, `theme`, `lang`, `whoami`, `stars`, `skills`, `music`, `copy`, and more.
- **One-Click TR / EN Language Toggle**: Top-left language switcher pill for instant Turkish / English UI localization.
- **Music Player & Visualizer**: Local audio tracks with YouTube fallback, volume/seek controls, and real-time bottom frequency equalizer.
- **GitHub Projects & Memories Drawers**: Dynamic GitHub repository showcase and categorized photo/video/profile archive.

### Project Structure
```text
.
├── index.html
├── 404.html
├── LICENSE
├── README.md
├── robots.txt
├── site.webmanifest
├── sitemap.xml
└── assets/
    ├── audio/          # Background audio tracks
    ├── css/
    │   └── style.css   # Themes, animations, and UI styles
    ├── discord/        # Discord badge icons
    ├── img/
    │   └── favicon.svg # Local site favicon
    ├── js/
    │   └── script.js   # Lanyard, Canvas, Terminal, I18N, and UI logic
    └── memories/       # Photo, video, and past profile archive
```

### Running Locally
Open `index.html` directly in your browser, or serve the directory with any static server (e.g. `npx serve .` or `python -m http.server`).

### License
This project is licensed under the **Custom Non-Commercial Attribution License**. Free for personal and non-commercial use provided that attribution to **Zodi4c (`zodi4ctvn`)** and a visible link to `https://github.com/zodi4ctvn` are retained. See [`LICENSE`](./LICENSE) for full terms.
