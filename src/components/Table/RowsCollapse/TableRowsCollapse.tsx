import './TableRowsCollapse.css';

import React from 'react';

import { IconArrowDown } from '../../../icons/IconArrowDown/IconArrowDown';
import { IconArrowUp } from '../../../icons/IconArrowUp/IconArrowUp';
import { cn } from '../../../utils/bem';

export type Props = {
  level: number;
  isTableExpanded?: boolean;
  toggleCollapse?: (e: React.SyntheticEvent) => void;
  isExpanded?: boolean;
  isExpander?: boolean;
};

export const cnTableRowsCollapse = cn('TableRowsCollapse');

export const TableRowsCollapse: React.FC<Props> = (props) => {
  const { level, children, isExpanded, toggleCollapse, isExpander, isTableExpanded } = props;

  const paddingLeft =
    level === 0 ? '' : `calc((calc(var(--cell-padding-horizontal) + var(--space-s)) * ${level})`;

  return (
    <div style={{ paddingLeft }} className={cnTableRowsCollapse(null)}>
      {!isTableExpanded && isExpander && (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span
          className={cnTableRowsCollapse('button')}
          role="button"
          onClick={toggleCollapse}
          onKeyDown={toggleCollapse}
        >
          {isExpanded ? <IconArrowDown size="s" /> : <IconArrowUp size="s" />}
        </span>
      )}
      <div
        className={cnTableRowsCollapse('cellContainer', { withExpanderPadding: !isTableExpanded })}
      >
        {children}
      </div>
    </div>
  );
};
