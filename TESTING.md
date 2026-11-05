# Device acceptance — 0.1.3 (version code 4)

## Published release and live metadata checks

The public APK was downloaded and independently checked against the staged size and SHA-256. Its v2/v3 signatures and permanent certificate were verified using Google's apksig library. The HTML content, complete pinned Ruffle runtime and approved artwork match source; no SWF is packaged.

HTTP-200 responses from the live raw stable feed and the published GitHub release API were recorded without endpoint redirects. The unmodified production update verifier was then run against those responses and the actual public signing certificate, using Android API stubs for installed-version scenarios. Checks passed for the current release, a simulated older signed version receiving the published update, rejection of a different key, exclusion of Debug builds and the Android 8 signature API fallback. These are metadata/logic checks, not an Odin installation or APK-update test.

The README now links the original creator's Kongregate-hosted SWF. Its SHA-256 is `567d5b5b28d4db47db6e978acc87a7145834d9fc9340e0188736726e29152a68`; it differs from the original Hank-era device-test file and is not claimed as device-tested.

## Device feedback

The Odin 2 Portal tester confirmed gameplay, gamepad controls, graphics settings, sound settings/speaker test and persistence across restarts. The follow-up builds removed the redundant touch Jump button, arranged Light/Heavy/Block together and added the approved Pico/Hank icon. The tester accepted the final icon and touch layout.

The source remains game-free. The public v0.1.3 APK uses the same tested app version, signed with the permanent release key on the owner's PC. Its matching stable feed was activated after publication. See `RELEASING.md` for the published identity, verification and the Debug-to-public signing decision.

# Startup fix — 0.1.1 (version code 2)

The Odin crash log identifies `ExceptionInInitializerError`, caused by `Unsupported default button: Game Pause`. The original default assigned Select, which the pinned FrostFrontend mapper does not allow. Pause now defaults to the supported L1 button. Start remains the FrostFrontend menu button.

`python tests/test_control_profile.py` extracts the Activity's actual control-profile initializer and runs it with the pinned production mapper and profile classes. It reproduces the original failure and checks initialization plus preference loading with the corrected defaults, including rejection of a stale saved Select binding. CI runs this check before building the APKs.

The package remains `io.github.frostie77.newgroundsrumble`; version code increases to 2 and version name to `0.1.1` (`0.1.1-dev` for Debug). The PC helper retains its existing debug signing identity and installs with `adb install -r`.

# Initial 0.1.0 build verification — 5 November 2026

- Both `:app:assembleDebug` and `:app:assembleRelease` pass with Gradle 8.11.1, JDK 17, Android platform 35 and build tools 35.0.0. Release output remains unsigned for later local release preparation.
- APK inspection verifies package `io.github.frostie77.newgroundsrumble`, version code 1, versions `0.1.0-dev` / `0.1.0`, minimum API 26, target API 35, Newgrounds Rumble label, a packaged launcher resource, current HTML and Ruffle. Neither APK contains a SWF. Debug signature and 16 KB alignment checks pass.
- The production update checker passes 20 controlled HTTPS/Android scenarios, including package/signature checks, incomplete releases, asset digest/size checks, older Android signing APIs and unavailable services.
- The production JavaScript bridge passes jump/stick overlap, touch/controller overlap, held attack behavior, all action keys, independent menu/background pause and original/stretch display checks. The same ownership and suspend/resume checks also pass in real Ruffle 0.7.1.
- The supplied Hank-era game reaches its loader, main menu and training offline. Through the production bridge, Continue enters training and movement and jumping complete their training objectives. No loader, combat or ending patch is applied. The source SWF remains unchanged.
- Ruffle creates the game’s local SharedObject save, and the loader finds it after a full page/runtime reload. A modified test username fixture is used to distinguish restored data from first-run defaults; the main menu restores `OdinTester1` after reload.
- Game code confirms arrows for movement/jump/crouch, A for block, S for quick attacks, D for fierce attacks, P for game pause and Space for training continuation. The native stage is 650×450 at 28 fps.

The compatibility file SHA-256 is `0767a6f336739da31a8bf3c6667424fe51c7f3ee190d168206e22d11bfd30ffd`. It is excluded from this archive and the APK.

Ruffle logs a `castleFG` export warning during loading. The castle arena has not yet been checked; no asset or game-code patch has been added.

## Further device coverage

Gameplay across all characters and arenas, combo timing, long sessions and a future public APK update preserving progress remain further device coverage. The accepted device checks do not establish full-game compatibility or performance on other Android devices.
