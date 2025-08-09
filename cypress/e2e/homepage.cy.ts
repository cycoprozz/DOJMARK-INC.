describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('contain', 'DOJMARK')
  })

  it('displays main navigation', () => {
    // Check that navigation items are present
    cy.contains('About').should('be.visible')
    cy.contains('Services').should('be.visible')
    cy.contains('Portfolio').should('be.visible')
    cy.contains('Client Portal').should('be.visible')
  })

  it('displays hero section with CTA buttons', () => {
    // Check for main heading
    cy.get('h1, [role="heading"]').should('be.visible')
    
    // Check for CTA buttons
    cy.contains('Start Your Project').should('be.visible')
    cy.contains('Open Client Portal').should('be.visible')
  })

  it('has working navigation links', () => {
    // Test About link
    cy.contains('About').click()
    cy.url().should('include', '/about')
    cy.go('back')

    // Test Services link
    cy.contains('Services').click()
    cy.url().should('include', '/services')
    cy.go('back')

    // Test Portfolio link
    cy.contains('Portfolio').click()
    cy.url().should('include', '/portfolio')
    cy.go('back')
  })

  it('has working CTA buttons', () => {
    // Test primary CTA
    cy.contains('Start Your Project').click()
    cy.url().should('include', '/contact')
    cy.go('back')

    // Test secondary CTA
    cy.contains('Open Client Portal').click()
    cy.url().should('include', '/portal')
  })

  it('is mobile responsive', () => {
    cy.testMobile()
  })

  it('meets basic accessibility standards', () => {
    cy.checkA11y()
  })

  it('has proper SEO meta tags', () => {
    cy.get('head meta[name="description"]').should('have.attr', 'content').and('include', 'DOJMARK')
    cy.get('head meta[name="keywords"]').should('exist')
    cy.get('head meta[property="og:title"]').should('exist')
    cy.get('head meta[property="og:description"]').should('exist')
  })

  it('loads external resources successfully', () => {
    // Check that Google Fonts loaded
    cy.get('head link[href*="fonts.googleapis.com"]').should('exist')
    
    // Check that images load (if any)
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible')
      cy.wrap($img).should(($el) => {
        const img = $el[0] as HTMLImageElement;
        expect(img.naturalWidth).to.be.greaterThan(0)
      })
    })
  })

  it('handles error states gracefully', () => {
    // Test 404 page
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.get('body').then(($body) => {
      expect($body.text()).to.satisfy((text: string) => 
        text.includes('404') || text.includes('Not Found')
      )
    })
  })
})
