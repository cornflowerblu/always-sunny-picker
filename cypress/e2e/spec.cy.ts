import { fail } from "assert"

describe('main page', () => {
  it('loads', () => {
    cy.visit('localhost:3001')
  })

  it('shuffles a few episodes, generates a cookie, and can fetch details', () => {
    cy.visit('localhost:3001')
    cy.contains('Shuffle').click()
    cy.contains('Shuffle').click()
    cy.contains('Shuffle').click()
    cy.contains('Details').click().document().get('h3').should('exist')
  })

  it('should throw the error page when needed and allow the user to navigate home', () => {
    cy.visit('localhost:3001/sdjhfkjshdfkjshdfkjsdhf', {
      failOnStatusCode: false,
    })
      .document()
      .get('h1')
      .contains('Oops!')
    cy.contains('Go Home').click()
  })
})

describe('v2', () => {
  it('loads the v2 api', () => {
    cy.request('localhost:3001/v2').should('exist')
  })
})

describe('episode entry', () => {
  it('redirects to login without auth', () => {
    cy.visit('localhost:3001/episode').document().get('h1').contains('Sign In')
  })
})

describe('admin/cms', () => {
  it('allows an admin to create a user', () => {
    cy.visit('http://localhost:3001/admin?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')

    cy.get('input[name="email"]')
      .type('roger2@gmail.com')
      .should('have.value', 'roger2@gmail.com')

    cy.get('input[name="password"]')
      .type('goares2')
      .should('have.value', 'goares2')

    cy.get('form').submit()

    cy.wait(1000)

    cy.get('input[name="email"]')
      .type('roger2@gmail.com')
      .should('have.value', 'roger2@gmail.com')

    cy.get('input[name="password"]')
      .type('goares2')
      .should('have.value', 'goares2')

    cy.get('form').submit().document().get('h1').contains('Episode')
  })

  it('tries to delete the admin user with an insufficient role', () => {
    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: 'http://localhost:8080/api/rest/roger2@gmail.com',
      headers: {
        'Content-Type': 'application/json',
        'hasura_api_key': '123456',
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
    }
  )})

  it('deletes the admin user', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/api/rest/roger2@gmail.com',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'myadminsecretkey',
      },
    })
  })
})
