/* Elite20 AAR 生成器 — 前端逻辑
 * AI 端点优先级：自备 OpenAI 兼容 Key > 免费端点 text.pollinations.ai
 * Key 只存 localStorage，只发往用户自己填的 base URL；免费端点不发送任何 Key。
 */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var FREE_ENDPOINT = "https://text.pollinations.ai/";

  // ---- 设置 ----
  function loadSettings() {
    try { return JSON.parse(localStorage.getItem("aar_settings") || "{}"); } catch (e) { return {}; }
  }
  function saveSettings(s) { localStorage.setItem("aar_settings", JSON.stringify(s)); }

  function applySettings() {
    var s = loadSettings();
    $("apiKey").value = s.key || "";
    $("apiBase").value = s.base || "";
    $("apiModel").value = s.model || "";
  }
  $("btnSettings").addEventListener("click", function () {
    $("settingsPanel").classList.toggle("hidden");
  });
  $("btnSaveSettings").addEventListener("click", function () {
    saveSettings({ key: $("apiKey").value.trim(), base: $("apiBase").value.trim(), model: $("apiModel").value.trim() });
    $("settingsPanel").classList.add("hidden");
    setStatus("设置已保存（仅存本机浏览器）");
  });

  // ---- 自定义项目名 ----
  $("challenge").addEventListener("change", function () {
    $("customWrap").classList.toggle("hidden", this.value !== "自定义项目");
  });

  function projectName() {
    var c = $("challenge").value;
    return c === "自定义项目" ? ($("customName").value.trim() || "自定义项目") : c;
  }

  // ---- 提示词 ----
  function buildPrompt() {
    var styleMap = {
      concise: "精炼风格，150-300字，只写干货",
      standard: "标准风格，完整 KSTAR 结构，适合课程提交",
      detailed: "详细风格，展开分析失败根因与改进",
    };
    return [
      "你是 Elite20（AI+X 精英课程）的复盘教练。请根据以下素材，为学员写一份中文周度 AAR 复盘。",
      "要求严格使用 KSTAR 结构：",
      "## S 情境（Situation）：一句话交代背景",
      "## T 任务（Task）：本周的任务/目标",
      "## A 行动（Action）：实际做了什么（要有具体动作，不写空话）",
      "## R 结果（Result）：实际结果",
      "## ΔR 偏差：预期 R̂ 与 实际 R 的差距及原因（诚实分析）",
      "## 失败分析：哪里失败了 / 根本原因 / 看起来像但不是根本原因的",
      "## 下周计划：基于本周偏差调整的目标与做法",
      "输出格式：纯 Markdown，以「# 项目名 AAR — Week N」开头。",
      "风格：" + (styleMap[$("style").value] || styleMap.standard) + "。",
      "不编造素材里没有的事实；素材不充分的地方写「待补充」而不是猜。",
      "",
      "项目名：" + projectName(),
      "周次：Week " + ($("week").value || 1),
      "预期产出 R̂：" + ($("expected").value.trim() || "（未填写）"),
      "实际产出 R：" + ($("actual").value.trim() || "（未填写）"),
      "失败/卡点：" + ($("failures").value.trim() || "（未填写）"),
    ].join("\n");
  }

  // ---- AI 调用 ----
  function setStatus(msg, cls) {
    var el = $("status");
    el.textContent = msg || "";
    el.className = "muted " + (cls || "");
  }

  function callFreeEndpoint(prompt) {
    // GET 形式：https://text.pollinations.ai/{prompt}?model=openai
    return fetch(FREE_ENDPOINT + encodeURIComponent(prompt) + "?model=openai&system=" +
      encodeURIComponent("你是 Elite20 课程的 AAR 复盘教练，输出规范的中文 Markdown。"))
      .then(function (r) {
        if (!r.ok) throw new Error("免费端点 HTTP " + r.status + "（可能触发频率限制，请稍后再试或配置自己的 Key）");
        return r.text();
      })
      .then(function (t) {
        if (!t || t.length < 20) throw new Error("免费端点返回为空（可能触发频率限制，请稍后再试或配置自己的 Key）");
        return t;
      });
  }

  function callWithKey(prompt, s) {
    var base = (s.base || "https://api.openai.com/v1").replace(/\/+$/, "");
    var model = s.model || "gpt-4o-mini";
    return fetch(base + "/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + s.key },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "你是 Elite20 课程的 AAR 复盘教练，输出规范的中文 Markdown。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
      }),
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error("API 错误 " + r.status + "：" + t.slice(0, 120)); });
      return r.json();
    }).then(function (d) {
      var c = d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
      if (!c) throw new Error("API 响应中没有内容，请检查模型名");
      return c;
    });
  }

  function generate() {
    var prompt = buildPrompt();
    if (!$("actual").value.trim() && !$("expected").value.trim()) {
      setStatus("请至少填写「实际产出 R」再生成", "error");
      return;
    }
    var s = loadSettings();
    var btn = $("btnGenerate");
    btn.disabled = true;
    setStatus("AI 正在撰写 AAR…（免费端点约 10-30 秒）", "busy");
    var p = s.key ? callWithKey(prompt, s) : callFreeEndpoint(prompt);
    p.then(function (text) {
      text = text.trim();
      $("output").textContent = text;
      $("outputWrap").classList.remove("hidden");
      setStatus("生成完成 — 请审校后提交（AAR 的核心是真实）");
      $("outputWrap").scrollIntoView({ behavior: "smooth" });
    }).catch(function (e) {
      setStatus("生成失败：" + e.message, "error");
    }).finally(function () {
      btn.disabled = false;
    });
  }
  $("btnGenerate").addEventListener("click", generate);
  $("btnRegenerate").addEventListener("click", generate);

  $("btnCopy").addEventListener("click", function () {
    var t = $("output").textContent;
    function done() { setStatus("已复制到剪贴板"); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { setStatus("复制失败，请手动选择", "error"); }
      document.body.removeChild(ta);
    }
  });

  $("btnDownload").addEventListener("click", function () {
    var name = "AAR_Week" + ($("week").value || 1) + "_" + projectName().replace(/[\\/:*?"<>|\s]+/g, "-") + ".md";
    var blob = new Blob([$("output").textContent], { type: "text/markdown;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  applySettings();
})();
