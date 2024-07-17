describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('displays the login form', () => {
        cy.get('h1').should('contain', 'Sign in');
        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Sign In');
    });

    it('allows a user to log in with valid credentials', () => {
        cy.get('#email').clear().type('test@email.com');
        cy.get('#password').clear().type('password_test');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        cy.get('header').find("svg[data-testid=\"AccountCircleIcon\"]").should('exist');
    });

    it('displays an error message with invalid credentials', () => {
        cy.get('#email').type('wrong@email.com');
        cy.get('#password').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.get("p").should('contain', 'Invalid email or password');
    });

    it('navigates to the forgot password page', () => {
        cy.contains('Forgot password?').click();
        cy.url().should('include', '/forget-password');
    });

    it('navigates to the registration page', () => {
        cy.contains("Don't have an account? Sign Up").click();
        cy.url().should('include', '/register');
    });
});