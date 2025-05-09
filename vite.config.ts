import type { PluginOption } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import reactScan from '@react-scan/vite-plugin-react-scan'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'

  const plugins: PluginOption[] = [
    react(),
    cloudflare(),
  ]

  if (isDevelopment) {
    plugins.push(
      reactScan({
        enable: true,
      }),
    )
  }

  return {
    plugins,
  }
})
