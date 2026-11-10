# AI_LOG.md — AI 生成日志

> Elite20 第二原则：全程 AI 辅助开发并如实记录。本项目（C5 仓库 / C6 Web App）于 2026-11-10 由 Claude Code 辅助开发。

## 阶段 1：产品设计（约 15 分钟）

- Prompt 要点：「为 Elite20 课程做一个 Web App，输入 R̂/R/失败，输出 KSTAR AAR；目标用户是每周要交 AAR 的同学；先给 3 个产品方向」
- AI 产出：3 个方向（AAR 生成器 / 挑战进度追踪 / Skill 分析器），我选择 AAR 生成器——理由：与 C8/C9 周度 AAR 强绑定，真实需求频率高，表单→文本的交互最适合纯静态部署。
- 人工决策：不选「挑战进度追踪」是因为与 C6A 仪表盘功能重叠。

## 阶段 2：前端开发（约 40 分钟）

- Prompt 要点：「单页静态 App：两个表单面板 + 结果区；响应式；深色代码块；零依赖」
- 关键迭代：
  1. 初版把设置面板做成弹窗 → 改为内联折叠面板（手机端体验更好）；
  2. AI 建议用 marked.js 渲染 Markdown → 拒绝：结果区用 `<pre>` 纯文本更利于「复制/下载后原样提交」，且保持零依赖；
  3. 自定义项目名联动（select 选「自定义项目」显示输入框）为 AI 生成，测试通过。

## 阶段 3：AI 集成（约 30 分钟）

- 需求：「前端直接调 LLM，不暴露 Key；支持免费端点 + 自备 Key 双模式」
- 方案对比：
  | 方案 | 结论 |
  |---|---|
  | Vercel Serverless 中转 | 需部署后端，超出纯静态范围 → 弃 |
  | pollinations.ai 免费端点 | 无需注册即用，但 45s/IP 限频 → 作为默认模式 ✅ |
  | 用户自备 OpenAI 兼容 Key（存 localStorage） | 高频/高质量场景 ✅，且符合 C6 规范「让用户自己输入 key」 |
- 踩坑：pollinations 的 GET 端点对长 prompt 会截断，改为 `encodeURIComponent` 完整编码 + `system` 参数注入人设后正常；402 限频错误在 UI 中给了明确提示与自备 Key 引导。

## 阶段 4：部署与验证（约 20 分钟）

- 部署到 GitHub Pages（repo → Settings → Pages，main 分支根目录）。
- 验证：headless Edge `--dump-dom` 确认页面渲染；`curl` 确认 GitHub Pages 返回 200；免费端点用最小 prompt 实测返回。
- 踩坑：GitHub Pages 首次发布需等待 1-2 分钟，期间 404 属正常。

## 阶段 5：文档（约 20 分钟）

- README 按 C5 标准模板由 AI 生成初稿，我逐节核对（安装命令、示例、项目结构、技术栈全部与实际一致后保留）。

## 手动步骤反向举证

- `styles.css` 的配色与间距为人工微调（AI 初版对比度不足）。
- 所有文案中的课程术语（KSTAR、R̂/ΔR、C1–C10H）由我提供，AI 只负责组织。
