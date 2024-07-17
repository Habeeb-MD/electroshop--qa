describe("Forgot Password Page", () => {
  beforeEach(() => {
    cy.visit("/forget-password");
  });

  it("displays the forgot password form", () => {
    cy.get("h1").should("contain", "Forgot Password");
    cy.get("#email").should("exist");
    cy.get('button[type="submit"]').should("contain", "Reset Password");
  });

  it("submits the form with a valid email", () => {
    cy.intercept("POST", "**/auth/forgotPassword", {
      statusCode: 200,
      body: { status: "success", message: "Token sent to email!" },
    }).as("forgotPasswordRequest");

    cy.get("#email").type("test@email.com");
    cy.get('button[type="submit"]').click();

    cy.wait("@forgotPasswordRequest");
    cy.get("p").should(
      "contain",
      "Password reset link has been sent to your email.",
    );
  });

  it("displays an error message with an invalid email", () => {
    cy.get("#email").type("invalidemail");
    cy.get('button[type="submit"]').click();
    cy.get("p").should(
      "contain",
      "Failed to send reset link. Please try again.",
    );
  });
});
