import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      emitError: true, // Emit ESLint errors
      emitWarning: true, // Emit ESLint warnings
      failOnError: true, // Stop build on error
      failOnWarning: false, // Continue on warnings (optional)
      formatter: 'stylish', // Use a clean formatter like 'stylish' to limit output
    }),
    tsconfigPaths(), // This plugin reads the paths defined in jsconfig.json or tsconfig.json
  ],
  server: {
    port: 2302, // Set the desired port here
  },
});
