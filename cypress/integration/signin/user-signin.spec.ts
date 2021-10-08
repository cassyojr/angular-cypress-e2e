/// <reference types="cypress" />

describe('SignIn', () => {
  const email = 'admin@teste.com';
  const password = 'admin';

  beforeEach(() => {
    cy.visit('http://localhost:4200/signin');
  });

  it('should contains a signin header text', () => {
    cy.get('h2')
      .should('contains.text', 'SignIn', { matchCase: false })
      .and('be.visible');
  });

  it('should contains a submit button visible and not disabled', () => {
    cy.get('button[type=submit]').should('be.visible').and('not.be.disabled');
  });

  it('should show error message when user input invalid credentials', () => {
    cy.signin(email, '123');
    
    cy.get('.error').should('be.visible').and('have.length', 1);
    cy.url().should('contains', 'signin');
  });

  it('should signin the user with valid credentials and redirect to home page', () => {
    cy.signin(email, password);

    cy.get('.error').should('have.length', 0);
    cy.url().should('contains', 'home');

    cy.signout();
  });
});
