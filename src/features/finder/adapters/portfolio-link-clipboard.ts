export async function copyPortfolioLink() {
  try {
    await globalThis.navigator.clipboard.writeText(globalThis.location.href);
    return 'Link copied';
  } catch {
    return 'Portfolio link ready';
  }
}
