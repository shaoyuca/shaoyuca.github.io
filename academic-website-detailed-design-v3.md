# 学术个人网站 · 详细设计文档 v3.0

> 状态：设计封版 · 待进入实现阶段
> 参考站点：hybridbody.human.cornell.edu · ken-nakagaki.com
> 更新：2025-05

---

## 目录

1. 技术选型
2. 项目目录结构
3. 数据层设计
4. 构建与部署流水线
5. 全局设计规范
6. 共用组件库
7. 页面详细设计
   - 7.1 About
   - 7.2 News
   - 7.3 Portfolio
   - 7.4 Publications
   - 7.5 Team
   - 7.6 Courses
   - 7.7 Opportunities
8. 性能策略
9. 图片资产管理
10. 待实现阶段决策事项

---

## 1. 技术选型

| 层面 | 选型 | 说明 |
|------|------|------|
| 框架 | **Next.js 14**（App Router） | SSG 支持完善，next/image 性能优化内置 |
| 样式 | **Tailwind CSS** | 在 `tailwind.config.js` 中集中定义字号、间距等设计 token，无需 CSS Variables |
| 富文本 | **MDX**（next-mdx-remote） | 在 Markdown 中嵌入 React 组件，教授可直接在 GitHub 上编辑 |
| 图片处理 | **Sharp**（GitHub Action 中运行） | 自动压缩、WebP 转换、多尺寸生成 |
| 字体 | **next/font**（Google Fonts） | 零布局偏移，自动本地化 |
| 部署 | **Vercel** | 边缘 CDN，next/image 原生支持，免费 tier 足够个人学术网站 |
| CI/CD | **GitHub Actions** | 图片处理 + 自动部署触发 |

**不引入**：CSS Variables、HeroUI、Framer Motion、任何动画库。

**输出模式**：`output: 'export'`（纯静态 HTML）。构建结果是一堆静态文件，部署在 Vercel 上，不需要服务器持续运行，也不需要数据库。

**域名**：Vercel 默认提供 `project-name.vercel.app`，后期可绑定自定义域名（如 `xxx.com`），不影响任何技术实现，可随时决定。

---

## 2. 项目目录结构

