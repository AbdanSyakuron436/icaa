// =========================================================
// SCRIPT.JS — ISI FOTO, LAGU, DAN TEKS ALBUM DI BAGIAN INI
// File HTML dan CSS tidak perlu diubah untuk mengganti konten.
// =========================================================

// 1. TEKS SAMPUL: ganti tulisan di antara tanda kutip.
const ALBUM_CONTENT = {
  coverKicker: "A SPECIAL LITTLE GIFT",
  coverTitle: "For You",
  coverSubtitle: "for someone who makes life sweeter ♡",

  // 2. LAGU: taruh file lagu di folder assets, lalu tulis path-nya.
  // Contoh: "assets/lagu-kita.mp3"
  music: "lagu.mp3",

  // 3. ISI EMPAT HALAMAN. Setiap halaman berisi empat foto.
  // Ganti src dengan lokasi file fotomu dan caption dengan teks sendiri.
  // Foto kosong sengaja akan diisi dekor pink lucu otomatis.
  pages: [
    {
      title: "Sweet Pics ♡",
      subtitle: "",
      decoration: "♡ ୨୧ ✿ ୨୧ ♡",
      photos: [
        { src: "https://files.catbox.moe/oxh1wu.jpeg", caption: "" },
        { src: "https://files.catbox.moe/5kjl5u.jpeg", caption: "" },
        { src: "https://files.catbox.moe/2fi7mz.jpeg", caption: "" },
        { src: "https://files.catbox.moe/r81jb5.jpeg", caption: "" }
      ]
    },
    {
      title: "Cute Pics 🌷",
      subtitle: "",
      decoration: "🌷 ✧ 🧸 ✧ 🌷",
      photos: [
        { src: "https://files.catbox.moe/zco73o.jpeg", caption: "" },
        { src: "https://files.catbox.moe/rqv8pp.jpeg", caption: "" },
        { src: "https://files.catbox.moe/znepp5.jpeg", caption: "" },
        { src: "https://files.catbox.moe/lnh2d1.jpeg", caption: "" }
      ]
    },
    {
      title: "Forever in My Heart 🎀",
      subtitle: "",
      decoration: "🍓 ♡ 🦋 ♡ 🍓",
      photos: [
        { src: "https://files.catbox.moe/3ka9k6.jpeg", caption: "" },
        { src: "https://files.catbox.moe/5zzgmd.jpeg", caption: "" },
        { src: "https://files.catbox.moe/gl0adu.jpeg", caption: "" },
        { src: "https://files.catbox.moe/d25fdm.jpeg", caption: "" }
      ]
    },
    {
      title: "Beautiful Pics 💗",
      subtitle: "",
      decoration: "💌 🎀 🌸 🎀 💌",
      photos: [
        { src: "https://files.catbox.moe/9gs7r6.jpeg", caption: "" },
        { src: "https://files.catbox.moe/oizzvx.jpeg", caption: "" },
        { src: "https://files.catbox.moe/zl6lag.jpeg", caption: "" },
        { src: "https://files.catbox.moe/a7tkfw.jpeg", caption: "" }
      ]
    }
  ]
};

// Dekor fallback untuk slot foto tanpa gambar.
const EMPTY_DECOR = [
  { emoji: "🎀", text: "a little bow of happiness" },
  { emoji: "🌷", text: "blooming little memories" },
  { emoji: "🧸", text: "sending you a tiny hug" },
  { emoji: "🍓", text: "sweet like strawberry milk" },
  { emoji: "💗", text: "made of little love" },
  { emoji: "🦋", text: "let your heart flutter" },
  { emoji: "☁️", text: "a soft and dreamy day" },
  { emoji: "🌸", text: "petals and pretty things" },
  { emoji: "🐰", text: "a bunny says hello" },
  { emoji: "✨", text: "you make things sparkle" },
  { emoji: "💌", text: "a tiny note for you" },
  { emoji: "🍰", text: "one sweet little moment" },
  { emoji: "🩰", text: "dancing through memories" },
  { emoji: "⭐", text: "you are my little star" },
  { emoji: "🩷", text: "wrapped in pink love" },
  { emoji: "🌼", text: "keep growing, little flower" }
];

