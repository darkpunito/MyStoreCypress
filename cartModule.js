/// <reference types="cypress" />

const cartUrl = '?controller=order';

const navigateTo = () => {
  cy.visit(cartUrl);
};

const removeItem = (itemName) => {
  cy.get('#center_column').find(`[title="${itemName}"]`).parents('.product-container').contains('Add to cart').click();
};

export { navigateTo };
