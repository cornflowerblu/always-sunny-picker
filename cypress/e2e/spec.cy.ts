describe('main page', () => {
  it('loads', () => {
    cy.visit('localhost:3000')
  })
  it('shuffles a few episodes, generates a cookie, and can fetch details', () => {
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.getCookie('_sunnysession').should('have.a.property', 'value');
    cy.contains('Details').click().document().its('contentType').should('eq', 'text/html')
  })
});