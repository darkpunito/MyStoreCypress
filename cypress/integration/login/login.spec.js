/// <reference types="cypress" />

import * as loginModule from '../../pageModules/loginModule';
import * as testData from './testData';

const users = testData.users;

context('Login', () => {
  beforeEach(() => {
    cy.server();
    loginModule.navigateTo();
  });

  it('LoginWithCredential_Should_ShowMyAccount', () => {
    const { email, pass } = users.testUser;

    cy.get('#email').type(email);
    cy.get('#passwd').type(pass);
    cy.get('#SubmitLogin').click();
    cy.get('.page-heading').should('have.text', 'My account');
    cy.url().should('include', '?controller=my-account');
  });

  it('LoginWithNotRegisteredUser_Should_AuthenticationFailedError', () => {
    const { email, pass } = users.notRegisteredUser;

    cy.get('#email').type(email);
    cy.get('#passwd').type(pass);
    cy.get('#SubmitLogin').click();
    cy.get('.alert-danger').find('li').should('have.text', 'Authentication failed.');
    cy.url().should('include', '?controller=authentication');
  });

  it('LoginWithInvalidEmail_Should_InvalidEmailError', () => {
    const { email } = users.invalidUser;

    cy.get('#email').type(email);
    cy.get('#email').blur().parent().should('have.class', 'form-error');
    cy.get('#SubmitLogin').click();
    cy.get('.alert-danger').find('li').should('have.text', 'Invalid email address.');
    cy.url().should('include', '?controller=authentication');
  });

  it('LoginWithNoPassword_Should_PasswordIsRequiredError', () => {
    const { email } = users.invalidPasswordUser;

    cy.get('#email').type(email);
    cy.get('#SubmitLogin').click();
    cy.get('.alert-danger').find('li').should('have.text', 'Password is required.');
    cy.url().should('include', '?controller=authentication');
  });
});
