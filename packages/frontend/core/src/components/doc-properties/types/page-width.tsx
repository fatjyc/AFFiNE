import { PropertyValue, RadioGroup, type RadioItem } from '@affine/component';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { DocService, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

import { container } from './page-width.css';
import type { PageLayoutMode, PropertyValueProps } from './types';

export const PageWidthValue = ({ onChange }: PropertyValueProps) => {
  const t = useI18n();
  const editorSetting = useService(EditorSettingService).editorSetting;
  const defaultPageWidth = useLiveData(editorSetting.settings$).fullWidthLayout;

  const doc = useService(DocService).doc;
  const pageWidth = useLiveData(doc.properties$.selector(p => p.pageWidth));

  const radioValue =
    pageWidth ??
    ((defaultPageWidth ? 'fullWidth' : 'standard') as PageLayoutMode);

  const radioItems = useMemo<RadioItem[]>(
    () => [
      {
        value: 'standard' as PageLayoutMode,
        label:
          t[
            'com.affine.settings.editorSettings.page.default-page-width.standard'
          ](),
        testId: 'standard-width-trigger',
      },
      {
        value: 'fullWidth' as PageLayoutMode,
        label:
          t[
            'com.affine.settings.editorSettings.page.default-page-width.full-width'
          ](),
        testId: 'full-width-trigger',
      },
    ],
    [t]
  );

  const handleChange = useCallback(
    (value: PageLayoutMode) => {
      doc.record.setProperty('pageWidth', value);
      onChange?.(value, true);
    },
    [doc, onChange]
  );
  return (
    <PropertyValue className={container} hoverable={false}>
      <RadioGroup
        width={194}
        itemHeight={24}
        value={radioValue}
        onChange={handleChange}
        items={radioItems}
      />
    </PropertyValue>
  );
};
