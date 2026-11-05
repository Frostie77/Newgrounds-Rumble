# Initial build verification — 5 November 2026

- Both `:app:assembleDebug` and `:app:assembleRelease` pass with Gradle 8.11.1, JDK 17, Android platform 35 and build tools 35.0.0. Release output remains unsigned for later local release preparation.
- APK inspection verifies package `io.github.frostie77.newgroundsrumble`, version code 1, versions `0.1.0-dev` / `0.1.0`, minimum API 26, target API 35, Newgrounds Rumble label, a packaged launcher resource, current HTML and Ruffle. Neither APK contains a SWF. Debug signature and 16 KB alignment checks pass.
- The production update checker passes 20 controlled HTTPS/Android scenarios, including package/signature checks, incomplete releases, asset digest/size checks, older Android signing APIs and unavailable services.
- The production JavaScript bridge passes jump/stick overlap, touch/controller overlap, held attack behavior, all action keys, independent menu/background pause and original/stretch display checks. The same ownership and suspend/resume checks also pass in real Ruffle 0.7.1.
- The supplied Hank-era game reaches its loader, main menu and training offline. Through the production bridge, Continue enters training and movement and jumping complete their training objectives. No loader, combat or ending patch is applied. The source SWF remains unchanged.
- Ruffle creates the game’s local SharedObject save, and the loader finds it after a full page/runtime reload. A modified test username fixture is used to distinguish restored data from first-run defaults; the main menu restores `OdinTester1` after reload.
- Game code confirms arrows for movement/jump/crouch, A for block, S for quick attacks, D for fierce attacks, P for game pause and Space for training continuation. The native stage is 650×450 at 28 fps.

The compatibility file SHA-256 is `0767a6f336739da31a8bf3c6667424fe51c7f3ee190d168206e22d11bfd30ffd`. It is excluded from this archive and the APK.

Ruffle logs a `castleFG` export warning during loading. The castle arena has not yet been checked; no asset or game-code patch has been added.

## Still to test on the Odin

Gameplay across characters and arenas, combo timing, both speakers, frame rate, touchscreen multitouch, controller remapping, app background/resume and a real APK update preserving progress. Complete these before choosing release artwork, signing a public APK or publishing a stable feed. Desktop headless checks do not establish Odin performance.
