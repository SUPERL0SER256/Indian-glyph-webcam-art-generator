// ── LANGUAGE SETS ──
const languages = [
  {
    id: "chinese",
    label: "CHINESE",
    group: "CJK",
    sample: "龘木",
    chars: "龘晶森林木本十一· "
  },

  {
     id: "arabic",
    label: "URDU",
    group: "SEMITIC",
    sample: "مب",
    chars: "اَُِّٰٖ:,^'َُِّٰٖبپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلم "
  },
  {
    id: "devanagari",
    label: "DEVANAGARI",
    group: "INDIC",
    sample: "ॐझ",
    chars: "ॐझ्र्ध्रृश्व्रम्भक्ष्रह्णकखगचटठ· "
  },
  {
    id: "latin",
    label: "ASCII",
    group: "ASCII",
    sample: "M%",
    chars: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. "
  },
  {
    id: "javanese",
    label: "BALINESE",
    group: "SOUTHEAST ASIAN",
    sample: "ꦓꦩ",
    chars: "ꦓꦝꦩꦯꦡꦤꦭꦫꦏꦄꦆꦈاَُِّٰٖ:,^."
  },
  {
    id: "kannada",
    label: "KANNADA",
    group: "DRAVIDIAN",
    sample: "ಷಣ",
    chars: "ಷಣಘಢಭಮಷಣತದನಲವಕಅಇاَُِّٰٖ^ "
  },
  {
    id: "bengali",
    label: "BENGALI",
    group: "INDIC",
    sample: "ঘভ",
    chars: "ঘঘঢভমষণতনলরকঅই/:. "
  },
  {
    id: "blocks",
    label: "BLOCKS",
    group: "SYMBOLS",
    sample: "█░",
    chars: "█▓▒░ "
  },
  {
    id: "lepcha",
    label: "LEPCHA",
    group: "HIMALAYAN",
    sample: "ᰁᰔ",
    chars: " .;/ᰁᰀᰋᰎᰐᰑᰓᰔᰖᰗᰘᰛᰍ"
  },
  {
    id: "tamil",
    label: "TAMIL",
    group: "DRAVIDIAN",
    sample: "உக",
    chars: " ^اَُِّٰٖஉகலநபமஹஸஷ"
  },
  {
    id: "meitei",
    label: "MANIPURI",
    group: "SOUTHEAST ASIAN",
    sample: "ꯏꯑ",
    chars: "ꯏꯑꯀꯔꯂꯋꯄꯅꯇꯊꯗꯕꯃꯐꯍꯘꯙꯖ``"
  }
];

// ── STATE ──
let currentLang = languages[0];
let invertMode = false;
let mirrorMode = true;

let video;
const BASE_W = 64;
const BASE_H = 48;
let vidw, vidh, scl;


function buildLangButtons() {
  const container = document.getElementById("langButtons");
  languages.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn" + (lang.id === currentLang.id ? " active" : "");
    btn.dataset.id = lang.id;
    btn.dataset.sample = lang.sample;
    btn.textContent = lang.label;
    btn.addEventListener("click", () => selectLanguage(lang.id));
    container.appendChild(btn);
  });
}

function selectLanguage(id) {
  currentLang = languages.find(l => l.id === id);
  document.querySelectorAll(".lang-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.id === id);
  });
  document.getElementById("currentLangDisplay").textContent =
    `${currentLang.group} · ${currentLang.label}`;
}


function setup() {
  buildLangButtons();

  
  const invertBtn = document.getElementById("invertToggle");
  invertBtn.addEventListener("click", () => {
    invertMode = !invertMode;
    invertBtn.textContent = invertMode ? "ON" : "OFF";
    invertBtn.classList.toggle("active", invertMode);
  });

  
  const mirrorBtn = document.getElementById("mirrorToggle");
  mirrorBtn.addEventListener("click", () => {
    mirrorMode = !mirrorMode;
    mirrorBtn.textContent = mirrorMode ? "ON" : "OFF";
    mirrorBtn.classList.toggle("active", mirrorMode);
  });

  
  const isMobile = window.innerWidth < 640;
  scl = isMobile ? 7 : 10;
  vidw = BASE_W;
  vidh = BASE_H;

  const cnv = createCanvas(vidw * scl, vidh * scl);
  cnv.parent("canvas-container");

  video = createCapture(VIDEO);
  video.size(vidw, vidh);
  video.hide();

  textFont("monospace");
}

function draw() {
  const bg = invertMode ? 255 : 0;
  const fg = invertMode ? 0 : 255;
  background(bg);

  video.loadPixels();
  if (video.pixels.length === 0) return;

  const chars = currentLang.chars;
  const cellW = width / vidw;
  const cellH = height / vidh;

  textSize(cellW * 1.05);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(fg);

  for (let i = 0; i < vidw; i++) {
    for (let j = 0; j < vidh; j++) {
      // mirror: flip x index
      const srcI = mirrorMode ? (vidw - 1 - i) : i;
      const pixelIndex = (srcI + j * vidw) * 4;

      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const bright = 0.299 * r + 0.587 * g + 0.114 * b;

      let mapped = invertMode
        ? map(bright, 0, 255, 0, chars.length - 1)
        : map(bright, 0, 255, chars.length - 1, 0);

      const tIndex = constrain(floor(mapped), 0, chars.length - 1);
      const t = chars.charAt(tIndex);

      const x = i * cellW + cellW / 2;
      const y = j * cellH + cellH / 2;

      text(t, x, y);
    }
  }
}