```
/
├── app/                                # Next.js App Router 页面
│   ├── layout.tsx                      # 全局 layout（仅导航栏）
│   ├── page.tsx                        # 根路径 → redirect 到 /about
│   ├── about/
│   │   └── page.tsx
│   ├── news/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── projects/
│   │   └── [id]/
│   │       └── page.tsx                # 项目详情页（路由占位，内容后续设计）
│   ├── publications/
│   │   └── page.tsx
│   ├── team/
│   │   └── page.tsx
│   ├── courses/
│   │   └── page.tsx
│   └── opportunities/
│       └── page.tsx                    # 纯文字页面，MDX 渲染
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx                  # 固定顶部双行导航
│   ├── ui/
│   │   ├── LinkPill.tsx                # 超链接胶囊组件
│   │   └── VideoEmbed.tsx              # iframe 视频嵌入组件
│   ├── about/
│   │   ├── ProjectImageRow.tsx         # 研究方向图片横条
│   │   ├── AwardSection.tsx            # Our Approach 奖项列表
│   │   ├── MediaLogoRow.tsx            # 媒体机构 logo 横排
│   │   └── ContactSection.tsx          # 双列 Contact 区块
│   ├── portfolio/
│   │   ├── DirectionBanner.tsx         # 方向标题背景图区块
│   │   └── ProjectCard.tsx             # 单个项目左图右文
│   ├── publications/
│   │   └── PublicationEntry.tsx        # 单篇论文四行展示
│   ├── news/
│   │   └── NewsEntry.tsx
│   ├── team/
│   │   └── TeamSection.tsx
│   └── courses/
│       └── CourseBlock.tsx
│
├── content/                            # 教授维护的内容区
│   ├── pages/
│   │   ├── about.mdx
│   │   ├── courses.mdx
│   │   └── opportunities.mdx
│   └── data/
│       ├── publications.json
│       ├── projects.json
│       ├── directions.json             # 开发者维护
│       ├── news.json
│       └── team.json
│
├── raw-images/                         # 教授上传原始图片
│   ├── publications/{id}/
│   │   └── thumb.jpg
│   ├── projects/{id}/
│   │   ├── demo.gif
│   │   └── poster.jpg
│   └── about/
│       ├── {direction-id}/
│       │   └── img1.jpg
│       ├── media/
│       │   └── forbes.png
│       └── contact/
│           └── building.jpg
│
├── lib/
│   ├── getPublications.ts
│   ├── getProjects.ts
│   ├── getNews.ts
│   ├── getTeam.ts
│   └── mdx.ts
│
├── types/
│   └── index.ts
│
├── .github/
│   └── workflows/
│       ├── process-images.yml
│       └── deploy.yml
│
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

**说明**：
- `public/images/` 由 GitHub Action 自动生成，不纳入项目目录管理
- `raw-images/` 是教授操作的上传区，文件夹骨架由开发者预先建好

---

## 3. 数据层设计

### 3.1 publications.json

Publications 页唯一数据源，每篇论文一条记录。

```json
{
  "publications": [
    {
      "id": "xxx-conference-year",
      "year": 2026,
      "title": "[Paper Title XXX]",
      "authors": "Author A, Author B, Author C, and Author D",
      "venue_full": "In [Conference Full Name] ([Short '26]), Month DD–DD, 2026, City, Country. ACM, New York, NY, USA, 16 pages.",
      "award": "BEST PAPER AWARD",
      "links": [
        { "label": "Paper", "url": "https://..." },
        { "label": "Video", "url": "https://..." }
      ],
      "note": null
    }
  ]
}
```

**字段说明**：
- `award`：无奖填 `null`；有奖填奖项名称字符串，渲染为加粗文字行
- `links`：数组，每项有 `label`（显示文字）和 `url`；无链接时填空数组 `[]`
- `note`：课程项目等附注，如 `"(XXX 0000 Course Project)"`，填 `null` 则不显示
- 无 `thumbnail` 字段：Publications 页只展示文字，无封面图

---

### 3.2 projects.json

Portfolio 页精选展示项目，与 publications.json 完全独立。

```json
{
  "projects": [
    {
      "id": "project-xxx",
      "direction_id": "direction-id-xxx",
      "order": 1,
      "title": "[Project Title XXX]",
      "authors": "Author A, Author B, Author C",
      "venue_label": "[Conference XXX Year]",
      "award": "BEST PAPER AWARD",
      "media": {
        "demo": "/images/projects/project-xxx/demo.webm",
        "image": "/images/projects/project-xxx/image.webp"
      },
      "links": [
        { "label": "PDF", "url": "https://..." },
        { "label": "DOI", "url": "https://doi.org/..." },
        { "label": "Project Page", "url": "/projects/project-xxx" }
      ]
    }
  ]
}
```

**字段说明**：
- `direction_id`：必须对应 directions.json 中某个方向的 `id`
- `order`：同一方向内的排列顺序，数字越小越靠前
- `award`：无奖填 `null`；有奖填字符串，渲染为加粗文字
- `media.demo`：WebM 格式动图，可为 `null`（无动图时填 `null`）
- `media.image`：静态图，始终必填；有动图时作为降级展示，无动图时作为唯一展示

---

### 3.3 directions.json（开发者维护）

教授新增研究方向时联系开发者更新此文件，同时需建对应的 raw-images 子文件夹。

```json
{
  "directions": [
    {
      "id": "direction-id-xxx",
      "title": "[Research Direction Title A]",
      "description": "[One sentence description of this research direction.]",
      "background_image": "/images/directions/direction-id-xxx-bg.webp",
      "order": 1
    },
    {
      "id": "direction-id-yyy",
      "title": "[Research Direction Title B]",
      "description": "[One sentence description of this research direction.]",
      "background_image": "/images/directions/direction-id-yyy-bg.webp",
      "order": 2
    }
  ]
}
```

---

### 3.4 news.json

```json
{
  "news": [
    {
      "date": "2026.04",
      "content": "One paper was accepted by [Conference XXX]. Congrads to [Author A] and [Author B]!"
    },
    {
      "date": "2026.03",
      "content": "[Paper Title XXX] was accepted by [Conference YYY]. Congrads to [Author C] and [Author D]!"
    },
    {
      "date": "2025.11",
      "content": "One paper accepted by [Conference ZZZ] and won Best Paper Award. Congrads to [Author E], [Author F] and [Author G]!"
    }
  ]
}
```

**字段说明**：
- `date`：格式 `YYYY.MM`，渲染时加方括号显示为 `[2026.04]`
- `content`：纯文字，无需支持链接或富文本
- 数组顺序即页面显示顺序，教授在数组开头插入新条目即可

---

### 3.5 team.json

每个成员只是一行纯文字字符串，无额外字段。教授新增成员时直接往数组里加一条字符串即可。

```json
{
  "groups": [
    {
      "id": "current",
      "title": "Current Members",
      "members": [
        "KXX (Research Fellow, since 2024)",
        "LXX (PhD candidate in, since 2024)"
      ]
    },
    {
      "id": "alums",
      "title": "Alums",
      "members": [
        "AXX (Research Assistant, 2021–2023)",
        "Jane (Research Assistant, 2023)"
      ]
    },
    {
      "id": "capstone",
      "title": "Former Capstone Students",
      "members": [
        "Yi (2023–2024, with XXX). The XXXX",
        "SXX (2023–2024, with XXX). Seeking XXX"
      ]
    }
  ]
}
```

---

### 3.6 TypeScript 类型定义（types/index.ts）

```typescript
export type LinkItem = {
  label: string
  url: string
}

