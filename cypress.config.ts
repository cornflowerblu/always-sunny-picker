import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "viewportHeight": 1200,
    "viewportWidth": 1600,
    experimentalStudio: true,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      //stufff
    },
  },
});
