// ==========================================================================
// 🛠️ UNIFIED SCRIPT - PLATFORM EDUKASI BELAJARAJA (FASE 6 - FASE 9)
// ==========================================================================

// --- 1. DEKLARASI ELEMEN UTAMA (DOM) ---
const authModal = document.getElementById('authModal');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModalBtn');
const formDaftar = document.getElementById('formDaftar');
const formMasuk = document.getElementById('formMasuk');
const tabDaftar = document.getElementById('tabDaftar');
const tabMasuk = document.getElementById('tabMasuk');
const modalGreeting = document.getElementById('modalGreeting');
const triggerButtons = document.querySelectorAll('nav a, section button');

const dashboardSiswa = document.getElementById('dashboardSiswa');
const mainNavbar = document.querySelector('nav');
const mainSections = document.querySelectorAll('section, footer');
const dashNamaAnak = document.getElementById('dashNamaAnak');
const dashKelasAnak = document.getElementById('dashKelasAnak');
const btnKeluar = document.getElementById('btnKeluar');

const areaKuis = document.getElementById('areaKuis');
const btnMulaiTantangan = document.getElementById('btnMulaiTantangan');
const btnKembaliKeDash = document.getElementById('btnKembaliKeDash');
const popupFeedback = document.getElementById('popupFeedback');
const iconFeedback = document.getElementById('iconFeedback');
const judulFeedback = document.getElementById('judulFeedback');
const pesanFeedback = document.getElementById('pesanFeedback');
const boxVideoPenjelasan = document.getElementById('boxVideoPenjelasan');
const btnLanjutSoal = document.getElementById('btnLanjutSoal');

// --- 2. STATE GAME (MEMORI GAME) ---
let totalKoinSekarang = parseInt(localStorage.getItem('belajaraja_koin')) || 120;
const kunciJawabanBenar = 22;

// --- 3. LOGIKA MODAL (DAFTAR / MASUK) ---
function openModal(mode = 'daftar') {
    authModal.classList.remove('hidden');
    setTimeout(() => {
        authModal.classList.remove('opacity-0');
        modalContainer.classList.remove('scale-95');
    }, 10);
    switchTab(mode);
}

function closeModal() {
    authModal.classList.add('opacity-0');
    modalContainer.classList.add('scale-95');
    setTimeout(() => {
        authModal.classList.add('hidden');
    }, 300);
}

function switchTab(mode) {
    if (mode === 'daftar') {
        formDaftar.classList.remove('hidden');
        formMasuk.classList.add('hidden');
        tabDaftar.className = "w-1/2 py-2.5 rounded-full text-center transition-all bg-[#2D6A4F] text-white";
        tabMasuk.className = "w-1/2 py-2.5 rounded-full text-center transition-all text-gray-500 hover:text-gray-800";
        modalGreeting.innerText = "Halo! Yuk gabung bareng Komo!";
    } else {
        formDaftar.classList.add('hidden');
        formMasuk.classList.remove('hidden');
        tabMasuk.className = "w-1/2 py-2.5 rounded-full text-center transition-all bg-[#457B9D] text-white";
        tabDaftar.className = "w-1/2 py-2.5 rounded-full text-center transition-all text-gray-500 hover:text-gray-800";
        modalGreeting.innerText = "Komo rindu kamu! Yuk masuk!";
    }
}

// Menghubungkan Tombol Klik di Halaman Utama agar Membuka Modal
triggerButtons.forEach(button => {
    if (button.innerText.includes('Masuk')) {
        button.addEventListener('click', (e) => { e.preventDefault(); openModal('masuk'); });
    } else if (button.innerText.includes('Mulai Petualangan')) {
        button.addEventListener('click', () => openModal('daftar'));
    }
});

closeModalBtn.addEventListener('click', closeModal);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });
tabDaftar.addEventListener('click', () => switchTab('daftar'));
tabMasuk.addEventListener('click', () => switchTab('masuk'));

// --- 4. LOGIKA PERPINDAHAN HALAMAN (TRANSMISI) ---
formDaftar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('regNama').value.trim();
    const usia = parseInt(document.getElementById('regUsia').value);
    const kelas = document.getElementById('regKelas').value;
    const email = document.getElementById('regEmail').value.trim();

    if (!nama || !usia || !email) {
        alert("Waduh! Semua kolom harus diisi dulu ya sayang! 🦎");
        return;
    }
    if (usia < 6 || usia > 12) {
        alert("Oops! BelajarAja dirancang khusus untuk adik-adik usia 6 sampai 12 tahun. 🙏");
        return;
    }
    
    dashNamaAnak.innerText = nama;
    dashKelasAnak.innerText = kelas;
    
    closeModal();
    masukDashboard();
});

