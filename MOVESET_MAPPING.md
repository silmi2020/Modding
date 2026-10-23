# BORUTO TWO BLUE VORTEX — BINARY MOVESET MAPPING SPECIFICATION v2.0 (`7ssk` & `6ssk`)

**File Biner Hasil Patching di Dalam `Boruto_Two_Blue_Vortex_Moveset_Mod.zip`**:
- `mod_files/data_win32/spc/7sskprm.bin.xfbin` (`133,711` byte, SHA-256: `40302f3e34716ffe67f3992ee1192595d17b93e76f8230d20820de03375ad33c`)
- `mod_files/data_win32/spcload/7sskprm_load.bin.xfbin` (`4,488` byte, SHA-256: `994b255b67996abaf6663a90de086a13592805bc16d6eb17b32c8d990c1ff374`)
- `mod_files/data_win32/spc/6sskprm.bin.xfbin` (`136,343` byte, SHA-256: `bd4265ff1817723b44f6fb94748ef066f4370dcf983f23652a0f2480e9aa1726`)
- `mod_files/data_win32/spcload/6sskprm_load.bin.xfbin` (`4,328` byte, SHA-256: `e2b62df36271e9d4c5d483f576298f37bf752908d0db6fd3264b5326926c6e94`)

## 1. Perbandingan Langsung di `NSC Toolbox` (`PL_ANM` Animation & `File Type` — Sebelum vs Sesudah v2.0)

Saat Anda membuka **`7sskprm.bin.xfbin`** yang baru ini di **NSC Toolbox (`Character Moveset Editor`)**, Anda akan langsung melihat bahwa animasi kombo **TIDAK LAGI `7sskcmb` semua**, melainkan telah dirombak total:

