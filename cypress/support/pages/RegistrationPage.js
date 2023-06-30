class RegistrationPage {
    getEmailControl() {
      return cy.get('#emailControl');
    }
  
    getPasswordControl() {
      return cy.get('#passwordControl');
    }
  
    getRepeatPasswordControl() {
      return cy.get('#repeatPasswordControl');
    }
  
    getSecurityQuestionArrow() {
      return cy.get('.mat-select-arrow-wrapper');
    }
  
    getSecurityQuestionOption() {
      return cy.get('#mat-option-13');
    }
  
    getSecurityAnswerControl() {
      return cy.get('#securityAnswerControl');
    }
  
    getRegisterButton() {
      return cy.get('[class="mat-focus-indicator mat-raised-button mat-button-base mat-primary"]');
    }
  
    getNotYetACustomerLink() {
      return cy.get('.primary-link').contains('Not yet a customer?');
    }
  }
  
  export default RegistrationPage;