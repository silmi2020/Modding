# [NSUNSC Mod Tutorial] Changing Ultimate Jutsu — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] Changing Ultimate Jutsu](https://www.youtube.com/watch?v=DgEzO1SHwKk)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=DgEzO1SHwKk)
* **Durasi & Tanggal Rilis**: `06:11` | 22 September 2025
* **Tool yang Dipakai di Video**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character File Loader Editor` & `Character Moveset Editor`)
* **Contoh Karakter di Video**: Mengganti Ultimate Jutsu Naruto Kecil (`1nrt`) menggunakan Ultimate Jutsu milik Naruto Shippuden (`3nrt` → `3nrtspl1_00`)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Video ini menjelaskan cara mengganti **Ultimate Jutsu (*Secret Technique / Ougi*)** atau sekuens jurus sinematik karakter:

1. **Letak Tabel Ultimate Jutsu Berbeda dari Kombo Biasa**:
   * Jika Kombo Darat, Air Combo, Grab, dan Shuriken semuanya berada di dalam **`xxxprm_mot`**, maka seluruh state dan proyektil Ultimate Jutsu disimpan di dalam sub-chunk ke-4 yaitu **`xxxprm_spl`**!
   * Di dalam `xxxprm_spl` (seperti yang terekam jelas pada jendela editor proyek `1nrtprm_spl`), terdapat kotak pemilih **`Ultimate Jutsu [ 1 ]`** (untuk memilih slot Ultimate Jutsu ke-1, ke-2, dst.).
2. **Tujuh Tahapan State Ultimate Jutsu (`PL_ANM_SPSKILL1_*`)**:
   Satu jurus Ultimate Jutsu dikendalikan oleh **7 section `PL_ANM`** yang bekerja secara berurutan:
   1. **`PL_ANM_SPSKILL1_CUTIN_NC`**: Adegan Cut-in pembuka tanpa kamera khusus.
   2. **`PL_ANM_SPSKILL1_CUTIN`**: Adegan Cut-in close-up wajah karakter saat mengaktifkan chakra Ultimate Jutsu.
   3. **`PL_ANM_SPSKILL1_START`**: Gerakan menerjang maju atau menembakkan proyektil pembuka Ultimate Jutsu untuk mengenai lawan.
   4. **`PL_ANM_SPSKILL1_HIT`**: Gerakan transisi tepat ketika serangan pembuka berhasil mengenai lawan.
   5. **`PL_ANM_SPSKILL1_DEMO_DMG`**: Adegan sinematik utama (video cutscene real-time) saat lawan dihantam oleh jurus puncak!
   6. **`PL_ANM_SPSKILL1_DEMO_ATK_END`**: Gerakan penutup karakter penyerang setelah ledakan Ultimate Jutsu selesai.
   7. **`PL_ANM_SPSKILL1_TEAM_WAIT`**: Gerakan menunggu saat melakukan *Team Ultimate Jutsu*.
3. **Daftar `Projectile List` Khusus Ultimate Jutsu**:
   Di dalam `xxxprm_spl`, terdapat tab **`Projectile List`** tersendiri yang mengatur:
   * Proyektil serangan pembuka Ultimate Jutsu (contoh: **`COMBO11`** → `Skill Entry Name = 3nrtspl1_00`).
   * Efek pijakan tanah/air/salju saat Cut-in (`SPSKILL_CUTIN_EFF_SOIL`, `SPSKILL_CUTIN_EFF_WATER`, `SPSKILL_CUTIN_EFF_SNOW`).
   * Efek kilatan mata saat Cut-in (`SPSKILL_EYE00` → `2nrt_skn_e_eye00`).
4. **Pendaftaran di `xxxprm_load.bin.xfbin` (`spcload`)**:
   File animasi dan efek Ultimate Jutsu (`spc/xxxspl1.xfbin`, `effect/xxxeff_spl1.xfbin`, `skill/xxxspl1_a.xfbin`) didaftarkan di **Character File Loader Editor** dengan mencentang **`Load Condition = [x] Ultimate Jutsu 1`** (dan `[x] Base` bila ingin selalu dimuat di RAM).

## 2. Perbedaan Struktur `prm_spl` / `prm_skl` di *Storm Connections* vs *Storm 4*

Saat Anda membuka file karakter *Storm 4* (seperti `7sskprm.bin.xfbin`) di **Character Moveset Editor**, penting untuk mengetahui struktur sub-chunk sinematiknya:
* Di *Storm 4*, **`Chunk #06`** di dalam `7sskprm.bin.xfbin` berisi **66 section sinematik** yang menggabungkan:
  * Sekuens Ninjutsu 1 s.d. 6 (`PL_ANM_SKL01_*` sampai `PL_ANM_SKL06_*`, termasuk adegan sinematik *Chidori / Kagutsuchi / Kusanagi Rush* seperti `PL_ANM_SKL02_DEMO_ATK_1` dan `PL_ANM_SKL05_DEMO_ATK_2`).
  * Sekuens Ultimate Jutsu (`PL_ANM_SPSKILL*`).

