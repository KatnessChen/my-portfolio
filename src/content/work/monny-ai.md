---
title: Monny AI
tagline: A household cash-flow system that runs entirely on local hardware — rules parse what rules can parse, a locally-hosted LLM handles only what they can't, and no financial data ever leaves the network.
category: fullstack-local-ai
year: '2026'
role: Solo — full-stack, data modelling & local AI
featured: true
order: 2
cover: monny-ai_01.webp
coverAlt: >-
  Monny AI's monthly report: net cash flow, a day-by-day inflow/outflow bar chart,
  a filterable transaction list with category tags, and a top-outflow-categories
  breakdown. Amounts are masked by the app's privacy toggle.
gallery:
  - src: monny-ai_02.webp
    alt: >-
      The CSV import screen, showing the account selector, statement format,
      deposit-handling default and file picker.
    caption: >-
      The import screen states the parsing contract in the interface itself — dates,
      amounts and accounts are parsed by rules, never by a model, and re-importing a
      statement you have already loaded skips matching rows rather than duplicating them.
  - src: monny-ai_03.webp
    alt: >-
      The category management screen, listing user-defined inflow and outflow
      categories with a live transaction count beside each one.
    caption: >-
      Categories are user-defined and typed as inflow or outflow. Confirming a category
      during import also stores it as a merchant rule, which is how the rules table that
      replaced the local classifier gets built.
stack:
  frontend: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'shadcn/ui', 'Base UI']
  backend: ['Python', 'SQLAlchemy + Alembic', 'pandas', 'Docker Compose']
  ai: ['Ollama (local)', 'Llama 3.1 8B / Mistral Nemo 12B / Gemma 2 9B']
  infra: ['Self-hosted', 'Tailscale-only access']
highlights:
  - { label: Data leaving the network, value: 'None' }
  - { label: Public ports open, value: '0' }
  - { label: Model runtime, value: 'On-device' }
draft: true
---

## Overview

Monny AI tracks household cash flow across individual and joint accounts. The
constraint that shaped every other decision is that bank statements are about as
sensitive as personal data gets, so nothing in the system is allowed to reach a
third-party API. The models run locally, the database is local, and remote access
goes over Tailscale with no port exposed to the public internet.

## My Role

Solo — architecture, data model, Python backend, Next.js frontend, and the local
model setup.

## Architecture

The backend is a Python service with a SQLAlchemy data model under Alembic
migrations, running in Docker Compose. **Ollama deliberately sits outside the
compose stack** — installed natively on macOS and reached from the backend
container via `host.docker.internal`. Containerising it would have been tidier, and
would also have thrown away Metal GPU acceleration, which was not a trade worth
making.

Attribution is derived rather than stored: transactions belong to whoever owns the
source account, joint-account transactions count in full in the combined view and
split by ownership ratio in individual views. There is no `attributed_to` column to
drift out of sync, and combined figures are always summed live from individual
records rather than cached.
