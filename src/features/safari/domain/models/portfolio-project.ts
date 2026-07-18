import type { PortfolioProjectVariant } from '@/features/safari/domain/enums/portfolio-project-variant';

export type PortfolioProject = {
  number: string;
  category: string;
  year: number;
  title: string;
  description: string;
  variant: PortfolioProjectVariant;
};
