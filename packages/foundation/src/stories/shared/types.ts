import type { StoryObj } from '@storybook/react';
import type React from 'react';

// Core variable type - used across all stories
export type Variable = {
  name: string;
  rawValue?: string;
};

// Story type - used across all stories
export type Story = StoryObj;

// CSS variables map
export type CSSVariables = Record<string, string>;

// Categories and file names for token sources
export type Category = 'primitive' | 'semantic' | 'component';
export type PrimitiveFileName = 'layout' | 'palette' | 'typography';
export type SemanticFileName = 'color' | 'heading' | 'text';
export type ComponentFileName = 'color';
export type FileName = PrimitiveFileName | SemanticFileName | ComponentFileName;

// Hook return type for using CSS variables
export type UseCSSVariablesResult = {
  variables: CSSVariables;
  loading: boolean;
  error: string | null;
};

export type VariableDisplayProps = {
  variables: Record<string, string>;
  title: string;
  renderValue?: (value: string) => React.ReactNode;
  renderTitle?: (variable: string) => React.ReactNode;
  groupKey?: string;
};

export type TextStyleProps = {
  variables: Record<string, string>;
  title: string;
};

export type TypographyDisplayProps = {
  variables: Record<string, string>;
  title: string;
};

export type ColorStyleProps = GroupComponentProps & {
  showValue?: boolean;
};

export type ErrorDisplayProps = {
  error: string;
};

export type GroupComponentProps = {
  variables: Record<string, string>;
  title: string;
  description?: string;
  namePrefix?: string;
  groupKey?: string;
};

export type GroupComponent = React.ComponentType<GroupComponentProps>;

export type GroupConfig<K extends string = string> = {
  key: K;
  title: string;
  prefix?: string;
  description?: string;
  component: GroupComponent;
};

// Generic story prop for per-group stories
export type GroupStoryProps<K extends string = string> = {
  groupKey: K;
};

export type GroupMap<K extends string = string> = Record<K, GroupConfig<K>>;
