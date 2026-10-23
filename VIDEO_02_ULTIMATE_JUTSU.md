# VIDEO 02 — Deep Technical Breakdown: Changing Ultimate Jutsu (`DgEzO1SHwKk`)

**Mission ID**: `NSC-MOVESET-RESEARCH-001`
**Target Video**: [[NSUNSC Mod Tutorial] Changing Ultimate Jutsu](https://www.youtube.com/watch?v=DgEzO1SHwKk)
**Creator**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=DgEzO1SHwKk)
**Publication Date & Duration**: 22 September 2025 | `06:11` (`PT6M11S`)

## 1. Status Akses dan Forensik Silang

| Komponen Bukti | Status Akses | Detail Verifikasi | Label Epistemik |
| :--- | :--- | :--- | :--- |
| **Halaman Watch & Metadata YouTube (`DgEzO1SHwKk`)** | Berhasil Diakses Penuh | Judul: `[NSUNSC Mod Tutorial] Changing Ultimate Jutsu`, durasi `06:11`, dipublikasikan 22 September 2025, menggunakan `NUNSC Toolbox` dan `Data1 - Storm Connections (spc, spcload, rpg, etc)`. | `[VERIFIED IN VIDEO]` |
| **Stream Frame Langsung (`DgEzO1SHwKk`)** | Tidak Tersedia di Cache Tool | Durasi `06:11` melampaui batas cache token video tool YouTube. | `[UNCONFIRMED]` (untuk timestamp internal `DgEzO1SHwKk`) |
| **Tangkapan Layar Langsung Editor Hasil Tutorial Ini di Video 5 (`YKgLFsMCpm0` pada `01:05` & `01:15`) dan Video 3 (`XMqRwv2715s` pada `01:05` & `02:59`)** | Berhasil Diakses Penuh (`[VERIFIED IN VIDEO]`) | Pada detik **`01:15`** di [Adding Old Side Combo (`YKgLFsMCpm0`)](https://www.youtube.com/watch?v=YKgLFsMCpm0), jendela `Character Moveset Editor` dari proyek pengubahan Ultimate Jutsu (`Characode ID: 1nrt`, sub-chunk **`1nrtprm_spl`**) masih terbuka di layar! Begitu pula isi `1nrtprm_load.bin.xfbin` yang telah dimodifikasi terlihat jelas pada detik **`01:05`** di [Changing Shuriken (`XMqRwv2715s`)](https://www.youtube.com/watch?v=XMqRwv2715s). | `[VERIFIED IN VIDEO]` |

## 2. Bukti Forensik Langsung dari Jendela `1nrtprm_spl` & `1nrtprm_load` yang Terekam di Layar

Pada `YKgLFsMCpm0` (`01:15`) dan `XMqRwv2715s` (`01:05–01:07`, `02:59–03:08`), terekam bukti visual langsung bagaimana Ultimate Jutsu Naruto PTS (`1nrt`) diubah menggunakan Ultimate Jutsu Naruto Shippuden (`3nrt`):

| Elemen / Sub-chunk | Lokasi Tangkapan Layar | Nilai Aktual yang Terbaca di Layar | Makna Teknis | Label Bukti |
| :--- | :--- | :--- | :--- | :--- |
| **Sub-chunk `1nrtprm_spl`** | `YKgLFsMCpm0` (`01:15`) | Dipilih pada daftar kiri atas (`1nrtprm_bas`, `1nrtprm_mot`, `1nrtprm_atk`, **`1nrtprm_spl`**). Di bawahnya terdapat pemilih **`Ultimate Jutsu [ 1 ]`** dengan tombol `Add`, `Save`, `Delete`. | Berbeda dari kombo darat/udara/grab yang berada di `xxxprm_mot`, seluruh state dan proyektil Ultimate Jutsu disimpan secara terpisah di dalam sub-chunk **`xxxprm_spl`** per indeks slot Ultimate Jutsu (`1`, `2`, dst.). | `[VERIFIED IN VIDEO]` |
| **Daftar State `PL_ANM_SPSKILL1_*`** | `YKgLFsMCpm0` (`01:15`) | 1. `PL_ANM_SPSKILL1_CUTIN_NC`<br>2. `PL_ANM_SPSKILL1_CUTIN`<br>3. `PL_ANM_SPSKILL1_START` *(aktif)*<br>4. `PL_ANM_SPSKILL1_HIT`<br>5. `PL_ANM_SPSKILL1_DEMO_DMG`<br>6. `PL_ANM_SPSKILL1_DEMO_ATK_END`<br>7. `PL_ANM_SPSKILL1_TEAM_WAIT` | Satu rangkaian Ultimate Jutsu terdiri atas 7 tahapan state terpisah: Cut-in tanpa kamera khusus (`CUTIN_NC`), Cut-in utama (`CUTIN`), gerakan serang awal (`START`), deteksi impak (`HIT`), adegan sinematik damage lawan (`DEMO_DMG`), penutup serangan sinematik (`DEMO_ATK_END`), dan state tunggu Team Ultimate (`TEAM_WAIT`). | `[VERIFIED IN VIDEO]` |
| **Daftar `Projectile List` di Dalam `1nrtprm_spl`** | `YKgLFsMCpm0` (`01:15`) | - `COMBO11`: `Skill File Name = 3nrt...`, `Skill Entry Name = 3nrtspl1_00`<br>- `SPSKILL_CUTIN_EFF_SOIL`: `3nrtspl1_skn_e_soil00`<br>- `SPSKILL_CUTIN_EFF_WATER`: `3nrtspl1_skn_e_water00`<br>- `SPSKILL_CUTIN_EFF_SNOW`: `3nrtspl1_skn_e_snow00`<br>- `SPSKILL_EYE00`: `2nrt_skn_e_eye00` | Membuktikan bahwa `1nrt` (Naruto PTS) telah dimodifikasi agar `1nrtprm_spl`-nya memanggil skill dan efek cut-in milik `3nrt` (`3nrtspl1_00`, efek tanah/air/salju `3nrtspl1_skn_e_*`). | `[VERIFIED IN VIDEO]` |
| **Entri `1nrtprm_load.bin.xfbin` untuk Ultimate Jutsu** | `XMqRwv2715s` (`01:05–01:07`) & `YKgLFsMCpm0` (`01:32`) | Di dalam `Character File Loader Editor`:<br>- `spc/ccodeModel/spl1_bod1.xfbin`<br>- `spc/ccodeMotion/spl1_mot1.xfbin`<br>- `spc/ccodeMotion/ougi1.xfbin`, `ougi2.xfbin`, `ougi3.xfbin`<br>- `spc/1nrtspl1.xfbin`, `effect/1nrteff_spl1.xfbin`<br>- Checkbox `Load Condition`: `Ultimate Jutsu 1`, `Ultimate Jutsu 2`, `Ultimate Jutsu 3`, `Ultimate Jutsu 4` | File animasi/model/efek Ultimate Jutsu hanya dimuat ke memori apabila `Load Condition` dicentang pada slot `Ultimate Jutsu 1..4` yang dipilih pemain di menu pemilihan karakter. | `[VERIFIED IN VIDEO]` |

## 3. Deep Technical Breakdown (Struktur A–I)

### A. Technical Objective
Mengganti Ultimate Jutsu (*Secret Technique / Ougi*) suatu karakter (contoh: mengganti Ultimate Jutsu `1nrt` dengan `3nrtspl1` milik `3nrt`) dengan memodifikasi sub-chunk **`xxxprm_spl`** (`PL_ANM_SPSKILL1_*` dan `Projectile List`-nya) di `spc/xxxprm.bin.xfbin` serta mendaftarkan container `spl1` dan `eff_spl1` pada `spcload/xxxprm_load.bin.xfbin`.

### B. Prerequisites & Resource Dependencies
- **File Target**: `data_win32/spc/xxxprm.bin.xfbin` (sub-chunk `xxxprm_spl`) dan `data_win32/spcload/xxxprm_load.bin.xfbin`.
- **Resource Pendukung Ultimate Jutsu**:
  - File animasi/cutscene Ultimate Jutsu: `spc/xxxspl1.xfbin` (atau `spl2`, `spl3`, `spl1_bod1.xfbin`, `spl1_mot1.xfbin`).
  - File efek visual Ultimate Jutsu: `effect/xxxeff_spl1.xfbin` dan/atau `skill/` terkait.
  - Parameter kustomisasi slot jurus (bila menambah slot baru, bukan sekadar mengganti `spl1`): `spSkillCustomizeParam.xfbin` dan `skillIndexSettingParam.xfbin` (`[VERIFIED IN SOURCE]` dari antarmuka utama `NSC Toolbox` pada `XMqRwv2715s` `00:35`).

### C. Internal Mechanism & State Transition Sequence
Ketika pemain mengaktifkan Ultimate Jutsu (Chakra Load x2 + tombol serang):
1. Engine masuk ke sub-chunk `xxxprm_spl` sesuai indeks Ultimate Jutsu yang dipilih (`Ultimate Jutsu 1`, `2`, dst.).
2. State **`PL_ANM_SPSKILL1_CUTIN`** / **`CUTIN_NC`** dieksekusi terlebih dahulu, memicu efek lingkungan cut-in (`SPSKILL_CUTIN_EFF_SOIL`, `WATER`, `SNOW`) dan kilatan mata (`SPSKILL_EYE00`).
3. State **`PL_ANM_SPSKILL1_START`** menggerakkan penyerang atau menembakkan proyektil pembuka (misal `COMBO11` $\rightarrow$ `3nrtspl1_00`).
4. Jika mengenai lawan, transisi berlanjut ke **`PL_ANM_SPSKILL1_HIT`**, lalu memutar sekuens sinematik sinkron antara penyerang dan korban melalui **`PL_ANM_SPSKILL1_DEMO_DMG`** dan **`PL_ANM_SPSKILL1_DEMO_ATK_END`**.

### D. Failure Analysis Khusus Ultimate Jutsu
- **Cut-in muncul tetapi serangan awal tidak keluar / tidak ada proyektil**: Entri `COMBO11` (atau `Skill Entry: xxxspl1_00`) di tab `Projectile List` pada `xxxprm_spl` belum disesuaikan atau file `effect/xxxeff_spl1.xfbin` belum didaftarkan di `xxxprm_load.bin.xfbin` dengan `Load Condition: Ultimate Jutsu 1`.
- **Serangan pembuka mengenai lawan tetapi game membeku (freeze) sebelum cutscene**: File animasi sinematik `spc/xxxspl1.xfbin` belum dimuat di `prm_load.bin.xfbin` atau prefix tulang pada `xxxspl1.xfbin` tidak cocok dengan `characode` karakter penyerang.
