# BORUTO: TWO BLUE VORTEX — CUSTOM MOVESET ENGINEERING BLUEPRINT (`TBV BORUTO — ABSOLUTE DOMINION`)

**Project Codename**: `TBV BORUTO — ABSOLUTE DOMINION`
**Target Game**: *Naruto Shippuden: Ultimate Ninja Storm 4* (PC / Steam v1.09)
**Base Character Template ID**: `7ssk` (Adult Sasuke / Sasuke the Wandering Shinobi)
**Existing Boruto Reference ID**: `7brt` (Boruto Uzumaki)
**Current Phase**: Phase 1 — Moveset Research, Canon Mapping, Donor Architecture, & Technical Blueprint (Model Replacement Deferred to Phase 5)

## 1. Project Vision & Engineering Scope

1. **Core Objective**: Engineer an overpowered yet manga-authentic *Boruto: Two Blue Vortex* (Post-Timeskip) custom moveset for *Naruto Shippuden: Ultimate Ninja Storm 4* (PC) using **`7ssk` (Adult Sasuke)** as the foundational technical template (`7sskprm.bin.xfbin`, `7sskprm_load.bin.xfbin`, `7sskbod1.xfbin`).

2. **Moveset-First Architecture**: All 3D model, costume mesh, and texture replacements are intentionally deferred until Phase 5. During Phases 1–4, `7ssk` serves as the functional test rig because he already possesses a one-handed sword skeleton attachment (`Kusanagi`), lightning-katana bone bindings, teleportation/warp state logic, and high-tier frame pacing.

