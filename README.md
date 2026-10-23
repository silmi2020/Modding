# Panduan Lengkap: Deploy Online Gratis ke Vercel (`.vercel.app`), Mastermind AI Agent Modder, & Reverse Engineer Anything Studio

Dokumen ini adalah pedoman resmi untuk:
1. **Mengubah Website Naruto Storm Modding Academy menjadi Online Gratis** dengan domain `*.vercel.app` yang siap di-import dari Git Repository (GitHub / GitLab / Bitbucket) atau di-deploy langsung dalam 1 menit.
2. **Menggunakan Fitur Mastermind AI Agent Modder** (Asisten AI yang menguasai seluruh 17 video tutorial modding YouTube, 126 Player IDs, struktur HxD `xfbin`, dan Opcode Storm 4 / Storm Connections).
3. **Menggunakan Fitur Reverse Engineer Anything (Bongkar Mod Orang Lain & Bangun Mod Lebih Bagus)** serta menyinkronkan wawasan baru ke otak Mastermind AI Agent.

---

## Bagian 1: Cara Deploy Website ke Domain Gratis Vercel (`*.vercel.app`)

Paket repository yang telah disiapkan di dalam **`naruto_storm_modding_academy_vercel_repo.zip`** sudah memenuhi standar proyek statis + serverless **Vercel** dengan struktur berikut:

```text
naruto-storm-modding-academy/
├── index.html          # Aplikasi Web Utama (Self-Contained, Semua Gambar & Database Terintegrasi)
├── vercel.json         # Konfigurasi Routing, Clean URLs, & Security Headers Vercel
├── package.json        # Metadata Proyek untuk Auto-Detection di Dashboard Vercel
├── .gitignore          # Konfigurasi Git standar
├── README.md           # Dokumentasi Repository GitHub
├── api/
│   └── mastermind.js   # (Opsional) Vercel Serverless Endpoint untuk AI Agent Modder
└── docs/               # 20 File Catatan Markdown (.MD) Lengkap (Tutorial 01 s.d. 17 + Blueprint)
```

### Cara A: Deploy via GitHub + Website Vercel.com (Paling Mudah & Gratis Selamanya)
1. **Ekstrak File ZIP**: Ekstrak `naruto_storm_modding_academy_vercel_repo.zip` ke sebuah folder di komputer Anda.
2. **Buat Repository Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new) lalu beri nama repository misalnya `naruto-storm-modding-academy`.
   - Upload seluruh isi folder (`index.html`, `vercel.json`, `package.json`, folder `api/`, dan `README.md`), atau jalankan perintah Git berikut di terminal folder tersebut:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Naruto Storm Modding Academy v4.0 + AI Agent + Reverse Engineer Studio"
     git branch -M main
     git remote add origin https://github.com/USERNAME_ANDA/naruto-storm-modding-academy.git
     git push -u origin main
     ```
3. **Import ke Vercel**:
   - Buka [vercel.com/new](https://vercel.com/new) dan login menggunakan akun **GitHub** Anda.
   - Klik tombol **Import** di samping repository `naruto-storm-modding-academy`.
   - Biarkan **Framework Preset** pada `Other` (karena `vercel.json` dan `index.html` sudah otomatis dikenali), lalu klik **Deploy**.
4. **Website Anda Langsung Online!**
   - Dalam ~15 detik, website Anda langsung aktif di domain gratis:
     `https://naruto-storm-modding-academy.vercel.app` (Anda juga bebas mengganti nama subdomain `.vercel.app` di menu **Settings -> Domains** pada dashboard Vercel).

### Cara B: Deploy Instan via Vercel CLI (Tanpa Perlu Buat Repo Manual)
Jika di komputer Anda sudah terpasang Node.js, cukup buka terminal di folder hasil ekstrak lalu jalankan:
```bash
npx vercel --prod
```
Ikuti petunjuk login di layar, dan Vercel akan langsung memberikan link URL online publik Anda!

---

## Bagian 2: Panduan Fitur 1 — Mastermind AI Agent Modder (`Tab 7`)

**Mastermind AI Agent Modder** dirancang khusus sebagai mentor dan asisten teknis modding *Naruto Shippuden: Ultimate Ninja Storm 4* & *Naruto X Boruto: Ultimate Ninja Storm Connections*.

