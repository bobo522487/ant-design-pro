import { configUmiAlias, createConfig } from '@umijs/max/test.js';

export default async (): Promise<any> => {
  const config = await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
  });
  return {
    ...config,
    testEnvironmentOptions: {
      ...(config?.testEnvironmentOptions || {}),
      url: 'http://localhost:8000',
    },
    setupFiles: [...(config.setupFiles || []), './tests/setupTests.jsx'],
    globals: {
      ...config.globals,
      localStorage: null,
    },
    testMatch: [
      '**/__tests__/**/*.(ts|tsx|js)',
      '**/*.(test|spec).(ts|tsx|js)',
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/config/',
      '/mock/',
      '/.umi/',
      '/dist/',
    ],
  };
};
