# 码镜壁纸包协议

本文档描述 **码镜（Codelume）** 动态壁纸资源包（`bundle`）的目录结构与字段约定，方便用户对壁纸进行自定义开发。

资源包(`bundle`)仅包含 plist、asstes 等资源信息，**不存在二进制可执行代码**，用户可以放心导入使用。

目前协议支持两种内容：

- `video`：视频壁纸
- `scene2D`：2D 场景壁纸

码镜壁纸资源包在 MacOS 上图标如下：
![码镜壁纸包图标](/images/codelume-bundle-modular-icon.png)

这是 MacOS 平台的通用资源包形式，只在 Mac 平台显示为一个文件， 其**本质是一个目录文件夹**，故跨设备或者夸网络分享时，请务必使用工具进行压缩，比如 `.zip` `.tar`等形式。主流软件**不支持直接分享目录数据**

## 1. 总体目录结构

所有 bundle 至少包含：

```directory
codelume.bundle/
├── info.plist
└── preview/
    └── preview.png     # 设置静态壁纸
```

### 1.1 视频壁纸结构

```directory
codelume.bundle/
├── info.plist
├── preview/
│   └── preview.png
└── video/
    ├── video.plist
    └── wallpaper.mp4     # 或 .mov，取决于 video.plist.format
```

### 1.2 2D 场景壁纸结构

```directory
codelume.bundle/
├── info.plist
├── preview/
│   └── preview.png
└── scene2D/
    ├── scene.plist
    ├── assets/
    │   ├── fonts/      # 可选，放置 .ttf / .otf
    │   ├── shaders/    # 可选，放置 shader 文件
    │   ├── videos/     # 可选，放置视频资源
    │   ├── audio/      # 可选，放置音频资源
    │   └── textures/   # 可选，纹理（可按类型再分子目录）
```

## 2. 基础协议

### 2.1 `info.plist`

根元信息，典型字段如下（键名与类型以客户端解析为准；实际文件为 plist，下图为键名结构示意）：

```json
{
  "name": "壁纸名称",
  "author": "作者",
  "type": "video",
  "category": "分类",
  "createdAt": "2026-01-01T00:00:00Z",
  "version": "1.0.0",
  "description": "可选",
  "email": "可选",
  "tags": ["可选", "标签"]
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | String | 是 | 壁纸名称 |
| `description` | String | 否 | 描述 |
| `author` | String | 是 | 作者 |
| `email` | String | 否 | 联系方式 |
| `type` | String | 是 | `video` 或 `scene2D` |
| `category` | String | 是 | 分类 |
| `tags` | [String] | 否 | 标签 |
| `createdAt` | Date | 是 | 创建时间 |
| `version` | String | 是 | 资源版本 |

### 2.2 预览图

必须提供 `preview/preview.png`，用于设置静态壁纸；一般取视频第一帧或 scene2D 场景第一帧（无损为佳）。

## 3. 视频协议

### 3.1 `video.plist` 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `width` | Int | 是 | 像素宽 |
| `height` | Int | 是 | 像素高 |
| `size` | Double | 是 | 视频文件大小（MB） |
| `duration` | Int | 是 | 时长（秒） |
| `format` | String | 是 | `mp4` 或 `mov` |
| `loop` | Bool | 是 | 首尾帧一致 |

### 3.2 视频文件命名

- 基础名固定：`wallpaper`
- 扩展名由 `video.plist.format` 决定（`mp4` 或 `mov`）

`video/` 目录内典型布局：

```directory
video/
├── video.plist
└── wallpaper.mp4     # 或 wallpaper.mov，与 format 字段一致
```

### 3.3 支持的视频格式

- mp4
- mov

## 4. 2D 场景协议

### 4.1 `scene.plist` 根结构

`scene.plist` 为 Property List，根对象是字典，必须包含键 `scene`。

`scene` 常见字段：

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `backgroundColor` | String | 场景背景色，如 `#RRGGBB` |
| `scaleMode` | String | 场景填充模式 |
| `size` | Dictionary | 场景尺寸 |
| `mouseInteraction` | Dictionary | 鼠标联动参数 |
| `nodes` | [Node] | 节点树（递归） |

资源路径（如 `texture`、`audio`、`shader`）按相对 **bundle 根目录** 解析。

#### 4.1.1 填充模式（`scaleMode`）

