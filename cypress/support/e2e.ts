// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test on uncaught exceptions
  // This is useful for third-party scripts that might throw errors
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  
  // Allow demo mode errors to pass through
  if (err.message.includes('demo mode') || err.message.includes('placeholder')) {
    return false
  }
  
  return true
})

// Add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to log in a user (mock)
       * @example cy.loginUser()
       */
      loginUser(): Chainable<void>
      
      /**
       * Custom command to test mobile responsiveness
       * @example cy.testMobile()
       */
      testMobile(): Chainable<void>
      
      /**
       * Custom command to check accessibility
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>
    }
  }
}