| Kategori Aksi | `PL_ANM Section` | Animasi Vanilla (Lama) | **Animasi Mod v2.0 (Baru!)** | **`File Type` Baru** | **`Press Start / End`** | Perubahan Nyata di NSC Toolbox & In-Game |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Ground Hit 1 (Starter)** | `PL_ANM_ATK00` | `7sskcmb00` (`ft=3`, 9 func) | **`7sskteam_satk00`** | **`4` (`bod1s`)** | `6 .. 22` | Gerakan pembuka berubah menjadi **Support Team Kusanagi Sword Blitz** (`16` fungsi, kecepatan `55`, + *Hiraishin Flash* `COMBO3`)! |
| **Ground Hit 2** | `PL_ANM_ATK01` | `7sskcmb01` (`ft=3`) | **`7sskskl5_n1`** | **`5` (`skl`)** | `6 .. 24` | Berubah menjadi **Chidori Kusanagi Twin Slash** (`19` fungsi)! |
| **Ground Hit 3** | `PL_ANM_ATK02` | `7sskcmb02` (`ft=3`) | **`7sskcmb03`** | **`3` (`bod1l`)** | `8 .. 24` | **Rinnegan / Hiraishin Blink Behind Slash + Kick** maju menjadi pukulan ke-3! |
| **Ground Hit 4 (4-Way Hub)** | `PL_ANM_ATK03` | `7sskcmb03` (`ft=3`) | **`7sskcmb10`** | **`3` (`bod1l`)** | `8 .. 24` | Berubah menjadi **Multi-Slash Sword Flurry** (`DAMAGE_ID_STAGGER_NORMAL` + `COMBO3` *Hiraishin*)! |
| **Side Combo (Cabang Ke-4)** | **`PL_ANM_ATK21`** *(Di atas ATK12!)* | `7sskcmb06n` (`trig1=16`, `ps=-1`) | **`7sskskl1_s`** | **`5` (`skl`)** | **`12 .. 30`** | `Combo Direction = 4 (Side)`, `trig1 = 0`: Menebaskan pedang *Uchiha Style* sambil menembakkan ***Vanishing Rasengan* (`NINJUTSU_BULLET_EX`)** + **Gelombang Api/Pedang (`NINJUTSU_BULLET_TYPE_2`)**! |
| **Neutral Hit 5** | `PL_ANM_ATK12` | `7sskcmb05` (`ft=3`) | **`7sskcmb06n`** | **`3` (`bod1l`)** | `10 .. 26` | Menggunakan animasi *Giant Horizontal Kusanagi Cleave* di kombo biasa sebelum masuk ke finisher! |
| **Neutral Finisher** | `PL_ANM_ATK13` $\rightarrow$ `ATK14` | `7sskcmb06a` $\rightarrow$ `7sskcmb06b` | **`7sskcmb06a`** $\rightarrow$ **`7sskcmb06b`** | **`3` (`bod1l`)** | `0 .. 0` | Disuntikkan *Rasengan Charge* (`COMBO7`), ***Vanishing Rasengan* (`NINJUTSU_BULLET_EX`)**, dan ledakan ***Rasengan: Uzuhiko* (`COMB15` = `7brteff1_cmb06_e_worldhit00`)**! |
| **Down Combo Hit 5..7** | `ATK08` $\rightarrow$ `ATK11` $\rightarrow$ `ATK22` | `7sskcmb10` $\rightarrow$ `11` (`ATK22` terkunci) | **`7sskskl5_n2`** $\rightarrow$ **`7sskcmb11_n`** $\rightarrow$ **`7sskcmb11`** | **`5` $\rightarrow$ `3` $\rightarrow$ `3`** | `10 .. 28` | *Chidori Blade Surge* (`7sskskl5_n2` + *Halo Dance Wave*) $\rightarrow$ *Giant Lightning Smash* (`7sskcmb11_n`) $\rightarrow$ *Teleport Dive-Bomb Finisher* (`7sskcmb11`)! |
| **Up Combo Hit 5..7** | `ATK15` $\rightarrow$ `ATK17` $\rightarrow$ **`ATK18`** | `7sskcmb20` $\rightarrow$ `21` (`ATK18` terkunci) | **`7sskcmb20`** $\rightarrow$ **`7sskcmb21`** $\rightarrow$ **`7ssksupa02`** | **`3` $\rightarrow$ `3` $\rightarrow$ `4`** | `10 .. 28` | Menambahkan akhiran ke-3 di udara **`7ssksupa02`** (*Support Aerial Kick + Meteor Sword Slam*) + ledakan *Uzuhiko* (`COMBO2`)! |
| **Tilt Attack** | `PL_ANM_ATK_FAR00` | `7sskcmr00` (`ft=3`) | **`7sskpur00`** | **`4` (`bod1s`)** | `10 .. 25` | Berubah total menjadi **High-Speed Teleport Pursuit Slash (`7sskpur00`)** yang memicu *Uzuhiko Planetary Weave* (`COMBO1`), menembakkan gelombang `NINJUTSU_BULLET_TYPE_2`, dan membuat lawan terkena stagger (`DAMAGE_ID_STAGGER_NORMAL`)! |
| **Air Combo (`AIR00..02`)** | `PL_ANM_ATK_AIR00..02` | `7sskcma00..02` (`ft=3`) | **`7ssksupa00`** $\rightarrow$ **`7ssksupa01`** $\rightarrow$ **`7sskcma02`** | **`4` $\rightarrow$ `4` $\rightarrow$ `3`** | `6 .. 22` | Kombo udara 1 & 2 berubah menjadi tebasan akrobatik Support (`7ssksupa00/01`) dan ditutup dengan ***Vanishing Rasengan* (`NINJUTSU_BULLET_EX`)** di udara! |
| **Grab / Throw** | `PL_ANM_THROW_BEGIN` $\rightarrow$ `ATTACKER` / `VICTIM` | `7sskhola0` $\rightarrow$ `7sskhola1` / `7sskhold0` (`ft=3`) | **`7sskhola0`** $\rightarrow$ **`7sskskl5_atk2`** / **`7sskskl5_dmg2`** | **`3` $\rightarrow$ `5` (`skl`)** | `0 .. 0` | Begitu tangkapan kena, animasi bantingan berubah menjadi **Sinematik 11-Hit Kusanagi & Lightning Barrage (`7sskskl5_atk2` / `dmg2`)** dengan ledakan *Uzuhiko*! |
| **Chakra Shuriken (Darat & Udara)** | `PL_ANM_PRJ_CHA_LAND` & `AIR` | Melempar shuriken chakra biasa | **`7sskshc00` / `shca0` + Dual Jutsu Projectile** | **`2` (`bod1c`)** | — | Menekan Chakra Shuriken (`Y + X` / `Segitiga + Kotak`) kini langsung menembakkan ***Vanishing Rasengan* Boruto (`4efb_7brt1`)** + **Gelombang Pedang (`3efb_4ssi1`)** + **Kunai Hiraishin (`2fou`)** sekaligus! |
| **Ninjutsu (`ATK_SKILL0_c1`)** | `PL_ANM_ATK_SKILL0_c1` & `AIR` | `7sskskl2_c1` (*Chidori / Kagutsuchi*) | **`7sskskl2_c1` + *Uzuhiko & Vanishing Rasengan*** | **`5` (`skl`)** | — | Saat Ninjutsu dilepaskan, selain sabetan pedang petir, Boruto otomatis meluncurkan ***Vanishing Rasengan* (`NINJUTSU_BULLET_EX`)** dan pusaran ***Rasengan: Uzuhiko* (`COMBO1` & `COMBO4`)**! |

