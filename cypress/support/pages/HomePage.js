class HomePage {
     visit(){
      cy.visit('https://juice-shop-sanitarskyi.herokuapp.com');
    }
    
    getNavbarAccount(){
      return cy.get('#navbarAccount');
    }
  
    getNavbarLoginButton(){
      return cy.get('#navbarLoginButton');
    }
  
    getNotYetACustomerLink(){
      return cy.get('.primary-link').contains('Not yet a customer?');
    }
  }

  export default new HomePage();