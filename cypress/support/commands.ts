/// <reference types="cypress" />

// Custom command to select elements by data-cy attribute
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`)
})

// Custom command to mock user login
Cypress.Commands.add('loginUser', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('dojmark-session', JSON.stringify({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User'
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }))
  })
})

// Custom command to test mobile responsiveness
Cypress.Commands.add('testMobile', () => {
  // Test common mobile breakpoints
  const viewports = [
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 414, height: 896, name: 'iPhone XR' },
    { width: 360, height: 640, name: 'Android' },
  ]
  
  viewports.forEach((viewport) => {
    cy.viewport(viewport.width, viewport.height)
    cy.wait(1000) // Allow layout to settle
    
    // Check that content is visible and not overflowing
    cy.get('body').should('be.visible')
    cy.document().then((doc) => {
      expect(doc.body.scrollWidth).to.be.lessThan(viewport.width + 50) // Allow small tolerance
    })
  })
  
  // Reset to desktop
  cy.viewport(1280, 720)
})

// Custom command for basic accessibility checks
Cypress.Commands.add('checkA11y', () => {
  // Check for basic accessibility issues
  
  // All images should have alt text
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt')
  })
  
  // All buttons should be keyboard accessible
  cy.get('button, [role="button"]').each(($btn) => {
    cy.wrap($btn).should('not.have.attr', 'tabindex', '-1')
  })
  
  // Check for proper heading hierarchy
  cy.get('h1').should('have.length.at.most', 1)
  
  // Check for proper form labels
  cy.get('input[type="text"], input[type="email"], input[type="password"], textarea').each(($input) => {
    const id = $input.attr('id')
    if (id) {
      cy.get(`label[for="${id}"]`).should('exist')
    }
  })
  
  // Check for sufficient color contrast (basic check)
  cy.get('body').should('have.css', 'color').and('not.equal', 'rgba(0, 0, 0, 0)')
})
