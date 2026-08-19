export const profile = {
  name: 'Yu-Wen Chen',
  alias: 'Katness',
  // Nav / footer 用的短名
  shortName: 'Yu-Wen Chen',
  role: 'Helping non-technical founders turn vibe-coded prototypes into workable MVPs.',
  location: 'Ottawa, Canada',
  email: 'yuwen.chen.ca@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yu-wen-chen-katness-chen-8340b9a4/',
  github: 'https://github.com/KatnessChen',
  // 履歷放到 public/resume.pdf 後把 null 改成 '/resume.pdf'
  resume: null as string | null,

  /** 首頁 Hero — 2–3 句 */
  bioShort:
    "I'm a full-stack engineer based in Ottawa. Over six years at startups in Taiwan and Singapore, plus two years freelancing, I've taken SaaS products from nothing to MVP and out the door — across web frontend, backend, databases, and AI integration. I partner with non-technical founders to bridge the final mile of development, transforming their vibe-coded prototypes into highly robust, launch-ready MVPs that can scale and iterate rapidly.",

  /** About 頁 — 段落陣列。之後補完整長版自介，直接加段落即可。 */
  bioLong: [
    "I'm a full-stack engineer based in Ottawa, Canada. I spent six years as a software engineer at startups in Taiwan and Singapore, followed by two years of freelancing — most of it on SaaS products taken from a blank repository to a shipped MVP.",
    "My work sits across the whole stack: interfaces in React and Vue, services in Nest.js and Node.js, relational and document data models, and deployments on GCP and AWS. The thread running through it is that I like owning a feature end to end, from the data model up to the pixel.",
    "More recently that has extended into integrating AI into products — both cloud-hosted models and locally-run ones — which is what most of the work below is about.",
    "Today, I focus on collaborating with non-technical founders. While AI allows almost anyone to 'vibe-code' an incredible initial proof-of-concept, taking a product across the finish line to become a truly workable, launch-ready MVP requires deep technical structure. I work closely with founders to pinpoint their technical hurdles, unblocking their workflows and establishing a solid foundation for rapid product iterations.",
  ],

  /** 首頁 Capabilities 三欄 */
  capabilities: [
    {
      title: 'Frontend',
      items: ['React', 'Vue', 'TypeScript', 'CSS', 'Responsive Web Design'],
    },
    {
      title: 'Backend & Infra',
      items: ['Nest.js', 'Node.js', 'Relational databases', 'NoSQL', 'Google Cloud Platform', 'AWS'],
    },
    {
      title: 'AI Integration',
      items: ['Claude Code', 'GitHub Copilot', 'Gemini'],
    },
  ],

  /** About 頁時間軸 */
  experience: [
    {
      period: 'Apr — Jun 2026',
      company: 'Invest Ottawa',
      url: 'https://www.investottawa.ca/',
      location: 'Ottawa, Canada',
      title: 'Entrepreneurship Program Participant',
      summary:
        'Completed a program on entrepreneurship fundamentals — validating ideas, business models, and go-to-market — as part of the shift from engineering into founding a SaaS company.',
    },
    {
      period: '2025 — Present',
      company: 'Independent / Freelance',
      location: 'Ottawa, Canada',
      title: 'Full-stack Engineer',
      summary:
        'Building SaaS products end to end for early-stage clients — architecture, implementation, and deployment.',
    },
    {
      period: '2022 — 2024',
      company: 'StraitsX',
      url: 'https://www.straitsx.com/',
      location: 'Singapore',
      title: 'Full-stack Engineer',
      summary:
        'Led a redesign of the core database schema that cut storage by 80% while making the system extensible to additional currencies and blockchains.',
    },
    {
      period: '2020 — 2022',
      company: 'Synergies Intelligent Systems',
      url: 'https://www.linkedin.com/company/synergies-intelligent-systems-inc/',
      location: 'Taiwan',
      title: 'Frontend Engineer',
      summary:
        'Built a natural-language input interface and the data-visualisation layer for an industrial analytics platform.',
    },
  ],
} as const;

export type Profile = typeof profile;
