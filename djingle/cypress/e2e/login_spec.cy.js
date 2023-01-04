describe("Login Page", () => {
  beforeEach("Goes to the login page.", () => {
    cy.visit("/login");
  });
  it("Tries to login without credentials.", () => {
    cy.contains("Log in").click();
    // Should be on the same URL
    cy.url().should("include", "/");
    // An alert should appear
    cy.contains("OK").click();
  });
  it("Tries to login with incorrect credentials.", () => {
    cy.get(".login-email-input").type("soto@gmail");
    cy.get(".login-password-input").type("40");
    cy.contains("Log in").click();
    // An alert should appear
    cy.contains("OK").click();
  });
  it("Logs in as a DJ and gets redirected to playlist page.", () => {
    cy.get(".login-email-input").type("soto@gmail");
    cy.get(".login-password-input").type("420");
    cy.get(".login-email-input").should("have.value", "soto@gmail");
    cy.get(".login-password-input").should("have.value", "420");
    cy.contains("Log in").click();
    // Should be navigated to playlists page
    cy.url().should("include", "/playlists/:userId");
  });
  it("Logs in as a client and gets redirected to client page.", () => {
    cy.get(".login-email-input").type("gmail");
    cy.get(".login-password-input").type("123");
    cy.get(".login-email-input").should("have.value", "gmail");
    cy.get(".login-password-input").should("have.value", "123");
    cy.contains("Log in").click();
    // Should be navigated to client page
    cy.url().should("include", "/client");
  });
});
