# maramap — 暫時隱藏的區塊

貼回 `src/content/work/maramap.md` 的最後面即可恢復顯示。

---

## Technical Deep Dive

### Batch AI classification instead of on-demand

TODO — 為什麼選擇離線批次分類而非 API 即時呼叫？成本？延遲？失敗重試？

### Parallel media migration with deduplication

The upload stage pushes up to 20 files concurrently and caches local file URIs so
repeated runs skip work already done — the pipeline had to be safe to re-run, because
in practice it was re-run constantly during development.

TODO — 補上實際的資料量與時間差。

## Outcome

TODO — 補上數據：post 數量、媒體檔案數量、pipeline 執行時間、地圖載入效能。

## Reflection

TODO
