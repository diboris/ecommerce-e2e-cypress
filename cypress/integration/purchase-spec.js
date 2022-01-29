import faker from 'faker'

describe('Purchase flow', () => {
  let purchaseDetails
  let productName
  let productPrice
  let productURLs = []

  beforeEach(() => {
    cy.visit('/')
    cy.fixture('purchaseDetails').then(function (details) {
      purchaseDetails = details
    })
  })

  it('A user can make a purchase', () => {
    const name = purchaseDetails.name
    const country = purchaseDetails.country
    const city = purchaseDetails.city
    const card = purchaseDetails.card
    const month = purchaseDetails.month
    const year = purchaseDetails.year

    cy.openFirstProduct()

    cy.getProductNameFromProductPage().then(value => {
      productName = value.text()
    })

    cy.getProductPriceFromProductPage().then(value => {
      const text = value.text()
      productPrice = text.substring(1, text.indexOf(' '))
    })

    cy.addProductToCart()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added')
    })

    cy.openCart()

    cy.getProductNameFromCartPage().then(value => {
      cy.wrap(value).should('have.text', productName)
    })

    cy.getProductPriceFromCartPage().then(value => {
      cy.wrap(value).should('have.text', productPrice)
    })

    cy.clickButton('Place Order')
    cy.enterUserDetails(name, country, city, card, month, year)
    cy.clickButton('Purchase')

    cy.get('.sweet-alert').find('h2')
      .should('have.text', 'Thank you for your purchase!')
  })

  it('A user can send a message to support', () => {
    const email = faker.internet.email()
    const username = faker.name.findName()
    const msg = faker.lorem.sentences()

    cy.openConactForm()
    cy.enterData('#recipient-email', email)
    cy.enterData('#recipient-name', username)
    cy.enterData('#message-text', msg)

    cy.submitContactForm()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Thanks for the message!!')
    })
  })

  it('A user can filter products by category', () => {
    const category = faker.random.arrayElement(['notebook', 'phone', 'monitor'])

    cy.filterProductsBy(category)

    cy.getProductUrls().each(row => {
      const url = row.attr('href')
      productURLs.push(url)
    })

    cy.get('body').then(() => {
      for (let i = 0; i < productURLs.length; i++) {
        const url = productURLs[i]
        cy.assertProductCategory(category, url)
      }
    })
  })
})
