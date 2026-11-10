# 贡献指南

感谢你有兴趣贡献！本项目是 Elite20 课程项目（周岩），欢迎任何改进。

## 如何贡献

1. Fork 本仓库并 clone 到本地
2. 创建分支：`git checkout -b feature/你的改进`
3. 修改后本地验证：纯静态站点，双击 `index.html` 或 `python -m http.server 8000` 即可测试
4. Commit 并 push 到你的 fork，然后提交 Pull Request

## 约定

- 保持零依赖：不引入任何前端框架 / 构建工具（这是本项目明确的设计决策，见 ATTRIBUTION.md）
- Key 安全：任何 API Key 相关代码必须保持「用户自填、只存 localStorage、只发往用户指定的 Base URL」原则
- AI 辅助开发：如使用 AI 辅助，请在 PR 描述中说明并更新 `AI_LOG.md`

## 报告问题

请通过 GitHub Issues 报告，包含：浏览器与版本、操作步骤、预期/实际结果、截图（如有）。
