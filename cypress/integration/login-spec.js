import faker from 'faker'

describe('Login Flow', () => {
  let userCredentials

  beforeEach(() => {
    cy.visit('/')
    cy.fixture('userCredentials').then(function (user) {
      userCredentials = user
    })
  })

  it('A user can login', () => {
    const username = userCredentials.username
    const password = userCredentials.password

    cy.login(username, password)
    cy.clickButton('Log in')

    cy.assertLoginMessage(username)
  })

  it('A user can log out', () => {
    const username = userCredentials.username
    const password = userCredentials.password

    cy.login(username, password)
    cy.clickButton('Log in')
    cy.clickLogoutLink()

    cy.assertLoginLink()
  })

  it('A user can not log in with none existing user', () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    cy.login(username, password)
    cy.clickButton('Log in')

    cy.on('window:alert', (text) => {
      expect(text).to.contains('User does not exist.')
    })
  })
})
