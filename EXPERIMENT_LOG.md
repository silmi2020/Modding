# REPRODUCIBLE EXPERIMENT PROTOCOLS & LOG (`NSC-MOVESET-RESEARCH-001`)

Dokumen ini memuat protokol eksperimen terstruktur (Eksperimen A, B, C, dan D) beserta hasil verifikasi eksekusi tool di lingkungan kerja.

## 1. Eksperimen A — Reproduksi Terkontrol Kelima Kategori Modifikasi

### A.1 Prosedur Reproduksi Video 3: Changing Shuriken (`1nrt` menggunakan Shuriken `5mdr`) — `[VERIFIED IN VIDEO]`
- **Kondisi Awal**: `1nrt` (Naruto PTS) melempar shuriken standar (`cmn_a_skn00` / `1efc_skn_e_begin00`).
- **Resource & Tool**: `1nrtprm.bin.xfbin`, `1nrtprm_load.bin.xfbin`, `5mdrprm.bin.xfbin`, [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox).
- **Langkah Modifikasi**:
  1. Buat backup `1nrtprm.bin.xfbin` dan `1nrtprm_load.bin.xfbin`.
  2. Buka `data_win32/spcload/1nrtprm_load.bin.xfbin` di `Character File Loader Editor`.
  3. Klik `Add` $\rightarrow$ `File Path: skill`, `File Name: 5mdr_a_skn00`, `Type: 11 - skill`, `Costume Index: -1`, `Load Condition: [x] Base` $\rightarrow$ `Save`.
  4. Klik `Add` $\rightarrow$ `File Path: spc`, `File Name: 5mdreff1`, `Type: 10 - eff1`, `Costume Index: -1`, `Load Condition: [x] Base` $\rightarrow$ `Save`, lalu simpan file `1nrtprm_load.bin.xfbin`.
  5. Buka `data_win32/spc/1nrtprm.bin.xfbin` di `Character Moveset Editor`, pilih `1nrtprm_mot` $\rightarrow$ tab `Projectile List`.
  6. Pilih `SYURIKEN` (dan `AWA_SYURIKEN` untuk mode Awakening), ubah `Skill File Name` menjadi `5mdr_a_skn00` dan `Skill Entry Name` menjadi `5mdreff1_skn_e_begin00`, klik `Save`, lalu simpan `1nrtprm.bin.xfbin`.
- **Verifikasi & Rollback**: Uji lempar shuriken di darat, udara, dan mode Awakening. Untuk rollback, pulihkan kedua file dari backup.

### A.2 Prosedur Reproduksi Video 4: Changing Grab Lintas Karakter (`2skr` $\rightarrow$ `1skr`) — `[VERIFIED IN VIDEO]`
- **Kondisi Awal**: `1skr` (Sakura PTS) menggunakan Grab standar (`1skrbod1_trw00`).
- **Langkah Modifikasi**:
  1. Salin `2skrbod1.xfbin` ke `data_win32/spc/2skrbod1_t.xfbin`.
  2. Di HxD (atau menggunakan `argon_moveset_toolkit.py retarget-bod1`), ubah kemunculan pertama `2skr00t0` (offset `0x180`) menjadi `1cmnbod1`, dan ubah seluruh 200 kemunculan `2skr00t0` berikutnya menjadi `1cmn00t0`. Simpan `2skrbod1_t.xfbin`.
  3. Di `Character File Loader Editor`, buka `data_win32/spcload/1skrpm_load.bin.xfbin`, tambahkan `File Path: spc`, `File Name: 2skrbod1_t`, `Type: 3 - bod1`, `Load Condition: [x] Base` & `[x] Awakening`, lalu simpan.
  4. Di `Character Moveset Editor`, buka `1skrpm.bin.xfbin` (`1skrpm_mot`), hapus `PL_ANM_THROW_BEGIN`, `PL_ANM_THROW_SUCCESS_ATTACKER`, dan `PL_ANM_THROW_SUCCESS_VICTIM`, lalu tempel ketiga section tersebut dari `2skrpm.bin.xfbin`.
  5. Pada tab `Projectile List` (`1skrpm_mot`), pastikan `COMBO11` (`1skreff1` / `1skreff1_trw01_a_gnd00`) dan `COMBO12` (`1skreff1` / `1skreff1_trw01_a_air00`) terdefinisi sesuai panggilan `44 = ME_ENTRY_COMBO_SKILL_N_COORD` di `PL_ANM_THROW_SUCCESS_ATTACKER`.
  6. Pada ketiga section `PL_ANM_THROW_*`, centang **`[x] Enable Outlaw Max`** dan hapus centang **`[ ] Enable Face Animations`**, klik `Save PL_ANM Settings`, lalu simpan `1skrpm.bin.xfbin`.

### A.3 Prosedur Reproduksi Video 5: Adding Old Side Combo (`1ssk` *Generations* $\rightarrow$ `1ssk` *Connections*) — `[VERIFIED IN VIDEO]`
- **Kondisi Awal**: `1ssk` (Sasuke PTS) di *Storm Connections* hanya memiliki *Neutral*, *Up*, dan *Down Combo*.
- **Langkah Modifikasi**:
  1. Salin `1sskbod1.xfbin` dari *Storm Generations* ke `data_win32/spc/1sskbod1_gen.xfbin`.
  2. Daftarkan `spc/1sskbod1_gen.xfbin` (`Type: 3 - bod1`, `Load Condition: [x] Base`) di `data_win32/spcload/1sskprm_load.bin.xfbin`.
  3. Di `Character Moveset Editor`, salin `PL_ANM_ATK07` s.d. `PL_ANM_ATK11` dari `1sskprm.bin.xfbin` (*Storm Generations*) ke `1sskprm.bin.xfbin` (*Storm Connections*).
  4. Pada `PL_ANM_ATK07` s.d. `PL_ANM_ATK11`, ubah dropdown `File Type (same as in prm_load)` ke entri `3 = bod1` urutan kedua (`1sskbod1_gen`), klik `Save PL_ANM Settings` pada tiap node, lalu simpan `1sskprm.bin.xfbin`.

