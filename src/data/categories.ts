export const categoryLabel: Record<string, string> = {
  'fullstack-cloud-ai': 'Full-stack · Cloud AI',
  'fullstack-local-ai': 'Full-stack · Local AI',
  static: 'Static site',
};

/** 把 stack 物件壓成扁平清單，卡片上顯示前 N 個 */
export function flatStack(stack: {
  frontend?: readonly string[];
  backend?: readonly string[];
  ai?: readonly string[];
  infra?: readonly string[];
}): string[] {
  return [...(stack.frontend ?? []), ...(stack.backend ?? []), ...(stack.ai ?? []), ...(stack.infra ?? [])];
}
