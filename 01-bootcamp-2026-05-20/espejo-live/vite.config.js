import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'espejo.html',
        presenter: 'presenter.html',
      },
      output: {
        manualChunks: {
          convex: ['convex/browser'],
        },
      },
    },
  },
})
