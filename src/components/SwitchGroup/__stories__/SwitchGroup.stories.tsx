import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  SwitchGroup,
  switchGroupDefaultDirection,
  switchGroupDefaultSize,
  switchGroupDefaultView,
  switchGroupDirections,
  switchGroupSizes,
  switchGroupViews,
} from '../SwitchGroup';

import mdx from './SwitchGroup.mdx';

const cnSwitchGroupStories = cn('SwitchGroupStories');

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три' },
  { name: 'disabled', disabled: true },
  { name: 'пять' },
];

const defaultKnobs = () => ({
  size: select('size', switchGroupSizes, switchGroupDefaultSize),
  view: select('view', switchGroupViews, switchGroupDefaultView),
  direction: select('direction', switchGroupDirections, switchGroupDefaultDirection),
  disabled: boolean('disabled', false),
});

export function Playground() {
  const [value, setValue] = React.useState<Item[] | null>(null);
  const { size, view, direction, disabled } = defaultKnobs();

  return (
    <div className={cnSwitchGroupStories()}>
      <form>
        <SwitchGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name={cnSwitchGroupStories()}
          direction={direction}
          size={size}
          view={view}
          disabled={disabled}
        />
      </form>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/SwitchGroup',
  id: 'components/SwitchGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
