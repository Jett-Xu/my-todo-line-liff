# 🎲 LINE 聚餐決策器 (LINE Lunch/Dinner Decider)

這是一個基於 **Vue 3 + LINE LIFF** 的微型網頁應用程式，專為解決團隊或朋友之間「今天吃什麼？」的千古難題而生。
使用者可以在 LINE App 內直接打開此工具，輸入候選餐廳清單，並透過高互動性的「命運輪盤」抽出結果，最後一鍵將結果發送回原來的群組聊天室中。

## ✨ 核心特色與功能 (Features)

*   **無縫 LINE Auth 整合**：開啟時自動拉取使用者的 LINE 頭貼與暱稱。
*   **餐廳提名清單 (List)**：支援新增、刪除候選餐廳，並可勾選哪些餐廳要加入本輪抽籤。
*   **幸運輪盤 (Roulette)**：純 CSS 與 Vue 結合的高效能動態輪盤，帶有優雅擬真的減速動畫效果。
*   **深色 / 日間模式切換**：完美支援深淺兩種主題，根據現代簡約歐美風格 (Minimalist UI) 打造極致的視覺饗宴。
*   **一鍵群組推播**：結果出爐後，可以直接點擊按鈕，工具將透過 LIFF API 幫你把抽取結果回傳至 LINE 聊天室中，隨即自動關閉工具！
*   **本機狀態保留**：實作 `Pinia` 結合 `LocalStorage`，你的口袋名單不會因為關閉視窗而消失。

## 🛠️ 開發技術棧 (Tech Stack)

*   **Core:** [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`)
*   **Tooling:** [Vite](https://vitejs.dev/)
*   **State Management:** [Pinia](https://pinia.vuejs.org/)
*   **Routing:** [Vue Router 4](https://router.vuejs.org/)
*   **UI Framework:** [Bootstrap 5.3](https://getbootstrap.com/) (經過深度 SCSS 覆寫以達成極簡風格)
*   **Integration:** LINE LIFF SDK (`@line/liff`)

## 🚀 如何在本地端執行 (Installation & Setup)

1. **安裝依賴**:
   (專案使用 `pnpm-lock.yaml`，強烈推薦使用 pnpm)
   ```bash
   pnpm install
   ```

2. **設定環境變數**:
   確認專案根目錄中存在 `.env` 檔案，並且裡面包含你在 LINE 開發者後台申請的 LIFF ID：
   ```env
   VITE_LIFF_ID="YOUR_LINE_LIFF_ID"
   ```
   > ⚠️ **重要提示**：請確保該 LIFF App 設定中的 Scopes 選項，已經將 `profile` 以及 `chat_message.write` 打勾，才能正常取得大頭貼與發送訊息至聊天室。

3. **啟動開發伺服器**:
   ```bash
   pnpm run dev
   ```

## 🌐 部署至 Cloudflare Pages 或其他環境注意事項

如果你要部署至 Cloudflare Pages，請務必按照下方的指令：
*   **建置命令 (Build Command)**: `pnpm run build`
*   **輸出目錄 (Output Directory)**: `dist`

如果不這麼設定，Cloudflare 會嘗試直接讀取未編譯的 TS/Vite 檔案，導致網頁渲染失敗或出現 `video/mp2t` 類型的 Mime 錯誤。

---
*Developed as a modern frontend demonstration combining UX engineering and LINE ecosystem.*
