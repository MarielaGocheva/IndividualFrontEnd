describe("Playlist Page", () => {
  beforeEach("Logs as a DJ.", () => {
    cy.visit("/login");
    cy.get(".login-email-input").type("soto@gmail");
    cy.get(".login-password-input").type("420");
    cy.contains("Log in").click();
  });
  it("Tries and cancels playlist deletion.", () => {
    cy.get(".pl-delete-btn").first().trigger("mouseover");
    cy.get(".delete-hover").first().click({ force: true });
    cy.contains("Cancel").click();
  }),
    it("View playlist information.", () => {
      cy.get(".pl-info-btn").first().trigger("mouseover");
      cy.get(".info-hover").first().click({ force: true });
    });
});
