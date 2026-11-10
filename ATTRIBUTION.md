# ATTRIBUTION.md — 拿来说明

| 来源 | 拿了什么 | 改了什么 |
|---|---|---|
| Elite20 C8/C9 挑战规范（AAR 模板） | KSTAR 结构：S 情境 / T 任务 / A 行动 / R 结果 / ΔR 偏差 / 失败分析 / 下周计划 | 固化为提示词的系统指令与表单字段，保证生成物与课程提交格式一致 |
| [pollinations.ai](https://pollinations.ai) | 免费文本生成端点（GET /{prompt}?model=openai） | 增加 `system` 参数注入「AAR 复盘教练」人设；对 402 限频做了用户提示与自备 Key 引导 |
| OpenAI Chat Completions API 规范 | 自备 Key 模式的请求/响应结构 | 适配任意 OpenAI 兼容网关（DeepSeek / Kimi / 本地 Ollama 等均可填 Base URL） |
| C6 挑战规范的部署指南 | GitHub Pages 静态部署方案 | — |
| C6 挑战规范的「API Key 安全提醒」 | 「Key 不硬编码、由用户自己输入」原则 | Key 仅存 localStorage，只发往用户自填的 Base URL |
| 常见表单+结果区单页布局（web-design 惯例） | 两栏表单 + 深色代码结果区 + 复制/下载交互 | 按 AAR 素材字段重新组织；响应式适配手机 |

## 刻意不采用的部分

- **marked.js / 前端 Markdown 渲染**：会让「复制/下载」带上渲染痕迹，且引入依赖；用 `<pre>` 输出纯 Markdown 更贴合「审校后提交」的使用方式。
- **后端中转代理**：增加部署复杂度与 Key 泄露面，纯前端双模式（免费端点 + 自备 Key）已覆盖目标场景。
