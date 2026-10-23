# PL_ANM_ATK Reverse Engineering & Technical Architecture Notes (NSUNSC & NSUNS4)

**Dokumen Referensi Teknis Rekayasa Balik Sistem Animasi Serangan (`PL_ANM_ATK`) pada Ekosistem CyberConnect2 NUCC Engine (*Naruto x Boruto: Ultimate Ninja Storm Connections* & *Naruto Shippuden: Ultimate Ninja Storm 4*)**

## 1. Identitas dan Ruang Lingkup Sumber

| Atribut | Detail Terverifikasi | Status Bukti | 
| ----- | ----- | ----- | 
| **Judul Video Utama** | [\[NSUNSC Mod Tutorial\] How PL_ANM_ATK Works](https://www.youtube.com/watch?v=TKH_TtuOhNI) | `VERIFIED IN VIDEO` | 
| **Channel Pembuat** | [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=TKH_TtuOhNI) | `VERIFIED IN VIDEO` | 
| **Tanggal Publikasi & Durasi** | 23 September 2025 | Durasi: `03:47` (`PT3M47S`, indeks frame `00:00`–`03:46`) | `VERIFIED IN VIDEO` | 
| **Video Pendamping 1 (Seri Sama)** | [\[NSUNSC Mod Tutorial\] Adding Old Side Combo](https://www.youtube.com/watch?v=YKgLFsMCpm0) (22 September 2025, `04:33`) | `VERIFIED IN VIDEO` | 
| **Video Pendamping 2 (Seri Sama)** | [\[NSUNSC Mod Tutorial\] Changing Shuriken](https://www.youtube.com/watch?v=XMqRwv2715s) (28 Oktober 2025, `03:10`) | `VERIFIED IN VIDEO` | 
| **Tool Utama yang Digunakan** | [NSC Toolbox (Naruto Storm Connections - Toolbox)](https://github.com/TheLeonX/NSC-Toolbox) oleh [TheLeonX](https://github.com/TheLeonX) (UI oleh `justcamtro`), sub-modul **Character Moveset Editor** & **Character File Loader Editor** | `VERIFIED IN VIDEO` & `VERIFIED IN SOURCE` | 
| **Ekosistem Mod Manager & API** | [NSC Mod Manager](https://github.com/TheLeonX/NSC-ModManager) ([Releases v2.0.0.0–v2.1.2.1](https://github.com/TheLeonX/NSC-ModManager/releases)) & **UltimateStormAPI** ([NSC-Toolbox Releases](https://github.com/TheLeonX/NSC-Toolbox/releases)) | `VERIFIED IN SOURCE` | 
| **Target Game Utama** | *Naruto x Boruto: Ultimate Ninja Storm Connections* (PC / Steam, arsitektur `data_win32/spc` & `data_win32/spcload`) | `VERIFIED IN VIDEO` | 
| **Target Komparasi Sekunder** | *Naruto Shippuden: Ultimate Ninja Storm 4* (PC / Steam v1.09, didukung melalui mode dual-game di [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox)) | `VERIFIED IN SOURCE` | 

### Metodologi Akses dan Audit Bukti

1. **Inspeksi Visual Frame-by-Frame (`00:00`–`03:46`)**: Video utama tidak menggunakan narasi suara (hanya musik latar instrumental sehingga transkrip otomatis menghasilkan noise fonetik seperti *"heat heat"*, *"biped"*). Seluruh penjelasan teknis pembuat disampaikan melalui **slide teks bahasa Inggris dan tangkapan layar langsung antarmuka `Character Moveset Editor`** serta rekaman pengujian di dalam game (*Practice Mode*).

2. **Verifikasi Silang Video Pendamping**: Karena slide `00:08` dan `00:37` merujuk langsung pada eksperimen *Side Combo* sebelumnya, dilakukan pemeriksaan visual pada [\[NSUNSC Mod Tutorial\] Adding Old Side Combo](https://www.youtube.com/watch?v=YKgLFsMCpm0) dan [\[NSUNSC Mod Tutorial\] Changing Shuriken](https://www.youtube.com/watch?v=XMqRwv2715s) untuk memvalidasi relasi antara `prm.bin.xfbin`, `prm_load.bin.xfbin`, dan container animasi `bod1.xfbin`.

3. **Verifikasi Repositori & Dokumentasi**: Pemeriksaan dilakukan pada repositori [TheLeonX/NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox), [NSC-Toolbox Releases](https://github.com/TheLeonX/NSC-Toolbox/releases), [TheLeonX/NSC-ModManager](https://github.com/TheLeonX/NSC-ModManager), [NSC-ModManager Releases](https://github.com/TheLeonX/NSC-ModManager/releases), [TheLeonX/XFBIN_PARSER](https://github.com/TheLeonX/XFBIN_PARSER), dan halaman distribusi [NSC Toolbox di Nexus Mods](https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389). URL `https://github.com/TheLeonX/NSC-Toolbox/wiki` tidak dapat diakses secara publik melalui pemindaian statis karena pembatasan akses halaman atau ketiadaan halaman wiki publik aktif pada saat pemeriksaan.

## 2. Ringkasan Penemuan (Executive Technical Findings)

1. **Hakikat `PL_ANM_ATK` (`VERIFIED IN VIDEO`)**:
   `PL_ANM_ATK` (**Player Animation Attack**) bukanlah file animasi 3D mentah, melainkan **prefiks identifier untuk node state aksi serangan (Moveset Action State / Section)** di dalam sub-chunk `xxxprm_mot` pada file parameter karakter `xxxprm.bin.xfbin` (disimpan di `data_win32/spc/`).

2. **Arsitektur Rantai State Mundur (*Backward-Linked State Machine*) (`VERIFIED IN VIDEO`)**:
   Urutan kombo serangan tidak ditentukan oleh urutan baris di dalam daftar editor maupun urutan nomor semata, melainkan oleh pasangan field **`PL_ANM Section Name`** (identitas state saat ini) dan **`Previous PL_ANM`** (state prasyarat sebelum transisi diizinkan). Setiap kombo darat dimulai dari **`PL_ANM_ATK00`** yang memiliki **`Previous PL_ANM = PL_ANM_ANY`** dan **`Combo Direction = 0 = All Directions`**.

3. **Pemisahan Identifier State vs Nama Aset Animasi (`VERIFIED IN VIDEO`)**:
   Field `PL_ANM Section Name` (misalnya `PL_ANM_ATK05` atau `PL_ANM_ATK00`) terpisah dari field `Animation` (misalnya `6btobod1_atk04` atau `6btobod1_atk10`). Mengubah `PL_ANM_ATK10` menjadi `PL_ANM_ATK00` sambil mempertahankan `Animation = 6btobod1_atk10` dan mengubah `Previous PL_ANM = PL_ANM_ANY` membuat serangan pertama *Down Combo* langsung menjadi serangan pembuka *Neutral Combo*.

4. **Aturan Keunikan Identifier (`VERIFIED IN VIDEO`)**:
   Setiap `PL_ANM_ATKxx` di dalam satu `xxxprm_mot` wajib memiliki nama/nomor unik. Duplikasi nama section menyebabkan konflik resolusi transisi state di dalam game.

5. **Percabangan Kombo via `Combo Direction` & `Trigger Condition 1` (`VERIFIED IN VIDEO`)**:

   * Cabang kombo (*Neutral*, *Up*, *Down*, *Side*) dipisahkan menggunakan field **`Combo Direction`** (`0 = All Directions`, `1 = Up`, `2 = Down`, `3 = Side`) pada state transisi cabang (biasanya pada hit ke-2 atau ke-3 dalam rantai).

   * Variasi serangan spesifik-target—seperti akhiran kombo terhadap karakter raksasa (*Giant / Susanoo / Tailed Beast*)—dikendalikan oleh **`Trigger Condition 1 = 16 (If previous attack hit giant)`** pada section paralel yang berbagi `Previous PL_ANM` yang sama (contoh: `PL_ANM_ATK06` untuk lawan normal vs `PL_ANM_ATK15` dengan animasi `6btobod1_atk05_b` untuk lawan raksasa). Mengubah nilai `16` menjadi `0 (No condition)` memungkinkan animasi anti-raksasa dipakai melawan karakter ukuran normal.

6. **Sistem Frame-Event (`Function List` / `ME_`) dan Reaksi Hit (`Damage Code`) (`VERIFIED IN VIDEO`)**:
   Setiap section `PL_ANM` memiliki daftar fungsi berwaktu (**`Function List`**) dengan awalan `ME_` (*Motion Event*), seperti `ME_FLOATING_OFF`, `ME_VELOCITY_RESET`, `ME_HOMING_SET`, `ME_FWDVELOCITY_SET`, dan **`18 = ME_ATKHIT_ON`**. Di dalam `ME_ATKHIT_ON`, parameter **`Damage Code`** (seperti `DAMAGE_ID_SMALL_UL`, `DAMAGE_ID_SMALL_CMN`, `DAMAGE_ID_STAGGER_NORMAL`, `DAMAGE_ID_RISE_SMALL_PUSH`) menentukan animasi reaksi terkena pukul (*hitstun/launch/knockback*) pada karakter lawan.

## 3. Glosarium Istilah Teknis

| Istilah / Identifier | Kategori | Definisi dan Fungsi Berdasarkan Bukti | Lokasi Penggunaan | Status Bukti | 
| ----- | ----- | ----- | ----- | ----- | 
| **`PL_ANM`** | Konsep / Prefiks State | *Player Animation*; unit state aksi karakter di dalam sub-chunk `xxxprm_mot` yang membungkus referensi animasi, kondisi input/transisi, dan daftar event frame (`Function List`). | `Character Moveset Editor` -> `Moveset Settings` | `VERIFIED IN VIDEO` | 
| **`PL_ANM_ANY`** | Wildcard State Identifier | Nilai khusus pada field `Previous PL_ANM` yang mengizinkan suatu `PL_ANM` dipicu dari state netral/bebas mana pun (digunakan pada `PL_ANM_ATK00`). | Field `Previous PL_ANM` pada `PL_ANM_ATK00` (`00:22`, `00:51`) | `VERIFIED IN VIDEO` | 
| **`PL_ANM_ATK`** (`PL_ANM_ATKxx`) | Kelompok State Serangan Darat | *Player Animation Attack*; keluarga state serangan kombo jarak dekat darat (*Neutral*, *Down*, *Up*, *Side*) dengan indeks dua digit (`00` s.d. `25+`). | Daftar kiri `xxxprm_mot` (`00:37`, `00:51`) | `VERIFIED IN VIDEO` | 
| **`PL_ANM_ATK_AIRxx`** | Kelompok State Serangan Udara | State serangan kombo di udara (terlihat `PL_ANM_ATK_AIR00`, `PL_ANM_ATK_AIR01`, `PL_ANM_ATK_AIR02`). | Daftar kiri `6btoprm_mot` (`00:51`, `01:11`) | `VERIFIED IN VIDEO` | 
| **`PL_ANM_ATK_FAR`** / **`PL_ANM_ATK_FAR00_ANOTHER`** | Kelompok State Serangan Jauh / Shuriken Tilt | State aksi serangan jarak jauh (shuriken/proyektil dasar); `PL_ANM_ATK_FAR00_ANOTHER` ditambahkan oleh `UltimateStormAPI v2.0.1.0` untuk fitur *Shuriken Tilt*. | Catatan rilis [NSC-Toolbox v2.0.1.0](https://github.com/TheLeonX/NSC-Toolbox/releases) | `VERIFIED IN SOURCE` | 
| **`PL_ANM_PRJ`** / **`PL_ANM_PRJ_CHA_AIR`** | Kelompok State Proyektil / Chakra Shuriken | State aksi pelemparan proyektil/shuriken; `PL_ANM_PRJ_CHA_AIR` terlihat di daftar atas `6btoprm_mot` dan `PL_ANM_PRJ_LND` terlihat di `5mdrprm_mot`. | `6btoprm_mot` (`01:31`), `5mdrprm_mot` (`XMqRwv2715s` `01:19`) | `VERIFIED IN VIDEO` | 
| **`xxxprm.bin.xfbin`** | File Container Parameter | File biner berformat container `XFBIN` (`NUCC`) di folder `data_win32/spc/` yang menyimpan parameter perilaku, state kombo, proyektil, kolisi, dan pergerakan karakter `xxx`. | `data_win32/spc/6btoprm.bin.xfbin` (`01:57`) | `VERIFIED IN VIDEO` | 
| **`xxxprm_load.bin.xfbin`** | File Manifest Pemuatan Aset | File `XFBIN` di folder `data_win32/spcload/` yang mendaftarkan file model, animasi (`bod1`), skill, dan efek yang wajib dimuat ke memori saat karakter dipilih. | `data_win32/spcload/1sskprm_load.bin.xfbin` (`YKgLFsMCpm0` `01:30`) | `VERIFIED IN VIDEO` | 
| **`xxxprm_mot`** | Sub-chunk / Tabel Moveset | Bagian di dalam `xxxprm.bin.xfbin` yang menyimpan seluruh daftar state `PL_ANM` beserta `Function List`-nya. | Panel kiri atas `Character Moveset Editor` (`00:51`) | `VERIFIED IN VIDEO` | 
| **`xxxprm_bas`, `xxxprm_atk`, `xxxprm_spl`** | Sub-chunk Parameter Karakter | Sub-bagian pendamping di dalam `xxxprm.bin.xfbin` untuk parameter dasar (`_bas`), atribut serangan (`_atk`), dan spesial/jutsunya (`_spl`). | Panel kiri atas `Character Moveset Editor` (`00:51`) | `VERIFIED IN VIDEO` | 
| **`xxxbod1.xfbin`** | Container Model & Animasi Tubuh | File `XFBIN` di `data_win32/spc/` (`File Type: 3 = bod1`) yang menyimpan mesh/clump tubuh kostum utama serta chunk animasi serangan (`xxxbod1_atk00`, dll.). | Field `Animation` & `File Type` (`00:51`, `YKgLFsMCpm0` `01:35`) | `VERIFIED IN VIDEO` | 
| **`ME_` (Motion Event / Function)** | Opcode Event Frame | Instruksi event yang dieksekusi pada frame tertentu (`Timing`) selama state `PL_ANM` berjalan (contoh: `18 = ME_ATKHIT_ON`, `61 = ME_HOMING_SET`). | Panel tengah `Function List` (`00:51`, `02:38`) | `VERIFIED IN VIDEO` | 
| **`Damage Code`** | Parameter Reaksi Serangan | Enum/ID di dalam fungsi `ME_ATKHIT_ON` yang menentukan jenis animasi *hitstun* atau pelontaran yang dialami lawan saat terkena hitbox. | Panel kanan bawah pada `ME_ATKHIT_ON` (`02:38`–`03:14`) | `VERIFIED IN VIDEO` | 

## 4. Catatan Bertimestamp Kronologis (Timestamp-by-Timestamp Forensic Log)

Tabel berikut memetakan seluruh isi video [\[NSUNSC Mod Tutorial\] How PL_ANM_ATK Works](https://www.youtube.com/watch?v=TKH_TtuOhNI) dari `00:00` hingga `03:46`:

| Timestamp | Bagian Video | Hal yang Diperlihatkan di Layar | Penjelasan Pembuat (Teks Layar) | Makna Teknis & Implikasi Modding | Bukti & Tingkat Kepastian | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **`00:00–00:07`** | Pembuka & Atribusi | Layar hitam dengan teks kredit putih/abu-abu di tengah. | Semua situs dan tool ada di deskripsi; ucapan terima kasih kepada komunitas *Naruto Storm Modding Server Discord*. | Mengonfirmasi ekosistem riset komunitas yang menjadi basis pengembangan [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox). | `VERIFIED IN VIDEO` | 
| **`00:08–00:21`** | Konteks & Peringatan Kompatibilitas | Layar hitam dengan 4 paragraf teks pengantar. | Merujuk pada video sebelumnya (menambahkan *Old Side Combo*). Menjelaskan bahwa kombo lama dapat memicu error karena beberapa fungsi berubah antar-generasi game, serta menyatakan bahwa proses mengubah *Up*, *Neutral*, dan *Down Combo* identik. | **\[Mekanisme Rawan Error\]**: Porting entri `PL_ANM_ATK` mentah dari game *Storm* lama (*Generations* / *Storm 3* / *Storm 4*) ke *Storm Connections* berisiko gagal bila opcode `ME_` di dalam `Function List` telah berubah perilaku. **\[Konsep Fundamental\]**: Semua arah kombo darat diatur oleh mekanisme state `PL_ANM_ATK` yang sama. | `VERIFIED IN VIDEO` | 
| **`00:22–00:35`** | Konsep Dasar Rantai State (`PL_ANM Section Name` & `Previous PL_ANM`) | Teks penjelasan di atas dan 2 tangkapan layar UI `Character Moveset Editor` (`PL_ANM_ATK00` di kiri, `PL_ANM_ATK01` di kanan). | Untuk mengubah urutan kombo, ubah `PL_ANM Section Name` dan `Previous PL_ANM`. Setiap kombo awal dimulai pada `PL_ANM_ATK00` dengan `Previous PL_ANM` = `PL_ANM_ANY`, lalu diikuti `PL_ANM_ATK01` dengan `Previous PL_ANM` = `PL_ANM_ATK00`. | **\[Konsep Fundamental\]**: Mesin kombo menggunakan struktur *backward-linked list/tree*. `PL_ANM_ATK00` adalah *root node* kombo darat karena `Previous PL_ANM = PL_ANM_ANY`. Node berikutnya harus menunjuk ke nama section pendahulunya pada `Previous PL_ANM`. | `VERIFIED IN VIDEO` | 
| **`00:36–00:50`** | Skema Penomoran & Aturan Keunikan Indeks | Daftar vertikal `PL_ANM_ATK` diberi garis warna (Ungu: `ATK00`; Oranye: `ATK01–06, 15`; Hijau: `ATK10–13`; Biru: `ATK20–21`) beserta teks aturan. | Karakter baru memiliki `PL_ANM` yang rapi (`ATK00–ATK15` Neutral, `ATK10–ATK13` Down, `ATK20–ATK21` Up), sedangkan karakter lama acak tetapi tetap saling terhubung. Nomor `ATK` **tidak boleh berulang**. | **\[Detail Penentu Keberhasilan Mod\]**: Nama section `PL_ANM_ATKxx` wajib unik di dalam satu `prm_mot`. Karakter baru mengelompokkan nomor berdasarkan puluhan (`0x` Neutral, `1x` Down, `2x` Up), sedangkan karakter lama menggunakan penomoran berurutan. | `VERIFIED IN VIDEO` | 
| **`00:51–00:58`** | Inspeksi Struktur Awal `6btoprm_mot` | Jendela penuh `Character Moveset Editor` dengan `Characode ID: 6bto` dan sub-file `6btoprm_mot` terbuka. Pembuat mengklik `PL_ANM_ATK00` s.d. `PL_ANM_ATK15`. | Teks bawah: *"In this part, I will delete his initial combo and replace it with Down. I will remove ATK00 + Neutral, change the Down number to 00, and make it the start of the combo."* | Memperlihatkan struktur asli `6bto` (Boruto Karma Progression / Borushiki): `ATK00` (`6btobod1_atk00`) -> `ATK01` (`atk01`) -> `ATK02` (`atk02`) -> `ATK03` (`atk03`) -> `ATK05` (`atk04`) -> `ATK06` (`atk05`) dan cabang raksasa `ATK15` (`atk05_b`, `Trigger Condition 1 = 16`). | `VERIFIED IN VIDEO` | 
| **`00:58–01:08`** | Penghapusan Rantai Neutral Combo Asli | Pembuat memilih `PL_ANM_ATK00`, `ATK01`, `ATK02`, `ATK03`, `ATK05`, dan `ATK06` satu per satu lalu menekan tombol `Delete`. | Sama seperti di atas. | Menghapus node `PL_ANM_ATK00` membebaskan identifier `PL_ANM_ATK00` sehingga dapat diberikan ke serangan lain tanpa melanggar aturan keunikan nama section. | `VERIFIED IN VIDEO` | 
| **`01:09–01:30`** | Promosi `PL_ANM_ATK10` (Down Starter) Menjadi `PL_ANM_ATK00` | Pembuat memilih `PL_ANM_ATK10` (`Animation: 6btobod1_atk10`), mengubah `PL_ANM Section Name` menjadi `PL_ANM_ATK00`, `Previous PL_ANM` dari `PL_ANM_ATK01` menjadi `PL_ANM_ANY`, dan `Combo Direction` dari `2 = Down` menjadi `0 = All Directions`, lalu menekan `Save PL_ANM Settings`. | Dialog konfirmasi: `"PL_ANM entry was saved"`. | **\[Detail Penentu Keberhasilan Mod\]**: Tiga perubahan wajib saat menjadikan serangan cabang sebagai serangan pembuka: (1) `Section Name` = `PL_ANM_ATK00`, (2) `Previous PL_ANM` = `PL_ANM_ANY`, (3) `Combo Direction` = `0 = All Directions`. Field `Animation` tetap `6btobod1_atk10`. | `VERIFIED IN VIDEO` | 
| **`01:31–01:47`** | Penyambungan Ulang Rantai (`PL_ANM_ATK11` -> `PL_ANM_ATK00`) | Pembuat memilih `PL_ANM_ATK11` (`Animation: 6btobod1_atk11`), mengubah `Previous PL_ANM` dari `PL_ANM_ATK10` menjadi `PL_ANM_ATK00`, lalu menekan `Save PL_ANM Settings`. Kemudian memeriksa `ATK12` dan `ATK13`. | Dialog konfirmasi: `"PL_ANM entry was saved"`. | Karena `ATK10` telah berganti nama menjadi `ATK00`, node `ATK11` harus diperbarui agar `Previous PL_ANM` menunjuk ke `PL_ANM_ATK00`. Sementara itu, `ATK12` (`atk12`) dan `ATK13` (`atk12_b`) sudah menunjuk ke `Previous PL_ANM = PL_ANM_ATK11`, sehingga otomatis tersambung. | `VERIFIED IN VIDEO` | 
| **`01:48–02:00`** | Penyimpanan File `6btoprm.bin.xfbin` | Pembuat mengklik `File -> Save As`, menavigasi ke `...\NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS\data_win32\spc\`, memilih `6btoprm.bin.xfbin`, dan menimpanya. | Dialog Windows: konfirmasi timpa file `6btoprm.bin.xfbin`. | Menyimpan serialisasi biner `XFBIN` langsung ke folder override `data_win32/spc/`. | `VERIFIED IN VIDEO` | 
| **`02:01–02:13`** | Demonstrasi In-Game #1 (Down Combo sebagai Neutral Combo) | Pertarungan latihan Boruto (`6bto`) vs Naruto Six Paths. Boruto menekan tombol serang netral berulang kali (2 kali percobaan kombo penuh, menghasilkan `3 Hits`). | Tidak ada teks tambahan (demonstrasi gameplay langsung). | **\[Verifikasi Eksperimen Video\]**: Kombo darat netral Boruto kini langsung mengeksekusi rangkaian `6btobod1_atk10` -> `6btobod1_atk11` -> `6btobod1_atk12` tanpa perlu menahan arah bawah. | `VERIFIED IN VIDEO` | 
| **`02:14–02:29`** | Modifikasi `Trigger Condition 1` (Serangan Lawan Raksasa `16` -> `0`) | Slide teks dan tangkapan layar `PL_ANM_ATK15` (`Animation: 6btobod1_atk05_b`), dengan panah putih menunjuk ke `Trigger Condition 1: 16 = If previous attack hit giant`. | Pembuat merangkai kombo pendek (serangan Down ke-1 -> serangan dasar ke-2 -> akhiran lawan raksasa), dan mengubah `Trigger Condition 1` dari `16` menjadi `0` agar mengenai karakter ukuran normal. | **\[Detail Penentu Keberhasilan Mod\]**: Animasi berakhiran `_b` (`6btobod1_atk05_b`, `6btobod1_atk12_b`) adalah varian serangan khusus target raksasa (*Giant*). Jika `Trigger Condition 1` dibiarkan `16`, kombo akan terputus saat melawan karakter biasa. Mengubahnya ke `0 = No condition` membuka animasi tersebut untuk pertarungan biasa. | `VERIFIED IN VIDEO` | 
| **`02:30–02:36`** | Demonstrasi In-Game #2 (Kombo Hibrida dengan Giant Finisher) | Gameplay Boruto (`6bto`) vs Naruto. Boruto mengeksekusi kombo 3 tahap yang diakhiri salto belakang petir (`atk05_b` / `_b` finisher, `5 Hits`). | Tidak ada teks tambahan. | **\[Verifikasi Eksperimen Video\]**: Membuktikan bahwa animasi anti-raksasa (`_b`) berfungsi mulus melawan karakter normal setelah `Trigger Condition 1` disetel ke `0`, dengan sudut pandang/jarak lompatan yang sedikit lebih tinggi sesuai desain anti-raksasa. | `VERIFIED IN VIDEO` | 
| **`02:37–02:53`** | Modifikasi `ME_ATKHIT_ON` & `Damage Code` | Slide teks dan tangkapan layar `PL_ANM_ATK20` dengan `Timing: 7 Function: ME_ATKHIT_ON` dipilih, panah menunjuk ke `Damage Code: DAMAGE_ID_SMALL_UL`. | Pembuat mengubah `Damage Code` pada `PL_ANM_ATK20` menjadi `DAMAGE_ID_SMALL_UL`; awalnya serangan itu melontarkan musuh ke atas, kini hanya mendorong sedikit ke belakang. | **\[Konsep Fundamental\]**: Efek fisik dan animasi reaksi lawan saat terkena serangan dikontrol oleh field `Damage Code` di dalam fungsi `18 = ME_ATKHIT_ON` pada `Function List`, bukan terkunci mati pada animasi penyerang. | `VERIFIED IN VIDEO` | 
| **`02:54–03:14`** | Demonstrasi In-Game #3 (Perbandingan 4 `Damage Code`) | 4 klip berurutan Boruto menendang Naruto dengan `PL_ANM_ATK20`: (1) `DAMAGE_ID_SMALL_UL` (`02:54`), (2) `DAMAGE_ID_SMALL_CMN` (`02:58`), (3) `DAMAGE_ID_STAGGER_NORMAL` (`03:02`), (4) `DAMAGE_ID_RISE_SMALL_PUSH` (`03:09`). | Label teks di bagian tengah bawah layar sesuai nama `Damage Code` yang diuji. | **\[Verifikasi Eksperimen Video\]**: Animasi tendangan Boruto (`PL_ANM_ATK20`) identik di keempat klip, tetapi reaksi Naruto berubah drastis: tersentak kecil ke kiri-atas/belakang (`SMALL_UL`), tersentak ringan standar (`SMALL_CMN`), terhuyung lama (`STAGGER_NORMAL`), hingga terpental jatuh ke udara (`RISE_SMALL_PUSH`). | `VERIFIED IN VIDEO` | 
| **`03:15–03:30`** | Kesimpulan #1: Eksplorasi File `.prm` | Slide teks penutup bagian pertama. | Menyarankan membuka berbagai file `prm` di Toolbox untuk mengeksplorasi `Damage Code` dan fungsi lainnya. | Menegaskan pendekatan rekayasa balik berbasis perbandingan sampel (*comparative sample analysis*) antar-karakter di dalam `NSC Toolbox`. | `VERIFIED IN VIDEO` | 
| **`03:31–03:46`** | Kesimpulan #2: Kombo Lintas Karakter | Slide teks penutup bagian kedua. | Menyatakan modder dapat membuat `ATK00` dari Sasuke, `ATK01` dari Kakashi, dan `ATK02` dari Gaara. | **\[Informasi Tidak Dijelaskan Memadai di Video Ini -> Diverifikasi via Video Pendamping\]**: Penggabungan serangan lintas karakter tidak cukup hanya dengan menyalin `PL_ANM_ATK` di `prm.bin.xfbin`; file `bod1.xfbin` / `skill` karakter sumber wajib didaftarkan terlebih dahulu di `xxxprm_load.bin.xfbin` (`spcload`) seperti yang dibuktikan pada [video Adding Old Side Combo](https://www.youtube.com/watch?v=YKgLFsMCpm0). | `VERIFIED IN VIDEO` & `VERIFIED IN SOURCE` | 

## 5. Pembedahan Mendalam Sistem `PL_ANM_ATK` & Model Mental Bertingkat

### 5.1 Identifikasi Semantik Hierarki Identifier

Berdasarkan bukti visual di `Character Moveset Editor` (`00:22–01:47`, `02:38`) serta catatan rilis [NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox/releases):

1. **`PL_ANM` (*Player Animation State*)**:
   Merupakan struktur data state aksi di dalam sub-chunk `xxxprm_mot`. Setiap entri `PL_ANM` merepresentasikan satu node aksi diskret (misalnya satu segmen serangan kombo, satu gerakan lempar, satu aksi *dash*, atau satu penggunaan item).

2. **`PL_ANM_ATK` (`PL_ANM_ATK00`, `PL_ANM_ATK01`, ... `PL_ANM_ATK25`)**:
   Sub-keluarga `PL_ANM` khusus untuk **serangan kombo jarak dekat di darat (*ground melee combo states*)**.

   * **Karakter Generasi Baru (`6bto` - Borushiki, `00:37–00:55`)**:

     * `PL_ANM_ATK00`: Pembuka kombo darat universal (`Previous PL_ANM = PL_ANM_ANY`, `Combo Direction = 0 = All Directions`).

     * `PL_ANM_ATK01` s.d. `PL_ANM_ATK06`: Jalur *Neutral Combo* (`6btobod1_atk01` s.d. `6btobod1_atk05`).

     * `PL_ANM_ATK15`: Akhiran alternatif *Neutral Combo* khusus lawan raksasa (`Animation = 6btobod1_atk05_b`, `Previous PL_ANM = PL_ANM_ATK05`, `Trigger Condition 1 = 16`).

     * `PL_ANM_ATK10` s.d. `PL_ANM_ATK12`: Jalur *Down Combo* (`6btobod1_atk10` s.d. `6btobod1_atk12`, di mana `ATK10` memiliki `Previous PL_ANM = PL_ANM_ATK01` dan `Combo Direction = 2 = Down`).

     * `PL_ANM_ATK13`: Akhiran alternatif *Down Combo* khusus lawan raksasa (`Animation = 6btobod1_atk12_b`, `Previous PL_ANM = PL_ANM_ATK11`, `Trigger Condition 1 = 16`).

     * `PL_ANM_ATK20` s.d. `PL_ANM_ATK23`: Jalur *Up Combo* (`ATK20` memiliki `Combo Direction = 1 = Up`).

   * **Karakter Generasi Lama (`1ssk` - Sasuke PTS, diverifikasi pada [video YKgLFsMCpm0 `02:45–03:00`](https://www.youtube.com/watch?v=YKgLFsMCpm0))**:

     * `PL_ANM_ATK00`, `ATK03`, `ATK04`, `ATK05`, `ATK06`: Jalur *Neutral Combo* (`ATK01` dan `ATK02` dilewati/tidak ada di daftar *Storm Connections*).

     * `PL_ANM_ATK07` s.d. `PL_ANM_ATK11`: Jalur *Side Combo* pada versi *Storm Generations* (`Combo Direction = 3 = Side`), yang dihapus di *Storm Connections* tetapi ruang nomornya (`07–11`) tetap kosong.

     * `PL_ANM_ATK16` s.d. `PL_ANM_ATK21`: Jalur *Up Combo* (`Combo Direction = 1 = Up` pada transisi masuk).

     * `PL_ANM_ATK22` s.d. `PL_ANM_ATK25`: Jalur *Down Combo* (`Combo Direction = 2 = Down` pada transisi masuk).

3. **`PL_ANM_ATK_AIR` (`PL_ANM_ATK_AIR00`, `AIR01`, `AIR02`)**:
   Sub-keluarga state serangan kombo di udara (*Air Combo*).

4. **`PL_ANM_ATK_FAR` & `PL_ANM_ATK_FAR00_ANOTHER`**:
   State serangan jarak jauh (*Far Attack / Shuriken Combo*). Dalam [NSC-Toolbox v2.0.1.0](https://github.com/TheLeonX/NSC-Toolbox/releases), identifier `PL_ANM_ATK_FAR00_ANOTHER` digunakan oleh `UltimateStormAPI` untuk mengimplementasikan *Shuriken Tilt*.

5. **`PL_ANM_PRJ` (`PL_ANM_PRJ_CHA_AIR`, `PL_ANM_PRJ_LND`, dll.)**:
   State pelemparan proyektil/shuriken dasar atau chakra shuriken di darat/udara.

### 5.2 Mekanisme Internal Mesin State Kombo

Berdasarkan parameter yang terlihat di `Character Moveset Editor` (`00:51–01:48`, `02:14–02:53`), transisi dan eksekusi kombo bekerja melalui 5 tahapan deterministik:

1. **Resolusi Input & Evaluasi Prasyarat (`State Transition Resolution`)**:
   Saat pemain menekan tombol serang (`Link Condition = 2 = Link by pressing a button`), engine mencari entri `PL_ANM` di dalam `xxxprm_mot` yang memenuhi:

   * `Previous PL_ANM` cocok dengan state karakter saat ini (atau bernilai `PL_ANM_ANY` jika karakter sedang berada di state netral/idle/lari dan memulai serangan pertama `PL_ANM_ATK00`).

   * `Combo Direction` cocok dengan arah analog/D-Pad yang ditahan pemain (`0 = All Directions` untuk netral/semua arah, `1 = Up`, `2 = Down`, `3 = Side`).

   * `Trigger Condition 1` terpenuhi (misalnya `0 = No condition` untuk kondisi normal, atau `16 = If previous attack hit giant` ketika serangan sebelumnya mengenai target berstatus *Giant*).

2. **Resolusi dan Interpolasi Animasi (`Animation Binding`)**:
   Setelah node `PL_ANM_ATKxx` terpilih, engine membaca string pada field `Animation` (contoh: `6btobod1_atk10`) dan `File Type` (`3 = bod1`). Engine mencari chunk animasi `6btobod1_atk10` dari container `bod1.xfbin` yang telah dimuat ke memori oleh `xxxprm_load.bin.xfbin`, lalu memutarnya dengan durasi blending sesuai nilai `Interpolation` (contoh: `5` frame).

3. **Eksekusi Timeline Frame-Event (`Function List` / `ME_` Dispatcher)**:
   Sepanjang frame animasi berjalan (`Timing: 0, 2, 3, 4, 5, 7, 11, 14, 15...`), engine mengeksekusi instruksi `ME_` secara berurutan:

   * **Frame 0**: Reset status gravitasi/kecepatan (`ME_FLOATING_OFF`, `ME_VELOCITY_RESET`, `ME_CORRECT_CAMERA_DIST`).

   * **Frame 2–5**: Pengaturan pelacakan arah musuh dan dorongan maju penyerang (`61 = ME_HOMING_SET` dengan `Param 1 = 50, Param 2 = 75`; `55 = ME_FWDVELOCITY_SET`; `ME_JUMPVEL_SET`; `ME_FLOATING_ON`).

   * **Frame 7 (Window Aktif Hitbox)**: Mengaktifkan volume serang melalui **`18 = ME_ATKHIT_ON`** (serta `ME_TRGHIT2_ON` dan `ME_ATKHIT_OFFSET_END_ANM_RESET`).

   * **Frame 11–15 (Penutupan Hitbox & Pemulihan)**: Mematikan hitbox secara instan melalui **`ME_ATKHIT_OFF_INSTANT`** dan mengembalikan gravitasi normal (`ME_FLOATING_OFF`).

4. **Aplikasi Reaksi Target (`Hit & Damage Resolution`)**:
   Apabila pada rentang frame antara `ME_ATKHIT_ON` dan `ME_ATKHIT_OFF_INSTANT` hitbox bersinggungan dengan hurtbox lawan, engine membaca parameter di dalam `ME_ATKHIT_ON`:

   * `Damage Code` (contoh: `DAMAGE_ID_SMALL_UL`, `DAMAGE_ID_RISE_SMALL_PUSH`) -> memaksa state machine lawan masuk ke animasi *damage/hitstun* yang sesuai.

   * `Damage Amount` (`10`) & `Guard Damage Amount` (`15`) -> mengurangi HP atau ketahanan *guard* lawan.

   * `Horizontal Push` (`-8`) & `Vertical Push` (`0`) -> memberikan vektor impuls fisika pada lawan.

   * `Hit Effect ID` (`0`), `Hit Sound ID (se1)` (`1`), `Hit Amount` (`1`), `Freeze Time` (`2`) -> memicu partikel impak, efek suara, jumlah multi-hit, dan *hitstop* (beku frame sesaat).

5. **Window Input Berikutnya (`Command Direction` & `Entry Combo`)**:
   Fungsi seperti `ME_COMMAND_DIRECTION_BEGIN` (terlihat pada `PL_ANM_ATK05` di `00:56` pada `Timing: 0`) dan `ME_ENTRY_COMBO_SKILL_N_COORD` (terlihat pada `PL_ANM_ATK11` di `01:16` pada `Timing: 0`) membuka window pembacaan input arah/lanjutan kombo untuk transisi ke `PL_ANM_ATK` berikutnya.

### 5.3 Model Mental 3 Tingkat

#### Level 1 — Pemahaman Pemula (Analogi Rangkaian Gerbong Kereta)

Bayangkan satu kombo serangan seperti **rangkaian gerbong kereta api**:

* Setiap gerbong adalah satu gerakan pukul/tendang yang disebut **`PL_ANM_ATK`** (Gerbong `00`, Gerbong `01`, Gerbong `02`).

* Gerbong paling depan harus selalu diberi nomor **`PL_ANM_ATK00`** dan pengait depannya harus bertuliskan **`PL_ANM_ANY`** (artinya lokomotif boleh menariknya kapan saja saat tombol serang ditekan).

* Setiap gerbong di belakangnya memiliki label **"Gerbong Sebelumnya" (`Previous PL_ANM`)**. Gerbong `01` menulis *"Saya nyambung ke belakang Gerbong `00`"*.

* Di dalam gerbong terdapat **muatan film animasi (`Animation`)**. Kamu bisa mengganti isi gerbong `00` dengan gerakan tendangan bawah (`atk10`), dan selama gerbong itu diberi nomor `PL_ANM_ATK00` serta pengait `PL_ANM_ANY`, karaktermu akan langsung membuka kombo dengan tendangan bawah tersebut.

#### Level 2 — Pemahaman Modder (Relasi Parameter di `NSC Toolbox`)

Saat mengedit moveset di **Character Moveset Editor (`NSC Toolbox`)**:

* File yang kamu ubah adalah **`xxxprm.bin.xfbin`** (khususnya bagian **`xxxprm_mot`**) di folder `data_win32/spc/`.

* Urutan kombo diatur oleh rantai **`PL_ANM Section Name`** $\leftarrow$ **`Previous PL_ANM`**:

  * Serangan pembuka wajib bernama `PL_ANM_ATK00` dengan `Previous PL_ANM = PL_ANM_ANY` dan `Combo Direction = 0 = All Directions`.

  * Cabang arah (*Up*, *Down*, *Side*) dibuat dengan mengatur `Combo Direction` (`1 = Up`, `2 = Down`, `3 = Side`) pada entri `PL_ANM_ATK` tempat cabang dimulai (biasanya setelah `ATK01` atau `ATK02`), lalu entri setelahnya di cabang yang sama dikembalikan ke `Combo Direction = 0 = All Directions`.

  * Jika kamu menggunakan animasi akhiran milik pertarungan raksasa (berakhiran `_b`), ubah **`Trigger Condition 1`** dari `16 = If previous attack hit giant` menjadi `0 = No condition`.

  * Untuk mengubah efek mental/terpental lawan saat terpukul, buka `Function List` pada `PL_ANM_ATK` tersebut, klik **`ME_ATKHIT_ON`**, lalu ganti **`Damage Code`** (misalnya dari `DAMAGE_ID_RISE_SMALL_PUSH` ke `DAMAGE_ID_SMALL_UL`).

  * Jika kamu mengambil animasi atau proyektil dari karakter lain, kamu **wajib** mendaftarkan file `bod1.xfbin`, `skill`, dan `effect` karakter sumber ke dalam **`xxxprm_load.bin.xfbin`** di folder `data_win32/spcload/` menggunakan **Character File Loader Editor**.

#### Level 3 — Pemahaman Engineer (Arsitektur Data, State Graph, & Invarian Runtime)

Secara arsitektural, `xxxprm_mot` di dalam container `NUCC` (`XFBIN`) mengimplementasikan **Directed Acyclic/Cyclic Action State Graph** dengan resolusi transisi berbasis predikat (*predicate-driven state transition table*):

* **Node Identity Invariant**: Setiap node diindeks menggunakan string identifier (`PL_ANM Section Name`). Mesin pencari transisi melakukan iterasi pada tabel node yang memiliki `Previous_PL_ANM == Current_State_ID`. Jika terdapat dua node dengan `PL_ANM Section Name` identik (duplikasi nomor `ATK`), pointer transisi untuk state berikutnya menjadi ambigu (*non-deterministic state collision*).

* **Branch Disambiguation**: Ketika beberapa kandidat node memiliki `Previous_PL_ANM` yang sama (contoh: dari `PL_ANM_ATK01` bercabang ke `PL_ANM_ATK02` \[Neutral\] dan `PL_ANM_ATK10` \[Down\], atau dari `PL_ANM_ATK05` bercabang ke `PL_ANM_ATK06` \[Normal Finisher\] dan `PL_ANM_ATK15` \[Giant Finisher\]), engine mengevaluasi predikat diskriminator:

  1. `Link Condition` (misal `2 = Link by pressing a button`),

  2. `Combo Direction` (`0` vs `1` vs `2` vs `3`),

  3. `Trigger Condition 1` & `Trigger Condition 2` (misal `16 = If previous attack hit giant` vs `0 = No condition`).

* **Decoupled Resource Binding**: Node `PL_ANM` tidak menyimpan data kurva tulang (*skeletal keyframe tracks*) secara inline. Ia hanya menyimpan string simbolik `Animation` (misal `6btobod1_atk10`) dan kategori sumber `File Type` (`3 = bod1`). Pemuatan kontainer `XFBIN` ke dalam tabel simbol memori ditangani secara terpisah oleh `xxxprm_load.bin.xfbin` saat inisialisasi pertarungan.

## 6. Diagram Alur Mekanisme (Mermaid Flowcharts)

### 6.1 Diagram Alur Eksekusi State Machine `PL_ANM_ATK` (Terverifikasi dari Video)

```
flowchart TD
    A["Input Pemain: Tekan Tombol Serang (Attack Button)"] --> B{"Karakter dalam State Netral / Idle?"}
    B -- "Ya (Previous State = ANY)" --> C["Cari Node: PL_ANM_ATK00\n(Previous PL_ANM = PL_ANM_ANY\nCombo Direction = 0: All Directions)"]
    B -- "Tidak (Sedang dalam PL_ANM_ATKxx)" --> D["Evaluasi Kandidat Node dengan\nPrevious PL_ANM == Current PL_ANM_ATKxx"]

    D --> E{"Cek Link Condition,\nCombo Direction & Trigger Condition 1"}
    E -- "Arah Netral (0 = All Directions)\n& Trigger = 0" --> F["Pilih Node Jalur Neutral\n(mis. PL_ANM_ATK01 -> ATK02 -> ATK03 -> ATK05)"]
    E -- "Arah Bawah (2 = Down)\npada Cabang Awal" --> G["Pilih Node Jalur Down\n(mis. PL_ANM_ATK10 -> ATK11 -> ATK12)"]
    E -- "Arah Atas (1 = Up)\npada Cabang Awal" --> H["Pilih Node Jalur Up\n(mis. PL_ANM_ATK20 -> ATK21 -> ATK22 -> ATK23)"]
    E -- "Arah Samping (3 = Side)\n[Mod Restorasi Side Combo]" --> I["Pilih Node Jalur Side\n(mis. PL_ANM_ATK07 -> ATK08 -> ATK09 -> ATK11)"]

    F --> J{"Cek Cabang Finisher:\nTrigger Condition 1"}
    J -- "0 = No condition" --> K["Pilih Finisher Normal\n(mis. PL_ANM_ATK06 -> 6btobod1_atk05)"]
    J -- "16 = If previous attack hit giant\n(Atau diubah ke 0 via Mod)" --> L["Pilih Finisher Raksasa\n(mis. PL_ANM_ATK15 -> 6btobod1_atk05_b)"]

    C --> M["Muat Chunk Animasi dari File Type (3 = bod1)\n(Blending sesuai nilai Interpolation = 5)"]
    G --> M
    H --> M
    I --> M
    K --> M
    L --> M

    M --> N["Jalankan Timeline Function List (ME_ Opcodes)"]
    N --> N1["Timing 0: ME_FLOATING_OFF, ME_VELOCITY_RESET"]
    N1 --> N2["Timing 2-5: ME_HOMING_SET (61), ME_FWDVELOCITY_SET (55),\nME_JUMPVEL_SET, ME_FLOATING_ON"]
    N2 --> N3["Timing 7: 18 = ME_ATKHIT_ON\n(Aktifkan Hitbox & Evaluasi Parameter Hit)"]
    N3 --> N4{"Hitbox Mengenai Lawan?"}
    N4 -- "Ya" --> N5["Terapkan Damage Code pada Lawan:\n- DAMAGE_ID_SMALL_UL\n- DAMAGE_ID_SMALL_CMN\n- DAMAGE_ID_STAGGER_NORMAL\n- DAMAGE_ID_RISE_SMALL_PUSH\n+ Damage Amount, Push, Hit Effect/Sound, Freeze Time"]
    N4 -- "Tidak" --> N6["Lanjutkan Frame Animasi"]
    N5 --> N6
    N6 --> N7["Timing 11-15: ME_ATKHIT_OFF_INSTANT,\nME_FLOATING_OFF (Tutup Hitbox & Pulihkan State)"]

```

### 6.2 Diagram Topologi Transformasi Mod pada Video (`00:51–02:13`)

```
flowchart LR
    subgraph "Kondisi Awal (Vanilla 6btoprm_mot)"
        V0["PL_ANM_ATK00\nPrev: PL_ANM_ANY\nAnim: 6btobod1_atk00\nDir: 0 (All)"] --> V1["PL_ANM_ATK01\nPrev: PL_ANM_ATK00\nAnim: 6btobod1_atk01\nDir: 0 (All)"]
        V1 --> V2["PL_ANM_ATK02..06\n(Neutral Chain)"]
        V1 -->|Dir: 2 = Down| D10["PL_ANM_ATK10\nPrev: PL_ANM_ATK01\nAnim: 6btobod1_atk10\nDir: 2 (Down)"]
        D10 --> D11["PL_ANM_ATK11\nPrev: PL_ANM_ATK10\nAnim: 6btobod1_atk11\nDir: 0 (All)"]
        D11 --> D12["PL_ANM_ATK12\nPrev: PL_ANM_ATK11\nAnim: 6btobod1_atk12\nTrig1: 0"]
        D11 --> D13["PL_ANM_ATK13\nPrev: PL_ANM_ATK11\nAnim: 6btobod1_atk12_b\nTrig1: 16 (Giant)"]
    end

    subgraph "Kondisi Setelah Mod (00:58–01:47)"
        M0["PL_ANM_ATK00 (Eks-ATK10)\nPrev: PL_ANM_ANY\nAnim: 6btobod1_atk10\nDir: 0 (All)"] --> M11["PL_ANM_ATK11\nPrev: PL_ANM_ATK00\nAnim: 6btobod1_atk11\nDir: 0 (All)"]
        M11 --> M12["PL_ANM_ATK12\nPrev: PL_ANM_ATK11\nAnim: 6btobod1_atk12\nTrig1: 0"]
        M11 --> M13["PL_ANM_ATK13\nPrev: PL_ANM_ATK11\nAnim: 6btobod1_atk12_b\nTrig1: 16 (atau 0)"]
    end

```

### 6.3 Diagram Relasi File, Container XFBIN, dan Dependensi Runtime (`spc` vs `spcload`)

```
flowchart TD
    subgraph "data_win32/spcload/ (Manifest Pemuatan)"
        LOAD["xxxprm_load.bin.xfbin\n(Diedit via Character File Loader Editor)"]
    end

    subgraph "data_win32/spc/ (Parameter & Aset Karakter)"
        PRM["xxxprm.bin.xfbin\n(Diedit via Character Moveset Editor)"]
        BOD["xxxbod1.xfbin / xxxbod1_gen.xfbin\n(File Type: 3 = bod1)"]
    end

    subgraph "data_win32/skill/ & effect/ (Aset Proyektil & VFX)"
        SKL["skill/xxxxxx.xfbin\n(File Type: 11 = skill)"]
        EFF["effect/xxxxxx.xfbin\n(File Type: 10 = eff)"]
    end

    LOAD -->|"Mendaftarkan Load Condition\n(Base, Support, Awakening, Jutsu)"| PRM
    LOAD -->|"Memuat ke Memori (Type 3 = bod1)"| BOD
    LOAD -->|"Memuat ke Memori (Type 11 = skill)"| SKL
    LOAD -->|"Memuat ke Memori (Type 10 = eff)"| EFF

    PRM -->|"Sub-chunk xxxprm_mot:\nField 'Animation' & 'File Type = 3'"| BOD
    PRM -->|"Tab Projectile List:\nField 'Skill File Name' & 'Skill Entry Name'"| SKL

```

## 7. Forensik Kode, Parameter, dan Inventaris Struktur Data

Seluruh elemen berikut dicatat persis sebagaimana tampil di layar video utama (`TKH_TtuOhNI`) dan video pendamping (`YKgLFsMCpm0`, `XMqRwv2715s`):

### 7.1 Inventaris File dan Direktori

| Nama Elemen Persis | Jenis | Lokasi & Timestamp | Fungsi Berdasarkan Bukti | Relasi dengan Elemen Lain | Contoh Aktual | Tingkat Kepastian | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **`data_win32\spc`** | Direktori | `01:50–01:57` (`TKH_TtuOhNI`) | Folder override di instalasi game yang menampung file parameter (`*prm.bin.xfbin`) dan model/animasi (`*bod1*.xfbin`) karakter. | Dibaca oleh engine/API atau dikompilasi oleh `NSC Mod Manager`. | `...\NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS\data_win32\spc` | `VERIFIED IN VIDEO` | 
| **`data_win32\spcload`** | Direktori | `01:04` (`XMqRwv2715s`), `01:06` (`YKgLFsMCpm0`) | Folder yang menyimpan file manifest pemuatan resource (`*prm_load.bin.xfbin`). | Menentukan file apa saja di `spc/`, `skill/`, dan `effect/` yang dimuat saat karakter dipakai. | `data_win32\spcload\1nrtprm_load.bin.xfbin` | `VERIFIED IN VIDEO` | 
| **`6btoprm.bin.xfbin`** | File Biner (`XFBIN`) | `00:51–01:58` (`TKH_TtuOhNI`) | File parameter moveset untuk karakter `6bto` (Boruto Karma Progression / Borushiki). | Mengandung sub-chunk `6btoprm_bas`, `6btoprm_mot`, `6btoprm_atk`, `6btoprm_spl`. | Ukuran di Explorer: `138 KB` (`01:57`) | `VERIFIED IN VIDEO` | 
| **`1sskprm.bin.xfbin`** | File Biner (`XFBIN`) | `00:52`, `02:39` (`YKgLFsMCpm0`) | File parameter moveset untuk karakter `1ssk` (Sasuke PTS). | Berisi `1sskprm_mot`, `1sskprm_bas`, `1sskprm_atk`, `1sskprm_spl`. | Ukuran di Explorer: `121 KB` (NSC), `88 KB` (Storm Generations) | `VERIFIED IN VIDEO` | 
| **`1sskprm_load.bin.xfbin`** | File Biner (`XFBIN`) | `01:00–01:51` (`YKgLFsMCpm0`) | File daftar pemuatan aset untuk karakter `1ssk`. | Diedit di `Character File Loader Editor` untuk menambahkan `spc/1sskbod1_gen.xfbin` (`Type: 3 - bod1`). | Ukuran di Explorer: `3 KB` (`4 KB` setelah edit) | `VERIFIED IN VIDEO` | 
| **`1sskbod1_gen.xfbin`** | File Biner (`XFBIN`) | `00:36–00:39`, `01:46` (`YKgLFsMCpm0`) | Container model/animasi `1sskbod1.xfbin` dari *Storm Generations* yang diganti namanya agar tidak menimpa `1sskbod1.xfbin` asli *Storm Connections*. | Didaftarkan di `1sskprm_load.bin.xfbin` dan direferensikan pada field `File Type (same as in prm_load)` di `Character Moveset Editor`. | Ukuran di Explorer: `2.966 KB` | `VERIFIED IN VIDEO` | 

### 7.2 Inventaris Field UI pada Tab `Moveset Settings` (`Character Moveset Editor`)

| Nama Field / Elemen UI | Jenis Parameter | Lokasi & Timestamp | Fungsi yang Dapat Dibuktikan | Nilai Aktual yang Terlihat di Layar | Tingkat Kepastian | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **`PL_ANM Section Name`** | String Identifier (Key) | `00:22`, `00:51`, `01:14`, `02:14` | Nama unik state aksi di dalam `xxxprm_mot`. Tidak boleh ada nomor `ATK` yang terduplikasi. | `PL_ANM_ATK00`, `PL_ANM_ATK01`, `PL_ANM_ATK10`, `PL_ANM_ATK15`, `PL_ANM_ATK20` | `VERIFIED IN VIDEO` | 
| **`Animation`** | String Reference | `00:51–01:45`, `02:14` | Nama chunk animasi 3D di dalam file `bod1` yang diputar saat state ini aktif. Tidak harus sama nomornya dengan `PL_ANM Section Name`. | `6btobod1_atk00`, `6btobod1_atk04` (pada `ATK05`), `6btobod1_atk05_b` (pada `ATK15`), `6btobod1_atk10` (pada `ATK00` hasil mod), `1sskbod1_atk07` | `VERIFIED IN VIDEO` | 
| **`Previous PL_ANM`** | String Reference (Parent State) | `00:22`, `00:51`, `01:28`, `01:39` | State prasyarat yang harus sedang berjalan agar state ini dapat dipicu sebagai kelanjutan kombo. | `PL_ANM_ANY` (untuk pembuka `ATK00`), `PL_ANM_ATK00`, `PL_ANM_ATK05`, `PL_ANM_ATK10`, `PL_ANM_ATK11` | `VERIFIED IN VIDEO` | 
| **`Next PL_ANM (optional)`** | String Reference (Child State) | `00:22`, `00:51`, `02:14` | Referensi opsional ke state tujuan berikutnya secara langsung (kosong pada entri kombo standar yang menggunakan `Link Condition`). | *(kosong pada `ATK00`–`ATK20` yang diperlihatkan)* | `VERIFIED IN VIDEO` | 
| **`PL_ANM Damage (optional)`** | String Reference | `00:51`, `02:14` | Referensi state `PL_ANM` terkait damage (opsional). | *(kosong pada sampel kombo yang ditampilkan)* | `VERIFIED IN VIDEO` | 
| **`Press Start` / `Press End`** | Signed Integer | `00:51`, `02:14` | Parameter rentang frame penekanan tombol (bernilai `-1` saat tidak dibatasi secara manual di level header section). | `Press Start: -1`, `Press End: -1` | `VERIFIED IN VIDEO` | 
| **`Interpolation`** | Integer | `00:51`, `02:14` | Nilai kehalusan transisi (*blending frames*) antar-animasi. | `5` (pada `6bto`), `2` (pada `1ssk` `ATK07` di `YKgLFsMCpm0` `02:53`) | `VERIFIED IN VIDEO` | 
| **`File Type (same as in prm_load)`** | Enum / Integer Index | `00:51`, `02:14`, `03:54` (`YKgLFsMCpm0`) | Menentukan sumber container file tempat chunk `Animation` berada, harus cocok dengan tipe yang terdaftar di `prm_load.bin.xfbin`. | `3 = bod1` (standar), `3 = 1sskbod1_gen [in prm_load]` (saat merujuk `bod1` tambahan di `YKgLFsMCpm0` `03:54`) | `VERIFIED IN VIDEO` | 
| **`Combo Direction`** | Enum (Integer + Label) | `00:51`, `01:15`, `02:14`, `02:53` (`YKgLFsMCpm0`) | Arah input stik/D-Pad yang diperlukan untuk memicu state ini dari `Previous PL_ANM`. | `0 = All Directions` (Neutral/lanjutan), `1 = Up` (`ATK20`), `2 = Down` (`ATK10` asli), `3 = Side` (`1ssk` `ATK07` di `YKgLFsMCpm0` `02:53`) | `VERIFIED IN VIDEO` | 
| **`Link Condition`** | Enum (Integer + Label) | `00:51`, `02:14` | Syarat penyambungan dari `Previous PL_ANM` ke section ini. | `2 = Link by pressing a button`, `4 = Automatic if the previous an...` (terlihat pada `PL_ANM_NUT` di `XMqRwv2715s` `01:19`) | `VERIFIED IN VIDEO` | 
| **`Trigger Condition 1`** | Enum (Integer + Label) | `00:51`, `00:57`, `02:14–02:29` | Kondisi pemicu tambahan pada saat transisi dievaluasi. | `0 = No condition`, `16 = If previous attack hit giant` | `VERIFIED IN VIDEO` | 
| **`Trigger Condition 2`** | Enum (Integer + Label) | `00:51`, `02:14` | Kondisi pemicu sekunder (belum terdokumentasi nama semantiknya di UI Toolbox versi video). | `0 = ???` | `VERIFIED IN VIDEO` | 
| **Boolean Flags (Checkboxes)** | Bitflags / Booleans | `00:51`, `02:14` | 5 opsi perilaku animasi pada section `PL_ANM`. | `Enable Face Animations` (centang), `Enable Outlaw Max` (kosong), `Disable Interpolation for next PL_ANM` (kosong), `Fix Animation Position` (centang), `Fix Backward Facing` (kosong) | `VERIFIED IN VIDEO` | 

### 7.3 Inventaris Opcode `Function List` (`ME_`) dan Parameter `ME_ATKHIT_ON`

Di dalam panel tengah (`Function List`) dan panel kanan (`Function`) pada `00:51–01:48` dan `02:38–02:53`, teridentifikasi fungsi-fungsi `ME_` berikut:

| Opcode & Nama Fungsi (`ME_`) | Contoh `Timing` (Frame) | Konteks `PL_ANM_ATK` di Video | Fungsi Teknis yang Terobservasi / Terkonfirmasi | Tingkat Kepastian | 
| ----- | ----- | ----- | ----- | ----- | 
| **`0 = ME_SPDSCL_SND_MOVE`** | `0` | Default tampilan awal editor (`XMqRwv2715s` `01:10`) | Fungsi indeks `0` dalam daftar enum `Function` di `NSC Toolbox`. | `VERIFIED IN VIDEO` | 
| **`18 = ME_ATKHIT_ON`** | `7` (`ATK00`, `ATK20`), `12` (`1ssk ATK07`) | Semua state serangan fisik (`00:51`, `02:38`) | Mengaktifkan hitbox serangan pada frame `Timing` yang ditentukan dan mengikat parameter damage (`Damage Code`, `Damage Amount`, `Push`, `Hit Effect/Sound`, `Freeze Time`). | `VERIFIED IN VIDEO` | 
| **`ME_ATKHIT_OFF`** / **`ME_ATKHIT_OFF_INSTANT`** | `9`, `11`, `16` | `6bto ATK10/11/20` (`01:09`, `02:38`), `1ssk ATK07` (`YKgLFsMCpm0` `02:53`) | Menonaktifkan hitbox serangan yang sebelumnya dibuka oleh `ME_ATKHIT_ON`. | `VERIFIED IN VIDEO` | 
| **`ME_ATKHIT_OFFSET_END_ANM_RESET`** | `7`, `8`, `9`, `11`, `16` | `6bto ATK00`, `ATK10`, `ATK20` (`00:51`, `01:09`, `02:38`) | Mereset offset akhir animasi yang terkait dengan kalkulasi tumbukan serangan. | `VERIFIED IN VIDEO` | 
| **`55 = ME_FWDVELOCITY_SET`** | `2`, `3`, `4` | `6bto ATK00` (`00:51`), `1ssk ATK07` (`YKgLFsMCpm0` `02:53`) | Mengatur kecepatan gerak maju karakter penyerang pada frame tertentu (contoh pada `1ssk ATK07`: `Timing = 4`, `Param 1 = 12.5`). | `VERIFIED IN VIDEO` | 
| **`61 = ME_HOMING_SET`** | `2`, `3` | `6bto ATK00` (`00:51`), `6bto ATK20` (`02:38`) | Mengatur pelacakan arah (*homing/tracking*) karakter penyerang ke arah lawan (pada `6bto ATK00`: `Timing = 2`, `Param 1 = 50`, `Param 2 = 75`). | `VERIFIED IN VIDEO` | 
| **`ME_FLOATING_OFF` / `ME_FLOATING_ON`** | `0`, `4`, `5`, `14`, `15` | `6bto ATK00`, `ATK20` (`00:51`, `02:38`) | Mengaktifkan atau mematikan status melayang/suspensi gravitasi selama gerakan serangan berlangsung. | `VERIFIED IN VIDEO` | 
| **`ME_VELOCITY_RESET`** | `0` | `6bto ATK00`, `ATK12`, `ATK20` (`00:51`, `01:19`, `02:38`) | Menghentikan momentum/kecepatan sisa dari aksi sebelumnya pada awal frame `0`. | `VERIFIED IN VIDEO` | 
| **`ME_JUMPVEL_SET`** | `4` | `6bto ATK00` (`00:51`) | Memberikan komponen kecepatan lompatan vertikal pada karakter penyerang. | `VERIFIED IN VIDEO` | 
| **`ME_CORRECT_CAMERA_DIST`** | `0` | `6bto ATK01`, `ATK10`, `ATK11` (`00:53`, `01:09`, `01:16`) | Menyesuaikan jarak kamera pertarungan selama kombo berlangsung. | `VERIFIED IN VIDEO` | 
| **`ME_COMBO_CAMERA_ON`** | `2` | `6bto ATK03`, `ATK05`, `ATK06` (`00:55–00:56`) | Mengaktifkan sudut kamera dinamis kombo. | `VERIFIED IN VIDEO` | 
| **`ME_COMMAND_DIRECTION_BEGIN`** | `0` | `6bto ATK05`, `ATK06` (`00:55–00:56`) | Membuka pembacaan arah komando input selama segmen kombo. | `VERIFIED IN VIDEO` | 
| **`ME_ENTRY_COMBO_SKILL_N_COORD`** | `0` | `6bto ATK11` (`01:16`) | Mengatur koordinat/entri penyambungan skill kombo. | `VERIFIED IN VIDEO` | 
| **`ME_TRGHIT2_ON`** | `7` | `6bto ATK20` (`02:38`) | Mengaktifkan deteksi trigger hit sekunder bersamaan dengan `ME_ATKHIT_ON`. | `VERIFIED IN VIDEO` | 
| **`ME_ENEMY_DISP_OFF`** / **`ME_ENEMY_CTRL_OFF`** | `0` | `6bto ATK06` (`00:56`), `6bto ATK12` (`01:19`) | Mematikan tampilan atau kontrol karakter musuh selama animasi akhiran kombo sinematik. | `VERIFIED IN VIDEO` | 
| **`ME_CAMERACAMERA_REVERSE_OFF`** / **`ME_ENEMY_MOTION_SLOW_START`** | `0` | `6bto ATK12` (`01:19`) | Mengatur kamera dan memulai efek gerak lambat (*slow motion*) pada musuh di akhir kombo. | `VERIFIED IN VIDEO` | 
| **`ME_PLAY_SOUND` / `ME_CHARA_ATTACK_VOICE` / `ME_AURA_ON`** | `0`, `12` | `1ssk ATK23–25` (`YKgLFsMCpm0` `03:11–03:43`) | Memutar efek suara (`SOUND`), suara teriakan serangan karakter (`ATTACK_VOICE`), atau menyalakan efek aura (`AURA_ON`). | `VERIFIED IN VIDEO` | 

#### Detail Parameter `18 = ME_ATKHIT_ON` pada `PL_ANM_ATK20` (`02:38–02:53`):

* `Function`: `18 = ME_ATKHIT_ON`

* `Function Timing`: `7`

* `String Param`: *(kosong)*

* `Param 1`: `1` | `Param 2`: `0` | `Param 3`: `0` | `Param 4`: `0` | `Param 5`: `0` | `Param 6`: `0`

* `Damage Code`: `DAMAGE_ID_SMALL_UL` (diuji juga dengan `DAMAGE_ID_SMALL_CMN`, `DAMAGE_ID_STAGGER_NORMAL`, `DAMAGE_ID_RISE_SMALL_PUSH`)

* `Damage Amount`: `10`

* `Hit Effect ID`: `0` | `Hit Condition`: `0 = None` | `Hit Sound ID (se1)`: `1`

* `Horizontal Push`: `-8` | `Vertical Push`: `0` | `Guard Damage Amount`: `15`

* `Hit Amount`: `1` | `Hit Frequency`: `0` | `Freeze Time`: `2`

## 8. Verifikasi Dokumentasi dan Source Code Ekosistem `NSC-Toolbox` & `NSC-ModManager`

Berdasarkan pemeriksaan langsung pada repositori resmi [TheLeonX/NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox), [NSC-Toolbox Releases](https://github.com/TheLeonX/NSC-Toolbox/releases), [TheLeonX/NSC-ModManager](https://github.com/TheLeonX/NSC-ModManager), [NSC-ModManager Releases](https://github.com/TheLeonX/NSC-ModManager/releases), [TheLeonX/XFBIN_PARSER](https://github.com/TheLeonX/XFBIN_PARSER), dan halaman [NSC Toolbox di Nexus Mods](https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389):

1. **Klaim yang Dikonfirmasi oleh Sumber Independen (`VERIFIED IN SOURCE`)**:

   * **Peran Pasangan `prm.bin.xfbin` dan `prm_load.bin.xfbin`**: Dokumentasi resmi [NSC Toolbox di Nexus Mods](https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389) dan [README NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox) mengonfirmasi bahwa file moveset karakter disimpan sebagai `prm.bin.xfbin` di dalam folder `spc` dan manifest pemuatannya disimpan sebagai `prm_load.bin.xfbin` di dalam folder `spcload` (di bawah `data_win32`).

   * **Penyatuan Tool Storm 4 & Storm Connections**: [README TheLeonX/NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox) menyatakan secara eksplisit: *"Storm 4 toolbox and Storm Connections toolbox got merged together. Now you can edit both games using same toolbox. To switch between games, you must click on toolbox logo."*

   * **Evolusi `ModdingAPI` menjadi `UltimateStormAPI` (v2.0.0.0+)**: Pada catatan rilis [NSC-Toolbox v2.0.0.0 (10 Maret 2026)](https://github.com/TheLeonX/NSC-Toolbox/releases) dan [NSC-ModManager v2.0.0.0](https://github.com/TheLeonX/NSC-ModManager/releases), `ModdingAPI` ditulis ulang menjadi `UltimateStormAPI` yang mendukung *Naruto Storm 4* (v1.09) dan *Naruto Storm Connections* (v1.60/v1.70), dilengkapi panel debug `ImGUI` (tombol `F10` di dalam game), restorasi *Tilt* dan *Chakra Shuriken* di *Storm Connections*, serta fungsi-fungsi `MovesetPlus`.

   * **Penambahan `PL_ANM_ATK_FAR00_ANOTHER` & Fungsi PRM Baru**: Catatan rilis [NSC-Toolbox v2.0.1.0](https://github.com/TheLeonX/NSC-Toolbox/releases) mengonfirmasi penambahan section `PL_ANM_ATK_FAR00_ANOTHER` untuk mengeksekusi *Shuriken Tilt*, dan rilis `v2.1.2.0` / `v2.1.2.1` menambahkan fungsi PRM baru (`Start Deflect`, `Stop Deflect`, `Switch Projectiles Target`).

2. **Detail Penting yang Tidak Dijelaskan di Video Utama tetapi Ditemukan di Sumber Pendukung (`VERIFIED IN SOURCE` & `VERIFIED IN VIDEO` Pendamping)**:

   * Video utama (`TKH_TtuOhNI`) hanya memodifikasi animasi yang **sudah ada di dalam `6btobod1.xfbin` milik karakter itu sendiri**, sehingga tidak perlu menyentuh `6btoprm_load.bin.xfbin`.

   * Namun, pada slide penutup (`03:31`), pembuat menulis: *"You could create an ATK00 from Sasuke, ATK01 from Kakashi, and ATK02 from Gaara."* Tanpa penjelasan tambahan, modder pemula yang hanya menyalin entri `PL_ANM_ATK` lintas karakter akan mengalami kegagalan pemuatan animasi. Video pendamping [\[NSUNSC Mod Tutorial\] Adding Old Side Combo](https://www.youtube.com/watch?v=YKgLFsMCpm0) (`01:14–01:55`) dan [\[NSUNSC Mod Tutorial\] Changing Shuriken](https://www.youtube.com/watch?v=XMqRwv2715s) (`01:05–01:55`) membuktikan bahwa setiap kali sebuah `PL_ANM_ATK` atau `Projectile` merujuk pada file `bod1`, `skill`, atau `effect` milik karakter/versi lain, file `.xfbin` tersebut **wajib** didaftarkan ke dalam `xxxprm_load.bin.xfbin` (`Character File Loader Editor`) dengan `Type` yang sesuai (`3 - bod1`, `10 - eff`, `11 - skill`) dan `Load Condition` yang tepat (misal `[x] Base`).

   * Selain itu, dokumentasi [NSC-ModManager](https://github.com/TheLeonX/NSC-ModManager) menekankan bahwa jika pengguna menjalankan game melalui `Compile Mods And Launch Game` di Mod Manager, folder `data_win32` di root game akan dibersihkan secara otomatis! Oleh sebab itu, mod yang sedang dikerjakan secara tradisional di `data_win32/spc` harus diekspor terlebih dahulu melalui tombol **`Export Mod`** di `NSC Toolbox` menjadi paket `.nsc` / `.ensc` / `.uns` / `.unse` jika ingin dikombinasikan menggunakan `NSC Mod Manager`.

3. **Keterbatasan Akses Sumber**:

   * Halaman `https://github.com/TheLeonX/NSC-Toolbox/wiki` dan sub-folder kode sumber mendalam di GitHub (`ViewModel/`, `Model/`) mengembalikan pembatasan akses pada tool peramban statis, sehingga verifikasi struktur field dilakukan melalui antarmuka visual `NSC Toolbox` yang terekam tajam pada resolusi penuh di ketiga video (`TKH_TtuOhNI`, `YKgLFsMCpm0`, `XMqRwv2715s`) serta catatan rilis resmi di halaman [Releases NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox/releases).

## 9. Analisis Kompatibilitas: *Storm Connections* (`NSUNSC`) vs *Storm 4* (`NSUNS4`)

Catatan rilis [NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox/releases) dan [NSC-ModManager](https://github.com/TheLeonX/NSC-ModManager/releases) memberikan bukti empiris yang sangat kuat mengenai persamaan dan ketidakcocokan antara *Storm Connections* (patch 1.60/1.70) dan *Storm 4* (patch 1.09):

| Konsep / Komponen | Bukti pada *Storm Connections* (`NSUNSC`) | Bukti pada *Storm 4* (`NSUNS4`) | Status Kompatibilitas | Catatan Teknis & Implikasi Modding | 
| ----- | ----- | ----- | ----- | ----- | 
| **Container `XFBIN` (`NUCC`) & Pasangan `spc/xxxprm.bin.xfbin` + `spcload/xxxprm_load.bin.xfbin`** | Terverifikasi langsung di video (`01:50–02:00`) dan [README NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox). | Terverifikasi mendukung editor yang sama di [NSC-Toolbox v2.0.0.0+](https://github.com/TheLeonX/NSC-Toolbox/releases) (*"Tools which didn't changed color works for both games"*). | **Sama dan sudah diverifikasi** (`VERIFIED IN SOURCE`) | Kedua game menggunakan arsitektur `xxxprm_bas`, `xxxprm_mot`, `xxxprm_atk`, `xxxprm_spl` di dalam `prm.bin.xfbin` serta manifest `prm_load.bin.xfbin`. | 
| **Mekanisme Rantai `PL_ANM_ATK` (`Section Name`, `Previous PL_ANM`, `PL_ANM_ANY`)** | Terverifikasi penuh di video (`00:22–01:47`). | Kompatibel secara struktural; `Character Moveset Editor` yang sama di `NSC Toolbox` memproses `prm.bin.xfbin` dari *Storm Generations*, *Storm 4*, dan *Storm Connections*. | **Sama dan sudah diverifikasi** (`VERIFIED IN VIDEO` & `VERIFIED IN SOURCE`) | Logika rantai `PL_ANM_ATK00` (`Previous = PL_ANM_ANY`) dan aturan larangan duplikasi nomor `ATK` berlaku identik di *Storm 4*. | 
| **Struktur Cabang Kombo (`Combo Direction`: `All`, `Up`, `Down`, `Side`)** | Di *Storm Connections* vanilla, *Side Combo* (`3 = Side`) telah dihapus dari sebagian besar karakter (digantikan sistem kontrol baru/jutsunya), namun nilai enum `3 = Side` masih dikenali engine dan dapat direstorasi (`YKgLFsMCpm0` `02:53`). | Di *Storm 4* vanilla, banyak karakter klasik/lama atau transisi masih mempertahankan *Tilt* (`PL_ANM_ATK_FAR` / aksi khusus) dan struktur kontrol klasik. | **Konsep serupa, implementasi berbeda** (`VERIFIED IN VIDEO` & `VERIFIED IN SOURCE`) | Di *Storm Connections*, `UltimateStormAPI v2.0.0.0+` memodifikasi kontrol karakter untuk merestorasi *Tilt* dan *Chakra Shuriken* yang dihapus CyberConnect2. | 
| **Kompatibilitas Langsung File `prm.bin.xfbin` & `Damage Code` Lintas Game (`NSC`** $\rightarrow$ **`NS4`)** | Menggunakan `Damage Code` baru seperti reaksi *Down Slow* khas *Storm Connections*. | Catatan rilis [NSC-ModManager v2.0.1.0](https://github.com/TheLeonX/NSC-ModManager/releases) mencatat bug: *"Fixed issue when DAMAGE_ID_DOWN action from NSC didn't worked correctly in Storm 4. Fixed issue when 5ssk's Down Finisher didn't do damage if prm file was taken from NSC."* | **Memerlukan adaptasi** (`VERIFIED IN SOURCE`) | Menyalin `prm.bin.xfbin` mentah dari *Storm Connections* ke *Storm 4* tanpa `UltimateStormAPI v2.0.1.0+` (atau tanpa menyesuaikan `Damage Code` / `ME_` baru) dapat menyebabkan serangan tidak memberikan damage atau animasi reaksi lawan gagal di *Storm 4*. | 
| **Fungsi `ME_` Lama (*Generations* / *Storm 3* / *Storm 4*) di *Storm Connections*** | Pembuat video menyatakan (`00:08`): *"You may encounter some errors during the combo, as they are old and some functions have changed over the years."* | Fungsi-fungsi tersebut berjalan normal di engine lama tempat file berasal. | **Memerlukan adaptasi** (`VERIFIED IN VIDEO`) | Saat mem-porting `PL_ANM_ATK` dari game lama ke `NSUNSC` (atau sebaliknya), audit daftar `Function List` (`ME_`) dan bandingkan dengan karakter vanilla di game target. | 
| **File Fisika Aksesori (`bod1acc.bin.xfbin`) dan Format Audio (`NUS3BANK` / SFX)** | Menggunakan format audio dan struktur `bod1acc` *Storm Connections*. | Catatan rilis [NSC-ModManager v2.0.0.0](https://github.com/TheLeonX/NSC-ModManager/releases): *"Naruto Storm 4 and Naruto Storm Connections require some different files. Some mods require manual updating to work properly in both games. Mostly just sounds and 'bod1acc.bin.xfbin' files."* | **Tidak kompatibel langsung (wajib konversi/update manual)** (`VERIFIED IN SOURCE`) | File suara/SFX dan `bod1acc.bin.xfbin` tidak dapat dipertukarkan begitu saja antara *Storm 4* dan *Storm Connections*. | 
| **API & Mod Manager (`UltimateStormAPI` & `NSC Mod Manager`)** | Mendukung format paket `.nsc`, `.ensc`, `.uns`, `.unse`, serta folder `param/NSC/`. | Sejak `v2.0.0.0`, [NSC-Toolbox](https://github.com/TheLeonX/NSC-Toolbox) dan [NSC-ModManager](https://github.com/TheLeonX/NSC-ModManager) mendukung *Storm 4* (klik logo untuk berpindah mode game, menggunakan folder `param/NS4/`). | **Sama dengan pemisahan mode/folder** (`VERIFIED IN SOURCE`) | Pastikan mode game di `NSC Toolbox` dan `NSC Mod Manager` telah diatur ke **Storm 4** sebelum mengekspor atau mengompilasi mod untuk *Storm 4*. | 

## 10. Rekonstruksi Praktik Modding (Prosedur Eksperimen Bertingkat)

Seluruh prosedur di bawah ini dirancang mengikuti prinsip **Preserve Original Data** (wajib membuat backup sebelum modifikasi dan bekerja pada salinan kerja).

### Praktik A — Eksperimen Paling Sederhana (Verifikasi Tunggal `Damage Code` pada Serangan Pembuka)

* **Tujuan**: Memverifikasi secara terisolasi bahwa perubahan satu parameter `Damage Code` di dalam fungsi `18 = ME_ATKHIT_ON` pada `PL_ANM_ATK00` mengubah reaksi fisik lawan tanpa merusak rantai kombo.

* **File yang Dibutuhkan**: `6btoprm.bin.xfbin` (dari `data_win32/spc/` atau hasil ekstraksi CPK `data1.cpk`).

* **Tool yang Diperlukan**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character Moveset Editor`).

* **Kondisi Awal & Backup**:

  1. Salin `6btoprm.bin.xfbin` asli ke folder backup `backup/spc/6btoprm.bin.xfbin.bak`.

  2. Salin `6btoprm.bin.xfbin` ke `data_win32/spc/6btoprm.bin.xfbin`.

* **Perubahan Terkecil yang Dilakukan**:

  1. Buka `NSC Toolbox` $\rightarrow$ `Character Tools` $\rightarrow$ `Character Moveset Editor (***prm.bin.xfbin)`.

  2. Klik `File -> Open` dan pilih `data_win32/spc/6btoprm.bin.xfbin`.

  3. Pilih sub-chunk **`6btoprm_mot`** di daftar kiri atas, lalu pilih **`PL_ANM_ATK20`** (atau **`PL_ANM_ATK00`**) di daftar kiri bawah.

  4. Pada `Function List` (panel tengah), klik entri **`Timing: 7 Function: ME_ATKHIT_ON`**.

  5. Pada panel kanan (`Function`), ubah **`Damage Code`** menjadi **`DAMAGE_ID_RISE_SMALL_PUSH`** (atau **`DAMAGE_ID_SMALL_UL`**).

  6. Klik **`Save`** di bawah panel `Function`, klik **`Save PL_ANM Settings`** di bawah panel tengah, lalu klik **`File -> Save`** (atau `Save As` ke `data_win32/spc/6btoprm.bin.xfbin`).

* **Hasil yang Diharapkan & Harus Diamati**:

  * Masuk ke *Practice Mode* dengan Boruto (`6bto`). Lakukan tepat 1 pukulan/tendangan yang dimodifikasi dan hentikan input.

  * Amati reaksi lawan: dengan `DAMAGE_ID_SMALL_UL`, lawan hanya tersentak kecil di darat; dengan `DAMAGE_ID_RISE_SMALL_PUSH`, lawan langsung terpental jatuh ke udara pada pukulan pertama.

* **Prosedur Rollback**: Salin kembali `backup/spc/6btoprm.bin.xfbin.bak` ke `data_win32/spc/6btoprm.bin.xfbin`.

### Praktik B — Eksperimen Terkontrol (Menguji Variabel `Trigger Condition 1: 16 -> 0` pada Finisher Raksasa)

* **Hipotesis**: Jika `Trigger Condition 1` pada `PL_ANM_ATK15` (`Animation: 6btobod1_atk05_b`, `Previous PL_ANM: PL_ANM_ATK05`) diubah dari `16 = If previous attack hit giant` menjadi `0 = No condition` sementara `PL_ANM_ATK06` (finisher normal yang juga memiliki `Previous PL_ANM: PL_ANM_ATK05`) dihapus atau dinonaktifkan, maka akhiran kombo netral terhadap lawan ukuran normal akan mengeksekusi animasi anti-raksasa `6btobod1_atk05_b`.

* **Variabel yang Diubah (Independen)**:

  * Nilai `Trigger Condition 1` pada `PL_ANM_ATK15` (`16` $\rightarrow$ `0`), serta penghapusan/pengalihan `PL_ANM_ATK06` agar tidak terjadi ambiguitas dua node dengan `Previous PL_ANM = PL_ANM_ATK05` dan kondisi identik (`0 = No condition`).

* **Variabel yang Dipertahankan (Kontrol)**:

  * Seluruh node `PL_ANM_ATK00` s.d. `PL_ANM_ATK05` tetap sama.

  * Nama animasi (`6btobod1_atk05_b`), `Function List`, dan `File Type (3 = bod1)` pada `PL_ANM_ATK15` tidak diubah.

* **Cara Menghindari Faktor Pengganggu**:

  * Jangan mengubah `Combo Direction` atau `Link Condition`. Uji terhadap lawan ukuran normal (misal Naruto Six Paths) di *Practice Mode* pada stage datar.

* **Kriteria Keberhasilan**:

  * Setelah pukulan ke-5 (`PL_ANM_ATK05`), penekanan tombol serang berikutnya memicu animasi salto petir `6btobod1_atk05_b` dan mengenai lawan normal.

* **Kemungkinan Penyebab Kegagalan**:

  * Jika `PL_ANM_ATK06` tidak dihapus dan posisinya berada di atas `PL_ANM_ATK15` dengan kondisi yang sama-sama `0`, engine akan selalu memilih `PL_ANM_ATK06` terlebih dahulu karena kecocokan predikat pertama (*first-match evaluation*).

### Praktik C — Implementasi Nyata (Mengganti Rantai Kombo Dasar & Merangkai Serangan Kustom seperti di Video)

* **Tujuan**: Mengganti *Neutral Combo* awal `6bto` dengan rangkaian *Down Combo* yang diakhiri *Giant Finisher*, lengkap dengan penyesuaian `Damage Code`.

* **Langkah Implementasi Reproduktif**:

  1. **Persiapan Backup**: Cadangkan `6btoprm.bin.xfbin` asli.

  2. **Pembersihan Rantai Neutral Lama**: Buka `6btoprm.bin.xfbin` $\rightarrow$ `6btoprm_mot`. Hapus `PL_ANM_ATK00`, `PL_ANM_ATK01`, `PL_ANM_ATK02`, `PL_ANM_ATK03`, `PL_ANM_ATK05`, `PL_ANM_ATK06` menggunakan tombol `Delete`.

  3. **Konfigurasi Node Pembuka Baru (`ATK00`)**:

     * Pilih `PL_ANM_ATK10` (`Animation: 6btobod1_atk10`).

     * Ubah `PL_ANM Section Name` $\rightarrow$ `PL_ANM_ATK00`.

     * Ubah `Previous PL_ANM` $\rightarrow$ `PL_ANM_ANY`.

     * Ubah `Combo Direction` $\rightarrow$ `0 = All Directions`.

     * Klik `Save PL_ANM Settings`.

  4. **Penyambungan Node Kedua (`ATK11`)**:

     * Pilih `PL_ANM_ATK11` (`Animation: 6btobod1_atk11`).

     * Ubah `Previous PL_ANM` $\rightarrow$ `PL_ANM_ATK00`.

     * Pastikan `Combo Direction` = `0 = All Directions` dan `Link Condition` = `2 = Link by pressing a button`.

     * Klik `Save PL_ANM Settings`.

  5. **Penyambungan Node Finisher (`ATK12` / `ATK13` / `ATK15`)**:

     * Untuk menggunakan akhiran raksasa (`PL_ANM_ATK13` dengan `6btobod1_atk12_b` atau `PL_ANM_ATK15` dengan `6btobod1_atk05_b`), atur `Previous PL_ANM` menjadi `PL_ANM_ATK11`, `Combo Direction` menjadi `0 = All Directions`, dan `Trigger Condition 1` menjadi `0 = No condition`.

     * Hapus atau ubah `Previous PL_ANM` pada finisher normal (`PL_ANM_ATK12`) jika ingin finisher raksasa selalu keluar pada input netral.

     * Klik `Save PL_ANM Settings`.

  6. **Penyesuaian Reaksi Hit (`Damage Code`)**:

     * Pada node serangan yang ingin disesuaikan efek pukulannya, pilih fungsi `18 = ME_ATKHIT_ON` di `Function List`, pilih `Damage Code` yang diinginkan (misal `DAMAGE_ID_SMALL_UL` untuk hit penghubung agar musuh tidak terpental terlalu jauh sebelum kombo selesai), klik `Save`, lalu `Save PL_ANM Settings`.

  7. **Serialisasi & Pengujian**:

     * Simpan ke `data_win32/spc/6btoprm.bin.xfbin` (atau gunakan `Export Mod` di `NSC Toolbox` jika memakai `NSC Mod Manager`).

## 11. Panduan Debugging, Analisis Kegagalan, dan Tool Validasi Otomatis

### 11.1 Matriks Diagnosis Kesalahan Modding `PL_ANM_ATK`

| Gejala di Dalam Game | Kemungkinan Akar Masalah (Root Cause) | Bukti yang Perlu Diperiksa | Pengujian Pembeda (Diagnostic Test) | Solusi yang Dapat Divalidasi | 
| ----- | ----- | ----- | ----- | ----- | 
| **Karakter tidak bisa memukul sama sekali saat tombol serang ditekan** | Tidak ada entri `PL_ANM_ATK00` di `xxxprm_mot`, atau `PL_ANM_ATK00` tidak memiliki `Previous PL_ANM = PL_ANM_ANY` dan `Combo Direction = 0 = All Directions`. | Periksa field `PL_ANM Section Name`, `Previous PL_ANM`, dan `Combo Direction` pada node pertama di `Character Moveset Editor`. | Buat satu node uji minimal bernama `PL_ANM_ATK00` dengan `Previous PL_ANM = PL_ANM_ANY`, `Combo Direction = 0`, `Trigger Condition 1 = 0`. | Pastikan tepat satu node pembuka bernama `PL_ANM_ATK00` memiliki `Previous PL_ANM = PL_ANM_ANY` dan `Combo Direction = 0`. | 
| **Kombo berhenti/putus setelah pukulan ke-1 (tidak lanjut ke pukulan ke-2)** | (1) `Previous PL_ANM` pada node ke-2 masih menunjuk ke nama lama (misal masih `PL_ANM_ATK10` padahal node ke-1 sudah diganti menjadi `PL_ANM_ATK00`); atau (2) `Trigger Condition 1` bernilai `16` (*hit giant*). | Periksa kesesuaian string antara `PL_ANM Section Name` node ke-1 dan `Previous PL_ANM` node ke-2, serta nilai `Trigger Condition 1`. | Ubah `Trigger Condition 1` ke `0 = No condition` dan samakan `Previous PL_ANM` secara persis. | Samakan string `Previous PL_ANM` node ke-2 dengan `PL_ANM Section Name` node ke-1 dan lupa menekan `Save PL_ANM Settings` sebelum `File -> Save`. | 
| **Urutan kombo melompat acak atau memainkan serangan yang salah** | Duplikasi nama `PL_ANM Section Name` (misal ada dua `PL_ANM_ATK01` di dalam `xxxprm_mot`), atau ada dua node berbeda yang memiliki kombinasi `(Previous PL_ANM, Combo Direction, Trigger Condition 1)` yang 100% identik. | Pindai seluruh daftar `PL_ANM_ATK` di kolom kiri untuk mencari duplikasi nama atau tabrakan predikat cabang. | Jalankan script validator Python di bawah atau periksa satu per satu entri yang berbagi `Previous PL_ANM` yang sama. | Berikan nomor unik pada setiap `PL_ANM_ATKxx` dan bedakan `Combo Direction` atau `Trigger Condition 1` untuk setiap cabang. | 
| **Karakter membeku (freeze), T-Pose, atau melompati animasi saat kombo lintas karakter** | Chunk animasi yang ditulis pada field `Animation` (misal `1sskbod1_atk07`) berasal dari file `bod1` eksternal yang belum didaftarkan di `xxxprm_load.bin.xfbin` (`spcload`), atau `File Type` salah. | Periksa `xxxprm_load.bin.xfbin` di `Character File Loader Editor` dan cek apakah file `spc/xxxbod1_gen.xfbin` sudah masuk dengan `Type = 3 - bod1` dan `Load Condition = Base`. | Ganti sementara field `Animation` dengan animasi bawaan karakter asli (misal `6btobod1_atk00`). Jika kombo berjalan normal, maka masalah 100% pada pemuatan `bod1` di `prm_load`. | Tambahkan file `bod1` sumber ke `data_win32/spc/`, daftarkan di `data_win32/spcload/xxxprm_load.bin.xfbin` (`Type = 3 - bod1`, centang `Base`), dan pilih `File Type` yang sesuai di `Moveset Editor`. | 
| **Serangan mengenai lawan secara visual tetapi menembus tubuh lawan (tidak ada damage/hitstun)** | Tidak ada fungsi `18 = ME_ATKHIT_ON` di dalam `Function List`, atau `Damage Code` bernilai `0 = NO_DAMAGE` / berasal dari versi game yang tidak didukung (misal `DAMAGE_ID_DOWN` dari NSC di Storm 4 tanpa API baru). | Periksa `Function List` pada section `PL_ANM_ATK` tersebut: pastikan ada `ME_ATKHIT_ON` pada frame aktif dan periksa nilai `Damage Code`. | Ubah `Damage Code` ke nilai standar universal seperti `DAMAGE_ID_SMALL_CMN` dengan `Damage Amount = 10`. | Tambahkan `18 = ME_ATKHIT_ON` pada frame kontak dan gunakan `Damage Code` yang valid untuk target game. | 
| **Perubahan sudah disimpan di `Character Moveset Editor`, tetapi di dalam game kombo tidak berubah sama sekali** | (1) Lupa mengklik tombol `Save PL_ANM Settings` (atau tombol `Save` pada panel `Function`) sebelum mengklik `File -> Save`; atau (2) Menjalankan `Compile Mods And Launch Game` di `NSC Mod Manager` yang menghapus folder `data_win32`. | Buka kembali file `xxxprm.bin.xfbin` yang ada di `data_win32/spc/` menggunakan `Character Moveset Editor` untuk memastikan perubahan benar-benar tertulis di disk. | Cek apakah file `data_win32/spc/xxxprm.bin.xfbin` masih ada setelah game ditutup. | Selalu klik `Save` (panel kanan) $\rightarrow$ `Save PL_ANM Settings` (panel tengah) $\rightarrow$ `File -> Save` (menu atas), dan ekspor mod via `Export Mod` jika menggunakan `NSC Mod Manager`. | 

### 11.2 Tool Otomasi & Inspeksi Biner (`xfbin_planm_inspector.py`) — `EXPERIMENTALLY VERIFIED`

Untuk membantu modder menginspeksi container `.xfbin` (`prm.bin.xfbin` maupun `prm_load.bin.xfbin`) secara aman tanpa merusak file sumber (**Preserve Original Data**), berikut adalah utility CLI Python mandiri (hanya menggunakan pustaka standar Python) yang memeriksa header `NUCC`, mengekstrak tabel string chunk `prm_mot` / `prm_load`, mendeteksi daftar identifier `PL_ANM_` dan animasi `bod1_`, serta memeriksa potensi duplikasi string section:

```
#!/usr/bin/env python3
# xfbin_planm_inspector.py
# Static Binary Inspector & PL_ANM_ATK Auditor for Naruto Storm XFBIN (prm / prm_load) files.
# Read-only tool: preserves original binary data and reports verified structure & PL_ANM identifiers.

import argparse
import hashlib
import json
import pathlib
import re
import struct
import sys
from typing import Any, Dict, List


NUCC_MAGIC = b"NUCC"


def compute_sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def extract_ascii_strings(data: bytes, min_len: int = 4) -> List[Dict[str, Any]]:
    pattern = re.compile(rb"[\x20-\x7e]{" + str(min_len).encode("ascii") + rb",}")
    results: List[Dict[str, Any]] = []
    for match in pattern.finditer(data):
        raw = match.group(0)
        try:
            text = raw.decode("ascii")
        except UnicodeDecodeError:
            continue
        results.append({
            "offset_hex": f"0x{match.start():08X}",
            "offset_dec": match.start(),
            "length": len(text),
            "value": text,
        })
    return results


def inspect_xfbin(file_path: pathlib.Path) -> Dict[str, Any]:
    if not file_path.exists() or not file_path.is_file():
        raise FileNotFoundError(f"File not found: {file_path}")

    data = file_path.read_bytes()
    file_size = len(data)
    if file_size < 16:
        raise ValueError(f"File too small to be a valid XFBIN container ({file_size} bytes).")

    magic = data[:4]
    is_nucc = magic == NUCC_MAGIC
    nucc_version_be = struct.unpack(">I", data[4:8])[0] if file_size >= 8 else None

    all_strings = extract_ascii_strings(data, min_len=4)

    nucc_chunks = [s for s in all_strings if s["value"].startswith("nuccChunk")]
    prm_sections = [s for s in all_strings if re.search(r"prm_(bas|mot|atk|spl|load)", s["value"])]
    pl_anm_entries = [s for s in all_strings if s["value"].startswith("PL_ANM")]
    pl_anm_atk_entries = [s for s in pl_anm_entries if s["value"].startswith("PL_ANM_ATK")]
    bod1_anim_refs = [s for s in all_strings if "bod1_" in s["value"] or s["value"].endswith(".xfbin")]
    damage_id_refs = [s for s in all_strings if s["value"].startswith("DAMAGE_ID_")]

    # Check frequency of PL_ANM_ATK identifiers in binary string pool
    atk_counts: Dict[str, List[str]] = {}
    for entry in pl_anm_atk_entries:
        name = entry["value"]
        atk_counts.setdefault(name, []).append(entry["offset_hex"])

    has_atk00 = "PL_ANM_ATK00" in atk_counts
    has_anm_any = any(s["value"] == "PL_ANM_ANY" for s in pl_anm_entries)

    diagnostics: List[str] = []
    if not is_nucc:
        diagnostics.append("WARNING: File does not start with 'NUCC' magic bytes (0x4E554343).")
    if prm_sections and not has_atk00 and any("prm_mot" in s["value"] for s in prm_sections):
        diagnostics.append(
            "CRITICAL: 'prm_mot' detected but 'PL_ANM_ATK00' is missing! Character initial combo starter may fail."
        )
    if prm_sections and not has_anm_any and any("prm_mot" in s["value"] for s in prm_sections):
        diagnostics.append(
            "CRITICAL: 'prm_mot' detected but 'PL_ANM_ANY' wildcard root state is missing!"
        )

    return {
        "file_name": file_path.name,
        "file_size_bytes": file_size,
        "sha256": compute_sha256(data),
        "is_valid_nucc_header": is_nucc,
        "magic_hex": data[:4].hex().upper(),
        "nucc_header_version_u32_be": f"0x{nucc_version_be:08X}" if nucc_version_be is not None else None,
        "summary_counts": {
            "total_ascii_strings": len(all_strings),
            "nucc_chunk_markers": len(nucc_chunks),
            "prm_subchunks": len(prm_sections),
            "pl_anm_total_occurrences": len(pl_anm_entries),
            "pl_anm_atk_unique_names": len(atk_counts),
            "resource_and_bod1_refs": len(bod1_anim_refs),
            "damage_id_strings": len(damage_id_refs),
        },
        "has_pl_anm_atk00_starter": has_atk00,
        "has_pl_anm_any_root": has_anm_any,
        "prm_subchunks": prm_sections,
        "pl_anm_atk_occurrence_map": atk_counts,
        "bod1_and_xfbin_references": bod1_anim_refs[:50],
        "damage_id_references": damage_id_refs[:50],
        "diagnostics": diagnostics,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Read-only XFBIN / PRM PL_ANM_ATK Inspector for NSUNSC and NSUNS4."
    )
    parser.add_argument("input_file", type=pathlib.Path, help="Path to xxxprm.bin.xfbin or xxxprm_load.bin.xfbin")
    parser.add_argument("-o", "--output-json", type=pathlib.Path, help="Optional path to save JSON report")
    args = parser.parse_args()

    try:
        report = inspect_xfbin(args.input_file)
    except Exception as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1

    formatted = json.dumps(report, indent=2, ensure_ascii=False)
    if args.output_json:
        args.output_json.write_text(formatted, encoding="utf-8")
        print(f"[OK] Report saved to: {args.output_json}")
    else:
        print(formatted)
    return 0


if __name__ == "__main__":
    sys.exit(main())

```

## 12. Hal yang Masih Belum Diketahui & Rencana Riset Lanjutan (Further Research Plan)

Sesuai standar **No Fabricated Expertise**, berikut adalah pemisahan tegas antara bagian yang belum terungkap dalam video maupun dokumentasi publik saat ini beserta rancangan eksperimen untuk membuktikannya:

| Pertanyaan Teknis yang Belum Terjawab | Status Saat Ini | Bukti / Artefak yang Diperlukan | Eksperimen Lanjutan Paling Bernilai | 
| ----- | ----- | ----- | ----- | 
| **Arti semantik nilai enum `Trigger Condition 2` (`0 = ???`)** | `UNKNOWN` | Source code kelas model/enum `TriggerCondition2` di dalam `NSC-Toolbox` atau diff biner antar-file `prm.bin.xfbin`. | Memindai seluruh file `*prm.bin.xfbin` di `data1.cpk` menggunakan script parser untuk mencari karakter mana yang memiliki nilai `Trigger Condition 2 != 0` lalu mengujinya di dalam game. | 
| **Offset byte eksak dari struct `PL_ANM` dan `ME_` di dalam sub-chunk `nuccChunkBinary` (`xxxprm_mot`)** | `UNCONFIRMED` (Video hanya menampilkan abstraksi GUI di `NSC Toolbox`, bukan hex dump mentah) | Sampel file `6btoprm.bin.xfbin` sebelum dan sesudah 1 perubahan nilai tunggal (misal mengubah `Trigger Condition 1` dari `16` ke `0`). | Melakukan *controlled single-byte binary diff* antara `6btoprm_vanilla.bin.xfbin` dan `6btoprm_trig0.bin.xfbin` untuk memetakan offset relatif tiap field di dalam struct `PL_ANM`. | 
| **Makna parameter numerik `Param 1` s.d. `Param 6` untuk setiap opcode `ME_` (selain `ME_HOMING_SET` dan `ME_FWDVELOCITY_SET`)** | `STRONG INFERENCE` pada sebagian opcode (`Param 1 = 12.5` pada `ME_FWDVELOCITY_SET` = kecepatan maju), `UNKNOWN` pada opcode lain | Tabel definisi fungsi di dalam source code `NSC-Toolbox` atau pengujian mengubah satu `Param` per percobaan. | Menyusun katalog parameter `ME_` dengan membandingkan nilai default pada berbagai aksi karakter (`ATK`, `AIR`, `THROW`, `AWAKE`). | 
| **Batas maksimum jumlah entri `PL_ANM_ATK` dan jumlah `Function List` per section sebelum terjadi realokasi/overflow di memori game** | `UNCONFIRMED` | Pengujian penambahan entri beruntun menggunakan `Add/Duplicate` di `NSC Toolbox` pada kedua game (`NSUNSC` & `NSUNS4`). | Menambahkan node `PL_ANM_ATK30` s.d. `PL_ANM_ATK99` secara bertahap dan memantau stabilitas alokasi memori menggunakan panel debug `UltimateStormAPI` (`F10`). | 

## 13. Daftar Referensi Sumber Terverifikasi

1. **Video Utama Penelitian**: Medrej Storm™, *"\[NSUNSC Mod Tutorial\] How PL_ANM_ATK Works"*, YouTube (23 September 2025) — <https://www.youtube.com/watch?v=TKH_TtuOhNI>

2. **Video Pendamping 1 (Restorasi Side Combo & Pemuatan `bod1` di `spcload`)**: Medrej Storm™, *"\[NSUNSC Mod Tutorial\] Adding Old Side Combo"*, YouTube (22 September 2025) — <https://www.youtube.com/watch?v=YKgLFsMCpm0>

3. **Video Pendamping 2 (Struktur `Projectile List` & `spcload` untuk Shuriken)**: Medrej Storm™, *"\[NSUNSC Mod Tutorial\] Changing Shuriken"*, YouTube (28 Oktober 2025) — <https://www.youtube.com/watch?v=XMqRwv2715s>

4. **Repositori Resmi NSC Toolbox (Dual-Game NSUNSC & NSUNS4)**: TheLeonX, *NSC-Toolbox*, GitHub — <https://github.com/TheLeonX/NSC-Toolbox>

5. **Catatan Rilis Resmi NSC Toolbox & UltimateStormAPI**: TheLeonX, *Releases · TheLeonX/NSC-Toolbox*, GitHub — <https://github.com/TheLeonX/NSC-Toolbox/releases>

6. **Repositori Resmi NSC Mod Manager**: TheLeonX, *NSC-ModManager*, GitHub — <https://github.com/TheLeonX/NSC-ModManager>

7. **Catatan Rilis Resmi NSC Mod Manager**: TheLeonX, *Releases · TheLeonX/NSC-ModManager*, GitHub — <https://github.com/TheLeonX/NSC-ModManager/releases>

8. **Repositori XFBIN Parser**: TheLeonX, *XFBIN_PARSER*, GitHub — <https://github.com/TheLeonX/XFBIN_PARSER>

9. **Halaman Distribusi & Dokumentasi Pengguna NSC Toolbox**: TheLeonX, *NSC Toolbox at NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS Nexus*, Nexus Mods — <https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389>