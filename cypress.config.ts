import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "viewportHeight": 1200,
    "viewportWidth": 1600,
    setupNodeEvents(on, config) {
      //stufff
    },
  },
});
