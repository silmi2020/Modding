# [NSUNSC Mod Tutorial] How PL_ANM_ATK Works — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] How PL_ANM_ATK Works](https://www.youtube.com/watch?v=TKH_TtuOhNI)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=TKH_TtuOhNI)
* **Durasi & Tanggal Rilis**: `03:47` | 23 September 2025
* **Tool yang Dipakai di Video**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character Moveset Editor`)
* **Contoh Karakter di Video**: Boruto Karma / Borushiki (`6bto` → file `6btoprm.bin.xfbin`)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Video ini adalah pondasi paling penting dalam modding moveset karena menjelaskan cara kerja **`PL_ANM_ATK`** (kode gerakan kombo serangan darat). Di dalam video ini, pembuat melakukan **3 eksperimen utama** pada karakter Borushiki (`6bto`):

1. **Eksperimen 1 (`00:51–02:13`) — Mengubah *Down Combo* Menjadi *Neutral Combo* Utama**:
   * Pembuat menghapus seluruh kombo netral bawaan Boruto (`PL_ANM_ATK00` sampai `PL_ANM_ATK06`).
   * Lalu ia mengambil gerakan pembuka *Down Combo* (`PL_ANM_ATK10` yang memakai animasi `6btobod1_atk10`), mengubah namanya menjadi **`PL_ANM_ATK00`**, mengubah syarat sebelumnya (`Previous PL_ANM`) menjadi **`PL_ANM_ANY`**, dan mengubah arahnya (`Combo Direction`) dari `2 = Down` menjadi **`0 = All Directions`**.
   * Hasilnya di dalam game (`02:01–02:13`): Saat menekan tombol pukul biasa tanpa menahan arah bawah, Boruto langsung mengeluarkan rangkaian *Down Combo*!
2. **Eksperimen 2 (`02:14–02:36`) — Membuka Kunci Gerakan Lawan Raksasa (*Giant Finisher*)**:
   * Setiap karakter punya gerakan akhiran khusus saat memukul raksasa/Susanoo (biasanya nama animasinya berakhiran `_b` atau `_n`, seperti `6btobod1_atk05_b` pada `PL_ANM_ATK15` atau `7sskcmb06n` pada Sasuke).
   * Secara bawaan, gerakan itu dikunci oleh **`Trigger Condition 1 = 16 (If previous attack hit giant)`**.
   * Pembuat mengubah angka **`16` menjadi `0 (No condition)`**, sehingga gerakan salto petir raksasa tersebut bisa keluar saat melawan karakter ukuran normal (`02:30–02:36`)!
3. **Eksperimen 3 (`02:37–03:14`) — Mengubah Efek Terpental Lawan (`Damage Code` di `ME_ATKHIT_ON`)**:
   * Pembuat memilih satu gerakan tendangan (`PL_ANM_ATK20`), mengklik fungsi **`18 = ME_ATKHIT_ON`** pada frame ke-7, lalu mencoba 4 kode **`Damage Code`** yang berbeda:
     * `DAMAGE_ID_SMALL_UL` (`02:54`): Musuh hanya tersentak sedikit di tempat.
     * `DAMAGE_ID_SMALL_CMN` (`02:58`): Musuh tersentak ringan standar.
     * `DAMAGE_ID_STAGGER_NORMAL` (`03:02`): Musuh terhuyung lama sambil memegang perut (sangat bagus untuk menyambung kombo!).
     * `DAMAGE_ID_RISE_SMALL_PUSH` (`03:09`): Musuh langsung terpental naik ke udara.

## 2. Urutan Kejadian di Video (Detik demi Detik)

| Detik Video | Apa yang Terlihat di Layar | Penjelasan Sederhana |
| :--- | :--- | :--- |
| **`00:08–00:21`** | Teks pengantar tentang cara kerja kombo. | Cara mengubah kombo *Neutral*, *Up*, *Down*, maupun *Side* semuanya memakai logika `PL_ANM_ATK` yang sama. |
| **`00:22–00:35`** | Tangkapan layar `PL_ANM_ATK00` dan `PL_ANM_ATK01`. | Pukulan pertama **wajib** bernama `PL_ANM_ATK00` dengan `Previous PL_ANM = PL_ANM_ANY`. Pukulan kedua (`ATK01`) wajib menulis `Previous PL_ANM = PL_ANM_ATK00`. |
| **`00:36–00:50`** | Daftar `PL_ANM_ATK` diberi warna per kelompok kombo. | Pada karakter baru: `ATK00–06` = Neutral, `ATK10–13` = Down, `ATK20–21` = Up. **Aturan mutlak**: Nomor `PL_ANM_ATK` tidak boleh ada yang kembar/ganda! |
| **`00:51–01:08`** | Menghapus `PL_ANM_ATK00` s.d. `ATK06` dengan tombol `Delete`. | Kombo netral lama dihapus supaya nama `PL_ANM_ATK00` kosong dan bisa dipakai gerakan lain. |
| **`01:09–01:47`** | Mengubah `PL_ANM_ATK10` menjadi `PL_ANM_ATK00` dan menyambungkan `ATK11` ke `ATK00`. | `ATK10` dijadikan pukulan ke-1 (`Section Name = PL_ANM_ATK00`, `Previous = PL_ANM_ANY`, `Direction = All Directions`), lalu `ATK11` disambungkan ke belakang `PL_ANM_ATK00`. |
| **`01:48–02:13`** | Menyimpan ke `data_win32/spc/6btoprm.bin.xfbin` dan tes di dalam game. | Kombo biasa Boruto berubah menjadi gerakan *Down Combo*. |
| **`02:14–02:36`** | Mengubah `Trigger Condition 1` pada `PL_ANM_ATK15` dari `16` ke `0`. | Membuka gerakan khusus lawan raksasa (`6btobod1_atk05_b`) supaya bisa dipakai melawan musuh biasa. |
| **`02:37–03:14`** | Mengubah `Damage Code` di dalam fungsi `18 = ME_ATKHIT_ON`. | Menunjukkan bagaimana 1 gerakan tendangan yang sama bisa membuat musuh tersentak kecil, terhuyung lama, atau terpental ke udara tergantung pilihan `Damage Code`. |

## 3. Penjelasan Bahasa Mudah (Analogi Rangkaian Gerbong Kereta)

Agar Anda tidak bingung saat membuka **Character Moveset Editor**, bayangkan satu kombo seperti **rangkaian gerbong kereta api**:
* **`PL_ANM Section Name` adalah Nomor Gerbong**: Gerbong paling depan harus selalu bernama **`PL_ANM_ATK00`**.
* **`Previous PL_ANM` adalah Pengait ke Gerbong di Depannya**:
  * Gerbong pertama (`PL_ANM_ATK00`) harus dikaitkan ke **`PL_ANM_ANY`** (artinya boleh ditarik kapan saja saat karakter sedang berdiri/lari).
  * Gerbong kedua (`PL_ANM_ATK01`) harus menulis `Previous PL_ANM = PL_ANM_ATK00` (artinya keluar setelah `ATK00`).
* **`Animation` adalah Isi Film Gerakan di Dalam Gerbong**:
  * **Ini alasan mengapa mod lama Anda tidak berubah ketika dicek di NSC Toolbox**: Jika gerbongnya tetap berisi `7sskcmb00`, `7sskcmb01`, `7sskcmb02`, maka gerakan tubuh Sasuke akan tetap sama persis dengan versi asli!
  * Jika ingin gerakan tubuhnya berubah, Anda harus **mengganti tulisan di kolom `Animation`** (misalnya diganti ke gerakan Support `7sskteam_satk00` dengan `File Type = 4`, atau gerakan Jutsu `7sskskl5_n1` dengan `File Type = 5`, atau memajukan gerakan teleport `7sskcmb03` menjadi pukulan ke-2/ke-3).

## 4. Panduan Eksekusi Manual Langkah demi Langkah (Bisa Langsung Anda Praktikkan!)

### A. Cara Mengganti Gerakan Pukulan Kombo Secara Manual
1. Buka **NSC Toolbox** → klik **Character Moveset Editor (`***prm.bin.xfbin`)**.
2. Klik `File -> Open` dan buka file karakter Anda (contoh: `data_win32/spc/7sskprm.bin.xfbin`).
3. Di kotak kiri atas, klik **`7sskprm_mot`**.
4. Di daftar kiri bawah, klik gerakan yang ingin diubah (contoh: **`PL_ANM_ATK00`** untuk pukulan pertama).
5. Di bagian tengah atas, ubah:
   * **`Animation`**: Ketik nama animasi baru yang ingin dipakai (contoh: `7sskcmb03` untuk tebasan teleport, atau `7sskteam_satk00` untuk tebasan kombo tim).
   * **`File Type`**: Sesuaikan dengan tempat animasi itu disimpan (`3` jika animasi kombo biasa `cmb`, `4` jika animasi support `supa`/`pur`/`team`, `5` jika animasi jutsu `skl`). *(Ingat: jika memakai `4` atau `5`, pastikan file `bod1s` dan `skl` sudah dicentang `Base` di `prm_load.bin.xfbin`!)*.
   * **`Press Start` dan `Press End` (Khusus *Storm 4*)**: Pastikan angkanya positif (contoh: `Press Start = 8`, `Press End = 24`) agar bisa lanjut ke pukulan berikutnya!
6. Klik tombol **`Save PL_ANM Settings`** di bagian tengah bawah (tunggu sampai muncul tulisan *"PL_ANM entry was saved"*).

### B. Cara Membuka Gerakan Rahasia Lawan Raksasa (`Trigger Condition 1`)
1. Cari section kombo yang memiliki `Trigger Condition 1 = 16 = If previous attack hit giant` (contoh pada Sasuke `7ssk`: `PL_ANM_ATK18`, `PL_ANM_ATK21`, `PL_ANM_ATK22`).
2. Ubah **`Trigger Condition 1`** menjadi **`0 = No condition`**.
3. Khusus di *Storm 4*, ubah juga **`Press Start`** (misal `10`) dan **`Press End`** (misal `26`) karena gerakan raksasa tadinya bernilai `-1`.
4. Sambungkan **`Previous PL_ANM`** ke pukulan yang Anda inginkan, lalu klik **`Save PL_ANM Settings`**.

### C. Cara Mengatur Agar Musuh Tidak Terpental Terlalu Jauh di Tengah Kombo (`Damage Code`)
1. Klik section `PL_ANM_ATK` yang pukulannya membuat musuh mental kejauhan.
2. Di daftar tengah (**`Function List`**), klik baris yang bertuliskan **`ME_ATKHIT_ON`**.
3. Di panel kanan bawah:
   * Ubah **`Damage Code`** menjadi **`DAMAGE_ID_SMALL_UL`** (tersentak kecil) atau **`DAMAGE_ID_STAGGER_NORMAL`** (terhuyung lama di tempat).
   * Kecilkan angka **`Horizontal Push`** (misal menjadi `1.5` atau `2.0`).
4. Klik **`Save`** (di kanan bawah) → klik **`Save PL_ANM Settings`** (di tengah bawah) → klik **`File -> Save`**.
