import { ReactNode } from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type StatusType = 'success' | 'warning' | 'error' | 'info';

export interface ImageProps {
  src: string;
  alt: string;
  overlay?: boolean;
  overlayColor?: string;
}

export interface RibbonProps {
  text: string;
  color?: string;
}

export interface StatusProps {
  type: StatusType;
  message: string;
}

export interface ActionProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface CardBaseProps {
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
}