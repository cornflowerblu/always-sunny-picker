describe('main page', () => {

  it('loads', () => {
    cy.visit('localhost:3000')
  })

  it('shuffles a few episodes, generates a cookie, and can fetch details', () => {
    cy.visit('localhost:3000');
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.contains('Details').click().document().get('h3').should('be.ok')
  })
});

describe('episode entry', () => {
  it('redirects to login without auth', () => {
    cy.visit('localhost:3000/episode').document().get('h1').contains('Sign In')
  })
})


  // it('should throw the error page when needed', () => {
  //   cy.visit('localhost:3000/sdjhfkjshdfkjshdfkjsdhf').document().get('h1').contains('Oops!')
  // })

  // it('should allow user to navigate home', () => {
  //   cy.contains('Go Home').click()
  // })

//   it('loads with auth', () => {
//     cy.visit('localhost:3000/auth')
    
//     cy.get('input[name="email"]')
//     .type('roger@gmail.com')
//     .should('have.value','roger@gmail.com')

//     cy.get('input[name="password"]')
//     .type('goares')
//     .should('have.value','goares')

//     cy.get('form').submit().document().get('h1').contains('Episode')
//   })
//   beforeEach(() => {
//     cy.visit('localhost:3000/auth')
    
//     cy.get('input[name="email"]')
//     .type('roger@gmail.com')
//     .should('have.value','roger@gmail.com')

//     cy.get('input[name="password"]')
//     .type('goares')
//     .should('have.value','goares')

//     cy.get('form').submit()
//   })

//   it('has validation', () => {
//     cy.get('input[name="season_number"]')
//       .type('1')
//       .should('have.value','1')
//       .get('input[name="episode_number"]')
//       .type('2')
//       .should('have.value','2')
//     cy.get('form').submit().document().get('.text-danger').contains('required')
//   })

//   it('inserts a new episode', () => {
//     cy.get('#show_id').select("It's Always Sunny in Philadelphia")
//     cy.get('input[name="season_number"]')
//       .type('10')
//       .should('have.value', '10')
//       .get('input[name="episode_number"]')
//       .type('20')
//       .should('have.value', '20')
//       .get('input[name="title"]')
//       .type('stuff happens for the first time')
//       .should('have.value', 'stuff happens for the first time')
//       .get('input[name="description"]')
//       .type('the one with all the things')
//       .should('have.value', 'the one with all the things')
//     cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
//     })

//   it('updates an existing episode from the entry form', () => {
//     cy.get('#show_id').select("It's Always Sunny in Philadelphia")
//     cy.get('input[name="season_number"]')
//       .type('5')
//       .should('have.value', '5')
//       .get('input[name="episode_number"]')
//       .type('2')
//       .should('have.value', '2')
//       .get('input[name="title"]')
//       .type('stuff happens')
//       .should('have.value', 'stuff happens')
//       .get('input[name="description"]')
//       .type('the one with all the things')
//       .should('have.value', 'the one with all the things')
//     cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
//     })

//     it('creates a new season and associates with a show', () => {
//       cy.get('#show_id').select("It's Always Sunny in Philadelphia")
//       cy.get('input[name="season_number"]')
//         .type('25')
//         .should('have.value', '25')
//         .get('input[name="episode_number"]')
//         .type('1')
//         .should('have.value', '1')
//         .get('input[name="title"]')
//         .type('They sure have a lot of seasons')
//         .should('have.value', 'They sure have a lot of seasons')
//         .get('input[name="description"]')
//         .type('the one with all the things')
//         .should('have.value', 'the one with all the things')
//       cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
//       })
// });

// describe('episode updates', () => {

//   beforeEach(() => {
//     cy.visit('localhost:3000/episode/')
    
//     cy.get('input[name="email"]')
//     .type('roger@gmail.com')
//     .should('have.value','roger@gmail.com')

//     cy.get('input[name="password"]')
//     .type('goares')
//     .should('have.value','goares')

//     cy.get('form').submit()
//   })


//   it('allows user to navigate from episode entry screen', () => {    
//     cy.contains('Edit a Show').click()
//   })

//   it('can select a show, season, episode and perform an update', () => {
//     cy.contains('Edit a Show').click()
//     cy.get('#showPicker').select("It's Always Sunny in Philadelphia")
//     cy.wait(1000);
//     cy.get('#seasonPicker').select("Season: 1")
//     cy.wait(1000);
//     cy.get('#episodePicker').select("Episode 1: The Gang Gets Racist")
//     cy.wait(1000).document().get('h1').contains('Episode Entry')
//     cy.get('#show_id').select("It's Always Sunny in Philadelphia")
//     cy.get('input[name="episode_number"]')
//       .type('0')
//       .should('have.value', '10')
//     cy.get('.was-validated').submit().document().get('h2').contains('Episode Confirmation')    
//   })
// });

describe('creating a user', () => {
  it('allows an admin to create a user', () => {
    cy.visit('http://localhost:3000/admin?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
        
    cy.get('input[name="email"]')
    .type('roger2@gmail.com')
    .should('have.value','roger2@gmail.com')

    cy.get('input[name="password"]')
    .type('goares2')
    .should('have.value','goares2')

    cy.get('form').submit()

    cy.wait(1000);

    cy.get('input[name="email"]')
    .type('roger2@gmail.com')
    .should('have.value','roger2@gmail.com')

    cy.get('input[name="password"]')
    .type('goares2')
    .should('have.value','goares2')

    cy.get('form').submit().document().get('h1').contains('Episode')
  })
})