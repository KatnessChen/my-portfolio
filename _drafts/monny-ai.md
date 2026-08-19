# monny-ai — 暫時隱藏的區塊

貼回 `src/content/work/monny-ai.md` 的最後面即可恢復顯示。

---

## Technical Deep Dive

### Rules-based parsing where rules are enough, LLM only where they aren't

Dates, amounts and column structure in CSV statements are parsed by pandas rules and
never routed through a model — deterministic input deserves deterministic parsing.
The LLM is reserved for unstructured sources like PDF statements, where field
extraction genuinely needs language understanding.

Expense categorisation started as a local-model suggestion feature and was
**replaced with a user-defined merchant→category rules table** once it became clear
the local models were not accurate enough to be useful. The classifier code is still
in the repository, unwired.

That reversal is the most honest thing in this project: a local 8B model is not a
drop-in replacement for a frontier model, and the design had to absorb that.

### Nothing is written without confirmation

Every LLM-extracted result surfaces in the UI for the user to confirm before it
reaches the database. An extraction model that is wrong 5% of the time is fine as a
drafting tool and unacceptable as a writer of financial records.

### Decimal, everywhere

All monetary values use Decimal rather than float — a small rule that has to be held
absolutely, because a single float in the chain contaminates everything downstream.

## Outcome

TODO — 補上：處理過的帳單數量、解析準確率、本地模型延遲。

## Reflection

TODO — 建議寫「什麼情況該用地端 AI、什麼情況該用雲端」，這段對照 MaraMap 和 Vizino 會很有說服力。
