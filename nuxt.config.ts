// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  
  // Fix Vite Node IPC socket issue
  vite: {
    server: {
      hmr: {
        protocol: 'ws'
      }
    }
  },
  
  // Development server configuration
  devServer: {
    port: 3000,
    host: 'localhost'
  },
  
  app: {
    head: {
      title: 'Professional Resume',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional Resume built with Nuxt.js' }
      ]
    }
  }
}) 