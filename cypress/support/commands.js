// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.overwrite('wait', (originalFn, subject, alias, options) => {
  if (!isNaN(alias)) return originalFn(subject, alias, options);

  alias = !Array.isArray(alias) ? [alias] : alias;
  alias = alias.map((al) => {
    // TODO: PRDPXV-7216 - Remove checking for @ when all wait will be adjusted to overwrite wait
    if (al[0] !== '@') return `@${al}`;

    return al;
  });

  return originalFn(subject, alias, options);
});
