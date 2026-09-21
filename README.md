# EspoCRM Mobile E2E — WebdriverIO + Appium

Portfolio-ready mobile-web automation for the public EspoCRM demo:

- **Safari:** iPhone 17 Pro simulator, iOS 26
- **Chrome:** Samsung Galaxy S25 Android Virtual Device, Android 15 / API 35
- **Stack:** TypeScript, WebdriverIO, Appium, XCUITest, UiAutomator2, Mocha
- **Safety:** all public-demo scenarios are read-only

## Install

```sh
npm ci
cp .env.example .env
```

The Appium server is started automatically by the WebdriverIO Appium service.

## iOS simulator setup

Install Xcode with the iOS 26 simulator runtime, then create or install an **iPhone 17 Pro** simulator. Verify it with:

```sh
xcrun simctl list devices available
```

Run Safari tests:

```sh
npm run test:ios
```

## Android emulator setup

Install Android Studio, Android 15 / API 35, an API 35 system image, and Chrome. Create an AVD named `Galaxy_S25_API_35` with Galaxy S25-equivalent dimensions.

```sh
$ANDROID_HOME/emulator/emulator -avd Galaxy_S25_API_35
adb devices
npm run test:android
```

Override device names or versions in `.env` when local emulator names differ.

## Commands

```sh
npm run typecheck
npm run test:ios
npm run test:android
npm run test:mobile
npm run test:ios:auth
npm run test:android:dashboard
```

## Coverage

The framework defines **172 test cases per platform** (**344 total executions** across iOS and Android) in 14 feature-specific spec files. The shared suite covers:

- Demo login and session persistence
- Six dashboard tabs and their widgets
- Responsive navigation drawer
- Twelve CRM sidebar modules
- Search and record navigation
- Calendar paging and Today
- Global Search, Last Viewed, quick create, Notifications, and user menu

## Structure

```text
config/                 Shared WebdriverIO/Appium configuration
src/data/               Dashboard and module matrices
src/pages/              Mobile Page Object Model classes
tests/                  Cross-platform mobile-web specifications
wdio.ios.conf.ts        Safari/XCUITest capabilities
wdio.android.conf.ts    Chrome/UiAutomator2 capabilities
```

The tests require installed simulators/emulators to execute. `npm run typecheck` validates the framework without devices.