export type Publication = {
  id: string
  year: number
  title: string
  authors: string
  venue_full: string
  award: string | null
  links: LinkItem[]
  note: string | null
}

export type Project = {
  id: string
  direction_id: string
  order: number
  title: string
  authors: string
  venue_label: string
  award: string | null
  media: {
    demo: string | null
    image: string
  }
  links: LinkItem[]
}

export type Direction = {
  id: string
  title: string
  description: string
  background_image: string
  order: number
}

export type NewsItem = {
  date: string       // "YYYY.MM"
  content: string
}

export type TeamGroup = {
  id: string
  title: string
  members: string[]
}
```

---

## 4. 构建与部署流水线

### 4.1 图片处理 Action（process-images.yml）

**触发条件**：push 到 main 分支且 `raw-images/` 下有变更文件

**执行逻辑**：
```
1. 检测 raw-images/ 中的新增或变更文件
2. 用 Sharp 处理每张图：
   ├── jpg / png → 转换为 WebP
   ├── 生成 400w / 800w / 1200w 三个尺寸（用于 srcset）
   └── 输出到 public/images/ 对应路径，保持目录结构
3. GIF 特殊处理：
   ├── 转换为 demo.webm（VP9 编码，体积减少约 80%）
   └── 提取首帧为 poster.webp
4. 将生成的 public/images/ 文件自动 commit 回主分支
```

### 4.2 部署 Action（deploy.yml）

**触发条件**：任意 push 到 main 分支（含图片 Action 的 auto-commit）

**执行逻辑**：
```
1. npm ci
2. npm run build（next build，输出到 /out）
3. Vercel CLI 部署 /out 到生产环境
```

**所需 GitHub Secret**：`VERCEL_TOKEN`（在 Vercel 控制台生成，存入仓库 Secrets）

### 4.3 教授的完整更新路径

**场景一：新增一篇论文**
```
1. 打开 GitHub 仓库
2. 进入 raw-images/publications/
   → Add file → Upload files
   → 路径栏输入 new-paper-id/thumb.jpg（自动创建子文件夹）
   → 拖拽上传图片 → Commit
3. 进入 content/data/publications.json → 点击铅笔图标编辑
   → 在数组开头新增一条 JSON 对象（参照现有格式）
   → Commit changes
4. 等待约 3 分钟，网站自动更新
```

**场景二：新增一条 News**
```
1. 进入 content/data/news.json → 点击铅笔图标
2. 在数组开头新增一条，填写 date 和 content
3. Commit → 3 分钟后更新
```

**场景三：更新 About 文字内容**
```
1. 进入 content/pages/about.mdx → 点击铅笔图标
2. 直接修改文字段落（Markdown 格式，加粗用 **文字**，链接用 [文字](url)）
3. 组件参数（如图片列表）修改 {} 内的值即可
4. Commit → 3 分钟后更新
```

---

## 5. 全局设计规范

### 5.1 视觉原则

**唯一视觉区分手段：字重 + 字号。不使用颜色作为信息区分。**

整站为黑白灰配色：
- 主色调：近黑（`#0A0A0A`）
- 背景：暖白（`#FAFAF8`）
- 次要信息：浅灰（`#6B6B6B`）
- 超链接：加下划线，无特殊颜色
- 激活导航：加粗，无颜色变化
- 奖项：加粗文字，无背景色、无图标

