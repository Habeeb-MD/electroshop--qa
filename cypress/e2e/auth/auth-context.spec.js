describe("Authentication Context", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("no user data should be present on initial load", () => {
    cy.window()
      .its("localStorage")
      .invoke("getItem", "user")
      .should("not.exist");
    cy.reload();
    cy.get("button")
      .find('svg[data-testid="AccountCircleIcon"]')
      .should("not.exist");
  });

  it("clears user data on logout", () => {
    cy.login("test@email.com", "password_test");
    cy.get("header").find('svg[data-testid="AccountCircleIcon"]').click();
    cy.contains("Logout").click();
    cy.contains("Login").should("exist");
    cy.window().its("localStorage").invoke("getItem", "user").should("be.null");
  });

  it("updates user data on login", () => {
    cy.visit("/login");
    cy.get("#email").type("test@email.com");
    cy.get("#password").type("password_test");
    cy.get('button[type="submit"]').click();
    cy.window()
      .its("localStorage")
      .invoke("getItem", "user")
      .should("not.be.null");
  });
});
