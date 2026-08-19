---
title: Vizino AI
tagline: An AI interior-design studio that replaces the chat window with a project workspace — upload a room photo, preview paint, texture and furnishing changes, and keep every prompt reusable.
category: fullstack-cloud-ai
year: '2025 — 2026'
role: Solo — full-stack & cloud infrastructure
featured: true
order: 5
cover: vizino.ai.webp
coverAlt: >-
  The Vizino AI workspace: a Recolor design goal in the left rail, an uploaded room
  photo under Original Images, and a library of named paint colours each with its hex
  value and description.
stack:
  frontend: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design', 'Tailwind CSS', 'dnd-kit']
  backend: ['NestJS', 'Firebase Admin', 'Swagger / OpenAPI']
  ai: ['Google Vertex AI', 'Gemini (@google/genai)']
  infra: ['Google Cloud Run', 'Docker', 'Google Container Registry', 'Vercel']
links: {}
# TODO 填真實數據：使用者數、產圖數、單張成本、平均延遲
highlights: []
gallery: []
draft: true
---

## Overview

Generic AI chat interfaces are a poor fit for interior design work. Long conversations
drift and hallucinate, generated images vary between iterations so a design loses
coherence, and every successful prompt is buried in scrollback the moment the session
ends. Vizino AI takes the same underlying image models and puts a structured workspace
around them.

The core idea is a **project-based workflow**: designs are organised by project and
space rather than scattered across chat threads, so images, colours, textures and
prompts stay addressable and reusable.

## My Role

Solo — React application, NestJS API, Vertex AI integration, GCP deployment, and the
Astro marketing site.

## Architecture

A React SPA handles the workspace: project and space organisation, image upload,
drag-and-drop material assignment, and prompt management, with Redux Toolkit holding
the client state and Google OAuth via Firebase for identity.

The NestJS API sits on Cloud Run behind a scripted two-environment deploy
(`dev` / `prod`, containerised and pushed to Google Container Registry). It brokers
every model call through Vertex AI rather than letting the browser talk to the model
directly — which keeps credentials server-side and makes request shaping, validation
and cost control possible in one place.

A separate Astro static site handles marketing and access requests.
