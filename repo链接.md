# 仓库链接（C5 交付说明）

## 仓库地址

- GitHub 仓库：<https://github.com/ZhouYan05/elite20-aar-writer>
- 克隆命令：`git clone https://github.com/ZhouYan05/elite20-aar-writer.git`
- 在线使用（GitHub Pages）：<https://ZhouYan05.github.io/elite20-aar-writer/>

## 仓库可见性

公开仓库（Public），任何人可直接访问、克隆与 fork，无需授权。

## 仓库结构（顶层）

```
elite20-aar-writer/
├── README.md            项目说明：安装、使用、技术栈、结构
├── AI_LOG.md            英文名 AI 生成日志
├── AI日志.md            同名中文 AI 生成日志（内容与 AI_LOG.md 一致）
├── app.js               应用逻辑（表单 → 提示词 → 结果渲染）
├── index.html           单页入口
├── styles.css           样式（配色与间距经人工微调）
├── examples/
│   └── example-output.md  一份真实生成的 AAR 示例输出
├── LICENSE              MIT
├── CHANGELOG.md         版本记录
├── CONTRIBUTING.md      贡献指南
├── ATTRIBUTION.md       外部资源与灵感来源
├── 拿来说明.md           拿来主义：本项目参考/复用了什么、如何改造
└── repo链接.md           本文件
```

## 常用操作

- 本地运行：直接双击 `index.html`（纯静态、零依赖），或 `python -m http.server 8000`
- 部署：main 分支根目录 → GitHub Pages 自动发布
- 提交记录：见仓库 Commits 页面，开发过程分阶段提交
