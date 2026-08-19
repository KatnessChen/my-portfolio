---
title: MaraMap
tagline: Turns a decade of social-media posts into an interactive map, timeline and list — a running and travel log rebuilt from a raw Facebook export.
category: fullstack-cloud-ai
year: '2026'
role: Solo — software engineer & data pipeline
featured: true
order: 1
stack:
  frontend: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Leaflet', 'Framer Motion']
  backend: ['NestJS', 'Supabase (Postgres)']
  ai: ['Gemini 2.5 Flash']
  infra: ['Google Cloud Run', 'Cloudflare R2', 'Vercel']
cover: maramap_01.webp
coverAlt: >-
  The MaraMap world map view: a left rail of aggregate counters — countries visited,
  overseas marathons, total posts — beside a Leaflet map where clustered markers show
  how many geotagged posts sit at each location.
links:
  live: https://maramap.vizino.ai/
  github: https://github.com/KatnessChen/MaraMap-Frontend
highlights:
  - { label: Posts mapped, value: '518' }
  - { label: Countries, value: '39' }
  - { label: Overseas marathons, value: '53' }
draft: true
---

## Overview

Years of running and travel were sitting inside a Facebook data export — thousands of
posts, photos and videos in raw JSON, most of them carrying GPS coordinates nobody
was ever going to look at again. MaraMap turns that archive into something you can
actually browse: an interactive map, a timeline, and a list, all built from content
that already existed but was effectively unreadable.

## My Role

Solo project — data pipeline, backend API, frontend application and deployment.

## Architecture

The system splits into two halves that never run at the same time.

**Ingestion runs locally, not through the API.** A four-stage script pipeline processes
the raw export: extraction pulls text and geotagged media out of the Facebook JSON;
Gemini 2.5 Flash classifies each post into categories and generates tags; media is
uploaded to Cloudflare R2 in parallel and rewritten to CDN URLs; the structured result
is imported into Supabase.

**Serving is a conventional API.** A NestJS content API on Cloud Run exposes paginated
posts and the geotagged location set, and a Next.js App Router frontend on Vercel
renders the map with Leaflet and marker clustering.

Keeping ingestion out of the request path was the central decision: bulk classification
and media migration are slow, expensive and idempotent, and none of those properties
belong in an HTTP handler.
