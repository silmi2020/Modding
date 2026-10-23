# [NSUNSC Mod Tutorial] Adding Old Side Combo — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] Adding Old Side Combo](https://www.youtube.com/watch?v=YKgLFsMCpm0)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=YKgLFsMCpm0)
* **Durasi & Tanggal Rilis**: `04:33` | 22 September 2025
* **Tool yang Dipakai di Video**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character File Loader Editor` & `Character Moveset Editor`)
* **Contoh Karakter di Video**: Sasuke PTS (`1ssk` → menambahkan kembali *Side Combo* dari *Storm Generations* ke *Storm Connections*)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Di game *Naruto Storm* generasi lama (*Storm 2*, *Storm Generations*, *Storm 3*), karakter memiliki **4 arah kombo darat**:
1. **Neutral Combo** (Tanpa tahan arah / `All Directions`)
2. **Up Combo** (Tahan Atas / `Up`)
3. **Down Combo** (Tahan Bawah / `Down`)
4. **Side Combo** (Tahan Kiri atau Kanan / `Side`)

Di *Storm 4* dan *Storm Connections*, kebanyakan karakter hanya diberi 3 kombo (*Neutral*, *Up*, *Down*). Namun pembuat video membuktikan bahwa **mesin game sebenarnya masih mengenali perintah arah samping (`Combo Direction = Side`)**!

Di dalam video ini, pembuat mengembalikan *Side Combo* milik Sasuke PTS (`1ssk`) dengan langkah berikut:
1. Menyalin file animasi lama `1sskbod1.xfbin` dari *Storm Generations* ke folder `data_win32/spc/` dan mengubah namanya menjadi **`1sskbod1_gen.xfbin`** (`00:08–00:42`).
2. Mendaftarkan `1sskbod1_gen` ke dalam file **`1sskprm_load.bin.xfbin`** (`spcload`) dengan tipe **`3 - bod1`** dan centang **`[x] Base`** (`01:14–01:51`).
3. Membuka 2 jendela **Character Moveset Editor** berdampingan (`1sskprm.bin.xfbin` baru di kiri, `1sskprm.bin.xfbin` lama di kanan), lalu menyalin 5 gerakan *Side Combo* (**`PL_ANM_ATK07` sampai `PL_ANM_ATK11`**) dari kanan ke kiri (`01:52–03:49`).
4. Mengubah pilihan **`File Type (same as in prm_load)`** pada kelima gerakan tersebut ke opsi **`3 = bod1` yang kedua** (supaya game mengambil animasinya dari `1sskbod1_gen.xfbin`), lalu menyimpannya (`03:50–04:15`).
5. Saat dites di dalam game (`04:16–04:32`), Sasuke PTS berhasil mengeluarkan kombo ke-4 (*Side Combo*) saat stik ditahan ke kiri/kanan!

## 2. Urutan Kejadian di Video (Detik demi Detik)

| Detik Video | Apa yang Terlihat di Layar | Penjelasan Sederhana |
| :--- | :--- | :--- |
| **`00:08–00:42`** | Menyalin `1sskbod1.xfbin` lama ke `data_win32/spc/` dan mengganti namanya menjadi `1sskbod1_gen.xfbin`. | Karena kode karakternya sama-sama `1ssk` (nama tulangnya sudah sama-sama `1ssk00t0`), kita **tidak perlu** mengedit file ini di HxD! Cukup ganti nama filenya agar tidak menimpa `1sskbod1.xfbin` asli. |
| **`00:43–01:13`** | Menyalin `1sskprm.bin.xfbin` ke `spc/` dan `1sskprm_load.bin.xfbin` ke `spcload/`. | Menyiapkan kedua file parameter Sasuke di folder mod. |
| **`01:14–01:51`** | Menambahkan `spc/1sskbod1_gen` (`Type: 3 - bod1`, `Base`) di `Character File Loader Editor`. | Memberi tahu game agar memuat file animasi kedua (`1sskbod1_gen.xfbin`) saat pertarungan dimulai. |
| **`01:52–02:52`** | Membuka 2 jendela `Character Moveset Editor` dan mencari titik percabangan kombo. | Pada Sasuke PTS (`1ssk`), pukulan ke-1 adalah `ATK00`, pukulan ke-2 adalah `ATK03`, dan pukulan ke-3 adalah `ATK04`. Semua cabang arah dimulai setelah pukulan ke-3 (`Previous PL_ANM = PL_ANM_ATK04`). |
| **`02:53–03:00`** | Memperlihatkan pengaturan `PL_ANM_ATK07` (awal *Side Combo*). | `PL_ANM_ATK07` memiliki **`Previous PL_ANM = PL_ANM_ATK04`** dan **`Combo Direction = Side`**. |
| **`03:01–04:06`** | Menyalin `PL_ANM_ATK07..11` dan memilih `File Type = 3 = bod1` urutan kedua. | Karena di `prm_load` sekarang ada dua file bertipe `3 - bod1`, memilih `3 = bod1` yang kedua membuat `ATK07..11` membaca animasi dari `1sskbod1_gen.xfbin`! |
| **`04:07–04:32`** | Simpan file dan uji coba di *Practice Mode*. | Menahan stik ke kiri/kanan pada pukulan ke-3 langsung memicu *Old Side Combo*! |

## 3. Penjelasan Bahasa Mudah: Bagaimana Cara Kerja Cabang Arah Kombo?

Bayangkan karakter Anda sudah memukul 3 atau 4 kali (misalnya pada Sasuke Dewasa `7ssk`, pukulan ke-4 adalah **`PL_ANM_ATK03`**). Setelah `PL_ANM_ATK03` selesai, mesin game akan bertanya: *"Sekarang pemain sedang menahan stik arah ke mana?"*
* Jika pemain menahan **Atas (`Up`)** → Game mencari section yang punya `Previous PL_ANM = PL_ANM_ATK03` dan `Combo Direction = Up` (yaitu `PL_ANM_ATK15`).
* Jika pemain menahan **Bawah (`Down`)** → Game mencari section yang punya `Previous PL_ANM = PL_ANM_ATK03` dan `Combo Direction = Down` (yaitu `PL_ANM_ATK08`).
* Jika pemain menahan **Kiri/Kanan (`Side`)** → Game mencari section yang punya `Previous PL_ANM = PL_ANM_ATK03` dan **`Combo Direction = Side`** (yaitu **`PL_ANM_ATK21`** yang kita aktifkan!).
* Jika pemain **tidak menahan arah (atau arahnya tidak ditemukan)** → Game memilih section yang punya `Previous PL_ANM = PL_ANM_ATK03` dan **`Combo Direction = All Directions`** (yaitu `PL_ANM_ATK12` / kombo netral).

## 4. Panduan Eksekusi Manual Langkah demi Langkah (Beserta Rahasia Penting di *Storm 4*!)

Anda bisa menambahkan *Side Combo* dengan **2 cara**: memakai animasi dari file `bod1` kedua (seperti di video) ATAU memakai animasi keren yang sudah ada di dalam karakter Anda sendiri (seperti pada mod Sasuke/Boruto TBV kita).

### Cara 1: Membuat *Side Combo* dari Animasi Internal Karakter (Tanpa File Tambahan)
1. Buka `7sskprm.bin.xfbin` di **Character Moveset Editor** → pilih `7sskprm_mot`.
2. Cari section yang tadinya tidak terpakai / terkunci untuk raksasa, misalnya **`PL_ANM_ATK21`**.
3. Ubah pengaturannya menjadi:
   * **`Animation`**: Pilih animasi tebasan yang Anda sukai (contoh: `7sskskl1_s` dengan `File Type = 5`, atau `7sskcmb06n` dengan `File Type = 3`).
   * **`Previous PL_ANM`**: Ketik **`PL_ANM_ATK03`** (titik cabang setelah pukulan ke-4 pada `7ssk`).
   * **`Combo Direction`**: Pilih **`Side`** (`3 = Side` di UI NSC Toolbox / nilai biner `4` di *Storm 4*).
   * **`Trigger Condition 1`**: Ubah dari `16` menjadi **`0 = No condition`**.
   * **`Press Start` & `Press End` (Wajib di *Storm 4*)**: Isi dengan **`14`** dan **`30`** (jangan biarkan `-1`!).
4. **RAHASIA PENTING DI *STORM 4* (Urutan Baris di Daftar Kiri)**:
   * Di daftar kiri `Character Moveset Editor`, pastikan posisi baris **`PL_ANM_ATK21` (`Combo Direction = Side`) berada DI ATAS baris `PL_ANM_ATK12` (`Combo Direction = All Directions`)**!
   * **Mengapa?** Karena mesin *Storm 4* mengecek daftar dari atas ke bawah. Kalau `PL_ANM_ATK12` (`All Directions`) berada di atas `PL_ANM_ATK21` (`Side`), maka walaupun Anda menahan stik ke samping, game akan langsung masuk ke `PL_ANM_ATK12` karena `All Directions` menerima arah apa saja!
5. Klik **`Save PL_ANM Settings`** → **`File -> Save`**.

### Cara 2: Menambahkan *Side Combo* dari File `bod1` Versi Lama Karakter yang Sama (Persis Video)
1. Salin file `bod1` versi lama karakter tersebut ke `data_win32/spc/` dan beri nama baru (misal `7sskbod1_old.xfbin`).
2. Buka `data_win32/spcload/7sskprm_load.bin.xfbin` di **Character File Loader Editor**, klik **`Add`**, isi `File Path = spc`, `File Name = 7sskbod1_old`, `Type = 3 - bod1`, `Costume Index = -1`, centang **`[x] Base`**, klik `Save`, lalu simpan file.
3. Di **Character Moveset Editor**, salin section *Side Combo* dari file `prm` lama (`Copy to clipboard` → `Paste from clipboard`), lalu pada setiap section yang baru ditempel, ubah dropdown **`File Type`** ke pilihan **`3 = bod1` urutan kedua**.
4. Klik **`Save PL_ANM Settings`** pada setiap section, lalu simpan file `prm.bin.xfbin`.
