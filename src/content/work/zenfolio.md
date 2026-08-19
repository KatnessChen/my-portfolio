---
title: Zenfolio
tagline: A unified portfolio dashboard across trading platforms — upload a screenshot of your trading history and an AI parser turns it into structured buy, sell and dividend records.
category: fullstack-cloud-ai
year: '2025'
role: Solo — software engineer across two Go services and a React client
featured: true
order: 4
stack:
  frontend: ['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui', 'Storybook']
  backend: ['Go', 'Gin', 'GORM', 'MySQL 8.0', 'Redis']
  ai: ['Gemini 2.5 Flash', 'generative-ai-go']
  infra: ['Docker', 'Docker Compose']
cover: zenfolio_01.webp
coverAlt: >-
  Zenfolio's transaction history: a filterable, sortable table of trades across two
  brokers, with buy, sell and dividend rows colour-coded and each showing price,
  quantity, amount and currency.
gallery:
  - src: zenfolio_02.webp
    alt: >-
      The portfolio overview header showing total portfolio value in USD, all-time
      gain in dollars and percent, and the annualised return.
    caption: >-
      The portfolio header, computed live: holdings are derived from the transaction
      log, current prices come through the price service's Redis cache, and the
      annualised figure is an XIRR over the irregular cash flows rather than a simple
      return.
links:
  github: https://github.com/KatnessChen/zenfolio
# TODO 補真實數據：解析準確率、支援的券商格式數、XIRR 計算涵蓋的交易筆數
highlights:
  - { label: Services, value: '3' }
  - { label: Backend language, value: 'Go' }
draft: true
---

## Overview

Anyone holding stocks across more than one broker has the same problem: each platform
shows you its own slice, and none of them show you the whole position. Zenfolio pulls
those slices into one dashboard — total assets, realised and unrealised return,
annualised rate via XIRR, and gain/loss broken down per holding.

The awkward part is getting the data in. Brokers export inconsistently and many don't
export usefully at all, so Zenfolio takes the path users actually have available: upload
a screenshot of your trading history and let the system read it.

## My Role

Solo — the React client, both Go services, the data model, and the container setup.

## Architecture

Three containerised services behind Docker Compose.

The **React client** (Vite, Redux Toolkit, shadcn/ui, with components developed in
Storybook) talks to a single REST API.

The **core API** in Go and Gin handles transactions, portfolio state, chart metrics and
authentication, persisting through GORM to MySQL. It is also where screenshot parsing
lives: uploaded images go to Gemini 2.5 Flash behind a small `ModelType` abstraction, so
the model is a swappable implementation rather than something welded into the handlers.

The **price service** is a separate Go microservice. It owns all contact with the
external stock-price API and fronts it with a Redis cache, which is the reason it is
separate at all — price data is shared across every user and every holding, changes on
its own schedule, and is rate-limited upstream. Caching it inside the core API would
have meant coupling portfolio logic to somebody else's quota.

Choosing Go here was partly deliberate range: the other backends in this portfolio are
Node and Python, and I wanted the concurrency model and deployment story of a compiled
service to be something I had actually shipped rather than read about.
