import { defineConfig } from 'cypress'
require('dotenv').config()

export default defineConfig({
  e2e: {
    viewportHeight: 1200,
    viewportWidth: 1600,
    experimentalStudio: true,
    experimentalSessionAndOrigin: true,
    env: {
      REST_URL: process.env.REST_URL,
      GRAPHQL_ADMIN_SECRET: process.env.GRAPHQL_ADMIN_SECRET,
    },
    setupNodeEvents(on, config) {
      //stufff
    },
  },
})
