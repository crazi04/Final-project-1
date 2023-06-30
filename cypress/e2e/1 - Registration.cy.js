import {faker} from '@faker-js/faker'
import homePage from "../support/pages/HomePage";

describe('Register new', () => {
  let user;

  before(() => {
    user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    cy.writeFakerDataToFile('RegisteredUser.json', user);
  });

    it('Registration', () => {
      homePage.visit();
        cy.log(user);
      homePage.getNavbarAccount().click();
      homePage.getNavbarLoginButton().click();
      homePage.getNotYetACustomerLink().contains('Not yet a customer?').click();
    });

    it("Fill in Registration form - success",() => {
        cy.get('#emailControl').type(user.email);
        cy.get('#passwordControl').type(user.password);
        cy.get('#repeatPasswordControl').type(user.password);
        cy.get('.mat-select-arrow-wrapper').click();
        cy.get('#mat-option-13').click(); 
        cy.get('#securityAnswerControl').type("Alfa Centauri");
        cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary"]').click();
        cy.get('.primary-link').contains('Not yet a customer?').click(); 

    });

    it("Fill in Registration form - failed",() => {
        cy.get('#emailControl').type("anyone@gmail.com");
        cy.get('#passwordControl').type("Qwerty1");
        cy.get('#repeatPasswordControl').type("Qwerty1/");
        cy.get('.mat-select-arrow-wrapper').click();
        cy.get('#mat-option-18 > .mat-option-text').click(); 
        cy.get('#registerButton').should('be.disabled');
    });  
  });