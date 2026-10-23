# VIDEO 03 — Deep Technical Breakdown: Changing Shuriken (`XMqRwv2715s`)

**Mission ID**: `NSC-MOVESET-RESEARCH-001`
**Target Video**: [[NSUNSC Mod Tutorial] Changing Shuriken](https://www.youtube.com/watch?v=XMqRwv2715s)
**Creator**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=XMqRwv2715s)
**Publication Date & Duration**: 28 Oktober 2025 | `03:10` (`PT3M10S`, indeks frame `00:00`–`03:09`)
**Status Akses**: **DITONTON PENUH (`00:00`–`03:09`)** (`[VERIFIED IN VIDEO]`)

## 1. Catatan Forensik Bertimestamp (`00:00`–`03:09`)

| Timestamp | Observasi Visual di Layar | Penjelasan dalam Video (Subtitle) | Elemen Teknis (File, Field, Nilai) | Hasil yang Terlihat | Pertanyaan Terbuka / Catatan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`00:00–00:07`** | Layar hitam dengan teks atribusi pembuka. | Semua situs dan tool tersedia di deskripsi; kredit untuk *Naruto Storm Modding Server Discord*. | Ekosistem [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox). | Pembuka video. | — |
| **`00:08–00:15`** | Pertarungan latihan Naruto PTS (`1nrt`) vs Shino (`1sin`). Naruto melempar shuriken di udara dan di darat. | *"Today I'm going to show you how to change the Shuriken"* | Shuriken standar `1nrt` (`cmn_a_skn00`). | Shuriken besi biasa terlempar ke arah Shino. | Memperlihatkan baseline sebelum modifikasi. |
| **`00:16–00:35`** | Membuka Windows Explorer dan [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox). | *"First, let's open the spcload for the character who will receive the new Shuriken. I will use Naruto PTS and Madara Six Paths as an example."* | Folder `data_win32\spc` dan `data_win32\spcload`. Karakter penerima: `1nrt` (Naruto PTS); karakter donor: `5mdr` (Madara Six Paths). | Antarmuka utama `NSC Toolbox` terbuka. | — |
| **`00:36–01:07`** | Menyalin `1nrtprm_load.bin.xfbin` ke `data_win32\spcload\` dan membukanya di `Character File Loader Editor`. | *"Let's open Naruto PTS spcload (1nrt) and Madara's param (5mdrprm)."* | `Characode ID: 1nrt`; daftar file di `1nrtprm_load.bin.xfbin` (`spc/1nrtbod1.xfbin`, `spc/1nrtprm.bin.xfbin`, `skill/1nrtspl1_a.xfbin`, `effect/1nrteff1_ras.xfbin`, dll.). | Struktur manifest pemuatan `1nrt` tampil lengkap. | — |
| **`01:08–01:21`** | Membuka `Character Moveset Editor`, memuat `5mdrprm.bin.xfbin`, memilih `5mdrprm_mot`, dan mengklik tab **`Projectile List`**. | Sama seperti di atas. | Di `5mdrprm_mot` $\rightarrow$ `Projectile List`:<br>- `Projectile Name`: `SYURIKEN`<br>- `Skill File Name`: `5mdr_a_skn00`<br>- `Skill Entry Name`: `5mdreff1_skn_e_begin00`<br>- `Unknown Value`: `0` | Terlihat jelas pasangan file skill (`5mdr_a_skn00`) dan entri efek (`5mdreff1_skn_e_begin00`) yang membentuk shuriken Madara. | Mengapa `Skill Entry Name` diawali `5mdreff1`? Karena visual mesh/partikelnya berada di dalam container `5mdreff1.xfbin`! |
| **`01:22–01:48`** | Di `Character File Loader Editor` (`1nrtprm_load`), menekan `Add` dua kali untuk menambahkan `skill/5mdr_a_skn00.xfbin` dan `spc/5mdreff1.xfbin`. | *"Go to Projectile List, search for SYURIKEN and add the Skill File name along with the character's effect in spcload."* | Entri 1:<br>- `File Path`: `skill`<br>- `File Name`: `5mdr_a_skn00`<br>- `Type`: `11 - skill`<br>- `Costume Index`: `-1`, `Load Condition`: `Base`<br>Entri 2:<br>- `File Path`: `spc`<br>- `File Name`: `5mdreff1`<br>- `Type`: `10 - eff1`<br>- `Costume Index`: `-1`, `Load Condition`: `Base` | Kedua entri (`skill/5mdr_a_skn00.xfbin` dan `spc/5mdreff1.xfbin`) masuk ke akhir daftar `1nrtprm_load`. | Dropdown `Type` di `01:33` memperlihatkan daftar lengkap tipe `0` s.d. `14`. |
| **`01:49–02:10`** | Menyimpan `1nrtprm_load.bin.xfbin` ke `data_win32\spcload\`, lalu membuka jendela kedua `Character Moveset Editor` untuk `1nrtprm.bin.xfbin`. | *"After adding it to spcload, save and modify your character's prm."* | File `data_win32\spcload\1nrtprm_load.bin.xfbin` tersimpan; `1nrtprm.bin.xfbin` (`1nrtprm_mot` $\rightarrow$ `Projectile List`) dibuka berdampingan dengan `5mdrprm.bin.xfbin`. | Pada `1nrt` vanilla, `SYURIKEN` bernilai `Skill File Name: cmn_a_skn00` dan `Skill Entry Name: 1efc_skn_e_begin00`. | Membuktikan shuriken standar menggunakan resource bersama `cmn_a_skn00` dan `1efc`. |
| **`02:11–02:24`** | Menyalin `5mdr_a_skn00` dan `5mdreff1_skn_e_begin00` dari jendela `5mdr` ke entri `SYURIKEN` di jendela `1nrt`, lalu mengklik `Save`. | *"Just change the Skill File Name and Skill Entry Name to match Madara's."* | Pada `1nrt` (`Projectile Name: SYURIKEN`):<br>- `Skill File Name`: `5mdr_a_skn00`<br>- `Skill Entry Name`: `5mdreff1_skn_e_begin00` | Dialog `"Projectile was saved"` muncul. | Hanya mengubah `SYURIKEN`, belum mengubah `CHAKRA_SYURIKEN` atau `AWA_SYURIKEN`. |
| **`02:25–02:42`** | Menyalin `1nrtprm.bin.xfbin` ke `data_win32\spc\` dan menyimpan perubahan dari editor ke `data_win32\spc\1nrtprm.bin.xfbin`. | *"Save and test"* | Path output: `C:\Program Files (x86)\Steam\steamapps\common\NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS\data_win32\spc\1nrtprm.bin.xfbin`. | Dialog konfirmasi penyimpanan berhasil. | — |
| **`02:43–02:57`** | Uji in-game: Naruto PTS (`1nrt`) vs Shino. Naruto melompat dan melempar shuriken (`02:44–02:49`), lalu masuk ke mode *Awakening* Ekor Satu dan melempar shuriken (`02:50–02:57`). | Tidak ada teks tambahan. | Dalam mode Base, lemparan shuriken Naruto mengeluarkan gelombang energi ungu/hitam milik Madara Six Paths (`3 Hits`). Namun setelah *Awakening*, lemparan Naruto kembali mengeluarkan shuriken besi biasa. | Eksperimen berhasil di mode Base, dan mendemonstrasikan pemisahan state *Awakening*. | Mengapa saat *Awakening* shuriken kembali normal? Dijelaskan langsung pada slide `02:59`. |
| **`02:58–03:09`** | Slide penutup menampilkan bagian bawah `Projectile List`. | *"To change during awakening, simply scroll down the list a little and change the AWA_SYURIKEN."* | Entri terpisah di bagian bawah `Projectile List`:<br>- `AWA_SYURIKEN`<br>- `AWA_CHAKRA_SYURIKEN` | Menjelaskan cara mengubah shuriken saat mode *Awakening*. | — |

## 2. Deep Technical Breakdown (Struktur A–I)

### A. Technical Objective
Mengganti proyektil shuriken dasar suatu karakter (`1nrt`) dengan proyektil shuriken khusus milik karakter lain (`5mdr`) tanpa mengubah animasi fisik lemparan tangan karakter penerima.

### B. Prerequisites & Resource Architecture
- **File yang Dimodifikasi**:
  1. `data_win32/spcload/1nrtprm_load.bin.xfbin`
  2. `data_win32/spc/1nrtprm.bin.xfbin` (tab `Projectile List` di dalam `1nrtprm_mot`)
- **Resource yang Direferensikan (Sudah ada di dalam arsip `data1` game)**:
  1. `skill/5mdr_a_skn00.xfbin` (`Type: 11 - skill` — mendefinisikan logika peluru/proyektil, kecepatan tempuh, jumlah proyektil, dan kolisi).
  2. `spc/5mdreff1.xfbin` (`Type: 10 - eff1` — menyimpan entri visual/partikel `5mdreff1_skn_e_begin00`).

### C. Perbedaan Teknis: `SYURIKEN` vs `CHAKRA_SYURIKEN` vs `AWA_SYURIKEN` vs `PL_ANM_ATK_FAR` (`[VERIFIED IN VIDEO]` & `[VERIFIED IN SOURCE]`)
Berdasarkan tabel `Projectile List` (`01:20`, `02:18`, `02:59`) dan catatan rilis [NSC-Toolbox v2.0.1.0](https://github.com/TheLeonX/NSC-Toolbox/releases):
1. **`SYURIKEN`**: Proyektil yang ditembakkan saat tombol Shuriken ditekan pada kondisi Base (baik di darat `PL_ANM_PRJ_LND` maupun di udara `PL_ANM_PRJ_AIR`). Pada karakter standar, menggunakan file bersama `cmn_a_skn00` dan `1efc_skn_e_begin00`.
2. **`CHAKRA_SYURIKEN`**: Proyektil yang ditembakkan saat melakukan *Chakra Shuriken* pada kondisi Base (standar: `cmn_a_skn01`).
3. **`AWA_SYURIKEN` & `AWA_CHAKRA_SYURIKEN`**: Proyektil yang ditembakkan saat karakter berada dalam status *Awakening*.
4. **`PL_ANM_ATK_FAR` / `PL_ANM_ATK_FAR00_ANOTHER`**: Bukan nama entri di `Projectile List`, melainkan nama section state gerakan di tab `Moveset Settings` untuk karakter penembak jarak jauh (*ranged combo*) atau *Shuriken Tilt* (`UltimateStormAPI v2.0.1.0`).

### D. Failure Analysis Khusus Shuriken
- **Karakter melakukan gerakan melempar tangan, tetapi tidak ada shuriken yang keluar sama sekali (proyektil tak terlihat / hilang)**:
  - **Root Cause**: `Skill File Name` (`5mdr_a_skn00`) dan `Skill Entry Name` (`5mdreff1_skn_e_begin00`) sudah diubah di `1nrtprm.bin.xfbin`, tetapi `skill/5mdr_a_skn00.xfbin` (`Type 11`) dan/atau `spc/5mdreff1.xfbin` (`Type 10`) belum ditambahkan ke `1nrtprm_load.bin.xfbin`, atau `Load Condition: Base` belum dicentang.
- **Shuriken berubah di mode normal, tetapi kembali menjadi shuriken biasa saat Awakening**:
  - **Root Cause**: Hanya mengubah `SYURIKEN` tanpa mengubah `AWA_SYURIKEN` di bagian bawah `Projectile List` (`02:59`).
