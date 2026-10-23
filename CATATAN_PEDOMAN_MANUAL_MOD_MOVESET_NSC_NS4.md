# BUKU CATATAN & PEDOMAN LENGKAP MODDING MANUAL MOVESET (NSUNS4 & NSUNSC)

**Disusun dari Hasil Rekayasa Balik 6 Video Tutorial YouTube Medrej Storm™, Dokumentasi Resmi NSC Toolbox / NSC Mod Manager, serta Audit Biner HxD & XFBIN**

Dokumen ini merangkum seluruh ilmu, aturan mesin (*engine rules*), langkah kerja di **NSC Toolbox** dan **HxD Hex Editor**, serta temuan perbaikan bug dari pengujian langsung di *Naruto Shippuden: Ultimate Ninja Storm 4* (`NSUNS4`) dan *Naruto x Boruto: Ultimate Ninja Storm Connections* (`NSUNSC`). Gunakan catatan ini sebagai pedoman kerja saat Anda ingin memodifikasi atau merakit moveset secara manual.


## BAGIAN 1 — DAFTAR SUMBER UTAMA & FUNGSI MASING-MASING TUTORIAL

Seluruh pedoman di dalam catatan ini dirangkum dan diverifikasi dari sumber-sumber berikut:

| No | Sumber / Judul Video Tutorial | Link Referensi | Durasi | Ilmu Utama yang Dipelajari untuk Modding Manual |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **[NSUNSC Mod Tutorial] How PL_ANM_ATK Works** *(Medrej Storm™)* | [YouTube (`TKH_TtuOhNI`)](https://www.youtube.com/watch?v=TKH_TtuOhNI) | `03:47` | Cara kerja rantai state kombo darat (`PL_ANM Section Name` & `Previous PL_ANM`), aturan serangan pembuka (`PL_ANM_ATK00` + `PL_ANM_ANY`), membuka kunci gerakan lawan raksasa (`Trigger Condition 1: 16 -> 0`), dan mengatur efek terpental lawan (`18 = ME_ATKHIT_ON` $ightarrow$ `Damage Code`). |
| **2** | **[NSUNSC Mod Tutorial] Adding Old Side Combo** *(Medrej Storm™)* | [YouTube (`YKgLFsMCpm0`)](https://www.youtube.com/watch?v=YKgLFsMCpm0) | `04:33` | Cara menambahkan cabang kombo ke-4 (*Side Combo* dengan `Combo Direction = Side`), mendaftarkan file `bod1` kedua dari karakter yang sama (`1sskbod1_gen.xfbin`) di `prm_load.bin.xfbin`, dan memilih slot `File Type` kedua di Moveset Editor tanpa perlu HxD. |
| **3** | **[NSUNSC Mod Tutorial] Changing Shuriken** *(Medrej Storm™)* | [YouTube (`XMqRwv2715s`)](https://www.youtube.com/watch?v=XMqRwv2715s) | `03:10` | Cara mengganti proyektil `SYURIKEN`, `CHAKRA_SYURIKEN`, dan `AWA_SYURIKEN` di tab `Projectile List` serta mendaftarkan pasangan file `skill` dan `eff1` di `prm_load.bin.xfbin`. |
| **4** | **[NSUNSC Mod Tutorial] Changing Grab** *(Medrej Storm™)* | [YouTube (`K_DrvEl2XBE`)](https://www.youtube.com/watch?v=K_DrvEl2XBE) | `04:33` | Cara memindahkan animasi dari **karakter berbeda** menggunakan **HxD Hex Editor** (`[char]00t0` pertama $ightarrow$ `1cmnbod1`, sisanya $ightarrow$ `1cmn00t0`), mengganti 3 section wajib Grab (`THROW_BEGIN`, `SUCCESS_ATTACKER`, `SUCCESS_VICTIM`), memetakan efek `COMBO11`/`12`, serta mencentang `Enable Outlaw Max` dan mematikan `Enable Face Animations`. |
| **5** | **[NSUNSC Mod Tutorial] Changing Air Combo** *(Medrej Storm™)* | [YouTube (`TcxS3Ues9TI`)](https://www.youtube.com/watch?v=TcxS3Ues9TI) | `06:45` | Cara mengganti rantai kombo udara (`PL_ANM_ATK_AIR00` s.d. `PL_ANM_ATK_AIR05`), menjaga karakter tetap melayang di udara (`ME_FLOATING_ON` / `OFF`), dan menghindari sisa node kombo udara lama. |
| **6** | **[NSUNSC Mod Tutorial] Changing Ultimate Jutsu** *(Medrej Storm™)* | [YouTube (`DgEzO1SHwKk`)](https://www.youtube.com/watch?v=DgEzO1SHwKk) | `06:11` | Cara mengedit sub-chunk khusus **`xxxprm_spl`** (`Ultimate Jutsu [1]`), memetakan 7 state `PL_ANM_SPSKILL1_*` (`CUTIN_NC`, `CUTIN`, `START`, `HIT`, `DEMO_DMG`, `DEMO_ATK_END`, `TEAM_WAIT`), mengatur efek cut-in (`SPSKILL_CUTIN_EFF_*`), dan mencentang `Load Condition: Ultimate Jutsu 1`. |
| **7** | **NSC Toolbox & UltimateStormAPI** *(TheLeonX)* | [GitHub Repo](https://github.com/TheLeonX/NSC-Toolbox) \| [Releases](https://github.com/TheLeonX/NSC-Toolbox/releases) \| [Nexus Mods](https://www.nexusmods.com/narutoxborutoultimateninjastormconnections/mods/389) | — | Dokumentasi dual-game (*Storm 4* & *Storm Connections* digabung dalam satu Toolbox; klik logo Toolbox untuk berpindah game), aturan `Export Mod`, dan daftar fungsi baru. |
| **8** | **NSC Mod Manager** *(TheLeonX)* | [GitHub Repo](https://github.com/TheLeonX/NSC-ModManager) \| [Releases](https://github.com/TheLeonX/NSC-ModManager/releases) | — | Perbedaan kompatibilitas file `prm`, `DAMAGE_ID_DOWN`, `bod1acc.bin.xfbin`, dan suara antara *Storm Connections* dan *Storm 4*. |


## BAGIAN 2 — ARSITEKTUR DASAR FILE MOVESET: APA SAJA YANG HARUS DIEDIT?

Dalam mesin game CyberConnect2 (`NUCC` / `.xfbin`), modifikasi moveset selalu melibatkan **dua lapis file utama**:

### 2.1 Lapis 1 — File Loader / Manifest (`data_win32/spcload/xxxprm_load.bin.xfbin`)
- **Diedit menggunakan**: `Character File Loader Editor` di [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox).
- **Fungsi**: Memberi tahu game file `.xfbin` apa saja (model, animasi kombo, animasi jutsu, proyektil skill, dan partikel efek) yang **wajib dimuat ke RAM** saat karakter dipilih di layar pemilihan karakter.
- **Aturan Emas #1 (`Load Condition`)**:
  Setiap baris file di dalam `xxxprm_load.bin.xfbin` memiliki kotak centang kondisi pemuatan (`Base`, `Awakening`, `Support`, `Jutsu 1..6`, `Ultimate Jutsu 1..4`):
  - Secara bawaan (vanilla), file animasi Support (`xxxbod1s.xfbin`, `File Type = 4`) **hanya dicentang pada `Support`**, dan file animasi Ninjutsu (`xxxskl1..6.xfbin`, `File Type = 5`) **hanya dicentang pada `Jutsu 1..6`**.
  - **Jika Anda ingin memakai animasi Support (`bod1s`) atau animasi Ninjutsu (`skl1..6`) di dalam kombo biasa/Tilt/Grab**, Anda **WAJIB mencentang `[x] Base` (dan `[x] Awakening`)** pada file `bod1s` dan `skl` tersebut di `Character File Loader Editor`! Jika tidak dicentang pada `Base`, animasi tersebut tidak ada di RAM saat bertarung normal.
- **Aturan Emas #2 (Jangan Sampai Lupa File Kembar di Dalam `xxxprm.bin.xfbin`)**:
  Di *Storm 4*, selain file terpisah `spcload/xxxprm_load.bin.xfbin`, di dalam `spc/xxxprm.bin.xfbin` juga terdapat sub-chunk internal `xxxprm_load` (`Chunk #04`). Saat mengedit secara manual di `NSC Toolbox`, selalu simpan `spcload/xxxprm_load.bin.xfbin` terlebih dahulu sebelum mengedit `spc/xxxprm.bin.xfbin`.

#### Tabel Referensi `Type` pada `Character File Loader Editor` (Terverifikasi dari [Video 3 Detik `01:33`](https://www.youtube.com/watch?v=XMqRwv2715s))

| Nilai `Type` di UI NSC Toolbox | Nilai Biner Internal (*Storm 4*) | Folder (`File Path`) | Fungsi & Contoh Penggunaan |
| :--- | :--- | :--- | :--- |
| **`2 - prm`** | `2` (`bod1c`) / `prm` | `spc` | File parameter karakter atau animasi gerakan umum (`xxxbod1c`). |
| **`3 - bod1`** | `3` (`bod1l`) | `spc` | Container animasi kombo darat/udara/grab utama (`7sskbod1l`, `1sskbod1_gen`, `2skrbod1_t`). |
| **`4 - bod2` / Support (`bod1s`)** | `4` (`bod1s`) | `spc` | Container animasi Support (`7sskbod1s` — berisi `7sskpur00`, `7ssksupa00..02`, `7sskteam_satk00`). |
| **`5 - btl` / Skill Motion (`skl`)** | `5` (`skl`) | `spc` | Container animasi gerakan Ninjutsu (`7sskskl1` s.d. `7sskskl6`). |
| **`6 - eff` / Ultimate Motion (`spl`)** | `6` (`spl`) | `spc` | Container animasi gerakan Ultimate Jutsu (`7sskspl1`). |
| **`10 - eff1`** | `11` (di biner *Storm 4*) | `spc` atau `effect` | Container visual efek/partikel (`spc/5mdreff1`, `spc/7brteff1`, `effect/4efb_7brt1`). |
| **`11 - skill`** | `14` (di biner *Storm 4*) | `skill` | Container logika peluru/proyektil (`skill/5mdr_a_skn00`, `skill/7brt_x`, `skill/4efb_7brt1_x`). |

### 2.2 Lapis 2 — File Parameter Moveset (`data_win32/spc/xxxprm.bin.xfbin`)
- **Diedit menggunakan**: `Character Moveset Editor` di [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox).
- **Empat Sub-Chunk Utama di Panel Kiri Atas**:
  1. **`xxxprm_bas`**: Parameter dasar karakter (kecepatan lari, chakra dash, lompatan, atribut dasar).
  2. **`xxxprm_mot`**: **Tabel Utama Moveset!** Berisi dua tab di bagian atas:
     - **Tab `Moveset Settings`**: Berisi seluruh daftar section `PL_ANM_*` (serangan kombo darat `PL_ANM_ATKxx`, serangan udara `PL_ANM_ATK_AIRxx`, Tilt `PL_ANM_ATK_FAR00`, Grab `PL_ANM_THROW_*`, lempar shuriken `PL_ANM_PRJ_*`, dan Ninjutsu `PL_ANM_ATK_SKILL*`).
     - **Tab `Projectile List`**: Berisi daftar slot proyektil/efek (`SYURIKEN`, `CHAKRA_SYURIKEN`, `NINJUTSU_BULLET*`, `COMBO1` s.d. `COMB15`, `DEFAULT_DODGE`).
  3. **`xxxprm_atk`**: Tabel atribut serangan tambahan.
  4. **`xxxprm_spl`**: **Tabel Khusus Ultimate Jutsu & Sekuens Jutsu Sinematik** (`PL_ANM_SPSKILL1_*` atau `PL_ANM_SKL01..06_*`).


## BAGIAN 3 — PEDOMAN MANUAL STEP-BY-STEP DARI KEENAM VIDEO TUTORIAL

### MODUL 1: Cara Mengubah Kombo Darat & Urutan Gerakan ([Video `How PL_ANM_ATK Works`](https://www.youtube.com/watch?v=TKH_TtuOhNI))

#### A. Memahami Anatomi Satu Section `PL_ANM_ATK`
Saat Anda mengklik salah satu baris `PL_ANM_ATK` di panel kiri `Character Moveset Editor`, perhatikan **7 field kunci** berikut:

1. **`PL_ANM Section Name`**: Nama identitas state saat ini (contoh: `PL_ANM_ATK00`, `PL_ANM_ATK01`).
   - **Aturan Mutlak**: Tidak boleh ada dua section dengan nama/nomor yang sama di dalam satu `prm_mot`!
   - Serangan pertama kombo darat **wajib bernama `PL_ANM_ATK00`**.
2. **`Animation`**: Nama animasi 3D yang benar-benar diputar oleh tubuh karakter (contoh: `7sskcmb00`, `7sskteam_satk00`, `7sskskl5_n1`).
   - **Pelajaran Penting dari Kasus Anda (`"ternyata juga 7sskcmb semua"`)**:
     Jika Anda hanya mengubah fungsi di `Function List` tetapi membiarkan field **`Animation`** tetap `7sskcmb00`, `7sskcmb01`, `7sskcmb02`, maka gerakan pedang karakter di dalam game **tidak akan berubah**! Untuk mengganti gerakan fisik, Anda **harus mengganti isi field `Animation`** (dan menyesuaikan `File Type`-nya).
3. **`File Type (same as in prm_load)`**: Menentukan dari container mana animasi pada field `Animation` diambil:
   - Pada Sasuke (`7ssk` / `6ssk`) di *Storm 4*:
     - `2` = `7sskbod1c` (gerakan umum seperti lari/lempar `7sskshc00`).
     - `3` = `7sskbod1l` (animasi kombo standar `7sskcmb00..21`, `7sskcma00..02`, `7sskhola0/1`).
     - `4` = `7sskbod1s` (animasi Support: `7sskteam_satk00`, `7sskpur00`, `7ssksupa00..02`).
     - `5` = `7sskskl1..6` (animasi Ninjutsu: `7sskskl1_s`, `7sskskl2_c1`, `7sskskl5_n1`, `7sskskl5_n2`, `7sskskl5_atk2`).
     - `6` = `7sskspl1` (animasi Ultimate Jutsu).
4. **`Previous PL_ANM`**: Menentukan gerakan ini menyambung setelah gerakan apa:
   - Untuk serangan pembuka (`PL_ANM_ATK00`), `Previous PL_ANM` **wajib berisi `PL_ANM_ANY`**.
   - Untuk serangan ke-2 (`PL_ANM_ATK01`), `Previous PL_ANM` berisi `PL_ANM_ATK00`.
   - Untuk serangan ke-3 (`PL_ANM_ATK02`), `Previous PL_ANM` berisi `PL_ANM_ATK01`, dan seterusnya.
5. **`Combo Direction`**: Arah stik analog yang harus ditahan pemain untuk masuk ke cabang kombo tersebut:
   - Di UI [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (*Storm Connections*): `0 = All Directions` (Netral), `1 = Up` (Atas), `2 = Down` (Bawah), `3 = Side` (Samping).
   - *(Catatan Biner Storm 4)*: Di dalam byte mentah *Storm 4* (`offset +0x68`), nilainya disimpan berbasis 1 (`1 = All Directions`, `2 = Up`, `3 = Down`, `4 = Side`).
   - Hanya gerakan **pertama** pada suatu cabang arah yang diberi arah `Up` / `Down` / `Side` (misal pada pukulan ke-4/ke-5 setelah `PL_ANM_ATK03`). Gerakan lanjutan setelahnya di cabang tersebut dikembalikan ke `All Directions`!
6. **`Trigger Condition 1`**: Syarat khusus agar gerakan tersebut aktif:
   - `0 = No condition` (aktif melawan semua musuh normal).
   - `16 = If previous attack hit giant` (hanya aktif jika pukulan sebelumnya mengenai musuh raksasa seperti Susanoo/Bijuu).
   - **Trik Membuka Gerakan Rahasia Raksasa (`02:14–02:36`)**: Banyak karakter (termasuk `7ssk` pada `7sskcmb06n`, `7sskcmb11_n`, dan `6bto` pada `6btobod1_atk05_b`) menyimpan animasi tebasan raksasa yang sangat keren tetapi dikunci dengan `Trigger Condition 1 = 16`. Ubah nilai `16` menjadi **`0`** untuk memakainya di pertarungan biasa!
7. **`Press Start` dan `Press End` (Perbedaan Kritis *Storm 4* vs *Storm Connections*)**:
   - Di *Storm Connections*, nilai `Press Start` dan `Press End` boleh `-1`.
   - Di ***Storm 4***, seperti yang terlihat pada tangkapan layar NSC Toolbox Anda (`image_3fd6ff.jpg` di mana `PL_ANM_ATK00` memiliki `Press Start = 8`, `Press End = 16`), setiap gerakan yang akan menyambung ke gerakan berikutnya **WAJIB memiliki `Press Start` dan `Press End` positif** (misalnya `6 .. 22`, `8 .. 24`, atau `12 .. 30`). Jika bernilai `-1`, kombo tidak akan bisa berlanjut setelah gerakan tersebut!

#### B. Cara Mengubah Efek Terpental Lawan (`Damage Code` pada `18 = ME_ATKHIT_ON` — Detik `02:37–03:14`)
Jika Anda mengganti urutan animasi, sering kali animasi yang Anda taruh di tengah kombo malah melontarkan musuh terlalu jauh sehingga pukulan berikutnya tidak sampai (*whiff*). Cara memperbaikinya secara manual:
1. Pilih section `PL_ANM_ATK` tersebut, lalu lihat panel tengah **`Function List`**.
2. Klik baris yang bertuliskan **`Function: ME_ATKHIT_ON`** (opcode `18` di daftar UI / `0x00D1` di biner *Storm 4*).
3. Di panel kanan bawah, ubah field **`Damage Code`** sesuai kebutuhan:
   - **`DAMAGE_ID_SMALL_UL` / `DAMAGE_ID_SMALL_UC` / `DAMAGE_ID_SMALL_CMN`**: Lawan hanya tersentak kecil di tempat (*hitstun* pendek, sangat cocok untuk pukulan ke-1 dan ke-2 agar musuh tidak terpental keluar jangkauan pedang!).
   - **`DAMAGE_ID_STAGGER_NORMAL`**: Lawan terhuyung mundur sambil memegang perut dalam waktu lama (*long stagger*, sangat bagus untuk Tilt atau penghubung kombo agar lawan tidak bisa kabur).
   - **`DAMAGE_ID_LOWER_TO_UPPER`**: Lawan tersentak dari bawah ke atas namun tetap di darat.
   - **`DAMAGE_ID_RISE_SMALL_PUSH`**: Lawan terpental naik ke udara (cocok untuk pengangkat *Up Combo*).
   - **`DAMAGE_ID_SMASH_SIDE` / `DAMAGE_ID_SMASH_DOWN_BOUND`**: Lawan terpental keras ke samping atau menghantam tanah memantul (cocok untuk *Finisher*).
4. Atur juga **`Horizontal Push`** (dorongan maju/mundur; perkecil ke `1.0`–`2.0` jika musuh terlalu jauh) dan **`Freeze Time`** (beku frame saat pedang mengenai musuh).
5. **WAJIB**: Klik tombol **`Save`** di panel kanan bawah $ightarrow$ klik **`Save PL_ANM Settings`** di panel tengah bawah!


### MODUL 2: Cara Menambahkan *Old Side Combo* ([Video `Adding Old Side Combo`](https://www.youtube.com/watch?v=YKgLFsMCpm0))

Secara bawaan, banyak karakter hanya memiliki 3 cabang kombo darat (*Neutral*, *Up*, *Down*). Namun mesin *Storm 4* dan *Storm Connections* sebenarnya masih mendukung **cabang ke-4 yaitu *Side Combo* (Tahan Kiri/Kanan + Serang)**!

#### Langkah Manual Menambahkan *Side Combo*:
1. **Jika Mengambil Animasi dari Versi Lama Karakter yang Sama (Misal `1ssk` *Generations* ke `1ssk` *Storm 4/Connections*)**:
   - Salin `1sskbod1.xfbin` lama ke `data_win32/spc/` dan beri nama baru **`1sskbod1_gen.xfbin`** (tidak perlu HxD karena ID karakter sama-sama `1ssk`).
   - Buka `data_win32/spcload/1sskprm_load.bin.xfbin` di `Character File Loader Editor`, klik `Add`, isi:
     - `File Path`: `spc`
     - `File Name`: `1sskbod1_gen`
     - `Type`: `3 - bod1`
     - `Costume Index`: `-1`
     - `Load Condition`: Centang **`[x] Base`** (dan `Awakening`), klik `Save`, lalu simpan file.
   - Di `Character Moveset Editor`, pada section *Side Combo* yang disalin, ubah dropdown **`File Type (same as in prm_load)`** ke opsi **`3 = bod1` urutan kedua** (yang merujuk ke `1sskbod1_gen`).
2. **Jika Membuat *Side Combo* dari Animasi Internal Karakter (`7ssk` seperti pada Mod Boruto TBV Kita)**:
   - Pilih section yang tidak terpakai (atau terkunci untuk raksasa, seperti **`PL_ANM_ATK21`** pada `7ssk`).
   - Atur parameternya:
     - `Animation`: `7sskskl1_s` (dengan `File Type = 5`) atau animasi tebasan samping pilihan Anda.
     - `Previous PL_ANM`: `PL_ANM_ATK03` (sama dengan titik cabang Neutral/Up/Down).
     - `Combo Direction`: **`Side`** (`3 = Side` di UI / `4` di biner *Storm 4*).
     - `Trigger Condition 1`: **`0 = No condition`**.
     - `Press Start` / `Press End`: `12` / `30` (jangan `-1`!).
   - **ATURAN PENTING URUTAN BARIS**: Pastikan baris `PL_ANM_ATK21` (*Side Combo*) berada **di atas** baris `PL_ANM_ATK12` (*Neutral Hit 5* yang memiliki `Combo Direction = All Directions`). Jika baris `All Directions` berada di atas baris `Side`, maka saat Anda menahan arah samping, game akan tetap mengeksekusi kombo netral karena `All Directions` cocok dengan arah apa pun!


### MODUL 3: Cara Mengganti Shuriken & Chakra Shuriken ([Video `Changing Shuriken`](https://www.youtube.com/watch?v=XMqRwv2715s))

Mengganti proyektil Shuriken dilakukan melalui tab **`Projectile List`** (dan dapat diperkuat di `PL_ANM_PRJ_*`).

#### Langkah Manual Mengganti Shuriken:
1. **Cari Tahu Nama File Skill & Efek dari Karakter Donor**:
   - Buka `xxxprm.bin.xfbin` karakter donor (misal Minato `2fouprm.bin.xfbin`, Boruto `7brtprm.bin.xfbin`, atau Madara `5mdrprm.bin.xfbin`) di `Character Moveset Editor`.
   - Pilih `xxxprm_mot` $ightarrow$ klik tab **`Projectile List`**.
   - Klik `SYURIKEN`, `CHAKRA_SYURIKEN`, atau `NINJUTSU_BULLET*`, lalu catat:
     - **`Skill File Name`** (contoh: `2fou_x.xfbin` atau `4efb_7brt1_x.xfbin` atau `5mdr_a_skn00`).
     - **`Skill Entry Name`** (contoh: `2foucmb_skn_e_begin00` atau `4efb_7brt1_e_begin00` atau `5mdreff1_skn_e_begin00`).
2. **Daftarkan File Skill & Efek Donor ke `spcload/xxxprm_load.bin.xfbin` Karakter Anda**:
   - Buka `xxxprm_load.bin.xfbin` karakter Anda di `Character File Loader Editor`, lalu klik `Add` untuk menambahkan **dua file pasangan**:
     - **Baris 1 (File Logika Proyektil)**: `File Path = skill`, `File Name = [Nama Skill File tanpa .xfbin, misal 2fou_x atau 4efb_7brt1_x]`, `Type = 11 - skill` (*di biner Storm 4 = 14*), `Costume Index = -1`, `Load Condition = [x] Base` & `[x] Awakening`.
     - **Baris 2 (File Visual Efek)**: `File Path = spc` (untuk `2foueff1`, `7brteff1`, `5mdreff1`) atau `effect` (untuk `4efb_7brt1`, `3efb_4ssi1`), `File Name = [Nama File Efek]`, `Type = 10 - eff1` (*di biner Storm 4 = 11*), `Costume Index = -1`, `Load Condition = [x] Base` & `[x] Awakening`.
   - Simpan `xxxprm_load.bin.xfbin`.
3. **Ganti Entri di Tab `Projectile List` (`xxxprm.bin.xfbin`)**:
   - Buka `xxxprm.bin.xfbin` karakter Anda $ightarrow$ `xxxprm_mot` $ightarrow$ tab **`Projectile List`**.
   - Pilih **`SYURIKEN`** (untuk lemparan biasa), **`CHAKRA_SYURIKEN`** (untuk lemparan chakra), serta **`AWA_SYURIKEN`** dan **`AWA_CHAKRA_SYURIKEN`** (di bagian bawah daftar untuk mode Awakening).
   - Ganti `Skill File Name` dan `Skill Entry Name` sesuai catatan dari karakter donor, klik **`Save`** di bawah panel `Projectile List`, lalu simpan file.
4. **Trik Tambahan *Storm 4*: Menembakkan Jutsu (Misal *Vanishing Rasengan*) Saat Menekan Chakra Shuriken (`PL_ANM_PRJ_CHA_LAND` & `AIR`)**:
   - Di *Storm 4*, selain mengubah `CHAKRA_SYURIKEN` di `Projectile List`, Anda bisa membuka tab `Moveset Settings`, memilih **`PL_ANM_PRJ_CHA_LAND`** (Chakra Shuriken darat) dan **`PL_ANM_PRJ_CHA_AIR`** (Chakra Shuriken udara), lalu menambahkan pasangan fungsi pemanggil proyektil (`0x00A5` + `0x00A6`) untuk menembakkan slot `NINJUTSU_BULLET_EX` (*Vanishing Rasengan* Boruto) dan `NINJUTSU_BULLET_TYPE_2` (*Halo Dance Wave* Shisui) bersamaan dengan kunai!


### MODUL 4: Cara Mengganti Grab & Animasi Lintas Karakter Berbeda Menggunakan HxD ([Video `Changing Grab`](https://www.youtube.com/watch?v=K_DrvEl2XBE))

Bagaimana jika Anda ingin mengambil animasi Grab atau Kombo dari **karakter yang berbeda ID-nya** (contoh: mengambil Grab Sakura Shippuden `2skr` untuk dipasang ke Sakura PTS `1skr`, atau mengambil gerakan Shisui `4ssi` / Minato `2fou` ke `7ssk`)?

Jika Anda langsung menyalin `bod1` karakter lain tanpa diedit di **HxD**, karakter Anda akan **diam membeku (T-Pose / tidak bergerak)** karena seluruh tulang di dalam `bod1` donor masih bernama `[ID_Donor]00t0` (misal `2skr00t0` atau `4ssi00t0`). Berikut adalah prosedur wajibnya:

#### Langkah 1 — Retargeting Kerangka di HxD Hex Editor (`00:08–00:58`)
1. Salin file `bod1` milik karakter donor (misal `2skrbod1.xfbin` atau `4ssibod1.xfbin`) ke folder `data_win32/spc/` dan ubah namanya (misal `2skrbod1_t.xfbin` atau `4ssibod1_tbv.xfbin`).
2. Buka file tersebut di **HxD Hex Editor**.
3. Tekan **`Ctrl + F`** (Search / Find), pilih tab **Text-string**, ketik **`[ID_Donor]00t0`** (contoh: `2skr00t0` atau `4ssi00t0`), lalu tekan Enter.
4. HxD akan menyorot **kemunculan PERTAMA** (biasanya berada di header pada offset sekitar `0x00000180`).
5. Di kolom teks sebelah kanan HxD, ketik langsung **`1cmnbod1`** untuk menimpa kemunculan pertama tersebut!
   - **PERINGATAN KERAS HxD**: Pastikan panjang karakter tetap **tepat 8 huruf** (`2skr00t0` = 8 huruf $ightarrow$ `1cmnbod1` = 8 huruf) dan HxD berada dalam mode **Overwrite** (bukan Insert) agar ukuran byte file tidak bertambah atau berkurang 1 byte pun!
6. Sekarang tekan **`Ctrl + R`** (Replace), pilih tab **Text-string**:
   - `Search for`: `[ID_Donor]00t0` (contoh: `2skr00t0`)
   - `Replace with`: **`1cmn00t0`**
   - `Search direction`: Pilih **`All`** (atau *Forward* dari posisi setelah header)
   - Klik tombol **`Replace All`** (HxD akan mengganti sekitar 200 kemunculan nama tulang berikutnya menjadi `1cmn00t0`).
7. Tekan **`Ctrl + S`** untuk menyimpan file di HxD.

#### Langkah 2 — Daftarkan `bod1` Hasil HxD di `Character File Loader Editor` (`00:59–01:51`)
1. Buka `data_win32/spcload/xxxprm_load.bin.xfbin` karakter penerima di `Character File Loader Editor`.
2. Klik `Add`, isi:
   - `File Path`: `spc`
   - `File Name`: `2skrbod1_t` (nama file yang sudah diedit di HxD)
   - `Type`: `3 - bod1`
   - `Costume Index`: `-1`
   - `Load Condition`: Centang **`[x] Base`** dan **`[x] Awakening`**.
3. Klik `Save` dan simpan file `xxxprm_load.bin.xfbin`.

#### Langkah 3 — Salin Section & Aktifkan `Enable Outlaw Max` di `Character Moveset Editor` (`01:52–04:25`)
1. Untuk **Grab**, terdapat **3 section wajib yang harus selalu berpasangan**:
   - **`PL_ANM_THROW_BEGIN`**: Gerakan awal menangkap lawan (memiliki fungsi `ME_THROW_START` dan `ME_ATKHIT_ON`).
   - **`PL_ANM_THROW_SUCCESS_ATTACKER`**: Gerakan bantingan penyerang setelah tangkapan masuk (memiliki fungsi `ME_DAMAGE_SET_DIRECT` dan `ME_THROW_ENEMY_SET_COORD`).
   - **`PL_ANM_THROW_SUCCESS_VICTIM`**: Gerakan tubuh lawan yang sedang dibanting.
2. Setelah menyalin ketiga section tersebut dari karakter donor (atau setelah mengganti animasi pada section `PL_ANM` dengan animasi dari file `1cmnbod1` / `1cmn00t0`), klik ketiga section tersebut satu per satu dan **WAJIB atur 2 kotak centang di kanan atas**:
   - **Centang `[x] Enable Outlaw Max`** *(di istilah lama disebut Cube Man)*: Kotak centang inilah yang memerintahkan mesin game untuk membaca animasi dari kerangka umum `1cmnbod1` / `1cmn00t0`!
   - **Hapus centang `[ ] Enable Face Animations`**: Wajib dimatikan agar wajah karakter Anda tidak terdistorsi/rusak karena perbedaan susunan tulang wajah antar-karakter!
3. *(Khusus Cara Cepat Tanpa HxD di Karakter yang Sama)*: Seperti yang kita terapkan pada Mod Boruto TBV v2.0 untuk `7ssk`, Anda juga bisa mengubah `PL_ANM_THROW_SUCCESS_ATTACKER` dan `VICTIM` agar langsung memakai animasi sinematik Ninjutsu bawaan karakter itu sendiri (contoh: **`7sskskl5_atk2`** dan **`7sskskl5_dmg2`** dengan `File Type = 5` dari `Chunk #06 prm_skl`), sehingga Grab berubah menjadi kombo sinematik 11-hit tanpa risiko ketidakcocokan tulang!


### MODUL 5: Cara Mengganti Air Combo ([Video `Changing Air Combo`](https://www.youtube.com/watch?v=TcxS3Ues9TI))

1. Di dalam `xxxprm_mot`, kombo udara dikendalikan oleh section **`PL_ANM_ATK_AIR00`**, **`PL_ANM_ATK_AIR01`**, **`PL_ANM_ATK_AIR02`** (hingga `AIR04` atau `AIR05` tergantung karakter).
2. Serangan pertama di udara (`PL_ANM_ATK_AIR00`) memiliki `Previous PL_ANM = PL_ANM_ANY` dan kondisi pemicu udara (`Trigger Condition 1 = 3` di *Storm 4*).
3. Serangan udara berikutnya (`PL_ANM_ATK_AIR01`) menunjuk ke `Previous PL_ANM = PL_ANM_ATK_AIR00`, dan seterusnya.
4. **Hal yang Wajib Diperhatikan Saat Mengubah Air Combo**:
   - Pastikan di dalam `Function List` terdapat fungsi penahan gravitasi udara (`ME_FLOATING_ON` pada awal serangan dan `ME_FLOATING_OFF` di akhir serangan) agar karakter tidak jatuh ke tanah sebelum kombo udara selesai.
   - Pastikan `Press Start` dan `Press End` terisi (contoh: `6 .. 20` pada `AIR00`, `14 .. 30` pada `AIR01`).
   - Jika Anda mengganti animasi `AIR00` dan `AIR01` dengan animasi serangan udara milik Support (`7ssksupa00` dan `7ssksupa01`), ubah `File Type` menjadi **`4`** (`bod1s`).


### MODUL 6: Cara Mengganti Ultimate Jutsu ([Video `Changing Ultimate Jutsu`](https://www.youtube.com/watch?v=DgEzO1SHwKk))

1. Berbeda dari kombo biasa yang ada di `xxxprm_mot`, Ultimate Jutsu berada di sub-chunk ke-4 yaitu **`xxxprm_spl`** (atau `Chunk #06` di *Storm 4* yang menggabungkan sekuens sinematik `SKL` dan `SPL`).
2. Satu rangkaian Ultimate Jutsu terdiri dari **7 section berurutan**:
   - `PL_ANM_SPSKILL1_CUTIN_NC` & `PL_ANM_SPSKILL1_CUTIN` (Adegan close-up awal saat mengaktifkan Ultimate Jutsu).
   - `PL_ANM_SPSKILL1_START` (Gerakan menerjang atau menembakkan proyektil pembuka Ultimate Jutsu).
   - `PL_ANM_SPSKILL1_HIT` (Transisi saat serangan pembuka mengenai musuh).
   - `PL_ANM_SPSKILL1_DEMO_DMG` (Adegan sinematik utama saat musuh menerima serangan penuh).
   - `PL_ANM_SPSKILL1_DEMO_ATK_END` (Pose penutup setelah ledakan).
   - `PL_ANM_SPSKILL1_TEAM_WAIT` (State tunggu untuk Team Ultimate Jutsu).
3. Di `Character File Loader Editor` (`xxxprm_load.bin.xfbin`), file animasi dan efek Ultimate Jutsu (`spc/xxxspl1.xfbin` dan `effect/xxxeff_spl1.xfbin`) wajib dicentang pada **`Load Condition: [x] Ultimate Jutsu 1`** (atau `Base` jika ingin selalu dimuat).


## BAGIAN 4 — TEMUAN KHUSUS *STORM 4* DARI HASIL AUDIT HxD & NSC TOOLBOX KITA

Ketika Anda memodifikasi *Naruto Shippuden: Ultimate Ninja Storm 4* (`NSUNS4`), terdapat **3 perbedaan mekanisme biner** dibandingkan tutorial *Storm Connections* yang wajib Anda terapkan agar mod benar-benar muncul di dalam game:

### 4.1 Cara Memunculkan Proyektil / Efek Jutsu di Tengah Gerakan (`0x00A5` + `0x00A6`, Bukan `0x00A3`)
Di video *Storm Connections*, pembuat menyebut fungsi `ME_ENTRY_COMBO_SKILL_N_COORD`. Ketika kami membedah biner asli `7sskprm.bin.xfbin` milik *Storm 4*, ditemukan fakta bahwa **`7ssk` sama sekali tidak pernah memakai opcode `0x00A3` (`163`)**! Sebaliknya, *Storm 4* memanggil proyektil/efek dari `Projectile List` menggunakan **dua fungsi berpasangan pada frame (`Timing`) yang sama**:

| Urutan Fungsi | Kode Opcode (Hex / Desimal) | Nama Fungsi di Engine | Isi `String Param` | Contoh Nilai `String Param` yang Valid di `7ssk` |
| :--- | :--- | :--- | :--- | :--- |
| **Fungsi Ke-1** | **`0x00A5` (`165`)** | `ME_ENTRY_PROJECTILE` | **Nama Slot di `Projectile List`** | `NINJUTSU_BULLET_EX`, `NINJUTSU_BULLET_TYPE_2`, `COMBO1`, `COMBO2`, `COMBO3`, `COMBO4`, `COMBO7`, `COMBO8`, `COMBO9`, `COMB10` |
| **Fungsi Ke-2** *(Pada `Timing` yang sama persis!)* | **`0x00A6` (`166`)** | `ME_PROJECTILE_BIND_BONE` | **Nama Tulang / Dummy Tempat Muncul** | `attach_fire00` (titik tembak proyektil depan), `1efc_dmy01`, `1efc_dmy02`, `trall` (pusat tubuh), `7ssk00t0 r hand` (tangan kanan) |

- **Contoh Praktis**:
  Jika Anda ingin Sasuke/Boruto menembakkan ***Vanishing Rasengan* (`NINJUTSU_BULLET_EX`)** pada frame ke-12 saat melakukan *Side Combo* (`PL_ANM_ATK21`):
  1. Di tab `Projectile List`, isi slot `NINJUTSU_BULLET_EX` dengan `Skill File Name = 4efb_7brt1_x.xfbin` dan `Skill Entry Name = 4efb_7brt1_e_begin00`.
  2. Di tab `Moveset Settings` pada `PL_ANM_ATK21`, tambahkan **2 fungsi** di `Function List`:
     - Fungsi A: `Timing = 12`, `Opcode = 165 (0x00A5)`, `String Param = NINJUTSU_BULLET_EX`
     - Fungsi B: `Timing = 12`, `Opcode = 166 (0x00A6)`, `String Param = attach_fire00`
  Maka tepat pada frame ke-12, proyektil *Vanishing Rasengan* akan meluncur dari depan karakter Anda!

### 4.2 Kamus Opcode `Function List` (`ME_`) Paling Penting di *Storm 4* (`7sskprm.bin.xfbin`)

Berikut adalah daftar kode fungsi yang telah diverifikasi langsung dari biner `7sskprm.bin.xfbin` *Storm 4* untuk memudahkan Anda saat mengedit `Function List`:

| Opcode (Hex / Desimal) | Fungsi & Kegunaan di Dalam Game | Parameter (`String Param` / `Param 1..3`) |
| :--- | :--- | :--- |
| **`0x001D` (`29`)** | Membuka kunci pergerakan maju (*Start Forward Movement*). | Dipasang pada `Timing: 0` sebelum fungsi kecepatan maju. |
| **`0x001E` (`30`)** | Menghentikan dorongan gerak maju (*Stop Forward Movement*). | Dipasang setelah tebasan selesai (misal `Timing: 15` atau `20`). |
| **`0x0021` (`33`)** | **Kecepatan Terjang Maju (`ME_FWDVELOCITY_SET`)**. | `Param 1` = Kecepatan maju (misal `45`, `55`, `75`), `Param 2` = Durasi/akselerasi (misal `4`–`8`). Semakin besar `Param 1`, semakin jauh karakter menerjang musuh! |
| **`0x00A0` (`160`)** | Melempar Shuriken biasa (`SYURIKEN`). | `String Param` = `r hand` atau `l hand`. |
| **`0x00A1` (`161`)** | Melempar Chakra Shuriken (`CHAKRA_SYURIKEN`). | `String Param` = `r hand` atau `l hand`. |
| **`0x00A4` (`164`)** | Memanggil slot `COMBO` berdasarkan nomor urut (`1..15`). | `String Param` = `1efc_dmy02`, `Param 1` = `15` (memanggil `COMB15` di `Projectile List`). |
| **`0x00A5` (`165`) + `0x00A6` (`166`)** | **Pasangan Pemanggil Proyektil & Efek dari `Projectile List`**. | `0x00A5` (`String Param` = Nama Slot `Projectile List`) + `0x00A6` (`String Param` = Nama Tulang/Dummy seperti `attach_fire00`). |
| **`0x00D1` (`209`)** | **Mengaktifkan Hitbox Serangan (`ME_ATKHIT_ON` — ukuran 160 byte)**. | `String Param` = Nama tulang hitbox (`trall`, `r hand`, `7ssk_under`), `Param 1` = Radius hitbox (misal `65`–`260`), diikuti `Damage Code`, `Damage Amount`, `Push`, `Freeze`. |
| **`0x00D2` (`210`) / `0x00FF` (`255`)** | **Mematikan Hitbox Serangan (`ME_ATKHIT_OFF`)**. | Dipasang 3–5 frame setelah `0x00D1` agar hitbox berhenti setelah mengenai lawan. |
| **`0x00EB` (`235`) / `0x00EC` (`236`)** | Efek menghilang dan muncul kembali (*Teleport Vanish / Appear*). | Digunakan pada gerakan teleportasi Rinnegan/Hiraishin (`7sskcmb03`, `7sskcmb11`). |
| **`0x0100` (`256`)** | Memutar suara tebasan/serangan (*Play Attack Sound/Voice*). | `Param 1 = 0`, `Param 2 = ID Suara Tebasan` (misal `80`, `85`), `Param 3 = ID Suara Teriakan` (misal `75`, `85`). |


## BAGIAN 5 — CHECKLIST WAJIB SEBELUM MENYIMPAN & MENGETES MOD MANUAL

Setiap kali Anda selesai mengedit secara manual di **NSC Toolbox** atau **HxD**, periksa **8 poin checklist** ini agar tidak terjadi masalah *"sudah dipasang tapi tidak ada perubahan"*:

1. **[ ] Apakah Field `Animation` dan `File Type` Sudah Diganti?**
   Jangan hanya mengubah fungsi di `Function List` jika ingin gerakan tubuh berubah; pastikan nama `Animation` sudah diganti (misal dari `7sskcmb00` ke `7sskteam_satk00`) dan `File Type`-nya sesuai dengan container tempat animasi itu berada (`3` untuk `bod1l`, `4` untuk `bod1s`, `5` untuk `skl`).
2. **[ ] Apakah Container Animasi & Efek Sudah Diberi Centang `[x] Base` di `prm_load.bin.xfbin`?**
   Pastikan `bod1s`, `skl1..6`, serta semua file `skill` dan `effect` donor memiliki centang `Base` (atau nilai kondisi `0x2FFF`) di `spcload/xxxprm_load.bin.xfbin` **dan** di sub-chunk `prm_load` dalam `spc/xxxprm.bin.xfbin`.
3. **[ ] Apakah Anda Sudah Menekan Tombol `Save` Secara Berjenjang di NSC Toolbox?**
   Urutan klik yang wajib dipatuhi setiap mengedit 1 section di NSC Toolbox:
   - Klik **`Save`** di bawah panel `Function` (kanan bawah) $ightarrow$
   - Klik **`Save PL_ANM Settings`** di bawah panel tengah (sampai muncul pesan `"PL_ANM entry was saved"`) $ightarrow$
   - Klik **`File -> Save`** di kiri atas!
4. **[ ] Apakah `Press Start` dan `Press End` Sudah Bernilai Positif (Khusus *Storm 4*)?**
   Pastikan semua gerakan kombo yang bisa dilanjut ke gerakan berikutnya memiliki nilai `Press Start` dan `Press End` positif (contoh: `8` dan `24`), bukan `-1`.
5. **[ ] Apakah `Trigger Condition 1` Sudah Diubah dari `16` ke `0`?**
   Jika memakai section atau animasi yang tadinya khusus raksasa (`ATK18`, `ATK21`, `ATK22`), pastikan `Trigger Condition 1 = 0`.
6. **[ ] Apakah Baris Cabang Arah (`Side` / `Up` / `Down`) Berada di Atas Baris `All Directions`?**
   Untuk semua gerakan yang memiliki `Previous PL_ANM` yang sama (misal sama-sama setelah `PL_ANM_ATK03`), letakkan gerakan dengan arah spesifik (`Up`, `Down`, `Side`) **di atas** gerakan `All Directions`.
7. **[ ] Jika Memakai Animasi Karakter Lain (Hasil HxD `1cmnbod1` / `1cmn00t0`), Apakah `Enable Outlaw Max` Sudah Dicentang?**
   Pastikan `[x] Enable Outlaw Max` dicentang dan `[ ] Enable Face Animations` tidak dicentang.
8. **[ ] Apakah Kostum yang Anda Pilih di Dalam Game Sesuai dengan ID Karakter yang Diedit (`7ssk` vs `6ssk`)?**
   Di *Storm 4*, Sasuke Dewasa memiliki 2 ID karakter (`7ssk` untuk *Wandering Shinobi* dan `6ssk` untuk *The Last*). Pastikan file mod dipasang untuk ID karakter yang sesuai dengan kostum yang Anda pilih.
