# Newgrounds Rumble — Android

An unofficial Android adaptation of Newgrounds Rumble, powered by Ruffle and FrostFrontend. Requires Android 8.0 or newer.

This is an initial development build. Odin gameplay, audio and performance still need device testing. The supplied `newgroundsrumble-hank.swf` is the compatibility test file; the original game is not included in the source or APK.

## Start playing

Build and install with `build-test.ps1`, open the app, and select your SWF. Menus use the touchscreen. Your imported file, local game progress and settings stay in the app between launches and APK updates.

## Default controller controls

| Control | Action |
| --- | --- |
| Left stick / D-pad | Move, jump up, crouch down |
| A | Jump |
| X | Light attack (S) |
| Y | Heavy attack (D) |
| B | Block / parry (A) |
| R1 | Continue / next (Space) |
| L1 | Game pause (P) |
| Start / menu icon | FrostFrontend |

Remap actions in FrostFrontend. Keep the game's keyboard bindings at their defaults. Touch controls include a joystick or D-pad (Up to jump), Light, Heavy, Block, Pause and Next, with size, opacity and position settings. Light and Heavy sit along the bottom with Block above them. Original 650×450 proportions and stretch display modes are available. Speaker Test is under Sound.

## Updates

The stable update checker is prepared for `Frostie77/Newgrounds-Rumble`. No public release is published yet. Development APKs use your PC's Android debug key; stable updates will use the permanent release signing key.

## Credits

- **Original game:** [Newgrounds Rumble](https://www.newgrounds.com/portal/view/381115), 2007 — [NegativeONE](https://negativeone.newgrounds.com/), [Luis](https://luis.newgrounds.com/), and [MindChamber](https://mindchamber.newgrounds.com/). Obtain the original Flash game separately from its original publication.
- **Android adaptation:** Frostie77.
- **Flash compatibility:** [Ruffle](https://ruffle.rs/), version 0.7.1.
- **Settings interface:** [FrostFrontend](https://github.com/Frostie77/FrostFrontend), pinned at `2147f7ab4e183ea6b19b3d8bedf6bbe04b05c56c`.

Original game artwork, audio, characters and other content belong to their respective owners. The launcher uses the approved Pico and Hank artwork, with density-specific icons and an adaptive Android icon.

[Build instructions](BUILDING.md)
