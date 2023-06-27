import faker from 'faker';

describe('User Authorization', () => {
  let user;

  before(() => {
      user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    cy.fixture('userdata.json').then((userdata) => {
      user = userdata;
   });
  });
   
   it('Enter Login form', () => {
      cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/')
      cy.get('#navbarAccount > .mat-button-wrapper > span').click();
      cy.get('#navbarLoginButton').click();
    });


  it("Fill in Login form - success",function () {
  cy.log(`Successfull Login`)
    cy.get('#email').type(user.email); //Fill Email field
    cy.get('#password').type(user.password); //Fill Password field
    cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary"]').click(); //Click Button
    cy.get('#navbarAccount').click(); //Click on account button
    cy.get('#navbarLogoutButton').click(); //Click on Logout button
  })   
  

  // it("Empty password",function () {
  //   cy.log(`Empty password`)
  //   cy.get('#email').type(user.email); //Fill Email field
  //   cy.get('#password').clear() //Fill Password field
  //   cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary mat-button-disabled"]').should('be.disabled'); //Click Button
  //    }) 

  });
  
