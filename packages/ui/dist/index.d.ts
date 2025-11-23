import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { ThemeConfig } from 'antd';

type AntdProviderProps = {
    children: React.ReactNode;
};
declare function AntdProvider({ children }: AntdProviderProps): react_jsx_runtime.JSX.Element;

declare const antdTheme: ThemeConfig;

declare const designSystemColors: {
    neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    feedback: {
        green: {
            50: string;
            500: string;
            900: string;
        };
        red: {
            50: string;
            500: string;
            900: string;
        };
        yellow: {
            50: string;
            500: string;
            900: string;
        };
        blue: {
            50: string;
            500: string;
            900: string;
        };
        orange: {
            50: string;
            500: string;
            900: string;
        };
    };
};

type ComponentRegistryItem = {
    name: string;
    slug: string;
    description?: string;
};
declare const componentRegistry: ComponentRegistryItem[];

export { AntdProvider, antdTheme, componentRegistry, designSystemColors };