`scaleMode` 决定 **逻辑场景**（由 `scene.size` 定义的宽高）如何映射到 **实际桌面视口**（各屏幕分辨率、含刘海/圆角安全区外的可视区域）。三种取值均为 **等比或拉伸** 类策略，与常见 2D 引擎的语义一致：

| 取值 | 行为概要 |
| --- | --- |
| `aspectFill` | **等比放大**直至铺满整个视口，**多出的宽或高会被裁切**，视口内无黑边。适合「宁可少看边缘也要铺满屏幕」的壁纸；若场景宽高比与屏幕不一致，上下或左右会被裁掉一部分内容。 |
| `aspectFit` | **等比缩放**直至场景 **完整落在视口内**，**不裁切**；视口上可能留下 **上下或左右黑边**（与场景 `backgroundColor` 一致）。适合「必须看到完整构图」的内容；同一壁纸在不同宽高比屏幕上黑边多少会不同。 |
| `fill` | **独立按 X、Y 拉伸**到刚好填满视口，**不保持宽高比**；无黑边、无裁切，但圆形、文字等会被压扁或拉长。仅当你明确希望「强行贴合屏幕矩形」时使用。 |

**选用建议**：动态桌面多数场景用 **`aspectFill`**（沉浸、无黑边）。

#### 4.1.2 场景大小（`size`）

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `width` | Int | 宽 |
| `height` | Int | 高 |

#### 4.1.3 鼠标参数（`mouseInteraction`）

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `resumeCatchupSpeed` | Double | 追赶阶段的最大移动速度（像素/秒） |

#### 4.1.4 节点（`nodes`）

| type | 映射 | 说明 |
| --- | --- | --- |
| `sprite` | `SKSpriteNode` | 贴图精灵 |
| `shape` | `SKShapeNode` | `rect` / `circle` / `ellipse` |
| `emitter` | `SKEmitterNode` | 粒子系统 |
| `label` | `SKLabelNode` | 文本标签 |
| `video` | `SKVideoNode` | 视频节点 |
| `node` | `SKNode` | 通用容器 |

节点数组元素对应 `NodeDescription`，每个节点必须包含 `id` 与 `type`，并可递归包含 `children`。

通用字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | String | 节点唯一标识（必填） |
| `type` | String | 节点类型（必填） |
| `position` | Dictionary | 位置，包含 `x` / `y`（支持数值或百分比字符串） |
| `size` | Dictionary | 尺寸，包含 `width` / `height` |
| `anchorPoint` | Dictionary | 锚点，包含 `x` / `y` |
| `z` | Double | 渲染层级 |
| `zRotation` | Double | 旋转角（弧度） |
| `alpha` | Double | 透明度（0~1） |
| `blendMode` | String | 混合模式 |
| `color` | String | 颜色（如 `#RRGGBB`） |
| `colorBlendFactor` | Double | 颜色混合比例 |
| `actions` | [Action] | 动作数组（见 `ActionDescription`） |
| `mouseResponses` | [MouseResponse] | 鼠标响应数组（见 `MouseResponseDescription`） |
| `physicsBody` | Dictionary | 预留字段，当前版本暂未启用 |
| `shader` | Dictionary | 着色器配置（见 `ShaderConfig`） |
| `children` | [Node] | 子节点数组（递归） |
| `isLocked` | Bool | 编辑器/交互锁定标记 |

各类型常用字段：

| type | 常用字段 | 类型 |
| --- | --- | --- |
| `sprite` | `texture` | String |
| `label` | `text` `fontName` `fontSize` `fontColor` | String / String / Double / String |
| `shape` | `shapeType` `shapeSize` `cornerRadius` `fillColor` `strokeColor` `lineWidth` `glowWidth` | String / Dictionary / Double / String / String / Double / Double |
| `emitter` | `particleTexture` `particleBirthRate` `particleLifetime` `particleSpeed` `emissionAngle` `particleAlpha` `particleScale` | String / Double / Double / Double / Double / Double / Double |
| `video` | `videoFile` `videoLoop` `videoAutoplay` `videoVolume` | String / Bool / Bool / Double |
| `node` | `audioFile` `audioLoop` `audioAutoplay` `audioVolume` | String / Bool / Bool / Double |

说明：

- `position.x/y`、`size.width/height` 在实现中为 `ValueExpression`，可写数值（如 `120`）或百分比字符串（如 `50%`）。
- 资源路径字段（如 `texture`、`videoFile`、`audioFile`、`shader.sourceFile`）均按 bundle 根目录相对路径解析。

复杂字段展开：

