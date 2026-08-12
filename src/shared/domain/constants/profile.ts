/**
 * Single source of truth for the person this desktop belongs to.
 *
 * These strings surface in a dozen unrelated places — the login screen, the
 * Apple menu, the Finder sidebar, the Terminal prompt, the About window, the
 * page title. Keeping them here means a change lands everywhere at once instead
 * of leaving a half-renamed desktop where the sidebar and the shell disagree.
 */
export const PROFILE = {
  name: 'Renan Leonel',
  firstName: 'Renan',
  initial: 'R',
  role: 'Frontend Software Engineer',
  company: 'TRACTIAN',
  location: 'Maringá, Brazil',
  machineName: "Renan's Mac",
  shellUser: 'renan',
  shellHost: 'renan-mac',
  email: 'renanleonelpro@gmail.com',
  site: 'renanleonel.com',
  siteUrl: 'https://renanleonel.com',
  githubUser: 'renanleonel',
  resumePath: '/renan-leonel-frontend-software-engineer.pdf',
  resumeFileName: 'Renan Leonel — Frontend Software Engineer.pdf',
} as const;

export const PROFILE_LINKS = {
  github: 'https://github.com/renanleonel',
  linkedin: 'https://www.linkedin.com/in/renanleonel/',
  devto: 'https://dev.to/renao',
  medium: 'https://medium.com/@renanleonelpro',
  email: `mailto:${PROFILE.email}`,
} as const;

/** Shown as plain text in the Terminal, where a URL is not clickable. */
export const PROFILE_HANDLES = {
  github: 'github.com/renanleonel',
  linkedin: 'linkedin.com/in/renanleonel',
  devto: 'dev.to/renao',
  medium: 'medium.com/@renanleonelpro',
} as const;