### Kemampuan Utama AI Agent Modder:
1. **Menguasai Seluruh 17 Tutorial Modding YouTube (Basic Mind s.d. Pro Opcode)**:
   - **Medrej Storm (#01–#06)**: Cara kerja `PL_ANM_ATK`, membuka kunci gerakan raksasa (`Trigger Condition 1: 16 -> 0`), menambahkan cabang kombo ke-4 (`Side Combo`), mengubah Shuriken & proyektil (`0x00A5 + 0x00A6`), meminjam Grab lintas karakter dengan HxD (`1cmnbod1` & `1cmn00t0`), kombo udara (`ME_FLOATING_ON/OFF`), dan `xxxprm_spl` Ultimate Jutsu.
   - **Valant96 (#07–#08)**: Tiga jenis mod (Moveset, Texture, Roster), 3 alat wajib modder, dan anatomi 8 file `.xfbin` karakter.
   - **Kuroha Saenoki (#09–#10)**: Menambahkan Selectable Jutsu (`skillCustomizeParam.xfbin`, `PL_ANM_SKL02`, `PL_ANM_SKA02`) dan Awakening-Actions (`supportActionParam.xfbin`, `PL_ANM_SPT_ATK1/2`).
   - **SAZTHER (#11)**: Menyuntikkan teks kaligrafi nama Ultimate Jutsu ke kombo biasa menggunakan `45 = ME_SET_CAPTION`.
   - **Glas (#12–#17)**: Starter HxD + Toolbox, menyambung kombo ke bantingan Grab (`DAMAGE_ID_CMB_THROW` + `PL_ANM_ATK_THROW`), teleportasi serangan (`24 = ME_WARP_AROUND_ENEMY` Param 2 = `180`) & lenyap saat Dash (`DC = ME_DRAWOBJ_DISABLE` & `DD = ME_DRAWOBJ_ENABLE`), serta pertukaran Ultimate Jutsu langsung (`2kksspl2 -> 2ssyspl1` termasuk header `bod1` di offset `0x16B0`).
2. **Deteksi Otomatis 126 Player IDs di Dalam Pertanyaan**:
   - Cukup sebutkan nama karakter atau kodenya (misal: *"Gimana cara pindahin grab Sakura 2skr ke Hinata 2hnt?"* atau *"Cara bikin teleport Minato 2fou di Sasuke 7ssk?"*), maka AI Agent otomatis membaca kode tulang HxD (`2skr00t0`, `2hnt00t0`, dll.) dan menyusun langkah eksekusinya!
3. **Memori Dinamis dari Hasil Reverse Engineering (`Mastermind Memory Bank`)**:
   - Setiap kali Anda membongkar mod orang lain di **Tab 8 (Reverse Engineer Anything)** dan menekan tombol **Tambahkan Wawasan ke Mastermind AI**, pengetahuan dari mod tersebut langsung masuk ke memori AI Agent dan siap ditanyakan kapan saja!

---

## Bagian 3: Panduan Fitur 2 — Reverse Engineer Anything & Build Better Mod (`Tab 8`)

Fitur **Reverse Engineer Anything** memungkinkan Anda membongkar file mod buatan modder lain (`.xfbin`, `.bin.xfbin`, `.json`, atau `.py`) maupun memilih **5 Preset Mod Komunitas** untuk dibedah secara mendalam:

### 4 Tahap Kerja Reverse Engineer Anything:
1. **Pemindaian Biner & Struktur Chunk (`NUCC` Dissector)**:
   - Membaca header `NUCC` (`4E 55 43 43`), mengecek apakah file memakai tulang asli (`<id>00t0`) atau sudah di-retarget (`1cmnbod1` / `1cmn00t0`), mengekstrak seluruh daftar section `PL_ANM_ATK*`, `PL_ANM_SKL*`, `PL_ANM_SPSKILL*`, nama animasi (`cmb`, `skl`, `spl`, `supa`, `pur`), serta daftar proyektil & efek (`eff1`, `efb`, `skill`).
2. **Bongkar Konsep & Detail Kecil Modder Lain**:
   - Menyajikan laporan bahasa Indonesia yang menjelaskan **Konsep Utama Mod**, **Daftar Karakter Donor yang Dipinjam**, **Peta Urutan Kombo & Opcode**, serta **Rahasia Teknis** yang dipakai oleh pembuat mod tersebut.
3. **Audit Kelemahan / Bug pada Mod Asli**:
   - Mendeteksi celah atau kekurangan pada mod orang lain (seperti risiko *T-Pose* akibat lupa `1cmnbod1`, wajah penyok akibat lupa mematikan `Enable Face Animations`, kombo macet akibat `Press Start = -1`, atau *infinite loading* akibat kurangnya entri di `prm_load.bin.xfbin`).
4. **Synthesizer "Bangun Mod Serupa & Lebih Bagus" + Sync ke Mastermind AI**:
   - Pilih karakter target baru dari **126 Player IDs**, aktifkan **6 Modul Peningkatan Kualitas (Auto-Upgrade)**—mulai dari *Auto-Fix Universal Bone Retargeting*, *Injeksi Teleportasi Hiraishin 180°*, *Rantai Combo-to-Throw (`DAMAGE_ID_CMB_THROW`)*, *Teks Kaligrafi Ougi (`ME_SET_CAPTION`)*, hingga *Restorasi Cabang Side Combo Ke-4*—lalu unduh langsung:
     - **File Biner `.xfbin` Versi Lebih Bagus (`<id>prm_enhanced.bin.xfbin`)**
     - **File Konfigurasi NSC Toolbox (`.json`)**
     - **Script Python Patcher Otomatis (`.py`)**
   - Klik **"🧠 Tambahkan Wawasan ke Mastermind AI Agent"** agar seluruh konsep dan hasil upgrade mod tersebut tersimpan permanen di otak AI Agent!
