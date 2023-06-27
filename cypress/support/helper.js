// export function login(qweqwe) {
//     cy.log('Open website login page');
//     cy.visit('/index.php?rt=account/login');
  
//     cy.log('Check user is unauthorized');
//     cy.getCookie('customer').should('be.null');
  
//     cy.log('Authorize user');
//     cy.get('#loginFrm_loginname').type(qweqwe.username);
//     cy.get('#loginFrm_password').type(qweqwe.password);
//     cy.get('button[type="submit"]').contains('Login').click();
// }


export function findProduct(productName) {
    cy.get('body').then(($body) => {
      if ($body.find('.item-name:contains("' + productName + '")').length > 0) {
        cy.get('.item-name:contains("' + productName + '")');
      } else {
        cy.get('.mat-paginator-navigation-next').click();
        findProduct(productName);
      }
    });
  }