## 2. Tabel Modifikasi `Chunk #07` (`prm_sklslot` — `Projectile List` di `7ssk` & `6ssk`)

| Nama Slot (`Projectile Name`) | `Skill File Name` (Mod v2.0) | `Skill Entry Name` (Mod v2.0) | Dipanggil Oleh Opcode | Fungsi Visual & Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| **`SYURIKEN`** | `2fou_x.xfbin` | `2foucmb_skn_e_begin00` | `0x00A0` (`ME_SHURIKEN`) | Lemparan 3 Kunai *Flying Thunder God* (*Hiraishin*) milik Minato di Mode Base. |
| **`CHAKRA_SYURIKEN`** | `2fou_x.xfbin` | `2foueff1_csk_e_begin00` | `0x00A1` (`ME_CHAKRA_SHURIKEN`) | Lemparan Kunai Chakra *Hiraishin* berkecepatan tinggi. |
| **`NINJUTSU_BULLET_EX`** | `4efb_7brt1_x.xfbin` | `4efb_7brt1_e_begin00` | `0x00A5` + `0x00A6` (`attach_fire00`) | Proyektil ***Vanishing / Spiraling Rasengan* Boruto** (aktif pada Chakra Shuriken, Side Combo `ATK21`, Neutral Finisher `ATK14`, Air Finisher `AIR02`, dan Ninjutsu!). |
| **`NINJUTSU_BULLET_TYPE_2`** | `3efb_4ssi1_x.xfbin` | `3efb_4ssi1_e_blt00` | `0x00A5` + `0x00A6` (`attach_fire00`) | Proyektil gelombang tebasan jarak jauh ***Uchiha Style: Halo Dance*** milik Shisui (aktif pada Tilt `ATK_FAR00`, Side Combo `ATK21`, Down Combo `ATK08`, dan Chakra Shuriken!). |
| **`COMBO1`** | `7brt_x.xfbin` | `7brteff1_cmr_e_begin00` | `0x00A5` + `0x00A6` (`1efc_dmy01`) | Pusaran angin/chakra ***Rasengan: Uzuhiko*** di sekeliling tubuh. |
| **`COMBO2`** | `7brt_x.xfbin` | `7brteff1_cmb21_e_worldhit00` | `0x00A5` + `0x00A6` (`1efc_dmy02`) | Ledakan ***Aerial Uzuhiko Vortex*** pada Up Combo (`ATK17` & `ATK18`). |
| **`COMBO3`** | `2fou_x.xfbin` | `2foueff1_e_shine00` | `0x00A5` + `0x00A6` (`1efc_dmy01`) | Kilatan teleportasi ruang-waktu ***Flying Thunder God* (*Hiraishin*)**. |
| **`COMBO4`** | `7brt_x.xfbin` | `7brteff1_cmb06_e_worldhit00` | `0x00A5` + `0x00A6` (`1efc_dmy02`) | Hantaman penuh ***Rasengan: Uzuhiko***. |
| **`COMBO6`** | `4efb_7brt1_x.xfbin` | `4efb_7brt1_e_begin00` | `0x00A5` + `0x00A6` (`attach_fire00`) | *Vanishing Rasengan* di udara. |
| **`COMBO7`** | `4efb_rsn1_x.xfbin` | `4efb_rsn1_e_ge00` | `0x00A5` + `0x00A6` (`1efc_dmy01`) | Bola chakra *Rasengan* di telapak tangan. |
| **`COMBO9`** | `7brt_x.xfbin` | `7brteff1_cmb06_n_e_worldhit00` | `0x00A5` + `0x00A6` (`1efc_dmy02`) | Hantaman *Uzuhiko Vortex Slam* pada Side Combo (`ATK21`). |
| **`COMB10`** | `7brt_x.xfbin` | `7brteff1_hola1_e_worldhit00` | `0x00A5` + `0x00A6` (`1efc_dmy02`) | Gelombang kejut pada Down Finisher (`ATK22`) dan Grab (`THROW_SUCCESS_ATTACKER`). |
| **`COMB15`** | `7brt_x.xfbin` | `7brteff1_cmb06_e_worldhit00` | `0x00A4` (`Param 1 = 15`) | Dipanggil secara native oleh `PL_ANM_ATK14` (`Timing 36`) untuk meledakkan *Rasengan: Uzuhiko*! |
| **`DEFAULT_DODGE`** | `2fou_x.xfbin` | `2foueff1_dodge00_e_begin00` | Sistem Dodge Engine | Efek kilatan *Flying Thunder God* saat menghindar. |
