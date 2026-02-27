# LinguaAI - React 组件库

基于设计稿转换的 React + TypeScript + Tailwind CSS 组件集合。

## 📁 项目结构

```
linguaai-profile/
├── components/           # 共享组件
│   ├── Header.tsx       # 顶部导航栏
│   ├── ProfileCard.tsx  # 用户信息卡片
│   ├── LearningChart.tsx # 学习图表
│   ├── SkillProgress.tsx # 技能进度条
│   ├── ProCard.tsx      # PRO 会员卡片
│   ├── SettingsCard.tsx # 设置卡片
│   └── HelpCard.tsx     # 帮助卡片
├── pages/               # 页面组件
│   ├── ProfilePage.tsx      # 个人中心
│   ├── DashboardPage.tsx    # 仪表盘
│   ├── PricingPage.tsx      # 价格方案
│   ├── SocialPage.tsx       # 社交中心
│   ├── LearningPathPage.tsx # 学习路径定制
│   └── DictationPage.tsx    # 单词听写
├── ProfilePage.tsx      # 个人中心（根目录版本）
├── Footer.tsx           # 页脚
└── README.md            # 本文件
```

## 🎨 页面列表

| 页面 | 文件 | 描述 |
|------|------|------|
| 个人中心 | `ProfilePage.tsx` | 用户信息、学习数据、会员状态、设置 |
| 仪表盘 | `DashboardPage.tsx` | 学习统计、进度预测、每日练习 |
| 价格方案 | `PricingPage.tsx` | 会员定价、功能对比、CTA |
| 社交中心 | `SocialPage.tsx` | 好友列表、排行榜、邀请 |
| 学习路径定制 | `LearningPathPage.tsx` | 目标选择、水平测试、每日目标 |
| 单词听写 | `DictationPage.tsx` | 听力练习、输入验证、虚拟键盘 |

## 🚀 使用方法

### 1. 安装依赖

```bash
npm install lucide-react
```

### 2. 导入页面

```tsx
// 导入单个页面
import { ProfilePage } from './linguaai-profile/pages/ProfilePage';
import { DashboardPage } from './linguaai-profile/pages/DashboardPage';
import { PricingPage } from './linguaai-profile/pages/PricingPage';
import { SocialPage } from './linguaai-profile/pages/SocialPage';
import { LearningPathPage } from './linguaai-profile/pages/LearningPathPage';
import { DictationPage } from './linguaai-profile/pages/DictationPage';

// 使用
function App() {
  return (
    <Router>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/learning-path" element={<LearningPathPage />} />
      <Route path="/dictation" element={<DictationPage />} />
    </Router>
  );
}
```

## 🎨 颜色主题

| 颜色 | 值 | 用途 |
|------|-----|------|
| Primary | `#137fec` | 主色调、按钮、链接 |
| Secondary | `#D4AF37` | 金色（专业版标签） |
| Background Light | `#f6f7f8` | 浅色背景 |
| Background Dark | `#101922` | 深色背景 |
| Card Light | `#ffffff` | 浅色卡片 |
| Card Dark | `#1a2632` / `#1e293b` | 深色卡片 |

## ✨ 特性

- ✅ TypeScript 类型支持
- ✅ Tailwind CSS 样式
- ✅ 深色模式支持（dark: 类名）
- ✅ lucide-react 图标
- ✅ 响应式布局
- ✅ 组件化设计
- ✅ 交互状态（hover、active、disabled）

## 📱 响应式断点

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🔧 自定义配置

### Tailwind 配置扩展

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        'surface-light': '#ffffff',
        'surface-dark': '#1a2632',
      },
    },
  },
};
```

## 📄 文件说明

### 个人中心 (ProfilePage)
- Header 导航栏
- Tab 切换（个人资料/订阅管理/账户设置）
- 用户信息卡片（头像、会员标识、连胜、XP）
- 学习数据分析（柱状图、技能进度条）
- PRO 会员卡片
- 偏好设置（语言、提醒时间、深色模式）

### 仪表盘 (DashboardPage)
- 欢迎区域
- 统计卡片（词汇量、每日目标、连胜、排名）
- 学习进度预测图表
- 每日听写卡片
- 单词闪卡卡片
- 日历（打卡记录）
- 好友排行榜

### 价格方案 (PricingPage)
- Hero 区域
- 货币切换
- 三个定价卡片（免费/专业版/家庭版）
- 功能对比表格
- CTA 区域

### 社交中心 (SocialPage)
- 邀请好友卡片
- 我的数据（等级、连胜、学习时长）
- 好友列表
- 好友请求
- 全球排行榜

### 学习路径定制 (LearningPathPage)
- 步骤进度条
- 学习重点选择（托福/商务/旅行/学术）
- 当前水平选择（初级/中级/高级）
- 每日目标滑块
- 预计提升时间

### 单词听写 (DictationPage)
- 进度显示
- 音频播放按钮
- 音频波形动画
- 输入框
- 虚拟键盘
- 答案反馈
