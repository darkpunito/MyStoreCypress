/// <reference types="cypress" />

const categoryUrl = (categoryId) => `?id_category=${categoryId}&controller=category`;

const categories = [
  {
    categoryId: 8,
    categoryName: 'Dresses',
  },
];

const navigateTo = (category) => {
  const categoryId = categories.find((ctg) => ctg.categoryName == category).categoryId;
  cy.visit(categoryUrl(categoryId));
};

const addItemToCart = (itemName) => {
  cy.get('#center_column').find(`[title="${itemName}"]`).parents('.product-container').contains('Add to cart').click();
};

export { navigateTo, addItemToCart };
