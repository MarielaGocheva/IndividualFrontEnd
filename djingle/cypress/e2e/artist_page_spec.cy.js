describe("Artist Page", () => {
  beforeEach("Logs in as a client.", () => {
    cy.visit("/login");
    cy.get(".login-email-input").type("gmail");
    cy.get(".login-password-input").type("123");
    cy.get(".login-email-input").should("have.value", "gmail");
    cy.get(".login-password-input").should("have.value", "123");
    cy.contains("Log in").click();
    // Should be navigated to client page
    cy.url().should("include", "/client");
  });
  it("Clicks on an artist's playlist.", () => {

  });
});
