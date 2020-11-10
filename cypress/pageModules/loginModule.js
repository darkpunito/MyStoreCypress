/// <reference types="cypress" />

const loginUrl = '?controller=authentication';

const aliases = {
  myAccount: 'myAccount',
};

const navigateTo = () => {
  cy.visit(loginUrl);
};

/**
 * Logins an user
 *
 * @param {{email: string, pass: string}} user The user credentials
 *
 */
const login = (user) => {
  cy.get('#email').type(user.email);
  cy.get('#passwd').type(user.pass);
  cy.get('#SubmitLogin').click();
};

export { navigateTo, login };
