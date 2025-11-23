"use client";

import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { antdTheme } from '../../theme/antdTheme';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export type AntdProviderProps = {
  children: React.ReactNode;
};

export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider locale={ptBR} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}


