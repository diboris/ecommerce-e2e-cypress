import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (username, password) => {
  cy.get('#login2').click()
  cy.get('#logInModalLabel').should('be.visible')
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
  cy.get('#loginusername').type(username)
  cy.get('#loginpassword').type(password)
})

Cypress.Commands.add('enterUserDetails', (name, country, city, card, month, year) => {
  cy.get('#orderModal .modal-dialog #name').type(name)
  cy.get('#orderModal .modal-dialog #country').type(country)
  cy.get('#orderModal .modal-dialog #city').type(city)
  cy.get('#orderModal .modal-dialog #card').type(card)
  cy.get('#orderModal .modal-dialog #month').type(month)
  cy.get('#orderModal .modal-dialog #year').type(year)
})

Cypress.Commands.add('assertLoginMessage', (username) => {
  cy.get('#nameofuser')
    .should('have.text', 'Welcome ' + username)
})

Cypress.Commands.add('clickLogoutLink', () => {
  cy.get('#logout2').click()
})

Cypress.Commands.add('assertLoginLink', () => {
  cy.get('#login2').should('have.text', 'Log in')
})

Cypress.Commands.add('enterData', (selector, msg) => {
  cy.get(selector).type(msg)
})

Cypress.Commands.add('openConactForm', () => {
  cy.get('a').contains('Contact').click()
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
})

Cypress.Commands.add('submitContactForm', () => {
  cy.get('button[onclick="send()"]').click()
})

Cypress.Commands.add('clickButton', (text) => {
  cy.get('button').contains(text).click()
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
})

Cypress.Commands.add('openCart', () => {
  cy.get('#cartur').click()
})

Cypress.Commands.add('openFirstProduct', () => {
  cy.get('#tbodyid').find('.card-title a').eq(0).click()
})

Cypress.Commands.add('getProductNameFromProductPage', () => {
  return cy.get('#tbodyid .name')
})

Cypress.Commands.add('getProductPriceFromProductPage', () => {
  return cy.get('#tbodyid .price-container')
})

Cypress.Commands.add('getProductNameFromCartPage', () => {
  return cy.get('#tbodyid').find('td').eq(1)
})

Cypress.Commands.add('getProductPriceFromCartPage', () => {
  return cy.get('#tbodyid').find('td').eq(2)
})

Cypress.Commands.add('addProductToCart', () => {
  cy.intercept('POST', '/addtocart').as('addtocartRequest')
  cy.get('a[onclick*="addToCart"]').click()
  cy.wait('@addtocartRequest')
})

Cypress.Commands.add('filterProductsBy', (category) => {
  cy.intercept('POST', '/bycat').as('categoryRequest')
  cy.get(`[onclick="byCat('${category}')"]`).click()
  cy.wait('@categoryRequest')
})

Cypress.Commands.add('getProductUrls', () => {
  return cy.get('.card-title a')
})

Cypress.Commands.add('assertProductCategory', (category, productUrl) => {
  cy.intercept('POST', '/view').as('viewCategory')
  cy.visit('/' + productUrl)
  cy.wait('@viewCategory').its('response.body.cat').should('equal', category)
})
