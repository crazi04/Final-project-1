import {faker} from '@faker-js/faker';
import { addProduct } from '../support/helper';
import loginPage from '../support/pages/LoginPage';
import user from '../fixtures/RegisteredUser.json';

console.log(faker)


    describe('order data', () => {
        let order;

    before(() => {

        order = {
        orderCountry: faker.location.country(),
        orderName: faker.person.firstName(),
        orderTelephone: faker.phone.number('0674564545'),
        orderZipCode: faker.location.zipCode(`12345`),
        orderAddress: faker.location.streetAddress(),
        orderCity: faker.location.city(),
        orderState: faker.location.state()
          
        };
      });


    it('Successful login', {retries: 2}, () => {
        loginPage.visit();
        loginPage.submitLoginForm(user.email, user.password);
    })
  

    it("Add product", () => {
        addProduct('Fruit Press'); 
        cy.log('Add product');
        cy.get('[style="left: calc((25% - 22.5px + 30px) * 2); width: calc((25% - 22.5px) * 1 + 0px); margin-top: calc((25% - 22.5px + 30px) * 1); padding-top: calc((25% - 22.5px) * 1 + 0px);"] > .mat-grid-tile-content > .mat-card > [style="display: flex; justify-content: center;"] > .mat-focus-indicator > .mat-button-wrapper > span').click();
        cy.get('body app-root div mat-sidenav-container mat-sidenav-content app-search-result div div div.ng-star-inserted mat-grid-list div mat-grid-tile:nth-child(8) div mat-card div:nth-child(2) button').click();
        cy.get('.mat-toolbar-row .mat-focus-indicator.ng-star-inserted').click();
        cy.get('#checkoutButton').click();
        cy.log('Choose an adress')
        cy.get('div.ng-star-inserted .mat-focus-indicator .mat-button-wrapper span').click();
    });

   it("Fill in the delivery form", () => {
        cy.get('#mat-input-3').type(order.orderCountry).should('have.value', order.orderCountry)
        cy.get('#mat-input-4').type(order.orderName).should('have.value', order.orderName)
        cy.get('#mat-input-5').type(order.orderTelephone,  { force: true }).should('have.value', order.orderTelephone)
        cy.get('#mat-input-6').type(order.orderZipCode).should('have.value', order.orderZipCode)
        cy.get('#address').type(order.orderAddress).should('have.value', order.orderAddress)
        cy.get('#mat-input-8').type(order.orderCity).should('have.value', order.orderCity)
        cy.get('#mat-input-9').type(order.orderState).should('have.value', order.orderState)
        cy.get('#submitButton .mat-button-wrapper').click()
    });

    it("Choose adress", () => {
        cy.get('.mat-radio-outer-circle').first().click({ force: true });
        cy.get('.btn-next .mat-button-wrapper span').click({ force: true });
    });

    it("Choose delivery ", () => {
        cy.get('.mat-radio-inner-circle').eq(0) .click({ force: true });
        cy.get('.nextButton .mat-button-wrapper').click()
    });

    it("Payment method", () => {
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get('#mat-input-10').type(order.orderName).should('have.value', order.orderName)

        const creditCardNumber = faker.finance.creditCardNumber('3456############');

        cy.get('#mat-input-11').type(creditCardNumber).should('have.value', creditCardNumber)
        cy.get('#mat-input-12').select('2')
        cy.get('#mat-input-13').select('2089')
        cy.get('#submitButton .mat-button-wrapper').click()
        cy.log('Payment options added')
    });  

    it("Order complete", () => {
        cy.get('.mat-radio-inner-circle').eq(0).click({ force: true })
        cy.get('.nextButton').click()
        cy.get('#checkoutButton').click()
        cy.get('[fxflex="60%"] :nth-child(1) .confirmation').contains('Thank you for your purchase!')
        cy.get('[fxflex="60%"] > :nth-child(1) > div').contains('Your order has been placed and is being processed. You can check for status updates on our ')
       
    });
});