## 2. Eksperimen B — Isolasi Variabel Tunggal

- **Hipotesis**: Flag boolean **`Enable Outlaw Max`** merupakan saklar penentu yang mengalihkan resolusi rig animasi dari `[characode]00t0` ke namespace umum `1cmnbod1` / `1cmn00t0`.
- **Variabel Independen**: Status centang `Enable Outlaw Max` (`Checked` vs `Unchecked`) pada `PL_ANM_THROW_BEGIN`, `ATTACKER`, dan `VICTIM` setelah `2skrbod1_t.xfbin` di-retarget menjadi `1cmnbod1`/`1cmn00t0`.
- **Variabel Kontrol**: `2skrbod1_t.xfbin`, `1skrpm_load.bin.xfbin`, dan seluruh parameter `PL_ANM_THROW_*` lainnya dipertahankan tetap.
- **Hasil yang Diharapkan**: Ketika `Enable Outlaw Max` tidak dicentang, engine gagal mengikat animasi `1cmn00t0` dari `2skrbod1_t.xfbin`; ketika dicentang, animasi berjalan mulus (`[VERIFIED IN VIDEO]` pada `K_DrvEl2XBE` `03:59–04:32`).

## 3. Eksperimen C — Cross-Feature Generalization Analysis

Apakah teknik retargeting `1cmnbod1` / `1cmn00t0` + `Enable Outlaw Max` dari **Video 4 (Grab)** dapat diterapkan pada **Ground Combo (`PL_ANM_ATKxx`)** dan **Air Combo (`PL_ANM_ATK_AIRxx`)** lintas karakter (seperti klaim penutup pembuat di `TKH_TtuOhNI` `03:31`: *"You could create an ATK00 from Sasuke, ATK01 from Kakashi, and ATK02 from Gaara"*)?
- **Analisis Kompatibilitas (`[STRONG INFERENCE]`)**:
  - **Ya**, karena `PL_ANM_ATKxx`, `PL_ANM_ATK_AIRxx`, dan `PL_ANM_THROW_*` semuanya berada di dalam tabel `xxxprm_mot` yang sama dan memiliki skema atribut section yang identik (termasuk field `Animation`, `File Type`, `Enable Outlaw Max`, dan `Enable Face Animations`).
  - **Syarat Tambahan**: Jika karakter penerima meminjam animasi dari 2 atau lebih karakter berbeda sekaligus, perhatikan bahwa pengalihan ke satu namespace `1cmnbod1` di memori dapat saling menimpa apabila terdapat nama chunk animasi yang kebetulan sama, kecuali setiap container atau chunk memiliki identifier unik.

## 4. Eksperimen D — Generalisasi Workflow Modding Moveset (Universal 7-Step Checklist)

1. **[Identifikasi Target]**: Tentukan apakah aksi berada di `xxxprm_mot` (`PL_ANM_ATK`, `PL_ANM_ATK_AIR`, `PL_ANM_THROW`, `Projectile List`) atau di `xxxprm_spl` (`PL_ANM_SPSKILL1_*`).
2. **[Audit Kerangka `bod1`]**: Apakah animasi berasal dari `characode` yang sama? Jika **Ya**, cukup ubah nama file (misal `xxxbod1_gen.xfbin`). Jika **Tidak (Lintas Karakter)**, lakukan retargeting `[donor]00t0` $\rightarrow$ `1cmnbod1` (ke-1) & `1cmn00t0` (sisanya) dengan ukuran byte tetap.
3. **[Registrasi `spcload`]**: Daftarkan semua file `.xfbin` baru (`Type 3 = bod1`, `Type 10 = eff1`, `Type 11 = skill`) ke `spcload/xxxprm_load.bin.xfbin` dengan `Load Condition` yang sesuai (`Base`, `Awakening`, `Ultimate Jutsu 1..4`).
4. **[Injeksi State `PL_ANM`]**: Salin section `PL_ANM` ke `spc/xxxprm.bin.xfbin`, pastikan tidak ada duplikasi nama section, dan sambungkan rantai `Previous PL_ANM`.
5. **[Binding Rig & Flag]**: Jika karakter sama (multi-`bod1`), pilih indeks `3 = bod1` yang sesuai pada `File Type`. Jika lintas karakter (`1cmn00t0`), centang **`Enable Outlaw Max`** dan hapus centang **`Enable Face Animations`**.
6. **[Binding Efek & Proyektil]**: Periksa `Function List` untuk setiap panggilan `ME_ENTRY_COMBO_SKILL_N_COORD` dan pastikan `String Param` (`COMBOxx`, `SYURIKEN`, `AWA_SYURIKEN`) terdefinisi di tab `Projectile List`.
7. **[Simpan Berjenjang & Uji]**: Klik `Save` (sub-panel) $\rightarrow$ `Save PL_ANM Settings` $\rightarrow$ `File -> Save`, dan gunakan `Export Mod` bila memakai `NSC Mod Manager`.
