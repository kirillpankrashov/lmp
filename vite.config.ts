// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: process.env.GITHUB_ACTIONS
//     ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'lmp'}/`
//     : '/',
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 49', 'safari >= 9'],
      renderModernChunks: false,
    }),
  ],
  base: './',
})
