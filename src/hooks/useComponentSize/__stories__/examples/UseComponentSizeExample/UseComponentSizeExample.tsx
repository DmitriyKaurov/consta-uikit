import './UseComponentSizeExample.css';

import React, { useRef } from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { useComponentSize } from '../../../useComponentSize';

const cnUseComponentSizeExample = cn('UseComponentSizeExample');

export const UseComponentSizeExample = () => {
  const ref = useRef(null);
  const { width, height } = useComponentSize(ref);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Text ref={ref} className={cnUseComponentSizeExample('Block')}>
        width: {width}
        <br />
        height: {height}
      </Text>
    </div>
  );
};