## 3. Penjelasan Bahasa Mudah: Bagaimana Cara Memperkuat Ninjutsu & Ultimate Jutsu Tanpa Merusak Kamera Cutscene?

Mengganti keseluruhan cutscene Ultimate Jutsu lintas karakter berbeda sering kali berisiko membuat kamera atau tulang karakter miring apabila struktur tulangnya tidak identik. Namun, ada **2 cara yang sangat aman dan mudah dieksekusi** untuk memodifikasi Ninjutsu dan Ultimate Jutsu:

### Cara 1 — Menyuntikkan Proyektil & Ledakan Baru ke Dalam Ninjutsu / Ultimate Jutsu (100% Aman & Sangat Keren!)
Seperti yang kita lakukan pada `7ssk` di Mod Boruto TBV v2.0:
1. Buka sub-chunk `prm_skl` / `prm_spl` (atau section `PL_ANM_ATK_SKILL0_c1` dan `PL_ANM_SKL01_ACT_1` / `PL_ANM_SKL02_DEMO_ATK_1`).
2. Di dalam **`Function List`**-nya, tambahkan pasangan fungsi pemanggil proyektil *Storm 4* (`0x00A5` + `0x00A6`) pada frame saat karakter menebas atau menghantam musuh:
   * Panggil **`COMBO3`** (`2foueff1_e_shine00` — kilatan teleportasi *Flying Thunder God* Minato) pada `Timing = 1`.
   * Panggil **`NINJUTSU_BULLET_EX`** (`4efb_7brt1_e_begin00` — *Vanishing Rasengan* Boruto) pada `Timing = 14`.
   * Panggil **`NINJUTSU_BULLET_TYPE_2`** (`3efb_4ssi1_e_blt00` — gelombang tebasan *Halo Dance* Shisui) pada `Timing = 15`.
   * Panggil **`COMBO4`** (`7brteff1_cmb06_e_worldhit00` — ledakan penuh *Rasengan: Uzuhiko*) pada frame benturan akhir!
3. Hasilnya: Kamera sinematik dan suara karakter tetap rapi 100%, tetapi jurus yang keluar memiliki efek berlapis ala Boruto *Two Blue Vortex*!

### Cara 2 — Meminjam Gerakan Sinematik dari `prm_skl` / `prm_spl` untuk Dipakai di Kombo Biasa atau Grab!
Di dalam sub-chunk `prm_skl` (`Chunk #06`), tersimpan banyak sekali gerakan sinematik yang secara normal tidak pernah terlihat di kombo biasa (contohnya pada `7ssk`: `7sskskl1_s`, `7sskskl5_n1`, `7sskskl5_n2`, dan `7sskskl5_atk2`).
1. Buka `7sskprm_load.bin.xfbin` di **Character File Loader Editor**, lalu pada baris `7sskskl1` sampai `7sskskl6` (`Type = 5`), pastikan kotak **`[x] Base`** dicentang!
2. Sekarang di tab `Moveset Settings` (`7sskprm_mot`), Anda bebas mengetik nama animasi `7sskskl1_s`, `7sskskl5_n1`, `7sskskl5_n2`, atau `7sskskl5_atk2` pada field **`Animation`** di kombo darat, *Side Combo*, *Down Combo*, maupun **Grab**, cukup dengan mengatur **`File Type = 5`**!

## 4. Checklist Eksekusi Manual untuk Ultimate Jutsu & Ninjutsu
1. **[ ] Cek `Load Condition` di `spcload`**: Pastikan semua file `spl1`, `skl1..6`, `eff1`, dan `skill` yang dipakai sudah dicentang pada **`[x] Base`** dan **`[x] Ultimate Jutsu 1`** di `xxxprm_load.bin.xfbin`.
2. **[ ] Cek `Projectile List`**: Pastikan setiap slot proyektil (`COMBO1..15`, `NINJUTSU_BULLET*`, `SPSKILL_CUTIN_EFF_*`) memiliki `Skill File Name` dan `Skill Entry Name` yang sudah terdaftar di `spcload`.
3. **[ ] Simpan Berjenjang**: Selalu klik **`Save`** (panel kanan) → **`Save PL_ANM Settings`** (panel tengah) → **`File -> Save`** (menu kiri atas).
