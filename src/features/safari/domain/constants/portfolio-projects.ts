import { PortfolioProjectVariant } from '@/features/safari/domain/enums/portfolio-project-variant';
import type { PortfolioProject } from '@/features/safari/domain/models/portfolio-project';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    number: '01',
    category: 'PRODUCT',
    year: 2026,
    title: 'Project Aurora',
    description: 'A thoughtful digital product for ambitious teams.',
    variant: PortfolioProjectVariant.BLUE,
  },
  {
    number: '02',
    category: 'PLATFORM',
    year: 2025,
    title: 'Project Sol',
    description: 'A warm, fast interface that makes complexity feel obvious.',
    variant: PortfolioProjectVariant.AMBER,
  },
];
