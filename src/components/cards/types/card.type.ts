import { ReactNode } from 'react';

export type PriorityType = 'low' | 'medium' | 'high';
export type StatusType = 'success' | 'warning' | 'error' | 'info';

export interface ImagePropsType {
  src: string;
  alt: string;
  overlay?: boolean;
  overlayColor?: string;
}

export interface RibbonPropsType {
  text: string;
  color?: string;
}

export interface StatusPropsType {
  type: StatusType;
  message: string;
}

export interface ActionPropsType {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface CardBasePropsType {
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
}