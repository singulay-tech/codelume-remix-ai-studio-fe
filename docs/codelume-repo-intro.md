# Codelume 仓库介绍（详细版）

## 项目定位

Codelume 是一款 **macOS 原生动态壁纸软件**，主程序基于 SwiftUI + AppKit，提供菜单栏常驻入口与独立主窗口。核心目标是“动态壁纸播放引擎”，内容来源以本地壁纸包为主。README 明确说明为开源项目，并提供 App Store 版本。`Codelume/readme.md`

## 核心功能概览

- **多屏幕动态壁纸**：为每个屏幕创建独立桌面级窗口，支持不同屏幕播放不同内容。`Codelume/CodeLume/App/WindowController.swift`
- **多播放类型**：支持 `video / sprite / scene` 三类播放视图（AVPlayer / SpriteKit / SceneKit）。`Codelume/CodeLume/Models/PlaybackModels.swift`, `Codelume/CodeLume/Views/WallpaperViews/*`
- **本地壁纸库**：壁纸以 `.bundle` 形式存储，数据库记录壁纸列表，界面支持预览/详情/播放/删除。`Codelume/CodeLume/Views/HomeViews/LocalWallpapersViews/*`, `Codelume/CodeLume/Managers/DatabaseManger.swift`
- **屏幕管理**：识别主屏/副屏、连接状态、分辨率、音量/静音/播放状态等。`Codelume/CodeLume/Views/HomeViews/ScreenManagerView.swift`, `Codelume/CodeLume/Managers/ScreenManager.swift`
- **播放控制与节能策略**：支持暂停/静音/音量控制，并可在“桌面有其他应用/全屏应用/电池供电/低电量模式/锁屏”等条件下自动暂停或回到首帧。`Codelume/CodeLume/Views/HomeViews/SettingsViews/PlaybackSettingsView.swift`, `Codelume/CodeLume/Managers/ScreenManager.swift`, `Codelume/CodeLume/Utils/SystemUtils.swift`
- **菜单栏入口**：MenuBarExtra 提供快速控制与导入入口（导入 bundle 或视频、暂停/静音、打开主页、重启、退出）。`Codelume/CodeLume/Views/MenuBarViews/MenuBarView.swift`
- **屏幕保护程序**：内置 `CodelumeSaver.saver`，可导出并安装为系统屏保。`Codelume/CodeLume/Views/HomeViews/ScreenSaverView.swift`, `Codelume/CodeLume/Resource/CodelumeSaver.saver/*`

## 程序入口与窗口体系

- 入口为 `CodelumeApp`：菜单栏入口 + 主窗口 Home。`Codelume/CodeLume/App/CodeLumeApp.swift`
- `AppDelegate` 负责初始化日志、用户设置、数据库、屏幕管理，并处理“重复启动检测”与“欢迎窗口”。`Codelume/CodeLume/App/AppDelegate.swift`
- `WindowController` 为每个屏幕创建“桌面级窗口”（`desktopIconWindow - 1`），用来承载壁纸播放视图；屏幕变化时会自动重建或更新。`Codelume/CodeLume/App/WindowController.swift`

## 播放引擎细节

- **视频壁纸**：`AVPlayerLayer` 作为视图 layer，播放前读取 `.bundle` 内容（通过 `CodelumeBundle`）并应用全局/屏幕级音量与静音设置。`Codelume/CodeLume/Views/WallpaperViews/VideoPlaybackView.swift`
- **SpriteKit / SceneKit**：目前实现为示例场景（文字/立方体），可作为扩展方向。`Codelume/CodeLume/Views/WallpaperViews/SpriteKitPlaybackView.swift`, `Codelume/CodeLume/Views/WallpaperViews/SceneKitPlaybackView.swift`
- **通知驱动**：通过 `screenConfigChanged`, `screenTemporaryStateChanged`, `userDefaultChanged` 等通知实现实时更新。`Codelume/CodeLume/Views/WallpaperViews/VideoPlaybackView.swift`

## 数据与配置

