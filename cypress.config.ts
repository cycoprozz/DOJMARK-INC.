import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    
    // Test file patterns
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support files
    supportFile: 'cypress/support/e2e.ts',
    
    // Environment variables
    env: {
      // Add test-specific environment variables here
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Code coverage
      require('@cypress/code-coverage/task')(on, config)
      
      return config
    },
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Browser configuration
    chromeWebSecurity: false,
    
    // Test isolation
    testIsolation: true,
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
  
  // Mobile testing
  env: {
    mobile: false,
  },
})
