import type { JSX } from 'react';
import { regionLabels } from '../../data/regions';

interface BadgeProps {
  region?: string | null;
}

export function Badge({ region }: BadgeProps): JSX.Element {
  const value = region?.trim() || '';
  return <span className="region-badge inline-flex rounded px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200">{regionLabels[value] ?? (value || 'No disponible')}</span>;
}
