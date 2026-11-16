# App 链接（C6 交付说明）

## 在线访问地址

**<https://ZhouYan05.github.io/elite20-aar-writer/>**

- 托管：GitHub Pages（main 分支根目录）
- 已验证：HTTP 200 可访问；headless Edge `--dump-dom` 确认页面正常渲染
- 免安装、免登录：打开即用

## 这个 App 做什么

输入三项信息 → 输出一份可直接提交的 KSTAR 结构 AAR：

1. **本周预期产出 R̂**（你原本计划完成什么）
2. **实际产出 R**（实际完成了什么）
3. **失败/卡点**（卡在哪、当时怎么处理）

输出为七维 AAR Markdown：学到什么 / 流程 / 与 AI 协作 / 完成了什么 / 卡点与突破 / 改进方向 / ΔR 归因。

## 两种运行模式

| 模式 | 说明 | 适用 |
|---|---|---|
| 免费模式（默认） | 走公开免费文本端点，无需注册 | 偶尔用、快速试用 |
| 自备 Key 模式 | 填 OpenAI 兼容 base URL + Key（仅存本地 localStorage） | 高频使用、输出质量要求高 |

## 本地运行（无需联网部署）

```bash
git clone https://github.com/ZhouYan05/elite20-aar-writer.git
cd elite20-aar-writer
# 直接双击 index.html，或：
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 与仓库的关系

同一份代码既是在线 App（C6），也是开源仓库（C5）：
仓库地址见 `repo链接.md`，演示说明见 `demo说明.md`，AI 使用记录见 `AI日志.md`。
