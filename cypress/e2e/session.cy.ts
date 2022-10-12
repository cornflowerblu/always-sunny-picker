describe('Session testing', () => {
  
  const login = (email: string, password: string) => {
    cy.get('body > div > form > div > input:nth-child(2)').type(email);
    cy.get('body > div > form > div > input:nth-child(4)').type(password);
    cy.get('.btn').click()    
  }
  
  const loadCookie = () => cy.getCookie('__sunnysessionauth').reload();

beforeEach(() => {
  cy.visit('localhost:3000/auth')
  login('roger@gmail.com', 'goares')
})

  it('has validation', () => {    
    cy.visit('localhost:3000/episode')
    loadCookie()    
    
    .get('input[name="season_number"]').type('1').should('have.value','1')    
    .get('input[name="episode_number"]').type('2').should('have.value','2')
    .get('form').submit().document().get('.text-danger').contains('required')
  })

  it('allows user to navigate from episode entry screen', () => {
    cy.visit('localhost:3000/episode')
    loadCookie()
    
    .contains('Edit a Show').click()
  })

  it('inserts a new episode', () => {
    cy.visit('localhost:3000/episode')
    loadCookie()
    
    .get('#show_id').select("It's Always Sunny in Philadelphia")    
    .get('input[name="season_number"]').type('10').should('have.value', '10')
    .get('input[name="episode_number"]').type('20').should('have.value', '20')
    .get('input[name="title"]').type('stuff happens for the first time').should('have.value', 'stuff happens for the first time')
    .get('input[name="description"]').type('the one with all the things').should('have.value', 'the one with all the things')
    .get('form').submit().document().get('h2').contains('Episode Confirmation')
    })
  
    it('updates an existing episode from the entry form', () => {
      cy.visit('localhost:3000/episode')
      loadCookie()
      
      .get('#show_id').select("It's Always Sunny in Philadelphia")
      .get('input[name="season_number"]').type('5').should('have.value', '5')
      .get('input[name="episode_number"]').type('2').should('have.value', '2').get('input[name="title"]').type('stuff happens').should('have.value', 'stuff happens')
      .get('input[name="description"]').type('the one with all the things').should('have.value', 'the one with all the things')
      .get('form').submit().document().get('h2').contains('Episode Confirmation')
      })
      
    it('creates a new season and associates with a show', () => {
      cy.visit('localhost:3000/episode')
      loadCookie()
      
      .get('#show_id').select("It's Always Sunny in Philadelphia")
      .get('input[name="season_number"]').type('25').should('have.value', '25')
      .get('input[name="episode_number"]').type('1').should('have.value', '1')
      .get('input[name="title"]').type('They sure have a lot of seasons').should('have.value', 'They sure have a lot of seasons')
      .get('input[name="description"]').type('the one with all the things').should('have.value', 'the one with all the things')
      .get('form').submit().document().get('h2').contains('Episode Confirmation')
      })
    
      it('can select a show, season, episode and perform an update', () => {
        cy.visit('localhost:3000/episode/edit')
        loadCookie()
          
        .get('#showPicker').select("It's Always Sunny in Philadelphia").wait(1000)
        .get('#seasonPicker').select("Season: 1").wait(1000)
        .get('#episodePicker').select("Episode 1: The Gang Gets Racist").wait(1000)
        .document().get('h1').contains('Episode Entry')
        .get('#show_id').select("It's Always Sunny in Philadelphia")
        .get('input[name="episode_number"]')
        .type('0')
        .should('have.value', '10')
        .get('.was-validated').submit().document().get('h2').contains('Episode Confirmation')    
      })
})