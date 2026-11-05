# Newgrounds Rumble — Android

An unofficial Android adaptation of Newgrounds Rumble, powered by Ruffle and FrostFrontend. Requires Android 8.0 or newer.

Tested on the AYN Odin 2 Portal. Import the original game SWF separately; it is not bundled with the APK or source.

## Start playing

1. Download and install the [v0.1.3 Android APK](https://github.com/Frostie77/Newgrounds-Rumble/releases/download/v0.1.3/Newgrounds-Rumble-v0.1.3-Android.apk) from the [public release](https://github.com/Frostie77/Newgrounds-Rumble/releases/tag/v0.1.3).
2. Download the [original game SWF](https://chat.kongregate.com/game_files/0000/0862/newgrounds-rumble.swf?kongregate_game_version=1205879359), hosted by Kongregate for [NegativeONE's original game](https://www.kongregate.com/en/games/negativeone/newgrounds-rumble).
3. Open the Android app, choose **SELECT SWF FILE** and select the downloaded SWF. Menus use the touchscreen.

Your imported file, local game progress and settings stay in the app between launches and public APK updates.

Odin testing used `newgroundsrumble-hank.swf`. The creator-hosted download above is a different SWF build and has not yet been tested on the Odin.

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

The signed public APK checks this repository's stable feed. Use **Updates → Check for Updates** in FrostFrontend, or enable automatic checks at startup. When an update is available, open its verified GitHub release page from Updates and install that APK over your existing public version to retain your progress and settings.

Development APKs use the PC's Android Debug signing key and are excluded from stable updates. See the [build instructions](BUILDING.md) before switching between development and public builds.

## Credits

Original game: [Newgrounds Rumble on Newgrounds](https://www.newgrounds.com/portal/view/381115), released in 2007.

| Contribution | Credit |
| --- | --- |
| Original game programming | [NegativeONE](https://negativeone.newgrounds.com/) |
| Original game author | [Luis](https://luis.newgrounds.com/) |
| Original game art | [MindChamber](https://mindchamber.newgrounds.com/) |
| Main theme | [Evil-Dog](https://evil-dog.newgrounds.com/) — [Newgrounds Rumble Theme](https://www.newgrounds.com/audio/listen/83543) |
| Android adaptation | [Frostie77](https://github.com/Frostie77) |
| Flash runtime | [Ruffle](https://ruffle.rs/), version 0.7.1 |
| Settings interface | [FrostFrontend](https://github.com/Frostie77/FrostFrontend) |

Original game artwork, audio, characters and other content belong to their respective creators. The launcher artwork features Pico and Hank.

[Build instructions](BUILDING.md) · [Release preparation](RELEASING.md)
