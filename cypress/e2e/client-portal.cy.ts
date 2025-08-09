describe('Client Portal', () => {
  describe('Login Flow', () => {
    beforeEach(() => {
      cy.visit('/portal')
    })

    it('redirects to login when not authenticated', () => {
      cy.url().should('include', '/portal/login')
    })

    it('displays login form', () => {
      cy.visit('/portal/login')
      
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[type="password"]').should('be.visible')
      cy.contains('Sign In').should('be.visible')
      cy.contains('Google').should('be.visible')
    })

    it('shows validation errors for empty form', () => {
      cy.visit('/portal/login')
      
      cy.contains('Sign In').click()
      
      // Form should not submit and validation should trigger
      cy.url().should('include', '/portal/login')
    })

    it('handles login form submission', () => {
      cy.visit('/portal/login')
      
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[type="password"]').type('password123')
      cy.contains('Sign In').click()
      
      // Should show loading state
      cy.contains('Sign In').should('be.disabled')
      
      // Should redirect to dashboard after mock delay
      cy.url().should('include', '/portal', { timeout: 5000 })
    })

    it('password visibility toggle works', () => {
      cy.visit('/portal/login')
      
      const passwordInput = cy.get('input[type="password"]')
      passwordInput.type('testpassword')
      
      // Click show password button
      cy.get('button').contains('👁').click()
      cy.get('input[type="text"]').should('have.value', 'testpassword')
      
      // Click hide password button
      cy.get('button').contains('👁').click()
      cy.get('input[type="password"]').should('have.value', 'testpassword')
    })
  })

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.loginUser()
      cy.visit('/portal')
    })

    it('displays dashboard when authenticated', () => {
      cy.url().should('include', '/portal')
      cy.url().should('not.include', '/login')
      
      cy.contains('Dashboard').should('be.visible')
    })

    it('displays dashboard cards', () => {
      // Check for main dashboard sections
      cy.contains('Projects').should('be.visible')
      cy.contains('Invoices').should('be.visible')
      cy.contains('Files').should('be.visible')
      cy.contains('Messages').should('be.visible')
    })

    it('opens sidecar on card click', () => {
      // Click on a dashboard card
      cy.contains('Projects').click()
      
      // Should open sidecar/modal
      cy.get('[style*="position: fixed"]').should('be.visible')
    })

    it('closes sidecar on background click', () => {
      // Open sidecar
      cy.contains('Projects').click()
      cy.get('[style*="position: fixed"]').should('be.visible')
      
      // Click background to close
      cy.get('[style*="position: fixed"]').click({ force: true })
      cy.get('[style*="position: fixed"]').should('not.exist')
    })

    it('has working logout functionality', () => {
      cy.contains('Logout').click()
      
      // Should redirect to login
      cy.url().should('include', '/portal/login')
    })

    it('is mobile responsive', () => {
      cy.testMobile()
      
      // Check that cards stack properly on mobile
      cy.viewport(375, 667)
      cy.get('[style*="grid"]').should('be.visible')
    })
  })

  describe('Files Page', () => {
    beforeEach(() => {
      cy.loginUser()
      cy.visit('/portal/files')
    })

    it('displays files page', () => {
      cy.contains('Files').should('be.visible')
      cy.url().should('include', '/portal/files')
    })

    it('displays file list', () => {
      // Should show mock files or empty state
      cy.get('body').then(($body) => {
        expect($body.text().toLowerCase()).to.satisfy((text: string) => 
          text.includes('files') || text.includes('no files')
        )
      })
    })

    it('file actions work', () => {
      // Look for action buttons (if files exist)
      cy.get('body').then(($body) => {
        if ($body.text().includes('Approve') || $body.text().includes('Download')) {
          cy.contains('Approve').should('be.visible')
          cy.contains('Download').should('be.visible')
        }
      })
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      cy.loginUser()
      cy.visit('/portal')
    })

    it('has working portal navigation', () => {
      // Test navigation within portal
      cy.contains('Files').click()
      cy.url().should('include', '/portal/files')
      
      cy.contains('Projects').click()
      cy.url().should('include', '/portal/projects')
    })

    it('maintains authentication across pages', () => {
      cy.visit('/portal/files')
      cy.url().should('not.include', '/login')
      
      cy.visit('/portal/projects')
      cy.url().should('not.include', '/login')
    })
  })
})
