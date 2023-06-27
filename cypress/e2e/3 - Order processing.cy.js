import faker from 'faker';

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

   it("Add-purchase", () => {
    cy.get('mat-grid-tile:nth-child(2) div mat-card div:nth-child(2) button').click();
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted > .mat-button-wrapper').click();
    cy.get('#checkoutButton > .mat-button-wrapper').click();
    cy.get('[routerlink="/search"] > .mat-button-wrapper > span').click();
    cy.log(`Purchase `)
  });

  it("Add - 1 item-purchase", () => {
    cy.get('mat-grid-tile:nth-child(2) div mat-card div:nth-child(2) button').click();
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted > .mat-button-wrapper').click();
    cy.get('.cdk-column-quantity > :nth-child(1)').click();
    cy.get('#checkoutButton > .mat-button-wrapper').click();
    cy.get('[routerlink="/search"] > .mat-button-wrapper > span').click();
  });

it("Add-delete product", () => {
    cy.get('mat-grid-tile:nth-child(2) div mat-card div:nth-child(2) button').click();
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted > .mat-button-wrapper').click();
    cy.get('.cdk-column-remove > .mat-focus-indicator').click();
    cy.get('#checkoutButton').should('be.disabled');
    cy.get('#navbarAccount').click(); //Click on account button
    cy.get('#navbarLogoutButton').click(); //Click on Logout button 
 });

});