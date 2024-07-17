describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("displays the registration form", () => {
    cy.get("h1").should("contain", "Sign up");
    cy.get("#firstName").should("exist");
    cy.get("#lastName").should("exist");
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
    cy.get("#passwordConfirm").should("exist");
    cy.get('button[type="submit"]').should("contain", "Sign Up");
  });

  it("allows a user to register with valid information", () => {
    cy.intercept("POST", "**/auth/signup", {
      statusCode: 201,
      body: {
        status: "success",
        data: {
          user: {
            name: "Test User",
            email: "test@email.com",
          },
        },
      },
    }).as("userSignupRequest");

    const email = `test@email.com`;
    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");
    cy.get("#email").type(email);
    cy.get("#password").type("password_test");
    cy.get("#passwordConfirm").type("password_test");
    cy.get('button[type="submit"]').click();
    cy.wait("@userSignupRequest");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.get("button")
      .find('svg[data-testid="AccountCircleIcon"]')
      .should("exist");
  });

  it("displays an error message when passwords do not match", () => {
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password123");
    cy.get("#passwordConfirm").type("password456");
    cy.get('button[type="submit"]').click();
    cy.get("p").should(
      "contain",
      "Error: User validation failed: passwordConfirm: Passwords are not the same!",
    );
  });

  it("navigates to the login page", () => {
    cy.contains("Already have an account? Sign in").click();
    cy.url().should("include", "/login");
  });

  it("allows user to opt-in for marketing emails", () => {
    cy.get('input[type="checkbox"]').check();
    // Add assertion to check if the checkbox is checked
    cy.get('input[type="checkbox"]').should("be.checked");
  });
});