- 本地数据库采用 `SQLite.swift`，存储屏幕配置与壁纸列表。`Codelume/CodeLume/Managers/DatabaseManger.swift`
- 屏幕配置模型 `ScreenConfiguration`：播放类型、壁纸 URL、播放状态、静音、音量、填充模式、物理分辨率等。`Codelume/CodeLume/Models/SystemModel.swift`
- 用户偏好使用 `UserDefaults`，封装在 `UserDefaultsManager`：语言、主题、开机自启、播放控制、节能策略等。`Codelume/CodeLume/Managers/UserDefaultsManager.swift`, `Codelume/CodeLume/Models/Define.swift`

## 本地壁纸流程（核心业务链路）

- 导入 → 写入数据库 → 放入 `Documents/Wallpapers`（保存路径由 `WALLPAPER_SAVE_URL` 定义）。`Codelume/CodeLume/Models/Define.swift`
- 本地壁纸列表从数据库读取 → 生成 `.bundle` 路径 → 展示与操作。`Codelume/CodeLume/Views/HomeViews/LocalWallpapersViews/LocalWallpapersView.swift`
- 选择屏幕播放时：更新 `ScreenManager` 配置 → 发送通知 → `WindowController` 更新播放视图。`Codelume/CodeLume/Views/HomeViews/LocalWallpapersViews/WallpaperItemViews/LocalWallpaperItemView.swift`, `Codelume/CodeLume/App/WindowController.swift`

## 屏幕与系统状态检测

- 通过 `CGWindowListCopyWindowInfo` 判断屏幕上是否有其他应用窗口或全屏窗口，用于自动暂停策略。`Codelume/CodeLume/Utils/SystemUtils.swift`
- 通过 `IOKit` 判断电池供电与低电量模式。`Codelume/CodeLume/Utils/SystemUtils.swift`
- 监听锁屏/解锁事件（DistributedNotification）。`Codelume/CodeLume/Managers/ScreenManager.swift`

## 界面结构

- 主窗口采用 `NavigationSplitView`，侧栏入口：ScreenManager / LocalWallpaper / Screen Saver / Preferences / About。`Codelume/CodeLume/Views/HomeViews/HomeView.swift`
- 屏幕管理：左侧屏幕列表 + 右侧配置详情（播放控制/壁纸信息/配置重置与删除）。`Codelume/CodeLume/Views/HomeViews/ScreenManagerView.swift`
- 设置页：General（语言、主题、欢迎页、开机自启）与 Playback（暂停/静音/音量与节能策略）。`Codelume/CodeLume/Views/HomeViews/SettingsViews/*`
- 关于页：提供开源/商店版本说明、联系方式与平台链接。`Codelume/CodeLume/Views/HomeViews/AboutView.swift`

## 资源与本地化

- `Resources/Preview.gif`：README 预览图。
- `CodeLume/Resource/DefaultBundle.bundle`：内置默认壁纸包，包含预览图与视频。
- `CodeLume/Resource/CodelumeSaver.saver`：屏保包。
- 本地化资源：`Localizable.xcstrings`, `en.lproj`, `zh-Hans.lproj`。

## 第三方依赖

- `SQLite.swift`：本地数据库。
- `SwiftyBeaver`：日志系统。
- `CodelumeBundle`：解析 `.bundle` 壁纸内容。  
依赖信息来自 `Codelume/Codelume.xcodeproj/project.pbxproj`。

## 可见的当前限制/占位实现

- `SpriteKitPlaybackView` 和 `SceneKitPlaybackView` 是演示级场景（未接入壁纸包内容）。`Codelume/CodeLume/Views/WallpaperViews/*`
- `checkWallpaperBundle` 当前直接返回 `true`，壁纸包格式校验未实现。`Codelume/CodeLume/Utils/WallpaperBundleCheck.swift`

## 一句话介绍（可用于 README 顶部）

Codelume 是一款基于 SwiftUI + AppKit 的 macOS 原生动态壁纸应用，提供多屏幕独立播放、菜单栏控制、本地壁纸库与屏保导出，同时通过 SQLite 持久化屏幕配置，并在系统状态变化（全屏/锁屏/电池/低电量）下自动管理播放策略。
