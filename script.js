// ==========================================================================
// 🚀 MASTER SCRIPT TERINTEGRASI - BELAJARAJA (PONDASI + ADAPTIF PAUD + ORANG TUA)
// ==========================================================================

// --- 1. SELEKTOR ELEMEN UTAMA (DOM) ---
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

// Tambahan Selektor Fase 11 (Menu Orang Tua)
const dashboardOrangTua = document.getElementById('dashboardOrangTua');
const btnKeRuangOrtu = document.getElementById('btnKeRuangOrtu');
const btnKembaliKeAnak = document.getElementById('btnKembaliKeAnak');

// --- 2. STATE GAME (MEMORI DIGITAL) ---
let totalKoinSekarang = parseInt(localStorage.getItem('belajaraja_koin')) || 120;
let kelasAnakAktif = "2"; 
let kunciJawabanBenar = 22;
let mapelAktifSaatIni = "matematika";
let indeksSoalSekarang = 0;
let soalAktifSaatIni = [];

// --- 3. DATABASE MASTER SOAL ADAPTIF (SD & ADAPTASI PAUD) ---
const masterDatabaseSoal = {
    matematika: {
        maskotNama: "Otan", maskotEmoji: "🦧", bgWarna: "bg-orange-50", borderWarna: "border-orange-200", teksWarna: "text-orange-800", badgeLabel: "Misi: Logika Angka & Ukuran 🌟",
        Preschool: [
            { soal: `<span class="text-2xl block mb-2">Mari Berhitung! Ada berapa buah jeruk manis di bawah?</span> 🍊 🍊 🍊`, opsi: [2, 3, 4, 1], kunci: 3, tips: "Yuk hitung bareng Otan! Satu... dua... tiga buah jeruk segar! 🍊" },
            { soal: `<span class="text-2xl block mb-2">Membandingkan Ukuran: Mana hewan yang ukurannya <b>PALING BESAR</b>?</span>`, opsi: ["Semut 🐜", "Kelinci 🐇", "Gajah 🐘"], kunci: "Gajah 🐘", tips: "Wah, gajah adalah hewan yang bertubuh paling besar! 🐘" }
        ],
        SD: [
            { soal: "15 + 7 = ...", opsi: [22, 20, 25, 18], kunci: 22, tips: "Simpan 15 di mulut, buka 7 di jari. Hitung maju: 16, 17, 18... 22! 🧠" },
            { soal: "12 + 9 = ...", opsi: [20, 21, 23, 19], kunci: 21, tips: "12 ditambah 9 menghasilkan angka 21. Semangat! 📝" }
        ]
    },
    bahasa: {
        maskotNama: "Dewi", maskotEmoji: "🦜", bgWarna: "bg-yellow-50", borderWarna: "border-yellow-200", teksWarna: "text-amber-800", badgeLabel: "Misi: Pola Warna & Tubuh 📖",
        Preschool: [
            { soal: `<span class="text-2xl block mb-2">Selesaikan Polanya: <br><b class="text-3xl">🔴 — 🟡 — 🔴 — 🟡 — [ ? ]</b></span>`, opsi: ["🔴 Merah", "🟡 Kuning", "🟢 Hijau"], kunci: "🔴 Merah", tips: "Polanya selang-seling: merah, kuning, merah, kuning, selanjutnya merah! 🔴" },
            { soal: `<span class="text-2xl block mb-2">Bagian tubuh mana yang kita gunakan untuk <b>MENDENGAR</b> cerita Dewi?</span>`, opsi: ["Mata 👁️", "Hidung 👃", "Telinga 👂"], kunci: "Telinga 👂", tips: "Kita mendengarkan suara dongeng menggunakan telinga! 👂" }
        ],
        SD: [
            { soal: "Lengkapi peribahasa: Berakit-rakit ke hulu, berenang-renang ke ...", opsi: ["Sini", "Tepian", "Laut", "Danau"], kunci: "Tepian", tips: "Peribahasa lengkapnya adalah berenang-renang ke tepian! 🏊" }
        ]
    },
    sains: {
        maskotNama: "Gaja", maskotEmoji: "🐘", bgWarna: "bg-blue-50", borderWarna: "border-blue-200", teksWarna: "text-blue-800", badgeLabel: "Misi: Detektif Arah & Alam 🧪",
        Preschool: [
            { soal: `<span class="text-2xl block mb-2">Menemukan Arah Sama: Mana roket yang menghadap ke <b>KANAN</b>?</span>`, opsi: ["⬅️ Kiri", "➡️ Kanan", "⬆️ Atas"], kunci: "➡️ Kanan", tips: "Panah ➡️ menunjukkan arah kanan! ➡️" },
            { soal: `<span class="text-2xl block mb-2">Makanan Binatang: Makanan kesukaan si monyet lucu apa ya?</span>`, opsi: ["Rumput 🌿", "Pisang 🍌", "Daging 🥩"], kunci: "Pisang 🍌", tips: "Monyet sangat suka makan buah pisang yang manis! 🍌" }
        ],
        SD: [
            { soal: "Makhluk hidup yang dapat membuat makanannya sendiri melalui fotosintesis adalah...", opsi: ["Hewan", "Tumbuhan", "Jamur", "Manusia"], kunci: "Tumbuhan", tips: "Tumbuhan hijau memasak makanannya sendiri dibantu sinar matahari! 🌿" }
        ]
    }
};