function masukDashboard() {
    mainNavbar.classList.add('hidden');
    mainSections.forEach(sec => sec.classList.add('hidden'));
    dashboardSiswa.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDataUIGamifikasi();
}

btnKeluar.addEventListener('click', () => {
    if(confirm("Apakah kamu yakin mau keluar dari Pulau Belajar? 🦎")) {
        dashboardSiswa.classList.add('hidden');
        mainNavbar.classList.remove('hidden');
        mainSections.forEach(sec => sec.classList.remove('hidden'));
    }
});

// --- 5. LOGIKA SINKRONISASI GAMIFIKASI & LEVEL ---
function updateDataUIGamifikasi() {
    document.getElementById('dashKoin').innerText = totalKoinSekarang;
    const levelElement = document.getElementById('dashLevel');
    const badgeIcon = document.getElementById('badgeBatikIcon');
    const badgeTeks = document.getElementById('badgeBatikTeks');
    const badgeBox = document.getElementById('boxBadgeBatik');

    if (totalKoinSekarang >= 140) {
        levelElement.innerText = "Lvl 2: Sumatra 🫏";
        levelElement.parentElement.parentElement.className = "bg-blue-50 border-2 border-[#457B9D] px-5 py-2 rounded-2xl flex items-center space-x-2 shadow-sm animate-bounce";
    } else {
        levelElement.innerText = "Lvl 1: Jawa 🏝️";
        levelElement.parentElement.parentElement.className = "bg-blue-50 border-2 border-[#457B9D] px-5 py-2 rounded-2xl flex items-center space-x-2 shadow-sm";
    }

    if (totalKoinSekarang >= 140) {
        badgeIcon.classList.remove('grayscale', 'opacity-40');
        badgeIcon.innerText = "✨🪘✨";
        badgeTeks.innerText = "Batik Parang 🎉";
        badgeTeks.className = "text-[10px] font-black text-amber-600 mt-1";
        badgeBox.className = "p-2 bg-amber-50 rounded-xl border border-amber-300 scale-105";
    }
}

// --- 6. LOGIKA AREA KUIS INTERAKTIF ---
btnMulaiTantangan.addEventListener('click', () => {
    dashboardSiswa.classList.add('hidden');
    areaKuis.classList.remove('hidden');
});

btnKembaliKeDash.addEventListener('click', () => {
    areaKuis.classList.add('hidden');
    dashboardSiswa.classList.remove('hidden');
});

function cekJawaban(angkaDipilih) {
    popupFeedback.classList.remove('hidden');
    
    if (angkaDipilih === kunciJawabanBenar) {
        iconFeedback.innerText = "🎉";
        judulFeedback.innerText = "Hebat! Kamu Benar! 🌟";
        judulFeedback.className = "text-3xl font-black text-[#2D6A4F] mb-2";
        pesanFeedback.innerText = "Otan bangga banget! Kamu berhak mendapatkan +10 Koin Nusantara.";
        boxVideoPenjelasan.classList.add('hidden');
        
        totalKoinSekarang += 10;
        localStorage.setItem('belajaraja_koin', totalKoinSekarang);
        
        if (totalKoinSekarang === 140) {
            alert("SELAMAT! 🗺️ Kamu berhasil berlayar dan Naik ke Level 2: Pulau Sumatra & Membuka Lencana Batik Parang!");
        }
    } else {
        iconFeedback.innerText = "💪";
        judulFeedback.innerText = "Wah, Hampir Tepat!";
        judulFeedback.className = "text-3xl font-black text-[#E63946] mb-2";
        pesanFeedback.innerText = "Jangan sedih, salah itu wajar kok. Yuk, tonton penjelasan dari Otan di bawah ini biar makin paham!";
        boxVideoPenjelasan.classList.remove('hidden');
    }
}

btnLanjutSoal.addEventListener('click', () => {
    popupFeedback.classList.add('hidden');
    areaKuis.classList.add('hidden');
    dashboardSiswa.classList.remove('hidden');
    updateDataUIGamifikasi();
});

console.log("Sistem BelajarAja Terintegrasi Penuh!");