(() => {
  const $ = (id) => document.getElementById(id);
  const cover = $("cover");
  const book = $("book");
  const pageContent = $("pageContent");
  const audio = $("albumAudio");

  let currentPage = 0;
  let isAnimating = false;

  // Set teks dari konfigurasi di atas ke sampul.
  $("coverKicker").textContent = ALBUM_CONTENT.coverKicker;
  $("coverTitle").textContent = ALBUM_CONTENT.coverTitle;
  $("coverSubtitle").textContent = ALBUM_CONTENT.coverSubtitle;

  // Atur audio dari file lokal. Browser dapat menolak autoplay pada kondisi tertentu.
  if (ALBUM_CONTENT.music) {
    audio.src = ALBUM_CONTENT.music;
    audio.loop = false; // lagu berhenti jika selesai; juga dihentikan saat album ditutup
  }

  function makePhotoCard(photo, pageIndex, photoIndex) {
    const card = document.createElement("article");
    card.className = "photo-card";

    const frame = document.createElement("div");
    frame.className = "photo-frame";

    const placeholderData = EMPTY_DECOR[(pageIndex * 4 + photoIndex) % EMPTY_DECOR.length];
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";

    const emoji = document.createElement("span");
    emoji.className = "placeholder-main";
    emoji.textContent = placeholderData.emoji;

    const words = document.createElement("span");
    words.className = "placeholder-small";
    words.textContent = placeholderData.text;

    placeholder.append(emoji, words);

    if (photo.src && photo.src.trim()) {
      const img = document.createElement("img");
      img.alt = photo.caption || `Foto ${photoIndex + 1}`;
      img.loading = "lazy";
      img.src = photo.src;
      img.addEventListener("load", () => frame.classList.add("has-photo"));
      img.addEventListener("error", () => {
        // Jika path foto salah/tidak ditemukan, dekor imut tetap ditampilkan.
        img.remove();
        frame.classList.remove("has-photo");
      });
      frame.append(img);
    }

    frame.append(placeholder);

    const caption = document.createElement("p");
    caption.className = "photo-caption";
    caption.textContent = photo.caption || "";

    card.append(frame, caption);
    return card;
  }

  function renderPage(direction = "next") {
    const pageData = ALBUM_CONTENT.pages[currentPage];
    $("pageNumber").textContent = `PAGE ${String(currentPage + 1).padStart(2, "0")} / ${String(ALBUM_CONTENT.pages.length).padStart(2, "0")}`;
    $("pageTitle").textContent = pageData.title || `Little Memory ${currentPage + 1}`;
    $("pageSubtitle").textContent = pageData.subtitle || "a little page full of sweetness ♡";
    $("pageDecor").textContent = pageData.decoration || "♡ ✿ 🎀 ✿ ♡";

    const grid = $("photoGrid");
    grid.replaceChildren();

    // Pastikan setiap halaman punya empat slot. Slot yang kosong otomatis berisi dekor.
    for (let index = 0; index < 4; index++) {
      const photo = (pageData.photos && pageData.photos[index]) || { src: "", caption: "" };
      grid.append(makePhotoCard(photo, currentPage, index));
    }

    $("prevBtn").disabled = currentPage === 0;
    $("nextBtn").textContent = currentPage === ALBUM_CONTENT.pages.length - 1 ? "Close & replay ♡" : "Next page ♡";

    const dotText = ALBUM_CONTENT.pages.map((_, index) => index === currentPage ? "●" : "○").join(" ");
    $("pageDots").textContent = dotText;
    $("pageDots").setAttribute("aria-label", `Halaman ${currentPage + 1} dari ${ALBUM_CONTENT.pages.length}`);

    pageContent.classList.remove("page-turn-next", "page-turn-prev");
    // Memicu ulang animasi saat halaman berganti.
    void pageContent.offsetWidth;
    pageContent.classList.add(direction === "prev" ? "page-turn-prev" : "page-turn-next");
  }

  async function playMusic() {
    if (!ALBUM_CONTENT.music) {
      $("musicStatus").textContent = "♫ Tambahkan path lagu di ALBUM_CONTENT.music pada script.js ♫";
      return;
    }
    try {
      audio.currentTime = 0;
      await audio.play();
      $("musicStatus").textContent = "";
    } catch (error) {
      $("musicStatus").textContent = "";
    }
  }

  function stopMusic() {
    audio.pause();
    try { audio.currentTime = 0; } catch (_) {}
  }

  function openAlbum() {
    currentPage = 0;
    cover.hidden = true;
    book.hidden = false;
    book.classList.remove("closing", "opening");
    void book.offsetWidth;
    book.classList.add("opening");
    renderPage("next");
    playMusic();
  }

  function closeAlbum() {
    stopMusic();
    book.classList.remove("opening");
    book.classList.add("closing");
    isAnimating = true;
    window.setTimeout(() => {
      book.hidden = true;
      book.classList.remove("closing");
      cover.hidden = false;
      currentPage = 0;
      isAnimating = false;
    }, 320);
  }

  function changePage(direction) {
    if (isAnimating) return;

    if (direction === "next") {
      if (currentPage >= ALBUM_CONTENT.pages.length - 1) {
        closeAlbum();
        return;
      }
      currentPage++;
    } else {
      if (currentPage <= 0) return;
      currentPage--;
    }

    renderPage(direction);
  }

  $("openBtn").addEventListener("click", openAlbum);
  $("closeBtn").addEventListener("click", closeAlbum);
  $("nextBtn").addEventListener("click", () => changePage("next"));
  $("prevBtn").addEventListener("click", () => changePage("prev"));

  audio.addEventListener("ended", () => {
    $("musicStatus").textContent = "♫ lagu selesai — nikmati kenangannya ♡";
  });
})();
