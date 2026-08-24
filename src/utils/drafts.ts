/**
 * Whether a content entry should render.
 *
 * Drafts are visible while developing so they can be previewed, and never
 * appear in a production build. Defined once and used by every `getCollection`
 * call — if one call site rolls its own filter, a draft eventually ships.
 */
export function isVisible(entry: { data: { draft?: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}
