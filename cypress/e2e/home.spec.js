describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the welcome message", () => {
    cy.get("h1").should("contain", "Welcome to ElectroShop");
  });

  it("shows the hero section with correct content", { tags: "@smoke" }, () => {
    cy.get("h1").should("contain", "Welcome to ElectroShop");
    cy.get("p").should(
      "contain",
      "Discover the latest in electronics and gadgets",
    );
    cy.get("p").should(
      "contain",
      "Shop our wide range of products and stay ahead with cutting-edge technology.",
    );
  });

  it('has a working "Browse All Products" button', () => {
    cy.contains("Browse All Products").click();
    cy.url().should("include", "/products");
  });

  it("displays the featured products section", { tags: "@smoke" }, () => {
    cy.get("h4").should("contain", "Featured Products");
    cy.get(
      '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]',
    ).should("exist");
  });

  it("renders featured products", { tags: "@smoke" }, () => {
    cy.get(
      '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]',
    ).within(() => {
      cy.get(
        '[class^="MuiPaper-root MuiPaper-elevation MuiPaper-rounded"]',
      ).should("have.length", 6);
    });
  });

  it("allows navigation to a product detail page", () => {
    cy.get(
      '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]',
    ).within(() => {
      cy.get('[class^="MuiPaper-root MuiPaper-elevation MuiPaper-rounded"]')
        .first()
        .click();
    });
    cy.url().should("include", "/product/");
  });

  it("has correct styling for the header section", () => {
    cy.get(".MuiContainer-root").should("have.css", "max-width", "600px");
    cy.get("h1").should("have.css", "text-align", "center");
    cy.get("p").should("have.css", "text-align", "center");
  });

  it("has correct styling for the featured products section", () => {
    cy.get("h4").should("have.css", "text-align", "center");
  });

  it("displays the correct copyright information in the footer", () => {
    cy.get("footer").within(() => {
      cy.contains("Copyright ©").should("exist");
      cy.contains("ElectroShop").should("exist");
      cy.contains(new Date().getFullYear().toString()).should("exist");
    });
  });
});
