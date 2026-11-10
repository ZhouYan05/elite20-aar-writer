# C6 Web Application AAR — Week 1

## S 情境（Situation）
C6 挑战要求交付一个部署上线、AI 为核心功能的 Web App；我选择做 AAR 生成器，服务 C8/C9 的周度复盘需求。

## T 任务（Task）
完成产品设计 → 前端开发 → AI 集成 → GitHub Pages 部署，拿到公开 URL 并在群内收集反馈。

## A 行动（Action）
1. 用 AI 对比 3 个产品方向，选定 AAR 生成器（与课程周度需求强绑定）；
2. 纯静态实现（HTML/CSS/JS 零依赖），AI 生成初版后人工微调配色与间距；
3. 双模式 AI 集成：pollinations 免费端点（默认）+ 自备 OpenAI 兼容 Key（localStorage）；
4. 部署 GitHub Pages，headless 浏览器验证渲染，实测免费端点。

## R 结果（Result）
App 已上线：https://ZhouYan05.github.io/elite20-aar-writer/；手机端布局可用；核心流程（输入→生成→复制/下载）走通。

## ΔR 偏差
预期收集 5 份反馈，实际 3 份（2 人卡在手机端按钮过小）→ 计划内偏差，反馈已转化为下一版改点。

## 失败分析
- 失败：部署初期 GitHub Pages 404，以为配置错了。根本原因：首次发布需要 1-2 分钟生效。看起来像但不是的：域名配置（实际无关）。
- 失败：免费端点 45 秒限频导致连续生成报错。根本原因：免费层级限制。修正：UI 明示限频并引导自备 Key。

## 下周计划
- 手机端按钮热区加大；支持「周报批量生成」；群内二次收集反馈。
