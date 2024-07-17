const requestMocker = require("cypress-request-mocker");

describe("test basic functionality", () => {
  requestMocker();
  it("[s]test add to cart", () => {
    cy.visit("/");
    cy.contains("Samsung Galaxy M52 5G", {
      timeout: 10 * 1000,
    }).should("exist");
    cy.contains("Samsung Galaxy M52 5G").should("exist");
    cy.get("div.MuiCard-root")
      .contains("Samsung Galaxy M52 5G")
      .parent()
      .contains("Add to Cart")
      .click();
    cy.get('[data-testid="ShoppingCartIcon"]').click();
    cy.contains("Your Cart").should("exist");
    cy.contains("Samsung Galaxy M52 5G", {
      timeout: 10 * 1000,
    }).should("exist");
  });
});
