# [NSUNSC Mod Tutorial] Changing Grab (Beserta Tutorial HxD Lintas Karakter) — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] Changing Grab](https://www.youtube.com/watch?v=K_DrvEl2XBE)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=K_DrvEl2XBE)
* **Durasi & Tanggal Rilis**: `04:33` | 21 September 2025
* **Tool yang Dipakai di Video**: **HxD Hex Editor** + [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character File Loader Editor` & `Character Moveset Editor`)
* **Contoh Karakter di Video**: Memindahkan Grab milik Sakura Shippuden (`2skr`) ke Sakura Kecil (`1skr`)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Video ini adalah **tutorial paling penting jika Anda ingin mengambil animasi (baik Grab, Kombo, maupun Air Combo) dari karakter yang berbeda kode ID-nya**! Mengapa? Karena setiap file animasi `bod1` mengunci nama tulangnya sesuai kode pemilik aslinya (contoh: tulang Sakura Shippuden bernama `2skr00t0`, sedangkan tulang Sakura Kecil bernama `1skr00t0`).

Agar animasi karakter lain bisa dipakai tanpa membuat karakter membeku (T-Pose), pembuat video melakukan langkah berikut:
1. **Mengedit File `bod1` Donor di HxD Hex Editor (`00:08–00:58`)**:
   * Menyalin `2skrbod1.xfbin` ke `data_win32/spc/` dan mengganti namanya menjadi **`2skrbod1_t.xfbin`**.
   * Membuka `2skrbod1_t.xfbin` di **HxD**, mencari teks **`2skr00t0`** (`Ctrl + F`), lalu mengubah **kemunculan PERTAMA saja** (di baris alamat `0x00000180`) menjadi **`1cmnbod1`**.
   * Menekan **`Ctrl + R`** (*Replace*) untuk mengubah **seluruh 200 kemunculan `2skr00t0` sisanya** menjadi **`1cmn00t0`**, lalu menyimpan file.
2. **Mendaftarkan File Hasil HxD ke `spcload` (`00:59–01:51`)**:
   * Membuka `1skrpm_load.bin.xfbin` di **Character File Loader Editor**, menekan `Add`, dan memasukkan `File Path = spc`, `File Name = 2skrbod1_t`, `Type = 3 - bod1`, serta mencentang **`[x] Base`** dan **`[x] Awakening`**.
3. **Mengganti 3 Section Grab di `Character Moveset Editor` (`01:52–03:00`)**:
   * Menghapus 3 section Grab lama pada `1skr`, lalu menyalin dan menempel (*Copy-Paste*) **3 section Grab** dari `2skr`:
     1. **`PL_ANM_THROW_BEGIN`** (Gerakan menangkap di awal)
     2. **`PL_ANM_THROW_SUCCESS_ATTACKER`** (Gerakan membanting setelah tangkapan kena)
     3. **`PL_ANM_THROW_SUCCESS_VICTIM`** (Gerakan tubuh musuh saat dibanting)
4. **Menyambungkan Efek Retakan Tanah (`COMBO11` & `COMBO12`) (`03:01–03:58`)**:
   * Mengecek fungsi `44 = ME_ENTRY_COMBO_SKILL_N_COORD` di dalam `PL_ANM_THROW_SUCCESS_ATTACKER` yang memanggil `COMBO11` dan `COMBO12`, lalu mengatur `COMBO11` dan `COMBO12` di tab **`Projectile List`**.
5. **Mencentang `Enable Outlaw Max` & Mematikan `Enable Face Animations` (`03:59–04:32`)**:
   * Pada ketiga section `PL_ANM_THROW_*` tadi, pembuat **mencentang `[x] Enable Outlaw Max`** dan **menghapus centang `[ ] Enable Face Animations`**, lalu menyimpannya. Saat diuji di dalam game (`04:26–04:32`), Sakura Kecil berhasil membanting Naruto Six Paths menggunakan gerakan Grab Sakura Shippuden dengan mulus!

## 2. Urutan Kejadian di Video (Detik demi Detik)

| Detik Video | Apa yang Terlihat di Layar | Penjelasan Sederhana |
| :--- | :--- | :--- |
| **`00:08–00:37`** | Menyalin `2skrbod1.xfbin` ke `data_win32/spc/2skrbod1_t.xfbin` dan membukanya di HxD. | Menyiapkan file animasi donor agar file asli tidak rusak. |
| **`00:38–00:49`** | Di HxD, tekan `Ctrl+F` cari `2skr00t0`, lalu ubah yang **pertama kali ketemu** (offset `0x180`) menjadi **`1cmnbod1`**. | `1cmnbod1` adalah kode khusus di mesin game yang berarti *"Container Tubuh Umum (Common Body)"*. |
| **`00:50–00:58`** | Tekan `Ctrl+R`, ganti semua `2skr00t0` sisanya menjadi **`1cmn00t0`** (`Replace All`: 200 kemunculan diganti), lalu simpan. | `1cmn00t0` berarti *"Kerangka Tulang Umum"*. Dengan mengubah semua nama tulang menjadi `1cmn00t0`, karakter siapa saja bisa memutar animasi ini! |
| **`00:59–01:51`** | Mendaftarkan `spc/2skrbod1_t` (`Type: 3 - bod1`, `Base` + `Awakening`) di `1skrpm_load.bin.xfbin`. | Memuat file `2skrbod1_t.xfbin` yang sudah diedit HxD ke dalam memori karakter penerima. |
| **`01:52–03:00`** | Menghapus `PL_ANM_THROW_BEGIN`, `ATTACKER`, `VICTIM` di `1skr`, lalu *Copy-Paste* ketiganya dari `2skr`. | Satu gerakan Grab **selalu terdiri dari 3 bagian**: gerakan mencoba menangkap (`BEGIN`), gerakan penyerang saat membanting (`ATTACKER`), dan gerakan musuh yang terlempar (`VICTIM`). |
| **`03:01–03:58`** | Mengatur `COMBO11` dan `COMBO12` di tab `Projectile List`. | Supaya efek debu/batu hancur saat musuh dibanting ke tanah tetap muncul. |
| **`03:59–04:32`** | Mencentang **`[x] Enable Outlaw Max`** dan mematikan **`[ ] Enable Face Animations`** pada ketiga section `THROW`, simpan, dan tes. | `Enable Outlaw Max` memerintahkan game memakai tulang `1cmn00t0` yang kita buat di HxD tadi, sedangkan mematikan `Enable Face Animations` mencegah wajah karakter penyok/rusak! |

## 3. Panduan Eksekusi Manual di HxD & NSC Toolbox (Langkah demi Langkah)

### A. Cara Edit HxD Tanpa Salah (Bisa Dipakai untuk Karakter Apa Saja!)
Misalkan Anda ingin mengambil gerakan dari **Shisui (`4ssi`)** atau **Minato (`2fou`)**:
1. Salin `4ssibod1.xfbin` ke `data_win32/spc/` dan ubah namanya menjadi `4ssibod1_tbv.xfbin`.
2. Buka `4ssibod1_tbv.xfbin` di **HxD Hex Editor**.
3. Tekan **`Ctrl + F`**, pastikan tab **Text-string** terpilih, ketik **`4ssi00t0`** (kode 4 huruf karakter + `00t0` = total 8 huruf), lalu klik **OK**.
4. HxD akan berhenti di **temuan paling atas** (sekitar baris `00000180`). Klik pada tulisan `4ssi00t0` di kolom kanan, lalu ketik langsung:
   **`1cmnbod1`**
   *(Ingat: Jangan tekan Backspace atau Delete! Langsung ketik di atasnya supaya panjang byte file tetap sama persis!)*.
5. Sekarang tekan **`Ctrl + R`** (*Replace*):
   * Kotak atas (**Search for**): `4ssi00t0`
   * Kotak bawah (**Replace with**): `1cmn00t0`
   * Pilih **Direction: All**, lalu klik tombol **`Replace All`**.
6. Akan muncul pesan bahwa ~200 kata berhasil diganti. Tekan **`Ctrl + S`** untuk menyimpan!

### B. Dua Aturan Wajib di NSC Toolbox Setelah Edit HxD
Setiap kali sebuah section `PL_ANM` (baik Grab `PL_ANM_THROW_*`, Kombo Darat `PL_ANM_ATKxx`, maupun Air Combo `PL_ANM_ATK_AIRxx`) memakai animasi dari file yang sudah diubah menjadi `1cmnbod1` / `1cmn00t0`:
1. **WAJIB Centang `[x] Enable Outlaw Max`** di pojok kanan atas! *(Di dalam kode biner *Storm 4*, flag ini berada di offset `+0x58` bernama `cube_man = 1`)*. Kalau lupa dicentang, karakter tidak akan bergerak sama sekali!
2. **WAJIB Hapus Centang `[ ] Enable Face Animations`**! Kalau dibiarkan tercentang, mulut dan mata karakter Anda akan tertarik secara aneh karena tulang wajah tiap karakter berbeda.

### C. Trik Alternatif Tanpa HxD: Mengubah Grab Menjadi Sinematik Jutsu Bawaan Karakter!
Jika Anda mengedit karakter yang punya jurus sinematik keren di dalam dirinya sendiri (contohnya Sasuke `7ssk` punya jurus *Chidori Kusanagi Rush* 11-tebasan pada `PL_ANM_SKL05_DEMO_ATK_2`), Anda bisa mengubah Grab tanpa perlu file luar:
1. Klik **`PL_ANM_THROW_SUCCESS_ATTACKER`**, ubah **`Animation`** menjadi **`7sskskl5_atk2`** dan **`File Type`** menjadi **`5`** (`skl`).
2. Klik **`PL_ANM_THROW_SUCCESS_VICTIM`**, ubah **`Animation`** menjadi **`7sskskl5_dmg2`** dan **`File Type`** menjadi **`5`** (`skl`), serta centang **`Enable Outlaw Max`** pada `VICTIM`.
3. Begitu Grab Anda mengenai musuh di dalam game, karakter Anda akan langsung mengeksekusi adegan sinematik 11 tebasan petir tersebut!
