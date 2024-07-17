describe("Reset Password Page", () => {
  const resetToken = "sampleResetToken123";

  beforeEach(() => {
    cy.visit(`/reset-password/${resetToken}`);
  });

  it("displays the reset password form", () => {
    cy.get("h1").should("contain", "Reset Password");
    cy.get("#newPassword").should("exist");
    cy.get("#confirmPassword").should("exist");
    cy.get('button[type="submit"]').should("contain", "Reset Password");
  });

  it("resets password with matching new passwords", () => {
    cy.intercept("PATCH", "**/resetPassword/**", {
      statusCode: 200,
      body: { message: "Password reset successfully" },
    }).as("resetPasswordRequest");

    cy.get("#newPassword").type("newPassword123");
    cy.get("#confirmPassword").type("newPassword123");
    cy.get('button[type="submit"]').click();

    cy.wait("@resetPasswordRequest");
    cy.url().should("include", "/login");
  });

  it("displays an error when passwords do not match", () => {
    cy.get("#newPassword").type("newPassword123");
    cy.get("#confirmPassword").type("differentPassword");
    cy.get('button[type="submit"]').click();
    cy.get("p").should("contain", "Passwords do not match.");
  });

  it("handles failed password reset", () => {
    cy.intercept("PATCH", "**/resetPassword/**", {
      statusCode: 400,
      body: { message: "Invalid or expired token" },
    }).as("resetPasswordRequest");

    cy.get("#newPassword").type("newPassword123");
    cy.get("#confirmPassword").type("newPassword123");
    cy.get('button[type="submit"]').click();

    cy.wait("@resetPasswordRequest");
    cy.get("p").should(
      "contain",
      "Failed to reset password. Please try again.",
    );
  });
});
