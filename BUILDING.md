# Building on Windows

Clone the repository with its pinned settings library:

```powershell
git clone --recurse-submodules https://github.com/Frostie77/Newgrounds-Rumble.git
```

Open PowerShell in the cloned `Newgrounds-Rumble` folder, connect the Odin with USB debugging authorized, then run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\build-test.ps1
```

Requires JDK 17 or newer and Android SDK 35. The helper locates the existing Android Studio SDK, downloads Gradle 8.11.1 and Ruffle 0.7.1 if missing, builds a Debug APK and installs it with ADB when one authorized device is connected. It uses the PC's existing Android debug signing identity.

The complete test archive is also supported and includes the pinned FrostFrontend source and official Ruffle runtime. Do not copy a SWF into source assets. Import it through the app after installation.

## Checks

`python tests/test_updates.py` exercises the production update verifier using controlled HTTPS responses. The Android workflow builds Debug and unsigned Release APKs and checks package, icon and game-free packaging. The Windows job parses both helpers with PowerShell 5.1 and exercises real release signing with a disposable test key.

## Signed release preparation

For the next public release, increase `versionCode` and `versionName`, then run `powershell -NoProfile -ExecutionPolicy Bypass -File .\build-public-release.ps1` from the repository. Reuse the established permanent keystore and its password. The helper keeps the key in `%USERPROFILE%\.android\Newgrounds-Rumble-Release.keystore`, outside the repository, and stages the APK, checksum, release notes and matching update feed in a source-specific folder under `release`.

The helper does not install or publish. It verifies the package/version, release signatures, certificate continuity, alignment, approved artwork, exact Ruffle runtime and absence of a game SWF. See [RELEASING.md](RELEASING.md) for the publication order and the Debug-to-release signing decision.

## Publication

The public stable feed at `updates/android-stable.json` announces v0.1.3. For future releases, verify the build on the Odin, publish the matching signed APK first, then activate its matching feed containing the package, version, release tag, source commit, permanent certificate fingerprint, size and SHA-256. Never reuse another port's feed or signing key.

Increase the Android version code for each new APK. Keep the package and signing identity for updates that preserve the imported SWF and save data. Debug-to-public installation requires a separate signing decision; this helper never uninstalls an existing app.
