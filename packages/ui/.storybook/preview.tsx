import React from 'react';
import type { Preview } from '@storybook/react';
import 'antd/dist/reset.css';
import { AntdProvider } from '../src/providers/AntdProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AntdProvider>
        <Story />
      </AntdProvider>
    )
  ]
};

export default preview;


