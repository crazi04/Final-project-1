import loginPage from "../support/pages/LoginPage";
import user from '../fixtures/RegisteredUser.json';

  it('Authorization successful', {retries: 2}, () => {
    loginPage.visit();
    loginPage.submitLoginForm(user.email, user.password);
  })

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
    cy.get('#navbarAccount').click();
    cy.get('#navbarLogoutButton').click();
  });

