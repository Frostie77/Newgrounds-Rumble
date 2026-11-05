# Newgrounds Rumble release preparation

The first public candidate uses the tested application version **0.1.3**, Android version code **4**, and tag **v0.1.3**. `RELEASE_DRAFT.md` contains its proposed release text. No public release or active stable feed has been published.

## Prepare on Windows

From the repository, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\build-public-release.ps1
```

The first run creates the port's permanent RSA signing key at `%USERPROFILE%\.android\Newgrounds-Rumble-Release.keystore`. Choose and keep its password; retain the same key and password for every future update. Back up the keystore and its `.certificate.sha256` companion privately before publishing. Do not upload the key to GitHub or a release.

The helper builds Release, signs it with v2/v3 signatures, checks alignment, rejects a different established signer, checks the actual package/version and compares the packaged HTML, Ruffle files and approved artwork to their expected bytes. It rejects any APK containing a SWF. Its output is `release/Newgrounds-Rumble-v0.1.3-<source commit prefix>/` containing:

- `Newgrounds-Rumble-v0.1.3-Android.apk`
- `Newgrounds-Rumble-v0.1.3-Android.apk.sha256.txt`
- `android-stable.json`, describing that exact signed APK
- `release-notes.md`

This only prepares files. It does not install an APK, uninstall anything, create a GitHub release or activate the live feed.

The currently installed test APK uses the PC's Debug signing key. Android cannot update it directly to the separately signed public APK. Decide how to preserve the test installation's imported game, progress and settings before switching that installation; do not uninstall it as part of preparation. Normal updates between public releases retain the package and permanent signing key. See [Android app signing](https://developer.android.com/studio/publish/app-signing).

## Validate and publish in order

1. Back up the permanent keystore and retain its password. Verify the signed candidate on the Odin and retain the exact APK that passes.
2. Prepare a draft release with tag `v0.1.3`, targeting the source commit in the staged feed, title `Newgrounds Rumble Android v0.1.3`, and the staged release notes. Attach the APK and checksum file; keep `android-stable.json` for the repository feed.
3. Review the complete draft and obtain publication authorization.
4. Publish the matching release and confirm its APK asset has the exact name, size and SHA-256 in the staged feed.
5. Replace `updates/android-stable.json` with the staged feed only after that APK is public. Keep the feed's `source_commit` pointing to the build source, rather than the later feed-activation commit.
6. On the signed release, check Updates and confirm it identifies the current public release. For a future update, use the same key and a higher version code; confirm an older signed build offers that specific published version before distribution.

## Verification

The Android workflow builds Debug and unsigned Release and runs the production input, startup and update-verifier checks. The Windows job runs the release helper with a disposable test key, verifies the emitted APK/feed, and proves an identity mismatch is rejected without replacing the valid candidate or activating the feed. That disposable key and APK are never published or uploaded as public release assets.

The actual public signing key is created on the owner's PC. Controlled update-verifier tests cover a newer published release, current release, empty feed, unsigned development state, incompatible signing identity, missing/draft/prerelease releases, wrong APK metadata and network failures. The production stable feed remains inactive until publication is complete.
