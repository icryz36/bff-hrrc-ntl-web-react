import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    ...configDefaults,
    environment: 'jsdom',
    css: false,
    setupFiles: ['vitest.setup.ts', 'react-intersection-observer/test-utils'],
    globals: true,
    mockReset: true,
    unstubEnvs: true,
    testTimeout: 35000,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      provider: 'v8',
      include: ['src'],
      thresholds: {
        statements: 80,
      },
      exclude: [
        ...configDefaults.exclude,
        '**/**/*.d.ts', // no test on typing/module declaration
        'src/test-utils/**', // test utility
        'src/main.tsx', // main app no need any test
        'src/App.tsx', // main app no need any test
        '**/types/**/**.ts', // no test on typing
        '**/index.ts',
        '**/index.tsx',
        '**/types.ts', // no test on typing
        'src/test-utils.tsx',
        '**/__tests__/**', // exclude test
        '**/__mocks__/**', // exclude mock
        'src/routes/**',
        'src/services/**',
        'src/**/**/styles.*',
        '**/*.css',
        '**/*.scss',
        '**/*.sass',
        'src/assets',
      ],
    },
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
  },
});
