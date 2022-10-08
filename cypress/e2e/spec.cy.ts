describe('main page', () => {
  it('loads', () => {
    cy.visit('localhost:3000')
  })

  it('shuffles a few episodes, generates a cookie, and can fetch details', () => {
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.contains('Shuffle').click();
    cy.getCookie('_sunnysession').should('have.a.property', 'value');
    cy.contains('Details').click().document().get('h3').should('be.ok')
  })
});

describe('episode entry', () => {
  it('does not load without auth', () => {
    cy.visit('localhost:3000/episode').document().get('h1').contains('Oops!')
  })

  it('should allow user to navigate home', () => {
    cy.contains('Go Home').click()
  })

  it('loads with auth', () => {
    cy.visit('localhost:3000/episode?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
  })

  it('has validation', () => {
    cy.visit('localhost:3000/episode?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
    cy.get('input[name="season_number"]')
      .type('1')
      .should('have.value','1')
      .get('input[name="episode_number"]')
      .type('2')
      .should('have.value','2')
    cy.get('form').submit().document().get('.text-danger').contains('required')
  })

  it('inserts a new episode', () => {
    cy.visit('localhost:3000/episode?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
    cy.get('#show_id').select("It's Always Sunny in Philadelphia")
    cy.get('input[name="season_number"]')
      .type('10')
      .should('have.value', '10')
      .get('input[name="episode_number"]')
      .type('20')
      .should('have.value', '20')
      .get('input[name="title"]')
      .type('stuff happens for the first time')
      .should('have.value', 'stuff happens for the first time')
      .get('input[name="description"]')
      .type('the one with all the things')
      .should('have.value', 'the one with all the things')
    cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
    })

  it('updates an existing episode from the entry form', () => {
    cy.visit('localhost:3000/episode?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
    cy.get('#show_id').select("It's Always Sunny in Philadelphia")
    cy.get('input[name="season_number"]')
      .type('5')
      .should('have.value', '5')
      .get('input[name="episode_number"]')
      .type('2')
      .should('have.value', '2')
      .get('input[name="title"]')
      .type('stuff happens')
      .should('have.value', 'stuff happens')
      .get('input[name="description"]')
      .type('the one with all the things')
      .should('have.value', 'the one with all the things')
    cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
    })

    it('creates a new season and associates with a show', () => {
      cy.visit('localhost:3000/episode?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
      cy.get('#show_id').select("It's Always Sunny in Philadelphia")
      cy.get('input[name="season_number"]')
        .type('25')
        .should('have.value', '25')
        .get('input[name="episode_number"]')
        .type('1')
        .should('have.value', '1')
        .get('input[name="title"]')
        .type('They sure have a lot of seasons')
        .should('have.value', 'They sure have a lot of seasons')
        .get('input[name="description"]')
        .type('the one with all the things')
        .should('have.value', 'the one with all the things')
      cy.get('form').submit().document().get('h2').contains('Episode Confirmation')
      })
});

describe('episode updates', () => {
  it('does not load without auth', () => {
    cy.visit('localhost:3000/episode/edit').document().get('h1').contains('Oops!')
  })

  it('should allow user to navigate home', () => {
    cy.contains('Go Home').click()
  })

  it('loads with auth', () => {
    cy.visit('http://localhost:3000/episode/edit?auth=leLvvwyorNdFjbeAfVQxGuTJgUbsxc')
  })

  it('can select a show, season, and episode', () => {
    cy.get('#showPicker').select("It's Always Sunny in Philadelphia")
    cy.wait(1000);
    cy.get('#seasonPicker').select("Season: 1")
    cy.wait(1000);
    cy.get('#episodePicker').select("Episode 1: The Gang Gets Racist")
    cy.wait(1000).document().get('h1').contains('Episode Entry')    
  })
  
  it('can update an episode', () => {
    cy.get('#show_id').select("It's Always Sunny in Philadelphia")
    cy.get('input[name="episode_number"]')
      .type('0')
      .should('have.value', '10')
    cy.get('.was-validated').submit().document().get('h2').contains('Episode Confirmation')
  })
});