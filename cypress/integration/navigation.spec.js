/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080')
  })

  it('about', () => {
    cy.get('body > header').contains('about').click()

    cy.location('pathname').should('include', 'about')
  })
  it('posts', () => {
    cy.get('body > header').contains('posts').click()

    cy.location('pathname').should('include', 'posts')
  })
  it('pocket', () => {
    cy.visit('http://127.0.0.1:8080/pocket')

    cy.get('body').contains('My Pocket reading list')
  })
  context('links', () => {
    it('social', () => {
      cy.get('body > footer').contains('twitter')
      cy.get('body > footer').contains('linkedin')
    })
    it('edit page', () => {
      cy.visit('http://127.0.0.1:8080/posts')

      cy.get('body > footer').contains('Edit this page on GitHub')
    })
  })
})
