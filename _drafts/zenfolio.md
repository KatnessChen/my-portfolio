# zenfolio — 暫時隱藏的區塊

貼回 `src/content/work/zenfolio.md` 的最後面即可恢復顯示。

---

## Technical Deep Dive

### Screenshots as an input format

TODO — 這是最值得寫的一段。為什麼選截圖上傳而不是 CSV 匯入？
模型讀錯數字的代價很高（financial data），你怎麼處理驗證與使用者確認？
和 Monny AI 的「LLM 結果須經 UI 確認才入庫」是同一個問題，可以互相對照。

### Splitting the price service out

TODO — 補上：Redis 的 cache key 設計與 TTL 怎麼定？外部 API 的 rate limit 怎麼處理？

### XIRR

TODO — 不規則現金流的年化報酬率計算，用什麼方法解？精度與邊界條件怎麼處理？

## Outcome

TODO — 補上：支援的券商格式、解析準確率、快取命中率。

## Reflection

TODO — 建議寫：Go 與 Node/Python 在這個場景的實際差異，你會不會再選一次。
