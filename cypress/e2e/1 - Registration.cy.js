import {faker} from "@faker-js/faker";

describe('User Registration', () => {
  let user;

    before(() => {
        user = {
        email: faker.internet.email(),
        password: faker.internet.password()
        };
        cy.writeFakerDataToFile('userdata.json', user);
   });

    it('Register a new user', () => {
      cy.log(user);
      cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/')
      cy.get('#navbarAccount').click();
      cy.get('#navbarLoginButton').click();
      cy.get('.primary-link').contains('Not yet a customer?').click();  
    });

    // /////////////////

    it("Fill in Registration form - success",() => {
        cy.get('#emailControl').type(user.email); //Fill Email field
        cy.get('#passwordControl').type(user.password); //Fill Password field
        cy.get('#repeatPasswordControl').type(user.password); //Fill Repeat Password field
        cy.get('.mat-select-arrow-wrapper').click(); //Fill Security Question field
        cy.get('#mat-option-13').click(); 
        cy.get('#securityAnswerControl').type("Alfa Centauri"); //Fill Answer field
        cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary"]').click(); //Click Button
    });
});

    // it("Fill in Registration form - failed",() => {
    //     cy.get('#emailControl').type("anyone@gmail.com"); //Fill Email field
    //     cy.get('#passwordControl').type("Qwerty1"); //Fill Password field
    //     cy.get('#repeatPasswordControl').type("Qwerty1/"); //Fill Repeat Password field
    //     cy.get('.mat-select-arrow-wrapper').click(); //Fill Security Question field
    //     cy.get('#mat-option-13').click(); 
    //     cy.get('#registerButton').should('be.disabled'); //Click Button
    // });  
// });