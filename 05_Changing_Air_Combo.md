# [NSUNSC Mod Tutorial] Changing Air Combo — Ringkasan & Panduan Eksekusi Mudah

* **Judul Video Asli**: [[NSUNSC Mod Tutorial] Changing Air Combo](https://www.youtube.com/watch?v=TcxS3Ues9TI)
* **Pembuat Video**: [Medrej Storm™ (@MedrejStorm)](https://www.youtube.com/watch?v=TcxS3Ues9TI)
* **Durasi & Tanggal Rilis**: `06:45` | 4 Oktober 2025
* **Tool yang Dipakai di Video**: [NSC Toolbox](https://github.com/TheLeonX/NSC-Toolbox) (`Character File Loader Editor` & `Character Moveset Editor`) + **HxD Hex Editor** (jika lintas karakter)

## 1. Ringkasan Isi Video (Apa Saja yang Dilakukan di Video Ini?)

Video ini membahas cara mengganti rangkaian **Kombo Udara (*Air Combo*)** ketika pemain melompat lalu menekan tombol serang berulang kali di udara:

1. Di dalam sub-chunk **`xxxprm_mot`** (`Character Moveset Editor`), seluruh gerakan kombo udara disimpan dengan nama **`PL_ANM_ATK_AIR00`**, **`PL_ANM_ATK_AIR01`**, **`PL_ANM_ATK_AIR02`**, hingga **`PL_ANM_ATK_AIR04`** atau **`PL_ANM_ATK_AIR05`** (terletak tepat di bawah kelompok `PL_ANM_ATK` darat dan tepat di atas `PL_ANM_THROW_BEGIN`).
2. Sama seperti kombo darat dan Grab, mengganti *Air Combo* memiliki **2 skenario**:
   * **Skenario A (Mengambil Air Combo dari karakter yang sama beda versi, atau dari animasi Support `bod1s` milik karakter itu sendiri)**: Tidak perlu HxD; cukup daftarkan file `bod1` di `prm_load.bin.xfbin` dan pilih nomor **`File Type`** yang sesuai.
   * **Skenario B (Mengambil Air Combo dari karakter lain yang berbeda ID)**: Edit file `bod1` karakter donor di **HxD** (`[ID]00t0` pertama → `1cmnbod1`, sisanya → `1cmn00t0`), daftarkan di `prm_load.bin.xfbin`, salin seluruh section `PL_ANM_ATK_AIR00..0x` ke karakter penerima, lalu centang **`[x] Enable Outlaw Max`** dan matikan **`[ ] Enable Face Animations`**.
3. **Poin Penting Khusus Air Combo**:
   * Jumlah pukulan udara tiap karakter berbeda-beda (contoh: Sasuke `7ssk` dan Borushiki `6bto` memiliki **3 section**: `AIR00`, `AIR01`, `AIR02`; Sakura Shippuden `2skr` memiliki **5 section**: `AIR00..04`; Sakura Kecil `1skr` memiliki **6 section**: `AIR00..05`).
   * Saat mengganti seluruh kombo udara dengan milik karakter lain, **hapus semua section `PL_ANM_ATK_AIR` lama terlebih dahulu** sebelum menempel (*Paste*) `PL_ANM_ATK_AIR` yang baru agar tidak ada sisa gerakan lama di ujung kombo udara!

## 2. Anatomi & Cara Kerja Rantai `PL_ANM_ATK_AIR`

| Nama Section | Peran dalam Kombo Udara | Pengaturan `Previous PL_ANM` | Pengaturan Penting Lainnya |
| :--- | :--- | :--- | :--- |
| **`PL_ANM_ATK_AIR00`** | Pukulan udara ke-1 (Pembuka di udara) | **`PL_ANM_ANY`** | `Trigger Condition 1 = 3` (Syarat sedang berada di udara pada *Storm 4*), `Press Start = 6`, `Press End = 20`. |
| **`PL_ANM_ATK_AIR01`** | Pukulan udara ke-2 | **`PL_ANM_ATK_AIR00`** | `Trigger Condition 1 = 4` (Lanjutan kombo udara pada *Storm 4*), `Press Start = 14`, `Press End = 30`. |
| **`PL_ANM_ATK_AIR02`** | Pukulan udara ke-3 (atau Finisher Udara pada `7ssk`) | **`PL_ANM_ATK_AIR01`** | Membanting atau menembakkan proyektil penutup di udara (`Damage Code: DAMAGE_ID_SMASH_DOWN_BOUND` / `RISE_SMALL_PUSH`). |
| **`PL_ANM_ATK_AIR03..05`** | Pukulan udara ke-4 s.d. ke-6 *(pada karakter yang punya kombo udara panjang)* | Menunjuk ke `AIR` sebelumnya (`AIR02` → `AIR03` → `AIR04`) | Gerakan terakhir menjadi *Air Finisher* (`Press Start = -1` atau `0`). |

## 3. Penjelasan Bahasa Mudah: Mengapa Karakter Bisa Tetap Melayang Saat Memukul di Udara?

Pernahkah Anda mencoba mengganti animasi kombo udara, tetapi karakter Anda malah **jatuh ke tanah sebelum selesai memukul di udara**?
* Itu terjadi karena di udara, karakter membutuhkan fungsi **"Penahan Gravitasi" (`ME_FLOATING_ON`)** di dalam daftar **`Function List`**!
* Pada awal gerakan udara (`Timing: 0` atau `2`), mesin game memanggil **`ME_FLOATING_ON`** (supaya karakter mengambang di udara selama menebas) dan **`ME_HOMING_SET` / `ME_FWDVELOCITY_SET`** (supaya karakter mengejar musuh di udara).
* Baru setelah tebasan selesai di akhir frame (`Timing: 15` atau `20`), mesin memanggil **`ME_FLOATING_OFF`** untuk mengembalikan gravitasi normal sehingga karakter turun ke tanah.

## 4. Panduan Eksekusi Manual Langkah demi Langkah

### Cara 1: Mengubah Gerakan Air Combo Menggunakan Animasi Support / Jutsu Karakter Sendiri (Paling Stabil di *Storm 4*)
Misalnya pada Sasuke Dewasa (`7ssk`), kita ingin mengubah kombo udara biasa (`7sskcma00` → `7sskcma01` → `7sskcma02`) menjadi gerakan tebasan akrobatik udara milik Support (`7ssksupa00` dan `7ssksupa01`) yang ditutup dengan tembakan *Vanishing Rasengan*:
1. Pastikan di `7sskprm_load.bin.xfbin` (dan sub-chunk `prm_load`), baris **`7sskbod1s`** (`Type = 4`) sudah dicentang **`[x] Base`**.
2. Buka `7sskprm.bin.xfbin` di **Character Moveset Editor** → pilih `7sskprm_mot`.
3. Klik **`PL_ANM_ATK_AIR00`**:
   * Ubah **`Animation`** dari `7sskcma00` menjadi **`7ssksupa00`**.
   * Ubah **`File Type`** dari `3` menjadi **`4`** (`bod1s`).
   * Pastikan **`Press Start = 6`** dan **`Press End = 20`**.
   * Klik **`Save PL_ANM Settings`**.
4. Klik **`PL_ANM_ATK_AIR01`**:
   * Ubah **`Animation`** dari `7sskcma01` menjadi **`7ssksupa01`**.
   * Ubah **`File Type`** dari `3` menjadi **`4`** (`bod1s`).
   * Pastikan **`Press Start = 14`** dan **`Press End = 30`**.
   * Klik **`Save PL_ANM Settings`**.
5. Klik **`PL_ANM_ATK_AIR02`** (Finisher Udara):
   * Di dalam **`Function List`**, tambahkan pasangan fungsi pemanggil proyektil pada frame ke-12 (`Timing = 12`):
     * Fungsi 1: `Opcode = 165 (0x00A5)`, `String Param = NINJUTSU_BULLET_EX` (*Vanishing Rasengan*)
     * Fungsi 2: `Opcode = 166 (0x00A6)`, `String Param = attach_fire00`
   * Klik **`Save`** → **`Save PL_ANM Settings`** → **`File -> Save`**.

### Cara 2: Mengganti Seluruh Rantai Air Combo dari Karakter Lain (Dengan HxD)
1. Lakukan langkah **HxD** pada file `bod1` karakter donor (ubah `[ID_Donor]00t0` pertama menjadi `1cmnbod1`, dan sisanya menjadi `1cmn00t0`), lalu daftarkan di `spcload/xxxprm_load.bin.xfbin` (`Type: 3 - bod1`, centang `Base` & `Awakening`).
2. Di **Character Moveset Editor**, hapus **semua** baris `PL_ANM_ATK_AIR00` sampai `PL_ANM_ATK_AIR0x` milik karakter Anda menggunakan tombol **`Delete`**.
3. Buka `prm.bin.xfbin` karakter donor di jendela kedua, pilih `PL_ANM_ATK_AIR00` sampai `PL_ANM_ATK_AIR` terakhirnya satu per satu, lalu klik **`Copy to clipboard`** dan **`Paste from clipboard`** ke jendela karakter Anda.
4. Pada setiap section `PL_ANM_ATK_AIR` yang baru ditempel:
   * Centang **`[x] Enable Outlaw Max`**.
   * Hapus centang **`[ ] Enable Face Animations`**.
   * Klik **`Save PL_ANM Settings`**, lalu simpan file `prm.bin.xfbin`.