| 字段 | 子字段/取值 | 说明 |
| --- | --- | --- |
| `position` | `x` / `y`: Number or String（百分比，如 `50%`） | 节点坐标，按场景尺寸解析百分比 |
| `size` | `width` / `height`: Number or String（百分比） | 节点尺寸，支持绝对值与百分比 |
| `anchorPoint` | `x` / `y`: Double | 锚点，通常 0~1 |
| `blendMode` | String | SpriteKit 混合模式字符串，未知值回退默认模式 |
| `actions` | `[ActionDescription]` | 动作数组，按顺序构建并运行 |
| `mouseResponses` | `[MouseResponseDescription]` | 鼠标响应数组，按配置叠加作用 |
| `physicsBody` | `PhysicsBodyDescription` | 预留字段，当前版本暂未启用 |
| `shader` | `ShaderConfig` | 着色器源码/文件与 uniforms |
| `children` | `[NodeDescription]` | 子节点递归结构 |

`actions`（`ActionDescription`）常用字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | String | 动作类型（必填） |
| `duration` | Double | 动作时长（秒） |
| `timingMode` | String | `easeIn` / `easeOut` / `easeInOut` / `linear` |
| `x` / `y` | ValueExpression | 目标坐标或坐标分量（如 `moveTo`） |
| `dx` / `dy` | Double | 增量位移（如 `moveBy`） |
| `to` / `by` | Double | 目标值 / 增量值（透明度、缩放等） |
| `angle` | Double | 角度（度），内部会转弧度 |
| `scaleX` / `scaleY` | Double | 分轴缩放（`scaleTo`） |
| `color` / `factor` | String / Double | 颜色与混合比例（`colorize`） |
| `frames` / `timePerFrame` | [String] / Double | 帧动画纹理列表与每帧时长 |
| `actions` / `action` | [Action] / Action | 组合动作（`sequence`/`group`/`repeat`） |
| `count` | Int | 重复次数（`repeat`） |
| `fileName` | String | 声音文件名（`playSound`） |
| `speed` | Double | 动作速度倍率（`speed`） |

当前支持的 `actions.type`：

- `moveTo` `moveToX` `moveToY` `moveBy`
- `fadeAlpha` `fadeAlphaTo` `fadeIn` `fadeOut`
- `scaleTo` `scaleBy`
- `rotateTo` `rotateBy`
- `colorize` `animateTextures`
- `wait` `playSound` `speed`
- `sequence` `group` `repeat` `repeatForever`
- `removeFromParent`

`mouseResponses`（`MouseResponseDescription`）字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | String | 响应类型（必填） |
| `intensity` | Double | 强度（用于 `parallax`） |
| `radius` | Double | 作用半径 |
| `horizontalOnly` / `verticalOnly` | Bool | 仅水平 / 仅垂直 |
| `offsetX` / `offsetY` | Double | 鼠标偏移（用于 `follow`） |
| `strength` | Double | 力度（用于 `repel` / `attract`） |
| `damping` | Double | 插值阻尼（越大响应越快） |
| `minScale` / `maxScale` | Double | 缩放范围（`scaleNear`） |
| `minAlpha` / `maxAlpha` | Double | 透明度范围（`alphaNear`） |

当前支持的 `mouseResponses.type`：

- `parallax` `follow` `repel` `attract` `rotateTo` `scaleNear` `alphaNear`

`physicsBody`（`PhysicsBodyDescription`）：

- 预留配置，当前版本文档不展开字段定义，后续物理模块启用时再补充。

`shader`（`ShaderConfig`）字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `source` | String | 内联 shader 源码 |
| `sourceFile` | String | shader 文件相对路径 |
| `uniforms` | [ShaderUniform] | uniforms 列表 |

`uniforms` 单项（`ShaderUniformDescription`）：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | String | uniform 名称（必填） |
| `float` | Double | 浮点值 |
| `texture` | String | 纹理路径 |
| `vec2` | Dictionary | `{ x, y }` |
| `vec3` | Dictionary | `{ x, y, z }` |
| `vec4` | Dictionary | `{ x, y, z, w }` |

### 4.2 资源文件（`assets/`）

资源文件按类型放在对应子目录；`scene2D/assets/` 下推荐结构如下（各子目录均为可选，按实际引用放置文件）：

```directory
scene2D/assets/
├── fonts/       # .ttf / .otf
├── shaders/     # shader 源文件
├── videos/      # 视频资源
├── audio/       # 音频资源
└── textures/    # 纹理（可按类型再分子目录）
```
