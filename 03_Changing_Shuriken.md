# [NSUNSC Mod Tutorial] Changing Shuriken — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] Changing Shuriken](https://www.youtube.com/watch?v=XMqRwv2715s)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=XMqRwv2715s)
* **Durasi & Tanggal Rilis**: `03:10` | 28 Oktober 2025
* **Tool yang Dipakai di Video**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character File Loader Editor` & `Character Moveset Editor`)
* **Contoh Karakter di Video**: Mengganti Shuriken Naruto Kecil (`1nrt`) menjadi Gelombang Energi Hitam/Ungu milik Madara Six Paths (`5mdr`)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Video ini menunjukkan cara paling bersih untuk mengubah lemparan **Shuriken** dan **Chakra Shuriken** karakter Anda menjadi proyektil milik karakter lain (tanpa perlu mengubah animasi lemparan tangan karakter):

1. Pembuat membuka file `5mdrprm.bin.xfbin` (Madara Six Paths) di **Character Moveset Editor**, memilih `5mdrprm_mot`, lalu membuka tab **`Projectile List`** (`01:08–01:21`).
2. Di sana terlihat bahwa entri **`SYURIKEN`** milik Madara memakai:
   * **`Skill File Name`**: `5mdr_a_skn00` (berada di folder `skill/5mdr_a_skn00.xfbin`)
   * **`Skill Entry Name`**: `5mdreff1_skn_e_begin00` (efek visualnya berada di dalam file `spc/5mdreff1.xfbin`)
3. Pembuat membuka `1nrtprm_load.bin.xfbin` (milik Naruto Kecil) di **Character File Loader Editor**, lalu menambahkan **kedua file milik Madara tersebut** (`skill/5mdr_a_skn00` dengan `Type: 11 - skill` dan `spc/5mdreff1` dengan `Type: 10 - eff1`) serta mencentang **`[x] Base`** (`01:22–01:48`).
4. Setelah menyimpan `1nrtprm_load.bin.xfbin`, pembuat membuka `1nrtprm.bin.xfbin` di **Character Moveset Editor** → tab **`Projectile List`** → mengklik **`SYURIKEN`**, lalu mengganti `Skill File Name` (`cmn_a_skn00`) dan `Skill Entry Name` (`1efc_skn_e_begin00`) milik Naruto dengan `5mdr_a_skn00` dan `5mdreff1_skn_e_begin00` milik Madara (`01:49–02:42`).
5. Saat dicoba di dalam game (`02:43–02:57`), setiap kali Naruto melempar shuriken di darat maupun udara, yang keluar adalah 3 gelombang energi ungu milik Madara! Di akhir video (`02:58–03:09`), pembuat menjelaskan bahwa untuk mode *Awakening*, kita cukup menggulir ke bawah di `Projectile List` dan mengubah **`AWA_SYURIKEN`** serta **`AWA_CHAKRA_SYURIKEN`**.

## 2. Urutan Kejadian di Video (Detik demi Detik)

| Detik Video | Apa yang Terlihat di Layar | Penjelasan Sederhana |
| :--- | :--- | :--- |
| **`00:08–00:15`** | Naruto Kecil (`1nrt`) melempar shuriken besi biasa ke arah Shino. | Menunjukkan tampilan shuriken standar sebelum dimodifikasi. |
| **`00:36–01:21`** | Membuka `1nrtprm_load.bin.xfbin` di *File Loader Editor* dan `5mdrprm.bin.xfbin` di *Moveset Editor* (tab `Projectile List`). | Mengecek nama file proyektil (`Skill File Name`) dan nama efek (`Skill Entry Name`) pada baris `SYURIKEN` milik Madara (`5mdr`). |
| **`01:22–01:48`** | Menekan tombol `Add` 2 kali di `1nrtprm_load.bin.xfbin` untuk memasukkan `skill/5mdr_a_skn00` (`Type: 11 - skill`) dan `spc/5mdreff1` (`Type: 10 - eff1`). | **Wajib menambahkan keduanya**: file `skill` mengatur gerak peluru & hitbox-nya, sedangkan file `eff1` menyimpan gambar/partikel cahayanya! |
| **`01:49–02:42`** | Menyalin `5mdr_a_skn00` dan `5mdreff1_skn_e_begin00` ke baris `SYURIKEN` milik `1nrtprm.bin.xfbin`, klik `Save`, lalu simpan file. | Mengalihkan panggilan shuriken biasa Naruto agar menembakkan proyektil Madara yang tadi sudah didaftarkan di `spcload`. |
| **`02:43–02:57`** | Uji coba di dalam game (Base vs Awakening). | Di mode Base, lemparan Naruto mengeluarkan gelombang ungu Madara (`3 Hits`). Saat berubah ke mode Awakening, shuriken kembali biasa karena `AWA_SYURIKEN` belum diubah. |
| **`02:58–03:09`** | Menunjukkan baris `AWA_SYURIKEN` dan `AWA_CHAKRA_SYURIKEN` di bagian bawah `Projectile List`. | Jika ingin shuriken saat Awakening juga berubah, ubah juga baris `AWA_SYURIKEN` dan `AWA_CHAKRA_SYURIKEN`. |

## 3. Penjelasan Bahasa Mudah: Bedanya File `skill` vs File `eff1`

Mengapa setiap kali kita meminjam proyektil (baik shuriken, kunai, maupun bola Rasengan/api) dari karakter lain, kita selalu harus mendaftarkan **2 file** di `prm_load.bin.xfbin`?
1. **File `skill` (di folder `skill/`, contoh: `2fou_x.xfbin`, `4efb_7brt1_x.xfbin`, `5mdr_a_skn00.xfbin`)**:
   Ibarat **"mesin peluru"** — mengatur seberapa cepat peluru terbang, berapa jumlahnya, apakah mengejar musuh (*homing*), dan berapa damage-nya.
2. **File `eff1` / `effect` (di folder `spc/` atau `effect/`, contoh: `2foueff1.xfbin`, `4efb_7brt1.xfbin`, `5mdreff1.xfbin`)**:
   Ibarat **"baju/tampilan visual peluru"** — berisi bentuk 3D kunai, bola angin Rasengan, atau kilatan petirnya.
   *Kalau Anda hanya memasukkan file `skill` tanpa memasukkan file `eff1`, pelurunya tetap mengenai musuh tapi tidak terlihat (gaib/transparan)!*

## 4. Panduan Eksekusi Manual Langkah demi Langkah (Termasuk Tips Khusus *Storm 4*!)

### A. Langkah Mengganti `SYURIKEN` & `CHAKRA_SYURIKEN` di Tab `Projectile List`
1. **Buka File Karakter Donor di Character Moveset Editor**:
   * Misalnya di *Storm 4*, buka `2fouprm.bin.xfbin` (Minato) atau `7brtprm.bin.xfbin` (Boruto).
   * Klik `xxxprm_mot` → klik tab **`Projectile List`** di bagian atas.
   * Catat isi **`Skill File Name`** dan **`Skill Entry Name`** dari proyektil yang Anda inginkan. Contoh kombinasi terbaik yang 100% kompatibel di *Storm 4*:
     * **Kunai Hiraishin Minato (3 Kunai Sekaligus)**:
       `Skill File Name` = `2fou_x.xfbin` | `Skill Entry Name` = `2foucmb_skn_e_begin00`
     * **Chakra Kunai Hiraishin Minato**:
       `Skill File Name` = `2fou_x.xfbin` | `Skill Entry Name` = `2foueff1_csk_e_begin00`
     * **Vanishing Rasengan Boruto (Bola Rasengan Lempar)**:
       `Skill File Name` = `4efb_7brt1_x.xfbin` | `Skill Entry Name` = `4efb_7brt1_e_begin00`
     * **Gelombang Tebasan Api Shisui (*Halo Dance*)**:
       `Skill File Name` = `3efb_4ssi1_x.xfbin` | `Skill Entry Name` = `3efb_4ssi1_e_blt00`
2. **Daftarkan File Donor ke `xxxprm_load.bin.xfbin` Karakter Anda**:
   * Buka `data_win32/spcload/7sskprm_load.bin.xfbin` di **Character File Loader Editor**.
   * Klik **`Add`** untuk mendaftarkan pasangan file `spc`/`effect` dan `skill`-nya (misal `spc/2foueff1` dan `skill/2fou_x`, atau `effect/4efb_7brt1` dan `skill/4efb_7brt1_x`), centang **`[x] Base`** dan **`[x] Awakening`**, klik **`Save`**, lalu simpan file.
3. **Ubah `Projectile List` di `xxxprm.bin.xfbin` Karakter Anda**:
   * Buka `data_win32/spc/7sskprm.bin.xfbin` di **Character Moveset Editor** → `7sskprm_mot` → tab **`Projectile List`**.
   * Klik **`SYURIKEN`**, ganti `Skill File Name` dan `Skill Entry Name`-nya, lalu klik tombol **`Save`** di bawah panel `Projectile List`.
   * Lakukan hal yang sama pada **`CHAKRA_SYURIKEN`** (dan `AWA_SYURIKEN` bila ada), klik **`Save`**, lalu klik **`File -> Save`**.

### B. Trik Spesial *Storm 4*: Membuat Tombol Chakra Shuriken Menembakkan Jutsu Raksasa!
Di *Storm 4*, fungsi lempar shuriken dasar (`opcode 0x00A0` & `0x00A1`) hanya mau menembakkan proyektil bertipe kunai/shuriken. Bagaimana kalau kita ingin saat menekan **Chakra Shuriken (`Y + X` / `Segitiga + Kotak`)**, karakter kita langsung menembakkan **Bola *Vanishing Rasengan* Boruto + Gelombang Tebasan Pedang Shisui**?
1. Di tab **`Projectile List`**, isi slot **`NINJUTSU_BULLET_EX`** dengan `4efb_7brt1_x.xfbin` / `4efb_7brt1_e_begin00`, dan isi slot **`NINJUTSU_BULLET_TYPE_2`** dengan `3efb_4ssi1_x.xfbin` / `3efb_4ssi1_e_blt00`.
2. Pindah ke tab **`Moveset Settings`**, lalu cari section **`PL_ANM_PRJ_CHA_LAND`** (gerakan lempar Chakra Shuriken di darat) dan **`PL_ANM_PRJ_CHA_AIR`** (di udara).
3. Di dalam **`Function List`** kedua section tersebut, tambahkan pasangan fungsi pemanggil proyektil *Storm 4* pada `Timing = 5`:
   * Fungsi 1: `Opcode = 165 (0x00A5)`, `String Param = NINJUTSU_BULLET_EX`
   * Fungsi 2: `Opcode = 166 (0x00A6)`, `String Param = attach_fire00`
4. Klik **`Save`** → **`Save PL_ANM Settings`** → **`File -> Save`**. Sekarang setiap kali Anda menekan Chakra Shuriken, karakter akan langsung menembakkan *Vanishing Rasengan*!
