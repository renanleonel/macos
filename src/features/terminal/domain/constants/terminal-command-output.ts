import { TerminalCommand } from '@/features/terminal/domain/enums/terminal-command';
import { PROFILE, PROFILE_HANDLES } from '@/shared/domain/constants/profile';

/**
 * Text-only commands. `about`, `experience`, `projects` and `resume` are absent
 * on purpose — they open a window instead, see TERMINAL_COMMAND_APPS.
 */
export const TERMINAL_COMMAND_OUTPUT: Partial<Record<TerminalCommand, string[]>> = {
  [TerminalCommand.HELP]: [
    'about        open About Me',
    'experience   open my CV',
    'projects     open my open-source work',
    'resume       open my CV',
    'skills       what I work with',
    'contact      where to reach me',
    'date         current date and time',
    'clear        clear the screen',
  ],
  [TerminalCommand.SKILLS]: [
    'Core       React · TypeScript · Next.js · Node.js',
    'Data       TanStack Query · AG Grid · Highcharts · virtualization',
    'Quality    Vitest · Jest · Cypress · Playwright · 700+ tests shipped',
    'Platform   Design systems · A/B testing · CI/CD · AWS · Sentry · PostHog',
  ],
  [TerminalCommand.CONTACT]: [
    `Email     ${PROFILE.email}`,
    `GitHub    ${PROFILE_HANDLES.github}`,
    `LinkedIn  ${PROFILE_HANDLES.linkedin}`,
    `dev.to    ${PROFILE_HANDLES.devto}`,
    `Medium    ${PROFILE_HANDLES.medium}`,
    `Site      ${PROFILE.site}`,
  ],
};