// --- 4. LOGIKA GATEWAY & MODAL ---
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
    setTimeout(() => { authModal.classList.add('hidden'); }, 300);
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

// --- 5. LOGIKA NAVIGASI DASHBOARD SISWA ---
formDaftar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('regNama').value.trim();
    const usia = parseInt(document.getElementById('regUsia').value);
    const kelas = document.getElementById('regKelas').value;
    const email = document.getElementById('regEmail').value.trim();

    if (!nama || !usia || !email) {
        alert("Waduh! Semua kolom harus diisi dulu ya! 🦎");
        return;
    }
    if (usia < 3 || usia > 12) {
        alert("Oops! BelajarAja dirancang khusus untuk usia 3 sampai 12 tahun. 🙏");
        return;
    }
    
    kelasAnakAktif = kelas;
    dashNamaAnak.innerText = nama;
    dashKelasAnak.innerText = kelas === "Preschool" || kelas === "TK" ? kelas : kelas + " SD";
    
    closeModal();
    masukDashboard();
});

function masukDashboard() {
    mainNavbar.classList.add('hidden');
    mainSections.forEach(sec => sec.classList.add('hidden'));
    dashboardOrangTua.classList.add('hidden'); // Amankan penutupan ruang ortu
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

// --- 6. LOGIKA GAMIFIKASI ---
function updateDataUIGamifikasi() {
    document.getElementById('dashKoin').innerText = totalKoinSekarang;
    const levelElement = document.getElementById('dashLevel');
    const badgeIcon = document.getElementById('badgeBatikIcon');
    const badgeTeks = document.getElementById('badgeBatikTeks');
    const badgeBox = document.getElementById('boxBadgeBatik');

    if (totalKoinSekarang >= 140) {
    levelElement.innerText = "Lvl 2: Sumatra 🫏";
    levelElement.parentElement.parentElement.className = "bg-blue-50 border-2 border-[#457B9D] px-5 py-2 rounded-2xl flex items-center space-x-2 shadow-sm";
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

// --- 7. LOGIKA KUIS MULTI-MAPEL & ENGINE GAME LOOP ---
function mulaiKuisSpesifik(namaMapel) {
    mapelAktifSaatIni = namaMapel;
    indeksSoalSekarang = 0;
    dashboardSiswa.classList.add('hidden');
    areaKuis.classList.remove('hidden');
    muatSoalSesuaiKelas();
}

btnMulaiTantangan.addEventListener('click', () => { mulaiKuisSpesifik('matematika'); });
btnKembaliKeDash.addEventListener('click', () => { areaKuis.classList.add('hidden'); dashboardSiswa.classList.remove('hidden'); });

function muatSoalSesuaiKelas() {
    const teksSoal = document.getElementById('teksSoal');
    const kontainerPilihan = document.getElementById('kontainerPilihan');
    const paketMapel = masterDatabaseSoal[mapelAktifSaatIni];
    
    const maskotBox = document.querySelector('#areaKuis .grid > div:first-child');
    maskotBox.className = `${paketMapel.bgWarna} p-6 rounded-3xl border-2 ${paketMapel.borderWarna} text-center relative`;
    maskotBox.innerHTML = `
        <div class="text-8xl mb-2 animate-bounce" style="animation-duration: 3s;">${paketMapel.maskotEmoji}</div>
        <h4 class="font-black ${paketMapel.teksWarna} text-lg">${paketMapel.maskotNama}</h4>
        <p class="text-xs ${paketMapel.teksWarna} font-bold bg-white px-3 py-1 rounded-full inline-block mt-1 shadow-sm">"Semangat ya!"</p>
    `;

    document.querySelector('#areaKuis .bg-emerald-50').innerText = paketMapel.badgeLabel;
    const kategoriUsia = (kelasAnakAktif === "Preschool" || kelasAnakAktif === "TK") ? "Preschool" : "SD";
    soalAktifSaatIni = paketMapel[kategoriUsia];
    
    const dataSoal = soalAktifSaatIni[indeksSoalSekarang];
    teksSoal.innerHTML = dataSoal.soal;
    kunciJawabanBenar = dataSoal.kunci;
    kontainerPilihan.innerHTML = "";

    dataSoal.opsi.forEach(opsi => {
        const parameterKlik = typeof opsi === "string" ? `'${opsi}'` : opsi;
        kontainerPilihan.innerHTML += `
            <button class="opsi-jawaban bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-[#2D6A4F] text-xl font-black p-4 rounded-2xl shadow-sm transition-all text-gray-700" onclick="cekJawaban(${parameterKlik})">
                ${opsi}
            </button>
        `;
    });
}

function cekJawaban(opsiDipilih) {
    popupFeedback.classList.remove('hidden');
    const paketMapel = masterDatabaseSoal[mapelAktifSaatIni];
    const dataSoal = soalAktifSaatIni[indeksSoalSekarang];
    
    if (opsiDipilih === kunciJawabanBenar) {
        iconFeedback.innerText = "🎉";
        judulFeedback.innerText = "Luar Biasa, Tepat! 🌟";
        judulFeedback.className = "text-3xl font-black text-[#2D6A4F] mb-2";
        pesanFeedback.innerText = `Kamu berhasil membantu ${paketMapel.maskotNama} meraih +10 Koin!`;
        boxVideoPenjelasan.classList.add('hidden');
        
        totalKoinSekarang += 10;
        localStorage.setItem('belajaraja_koin', totalKoinSekarang);
        
        if (totalKoinSekarang === 140) {
            alert("SELAMAT! 🗺️ Kamu Naik ke Level 2: Pulau Sumatra & Membuka Lencana Batik Parang!");
        }
    } else {
        iconFeedback.innerText = "💪";
        judulFeedback.innerText = "Ayo Coba Lagi!";
        judulFeedback.className = "text-3xl font-black text-[#E63946] mb-2";
        pesanFeedback.innerText = dataSoal.tips;
        boxVideoPenjelasan.classList.remove('hidden');
    }
}

btnLanjutSoal.addEventListener('click', () => {
    popupFeedback.classList.add('hidden');
    indeksSoalSekarang++;

    if (indeksSoalSekarang < soalAktifSaatIni.length) {
        muatSoalSesuaiKelas();
    } else {
        alert("Hebat! Seluruh Misi petualangan hari ini sudah tuntas! 🏆");
        areaKuis.classList.add('hidden');
        dashboardSiswa.classList.remove('hidden');
        updateDataUIGamifikasi();
    }
});

// --- 8. LOGIKA MENU ORANG TUA (FASE 11 FIX) ---
if (btnKeRuangOrtu) {
    btnKeRuangOrtu.addEventListener('click', () => {
        dashboardSiswa.classList.add('hidden');
        dashboardOrangTua.classList.remove('hidden');
        
        // Kirim data ter-update ke dashboard orang tua
        document.getElementById('ortuKoinAnak').innerText = totalKoinSekarang;
        document.getElementById('ortuLevelAnak').innerText = document.getElementById('dashLevel').innerText;
    });
}

if (btnKembaliKeAnak) {
    btnKembaliKeAnak.addEventListener('click', () => {
        dashboardOrangTua.classList.add('hidden');
        dashboardSiswa.classList.remove('hidden');
    });
}

console.log("Sistem BelajarAja Sinkron 100%!");

// ================= LOGIKA TOKO HADIAH & TRANSAKSI (FASE 12) =================

// Fungsi untuk menangani pembelian item dekorasi pulau
function beliItemPulau(namaItem, harga) {
    // Ambil daftar barang yang sudah pernah dibeli dari localStorage
    let barangDimiliki = JSON.parse(localStorage.getItem('belajaraja_barang')) || [];

    // Cek apakah barang ini sudah pernah dibeli sebelumnya
    if (barangDimiliki.includes(namaItem)) {
        alert(`Keren! Barangkali kamu lupa, ${namaItem} ini sudah menjadi milikmu di pulau! 🏝️✨`);
        return;
    }

    // Cek apakah jumlah koin anak cukup untuk membeli
    if (totalKoinSekarang >= harga) {
        // Kurangi koin sesuai harga barang
        totalKoinSekarang -= harga;
        
        // Masukkan nama barang baru ke dalam daftar kepemilikan
        barangDimiliki.push(namaItem);
        
        // Simpan data koin baru dan daftar barang baru ke localStorage browser
        localStorage.setItem('belajaraja_koin', totalKoinSekarang);
        localStorage.setItem('belajaraja_barang', JSON.stringify(barangDimiliki));
        
        // Berikan kejutan selamat kepada anak
        alert(`Hore! Berhasil Membeli ${namaItem}! 🥳 Hadiahmu sudah dikirim langsung ke dermaga pulau.`);
        
        // Perbarui seluruh tampilan dashboard koin dan status tombol toko
        updateDataUIGamifikasi();
        perbaruiTampilanTombolToko();
    } else {
        // Berikan pesan motivasi jika koin tidak mencukupi
        const sisaKekurangan = harga - totalKoinSekarang;
        alert(`Waduh, Koin Nusantara kamu kurang ${sisaKekurangan} koin lagi nih. 💪 Yuk, selesaikan misi kuis lagi bersama Otan atau Dewi untuk mengumpulkan koin!`);
    }
}

// Fungsi otomatis untuk merubah teks tombol menjadi "Milikmu" jika sudah dibeli
function perbaruiTampilanTombolToko() {
    const barangDimiliki = JSON.parse(localStorage.getItem('belajaraja_barang')) || [];
    
    if (barangDimiliki.includes('Phinisi')) {
        const btnPhinisi = document.getElementById('btnBeliPhinisi');
        if (btnPhinisi) {
            btnPhinisi.innerText = "Milikmu ✨";
            btnPhinisi.className = "bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-xl cursor-default border border-amber-200";
            btnPhinisi.disabled = true;
        }
    }
    
    if (barangDimiliki.includes('Gadang')) {
        const btnGadang = document.getElementById('btnBeliGadang');
        if (btnGadang) {
            btnGadang.innerText = "Milikmu ✨";
            btnGadang.className = "bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-xl cursor-default border border-amber-200";
            btnGadang.disabled = true;
        }
    }
}

// override fungsi masukDashboard agar status toko langsung di-refresh saat login
const fungsiMasukDashboardTokoLama = masukDashboard;
masukDashboard = function() {
    fungsiMasukDashboardTokoLama();
    perbaruiTampilanTombolToko();
};