3. **Strict Epistemic & Canon Classification**:

   * **`CANON`**: Directly demonstrated by Boruto in official *Boruto: Two Blue Vortex* chapters ([VIZ Official Listing](https://www.viz.com/shonenjump/chapters/boruto-two-blue-vortex), [MANGA Plus](https://mangaplus.shueisha.co.jp/titles/100269), [Naruto Official Database](https://naruto-official.com/en/news/01_1710)).

   * **`CANON-INSPIRED ADAPTATION`**: Grounded in a canon *Two Blue Vortex* technique, adapted to operate cleanly within *Storm 4*'s `prm_mot` / `prm_spl` state machine and `Projectile List` constraints.

   * **`CREATIVE OVERPOWERED ADDITION`**: Deliberate mechanical enhancements (cancel windows, hitstun locks, multi-hit frame events, homing/velocity boosts, and giant-finisher uncaps) engineered to make TBV Boruto feel like an apex, overwhelming combatant in *Storm 4*.

## 2. Canon Ability Database (*Boruto: Two Blue Vortex* Chapters 1–38)

*Note on Official Source Access*: [VIZ Shonen Jump (`Chapters 1–38`)](https://www.viz.com/shonenjump/chapters/boruto-two-blue-vortex) was verified directly up to Chapter 38 (October 2026). [MANGA Plus (`Title 100269`)](https://mangaplus.shueisha.co.jp/titles/100269) requires client-side JavaScript rendering, and [Naruto Official Site (`naruto-official.com`)](https://naruto-official.com/) returned a scheduled maintenance notice during static browsing, so official *Boruto Database* entries were cross-verified via indexed search snippets ([Boruto Database: Uchiha Style Sword Techniques `01_1710`](https://naruto-official.com/en/news/01_1710)) and chapter-cited wiki repositories ([Narutopedia — Rasengan: "Uzuhiko"](https://naruto.fandom.com/wiki/Rasengan:_%22Uzuhiko%22), [Narutopedia — Purple Electricity](https://naruto.fandom.com/wiki/Lightning_Release:_Purple_Electricity), and [Boruto Uzumaki TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\))).

| Official / Japanese Name | Common English Name | Manga Debut & Key Chapters | Canon Function & Visual Appearance | Combat Role & Execution by Boruto | Canon Status | Storm 4 Engine Representation Strategy | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **うちは流剣術** (*Uchiha-ryū Kenjutsu*) & **うちは流剣術「羽衣」** (*Hagoromo*) | Uchiha Style Kenjutsu & Blade Technique: Hagoromo | *TBV* Ch. 1, 2 (p. 24–27), Ch. 4, Ch. 5 (p. 3), Ch. 11, Ch. 24–25, Ch. 28; [Boruto Database `01_1710`](https://naruto-official.com/en/news/01_1710) | High-speed one-handed *iaijutsu* draws, diagonal precision slashes, and chakra-coated blade strikes using Sasuke's Kusanagi sword (upgraded by Sumire in Ch. 24–25). | Primary close-quarters offense, parry-counter slashes, and gap-closing sword flurries. | `CANON` (Confirmed Technique) | Native `7ssk` one-handed Kusanagi animations (`7sskbod1`) combined with `5ssk`, `6ssk`, and retargeted `4ssi` (Shisui) high-speed sword slashes. | 
| **螺旋丸「渦彦」** (*Rasengan "Uzuhiko"*) | Rasengan: "Uzuhiko" | *TBV* Ch. 2–3 (vs. Code, p. 8–28), Ch. 12–13 (vs. Hidari, p. 21–29), Ch. 22 (vs. Jura, p. 29, 41); [Narutopedia](https://naruto.fandom.com/wiki/Rasengan:_%22Uzuhiko%22) | Harnesses planetary rotation/orbital chakra through both feet on the ground. Swirling chakra lines coil around Boruto's body/arm; low output inflicts perpetual vertigo/internal damage on touch, while full output unleashes a massive spiraling vortex that disintegrates the target. | Semi-charged version used as a close-range weave/counter strike (Ch. 3); full-output version used as a grounded trump-card finisher (Ch. 12). | `CANON` (Confirmed Signature Technique) | **Tilt / Combo Finisher** (semi-charged slip-counter + crumple `DAMAGE_ID_STAGGER_NORMAL` / `DOWN`) and **Ninjutsu Slot 1 / Ultimate Jutsu** (full-power vortex burst). | 
| **飛雷神の術** (*Hiraishin no Jutsu*) | Flying Thunder God Technique (Boruto Variant) | *TBV* Ch. 4 (vs. Code), Ch. 7 (vs. Mitsuki), Ch. 11–13 (vs. Jura/Hidari), Ch. 16 (Kashin Koji training); [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Instantaneous space-time teleportation to chakra-infused metal markers (pins, kunai, shuriken, Kusanagi blade) across combat range or dimensions. | Used mid-combo to appear behind/above enemies, evade lethal projectiles, and chain sword/Rasengan ambushes. | `CANON` (Confirmed Technique) | Implemented via instant-warp `PL_ANM` transitions (`ME_ENEMY_SET_COORD` / high `ME_FWDVELOCITY_SET` + `ME_HOMING_SET` + visibility toggle or `2fou`/`3mnt`/`7ssk` teleport animations). | 
| **雷遁・紫電** (*Raiton: Shiden*) | Lightning Style: Purple Lightning | *TBV* Ch. 4, Ch. 6–7 (vs. Sage Mitsuki); [Narutopedia](https://naruto.fandom.com/wiki/Lightning_Release:_Purple_Electricity) | Dense purple electricity unleashed as an omnidirectional shockwave, a close-range thrust, or channeled through the Kusanagi blade. | Defensive/offensive burst to shred incoming attacks and paralyze opponents at close-to-mid range. | `CANON` (Confirmed Technique) | Adapted using `7ssk` / `5ssk` *Chidori Current* (`Chidori Nagashi`) or *Chidori Blade* (`skill`/`eff1`) paired with purple lightning VFX or `3kks` lightning slash actions. | 
| **雷遁・迅雷箭** (*Raiton: Jinraisen*) & **雷・三連** (*Ikazuchi: Sanren*) | Lightning Style: Thunderclap Arrow & Lightning Triplet | *TBV* Ch. 4 (p. 14, vs. Claw Grimes), Ch. 29; [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Fires a fast lightning projectile spear/arrow from the palm or hurls three lightning-infused shuriken that stun on impact. | Mid-range zoning, combo extension, and aerial pressure. | `CANON` (Confirmed Technique) | Mapped to **Chakra Shuriken / Shuriken (`Projectile List`)** or **Air/Ranged Ninjutsu** using lightning projectile entries (`7brt`, `7ssk`, `5mdr`). | 
| **風遁・突破** (*Fūton: Toppa*) & **風遁・烈風掌** (*Fūton: Reppūshō*) | Wind Style: Breakthrough & Gale Palm | *TBV* Ch. 11–12 (vs. Hidari); [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Expels a high-pressure concussive wind blast at close range (blowing Hidari back after a sword block) or accelerates projectiles/user movement threefold. | Guard-break shockwave, spacing tool, or high-speed aerial dash burst. | `CANON` (Confirmed Technique) | Used as a high-pushback combo ender (`Horizontal Push` tuning in `ME_ATKHIT_ON`) or fast dash/projectile accelerator. | 
| **螺旋丸 / 超大玉螺旋丸 / 消える螺旋丸** | Rasengan / Massive Rasengan / Vanishing Rasengan | *TBV* Ch. 4, Ch. 12; [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Compressed/standard/massive spiraling chakra spheres slammed directly into the enemy or thrown as a vanishing projectile. | High-damage punisher after sword/teleport setups. | `CANON` (Confirmed Technique) | Borrowed from `7brt` (Boruto), `7nrt` (Hokage Naruto), `6nrt` (The Last Naruto), or `2fou`/`3mnt` (Minato Teleport Rasengan). | 
| **影分身の術** (*Kage Bunshin no Jutsu*) | Shadow Clone Jutsu | *TBV* Ch. 7 (vs. Mitsuki); [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Summons a single tactical clone for high-IQ feints and blindside strikes rather than spamming dozens of clones. | Tactical bait-and-punish combined with Flying Thunder God and sword strikes. | `CANON` (Confirmed Technique) | Borrowed from `7brt`, `2itc` (clone feint), or `7nrt`/`6nrt` clone-assisted combo finishers via `ME_ENTRY_COMBO_SKILL_N_COORD`. | 
| **楔 (カーマ)** (*Kāma*) & \*\* Ōtsutsuki Flight\*\* | Kāma Seal / Momoshiki Pact & Flight | *TBV* Ch. 1, 2, 6, 11–13, 25–29; [Boruto TBV Profile](https://vsbattles.fandom.com/wiki/Boruto_Uzumaki_\(Two_Blue_Vortex\)) | Full-blooded Ōtsutsuki levitation/flight and Kāma activation (amplifying physical stats, jutsu output, and chakra absorption). | High-speed aerial mobility and Awakening state power surge. | `CANON` (Confirmed State) | **Awakening State** (`7ssk` / `5nrt` / `5mdr` floating/flight movement parameters + enhanced `prm_mot` & `AWA_SYURIKEN`). | 

## 3. Study of Base Character `7ssk` (Adult Sasuke) & Independence from Model Replacement

1. **Why `7ssk` is the Optimal Technical Foundation for TBV Boruto**:

   * **Skeleton & Weapon Bone Compatibility**: `7ssk` (`7ssk00t0`) natively uses a one-handed straight sword (`Kusanagi`) and a left-arm/palm casting posture—matching Post-Timeskip Boruto's exact silhouette, cape/cloak physics, and one-handed Uchiha-style kenjutsu taught by Sasuke!

   * **Resource Footprint in *Storm 4***:

     * `data_win32/spc/7sskprm.bin.xfbin`: Contains `7sskprm_bas` (base stats/movement), `7sskprm_mot` (`PL_ANM_ATK`, `PL_ANM_ATK_AIR`, `PL_ANM_THROW`, `Projectile List`), `7sskprm_atk` (hitbox/attack attributes), and `7sskprm_spl` (Ultimate Jutsu state machine).

     * `data_win32/spcload/7sskprm_load.bin.xfbin`: Manifest loader controlling which `bod1`, `eff1`, `skill`, and `spl1` containers are loaded into RAM for `Base`, `Awakening`, `Jutsu`, and `Ultimate Jutsu`.

     * `data_win32/spc/7sskbod1.xfbin`: Contains `7ssk`'s native sword combo, air combo, grab, and ninjutsu animations bound to skeleton prefix `7ssk00t0`.

2. **Moveset vs. Model Independence Analysis**:

   * **Can the moveset be modified and tested on `7ssk` BEFORE replacing the 3D model?**
     **YES (`[VERIFIED IN VIDEO]` & `[VERIFIED IN SOURCE]`)**. In CyberConnect2's `NUCC` engine, `7sskprm.bin.xfbin` and `7sskprm_load.bin.xfbin` operate on animation chunk names and skeleton bone prefixes (`7ssk00t0` for native animations, or `1cmnbod1`/`1cmn00t0` with `Enable Outlaw Max` for retargeted donor animations). We can build, tune, and in-game verify 100% of the TBV Boruto moveset on `7ssk`'s existing Adult Sasuke model first. When the custom TBV Boruto 3D mesh is ready in Phase 5, it simply replaces the visual clump/mesh inside `7sskbod1.xfbin` (keeping the `7ssk00t0` bone hierarchy intact), meaning zero moveset work is lost!

## 4. Complete Boruto TBV Moveset Blueprint (Slot-by-Slot Engineering Specification)

### A. Ground Combo — *"Uchiha-Style Iaijutsu & Flying Raijin Dominion"* (`PL_ANM_ATK00` – `PL_ANM_ATK06`)

* **Combat Role**: Ultra-fast, high-priority sword pressure with built-in homing (`61 = ME_HOMING_SET`), minimal recovery, and a devastating grounded vortex finisher.

* **Canon Classification**: `CANON` (Uchiha Style Kenjutsu + Wind Style: Breakthrough + Rasengan: Uzuhiko) + `CREATIVE OVERPOWERED ADDITION` (enhanced homing, frame-trap stagger codes, and unlocked giant finisher).

* **Proposed Stage-by-Stage Sequence**:

  1. **Hit 1 (`PL_ANM_ATK00`, `Prev: PL_ANM_ANY`, `Dir: 0 = All`)**: Instant step-in *iaijutsu* horizontal sword draw (`7ssk` / `6ssk` opener) with boosted `55 = ME_FWDVELOCITY_SET` and `61 = ME_HOMING_SET` (`Damage Code: DAMAGE_ID_SMALL_UL` so the opponent stays within sword range).

  2. **Hit 2 (`PL_ANM_ATK01`, `Prev: PL_ANM_ATK00`, `Dir: 0 = All`)**: Rapid twin diagonal Kusanagi cross-slashes (`7ssk` / `5ssk` 2nd hit).

  3. **Hit 3 (`PL_ANM_ATK02`, `Prev: PL_ANM_ATK01`, `Dir: 0 = All`)**: Spinning reverse-grip sword slash + close-range palm/kick strike (`7ssk` / `4ssi` 3rd hit; acts as the primary **Branch Hub** for Up, Down, and Side combos).

  4. **Hit 4 (`PL_ANM_ATK03`, `Prev: PL_ANM_ATK02`, `Dir: 0 = All`)**: High-speed *Flying Thunder God* blink behind the opponent (`7ssk` Rinnegan reposition / `2fou` teleport slash) with `DAMAGE_ID_STAGGER_NORMAL` to lock the opponent from mash-escaping.

  5. **Hit 5 (`PL_ANM_ATK05`, `Prev: PL_ANM_ATK03`, `Dir: 0 = All`)**: Lightning-infused multi-hit sword flurry (*Uchiha Style: Hagoromo* / *Purple Lightning* slash barrage from `7ssk` / `4ssi`).

  6. **Hit 6 Finisher (`PL_ANM_ATK06`, `Prev: PL_ANM_ATK05`, `Dir: 0 = All`)**: Point-blank *Rasengan: Uzuhiko* / vortex palm slam (adapted from `7brt` / `6nrt` / `7ssk` finisher or unlocked `_b` giant finisher with `Trigger Condition 1` changed from `16` to `0`), inflicting massive damage and spiral knockback.

### B. Directional Ground Branches (Up Combo, Down Combo, & Restored Old Side Combo)

* **1. Up Combo (`PL_ANM_ATK20..23`, `Combo Direction: 1 = Up`) — *"Aerial Hiraishin Ascent"***:

  * **Role**: Fast launcher into immediate Air Combo follow-up.

  * **Concept (`CANON-INSPIRED ADAPTATION`)**: After Hit 2/3, Boruto unleashes a rising lightning-coated Kusanagi uppercut (`7ssk` / `5ssk` Up branch) followed by an upward teleport slam that sets `Damage Code: DAMAGE_ID_RISE_SMALL_PUSH`, leaving the enemy suspended in air for a guaranteed Chakra Dash or Air Combo extension.

* **2. Down Combo (`PL_ANM_ATK10..13`, `Combo Direction: 2 = Down`) — *"Purple Lightning Execution & Wind Breakthrough"***:

  * **Role**: High-guard-damage shield-shredder and hard knockdown punisher.

  * **Concept (`CANON-INSPIRED ADAPTATION`)**: Channels *Purple Lightning* through the Kusanagi blade to slam the ground, followed by a point-blank *Wind Style: Breakthrough* / *Lightning Triplet* blast (`7ssk` Down branch + `COMBOxx` projectile spawn via `44 = ME_ENTRY_COMBO_SKILL_N_COORD`) with boosted `Guard Damage Amount` in `18 = ME_ATKHIT_ON`.

* **3. Side Combo (`PL_ANM_ATK07..11`, `Combo Direction: 3 = Side`) — *"Flying Thunder God Blindside Loop"***:

  * **Role**: Unpredictable lateral repositioning and combo extender (using the `Combo Direction = 3 = Side` restoration technique verified in [Video 5](https://www.youtube.com/watch?v=YKgLFsMCpm0)).

  * **Concept (`CREATIVE OVERPOWERED ADDITION` + `CANON` Hiraishin)**: Holding Left/Right on Hit 3 triggers an additional branch (`Combo Direction = 3 = Side`) where Boruto warps to the opponent's flank (`6ssk` / `4ssi` / `2fou` lateral slash) and inflicts `DAMAGE_ID_STAGGER_NORMAL`, enabling high-pressure mix-ups against guarding opponents.

### C. Air Combo — *"Otsutsuki Levitation & Hiraishin Aerial Flurry"* (`PL_ANM_ATK_AIR00` – `PL_ANM_ATK_AIR04/05`)

* **Combat Role**: Fast, multi-angle aerial sword dominance that prevents air recovery and spikes the opponent into the ground.

* **Canon Classification**: `CANON` (Aerial Kenjutsu + Flying Thunder God mid-air warps vs. Jura/Hidari in *TBV* Ch. 11–13) + `CREATIVE OVERPOWERED ADDITION`.

* **Proposed Sequence**:

  * Uses `7ssk`'s fast aerial sword slashes (`PL_ANM_ATK_AIR00..02`) chained into a mid-air teleport overhead slash (`7ssk` / `2fou` / `3mnt` air finisher) with tight `ME_FLOATING_ON` suspension windows and a downward meteor slam finisher.

### D. Dash, Chase, and Pursuit — *"Supersonic Otsutsuki Flight & Hiraishin Pursuit"*

* **Combat Role**: Relentless gap-closing and instant combo continuation.

* **Canon Classification**: `CANON` (Ōtsutsuki flight speed that outpaced Kawaki and Delta in *TBV* Ch. 14).

* **Implementation Strategy**:

  * Inspect `Ninja Movement Settings` and `PL_ANM_DSH_*` inside `7sskprm_mot` (`7sskprm.bin.xfbin`).

  * Tune dash velocity (`ME_FWDVELOCITY_SET`) and homing parameters (`ME_HOMING_SET`), or evaluate floating/flight dash animations from `5nrt` (Six Paths Naruto) / `5mdr` / `2fou` so Boruto's dash feels blindingly fast.

### E. Tilt / Special Physical Attack — *"Rasengan: Uzuhiko — Planetary Weave (Semi-Charged)"* (`PL_ANM_ATK_FAR` / Tilt State)

* **Combat Role**: Signature evasive counter-weave and guard-crushing stagger starter.

* **Canon Reference (`CANON` — *TBV* Ch. 3, p. 8–13)**: Against Code, Boruto calmly weaves past Code's claw strikes while cloaked in swirling *Uzuhiko* planetary chakra, brushing past Code to plant disorienting rotational energy into his torso.

* **Implementation Strategy**:

  * Base on `7ssk`'s existing Tilt (or `6ssk` / `2fou` / `4ssi` teleport-slash Tilt in `prm_mot`).

  * Configure `18 = ME_ATKHIT_ON` with high `Guard Damage Amount`, `Freeze Time`, and `Damage Code: DAMAGE_ID_STAGGER_NORMAL` (simulating *Uzuhiko*'s vertigo/balance loss!) so that landing the Tilt leaves the opponent reeling in place for a guaranteed full Ground Combo or Ninjutsu punish!

### F. Shuriken & Chakra Shuriken — *"Lightning Triplet & Hiraishin Marker Kunai"* (`Projectile List`: `SYURIKEN`, `CHAKRA_SYURIKEN`, `AWA_SYURIKEN`)

* **Combat Role**: High-velocity ranged hitstun and combo extension.

* **Canon Reference (`CANON` — *TBV* Ch. 4, Ch. 12, Ch. 29)**: Boruto uses *Lightning Triplet* (`Ikazuchi: Sanren`), *Thunderclap Arrow* (`Jinraisen`), and *Gale Palm*-accelerated shuriken.

* **Implementation Strategy (Verified via [Video 3 `XMqRwv2715s`](https://www.youtube.com/watch?v=XMqRwv2715s))**:

  * **Standard `SYURIKEN`**: Fast lightning-infused shuriken or high-speed kunai (`7ssk` / `7brt`).

  * **`CHAKRA_SYURIKEN` & `AWA_SYURIKEN`**: Map to a high-speed piercing lightning/energy projectile (such as `7ssk`'s lightning shuriken, `7brt`'s *Vanishing Rasengan* projectile, or `5mdr`'s energy wave `5mdr_a_skn00`) in `Projectile List` + `7sskprm_load.bin.xfbin` (`Type: 11 - skill` & `Type: 10 - eff1`).

### G. Grab — *"Shadow Clone Feint -> Flying Thunder God Blindside Slash"* (`PL_ANM_THROW_BEGIN`, `SUCCESS_ATTACKER`, `SUCCESS_VICTIM`)

* **Combat Role**: Fast, deceptive guard-break throw with hard knockdown.

* **Canon Reference (`CANON` — *TBV* Ch. 4, Ch. 7, Ch. 12)**: Boruto's tactical use of a Shadow Clone or *Hiraishin* marker to bait the opponent's guard and instantly slash/blast them from behind.

* **Implementation Strategy (Verified via [Video 4 `K_DrvEl2XBE`](https://www.youtube.com/watch?v=K_DrvEl2XBE))**:

  * Inspect `7ssk`'s native grab first (`7sskbod1_trw00` / `trw01` / `trw01_e`), and compare against candidate donor grabs from **`6ssk` (The Last Sasuke)**, **`2fou` / `3mnt` (Minato Flying Raijin grab)**, **`4ssi` (Shisui)**, and **`7brt` (Boruto)**.

  * If borrowing from a non-`7ssk` donor, use `argon_moveset_toolkit.py retarget-bod1` (`<donor>00t0` $\rightarrow$ `1cmnbod1` / `1cmn00t0`), register in `7sskprm_load.bin.xfbin`, map `COMBOxx` impact effects in `Projectile List`, check **`[x] Enable Outlaw Max`**, and uncheck **`[ ] Enable Face Animations`**.

### H. Ninjutsu Slot 1 — *"Rasengan: Uzuhiko (Planetary Vortex Strike)"* or *"Flying Raijin: Rasengan"*

* **Combat Role**: Primary high-damage offensive breaker and combo ender.

* **Canon Reference (`CANON` — *TBV* Ch. 3 & Ch. 12)**: Boruto accumulates planetary rotation chakra from the ground and drives a swirling vortex palm strike into the target's chest.

* **Implementation Strategy**:

  * Inspect `7brt` (Boruto), `6nrt` (The Last Naruto), `7nrt` (Hokage Naruto), and `2fou`/`3mnt` (Minato) ninjutsu actions and skill files (`skill/` + `eff1`).

  * A teleporting or lunging Rasengan sequence combined with vortex/spiral wind-lightning impact effects (`Projectile List` + `spcload` registration) provides both authentic visuals and top-tier tracking.

### I. Ninjutsu Slot 2 (or Awakening/Secondary Jutsu) — *"Lightning Style: Purple Lightning (Shiden Omnidirectional / Blade Surge)"*

* **Combat Role**: 360-degree anti-rushdown shield / close-to-mid-range paralysis wave that complements Slot 1's forward lunge.

* **Canon Reference (`CANON` — *TBV* Ch. 6–7 vs. Mitsuki)**: Boruto discharges *Purple Lightning* across his body and blade to sever surrounding threats and stun attackers.

* **Implementation Strategy**:

  * In *Storm 4*, `7ssk` and `5ssk` already possess *Chidori Current* / *Chidori* / *Inferno Style* ninjutsu structures, and `3kks` possesses lightning blade techniques. Using `UltimateStormAPI` (which supports *Storm 4* in [NSC Toolbox v2.0.0.0+](https://github.com/TheLeonX/NSC-Toolbox/releases)) or mapping one Ninjutsu to Base and an enhanced Ninjutsu to Awakening allows Boruto to wield both *Uzuhiko/Rasengan* and *Purple Lightning*!

### J. Ultimate Jutsu — *"Rasengan: Uzuhiko — Maximum Output (Planetary Obliteration)"* (`7sskprm_spl`: `PL_ANM_SPSKILL1_*`)

* **Combat Role**: Cinematic trump card with fast startup, wide hitbox, and devastating damage.

* **Canon Reference (`CANON` — *TBV* Ch. 12, p. 21–29 vs. Hidari + Ch. 3 vs. Code)**: Boruto stands grounded as planetary chakra coils violently around him, teleports via *Flying Thunder God* to strike the opponent's torso, and unleashes the full rotational force of the planet to tear the target apart in a towering vortex.

* **6-Part Storyboard & Technical Mapping (`7sskprm_spl`)**:

  1. **Opening Action (`PL_ANM_SPSKILL1_CUTIN` / `CUTIN_NC`)**: Boruto plants both feet firmly on the ground (`SPSKILL_CUTIN_EFF_SOIL/WATER/SNOW`), eyes cold and focused (`SPSKILL_EYE00`), as crackling lightning/wind vortex energy coils around his body.

  2. **Initial Contact / Setup (`PL_ANM_SPSKILL1_START`)**: Boruto hurls a *Hiraishin*-marked kunai/sword slash forward (`COMBO11` projectile / high-speed lunge).

  3. **Transition into Main Attack (`PL_ANM_SPSKILL1_HIT`)**: On impact, Boruto instantaneously warps directly in front of the staggered opponent via *Flying Thunder God*, slicing through their guard with the Kusanagi blade.

  4. **Escalation of Power (`PL_ANM_SPSKILL1_DEMO_DMG` — Part 1)**: Rotating planetary chakra lines surge from the ground through Boruto's feet into his right palm as the opponent is locked in disorienting *Uzuhiko* vertigo.

  5. **Final Impact (`PL_ANM_SPSKILL1_DEMO_DMG` — Part 2)**: Boruto drives *Rasengan: Uzuhiko* into the opponent's chest, triggering a colossal spiraling planetary vortex explosion that blasts the enemy into the sky.

  6. **Finishing Pose (`PL_ANM_SPSKILL1_DEMO_ATK_END`)**: Boruto sheaths Kusanagi cleanly with his back turned as the vortex dissipates.

* **Candidate Donor Base for `prm_spl`**: Compare `7ssk` (`7sskspl1`), `6ssk` (The Last Sasuke *Planet Splitter*—which already features a sword slash into a planetary-scale vortex/Chibaku explosion!), `2fou`/`3mnt` (Minato Flying Raijin Ultimate), and `7brt`.

### K. Awakening Assessment — *"True Essence Kāma / Momoshiki Pact (Controlled)"*

* **Canon Evaluation (`CANON` — *TBV* Ch. 25–29)**: In early *Two Blue Vortex* (Ch. 1–24), Boruto avoids activating Kāma to prevent Momoshiki from taking over, relying on pure skill; however, in Ch. 25–29, Boruto forms a pact with Momoshiki and activates his **Kāma** (without losing his mind) to fight Jura and Mamushi!

* **Technical Recommendation**:

  * Do **not** invent a fake non-canon transformation (such as a speculative "Jōgan Chakra Cloak").

  * Instead, use a **Same-Model Powered-Up Awakening ("Kāma Resonance / Full-Output TBV State")**:

    * Retains the TBV Boruto (temporarily `7ssk`) body model (`bod1`) instead of swapping to a giant Susanoo (`bod2`), configured via `duelPlayerParam.xfbin` / `playerSettingParam.xfbin` and `awakeAura.xfbin`.

    * Activates a blue/purple *Kāma / Uzuhiko* chakra aura, boosts movement/dash speeds in `prm_bas`, upgrades `AWA_SYURIKEN` and `AWA_CHAKRA_SYURIKEN` to *Thunderclap Arrow* (`Jinraisen`), and increases attack damage and guard-crush properties!

## 5. Preliminary Donor-Character Matrix (Source of Truth: Supplied Character IDs)

*Note: All donor selections below are marked as **Candidate for Verification** until their actual `.xfbin` files are inspected in Phase 2.*

| Move Slot | Preferred Donor ID | Donor Character | Target Animation / Action to Inspect | Reason for Selection | Technical Verification Required | Alternative Donor IDs | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **Base Template & Core Sword Rig** | **`7ssk`** | Adult Sasuke (Wandering Shinobi) | `7sskbod1_atk*`, `atk_air*`, `7sskprm_mot` | Native one-handed Kusanagi sword rig, cape physics, Rinnegan teleport frames, and lightning blade effects. | Inspect `7sskprm.bin.xfbin` and `7sskprm_load.bin.xfbin` first. | `6ssk` (The Last Sasuke), `5ssk` (Rinnegan Sasuke) | 
| **Ground Combo Opener & Fast Iaijutsu** | **`7ssk` / `6ssk`** | Adult Sasuke / The Last Sasuke | `PL_ANM_ATK00..03` | Crisp one-handed sword draw and aggressive forward lunge. | Verify `Animation` names and `Function List` timings in `7sskprm_mot` vs `6sskprm_mot`. | `4ssi` (Shisui) | 
| **High-Speed Sword Flurry & Repositioning** | **`4ssi`** | Shisui Uchiha | `4ssibod1_atk*` (Body Flicker sword slashes) | Fastest teleporting sword-slash animations in *Storm 4*, ideal for Boruto's *Hiraishin* + *Uchiha Kenjutsu* tempo. | Check if `4ssi`'s sword bone aligns with `7ssk`'s Kusanagi when retargeted via `1cmn00t0` (`Enable Outlaw Max`). | `5ssk`, `2itc` (Itachi) | 
| **Side Combo (`Combo Direction = 3`)** | **`6ssk` / `4ssi`** | The Last Sasuke / Shisui | Lateral teleport slash / combo branch | Unpredictable flank attack using restored `Combo Direction = 3 = Side`. | Verify available unused `PL_ANM_ATKxx` indices in `7sskprm_mot`. | `2fou` (Minato) | 
| **Air Combo (`PL_ANM_ATK_AIR00..05`)** | **`7ssk` + `2fou`** | Adult Sasuke + Minato | `7sskbod1_atk_air*` + `2fou` aerial teleport slam | Combines one-handed aerial swordplay with a *Flying Thunder God* downward slam finisher. | Verify `ME_FLOATING_ON/OFF` frames and weapon visibility during `2fou` retargeted finisher. | `3mnt` (Edo Minato), `6ssk` | 
| **Tilt (`Rasengan: Uzuhiko` Weave)** | **`7ssk` / `2fou` / `4ssi`** | Adult Sasuke / Minato / Shisui | `PL_ANM_ATK_FAR` / Tilt state | Evasive step/teleport into a close-range strike that inflicts `DAMAGE_ID_STAGGER_NORMAL` (vertigo stagger). | Inspect how Tilt is defined in `7sskprm_mot` and test `Damage Code` replacement. | `6nrt` (The Last Naruto) | 
| **Shuriken & Chakra Shuriken** | **`7ssk` / `7brt` / `5mdr`** | Adult Sasuke / Boruto / Six Paths Madara | `Projectile List`: `SYURIKEN`, `CHAKRA_SYURIKEN`, `AWA_SYURIKEN` | Represents *Lightning Triplet* (`Ikazuchi: Sanren`) and *Thunderclap Arrow* (`Jinraisen`). | Inspect `Projectile List` entries in `7sskprm_mot` and `7brtprm_mot`. | `3kks` (Kakashi) | 
| **Grab (`PL_ANM_THROW_*`)** | **`6ssk` / `2fou` / `7brt`** | The Last Sasuke / Minato / Boruto | `PL_ANM_THROW_BEGIN`, `SUCCESS_ATTACKER`, `SUCCESS_VICTIM` | Fast teleport/clone blindside grab that fits Boruto's fighting style. | Verify `trw00`, `trw01`, `trw01_e` chunks and `ME_ENTRY_COMBO_SKILL_N_COORD` (`COMBOxx`). | `7ssk` (native grab tuned) | 
| **Ninjutsu 1 & 2 (`Uzuhiko` & `Purple Lightning`)** | **`7brt` / `6nrt` / `7ssk`** | Boruto / The Last Naruto / Adult Sasuke | Rasengan lunge + Chidori Current / Lightning blade surge | Pairs Boruto's signature Rasengan impact with omnidirectional/blade lightning. | Inspect `Jutsu 1..6` entries in `7sskprm_load.bin.xfbin` and `7brtprm_load.bin.xfbin`. | `2fou` (Flying Raijin Rasengan), `3kks` | 
| **Ultimate Jutsu (`Rasengan: Uzuhiko Max Output`)** | **`6ssk` / `7ssk` / `7brt`** | The Last Sasuke / Adult Sasuke / Boruto | `xxxprm_spl`: `PL_ANM_SPSKILL1_*` | `6ssk` and `7ssk` already use a one-handed sword setup into a catastrophic vortex/sphere explosion. | Inspect `7sskprm_spl` and `6sskprm_spl` state lists and `Projectile List` cut-in effects. | `2fou`, `7nrt` | 

## 6. Preliminary Combo Architecture & Flow Graph (Mermaid)

```
flowchart TD
    Neutral["Neutral / High-Speed Flight Dash\n(PL_ANM_ANY)"] -->|"Attack Button"| ATK00["PL_ANM_ATK00: Iaijutsu Draw Slash\n(Fast Homing + DAMAGE_ID_SMALL_UL)"]
    Neutral -->|"Tilt Input"| TILT["Tilt: Uzuhiko Planetary Weave\n(Evasive Step + DAMAGE_ID_STAGGER_NORMAL)"]
    Neutral -->|"Guard + Attack"| GRAB["PL_ANM_THROW_BEGIN -> ATTACKER + VICTIM\n(Hiraishin Blindside Grab + Hard Knockdown)"]
    Neutral -->|"Shuriken / Chakra Shuriken"| SHUR["Projectile List: SYURIKEN / CHAKRA_SYURIKEN\n(Lightning Triplet & Thunderclap Arrow)"]

    TILT -.->|"Guaranteed Hitstun Link\n[Parameter Tuning]"| ATK00
    SHUR -.->|"Hitstun Cancel / Dash\n[Supported Engine Mechanic]"| ATK00

    ATK00 --> ATK01["PL_ANM_ATK01: Twin Kusanagi Cross-Slash\n(Combo Direction = 0: All)"]
    ATK01 --> ATK02["PL_ANM_ATK02: Reverse-Grip Slash + Kick\n[Primary Branch Hub]"]

    ATK02 -->|"Dir = 0 (Neutral)"| ATK03["PL_ANM_ATK03: Hiraishin Blink Behind\n(DAMAGE_ID_STAGGER_NORMAL)"]
    ATK03 --> ATK05["PL_ANM_ATK05: Hagoromo Lightning Blade Flurry"]
    ATK05 --> ATK06["PL_ANM_ATK06: Rasengan Uzuhiko Vortex Ender\n(Trig1 = 0, Massive Knockback)"]

    ATK02 -->|"Dir = 1 (Hold Up)"| UP20["PL_ANM_ATK20..22: Rising Kusanagi Launcher\n(DAMAGE_ID_RISE_SMALL_PUSH)"]
    UP20 -.->|"Jump / Chakra Dash Follow-up\n[Supported Engine Mechanic]"| AIR00["PL_ANM_ATK_AIR00..04: Otsutsuki Aerial Sword Flurry\n-> Hiraishin Meteor Slam Finisher"]

    ATK02 -->|"Dir = 2 (Hold Down)"| DWN10["PL_ANM_ATK10..12: Purple Lightning Ground Slam\n+ Wind Breakthrough Blast (High Guard Damage)"]

    ATK02 -->|"Dir = 3 (Hold Side)\n[Restored Old Side Combo]"| SIDE07["PL_ANM_ATK07..11: Hiraishin Flank Slash Loop\n(Stagger Reset / Guard Pressure)"]

```

## 7. Overpowered Gameplay Engineering Principles (How Strength is Achieved Mechanically)

Rather than blindly inflating damage numbers to 999, TBV Boruto's overpowered feel is engineered through 5 concrete `prm_mot` mechanisms verified in our prior reverse engineering:

1. **Relentless Gap-Closing (`61 = ME_HOMING_SET` & `55 = ME_FWDVELOCITY_SET`)**: Tuning forward velocity and homing tracking on `PL_ANM_ATK00`, `ATK03`, and `ATK_AIR00` so Boruto snaps across mid-range directly onto the opponent like a *Flying Thunder God* blitz.

2. **Escape-Denying Hitstun (`Damage Code` Optimization in `18 = ME_ATKHIT_ON`)**: Using `DAMAGE_ID_SMALL_UL` and `DAMAGE_ID_STAGGER_NORMAL` on intermediate combo hits (with controlled `Horizontal Push` and `Freeze Time`) so the opponent never gets pushed out of sword reach mid-combo and suffers longer hitstun recovery, forcing them to burn Substitution gauge immediately.

3. **Shield-Crushing Guard Pressure (`Guard Damage Amount` + Projectile Layering)**: Attaching `44 = ME_ENTRY_COMBO_SKILL_N_COORD` (*Lightning Triplet* / *Wind Breakthrough* shockwaves) to combo finishers and Down/Side branches with elevated `Guard Damage Amount` so turtles cannot safely block a full string.

4. **4-Way Directional Branching (`Neutral` + `Up` + `Down` + Restored `3 = Side`)**: Giving Boruto a 4th ground combo branch (`Combo Direction = 3 = Side`) that resets pressure laterally.

5. **Unlocked Anti-Giant Finishers (`Trigger Condition 1: 16 -> 0`)**: Unlocking dramatic `_b` (anti-giant) finishers for normal combat where visually and mechanically superior.