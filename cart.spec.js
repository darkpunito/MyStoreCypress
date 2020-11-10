/// <reference types="cypress" />

import * as cartModule from '../../pageModules/cartModule';
import * as categoryModule from '../../pageModules/categoryModule';
import * as loginModule from '../../pageModules/loginModule';
import * as testData from './testData';

const users = testData.users;

context('Cart', () => {
  beforeEach(() => {
    cy.server();
    loginModule.navigateTo();
  });

  it('AddingItemToCart_Should_ShowItemInCheckout', () => {
    loginModule.login(users.testUser);
    cy.get('#block_top_menu').find('a').contains(new RegExp(`^(Dresses)`)).click({ force: true });
    cy.get('#center_column')
      .find('[title="Printed Chiffon Dress"]')
      .parents('.product-container')
      .contains('Add to cart')
      .click();

    cy.get('#layer_cart')
      .should('be.visible')
      .within(() => {
        cy.get('a[title="Proceed to checkout"]').click();
      });
    cy.get('#cart_summary')
      .find('tr.cart_item')
      .then((elements) => {
        expect(elements.length).to.eql(1);
      });
    cy.get('.icon-trash').click();
    cy.get('#center_column').find('p.alert').should('have.class', 'alert-warning');
  });

  it.only('RemovingItemFromCart_Should_ShowRemoveItem', () => {
    loginModule.login(users.testUser);
    categoryModule.navigateTo('Dresses');
    categoryModule.addItemToCart('Printed Chiffon Dress');
    cartModule.navigateTo();

    cy.route('POST', new RegExp('\\?rand=[1-9].+')).as('rand');
    cy.get('.icon-trash').click();
    cy.wait('@rand');
    cy.get('#center_column').find('p.alert').should('have.class', 'alert-warning').and('be.visible');
  });
});
