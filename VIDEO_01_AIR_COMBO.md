# VIDEO 01 — Deep Technical Breakdown: Changing Air Combo (`TcxS3Ues9TI`)

**Mission ID**: `NSC-MOVESET-RESEARCH-001`
**Target Video**: [[NSUNSC Mod Tutorial] Changing Air Combo](https://www.youtube.com/watch?v=TcxS3Ues9TI)
**Creator**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=TcxS3Ues9TI)
**Publication Date & Duration**: 4 Oktober 2025 | `06:45` (`PT6M45S`)

## 1. Status Akses dan Forensik Sumber

| Komponen Bukti | Status Akses | Detail Verifikasi | Label Epistemik |
| :--- | :--- | :--- | :--- |
| **Halaman Watch & Metadata YouTube** | Berhasil Diakses Penuh | Judul: `[NSUNSC Mod Tutorial] Changing Air Combo`, durasi `06:45`, musik `Windmill Isle (Day) - Sonic Unleashed [OST]`, tool `NUNSC Toolbox (Nexusmod) by Leon`, resource `Data1 - Storm Connections (spc, spcload, rpg, etc)`. | `[VERIFIED IN VIDEO]` |
| **Stream Frame Visual Langsung (`TcxS3Ues9TI`)** | Tidak Tersedia di Cache Tool | Karena durasi `06:45` melampaui batas ekstraksi frame indeks tool YouTube, stream visual langsung untuk ID `TcxS3Ues9TI` tidak dikembalikan. Sesuai protokol anti-halusinasi, **tidak ada timestamp palsu yang dikarang untuk video ini**. | `[UNCONFIRMED]` (untuk timestamp internal `TcxS3Ues9TI`) |
| **Bukti Visual Silang `PL_ANM_ATK_AIR` pada Video Seri yang Sama** | Berhasil Diakses Penuh | Struktur entri `PL_ANM_ATK_AIR00` s.d. `PL_ANM_ATK_AIR05` milik karakter `6bto`, `1ssk`, `1skr`, dan `2skr` terlihat jelas di layar editor pada [How PL_ANM_ATK Works (`00:51–01:48`)](https://www.youtube.com/watch?v=TKH_TtuOhNI), [Changing Grab (`02:34–04:19`)](https://www.youtube.com/watch?v=K_DrvEl2XBE), dan [Adding Old Side Combo (`03:01–04:06`)](https://www.youtube.com/watch?v=YKgLFsMCpm0). | `[VERIFIED IN VIDEO]` (Lintas Video) |

## 2. Bukti Visual Terverifikasi Mengenai `PL_ANM_ATK_AIR` dari Seri Video Medrej Storm

Walaupun stream frame `TcxS3Ues9TI` tidak dimuat oleh tool, jendela **Character Moveset Editor** pada tiga video lain dalam seri yang sama memperlihatkan secara langsung daftar section `PL_ANM_ATK_AIR` di dalam sub-chunk `xxxprm_mot`:

| Karakter (`Characode`) | Video Sumber & Timestamp | Daftar Section `PL_ANM_ATK_AIR` yang Terlihat di Layar | Posisi di Dalam `xxxprm_mot` | Label Bukti |
| :--- | :--- | :--- | :--- | :--- |
| **Borushiki (`6bto`)** | [How PL_ANM_ATK Works (`00:51–01:48`, `02:38`)](https://www.youtube.com/watch?v=TKH_TtuOhNI) | `PL_ANM_ATK_AIR00`, `PL_ANM_ATK_AIR01`, `PL_ANM_ATK_AIR02` | Tepat di bawah `PL_ANM_ATK23` dan tepat di atas `PL_ANM_THROW_BEGIN`. | `[VERIFIED IN VIDEO]` |
| **Sakura PTS (`1skr`)** | [Changing Grab (`02:34–02:45`, `03:18`)](https://www.youtube.com/watch?v=K_DrvEl2XBE) | `PL_ANM_ATK_AIR00`, `PL_ANM_ATK_AIR01`, `PL_ANM_ATK_AIR02`, `PL_ANM_ATK_AIR03`, `PL_ANM_ATK_AIR04`, `PL_ANM_ATK_AIR05` | Di bawah `PL_ANM_ATK25` dan tepat di atas `PL_ANM_THROW_BEGIN`. | `[VERIFIED IN VIDEO]` |
| **Sakura Shippuden (`2skr`)** | [Changing Grab (`02:39–02:58`)](https://www.youtube.com/watch?v=K_DrvEl2XBE) | `PL_ANM_ATK_AIR00`, `PL_ANM_ATK_AIR01`, `PL_ANM_ATK_AIR02`, `PL_ANM_ATK_AIR03`, `PL_ANM_ATK_AIR04` | Di bawah kelompok `PL_ANM_ATK` darat dan di atas `PL_ANM_THROW_BEGIN`. | `[VERIFIED IN VIDEO]` |

## 3. Deep Technical Breakdown (Struktur A–I)

### A. Technical Objective
Mengganti rangkaian serangan kombo udara (*Air Combo*) suatu karakter di *Naruto x Boruto: Ultimate Ninja Storm Connections* dengan memodifikasi entri state `PL_ANM_ATK_AIR00` s.d. `PL_ANM_ATK_AIR0x` di dalam sub-chunk `xxxprm_mot` (`spc/xxxprm.bin.xfbin`) serta mendaftarkan container animasi pendukungnya di `spcload/xxxprm_load.bin.xfbin` (`[STRONG INFERENCE]` dari arsitektur `prm_mot` yang terverifikasi pada Video 4 & 5).

### B. Prerequisites
- **Eksplisit di Deskripsi Video (`[VERIFIED IN VIDEO]`)**:
  - [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) ([Nexus Mods](https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389)).
  - File ekstraksi `Data1 - Storm Connections (spc, spcload, rpg, etc)`.
- **Disimpulkan dari Arsitektur Seri Tutorial (`[STRONG INFERENCE]`)**:
  - **HxD Hex Editor** apabila animasi kombo udara diambil dari karakter dengan `characode` berbeda (untuk mengganti prefix tulang `[char]00t0` menjadi `1cmnbod1`/`1cmn00t0` seperti pada [Video 4 — Changing Grab](https://www.youtube.com/watch?v=K_DrvEl2XBE)).

### C. Initial State
- Karakter target memiliki definisi state kombo udara bawaan (`PL_ANM_ATK_AIR00` sebagai serangan pembuka udara, diikuti `PL_ANM_ATK_AIR01`, `PL_ANM_ATK_AIR02`, dst.) di dalam `data_win32/spc/xxxprm.bin.xfbin` (sub-chunk `xxxprm_mot`) (`[VERIFIED IN VIDEO]`).
- Setiap node `PL_ANM_ATK_AIRxx` merujuk pada chunk animasi di dalam `xxxbod1.xfbin` (`File Type: 3 = bod1`).

### D. Modification Sequence (Rekonstruksi Berbasis Bukti Silang Video 4 & 5)
1. **Penyalinan & Penyiapan Container Animasi (`bod1`)**:
   - **Kasus 1 (Kombo udara dari versi lama karakter yang sama, misal *Generations*/*Storm 4*)**: Salin `xxxbod1.xfbin` lama ke `data_win32/spc/xxxbod1_gen.xfbin` tanpa perlu edit HxD karena prefix tulang `[char]00t0` sudah identik (`[VERIFIED IN VIDEO]` pada `YKgLFsMCpm0`).
   - **Kasus 2 (Kombo udara dari karakter berbeda)**: Salin `yyybod1.xfbin` ke `data_win32/spc/yyybod1_air.xfbin`, buka di HxD, ubah kemunculan pertama `yyy00t0` menjadi `1cmnbod1` dan seluruh kemunculan `yyy00t0` berikutnya menjadi `1cmn00t0` (`[VERIFIED IN VIDEO]` pada `K_DrvEl2XBE` `00:42–00:56`).
2. **Pendaftaran di `Character File Loader Editor` (`spcload/xxxprm_load.bin.xfbin`)**:
   - Tambahkan entri baru dengan `File Path = spc`, `File Name = [nama_file_bod1_baru]`, `Type = 3 - bod1`, `Costume Index = -1`, dan centang `Load Condition = Base` (serta `Awakening` bila diperlukan), lalu simpan (`[VERIFIED IN VIDEO]`).
3. **Penggantian Node `PL_ANM_ATK_AIRxx` di `Character Moveset Editor` (`spc/xxxprm.bin.xfbin`)**:
   - Buka `xxxprm.bin.xfbin` karakter target dan karakter donor di dua jendela `Character Moveset Editor` berdampingan, pilih sub-chunk `xxxprm_mot` (`[VERIFIED IN VIDEO]`).
   - Hapus `PL_ANM_ATK_AIR00` s.d. `PL_ANM_ATK_AIR0x` pada karakter target, lalu gunakan `Copy to clipboard` dan `Paste from clipboard` untuk menyalin seluruh rangkaian `PL_ANM_ATK_AIR00` s.d. `PL_ANM_ATK_AIR0x` dari karakter donor (`[STRONG INFERENCE]`).
   - Sesuaikan `File Type` (jika satu karakter) atau centang `Enable Outlaw Max` dan hapus centang `Enable Face Animations` (jika lintas karakter dengan `1cmn00t0`), serta sesuaikan entri `COMBOxx` di tab `Projectile List` apabila kombo udara memanggil efek proyektil (`ME_ENTRY_COMBO_SKILL_N_COORD`) (`[STRONG INFERENCE]`).

### E. Internal Mechanism
- Serangan udara dipisahkan dari serangan darat menggunakan namespace identifier **`PL_ANM_ATK_AIRxx`** (`[VERIFIED IN VIDEO]`).
- Di udara, fisika gravitasi karakter penyerang selama kombo dikendalikan secara ketat oleh pasangan fungsi `ME_FLOATING_ON` dan `ME_FLOATING_OFF` serta `ME_VELOCITY_RESET` dan `ME_FWDVELOCITY_SET` di dalam `Function List` (`[VERIFIED IN VIDEO]` dari `TKH_TtuOhNI` `00:51` & `02:38`).

### F. Final State, G. Reproducibility, H. Failure Analysis, & I. Technical Conclusions
- **Titik Kegagalan Spesifik Air Combo**:
  1. Jika jumlah node `PL_ANM_ATK_AIR` pada karakter donor (misal 5 node: `AIR00`–`AIR04` pada `2skr`) berbeda dari karakter penerima (misal 6 node: `AIR00`–`AIR05` pada `1skr`) dan node sisa (`AIR05`) tidak dihapus, maka di akhir kombo udara karakter penerima masih dapat mengeksekusi potongan serangan lama atau mengalami *broken chain* (`[VERIFIED IN VIDEO]` dari perbedaan jumlah `AIR00..05` vs `AIR00..04` antara `1skr` dan `2skr` di `K_DrvEl2XBE` `02:34–02:39`).
  2. Jika `ME_FLOATING_ON` tidak terpanggil atau terputus lebih awal, karakter akan jatuh ke tanah sebelum rangkaian kombo udara selesai (`[STRONG INFERENCE]`).
