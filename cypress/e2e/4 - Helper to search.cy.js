import faker from 'faker';
import { findProduct } from '../support/helper';

describe('User Authorization', () => {
  let user;
  before(() => {
      user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    cy.fixture('userdata1.json').then((userdata) => {
      user = userdata;
   });
  });
   
   it('Open website', () => {
      cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/')
      cy.get('#navbarAccount > .mat-button-wrapper > span').click();
      cy.get('#navbarLoginButton').click();
    });

  it("Fill in Login form", () => {
    cy.get('#email').type(user.email); //Fill Email field
    cy.get('#password').type(user.password); //Fill Password field
    cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary"]').click(); //Click Button
    cy.log(`Successfull Login`)  
   });

    it("Add product", () => {
        findProduct(' Fruit Press ');
        cy.log('Add product');
        cy.get('body app-root div mat-sidenav-container mat-sidenav-content app-search-result div div div.ng-star-inserted mat-grid-list div mat-grid-tile:nth-child(8) div mat-card div:nth-child(2) button').click();
        cy.get('.mat-toolbar-row .mat-focus-indicator.ng-star-inserted').click();
        cy.get('#checkoutButton').click();
    });

    it("Add product button", () => {
        cy.log('Select in address')
        cy.get('div.ng-star-inserted .mat-focus-indicator .mat-button-wrapper span').click();
    });

    it("Fill in the delivery form", () => {
        const myCountry = faker.address.country();
        const myName = faker.name.findName();
        const myTelephone = faker.phone.phoneNumber('0683333332');
        const myZipCode = faker.address.zipCode('87654');
        const myAddress = faker.address.streetAddress();
        const myCity = faker.address.city();
        const myState = faker.address.state();

        cy.get('#mat-input-3').type(myCountry).should('have.value', myCountry)
        cy.get('#mat-input-4').type(myName).should('have.value', myName)
        cy.get('#mat-input-5').type(myTelephone).should('have.value', myTelephone)
        cy.get('#mat-input-6').type(myZipCode).should('have.value', myZipCode)
        cy.get('#address').type(myAddress).should('have.value', myAddress)
        cy.get('#mat-input-8').type(myCity).should('have.value', myCity)
        cy.get('#mat-input-9').type(myState).should('have.value', myState)
        cy.get('#submitButton .mat-button-wrapper').click()
    });

    it("Choose adress to deliver", () => {
        cy.get('.mat-radio-outer-circle').first().click({ force: true });
        cy.get('.btn-next .mat-button-wrapper span').click({ force: true });
    });

    it("Choose delivery option", () => {
        cy.get('.mat-radio-inner-circle').eq(0) .click({ force: true });
        cy.get('.nextButton .mat-button-wrapper').click()
    });

    it("Payment option", () => {
        cy.get('#mat-expansion-panel-header-0').click()
        cy.get('#mat-input-10').type(someName).should('have.value', someName)

    const someCard = faker.finance.creditCardNumber('6666############');

        cy.get('#mat-input-11').type(someCard).should('have.value', someCard)
        cy.get('#mat-input-12').select('6')
        cy.get('#mat-input-13').select('2088')
        cy.get('#submitButton .mat-button-wrapper').click()
        cy.log('Payment options added')
    });  

    it("Finishing the ordering form", () => {
        cy.get('.mat-radio-inner-circle').eq(0).click({ force: true })
        cy.get('.nextButton').click()
        cy.get('#checkoutButton').click()
        cy.get('[fxflex="60%"] :nth-child(1) .confirmation').contains('Thank you for your purchase!')
        cy.get('[fxflex="60%"] > :nth-child(1) > div').contains('Your order has been placed and is being processed. You can check for status updates on our ')
        cy.log('Placing an oreder is done')
    });
});