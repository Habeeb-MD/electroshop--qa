describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('navigates to the product list page', () => {
        cy.contains('Browse All Products').click();
        cy.url().should('include', '/products');
    });

    it('navigates to the cart page', () => {
        cy.get("[data-testid=\"ShoppingCartIcon\"]").click();
        cy.url().should('include', '/cart');
    });

    it('navigates to the login page', () => {
        cy.get('header').contains('Login').click();
        cy.url().should('include', '/login');
    });
});