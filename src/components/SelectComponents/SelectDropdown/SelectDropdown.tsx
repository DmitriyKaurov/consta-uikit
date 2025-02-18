import './SelectDropdown.css';

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { GetOptionPropsResult, Option, OptionProps } from '../../../hooks/useSelect/useSelect';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { SelectItem } from '../SelectItem/SelectItem';
import { PropSize } from '../types';

export const selectDropdownform = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownform[number];
export const defaultSelectDropdownPropForm = selectDropdownform[0];

type Props<ITEM> = PropsWithJsxAttributes<{
  size: PropSize;
  id: string;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleOptions: Option<ITEM>[];
  highlightedIndex: number;
  getOptionProps(props: OptionProps): GetOptionPropsResult;
  onCreate?(newLabel: string): void;
  inputValue?: string;
  hasGroup?: boolean;
  selectedValues: ITEM[] | null;
  labelForCreate?: string;
  labelForNotFound?: string;
  multi?: boolean;
  getOptionLabel(option: ITEM): string;
  getOptionKey(option: ITEM): string | number;
  form?: SelectDropdownPropForm;
  isOpen: boolean;
}>;

type SelectDropdown = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');
const cnSelectDropdownCssTransition = cnForCssTransition(cnSelectDropdown);

export const SelectDropdown: SelectDropdown = (props) => {
  const {
    controlRef,
    visibleOptions,
    highlightedIndex,
    size,
    getOptionProps,
    inputValue,
    dropdownRef,
    id,
    hasGroup = false,
    selectedValues,
    labelForCreate,
    multi = false,
    getOptionLabel,
    getOptionKey,
    className,
    labelForNotFound,
    form = defaultSelectDropdownPropForm,
    isOpen,
  } = props;

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnSelectDropdownCssTransition}
      timeout={200}
    >
      <Popover
        anchorRef={controlRef}
        direction="downStartLeft"
        possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
        offset={1}
        role="listbox"
        className={cnSelectDropdown({ form, size }, [className])}
        aria-activedescendant={`${id}-${highlightedIndex}`}
        equalAnchorWidth
      >
        <div className={cnSelectDropdown('List', { size, form })} ref={dropdownRef}>
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option, index: number) => {
              const isOptionForCreate = 'optionForCreate' in option;
              const currentOption = visibleOptions[index];
              const prevOption = visibleOptions[index - 1];
              const menuOption = isOptionForCreate ? visibleOptions[index + 1] : currentOption;
              const isFirstGroup =
                hasGroup && !isOptionForCreate && !visibleOptions[index - 1] && index === 0;
              const shouldShowGroupName =
                isFirstGroup ||
                (hasGroup && prevOption && currentOption.group !== prevOption.group);
              const active = Boolean(
                !isOptionForCreate &&
                  selectedValues?.some((val) => {
                    return getOptionKey(val) === getOptionKey(menuOption);
                  }),
              );
              const indent = form === 'round' ? 'increased' : 'normal';

              return (
                <React.Fragment key={String(getOptionKey(option))}>
                  {shouldShowGroupName && (
                    <SelectGroupLabel label={menuOption.group} size={size} indent={indent} />
                  )}
                  {isOptionForCreate ? (
                    <SelectCreateButton
                      size={size}
                      labelForCreate={labelForCreate}
                      inputValue={inputValue}
                      id={`${id}-${index}`}
                      active={active}
                      hovered={index === highlightedIndex}
                      indent={indent}
                      {...getOptionProps({ index })}
                    />
                  ) : (
                    <SelectItem
                      size={size}
                      label={getOptionLabel(option)}
                      id={`${id}-${index}`}
                      active={active}
                      hovered={index === highlightedIndex}
                      multi={multi}
                      indent={indent}
                      {...getOptionProps({ index })}
                    />
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <Text className={cnSelectDropdown('LabelForNotFound')}>{labelForNotFound}</Text>
          )}
        </div>
      </Popover>
    </CSSTransition>
  );
};
