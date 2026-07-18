import type { AppId } from '@/shared/domain/enums/app-id';

export type WindowState = {
  id: number;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};
