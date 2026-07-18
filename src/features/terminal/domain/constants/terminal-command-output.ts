import { TerminalCommand } from '@/features/terminal/domain/enums/terminal-command';

export const TERMINAL_COMMAND_OUTPUT: Partial<Record<TerminalCommand, string[]>> = {
  [TerminalCommand.HELP]: ['Available commands: about, projects, contact, skills, date, clear'],
  [TerminalCommand.ABOUT]: ['Renan — designer and developer focused on crafted interfaces.'],
  [TerminalCommand.PROJECTS]: ['01  Project Aurora', '02  Project Sol', '03  This macOS portfolio'],
  [TerminalCommand.CONTACT]: [
    'Email: renan@example.com',
    'GitHub: github.com/renan',
    'LinkedIn: linkedin.com/in/renan',
  ],
  [TerminalCommand.SKILLS]: ['React · TypeScript · Design systems · Product engineering'],
};