**无动效**：整站不添加任何 CSS transition、animation 或 JS 驱动的动画。

### 5.2 字体

**待与教授最终确认，以下为候选方向**：

| 用途 | 候选 | 特点 |
|------|------|------|
| 标题 | Playfair Display | 衬线，学术质感 |
| 正文 | Source Serif 4 | 衬线，易读 |
| 元数据/标签/链接 | IBM Plex Mono | 等宽，技术感 |

字号体系在 `tailwind.config.js` 中统一定义：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'h1': ['clamp(36px, 4vw, 48px)', { lineHeight: '1.2' }],
        'h2': ['clamp(24px, 2.5vw, 32px)', { lineHeight: '1.3' }],
        'h3': ['22px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.75' }],
        'meta': ['13px', { lineHeight: '1.5' }],
        'small': ['12px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        'content': '1200px',
        'prose': '720px',
      },
      spacing: {
        'section': '80px',
      }
    }
  },
  darkMode: 'class',
}
```

### 5.3 响应式断点

使用 Tailwind 内置断点，无需自定义：

| 断点名 | 宽度 | 典型变化 |
|--------|------|---------|
| `sm` | ≥ 640px | - |
| `md` | ≥ 768px | 双列变单列 |
| `lg` | ≥ 1024px | 主要桌面布局 |
| `xl` | ≥ 1280px | 宽屏舒展布局 |

### 5.4 全局导航栏

**布局**：两行，`position: fixed; top: 0; left: 0; right: 0; z-index: 50`

```
┌─────────────────────────────────────────────────────────┐
│ 姓名（左对齐，H2 字号，font-weight: bold）               │  ← 第一行
├─────────────────────────────────────────────────────────┤
│         About  News  Portfolio  Publications  Team  Courses  Opportunities │  ← 第二行，右对齐
└─────────────────────────────────────────────────────────┘
```

**技术规范**：
- 背景：`bg-[#FAFAF8]`，底部 `border-b border-gray-200`
- 导航字体：`font-mono text-meta uppercase tracking-wider`
- 当前激活页导航项：`font-bold`，无颜色变化
- 超链接：无颜色，`hover:underline`
- 页面内容区域：`padding-top` 等于导航栏高度，避免内容被遮住

**移动端响应式**：
- `md` 以下：第二行导航收起，显示汉堡菜单按钮（右侧）
- 点击后展开全屏覆盖导航层（`z-index: 100`）
- 导航项垂直排列，字号适当放大，点击跳转后自动关闭

### 5.5 Dark Mode

实现方式：Tailwind `darkMode: 'class'`，在 `<html>` 标签切换 `dark` class。

每个需要深色变体的元素统一加 `dark:` 前缀：

```html
<div class="bg-[#FAFAF8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF8]">
```

切换按钮：放在导航栏右侧，`🌙 / ☀`，点击切换并存入 `localStorage`。在实现阶段与各组件同步完成。

---

## 6. 共用组件库

### 6.1 LinkPill（超链接胶囊）

**用途**：PDF、Paper、Video、DOI、Project Page 等外部链接

```typescript
// components/ui/LinkPill.tsx
type LinkPillProps = {
  label: string     // 显示文字，如 "Paper" "Video"
  href: string
}
```

**样式**：
- 外框：`border border-black rounded px-2.5 py-0.5`
- 字体：`font-mono text-small`
- Hover：无动效，仅 `underline`
- 排列：多个 LinkPill 用 `flex gap-2 flex-wrap`

**渲染逻辑**：`href` 为空时不渲染。

### 6.2 VideoEmbed（视频嵌入）

**用途**：Courses 页的 Sample Video

```typescript
type VideoEmbedProps = {
  src: string        // iframe embed URL
  title?: string
}
```

**样式**：
- `width: 100%`，`height: 400px`（移动端 220px）
- `border-radius: 4px`
- 无边框

---

## 7. 页面详细设计

---

### 7.1 About 页

**路由**：`/about`  
**渲染策略**：SSG，构建时读取 `about.mdx`  
**数据来源**：`content/pages/about.mdx`

#### 技术实现

```typescript
// app/about/page.tsx
import { getMDXContent } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import * as components from '@/components/about'

export default async function AboutPage() {
  const { source } = await getMDXContent('about')
  return (
    <main className="max-w-content mx-auto px-10 py-section">
      <MDXRemote source={source} components={components} />
    </main>
  )
}
```

#### about.mdx 内容结构

```mdx
# About

[Prof. [Name]](https://...) focuses on [research focus description].
Research spans [Field A], [Field B], and [Field C].
See full publication list on [Google Scholar](https://scholar.google.com/...).

## [Research Direction Title A]

[Description of research direction A...]

<ProjectImageRow
  images={[
    { src: "/images/about/direction-id-xxx/project-a.webp", label: "[Project A]", href: "/projects/project-a" },
    { src: "/images/about/direction-id-xxx/project-b.webp", label: "[Project B]", href: "/projects/project-b" },
    { src: "/images/about/direction-id-xxx/project-c.webp", label: "[Project C]", href: "/projects/project-c" }
  ]}
/>

## [Research Direction Title B]

[Description of research direction B...]

<ProjectImageRow
  images={[
    { src: "/images/about/direction-id-yyy/project-d.webp", label: "[Project D]", href: "/projects/project-d" }
  ]}
/>

---

## Our Approach

[One sentence describing the lab's interdisciplinary impact goals.]

<AwardSection
  title="Engineering / Scientific Impact"
  description="[Description of scientific impact and publication venues.]"
  awards={[
    { text: "[Conference A] Best Paper Award", year: "2025", href: "https://...", project: "[Project A]" },
    { text: "[Conference B] Distinguished Paper Award", year: "2024", href: "https://...", project: "[Project B]" },
    { text: "[Conference C] Best Paper Award", year: "2021", href: "https://...", project: "[Project C]" }
  ]}
/>

<AwardSection
  title="Design / Art Impact"
  description="[Description of design and art exhibition activities.]"
  awards={[
    { text: "[Museum / Exhibition Name]", year: "2019", href: "https://..." },
    { text: "[Award Name] Finalist in Design", year: "2017", href: "https://..." },
    { text: "[Award Name] Nomination", year: "2017", href: "https://..." }
  ]}
/>

<MediaLogoRow
  title="Public Communication"
  description="[Description of media coverage.]"
  outlets={[
    { name: "[Media Outlet A]", logo: "/images/about/media/outlet-a.webp", href: "https://..." },
    { name: "[Media Outlet B]", logo: "/images/about/media/outlet-b.webp", href: "https://..." },
    { name: "[Media Outlet C]", logo: "/images/about/media/outlet-c.webp", href: "https://..." }
  ]}
/>

<AwardSection
  title="Community Engagement"
  description="[Description of community outreach activities.]"
  awards={[
    { text: "[Community Activity A]", href: "https://..." },
    { text: "[Community Activity B]", href: "https://..." }
  ]}
/>

---

<ContactSection
  title="Contact"
  description="[Lab description and location.]"
  photo="/images/about/contact/building.webp"
  map_embed_url="https://maps.google.com/maps?q=[Address]&output=embed"
/>
```

#### 组件规范

**ProjectImageRow**：
- 布局：`flex flex-wrap gap-4`，图片宽高比 3:2，固定高度 `180px`，宽度自适应
- 响应式：桌面 4–5 张并排，平板 3 张，移动端 2 张
- `next/image`：`loading="lazy"`，`sizes="(max-width: 768px) 50vw, 25vw"`
- Hover：无动效，仅 `cursor-pointer`
- 点击整张图片跳转至对应 `href`
- Label：图片正下方，`font-mono text-small uppercase tracking-widest text-gray-500`，居中

**AwardSection**：
- H2 标题 → 可选 description 段落 → 奖项列表
- 每条格式：
  ```
  · 奖项名称（font-bold，有 href 则加下划线可点击） · 项目名 · 年份
  ```
- `·` 符号：`text-gray-400`
- 无颜色、无图标

**MediaLogoRow**：
- H2 标题 → description 段落 → logo 横排
- logo 图片：`height: 40px`，`width: auto`，灰度处理（`filter: grayscale(1)`），hover 时恢复原色（无动效，直接切换）
- 点击 logo 跳转至对应媒体链接

**ContactSection**：
- 顶部：小标题（H2）+ 首段文字描述
- 图片布局：`grid grid-cols-1 md:grid-cols-2 gap-8`
- 左列：建筑/地点照片，`h-60 w-full object-cover rounded`
- 右列：Google Maps iframe，`h-60 w-full rounded`
- 无 Land Acknowledgement

---

### 7.2 News 页

**路由**：`/news`
**渲染策略**：SSG，构建时读取 `news.json`
**数据来源**：`content/data/news.json`

#### 技术实现

```typescript
// app/news/page.tsx
import newsData from '@/content/data/news.json'

export default function NewsPage() {
  return (
    <main className="max-w-prose mx-auto px-10 py-section">
      <h1 className="font-bold text-h1 mb-10">News</h1>
      <ul className="space-y-3">
        {newsData.news.map((item, i) => (
          <NewsEntry key={i} date={item.date} content={item.content} />
        ))}
      </ul>
    </main>
  )
}
```

#### 页面布局

```
[H1 "News"]

[2026.04] One paper was accepted by [Conference A]. Congrads to [Author A] and [Author B]!
[2026.03] [Paper Title XXX] was accepted by [Conference B]. Congrads to [Author C] and [Author D]!
[2026.01] [Paper Title YYY] was accepted by [Journal A] and presented in [Conference C]. Congrads to [Author E]!
[2025.11] One paper accepted by [Conference D] and won Best Paper Award. Congrads to [Author F], [Author G] and [Author H]!
...
```

**NewsEntry 组件规范**：
- 每条一行，`[日期]` 与内容文字连续排列，无分栏
- `[2026.04]`：`font-mono text-meta font-bold`，与后续内容同行，间距 `mr-2`
- 内容文字：`text-body`，与日期同行
- 条目间距：`mb-3`
- 无年份分组，无分隔线，数组顺序即展示顺序

---

### 7.3 Portfolio 页

**路由**：`/portfolio`  
**渲染策略**：SSG，构建时读取 `projects.json` + `directions.json`  
**数据来源**：`content/data/projects.json`，`content/data/directions.json`

#### 技术实现

```typescript
// lib/getProjects.ts
export function getProjectsByDirection(): DirectionWithProjects[] {
  const directions = (directionsData.directions as Direction[])
    .sort((a, b) => a.order - b.order)

  const projects = projectsData.projects as Project[]

  return directions
    .map(dir => ({
      ...dir,
      projects: projects
        .filter(p => p.direction_id === dir.id)
        .sort((a, b) => a.order - b.order)
    }))
    .filter(dir => dir.projects.length > 0)
}
```

#### 页面布局

```
[H1 页面标题区（深色背景白字）]
[DirectionBanner：方向一]
  [ProjectCard]
  [ProjectCard]
[DirectionBanner：方向二]
  [ProjectCard]
  ...
```

**H1 标题区**：
- 背景 `bg-[#0A0A0A]`，字色 `text-white`
- `px-20 py-16`，H1 字体加粗
- 简短介绍：正文，`text-white/75 font-bold mt-2`

**DirectionBanner 组件**：
- 高度 `h-64`，全宽，`position: relative`
- 背景图：`next/image` fill 模式，`object-cover`
- 渐变遮罩：`absolute inset-0 bg-gradient-to-b from-black/50 to-black/30`
- 方向标题 H2 + 简介：白色，`absolute bottom-8 left-20`

**ProjectCard 组件**：
```
┌─────────────────────────────────────────────────────────────────────┐
│  [ 媒体区 280×186px ]    项目标题（H3，font-bold）                   │
│  WebM 动图或首帧          作者（font-mono text-meta text-gray-500）  │
│                           venue_label（text-meta italic）            │
│                           BEST PAPER AWARD（font-bold，如有）        │
│                           [LinkPill] [LinkPill] ...                  │
└─────────────────────────────────────────────────────────────────────┘
```

- 布局：`grid grid-cols-[280px_1fr] gap-8 items-start`
- 移动端：`grid-cols-1`，图片在上，`w-full h-48 object-cover`
- 条目间：`pb-8 mb-8 border-b border-gray-100`（最后一条去掉 border）
- 奖项：`font-bold text-meta`，单独一行，在 venue_label 下方、links 上方

**媒体渲染逻辑**：
- `media.demo` 有值：渲染 `<video autoPlay loop muted playsInline>`，用 `IntersectionObserver` 控制只在进入视口时播放，离开时 `pause()`
- `media.demo` 为 `null`：渲染 `next/image`，`loading="lazy"`
- 两种情况媒体区尺寸一致：`w-[280px] h-[186px] object-cover`，移动端 `w-full h-48`

---

### 7.4 Publications 页

**路由**：`/publications`  
**渲染策略**：SSG，构建时读取 `publications.json`  
**数据来源**：`content/data/publications.json`

#### 技术实现

```typescript
// lib/getPublications.ts
export function getPublicationsByYear(): [string, Publication[]][] {
  const pubs = (publicationsData.publications as Publication[])
    .sort((a, b) => b.year - a.year)

  const grouped = pubs.reduce((acc, pub) => {
    const y = String(pub.year)
    acc[y] = [...(acc[y] || []), pub]
    return acc
  }, {} as Record<string, Publication[]>)

  return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a))
}
```

#### 页面布局

```
[H1 "Publications"]

[H2 "2026"]
[PublicationEntry]
[PublicationEntry]

[H2 "2025"]
...
```

**PublicationEntry 组件规范**：

每篇论文渲染为四行：
```
[Paper Title XXX]                                                              ← 行1：标题，font-bold
Author A, Author B, Author C, and Author D                                     ← 行2：作者，正文
In [Conference Full Name] ([Short 'YY]), Month DD–DD, Year, City...            ← 行3：发表位置，italic
BEST PAPER AWARD                                                               ← 行4a：奖项（如有），font-bold
[Paper]  [Video]                                                               ← 行4b：LinkPill 集合
(XXX 0000 Course Project)                                                      ← 行5：附注（如有），text-gray-500 italic
```

- 无封面图，纯文字布局
- 最大宽度 `max-w-prose`，居中或左对齐（与整体排版一致）
- 条目间距：`pb-6 mb-6 border-b border-gray-100`
- 年份 H2：`font-bold text-h2 mt-10 mb-6`

---

### 7.5 Team 页

**路由**：`/team`  
**渲染策略**：SSG，构建时读取 `team.json`  
**数据来源**：`content/data/team.json`

#### 页面布局

```
[H1 "Team"]
[首段文字：实验室文化/使命介绍]

[H2 "Principal Investigator"]
  · 姓名（font-bold）· 职位  [Website]（如有）

[H2 "PhD Students"]
  · 姓名 · 职位/方向

[H2 "Alumni"]
  · 姓名 · 当前位置（如有）
```

**TeamSection 组件规范**：
- 每个成员一行纯文字：`text-body`，无特殊样式
- 条目间距：`mb-2`
- 分组 H2：`font-bold text-h2 mt-12 mb-4`

---

### 7.6 Courses 页

**路由**：`/courses`  
**渲染策略**：SSG，构建时读取 `courses.mdx`  
**数据来源**：`content/pages/courses.mdx`

#### courses.mdx 内容结构

```mdx
<CourseBlock
  title="[Course Code]: [Course Title A]"
  course_url="https://..."
  description="[Course description, 2–3 sentences...]"
  video_link={{ label: "Watch Course Overview", url: "https://..." }}
  sample_video_embed="https://player.vimeo.com/video/..."
  student_publications={[
    {
      title: "[Student Paper Title A]",
      authors: "[Student A], [Student B], [Student C]",
      venue: "[Conference XXX Year]"
    },
    {
      title: "[Student Paper Title B]",
      authors: "[Student D]",
      venue: "[Conference YYY Year]"
    }
  ]}
/>

<CourseBlock
  title="[Course Code]: [Course Title B]"
  course_url="https://..."
  description="[Course description, 2–3 sentences...]"
  video_link={null}
  sample_video_embed={null}
  student_publications={[]}
/>
```

**CourseBlock 组件规范**：

```
[H1 课程标题（font-bold）]
[↗ 课程主页链接（font-mono text-meta，下划线）]
[课程简介段落]

[▶ Watch Course Overview 按钮]（如有 video_link）
[Sample Video iframe]（如有 sample_video_embed）

[H2 "Student Work"]（如有 student_publications）
  论文标题（font-bold）· 作者 · 发表位置
  ...
```

- 课程标题：H1，`font-bold`
- course_url：`font-mono text-meta underline`，`display: block; mt-1 mb-4`
- Video Link 按钮：有别于 LinkPill，填充黑色背景白色文字，`px-4 py-2 font-mono text-small`
- iframe：`w-full rounded`，桌面 `h-96`，移动端 `h-52`，`mt-4`
- Student Publications 列表：`font-bold` 标题 + `·` + 作者 + `·` + 发表位置，每条 `mb-2`，`text-body`
- 多门课程之间：`mt-16 pt-16 border-t border-gray-200`

---

### 7.7 Opportunities 页

**路由**：`/opportunities`  
**渲染策略**：SSG，读取 `opportunities.mdx`  
**数据来源**：`content/pages/opportunities.mdx`

纯文字页面，直接在 MDX 中写内容，无自定义组件，使用 Markdown 原生格式（标题、段落、列表、链接）即可。教授可完全独立维护。

---

## 8. 性能策略

| 策略 | 实现方式 | 收益 |
|------|---------|------|
| 纯静态输出 | `output: 'export'`，无运行时 | TTFB < 100ms |
| 图片 WebP 转换 | GitHub Action + Sharp | 体积减少约 70% |
| 图片多尺寸 srcset | `next/image` + 400/800/1200w | 移动端少加载约 60% |
| 图片懒加载 | `next/image` 默认 `loading="lazy"` | 首屏只加载可见图片 |
| blur placeholder | `next/image` `placeholder="blur"` | 图片加载前显示模糊预览，无布局跳动 |
| 动图 WebM | GIF → WebM（VP9），Action 自动转换 | 体积减少约 80% |
| 动图按需播放 | hover 时 React state 切换，默认展示 poster | 不自动消耗带宽 |
| 字体本地化 | `next/font` | 消除字体加载 CLS |
| 代码按页分割 | App Router 自动处理 | 首页不加载其他页 JS |
| 边缘 CDN | Vercel Edge Network | 全球访问速度均等 |

**Core Web Vitals 目标**：
- LCP < 1.5s
- CLS = 0
- INP < 50ms

---

## 9. 图片资产管理

### 9.1 目录命名规范（教授操作区）

```
raw-images/
├── publications/
│   └── {publication-id}/
│       └── thumb.jpg              ← 固定文件名，唯一一张
├── projects/
│   └── {project-id}/
│       ├── demo.gif               ← 动图，可选；也接受 .mp4
│       └── image.jpg              ← 静态图，必填
└── about/
    ├── {direction-id}/
    │   ├── img1.jpg               ← 编号即排列顺序
    │   └── img2.jpg
    ├── media/
    │   └── {outlet-name}.png      ← 媒体机构 logo
    └── contact/
        └── building.jpg
```

### 9.2 Action 自动处理规则

| 输入文件 | 输出文件 | 处理内容 |
|---------|---------|---------|
| `image.jpg` | `image.webp` | WebP 转换，800×533（3:2） |
| `demo.gif` / `.mp4` | `demo.webm` | VP9 编码 WebM，无需提取首帧 |
| `thumb.jpg` | `thumb.webp` | WebP 转换，800×533（3:2） |
| `img1.jpg` | `img1.webp` | WebP 转换，1200px 宽，等比 |
| `*.png` logo | `*.webp` | WebP 转换，400px 宽 |

### 9.3 教授上传说明（写入仓库 README）

```
上传图片步骤：
1. 在 GitHub 仓库页面进入 raw-images/ 目录
2. 找到你的论文或项目对应的文件夹（按 id 命名）
   → 如果文件夹不存在，请联系开发者新建
3. 点击 Add file → Upload files
4. 按规定文件名上传（thumb.jpg / demo.gif / poster.jpg）
5. Commit changes，系统自动处理，约 3 分钟后生效

支持格式：jpg / png / gif / mp4
请上传原始高清文件，系统会自动压缩和格式转换
```

---

## 10. 待实现阶段决策事项

| # | 事项 | 说明 |
|---|------|------|
| 1 | 字体最终确认 | 候选：Playfair Display + Source Serif 4 + IBM Plex Mono，需与教授确认 |
| 2 | Project 详情页内容结构 | 路由已预留，页面样式需与教授商议后设计 |
| 3 | About 页研究方向数量和具体文案 | 教授提供 |
| 4 | Our Approach 各分组具体奖项内容 | 教授提供 |
| 5 | Google Maps 嵌入 URL | 教授确认地址后，在 Google Maps 页面生成 iframe 代码 |
| 6 | 社交链接种类和 URL | 教授提供（Google Scholar / GitHub / Email 等） |
| 7 | Opportunities 页文字内容 | 教授写入 opportunities.mdx |
| 8 | Dark Mode 切换按钮位置 | 实现时确定（导航栏右侧或页脚）|
| 9 | 自定义域名绑定 | 网站上线后按需配置，不影响当前实现 |

---

*文档版本 v3.0 · 设计封版 · 下一步进入代码实现阶段*
