---
title: Well Maintained
tagline: A bilingual site for a proactive home-maintenance service, with the scheduling logic running client-side — an interactive demo, geo-aware language routing at the edge, and no backend at all.
category: static
year: '2026'
role: Solo — design & build
featured: true
order: 3
stack:
  frontend: ['Astro 4', 'TypeScript', 'Hand-written CSS']
  backend: []
  ai: []
  infra: ['Vercel', 'Vercel Edge Middleware', 'Web3Forms']
cover: well-maintained_01.webp
coverAlt: >-
  The Well Maintained landing page: a dark hero reading "Proactive home care that saves
  you money and worry", beside a sample smart schedule card listing seasonal tasks for
  October, November and April.
gallery:
  - src: well-maintained_02.webp
    alt: >-
      The interactive sample-schedule page, with selectors for climate, house age,
      heating system and DIY preference, toggleable home features, and computed totals
      showing 26 maintenance tasks a year, 8 high-priority, 19 DIY-able, and a rough
      yearly cost range.
    caption: >-
      The sample-schedule page runs the real scheduling logic in the browser. Change the
      climate, house age, heating system or the features your home has, and the task
      list, priority split and cost range recompute instantly — the same rules that
      produce the hand-checked plan, with no server involved.
links:
  live: https://wellmaintained.vizino.ai/
  github: https://github.com/KatnessChen/Vizino-Studio-Official-Website
highlights:
  - { label: Locales, value: 'EN / 中文' }
  - { label: Translation keys, value: '500+' }
  - { label: Backend services, value: 'None' }
  - { label: Scheduling logic, value: 'Client-side' }
draft: true
---

## Overview

Well Maintained sells a simple proposition to homeowners: answer a few questions about
your house — or upload your inspection report — and get back a month-by-month
maintenance schedule tailored to the property and the local climate. The pitch targets
the gap it names directly: you don't know what needs doing until it breaks, you don't
know what it should cost, and you don't know who to trust. So nothing gets done until a
$200 problem becomes a $5,000 one.

The site's job is to explain that clearly enough in two languages that a visitor hands
over an email address.

## My Role

Solo — positioning and copy, visual design, build, and deployment.

## Design & Build

The service behind the site is deliberately manual at this stage: a real person builds
each schedule by hand. That shaped the whole build. There was no product to integrate
with yet, so the correct architecture was the smallest one that could still capture
demand — a fully static Astro site with no backend, no database and no CMS, where form
submissions go straight to Web3Forms and land in an inbox.

**Bilingual routing without a server.** Content lives in a single typed translations
module (~500 keys across `en` and `zh-tw`), consumed through a small `t()` helper, with
pages generated under `/[lang]/` routes at build time. Language selection happens in
Vercel Edge Middleware: a request to `/` reads the `x-vercel-ip-country` header and
redirects to `/zh-tw` for Taiwan and `/en` for everyone else. The geo decision runs at
the edge in single-digit milliseconds and every page it points at is still a
pre-rendered static file.

**The sample schedule is not a mockup.** The scheduling rules run in the browser: pick
a climate, house age, heating system and DIY preference, toggle the features your home
actually has, and the task list, high-priority count and rough annual cost recompute
immediately. It is the same logic behind the hand-checked plan, which makes the demo a
genuine preview of the product rather than a screenshot of one — and it still ships as
a static file, because the rules are small enough to live on the client.

**Seven pages per locale** — landing, sample smart schedule, waitlist, beta request,
contact, privacy and terms — sharing one layout and one hand-written stylesheet.
