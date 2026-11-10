# elite20-aar-writer — Elite20 AAR 复盘生成器

一句话描述：**输入本周的预期产出（R̂）、实际产出（R）与失败卡点，输出一份 KSTAR 结构的课程 AAR 复盘 Markdown。**

在线使用（免安装）：<https://ZhouYan05.github.io/elite20-aar-writer/>

## 解决什么问题

Elite20（EduSeed AI+X 课程）要求 C8/C9 每周提交 AAR 复盘（S 情境 / T 任务 / A 行动 / R 结果 / ΔR 偏差 / 失败分析 / 下周计划）。

没有这个工具之前：每周打开空白文档，对着模板逐段憋字，格式还经常不对；AI 聊天里生成的 AAR 要来回复制、排版。

有了它之后：把本周素材三段话填进表单 → 点击生成 → 拿到结构完整、可以直接审校提交的 Markdown → 一键复制或下载。审校仍然由人做——**AAR 的核心是真实**，工具只负责把结构搭好、把素材组织到位。

## 快速开始

### 在线使用（推荐，零安装）

打开 <https://ZhouYan05.github.io/elite20-aar-writer/> 即可。

### 本地运行

```bash
git clone https://github.com/ZhouYan05/elite20-aar-writer.git
cd elite20-aar-writer
# 纯静态站点，双击 index.html 即可，或：
python -m http.server 8000   # 然后访问 http://localhost:8000
```

### AI 模型配置

| 模式 | 说明 |
|---|---|
| 免费模式（默认） | 使用 [pollinations.ai](https://pollinations.ai) 免费文本端点，无需注册，同 IP 约每 45 秒 1 次 |
| 自备 Key（推荐高频使用） | 点右上角「⚙️ 模型设置」，填入任意 OpenAI 兼容的 API Key / Base URL / 模型名（如 gpt-4o-mini、deepseek-chat、kimi 等）。Key 只存于你的浏览器 localStorage，只发往你填写的 Base URL |

## 示例

输入：

> 预期产出 R̂：完成 C6 Web App 的部署，拿到公开 URL
> 实际产出 R：App 已部署上线 https://…；收到 3 份反馈，2 人卡在手机端布局
> 失败/卡点：部署时环境变量未生效，排查 2 小时

输出：

> # C6 Web Application AAR — Week 1
> ## S 情境（Situation）…（KSTAR 完整结构，含 ΔR 与下周计划）

完整示例见 [examples/example-output.md](examples/example-output.md)。

## 项目结构

```
elite20-aar-writer/
├── README.md          ← 项目说明（本文件）
├── LICENSE            ← MIT
├── AI_LOG.md          ← AI 生成日志
├── ATTRIBUTION.md     ← 拿来说明（借鉴来源）
├── .gitignore
├── index.html         ← 单页应用（表单 + 结果区）
├── app.js             ← 前端逻辑（提示词构建 / AI 调用 / 导出）
├── styles.css         ← 样式（响应式，手机可用）
└── examples/
    └── example-output.md  ← 生成结果示例
```

## 技术栈

- 前端：原生 HTML + CSS + JavaScript（零框架、零构建、零依赖）
- AI 集成：pollinations.ai 免费文本端点（默认）／任意 OpenAI 兼容 API（自备 Key）
- 部署：GitHub Pages（纯静态）

## AI 生成说明

本项目使用 AI 辅助开发（Claude Code），详见 [AI_LOG.md](./AI_LOG.md)。

## 借鉴来源

本项目参考了以下来源，详见 [ATTRIBUTION.md](./ATTRIBUTION.md)。

## License

MIT
